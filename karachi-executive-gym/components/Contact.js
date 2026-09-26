import { MapPin, Navigation, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import WhatsAppIcon from './WhatsAppIcon';
import LeadForm from './LeadForm';

const actions = [
  { label: 'Call Now', sub: site.phone.display, href: site.phone.href, icon: Phone },
  { label: 'WhatsApp Us', sub: 'Quick replies on chat', href: site.whatsapp.withText(site.whatsapp.defaultMessage), icon: WhatsAppIcon, external: true },
  { label: 'Get Directions', sub: 'Open in Google Maps', href: site.maps.href, icon: Navigation, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="section relative bg-void" aria-labelledby="contact-title">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="min-w-0 lg:col-span-5">
          <p className="eyebrow" data-reveal>Contact</p>
          <h2 id="contact-title" className="h-section mt-6" data-reveal style={{ '--reveal-delay': '80ms' }}>
            Let&rsquo;s get <br />
            you started.
          </h2>
          <p className="lede mt-6 max-w-md" data-reveal style={{ '--reveal-delay': '160ms' }}>
            Reach out for membership details, timings or anything else. The fastest way to hear back
            is a call or a WhatsApp message.
          </p>

          <ul className="mt-12 border-t border-line" data-reveal style={{ '--reveal-delay': '220ms' }}>
            {actions.map(({ label, sub, href, icon: Icon, external }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-5 py-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 transition-all duration-500 ease-premium group-hover:border-accent group-hover:bg-accent">
                    <Icon className="h-5 w-5 text-accent transition-colors duration-500 group-hover:text-white" strokeWidth={1.5} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-lg font-bold uppercase tracking-[0.02em] text-white" style={{ fontStretch: '106%' }}>
                      {label}
                    </span>
                    <span className="mt-0.5 block text-sm text-mist">{sub}</span>
                  </span>
                  <span className="text-accent transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex gap-4 text-sm leading-relaxed text-mist" data-reveal>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <p>
              <span className="font-semibold text-white">{site.name}</span>
              <br />
              Block 10-A Block 10 A Gulshan-e-Iqbal, Karachi, 75300
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7" data-reveal style={{ '--reveal-delay': '140ms' }}>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
