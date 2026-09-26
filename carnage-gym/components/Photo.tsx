'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { SiteImage } from '@/lib/images';

type Props = {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Extra classes on the <img> itself (e.g. hover zoom). */
  imgClassName?: string;
  mono?: boolean;
  quality?: number;
};

/**
 * Cinematic image wrapper. Fills its (relatively positioned) parent, applies
 * the monochrome grade, and degrades gracefully to a textured dark panel if
 * a remote image ever fails to load — so a layout never shows a broken image.
 */
export default function Photo({ image, sizes, priority, className = '', imgClassName = '', mono = true, quality }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-iron ${className}`}>
      {failed ? (
        <div
          role="img"
          aria-label={image.alt}
          className="grain absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#2c2c2c_0%,#141414_55%,#070707_100%)]"
        />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          onError={() => setFailed(true)}
          className={`object-cover ${mono ? 'photo-mono' : ''} ${imgClassName}`}
        />
      )}
    </div>
  );
}
