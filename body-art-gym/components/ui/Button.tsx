import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'ember' | 'outline' | 'dark' | 'cream' | 'ghost';

const base =
  'group/btn relative inline-flex min-h-[3.25rem] items-center justify-center gap-3 overflow-hidden px-6 py-3.5 font-label text-[0.8rem] font-medium uppercase tracking-label transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ember-400 focus-visible:ring-offset-iron-900 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  ember: 'bg-ember-500 text-cream-50 hover:text-iron-950 border border-ember-500',
  outline: 'border border-cream/50 text-cream hover:text-iron-950',
  dark: 'bg-iron-900 text-cream border border-iron-900 hover:text-iron-950',
  cream: 'bg-cream-100 text-iron-900 border border-cream-100 hover:text-cream-50',
  ghost: 'text-cream border-b border-cream/30 px-0 min-h-0 py-2 hover:border-ember-400 hover:text-ember-300',
};

const fills: Record<Variant, string> = {
  ember: 'bg-cream-100',
  outline: 'bg-cream-100',
  dark: 'bg-ember-400',
  cream: 'bg-ember-500',
  ghost: '',
};

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" className={`h-3 w-6 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M0 6h22M17 1l5 5-5 5" />
    </svg>
  );
}

function Inner({ children, variant, arrow }: { children: ReactNode; variant: Variant; arrow: boolean }) {
  return (
    <>
      {variant !== 'ghost' ? (
        <span
          aria-hidden
          className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover/btn:scale-x-100 ${fills[variant]}`}
        />
      ) : null}
      <span className="relative">{children}</span>
      {arrow ? <Arrow className="relative transition-transform duration-300 group-hover/btn:translate-x-1" /> : null}
    </>
  );
}

type LinkBtn = { href: string; variant?: Variant; arrow?: boolean; className?: string; children: ReactNode } & Omit<
  ComponentProps<'a'>,
  'href'
>;

export function ButtonLink({ href, variant = 'ember', arrow = true, className = '', children, ...rest }: LinkBtn) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const external = /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls} {...rest}>
        <Inner variant={variant} arrow={arrow}>
          {children}
        </Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </Link>
  );
}

type Btn = { variant?: Variant; arrow?: boolean; className?: string; children: ReactNode } & ComponentProps<'button'>;

export function Button({ variant = 'ember', arrow = true, className = '', children, ...rest }: Btn) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner variant={variant} arrow={arrow}>
        {children}
      </Inner>
    </button>
  );
}
