import { Phone } from 'lucide-react';
import { images, site } from '@/lib/site';
import Photo from './Photo';
import WhatsAppIcon from './WhatsAppIcon';

export default function JoinCta() {
  return (
    <section id="join" className="relative isolate overflow-hidden bg-void" aria-labelledby="join-title">
      <Photo
        src={images.cta.src}
        alt=""
        sizes="100vw"
        className="absolute inset-0 -z-10"
        imgClassName="object-center opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(7,8,10,0.55)_0%,rgba(7,8,10,0.92)_70%)]" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell section text-center">
        <p className="eyebrow justify-center" data-reveal>Membership</p>
        <h2
          id="join-title"
          className="h-display mx-auto mt-8 max-w-5xl text-balance text-[clamp(2.5rem,7.5vw,6.5rem)]"
          data-reveal
          style={{ '--reveal-delay': '80ms' }}
        >
          Ready to start your <span className="text-accent">fitness journey?</span>
        </h2>
        <p className="lede mx-auto mt-8 max-w-xl text-pretty text-fog" data-reveal style={{ '--reveal-delay': '160ms' }}>
          Visit Karachi Executive Gym in Gulshan-e-Iqbal or contact us to learn more about
          membership and training options.
        </p>
        <div className="mx-auto mt-12 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row" data-reveal style={{ '--reveal-delay': '240ms' }}>
          <a href={site.phone.href} className="btn-primary sm:min-w-[220px]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Now
          </a>
          <a
            href={site.whatsapp.withText(site.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost sm:min-w-[220px]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp Us
          </a>
        </div>
        <p className="mt-8 text-sm tracking-wide text-mist" data-reveal style={{ '--reveal-delay': '300ms' }}>
          <a href={site.phone.href} className="font-medium text-white underline-offset-4 hover:underline">
            {site.phone.display}
          </a>
          <span className="mx-3 text-white/20">/</span>
          Block 10-A, Gulshan-e-Iqbal
        </p>
      </div>
    </section>
  );
}
