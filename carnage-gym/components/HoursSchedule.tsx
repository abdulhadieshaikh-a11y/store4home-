'use client';

import { useEffect, useState } from 'react';
import { days, site } from '@/lib/site';
import { karachiDay } from '@/lib/hours';

type Props = { tone?: 'light' | 'dark'; compact?: boolean };

/** Weekly schedule with today (Karachi time) highlighted. */
export default function HoursSchedule({ tone = 'light', compact = false }: Props) {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(karachiDay()), []);

  const line = tone === 'light' ? 'border-white/10' : 'border-void/15';
  const muted = tone === 'light' ? 'text-ash' : 'text-void/50';
  const strong = tone === 'light' ? 'text-chalk' : 'text-void';

  return (
    <ul className={`border-t ${line}`}>
      {days.map((d) => {
        const open = (site.hours.openDays as readonly number[]).includes(d.key);
        const isToday = today === d.key;
        return (
          <li
            key={d.key}
            className={`relative flex items-center justify-between border-b ${line} ${compact ? 'py-4' : 'py-5 sm:py-6'}`}
            aria-current={isToday ? 'date' : undefined}
          >
            {isToday && (
              <span
                aria-hidden="true"
                className={`absolute -left-4 top-1/2 h-8 w-px -translate-y-1/2 sm:-left-6 ${tone === 'light' ? 'bg-chalk' : 'bg-void'}`}
              />
            )}
            <span className="flex items-center gap-4">
              <span className={`font-display uppercase ${compact ? 'text-2xl' : 'text-3xl sm:text-4xl'} ${open ? strong : muted}`}>
                {d.long}
              </span>
              {isToday && (
                <span
                  className={`label border px-2 py-1 text-[0.58rem] ${
                    tone === 'light' ? 'border-white/30 text-chalk' : 'border-void/30 text-void'
                  }`}
                >
                  Today
                </span>
              )}
            </span>
            <span className={`label ${open ? strong : muted}`}>{open ? '24 Hours' : 'Closed'}</span>
          </li>
        );
      })}
    </ul>
  );
}
