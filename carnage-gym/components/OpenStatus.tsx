'use client';

import { useEffect, useState } from 'react';
import { hoursStatus, type HoursStatus } from '@/lib/hours';

type Props = { tone?: 'light' | 'dark'; className?: string; showDetail?: boolean };

/** Live open/closed indicator based on the current time in Karachi. */
export default function OpenStatus({ tone = 'light', className = '', showDetail = true }: Props) {
  const [status, setStatus] = useState<HoursStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(hoursStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const dot = tone === 'light' ? 'bg-chalk' : 'bg-void';
  const muted = tone === 'light' ? 'text-ash' : 'text-void/55';

  return (
    <p className={`label flex min-h-[1.25rem] flex-wrap items-center gap-x-3 gap-y-1 ${className}`} aria-live="polite">
      {status ? (
        <>
          <span className="relative flex h-2 w-2" aria-hidden="true">
            {status.open && <span className={`absolute inset-0 animate-pulse2 rounded-full ${dot}`} />}
            <span className={`relative h-2 w-2 rounded-full ${status.open ? dot : `border ${tone === 'light' ? 'border-chalk' : 'border-void'}`}`} />
          </span>
          <span>{status.headline}</span>
          {showDetail && <span className={muted}>— {status.detail}</span>}
        </>
      ) : (
        <span className={muted}>Karachi · Local time</span>
      )}
    </p>
  );
}
