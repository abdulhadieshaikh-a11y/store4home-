import { NextResponse } from 'next/server';
import { getSql, describeConnectionConfig, explainDatabaseError, logDatabaseError } from '@/lib/server/db';
import { requireAdmin } from '@/lib/server/api';

export const dynamic = 'force-dynamic';

const TABLES = ['orders', 'order_items', 'order_status_history', 'admin_notifications', 'email_log', 'store_settings'];

// Admin-only database check: shows which connection is configured (never the password),
// flags common connection-string mistakes, and runs a simple query.
export async function GET(request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const config = describeConnectionConfig();
  if (!config.configured) return NextResponse.json({ ok: false, config }, { status: 503 });

  const started = Date.now();
  try {
    const sql = getSql();
    const [{ db_user: dbUser }] = await sql`select current_user as db_user`;
    // Each name is its own text parameter ($1..$6); no array parameter is used, because
    // postgres.js can send an array as plain text on a brand-new connection.
    const found = await sql`
      select tablename::text as name from pg_tables
      where schemaname = 'public' and tablename in ${sql(TABLES)}
    `;
    const present = new Set(found.map((r) => r.name));
    const missingTables = TABLES.filter((t) => !present.has(t));
    if (missingTables.length > 0) {
      return NextResponse.json(
        { ok: false, latencyMs: Date.now() - started, config, database: { user: dbUser, tablesPresent: false, missingTables } },
        { status: 503 },
      );
    }
    const [{ orders }] = await sql`select count(*)::int as orders from orders`;
    return NextResponse.json({
      ok: true,
      latencyMs: Date.now() - started,
      config,
      database: { user: dbUser, tablesPresent: true, missingTables: [], orders },
    });
  } catch (error) {
    logDatabaseError('db-health', error);
    return NextResponse.json({ ok: false, latencyMs: Date.now() - started, config, error: explainDatabaseError(error) }, { status: 503 });
  }
}
