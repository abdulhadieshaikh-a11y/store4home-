'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { orders, orderStatuses } from '@/data/orders';
import { formatPKR } from '@/lib/currency';
import { StatusBadge } from '../page';

export default function AdminOrdersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        o.id.toLowerCase().includes(query.toLowerCase()) || o.customer.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || o.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center bg-white border border-line rounded-full px-4 py-2.5 w-full sm:w-[280px]">
          <Search size={15} className="text-ink-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order # or customer..."
            className="bg-transparent outline-none text-[13.5px] px-2 w-full placeholder:text-ink-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-line rounded-sm px-3.5 py-2.5 text-[13.5px] outline-none focus:border-brand bg-white"
        >
          <option value="All">All statuses</option>
          {orderStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
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
                <th className="py-3 px-5 font-medium">Status</th>
                <th className="py-3 px-5 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0 hover:bg-ink-50/40">
                  <td className="py-3 px-5">
                    <Link href={`/admin/orders/${o.id}`} className="font-semibold text-brand hover:underline">
                      {o.id}
                    </Link>
                  </td>
                  <td className="py-3 px-5">{o.customer}</td>
                  <td className="py-3 px-5 text-ink-400">{o.date}</td>
                  <td className="py-3 px-5 text-ink-600">{o.payment}</td>
                  <td className="py-3 px-5"><StatusBadge status={o.status} /></td>
                  <td className="py-3 px-5 text-right font-medium">{formatPKR(o.total)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-ink-400">No orders match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
