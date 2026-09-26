import { notFound } from 'next/navigation';
import { getOrderForAdmin } from '@/lib/server/orders';
import OrderDetail from '@/components/admin/OrderDetail';
import DataError from '@/components/admin/DataError';
import { logDatabaseError } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetail({ params }) {
  let order = null;
  try {
    order = await getOrderForAdmin(decodeURIComponent(params.id));
  } catch (error) {
    logDatabaseError('admin-order', error);
    return <DataError error={error} />;
  }
  if (!order) notFound();

  // Dates -> strings so the order can be passed to the client component.
  return <OrderDetail initialOrder={JSON.parse(JSON.stringify(order))} />;
}
