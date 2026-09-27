'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Wordmark } from '@/components/art/Emblem';
import { ButtonLink } from '@/components/ui/Button';
import { primaryNav, site } from '@/lib/site';

export default function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Scroll lock, Escape to close, and a focus trap while the menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = [toggleRef.current, ...focusables()].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <header
        data-compact={compact || open}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 data-[compact=true]:border-b data-[compact=true]:border-cream/10 data-[compact=true]:bg-iron-950/85 data-[compact=true]:backdrop-blur-md"
      >
        {/* Heritage utility strip — desktop only, folds away on scroll */}
        <div className="hidden overflow-hidden border-b border-cream/10 transition-all duration-500 lg:block group-data-[compact=true]/header:max-h-0 group-data-[compact=true]/header:border-transparent group-data-[compact=true]/header:opacity-0 max-h-10">
          <div className="frame flex h-9 items-center justify-between font-label text-[0.66rem] uppercase tracking-label text-cream/60">
            <p>BMCHS · Sharafabad · Karachi</p>
            <p className="flex items-center gap-6">
              <span>Mon — Sat · 8:00 AM — 1:00 AM</span>
              <span aria-hidden className="h-3 w-px bg-cream/20" />
              <span>Sunday · Closed</span>
              <span aria-hidden className="h-3 w-px bg-cream/20" />
              <a href={site.phone.href} className="text-cream/80 transition-colors hover:text-ember-300">
                {site.phone.display}
              </a>
            </p>
          </div>
        </div>

        <div className="frame flex h-[4.75rem] items-center justify-between gap-6 transition-[height] duration-500 group-data-[compact=true]/header:h-16">
          <Link href="/" className="group relative z-10 -m-1 p-1" aria-label="Body Art Gym — home">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="group/link relative inline-flex px-3 py-2 font-label text-[0.78rem] uppercase tracking-label text-cream/80 transition-colors hover:text-cream aria-[current=page]:text-cream"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-ember-400 transition-transform duration-500 group-hover/link:scale-x-100 group-aria-[current=page]/link:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href="/membership" variant="ember" className="hidden !min-h-[2.9rem] !px-5 sm:inline-flex">
              Enquire now
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-10 inline-flex h-12 items-center gap-3 border border-cream/25 px-4 font-label text-[0.72rem] uppercase tracking-label text-cream transition-colors hover:border-ember-400 lg:hidden"
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ${open ? 'translate-y-1.5 rotate-45' : ''}`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ${open ? 'w-6 -translate-y-1.5 -rotate-45' : 'w-4'}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-iron-950 lg:hidden"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_60%_at_85%_0%,rgba(196,84,28,0.28),transparent_70%)]" />
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative flex min-h-full flex-col pb-10 pt-28">
          <nav aria-label="Mobile">
            <ol className="border-t border-cream/10">
              {[...primaryNav, { label: 'Hours', href: '/hours' }].map((item, i) => (
                <li key={item.href} className="border-b border-cream/10" style={{ animationDelay: `${80 + i * 55}ms` }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className="group flex items-baseline justify-between gap-4 py-4 text-cream aria-[current=page]:text-ember-400"
                  >
                    <span className="font-display text-[2.6rem] uppercase leading-none xs:text-5xl">{item.label}</span>
                    <span className="font-label text-xs tracking-label text-cream/40">{String(i + 1).padStart(2, '0')}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-10 grid gap-8">
            <ButtonLink href="/membership" variant="ember" className="w-full">
              Enquire now
            </ButtonLink>
            <dl className="grid grid-cols-2 gap-6 font-label text-[0.7rem] uppercase tracking-label text-cream/60">
              <div>
                <dt className="text-ember-400">Mon — Sat</dt>
                <dd className="mt-1 text-cream">8:00 AM — 1:00 AM</dd>
              </div>
              <div>
                <dt className="text-ember-400">Sunday</dt>
                <dd className="mt-1 text-cream">Closed</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-ember-400">Call</dt>
                <dd className="mt-1">
                  <a href={site.phone.href} className="font-display text-3xl tracking-poster text-cream">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
