import Image from 'next/image';
import Art, { type ArtName, type ArtTone } from '@/components/art/Art';

/**
 * Image slot with a consistent film treatment.
 * - With `image`: renders an optimised photo, graded warm (sepia, lifted contrast,
 *   burnt-orange multiply) so any photo the gym supplies matches the identity.
 * - Without: renders the matching vintage illustration.
 */
export default function Visual({
  art,
  tone = 'dark',
  image,
  alt,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  zoom = true,
  label,
}: {
  art: ArtName;
  tone?: ArtTone;
  image?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  zoom?: boolean;
  label?: string;
}) {
  return (
    <div className={`group/visual relative isolate overflow-hidden bg-iron-900 ${className}`}>
      <div className={`absolute inset-0 ${zoom ? 'transition-transform duration-[1600ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover/visual:scale-[1.04]' : ''}`}>
        {image ? (
          <>
            <Image
              src={image}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover [filter:grayscale(.35)_sepia(.35)_contrast(1.08)_brightness(.88)]"
            />
            <div className="absolute inset-0 bg-ember-600/25 mix-blend-multiply" aria-hidden />
          </>
        ) : (
          <Art name={art} tone={tone} title={alt} className="absolute inset-0 h-full w-full" />
        )}
      </div>
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />
      {label ? (
        <span className="absolute left-4 top-4 z-10 border border-cream/40 bg-iron-950/40 px-2.5 py-1 font-label text-[0.62rem] uppercase tracking-label text-cream backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}
