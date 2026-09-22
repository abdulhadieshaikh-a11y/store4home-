'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Circle, PackageSearch } from 'lucide-react';
import { getOrder, orders } from '@/data/orders';
import { formatPKR } from '@/lib/currency';

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('id') || '');
  const [result, setResult] = useState(undefined);

  function search(id) {
    const trimmed = id.trim();
    if (!trimmed) return setResult(undefined);
    const found = getOrder(trimmed);
    if (found) {
      setResult(found);
    } else if (/^S4H-\d+$/i.test(trimmed)) {
      // Freshly placed demo order not in the seeded order book — synthesize a fresh tracking record.
      setResult({
        id: trimmed.toUpperCase(),
        date: new Date().toISOString().slice(0, 10),
        status: 'Processing',
        payment: '—',
        total: null,
        items: [],
        tracking: [
          { step: 'Order placed', date: new Date().toISOString().slice(0, 10), done: true },
          { step: 'Confirmed', date: '', done: false },
          { step: 'Shipped', date: '', done: false },
          { step: 'Out for delivery', date: '', done: false },
          { step: 'Delivered', date: '', done: false },
        ],
      });
    } else {
      setResult(null);
    }
  }

  useEffect(() => {
    if (searchParams.get('id')) search(searchParams.get('id'));
  }, [searchParams]);

  return (
    <div className="container-x py-12 md:py-16 max-w-[720px] mx-auto">
      <div className="text-center mb-10">
        <PackageSearch size={36} className="text-brand mx-auto mb-4" />
        <h1 className="font-display text-[30px] mb-2">Track your order</h1>
        <p className="text-ink-400 text-[14.5px]">Enter your order number to see its current status.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(query);
        }}
        className="flex gap-3 mb-4"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. S4H-10482"
          className="flex-1 border border-line rounded-sm px-4 py-3 text-[14.5px] outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-6 rounded-sm hover:bg-brand-700 transition-colors"
        >
          <Search size={16} /> Track
        </button>
      </form>
      <p className="text-[12.5px] text-ink-400 mb-10">
        Try a sample: {orders.map((o) => o.id).join(', ')}
      </p>

      {result === null && (
        <div className="text-center py-10 border border-line rounded bg-white">
          <p className="text-[14.5px] text-ink-600">We couldn&apos;t find an order with that number. Double-check it and try again.</p>
        </div>
      )}

      {result && (
        <div className="bg-white border border-line rounded p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-line">
            <div>
              <p className="text-[12px] text-ink-400 uppercase tracking-wide">Order number</p>
              <p className="text-[18px] font-semibold">{result.id}</p>
            </div>
            <span className="bg-brand-50 text-brand text-[13px] font-semibold px-3.5 py-1.5 rounded-full">
              {result.status}
            </span>
          </div>

          <div className="flex flex-col">
            {result.tracking.map((step, i) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <CheckCircle2 size={22} className="text-brand shrink-0" />
                  ) : (
                    <Circle size={22} className="text-ink-200 shrink-0" />
                  )}
                  {i < result.tracking.length - 1 && (
                    <div className={`w-px flex-1 min-h-[36px] ${step.done ? 'bg-brand' : 'bg-line'}`} />
                  )}
                </div>
                <div className="pb-8">
                  <p className={`text-[14.5px] font-medium ${step.done ? 'text-ink' : 'text-ink-400'}`}>{step.step}</p>
                  {step.date && <p className="text-[12.5px] text-ink-400 mt-0.5">{step.date}</p>}
                </div>
              </div>
            ))}
          </div>

          {result.items?.length > 0 && (
            <div className="pt-2 mt-2 border-t border-line">
              <p className="text-[12px] text-ink-400 uppercase tracking-wide mb-3">Items</p>
              <div className="flex flex-col gap-2">
                {result.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-[14px]">
                    <span className="text-ink-600">{item.name} &times; {item.qty}</span>
                    <span className="font-medium">{formatPKR(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={null}>
      <TrackOrderInner />
    </Suspense>
  );
}
