import Link from 'next/link';
import Emblem from '@/components/art/Emblem';
import { ButtonLink } from '@/components/ui/Button';
import { footerNav, site } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-iron-950 text-cream">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-500/60 to-transparent" />

      <div className="frame relative pt-20 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Emblem tone="ember" className="w-36 sm:w-44" />
            <p className="mt-8 max-w-xs font-serif text-lg italic leading-relaxed text-cream/75">
              Old-school bodybuilding. Built on discipline, iron and consistency.
            </p>
            <ButtonLink href="/membership" variant="ember" className="mt-8">
              Enquire now
            </ButtonLink>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-400">Visit</h2>
              <address className="mt-5 not-italic leading-relaxed text-cream/85">
                <span className="block font-display text-xl uppercase tracking-poster text-cream">{site.name}</span>
                {site.address.lines.map((l, i) => (
                  <span key={l} className="block">
                    {l}
                    {i < site.address.lines.length - 1 ? ',' : ''}
                  </span>
                ))}
              </address>
              <a
                href={site.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-label text-[0.72rem] uppercase tracking-label text-ember-300 underline-offset-4 hover:underline"
              >
                Get directions →<span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </div>

            <div>
              <h2 className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-400">Hours</h2>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="font-label text-xs uppercase tracking-label text-cream/60">Mon — Sat</dt>
                  <dd className="font-display text-2xl uppercase tracking-poster">8:00 AM — 1:00 AM</dd>
                </div>
                <div>
                  <dt className="font-label text-xs uppercase tracking-label text-cream/60">Sunday</dt>
                  <dd className="font-display text-2xl uppercase tracking-poster">Closed</dd>
                </div>
              </dl>
              <h2 className="mt-8 font-label text-[0.7rem] uppercase tracking-wide2 text-ember-400">Call</h2>
              <a href={site.phone.href} className="mt-3 inline-block font-display text-2xl tracking-poster transition-colors hover:text-ember-300">
                {site.phone.display}
              </a>
            </div>

            <nav aria-label="Footer">
              <h2 className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-400">Explore</h2>
              <ul className="mt-5 space-y-2.5">
                {footerNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="group inline-flex items-center gap-2 text-cream/85 transition-colors hover:text-cream">
                      <span aria-hidden className="h-px w-0 bg-ember-400 transition-all duration-300 group-hover:w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Giant wordmark */}
        <p aria-hidden className="mt-20 select-none whitespace-nowrap text-center font-display uppercase leading-[0.8] text-cream/[0.06]" style={{ fontSize: 'clamp(4rem, 17vw, 16rem)' }}>
          Body Art Gym
        </p>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-7 font-label text-[0.66rem] uppercase tracking-label text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>BMCHS · Sharafabad · Karachi · Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
