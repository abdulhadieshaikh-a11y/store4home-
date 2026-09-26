'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, site, addressOneLine } from '@/lib/site';
import Logo from './Logo';
import Icon from './Icon';

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Refine on scroll; tuck away while scrolling down, return on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y <= 480) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Keep the closed menu out of the tab order and accessibility tree.
  useEffect(() => {
    if (menuRef.current) menuRef.current.inert = !open;
  }, [open]);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Lock scroll, handle Escape and keep focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const first = menuRef.current?.querySelector<HTMLElement>('a, button');
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab' && menuRef.current) {
        const focusables = [toggleRef.current, ...Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'))].filter(
          Boolean,
        ) as HTMLElement[];
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="label fixed left-4 top-4 z-[100] -translate-y-24 bg-chalk px-4 py-3 text-void transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-expo ${
          hidden && !open ? '-translate-y-full' : 'translate-y-0'
        } ${
          solid && !open
            ? 'border-b border-white/10 bg-void/80 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div
          className={`frame flex items-center justify-between transition-[height] duration-700 ease-expo ${
            scrolled ? 'h-[64px]' : 'h-[76px] lg:h-[92px]'
          }`}
        >
          <Link href="/" aria-label="Carnage Gym — Home" className="relative z-[60] -m-2 p-2">
            <Logo size="sm" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9 xl:gap-11">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative py-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                        active ? 'text-chalk' : 'text-fog hover:text-chalk'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-chalk transition-transform duration-500 ease-expo ${
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact?enquiry=membership#enquire"
              className="group relative hidden h-11 items-center gap-3 overflow-hidden border border-white/35 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-chalk transition-colors duration-500 ease-expo hover:border-chalk hover:text-void sm:inline-flex"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-chalk transition-transform duration-500 ease-expo group-hover:translate-y-0"
              />
              <span className="relative">Join / Enquire</span>
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => (open ? close() : setOpen(true))}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[60] -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
            >
              <span className="label hidden text-chalk min-[380px]:inline">{open ? 'Close' : 'Menu'}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-full bg-chalk transition-all duration-500 ease-expo ${
                    open ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px bg-chalk transition-all duration-500 ease-expo ${
                    open ? 'top-1/2 w-full -rotate-45' : 'top-full w-2/3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        className={`grain fixed inset-0 z-40 flex flex-col bg-void transition-[clip-path] duration-700 ease-power lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <nav aria-label="Mobile" className="frame flex flex-1 flex-col justify-center pt-24">
          <ul className="space-y-1">
            {nav.map((item, i) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`group flex items-baseline gap-5 py-1 transition-[transform,opacity] duration-700 ease-expo ${
                      open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' }}
                  >
                    <span className="label w-6 text-ash">0{i + 1}</span>
                    <span
                      className={`font-display text-[clamp(2.75rem,13vw,4.5rem)] uppercase leading-[1.02] transition-colors ${
                        active ? 'text-chalk' : 'text-outline group-hover:text-chalk'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`frame grid gap-6 border-t border-white/10 py-8 transition-opacity duration-700 sm:grid-cols-2 ${
            open ? 'opacity-100 delay-500' : 'opacity-0'
          }`}
        >
          <a href={site.phone.href} className="flex items-center gap-3 text-chalk">
            <Icon name="phone" />
            <span className="label">{site.phone.display}</span>
          </a>
          <div className="label space-y-1 text-ash">
            <p className="text-chalk">Mon – Sat · 24 Hours</p>
            <p>Sunday · Closed</p>
          </div>
          <p className="text-xs leading-relaxed text-ash sm:col-span-2">{addressOneLine}</p>
        </div>
      </div>
    </>
  );
}
