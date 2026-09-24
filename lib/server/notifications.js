import 'server-only';
import { getSql } from './db';

// Persistent admin dashboard notifications (admin_notifications table).

export async function createNotification(sql, { type, title, message, orderId = null }) {
  await sql`
    insert into admin_notifications (type, title, message, order_id)
    values (${type}, ${title}, ${message}, ${orderId})
  `;
}

export async function listNotifications({ limit = 20 } = {}) {
  const sql = getSql();
  const [items, [{ unread }]] = await Promise.all([
    sql`
      select n.id, n.type, n.title, n.message, n.read_at, n.created_at, o.order_number
      from admin_notifications n
      left join orders o on o.id = n.order_id
      order by n.created_at desc, n.id desc
      limit ${limit}
    `,
    sql`select count(*)::int as unread from admin_notifications where read_at is null`,
  ]);
  return { items: items.map((n) => ({ ...n, id: Number(n.id) })), unread };
}

export async function markNotificationsRead(ids) {
  const clean = (Array.isArray(ids) ? ids : []).map(Number).filter((n) => Number.isInteger(n) && n > 0).slice(0, 200);
  if (clean.length === 0) return 0;
  const sql = getSql();
  const rows = await sql`update admin_notifications set read_at = now() where id = any(${clean}) and read_at is null returning id`;
  return rows.length;
}

export async function markAllNotificationsRead() {
  const sql = getSql();
  const rows = await sql`update admin_notifications set read_at = now() where read_at is null returning id`;
  return rows.length;
}
