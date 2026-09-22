'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import StarRating from './StarRating';
import { ShoppingBag } from 'lucide-react';
import { formatPKR } from '@/lib/currency';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-ink-50 rounded overflow-hidden mb-3.5">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {product.compareAt && (
            <span className="absolute top-3 left-3 bg-gold text-white text-[11px] font-semibold px-2 py-1 rounded-sm">
              Save {Math.round(100 - (product.price / product.compareAt) * 100)}%
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product, 1, product.colors?.[0] || null);
            }}
            className="absolute bottom-0 left-0 right-0 bg-ink/90 text-paper text-[13px] font-medium py-2.5 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingBag size={14} /> Quick add
          </button>
        </div>
      </Link>
      <Link href={`/product/${product.id}`}>
        <h3 className="text-[14.5px] font-medium leading-snug mb-1 line-clamp-2 hover:text-brand transition-colors">
          {product.name}
        </h3>
      </Link>
      <StarRating rating={product.rating} reviews={product.reviews} />
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-[15px] font-semibold">{formatPKR(product.price)}</span>
        {product.compareAt && (
          <span className="text-[13px] text-ink-400 line-through">{formatPKR(product.compareAt)}</span>
        )}
      </div>
    </div>
  );
}
