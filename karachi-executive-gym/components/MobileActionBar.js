'use client';

import { useEffect, useState } from 'react';
import { Navigation, Phone } from 'lucide-react';
import { site } from '@/lib/site';
import WhatsAppIcon from './WhatsAppIcon';

// Mobile-only quick actions; appears once the hero has scrolled away.
export default function MobileActionBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const item = 'flex flex-1 flex-col items-center justify-center gap-1.5 py-3 text-[0.625rem] font-semibold uppercase tracking-[0.18em]';

  return (
    <nav
      aria-label="Quick contact"
      className={`pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/90 transition-transform duration-500 ease-premium lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      inert={show ? undefined : ''}
    >
      <div className="flex divide-x divide-white/10">
        <a href={site.phone.href} className={`${item} text-white`}>
          <Phone className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
          Call
        </a>
        <a href={site.whatsapp.withText(site.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer" className={`${item} bg-accent text-white`}>
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          WhatsApp
        </a>
        <a href={site.maps.href} target="_blank" rel="noopener noreferrer" className={`${item} text-white`}>
          <Navigation className="h-[18px] w-[18px] text-accent" aria-hidden="true" />
          Directions
        </a>
      </div>
    </nav>
  );
}
