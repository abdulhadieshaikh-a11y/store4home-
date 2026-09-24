'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, PackageSearch } from 'lucide-react';
import { useCheckout } from '@/context/CheckoutContext';
import { formatRs } from '@/lib/currency';
import { paymentMethodLabel, paymentStatusLabel } from '@/lib/orders';
import PaymentInstructions from '@/components/PaymentInstructions';

export default function ConfirmationStep() {
  const { completedOrder, hydrated } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !completedOrder) router.replace('/');
  }, [hydrated, completedOrder, router]);

  if (!completedOrder) return null;

  const { orderNumber, trackingToken, items, subtotal, shippingFee, total, shipping, paymentMethod, paymentStatus, status, instructions } =
    completedOrder;
  const awaitingManualPayment = instructions && paymentStatus === 'pending';

  return (
    <div className="max-w-[640px] mx-auto text-center">
      <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={32} className="text-brand" />
      </div>
      <h1 className="font-display text-[30px] mb-2">Order placed</h1>
      <p className="text-ink-600 text-[15px] mb-1">
        Thank you, {shipping?.fullName?.split(' ')[0] || 'there'} — we&apos;ve received your order.
      </p>
      <p className="text-ink-400 text-[13.5px] mb-10">
        {completedOrder.emailSent
          ? `A confirmation has been sent to ${shipping?.email}. `
          : `Your order is saved, but we could not send the confirmation email to ${shipping?.email} right now. `}
        Order number <strong className="text-ink">{orderNumber}</strong>
      </p>

      {awaitingManualPayment && (
        <div className="bg-gold-50 border border-gold-100 rounded p-6 text-left mb-8">
          <PaymentInstructions instructions={instructions} amount={formatRs(total)} orderNumber={orderNumber} />
        </div>
      )}

      <div className="bg-white border border-line rounded p-6 text-left mb-8">
        <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-line">
          <div>
            <p className="text-[12px] text-ink-400 uppercase tracking-wide">Order number</p>
            <p className="text-[15px] font-semibold">{orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-ink-400 uppercase tracking-wide">Order status</p>
            <p className="text-[15px] font-semibold">{status}</p>
          </div>
          <div>
            <p className="text-[12px] text-ink-400 uppercase tracking-wide">Payment method</p>
            <p className="text-[15px] font-semibold">{paymentMethodLabel(paymentMethod)}</p>
          </div>
          <div className="text-right">
            <p className="text-[12px] text-ink-400 uppercase tracking-wide">Payment status</p>
            <p className="text-[15px] font-semibold">{paymentStatusLabel(paymentStatus)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-5">
          {items.map((item, i) => (
            <div key={`${item.name}-${item.color}-${i}`} className="flex justify-between gap-4 text-[14px]">
              <span className="text-ink-600">
                {item.name} {item.color ? `(${item.color})` : ''} &times; {item.quantity}
              </span>
              <span className="font-medium shrink-0">{formatRs(item.lineTotal)}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-4 border-t border-line text-[14px]">
          <div className="flex justify-between text-ink-600">
            <span>Subtotal</span>
            <span>{formatRs(subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-600">
            <span>Shipping</span>
            <span>{Number(shippingFee) === 0 ? 'Free' : formatRs(shippingFee)}</span>
          </div>
          <div className="flex justify-between text-[16px] font-semibold pt-2 border-t border-line mt-1">
            <span>Total</span>
            <span>{formatRs(total)}</span>
          </div>
        </div>

        {shipping && (
          <div className="mt-5 pt-5 border-t border-line text-[13.5px] text-ink-600">
            <p className="text-[12px] text-ink-400 uppercase tracking-wide mb-1.5">Shipping to</p>
            <p>{shipping.fullName}</p>
            <p>{shipping.address}, {shipping.city} {shipping.postalCode}</p>
            <p>{shipping.phone}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/track-order?id=${encodeURIComponent(orderNumber)}&token=${encodeURIComponent(trackingToken)}`}
          className="inline-flex items-center justify-center gap-2 border border-line font-semibold text-[14.5px] px-6 py-3.5 rounded-sm hover:border-ink-400 transition-colors"
        >
          <PackageSearch size={16} /> Track this order
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-6 py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
        >
          Continue shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
