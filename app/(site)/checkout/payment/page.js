'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, Wallet, ArrowRight, ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { OrderSummary } from '../page';

const methods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, sub: 'Visa, Mastercard, UnionPay' },
  { id: 'cod', label: 'Cash on Delivery', icon: Truck, sub: 'Pay when your order arrives' },
  { id: 'wallet', label: 'Mobile Wallet', icon: Wallet, sub: 'JazzCash, Easypaisa' },
];

export default function PaymentStep() {
  const { items, subtotal, clearCart } = useCart();
  const { shipping, setPayment, setCompletedOrder } = useCheckout();
  const router = useRouter();
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  useEffect(() => {
    if (!shipping) router.replace('/checkout');
  }, [shipping, router]);

  const shippingCost = subtotal > 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shippingCost;

  function handlePlaceOrder(e) {
    e.preventDefault();
    const orderId = `S4H-${Math.floor(10000 + Math.random() * 89999)}`;
    setPayment({ method });
    setCompletedOrder({
      id: orderId,
      date: new Date().toISOString().slice(0, 10),
      items,
      subtotal,
      shippingCost,
      total,
      shipping,
      paymentMethod: methods.find((m) => m.id === method)?.label,
    });
    clearCart();
    router.push('/checkout/confirmation');
  }

  if (!shipping) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
      <form onSubmit={handlePlaceOrder}>
        <h1 className="font-display text-[26px] mb-1">Payment method</h1>
        <p className="text-ink-400 text-[14px] mb-7">Choose how you&apos;d like to pay. This is a demo checkout — no charge will be made.</p>

        <div className="flex flex-col gap-3 mb-7">
          {methods.map((m) => {
            const Icon = m.icon;
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
                  <p className="text-[14.5px] font-semibold">{m.label}</p>
                  <p className="text-[12.5px] text-ink-400">{m.sub}</p>
                </div>
              </label>
            );
          })}
        </div>

        {method === 'card' && (
          <div className="border border-line rounded p-5 mb-7 flex flex-col gap-4">
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Card number</label>
              <input
                type="text"
                required
                placeholder="1234 1234 1234 1234"
                value={card.number}
                maxLength={19}
                onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-[13px] font-semibold block mb-1.5">Name on card</label>
              <input
                type="text"
                required
                placeholder="As shown on card"
                value={card.name}
                onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-semibold block mb-1.5">Expiry</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  maxLength={5}
                  value={card.expiry}
                  onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                  className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="text-[13px] font-semibold block mb-1.5">CVC</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  maxLength={4}
                  value={card.cvc}
                  onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value }))}
                  className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
                />
              </div>
            </div>
            <p className="flex items-center gap-1.5 text-[12px] text-ink-400">
              <Lock size={12} /> Encrypted and secure. Card details are never stored.
            </p>
          </div>
        )}

        {method === 'cod' && (
          <div className="border border-line rounded p-5 mb-7 text-[14px] text-ink-600 leading-relaxed">
            Have <strong>${total.toFixed(2)}</strong> ready in cash when your order arrives. Our courier will confirm the amount before handing over the package.
          </div>
        )}

        {method === 'wallet' && (
          <div className="border border-line rounded p-5 mb-7 text-[14px] text-ink-600 leading-relaxed">
            You&apos;ll receive a payment request on your registered mobile wallet after placing the order.
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="inline-flex items-center justify-center gap-2 border border-line font-semibold text-[14.5px] px-6 py-3.5 rounded-sm hover:border-ink-400 transition-colors"
          >
            <ArrowLeft size={16} /> Back to shipping
          </button>
          <button
            type="submit"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
          >
            Place order &mdash; ${total.toFixed(2)} <ArrowRight size={16} />
          </button>
        </div>
      </form>

      <OrderSummary items={items} subtotal={subtotal} shippingCost={shippingCost} total={total} />
    </div>
  );
}
