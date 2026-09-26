import 'server-only';
import postgres from 'postgres';

// Server-only connection to the store's Supabase Postgres database.
// DATABASE_URL is preferred; POSTGRES_URL is what Vercel's Supabase integration sets.
// On Vercel use Supabase's pooled "Transaction" connection string (port 6543).
const connectionSource = process.env.DATABASE_URL ? 'DATABASE_URL' : process.env.POSTGRES_URL ? 'POSTGRES_URL' : null;
const connectionString = (process.env.DATABASE_URL || process.env.POSTGRES_URL || '').trim();

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super('Database is not configured. Set DATABASE_URL.');
    this.name = 'DatabaseNotConfiguredError';
  }
}

function createClient() {
  const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(connectionString);
  return postgres(connectionString, {
    // Supabase's transaction pooler does not support prepared statements.
    prepare: false,
    ssl: isLocal ? false : 'require',
    // One connection per serverless instance: Supavisor does the pooling. More connections
    // per instance only multiply failed logins, which trips Supavisor's circuit breaker.
    max: Number(process.env.DATABASE_POOL_MAX || (process.env.VERCEL ? 1 : 5)),
    idle_timeout: 20,
    connect_timeout: 10,
    // numeric columns come back as strings; money values are converted explicitly.
  });
}

// Reuse one client per server instance (and across hot reloads in dev).
const globalForDb = globalThis;

export class DatabaseUnavailableError extends Error {
  constructor(cause) {
    super(`Database temporarily unavailable after a connection failure: ${cause?.message || cause}`);
    this.name = 'DatabaseUnavailableError';
    this.code = cause?.code;
  }
}

// After a login/connection failure, fail fast for a short time instead of opening new
// connections: every failed login counts towards Supabase's circuit breaker (ECIRCUITBREAKER).
const CONNECTION_FAILURE_COOLDOWN_MS = 30 * 1000;

export function getSql() {
  if (!connectionString) throw new DatabaseNotConfiguredError();
  const failure = globalForDb.__s4hDbFailure;
  if (failure && Date.now() < failure.until) throw new DatabaseUnavailableError(failure.error);
  if (!globalForDb.__s4hSql) globalForDb.__s4hSql = createClient();
  return globalForDb.__s4hSql;
}

function isConnectionFailure(error) {
  const message = String(error?.message || '');
  const code = String(error?.code || '');
  return (
    /ECIRCUITBREAKER|password authentication failed|SASL|SCRAM|Tenant or user not found|ENOTFOUND|ENETUNREACH|EAI_AGAIN|ECONNREFUSED/i.test(message) ||
    ['28P01', '28000', '08P01', 'ENOTFOUND', 'ENETUNREACH', 'ECONNREFUSED'].includes(code)
  );
}

export function isDatabaseConfigured() {
  return Boolean(connectionString);
}

// --- Diagnostics (never includes the password) ------------------------------------------

