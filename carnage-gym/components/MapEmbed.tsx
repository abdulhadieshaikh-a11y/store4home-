import { maps, site } from '@/lib/site';

type Props = { className?: string; title?: string };

/**
 * Google Maps embed (no API key required), graded to match the monochrome
 * identity. Lazy-loaded so it never blocks the initial render.
 */
export default function MapEmbed({ className = '', title = `Map showing ${site.name} in DHA Phase 6, Karachi` }: Props) {
  return (
    <div className={`relative overflow-hidden bg-iron ${className}`}>
      <iframe
        src={maps.embed}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
        allowFullScreen
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}
