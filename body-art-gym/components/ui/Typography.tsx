import type { ReactNode } from 'react';

export function Eyebrow({ children, className = '', tone = 'ember' }: { children: ReactNode; className?: string; tone?: 'ember' | 'cream' | 'iron' }) {
  const color = tone === 'ember' ? 'text-ember-400' : tone === 'cream' ? 'text-cream/70' : 'text-iron-600';
  return (
    <p className={`flex items-center gap-3 font-label text-[0.72rem] font-medium uppercase tracking-wide2 ${color} ${className}`}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Small numbered stamp, e.g. "Nº 01". */
export function Stamp({ n, className = '' }: { n: string; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-1 font-label text-xs uppercase tracking-label ${className}`}>
      <span className="font-serif italic normal-case tracking-normal">Nº</span>
      {n}
    </span>
  );
}

export function Rule({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-current opacity-30" />
      <svg viewBox="0 0 20 20" className="h-3 w-3 opacity-80" fill="currentColor">
        <path d="M10 0l2.4 7.6H20l-6.2 4.6 2.4 7.8L10 15.2 3.8 20l2.4-7.8L0 7.6h7.6z" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}
