import { ArrowUpRight, MapPin, Navigation, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import WhatsAppIcon from './WhatsAppIcon';

export default function Location() {
  return (
    <section id="location" className="section relative bg-coal" aria-labelledby="location-title">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow" data-reveal>Location</p>
          <h2 id="location-title" className="h-section mt-6" data-reveal style={{ '--reveal-delay': '80ms' }}>
            Find us in <span className="text-white/40">Gulshan-e-Iqbal.</span>
          </h2>

          <address className="mt-10 not-italic" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <div className="flex gap-4 border-t border-line pt-8">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-mist">Address</p>
                <p className="mt-3 text-lg leading-relaxed text-white">
                  Block 10-A,
                  <br />
                  Block 10 A Gulshan-e-Iqbal,
                  <br />
                  Karachi, 75300, Pakistan
                </p>
              </div>
            </div>
            <div className="mt-8 flex gap-4 border-t border-line pt-8">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-mist">Phone</p>
                <a href={site.phone.href} className="mt-3 block text-lg text-white transition-colors hover:text-accent">
                  {site.phone.display}
                </a>
              </div>
            </div>
          </address>

          <div className="mt-10 grid gap-3 xs:grid-cols-2" data-reveal style={{ '--reveal-delay': '240ms' }}>
            <a href={site.maps.href} target="_blank" rel="noopener noreferrer" className="btn-primary xs:col-span-2">
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Open in Google Maps
              <ArrowUpRight className="btn-arrow h-4 w-4" aria-hidden="true" />
            </a>
            <a href={site.phone.href} className="btn-ghost">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <a href={site.whatsapp.withText(site.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="relative min-w-0 lg:col-span-7" data-reveal="image" style={{ '--reveal-delay': '120ms' }}>
          <div className="relative h-[22rem] overflow-hidden border border-line bg-graphite sm:h-[28rem] lg:h-full lg:min-h-[34rem]">
            <iframe
              title="Map showing Karachi Executive Gym in Block 10-A, Gulshan-e-Iqbal, Karachi"
              src={site.maps.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.9)_brightness(0.95)]"
            />
            {/* Branded corner tag */}
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 bg-void/90 px-4 py-3 sm:left-6 sm:top-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white">Karachi Executive Gym</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
