import Link from 'next/link';
import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight, ArrowRight } from 'lucide-react';
import { orders } from '@/data/orders';
import { products } from '@/data/products';
import { customers } from '@/data/customers';

const weekly = [
  { day: 'Mon', value: 32 },
  { day: 'Tue', value: 48 },
  { day: 'Wed', value: 40 },
  { day: 'Thu', value: 62 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 78 },
  { day: 'Sun', value: 66 },
];

export default function AdminDashboard() {
  const revenue = orders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0);
  const activeOrders = orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const maxWeekly = Math.max(...weekly.map((w) => w.value));

  const stats = [
    { label: 'Total Revenue', value: `$${revenue.toFixed(2)}`, delta: '+12.4%', icon: DollarSign },
    { label: 'Orders', value: orders.length, delta: `${activeOrders} active`, icon: ShoppingCart },
    { label: 'Customers', value: customers.length, delta: '+2 this week', icon: Users },
    { label: 'Products', value: products.length, delta: '3 low stock', icon: Package },
  ];

  return (
    <div>
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
                <span className="text-[13.5px] font-semibold shrink-0">${p.price}</span>
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
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-semibold text-brand hover:underline">
                      {o.id}
                    </Link>
                  </td>
                  <td className="py-3">{o.customer}</td>
                  <td className="py-3 text-ink-400">{o.date}</td>
                  <td className="py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="py-3 text-right font-medium">${o.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    Processing: 'bg-gold-50 text-gold-700',
    Confirmed: 'bg-brand-50 text-brand',
    Shipped: 'bg-brand-50 text-brand',
    'Out for Delivery': 'bg-brand-50 text-brand',
    Delivered: 'bg-brand text-white',
    Cancelled: 'bg-ink-100 text-ink-600',
  };
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-[12px] font-semibold ${styles[status] || 'bg-ink-100 text-ink-600'}`}>
      {status}
    </span>
  );
}
