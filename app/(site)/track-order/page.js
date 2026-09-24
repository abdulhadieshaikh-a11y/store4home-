'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, CheckCircle2, Circle, PackageSearch, Loader2 } from 'lucide-react';
import { formatRs } from '@/lib/currency';
import { paymentMethodLabel, paymentStatusLabel } from '@/lib/orders';
import PaymentInstructions from '@/components/PaymentInstructions';

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('id') || '');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function search({ id, email: byEmail, token }) {
    const trimmed = (id || '').trim();
    if (!trimmed) return setResult(undefined);
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: trimmed, email: byEmail || '', token: token || '' }),
      });
      if (response.status === 404) return setResult(null);
      if (!response.ok) throw new Error('failed');
      const data = await response.json();
      setResult(data.order);
    } catch (e) {
      setResult(undefined);
      setError('We could not look up your order right now. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = searchParams.get('id');
    const token = searchParams.get('token');
    if (id) setQuery(id);
    // Links from the confirmation page and emails carry a private token.
    if (id && token) search({ id, token });
  }, [searchParams]);

  return (
    <div className="container-x py-12 md:py-16 max-w-[720px] mx-auto">
      <div className="text-center mb-10">
        <PackageSearch size={36} className="text-brand mx-auto mb-4" />
        <h1 className="font-display text-[30px] mb-2">Track your order</h1>
        <p className="text-ink-400 text-[14.5px]">Enter your order number and the email address you used at checkout.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          search({ id: query, email });
        }}
        className="flex flex-col sm:flex-row gap-3 mb-10"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Order number, e.g. S4H-10500"
          required
          className="flex-1 min-w-0 border border-line rounded-sm px-4 py-3 text-[14.5px] outline-none focus:border-brand"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className="flex-1 min-w-0 border border-line rounded-sm px-4 py-3 text-[14.5px] outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-6 py-3 rounded-sm hover:bg-brand-700 transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} Track
        </button>
      </form>

      {error && (
        <div className="text-center py-6 border border-line rounded bg-white mb-6">
          <p className="text-[14.5px] text-ink-600">{error}</p>
        </div>
      )}

      {result === null && (
        <div className="text-center py-10 border border-line rounded bg-white">
          <p className="text-[14.5px] text-ink-600 px-4">
            We couldn&apos;t find an order with that number and email address. Double-check them and try again.
          </p>
        </div>
      )}

      {result && (
        <div className="bg-white border border-line rounded p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-line">
            <div>
              <p className="text-[12px] text-ink-400 uppercase tracking-wide">Order number</p>
              <p className="text-[18px] font-semibold">{result.orderNumber}</p>
            </div>
            <span className="bg-brand-50 text-brand text-[13px] font-semibold px-3.5 py-1.5 rounded-full">{result.status}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-[14px]">
            <div>
              <p className="text-[12px] text-ink-400 uppercase tracking-wide">Payment method</p>
              <p className="font-medium">{paymentMethodLabel(result.paymentMethod)}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] text-ink-400 uppercase tracking-wide">Payment status</p>
              <p className="font-medium">{paymentStatusLabel(result.paymentStatus)}</p>
            </div>
          </div>

          {result.instructions && (
            <div className="bg-gold-50 border border-gold-100 rounded p-5 mb-8">
              <PaymentInstructions instructions={result.instructions} amount={formatRs(result.total)} orderNumber={result.orderNumber} />
            </div>
          )}

          <div className="flex flex-col">
            {result.timeline.map((step, i) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <CheckCircle2 size={22} className="text-brand shrink-0" />
                  ) : (
                    <Circle size={22} className="text-ink-200 shrink-0" />
                  )}
                  {i < result.timeline.length - 1 && (
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
              <p className="text-[12px] text-ink-400 uppercase tracking-wide mb-3 mt-3">Items</p>
              <div className="flex flex-col gap-2">
                {result.items.map((item, i) => (
                  <div key={`${item.name}-${i}`} className="flex justify-between gap-4 text-[14px]">
                    <span className="text-ink-600">
                      {item.name} {item.color ? `(${item.color})` : ''} &times; {item.quantity}
                    </span>
                    <span className="font-medium shrink-0">{formatRs(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[15px] font-semibold pt-3 mt-3 border-t border-line">
                <span>Total</span>
                <span>{formatRs(result.total)}</span>
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
