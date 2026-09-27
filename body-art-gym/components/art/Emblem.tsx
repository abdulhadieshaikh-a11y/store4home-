import { useId } from 'react';

/**
 * BODY ART GYM heritage emblem — an original circular badge.
 *
 * If the gym supplies its official logo, place it at /public/brand/logo.svg (or .png)
 * and render it with <Logo /> instead; this emblem is a stand-in built to the
 * same proportions so the layout will not need to change.
 */

type Tone = 'cream' | 'ember' | 'dark';

const tones: Record<Tone, { ring: string; ink: string; accent: string; fill: string }> = {
  cream: { ring: '#F1E6D2', ink: '#F1E6D2', accent: '#C4541C', fill: 'transparent' },
  ember: { ring: '#C4541C', ink: '#F1E6D2', accent: '#C4541C', fill: '#1E130D' },
  dark: { ring: '#1E130D', ink: '#1E130D', accent: '#C4541C', fill: 'transparent' },
};

export default function Emblem({
  tone = 'cream',
  className,
  label = 'Body Art Gym emblem',
  decorative = false,
}: {
  tone?: Tone;
  className?: string;
  label?: string;
  decorative?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const t = tones[tone];
  const top = `${uid}-top`;
  const bottom = `${uid}-bottom`;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label}
      focusable="false"
    >
      <defs>
        <path id={top} d="M 64 200 A 136 136 0 0 1 336 200" />
        <path id={bottom} d="M 58 200 A 142 142 0 0 0 342 200" />
      </defs>

      <circle cx="200" cy="200" r="194" fill={t.fill} stroke={t.ring} strokeWidth="3" />
      <circle cx="200" cy="200" r="184" fill="none" stroke={t.ring} strokeWidth="1.25" />
      <circle cx="200" cy="200" r="114" fill="none" stroke={t.ring} strokeWidth="1.25" />
      <circle cx="200" cy="200" r="106" fill="none" stroke={t.ring} strokeWidth="3" />

      <g fill={t.ink} fontFamily="var(--font-oswald), 'Arial Narrow', sans-serif" fontWeight={600} fontSize="25" letterSpacing="7">
        <text>
          <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
            BODY ART GYM
          </textPath>
        </text>
        <text dominantBaseline="hanging">
          <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
            KARACHI · PAKISTAN
          </textPath>
        </text>
      </g>

      {/* side stars */}
      <g fill={t.accent}>
        <path d={star(46, 200, 11, 4.6)} />
        <path d={star(354, 200, 11, 4.6)} />
      </g>

      {/* dumbbell */}
      <g fill={t.accent}>
        <rect x="126" y="126" width="16" height="44" rx="3" />
        <rect x="144" y="132" width="12" height="32" rx="2" />
        <rect x="156" y="144" width="88" height="8" rx="2" />
        <rect x="244" y="132" width="12" height="32" rx="2" />
        <rect x="258" y="126" width="16" height="44" rx="3" />
      </g>

      <text
        x="200"
        y="238"
        textAnchor="middle"
        fill={t.ink}
        fontFamily="var(--font-anton), Impact, sans-serif"
        fontSize="64"
        letterSpacing="1"
      >
        BODY ART
      </text>

      {/* ribbon */}
      <g>
        <path d="M 112 252 L 288 252 L 300 268 L 288 284 L 112 284 L 100 268 Z" fill={t.accent} />
        <text
          x="200"
          y="277"
          textAnchor="middle"
          fill={tone === 'dark' ? '#F1E6D2' : '#1E130D'}
          fontFamily="var(--font-oswald), 'Arial Narrow', sans-serif"
          fontWeight={700}
          fontSize="22"
          letterSpacing="12"
        >
          GYM
        </text>
      </g>

      <g fill={t.ink} fontFamily="var(--font-oswald), 'Arial Narrow', sans-serif" fontSize="10" letterSpacing="4" textAnchor="middle">
        <text x="200" y="302">STRENGTH · IRON · DISCIPLINE</text>
      </g>
    </svg>
  );
}

function star(cx: number, cy: number, R: number, r: number) {
  let d = '';
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    d += `${i === 0 ? 'M' : 'L'}${(cx + Math.cos(a) * rad).toFixed(2)} ${(cy + Math.sin(a) * rad).toFixed(2)}`;
  }
  return d + 'Z';
}

/** Compact horizontal wordmark used in the navigation. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <Emblem tone="ember" decorative className="h-11 w-11 shrink-0 transition-all duration-500 group-data-[compact=true]/header:h-9 group-data-[compact=true]/header:w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-poster text-cream">BODY ART</span>
        <span className="mt-1 font-label text-[0.62rem] font-medium tracking-wide2 text-ember-300">GYM · KARACHI</span>
      </span>
    </span>
  );
}
