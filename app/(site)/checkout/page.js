'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';

export default function ShippingStep() {
  const { items, subtotal } = useCart();
  const { setShipping } = useCheckout();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const shippingCost = subtotal > 100 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shippingCost;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShipping(form);
    router.push('/checkout/payment');
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-ink-400 mb-5">Your bag is empty — add something before checking out.</p>
        <Link href="/shop" className="text-brand font-semibold underline underline-offset-4">Go to shop</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
      <form onSubmit={handleSubmit}>
        <h1 className="font-display text-[26px] mb-1">Shipping details</h1>
        <p className="text-ink-400 text-[14px] mb-7">Tell us where to send your order.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Full name" value={form.fullName} onChange={(v) => update('fullName', v)} required />
          <Field label="Phone number" value={form.phone} onChange={(v) => update('phone', v)} type="tel" required />
        </div>
        <Field label="Email address" value={form.email} onChange={(v) => update('email', v)} type="email" required className="mb-4" />
        <Field label="Street address" value={form.address} onChange={(v) => update('address', v)} required className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="City" value={form.city} onChange={(v) => update('city', v)} required />
          <Field label="Postal code" value={form.postalCode} onChange={(v) => update('postalCode', v)} required />
        </div>
        <div className="mb-8">
          <label className="text-[13px] font-semibold block mb-1.5">Delivery notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
            rows={3}
            className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand resize-none"
            placeholder="Gate code, landmark, preferred delivery time..."
          />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-8 py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
        >
          Continue to payment <ArrowRight size={16} />
        </button>
      </form>

      <OrderSummary items={items} subtotal={subtotal} shippingCost={shippingCost} total={total} />
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required, className = '' }) {
  return (
    <div className={className}>
      <label className="text-[13px] font-semibold block mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-line rounded-sm px-3.5 py-2.5 text-[14px] outline-none focus:border-brand"
      />
    </div>
  );
}

export function OrderSummary({ items, subtotal, shippingCost, total }) {
  return (
    <div className="bg-white border border-line rounded p-6 h-fit">
      <h2 className="font-display text-[19px] mb-5">Order Summary</h2>
      <div className="flex flex-col gap-4 mb-5 max-h-[280px] overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.key} className="flex gap-3">
            <div className="relative w-[52px] h-[62px] bg-ink-50 rounded shrink-0 overflow-hidden">
              {item.image && <Image src={item.image} alt={item.name} fill sizes="52px" className="object-cover" />}
              <span className="absolute -top-1.5 -right-1.5 bg-ink text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {item.qty}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium line-clamp-2">{item.name}</p>
              {item.color && <p className="text-[11.5px] text-ink-400">{item.color}</p>}
            </div>
            <span className="text-[13px] font-semibold shrink-0">${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5 text-[14px] pt-4 border-t border-line">
        <div className="flex justify-between text-ink-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-ink-600">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-[16px] font-semibold pt-2.5 border-t border-line mt-1">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
