import Emblem from '@/components/art/Emblem';
import OpenStatus from '@/components/ui/OpenStatus';
import Reveal from '@/components/ui/Reveal';
import { Rule } from '@/components/ui/Typography';

/**
 * Opening hours set like a classic gym poster.
 * `headingLevel` lets the dedicated Hours page use it as the page's h1.
 */
export default function HoursBoard({ headingLevel = 2, compact = false }: { headingLevel?: 1 | 2; compact?: boolean }) {
  const H = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <div className="relative mx-auto max-w-5xl border border-cream/20 bg-iron-950/60 p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
      <div className="relative overflow-hidden border border-cream/15 px-5 pb-10 pt-12 sm:px-12 sm:pb-14 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_0%,rgba(196,84,28,0.22),transparent_70%)]" />
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />

        <div className="relative text-center">
          <p className="font-label text-[0.72rem] uppercase tracking-wide2 text-ember-300">Body Art Gym · Karachi</p>
          <H className="display-lg mt-4 text-cream">
            {headingLevel === 1 ? 'Opening hours' : 'Doors open'}
          </H>
          <Rule className="mx-auto mt-6 max-w-sm text-ember-400" />
        </div>

        <div className={`relative mt-10 grid gap-px bg-cream/15 ${compact ? '' : 'sm:mt-14'} md:grid-cols-[1.35fr_1fr]`}>
          <Reveal className="bg-iron-950 p-6 sm:p-10">
            <p className="font-label text-sm uppercase tracking-wide2 text-ember-400">Monday — Saturday</p>
            <p className="mt-4 font-display uppercase leading-[0.9] text-cream" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.4rem)' }}>
              <span className="block">8:00 AM</span>
              <span className="block">
                <span className="text-ember-400">—</span> 1:00 AM
              </span>
            </p>
            <p className="mt-4 font-serif italic text-cream/70">Late sessions welcome — the floor stays open past midnight.</p>
          </Reveal>
          <Reveal delay={120} className="relative flex flex-col justify-between overflow-hidden bg-iron-950 p-6 sm:p-10">
            <div>
              <p className="font-label text-sm uppercase tracking-wide2 text-ember-400">Sunday</p>
              <p className="mt-4 font-display uppercase leading-[0.9] text-cream/90" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.4rem)' }}>
                Closed
              </p>
              <p className="mt-4 font-serif italic text-cream/70">Rest. Recover. Come back stronger.</p>
            </div>
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-14 w-44 rotate-[-14deg] opacity-[0.12] sm:w-52">
              <Emblem tone="cream" decorative />
            </div>
          </Reveal>
        </div>

        <div className="relative mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <OpenStatus />
          <p className="font-label text-[0.68rem] uppercase tracking-label text-cream/50">All times Pakistan Standard Time</p>
        </div>
      </div>
    </div>
  );
}
