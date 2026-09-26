'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * One shared IntersectionObserver for every [data-reveal] element on the page.
 * Elements opt in declaratively (`data-reveal`, `data-reveal="image"`,
 * `data-reveal="fade"`) and can stagger with `style={{ '--reveal-delay': '120ms' }}`.
 * Re-scans on every route change.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
