import { nav, site } from '@/lib/site';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-coal pb-24 lg:pb-0" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Footer</h2>
      <div className="shell grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
            A premium, professional gym in Gulshan-e-Iqbal, Karachi — a modern fitness environment
            for ladies and gents.
          </p>
          <a href="#join" className="btn-primary mt-8 min-h-[46px] px-6 text-[0.75rem]">
            Join Now
          </a>
        </div>

        <nav className="lg:col-span-2" aria-label="Footer">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white">Explore</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-mist transition-colors hover:text-white">{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white">Contact</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href={site.phone.href} className="text-mist transition-colors hover:text-white">{site.phone.display}</a></li>
            <li>
              <a href={site.whatsapp.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-mist transition-colors hover:text-white">
                <WhatsAppIcon className="h-3.5 w-3.5 text-accent" />
                WhatsApp
              </a>
            </li>
            <li><a href={site.maps.href} target="_blank" rel="noopener noreferrer" className="text-mist transition-colors hover:text-white">Get directions</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white">Visit</p>
          <address className="mt-5 text-sm not-italic leading-relaxed text-mist">
            Block 10-A, Block 10 A Gulshan-e-Iqbal,
            <br />
            Karachi, 75300, Pakistan
          </address>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {site.name}. All rights reserved.</p>
          <p className="tracking-wide">Gulshan-e-Iqbal · Karachi</p>
        </div>
      </div>
    </footer>
  );
}
