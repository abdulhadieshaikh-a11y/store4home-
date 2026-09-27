'use client';

import { useEffect, useState } from 'react';
import { getOpenState, type OpenState } from '@/lib/hours';

/** Live open / closed indicator in Karachi time. Renders nothing until mounted to avoid hydration mismatch. */
export default function OpenStatus({ className = '', tone = 'cream' }: { className?: string; tone?: 'cream' | 'iron' }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const t = window.setInterval(tick, 60_000);
    return () => window.clearInterval(t);
  }, []);

  const text = tone === 'cream' ? 'text-cream' : 'text-iron-900';

  return (
    <p
      aria-live="polite"
      className={`inline-flex min-h-[1.5rem] items-center gap-2.5 font-label text-[0.72rem] uppercase tracking-label ${text} ${className}`}
    >
      {state ? (
        <>
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            {state.open ? <span className="absolute inset-0 animate-ping rounded-full bg-ember-400 opacity-60 motion-reduce:hidden" /> : null}
            <span className={`relative h-2.5 w-2.5 rounded-full ${state.open ? 'bg-ember-400' : 'bg-current opacity-40'}`} />
          </span>
          <span>{state.label}</span>
          <span className="opacity-60">· {state.detail}</span>
          <span className="sr-only">(Karachi time)</span>
        </>
      ) : null}
    </p>
  );
}
