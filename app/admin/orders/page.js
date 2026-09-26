import { listOrders } from '@/lib/server/orders';
import OrdersTable from '@/components/admin/OrdersTable';
import DataError from '@/components/admin/DataError';
import { logDatabaseError } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  let orders = [];
  let loadError = null;
  try {
    orders = await listOrders({ limit: 500 });
  } catch (error) {
    logDatabaseError('admin-orders', error);
    loadError = error;
  }
  // Only plain serialisable fields go to the client component.
  const rows = orders.map((o) => ({ ...o, created_at: new Date(o.created_at).toISOString() }));

  return (
    <div>
      {loadError && <DataError error={loadError} />}
      <OrdersTable orders={rows} />
    </div>
  );
}