// Describes the configured connection string and flags common mistakes.
export function describeConnectionConfig() {
  if (!connectionString) return { configured: false, source: null, warnings: ['DATABASE_URL is not set.'] };
  const raw = process.env[connectionSource] || '';
  const warnings = [];
  if (raw !== raw.trim()) warnings.push(`${connectionSource} has leading/trailing spaces or a line break.`);
  if (/^["']|["']$/.test(connectionString)) warnings.push(`${connectionSource} is wrapped in quotes; paste the value without quotes.`);

  let url;
  try {
    url = new URL(connectionString.replace(/^["']|["']$/g, ''));
  } catch {
    return {
      configured: true,
      source: connectionSource,
      warnings: [...warnings, `${connectionSource} is not a valid URL. If the password contains # / ? or %, it must be URL-encoded.`],
    };
  }

  let password = '';
  try {
    password = decodeURIComponent(url.password);
  } catch {
    warnings.push('The password contains a "%" that is not URL-encoded (write it as %25).');
  }
  const user = decodeURIComponent(url.username);
  const host = url.hostname;
  const isSupabasePooler = /\.pooler\.supabase\.com$/.test(host);

  if (!/^postgres(ql)?:$/.test(url.protocol)) warnings.push(`Unexpected scheme "${url.protocol}" (expected postgresql://).`);
  if (!password) warnings.push('The connection string has no password.');
  if (/^\[.*\]$/.test(password) || /YOUR-PASSWORD/i.test(password)) {
    warnings.push('The password still contains the [ ] placeholder brackets from the Supabase template; remove the brackets.');
  }
  if (isSupabasePooler && !/^postgres\.[a-z0-9]+$/.test(user)) {
    warnings.push('For the Supabase pooler the user must be "postgres.<project-ref>" (as shown in Supabase -> Connect).');
  }
  if (isSupabasePooler && url.port === '5432') {
    warnings.push('Port 5432 on the pooler is Session mode; use port 6543 (Transaction mode) on Vercel.');
  }
  if (/^db\.[a-z0-9]+\.supabase\.co$/.test(host)) {
    warnings.push('This is the direct database host (IPv6 only); Vercel needs the pooler host (*.pooler.supabase.com, port 6543).');
  }

  return {
    configured: true,
    source: connectionSource,
    target: {
      host,
      port: url.port || '5432',
      database: url.pathname.replace(/^\//, ''),
      user: user.replace(/^(postgres\.)(.{4}).+$/, '$1$2…'),
    },
    warnings,
  };
}

// Plain-language explanation of connection errors from Postgres / Supabase's pooler (Supavisor).
export function explainDatabaseError(error) {
  const message = String(error?.message || error);
  const code = error?.code || '';
  let hint = '';
  if (error?.name === 'DatabaseUnavailableError') {
    return { code, message, hint: 'Skipped connecting for 30 seconds after the previous connection failure (see the earlier log line).' };
  }
  if (/ECIRCUITBREAKER/.test(message)) {
    if (/auth/i.test(message)) {
      hint = 'Supabase blocked new connections after repeated login failures. The user or password in DATABASE_URL is wrong. Fix it, redeploy, and wait for the block to expire (usually about 10 minutes).';
    } else if (/secret|credential/i.test(message)) {
      hint = 'The Supabase pooler could not verify the database credentials. Check the password in DATABASE_URL (reset it in Supabase if unsure) and that the project is not paused.';
    } else {
      hint = 'The Supabase pooler cannot reach the database right now (paused, restoring or overloaded project). Check the project status in Supabase.';
    }
  } else if (/password authentication failed|SASL|SCRAM/i.test(message) || code === '28P01') {
    hint = 'Wrong database password in DATABASE_URL.';
  } else if (/Tenant or user not found/i.test(message)) {
    hint = 'The pooler does not recognise the user/region. Use the exact pooler connection string from Supabase -> Connect (user postgres.<project-ref>).';
  } else if (/ENOTFOUND|ENETUNREACH|EAI_AGAIN/.test(message) || /ENOTFOUND|ENETUNREACH/.test(code)) {
    hint = 'The database host cannot be reached from the server. On Vercel use the pooler host (*.pooler.supabase.com:6543).';
  } else if (/CONNECT_TIMEOUT|ETIMEDOUT/.test(message) || code === 'CONNECT_TIMEOUT') {
    hint = 'Timed out connecting to the database.';
  } else if (/row-level security/i.test(message)) {
    hint = 'The database user is not the table owner; use the default postgres user from Supabase.';
  }
  return { code, message, hint };
}

// One clear log line per failure, so Vercel's log list shows the actual reason.
export function logDatabaseError(context, error) {
  if (error?.name !== 'DatabaseUnavailableError' && isConnectionFailure(error)) {
    globalForDb.__s4hDbFailure = { error, until: Date.now() + CONNECTION_FAILURE_COOLDOWN_MS };
  }
  const { code, message, hint } = explainDatabaseError(error);
  const { warnings } = describeConnectionConfig();
  console.error(
    `[${context}] database error${code ? ` ${code}` : ''}: ${message}${hint ? ` | Hint: ${hint}` : ''}${
      warnings.length ? ` | Config: ${warnings.join(' ')}` : ''
    }`,
  );
}
