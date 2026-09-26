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
    const [row] = await sql`
      select current_user as db_user,
        ${sql.array(TABLES)}::text[] <@ array(select tablename::text from pg_tables where schemaname = 'public') as tables_present
    `;
    const [{ orders }] = await sql`select count(*)::int as orders from orders`;
    return NextResponse.json({
      ok: true,
      latencyMs: Date.now() - started,
      config,
      database: { user: row.db_user, tablesPresent: row.tables_present, orders },
    });
  } catch (error) {
    logDatabaseError('db-health', error);
    return NextResponse.json({ ok: false, latencyMs: Date.now() - started, config, error: explainDatabaseError(error) }, { status: 503 });
  }
}
