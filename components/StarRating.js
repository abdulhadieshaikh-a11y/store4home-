import { Star } from 'lucide-react';

export default function StarRating({ rating, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(rating) ? 'fill-gold text-gold' : 'fill-ink-100 text-ink-100'}
          />
        ))}
      </div>
      <span className="text-[12.5px] text-ink-400">
        {rating.toFixed(1)}
        {reviews ? ` (${reviews})` : ''}
      </span>
    </div>
  );
}
