'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, PackageSearch } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/categories';

export default function Header() {
  const { count, setDrawerOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="bg-brand text-paper text-[13px]">
        <div className="container-x flex items-center justify-center py-2 text-center">
          Free shipping across Pakistan on orders over Rs. 5,000
        </div>
      </div>

      <div className="container-x flex items-center justify-between h-[72px] gap-6">
        <button
          className="md:hidden focus-ring rounded p-1"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="font-display text-[26px] leading-none tracking-tight shrink-0">
          store<span className="text-gold">4</span>home
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14.5px] font-medium">
          {categories.slice(0, 5).map((c) => (
            <Link key={c.id} href={`/shop/${c.id}`} className="hover:text-brand transition-colors">
              {c.name}
            </Link>
          ))}
          <Link href="/shop" className="hover:text-brand transition-colors">
            All Products
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <form action="/shop" className="hidden lg:flex items-center bg-white border border-line rounded-full px-3.5 py-2 w-[220px] focus-within:border-brand transition-colors">
            <Search size={16} className="text-ink-400 shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="Search products"
              className="bg-transparent outline-none text-sm px-2 w-full placeholder:text-ink-400"
            />
          </form>
          <Link href="/track-order" className="hidden sm:flex focus-ring rounded p-2 hover:bg-ink-50 transition-colors" aria-label="Track order" title="Track order">
            <PackageSearch size={20} />
          </Link>
          <Link href="/login" className="focus-ring rounded p-2 hover:bg-ink-50 transition-colors" aria-label="Account">
            <User size={20} />
          </Link>
          <button
            className="relative focus-ring rounded p-2 hover:bg-ink-50 transition-colors"
            aria-label="Open cart"
            onClick={() => setDrawerOpen(true)}
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[78%] max-w-[320px] bg-paper p-6 animate-slide-in" style={{ transform: 'translateX(0)', animation: 'none' }}>
            <div className="flex items-center justify-between mb-8">
              <span className="font-display text-xl">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="focus-ring rounded p-1" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/shop/${c.id}`}
                  className="py-3 border-b border-line text-[15px]"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
              <Link href="/shop" className="py-3 border-b border-line text-[15px]" onClick={() => setMobileOpen(false)}>
                All Products
              </Link>
              <Link href="/track-order" className="py-3 border-b border-line text-[15px]" onClick={() => setMobileOpen(false)}>
                Track Order
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
