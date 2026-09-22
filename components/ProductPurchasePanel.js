'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import StarRating from './StarRating';
import { formatPKR } from '@/lib/currency';

export default function ProductPurchasePanel({ product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors?.[0] || null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, qty, color);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square bg-ink-50 rounded overflow-hidden mb-3">
          <Image src={product.images[activeImage]} alt={product.name} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative w-[76px] h-[76px] rounded overflow-hidden border-2 ${
                  activeImage === i ? 'border-brand' : 'border-transparent'
                }`}
              >
                <Image src={img} alt={`${product.name} view ${i + 1}`} fill sizes="76px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <h1 className="font-display text-[30px] leading-tight mb-2.5">{product.name}</h1>
        <StarRating rating={product.rating} reviews={product.reviews} size={15} />
        <div className="flex items-center gap-3 mt-4 mb-6">
          <span className="text-[24px] font-semibold">{formatPKR(product.price)}</span>
          {product.compareAt && <span className="text-[16px] text-ink-400 line-through">{formatPKR(product.compareAt)}</span>}
          {product.compareAt && (
            <span className="text-[12.5px] font-semibold text-brand bg-brand-50 px-2 py-1 rounded-sm">
              Save {Math.round(100 - (product.price / product.compareAt) * 100)}%
            </span>
          )}
        </div>

        <p className="text-[14.5px] text-ink-600 leading-relaxed mb-7">{product.description}</p>

        {product.colors?.length > 0 && (
          <div className="mb-6">
            <p className="text-[13px] font-semibold mb-2.5">Color: <span className="font-normal text-ink-600">{color}</span></p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-4 py-2 rounded-full border text-[13px] transition-colors ${
                    color === c ? 'border-brand bg-brand-50 text-brand font-semibold' : 'border-line hover:border-ink-400'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-line rounded-full">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-brand" aria-label="Decrease quantity">
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-[14px]">{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-brand" aria-label="Increase quantity">
              <Plus size={14} />
            </button>
          </div>
          <span className="text-[13px] text-ink-400">{product.stock} in stock</span>
        </div>

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 bg-brand text-white font-semibold text-[15px] py-4 rounded-sm hover:bg-brand-700 transition-colors mb-3"
        >
          <ShoppingBag size={17} /> {added ? 'Added to bag' : 'Add to bag'}
        </button>

        <div className="flex flex-col gap-2.5 mt-6 pt-6 border-t border-line">
          <div className="flex items-center gap-3 text-[13.5px] text-ink-600">
            <Truck size={16} className="text-brand" /> Delivered in 2–5 business days
          </div>
          <div className="flex items-center gap-3 text-[13.5px] text-ink-600">
            <RotateCcw size={16} className="text-brand" /> 30-day hassle-free returns
          </div>
        </div>

        {product.highlights?.length > 0 && (
          <div className="mt-7 pt-7 border-t border-line">
            <h3 className="text-[13px] font-semibold uppercase tracking-wide mb-3">Highlights</h3>
            <ul className="flex flex-col gap-2">
              {product.highlights.map((h) => (
                <li key={h} className="text-[14px] text-ink-600 flex gap-2.5">
                  <span className="text-gold mt-0.5">&bull;</span> {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
