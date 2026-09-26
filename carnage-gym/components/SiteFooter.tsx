import Link from 'next/link';
import { nav, site, maps } from '@/lib/site';
import Logo from './Logo';
import Icon from './Icon';
import SocialLinks from './SocialLinks';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden border-t border-white/10 bg-void">
      {/* Oversized wordmark */}
      <div className="frame pt-20 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="md" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-ash">
              A 24-hour training ground in Ittehad Commercial Area, DHA Phase 6 — built for those who train without limits.
            </p>
            <div className="mt-10">
              <Link
                href="/contact#enquire"
                className="group inline-flex items-center gap-4 font-display text-3xl uppercase text-chalk sm:text-4xl"
              >
                <span className="relative">
                  Start training
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-chalk transition-transform duration-700 ease-expo group-hover:origin-left group-hover:scale-x-100" />
                </span>
                <Icon
                  name="arrowUpRight"
                  className="h-7 w-7 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="label mb-6 font-sans text-ash">Visit</h2>
              <address className="text-sm not-italic leading-relaxed text-fog">
                {site.address.building}, {site.address.street},
                <br />
                {site.address.area},
                <br />
                {site.address.district},
                <br />
                {site.address.city}, {site.address.country}
              </address>
              <a
                href={maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="label mt-5 inline-flex items-center gap-2 text-chalk hover:underline hover:underline-offset-4"
              >
                Directions <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
              </a>
            </div>

            <div>
              <h2 className="label mb-6 font-sans text-ash">Hours & Call</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="label text-chalk">Mon – Sat</dt>
                  <dd className="mt-1 text-fog">24 Hours</dd>
                </div>
                <div>
                  <dt className="label text-chalk">Sunday</dt>
                  <dd className="mt-1 text-fog">Closed</dd>
                </div>
              </dl>
              <a
                href={site.phone.href}
                className="mt-6 inline-flex items-center gap-3 text-lg text-chalk transition-opacity hover:opacity-70"
              >
                <Icon name="phone" /> {site.phone.display}
              </a>
            </div>

            <div>
              <h2 className="label mb-6 font-sans text-ash">Explore</h2>
              <ul className="space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-fog transition-colors hover:text-chalk">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="frame mt-20 select-none overflow-hidden" aria-hidden="true">
        <p className="text-outline whitespace-nowrap text-center font-display text-[21vw] uppercase leading-[0.78] lg:text-[15.5rem] xl:text-[18.5rem]">
          Carnage
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="frame flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-ash">© {year} Carnage Gym · Karachi, Pakistan</p>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}
