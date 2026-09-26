'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';
import { nav, site } from '@/lib/site';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#top');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-premium ${
        solid
          ? 'border-b border-line bg-void/95'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav className="shell flex h-[72px] items-center justify-between gap-6" aria-label="Primary">
        <a href="#top" className="shrink-0" aria-label={`${site.name} — home`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative px-3.5 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-mist hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-premium ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 px-3 text-[0.8125rem] font-medium text-fog transition-colors hover:text-white xl:inline-flex"
          >
            <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {site.phone.display}
          </a>
          <a href="#join" className="btn-primary hidden min-h-[44px] px-5 text-[0.75rem] sm:inline-flex">
            Join Now
            <ArrowUpRight className="btn-arrow h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-6 bg-white transition-transform duration-500 ease-premium ${
                  open ? 'translate-y-[5.25px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute bottom-0 right-0 h-[1.5px] bg-white transition-all duration-500 ease-premium ${
                  open ? 'w-6 -translate-y-[5.25px] -rotate-45' : 'w-4'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-void transition-[opacity,visibility] duration-500 ease-premium lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        inert={open ? undefined : ''}
      >
        <div className="shell flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-line">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-line transition-all duration-700 ease-premium ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-[1.75rem] font-bold uppercase tracking-tight text-white"
                  style={{ fontStretch: '108%' }}
                >
                  {item.label}
                  <span className="font-sans text-xs font-medium tracking-[0.2em] text-mist">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-10">
            <a href="#join" onClick={() => setOpen(false)} className="btn-primary w-full">
              Join Now
              <ArrowUpRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </a>
            <a href={site.phone.href} className="btn-ghost w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {site.phone.display}
            </a>
            <p className="pt-4 text-center text-xs tracking-wide text-mist">
              Block 10-A, Gulshan-e-Iqbal, Karachi
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
