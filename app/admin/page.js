import Link from 'next/link';
import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { customers } from '@/data/customers';
import { formatPKR, formatRs } from '@/lib/currency';
import { paymentMethodLabel } from '@/lib/orders';
import { getOrderStats, listOrders } from '@/lib/server/orders';
import PaymentStatusBadge from '@/components/admin/PaymentStatusBadge';
import DataError from '@/components/admin/DataError';
import StatusBadge from '@/components/admin/StatusBadge';
import { logDatabaseError } from '@/lib/server/db';

export const dynamic = 'force-dynamic';

const weekly = [
  { day: 'Mon', value: 32 },
  { day: 'Tue', value: 48 },
  { day: 'Wed', value: 40 },
  { day: 'Thu', value: 62 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 78 },
  { day: 'Sun', value: 66 },
];

export default async function AdminDashboard() {
  let orders = [];
  let orderStats = { order_count: 0, revenue: 0, active_count: 0, awaiting_payment: 0 };
  let loadError = null;
  try {
    [orders, orderStats] = await Promise.all([listOrders({ limit: 5 }), getOrderStats()]);
  } catch (error) {
    logDatabaseError('admin-dashboard', error);
    loadError = error;
  }
  const maxWeekly = Math.max(...weekly.map((w) => w.value));

  const stats = [
    { label: 'Total Revenue', value: formatRs(orderStats.revenue), delta: `${orderStats.awaiting_payment} awaiting payment`, icon: DollarSign },
    { label: 'Orders', value: orderStats.order_count, delta: `${orderStats.active_count} active`, icon: ShoppingCart },
    { label: 'Customers', value: customers.length, delta: '+2 this week', icon: Users },
    { label: 'Products', value: products.length, delta: '3 low stock', icon: Package },
  ];

  return (
    <div>
      {loadError && <DataError error={loadError} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map(({ label, value, delta, icon: Icon }) => (
          <div key={label} className="bg-white border border-line rounded p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[13px] text-ink-400 font-medium">{label}</span>
              <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center">
                <Icon size={16} className="text-brand" />
              </div>
            </div>
            <p className="text-[26px] font-semibold font-display">{value}</p>
            <p className="text-[12.5px] text-brand mt-1 flex items-center gap-1">
              <ArrowUpRight size={13} /> {delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-5 mb-8">
        <div className="bg-white border border-line rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[18px]">Sales this week</h2>
            <span className="text-[12.5px] text-ink-400">Units sold</span>
          </div>
          <div className="flex items-end justify-between gap-3 h-[180px]">
            {weekly.map((w) => (
              <div key={w.day} className="flex-1 flex flex-col items-center gap-2.5">
                <div className="w-full bg-ink-100 rounded-sm relative flex items-end" style={{ height: '150px' }}>
                  <div
                    className="w-full bg-brand rounded-sm transition-all"
                    style={{ height: `${(w.value / maxWeekly) * 100}%` }}
                  />
                </div>
                <span className="text-[12px] text-ink-400">{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-line rounded p-6">
          <h2 className="font-display text-[18px] mb-5">Top products</h2>
          <div className="flex flex-col gap-4">
            {products.slice(0, 5).map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-[13px] text-ink-400 w-4">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium truncate">{p.name}</p>
                  <p className="text-[12px] text-ink-400">{p.reviews} sold</p>
                </div>
                <span className="text-[13.5px] font-semibold shrink-0">{formatPKR(p.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-line rounded p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-[18px]">Recent orders</h2>
          <Link href="/admin/orders" className="text-[13.5px] font-semibold text-brand flex items-center gap-1 hover:underline">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-ink-400 border-b border-line">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="py-3 pr-4">
                    <Link href={`/admin/orders/${o.order_number}`} className="font-semibold text-brand hover:underline whitespace-nowrap">
                      {o.order_number}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">{o.customer_name}</td>
                  <td className="py-3 pr-4 text-ink-400 whitespace-nowrap">{new Date(o.created_at).toISOString().slice(0, 10)}</td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <span className="text-ink-600 mr-2">{paymentMethodLabel(o.payment_method)}</span>
                    <PaymentStatusBadge status={o.payment_status} />
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="py-3 text-right font-medium whitespace-nowrap">{formatRs(o.total)}</td>
                </tr>
              ))}
              {!loadError && orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-ink-400">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
