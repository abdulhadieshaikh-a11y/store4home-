'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/**
 * Scroll-triggered reveal. Content is fully visible without JS and for
 * prefers-reduced-motion users (handled in CSS); the hidden start state is only
 * applied once the observer is ready, so nothing is ever stuck invisible.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  effect = 'up',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  as?: ElementType;
  effect?: 'up' | 'fade' | 'mask' | 'line';
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return;
    el.dataset.reveal = 'pending';
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.reveal = 'in';
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-effect={effect} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
