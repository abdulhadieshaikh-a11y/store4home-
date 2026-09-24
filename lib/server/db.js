import 'server-only';
import postgres from 'postgres';

// Server-only connection to the store's Supabase Postgres database.
// DATABASE_URL is preferred; POSTGRES_URL is what Vercel's Supabase integration sets.
// On Vercel use Supabase's pooled "Transaction" connection string (port 6543).
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

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
    max: Number(process.env.DATABASE_POOL_MAX || 5),
    idle_timeout: 20,
    connect_timeout: 10,
    // numeric columns come back as strings; money values are converted explicitly.
  });
}

// Reuse one client per server instance (and across hot reloads in dev).
const globalForDb = globalThis;

export function getSql() {
  if (!connectionString) throw new DatabaseNotConfiguredError();
  if (!globalForDb.__s4hSql) globalForDb.__s4hSql = createClient();
  return globalForDb.__s4hSql;
}

export function isDatabaseConfigured() {
  return Boolean(connectionString);
}
