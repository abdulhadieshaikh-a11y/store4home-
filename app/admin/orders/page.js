import { listOrders } from '@/lib/server/orders';
import OrdersTable from '@/components/admin/OrdersTable';
import DataError from '@/components/admin/DataError';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  let orders = [];
  let loadError = null;
  try {
    orders = await listOrders({ limit: 500 });
  } catch (error) {
    console.error('[admin] orders load failed:', error);
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
