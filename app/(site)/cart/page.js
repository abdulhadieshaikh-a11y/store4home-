'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/currency';
import { shippingFor } from '@/lib/orders';

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x py-24 flex flex-col items-center text-center gap-5">
        <ShoppingBag size={48} className="text-ink-200" />
        <h1 className="font-display text-[26px]">Your bag is empty</h1>
        <p className="text-ink-400 text-[14.5px] max-w-[360px]">Browse the shop and add a few things you&apos;ll actually use.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-[14.5px] px-7 py-3.5 rounded-sm hover:bg-brand-700 transition-colors">
          Continue shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-14">
      <h1 className="font-display text-[32px] mb-8">Your Bag</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">
        <div>
          <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-3 border-b border-line text-[12.5px] font-semibold uppercase tracking-wide text-ink-400">
            <span>Product</span>
            <span>Quantity</span>
            <span className="text-right">Total</span>
            <span></span>
          </div>
          {items.map((item) => (
            <div key={item.key} className="grid grid-cols-[2fr_1fr_1fr_auto] sm:grid-cols-[2fr_1fr_1fr_auto] gap-4 py-6 border-b border-line items-center">
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-[70px] h-[84px] bg-ink-50 rounded shrink-0 overflow-hidden">
                  {item.image && <Image src={item.image} alt={item.name} fill sizes="70px" className="object-cover" />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-[14.5px] font-medium line-clamp-2">{item.name}</h3>
                  {item.color && <p className="text-[12.5px] text-ink-400 mt-1">Color: {item.color}</p>}
                  <p className="text-[13.5px] font-semibold mt-1">{formatPKR(item.price)}</p>
                </div>
              </div>
              <div className="flex items-center border border-line rounded-full w-fit">
                <button onClick={() => updateQty(item.key, item.qty - 1)} className="p-2 hover:text-brand" aria-label="Decrease quantity">
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center text-[13.5px]">{item.qty}</span>
                <button onClick={() => updateQty(item.key, item.qty + 1)} className="p-2 hover:text-brand" aria-label="Increase quantity">
                  <Plus size={13} />
                </button>
              </div>
              <span className="text-[14.5px] font-semibold text-right">{formatPKR(item.price * item.qty)}</span>
              <button onClick={() => removeItem(item.key)} className="text-ink-400 hover:text-ink justify-self-end" aria-label="Remove item">
                <X size={16} />
              </button>
            </div>
          ))}
          <Link href="/shop" className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand mt-6 hover:underline underline-offset-4">
            &larr; Continue shopping
          </Link>
        </div>

        <div className="bg-white border border-line rounded p-6 h-fit">
          <h2 className="font-display text-[20px] mb-5">Order Summary</h2>
          <div className="flex flex-col gap-3 text-[14px] pb-5 border-b border-line">
            <div className="flex justify-between text-ink-600">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : formatPKR(shipping)}</span>
            </div>
          </div>
          <div className="flex justify-between text-[16px] font-semibold py-5">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full bg-brand text-white font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
          >
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
