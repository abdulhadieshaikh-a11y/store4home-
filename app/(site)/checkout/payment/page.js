'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, Landmark, Smartphone, ArrowRight, ArrowLeft, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { OrderSummary } from '../page';
import { formatPKR } from '@/lib/currency';
import { shippingFor } from '@/lib/orders';
import PaymentInstructions from '@/components/PaymentInstructions';

const methodInfo = {
  cod: { label: 'Cash on Delivery', icon: Truck, sub: 'Pay when your order arrives' },
  bank_transfer: { label: 'Bank Transfer', icon: Landmark, sub: 'Transfer to our bank account' },
  easypaisa: { label: 'Easypaisa', icon: Smartphone, sub: 'Send payment to our Easypaisa account' },
  card: { label: 'Credit / Debit Card', icon: CreditCard, sub: 'Pay securely with our payment partner' },
};

// One key per checkout attempt. Re-sending the same key (double click, network retry)
// returns the original order instead of creating a duplicate.
const KEY_STORAGE = 's4h-checkout-key';

function newKey() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getCheckoutKey() {
  try {
    const existing = sessionStorage.getItem(KEY_STORAGE);
    if (existing) return existing;
    const key = newKey();
    sessionStorage.setItem(KEY_STORAGE, key);
    return key;
  } catch (e) {
    return newKey();
  }
}

function resetCheckoutKey() {
  try {
    sessionStorage.removeItem(KEY_STORAGE);
  } catch (e) {
    /* ignore */
  }
}

export default function PaymentStep() {
  const { items, subtotal, clearCart } = useCart();
  const { shipping, setPayment, setCompletedOrder } = useCheckout();
  const router = useRouter();
  const [methods, setMethods] = useState(null);
  const [loadError, setLoadError] = useState('');
  const [method, setMethod] = useState('cod');
  const [reference, setReference] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const submittingRef = useRef(false);

  useEffect(() => {
    if (!shipping) router.replace('/checkout');
  }, [shipping, router]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/checkout/payment-methods', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('failed'))))
      .then((data) => {
        if (!cancelled) setMethods(data.methods);
      })
      .catch(() => {
        if (!cancelled) setLoadError('We could not load payment options. Please refresh the page to try again.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const shippingCost = shippingFor(subtotal);
  const total = subtotal + shippingCost;
  const selected = methods?.find((m) => m.id === method);

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (submittingRef.current || !selected) return;
    submittingRef.current = true;
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey: getCheckoutKey(),
          shipping,
          items: items.map((i) => ({ id: i.id, qty: i.qty, color: i.color })),
          paymentMethod: method,
          paymentReference: method === 'bank_transfer' || method === 'easypaisa' ? reference : '',
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // A validation error means no order was created, so a corrected retry gets a new key.
        // For server/network errors keep the key: the retry must not create a second order.
        if (response.status === 400) resetCheckoutKey();
        setError(data.error || 'We could not place your order. Please try again.');
        return;
      }

      resetCheckoutKey();
      setPayment({ method });
      setCompletedOrder({ ...data.order, emailSent: data.emailSent, instructions: data.instructions });
      clearCart();
      if (data.paymentRedirectUrl) {
        window.location.assign(data.paymentRedirectUrl);
      } else {
        router.push('/checkout/confirmation');
      }
    } catch (err) {
      setError('Connection problem - your order may not have gone through. Please try again; you will not be charged twice.');
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  }

  if (!shipping) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
      <form onSubmit={handlePlaceOrder}>
        <h1 className="font-display text-[26px] mb-1">Payment method</h1>
        <p className="text-ink-400 text-[14px] mb-7">Choose how you&apos;d like to pay.</p>

        {!methods && !loadError && (
          <div className="flex items-center gap-2 text-[14px] text-ink-400 mb-7">
            <Loader2 size={16} className="animate-spin" /> Loading payment options...
          </div>
        )}
        {loadError && <ErrorBox message={loadError} />}

        {methods && (
          <div className="flex flex-col gap-3 mb-7">
            {methods.map((m) => {
              const info = methodInfo[m.id];
              if (!info) return null;
              const Icon = info.icon;
              const active = method === m.id;
              return (
                <label
                  key={m.id}
                  className={`flex items-center gap-4 border rounded p-4 cursor-pointer transition-colors ${
                    active ? 'border-brand bg-brand-50' : 'border-line hover:border-ink-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={active}
                    onChange={() => setMethod(m.id)}
                    className="shrink-0"
                  />
                  <Icon size={20} className={active ? 'text-brand' : 'text-ink-400'} />
                  <div className="min-w-0">
                    <p className="text-[14.5px] font-semibold">{info.label}</p>
                    <p className="text-[12.5px] text-ink-400">{info.sub}</p>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {method === 'cod' && selected && (
          <div className="border border-line rounded p-5 mb-7 text-[14px] text-ink-600 leading-relaxed">
            Have <strong>{formatPKR(total)}</strong> ready in cash when your order arrives. Our courier will confirm the amount before handing over the package.
          </div>
        )}

        {(method === 'bank_transfer' || method === 'easypaisa') && selected?.instructions && (
          <div className="border border-line rounded p-5 mb-7">
            <PaymentInstructions instructions={selected.instructions} amount={formatPKR(total)} />
            <div className="mt-4">
              <label className="text-[13px] font-semibold block mb-1.5">
                Transaction ID / reference <span className="font-normal text-ink-400">(optional)</span>
              </label>
              <input
                type="text"
                value={reference}
                maxLength={100}
                onChange={(e) => setReference(e.target.value)}
                placeholder="If you have already paid, enter the transaction ID"
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
          </div>
        )}

        {method === 'card' && selected && (
          <div className="border border-line rounded p-5 mb-7 text-[14px] text-ink-600 leading-relaxed">
            <p className="flex items-center gap-1.5">
              <Lock size={14} /> After placing your order you will be taken to our secure payment partner to pay{' '}
              <strong>{formatPKR(total)}</strong>. Card details are never entered on or stored by this site.
            </p>
          </div>
        )}

        {error && <ErrorBox message={error} />}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 border border-line font-semibold text-[14.5px] px-6 py-3.5 rounded-sm hover:border-ink-400 transition-colors disabled:opacity-60"
          >
            <ArrowLeft size={16} /> Back to shipping
          </button>
          <button
            type="submit"
            disabled={submitting || !selected || items.length === 0}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-sm hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Placing order...
              </>
            ) : (
              <>
                Place order &mdash; {formatPKR(total)} <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>

      <OrderSummary items={items} subtotal={subtotal} shippingCost={shippingCost} total={total} />
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div role="alert" className="flex items-start gap-2 border border-gold-100 bg-gold-50 text-gold-700 rounded p-4 mb-6 text-[14px]">
      <AlertCircle size={18} className="shrink-0 mt-0.5" />
      <span>{message}</span>
    </div>
  );
}
