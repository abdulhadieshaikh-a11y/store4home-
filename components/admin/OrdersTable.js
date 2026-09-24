'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { formatRs } from '@/lib/currency';
import { ORDER_STATUSES, PAYMENT_STATUSES, paymentMethodLabel, paymentStatusLabel } from '@/lib/orders';
import StatusBadge from './StatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';

export default function OrdersTable({ orders }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [payment, setPayment] = useState('All');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return orders.filter((o) => {
      const matchesQuery =
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q);
      const matchesStatus = status === 'All' || o.status === status;
      const matchesPayment = payment === 'All' || o.payment_status === payment;
      return matchesQuery && matchesStatus && matchesPayment;
    });
  }, [orders, query, status, payment]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center bg-white border border-line rounded-full px-4 py-2.5 w-full sm:w-[280px]">
          <Search size={15} className="text-ink-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order #, customer or email..."
            className="bg-transparent outline-none text-[13.5px] px-2 w-full placeholder:text-ink-400"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            aria-label="Filter by payment status"
            className="border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand bg-white"
          >
            <option value="All">All payments</option>
            {PAYMENT_STATUSES.map((s) => (
              <option key={s} value={s}>{paymentStatusLabel(s)}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by order status"
            className="border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand bg-white"
          >
            <option value="All">All statuses</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-line rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-ink-400 border-b border-line bg-ink-50/50">
                <th className="py-3 px-5 font-medium">Order</th>
                <th className="py-3 px-5 font-medium">Customer</th>
                <th className="py-3 px-5 font-medium">Date</th>
                <th className="py-3 px-5 font-medium">Payment</th>
                <th className="py-3 px-5 font-medium">Payment status</th>
                <th className="py-3 px-5 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0 hover:bg-ink-50/40">
                  <td className="py-3 px-5 whitespace-nowrap">
                    <Link href={`/admin/orders/${o.order_number}`} className="font-semibold text-brand hover:underline">
                      {o.order_number}
                    </Link>
                    <p className="text-[12px] text-ink-400">{o.item_count} item(s)</p>
                  </td>
                  <td className="py-3 px-5">
                    {o.customer_name}
                    <p className="text-[12px] text-ink-400">{o.customer_email}</p>
                  </td>
                  <td className="py-3 px-5 text-ink-400 whitespace-nowrap">{new Date(o.created_at).toISOString().slice(0, 10)}</td>
                  <td className="py-3 px-5 text-ink-600 whitespace-nowrap">{paymentMethodLabel(o.payment_method)}</td>
                  <td className="py-3 px-5"><PaymentStatusBadge status={o.payment_status} /></td>
                  <td className="py-3 px-5"><StatusBadge status={o.status} /></td>
                  <td className="py-3 px-5 text-right font-medium whitespace-nowrap">{formatRs(o.total)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-ink-400">
                    {orders.length === 0 ? 'No orders yet.' : 'No orders match your filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
