'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/currency';

export default function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, updateQty, removeItem, subtotal } = useCart();

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-ink/40" onClick={() => setDrawerOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[420px] bg-paper flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="font-display text-xl">Your bag ({items.length})</h2>
          <button onClick={() => setDrawerOpen(false)} className="focus-ring rounded p-1" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
            <ShoppingBag size={40} className="text-ink-200" />
            <p className="text-ink-400 text-[14.5px]">Your bag is empty. Add something you'll actually use.</p>
            <button
              onClick={() => setDrawerOpen(false)}
              className="text-[14px] font-semibold text-brand underline underline-offset-4"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.key} className="flex gap-4">
                  <div className="relative w-[76px] h-[92px] bg-ink-50 rounded shrink-0 overflow-hidden">
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="76px" className="object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] font-medium leading-snug line-clamp-2">{item.name}</h4>
                      <button onClick={() => removeItem(item.key)} className="text-ink-400 hover:text-ink shrink-0" aria-label="Remove item">
                        <X size={15} />
                      </button>
                    </div>
                    {item.color && <p className="text-[12.5px] text-ink-400 mt-0.5">Color: {item.color}</p>}
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-line rounded-full">
                        <button
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          className="p-1.5 hover:text-brand"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-[13px] w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          className="p-1.5 hover:text-brand"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[14px] font-semibold">{formatPKR(item.price * item.qty)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-line px-6 py-5">
              <div className="flex items-center justify-between mb-1.5 text-[14.5px]">
                <span className="text-ink-400">Subtotal</span>
                <span className="font-semibold">{formatPKR(subtotal)}</span>
              </div>
              <p className="text-[12.5px] text-ink-400 mb-4">Shipping and taxes calculated at checkout.</p>
              <Link
                href="/checkout"
                onClick={() => setDrawerOpen(false)}
                className="block w-full bg-brand text-white text-center font-semibold text-[14.5px] py-3.5 rounded-sm hover:bg-brand-700 transition-colors"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="block w-full text-center font-medium text-[13.5px] py-3 text-ink-600 hover:text-brand"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
