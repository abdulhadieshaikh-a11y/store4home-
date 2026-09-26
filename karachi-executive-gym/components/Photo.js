'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

// next/image with a designed fallback, so a missing photo never shows a broken image.
export default function Photo({ src, alt, className = '', imgClassName = '', sizes, priority = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`}>
      {failed ? (
        <div
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
          className="grain absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_30%_20%,#262a31_0%,#111317_55%,#050505_100%)]"
        >
          <Dumbbell className="h-10 w-10 text-white/10" strokeWidth={1.25} aria-hidden="true" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
