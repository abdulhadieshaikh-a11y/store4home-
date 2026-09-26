import Link from 'next/link';
import type { ReactNode } from 'react';
import Icon from './Icon';

type Variant = 'solid' | 'outline' | 'text';
type Tone = 'light' | 'dark';

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** `light` = for use on dark backgrounds (default). `dark` = on light backgrounds. */
  tone?: Tone;
  icon?: 'arrow' | 'arrowUpRight' | 'phone' | 'pin';
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const base =
  'group relative inline-flex min-h-[52px] py-3 text-center sm:whitespace-nowrap items-center justify-center gap-4 overflow-hidden px-7 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ease-expo focus-visible:outline-offset-4';

const styles: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: 'bg-chalk text-void hover:text-chalk',
    dark: 'bg-void text-chalk hover:text-void',
  },
  outline: {
    light: 'border border-white/35 text-chalk hover:border-chalk hover:text-void',
    dark: 'border border-void/35 text-void hover:border-void hover:text-chalk',
  },
  text: {
    light: 'min-h-0 px-0 text-chalk',
    dark: 'min-h-0 px-0 text-void',
  },
};

const sweep: Record<Variant, Record<Tone, string>> = {
  solid: { light: 'bg-void', dark: 'bg-chalk' },
  outline: { light: 'bg-chalk', dark: 'bg-void' },
  text: { light: '', dark: '' },
};

export default function Button({
  href,
  children,
  variant = 'solid',
  tone = 'light',
  icon = 'arrow',
  external,
  className = '',
  ariaLabel,
}: Props) {
  const content =
    variant === 'text' ? (
      <>
        <span className="relative">
          {children}
          <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-700 ease-expo group-hover:origin-right group-hover:scale-x-0" />
        </span>
        <Icon name={icon} className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" />
      </>
    ) : (
      <>
        {/* Fill that sweeps up from below on hover */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0 ${sweep[variant][tone]}`}
        />
        <span className="relative">{children}</span>
        <span className="relative flex h-4 w-5 items-center overflow-hidden">
          <Icon
            name={icon}
            className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-6"
          />
          <Icon
            name={icon}
            className="absolute h-4 w-4 -translate-x-6 transition-transform duration-500 ease-expo group-hover:translate-x-0"
          />
        </span>
      </>
    );

  const cls = `${base} ${styles[variant][tone]} ${className}`;

  if (external || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
