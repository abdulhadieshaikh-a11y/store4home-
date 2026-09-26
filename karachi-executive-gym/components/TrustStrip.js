import { Building2, Sparkles, Users, MapPin } from 'lucide-react';

const items = [
  { icon: Building2, title: 'Professional Environment', text: 'A focused space built around serious training.' },
  { icon: Sparkles, title: 'Modern Fitness Experience', text: 'Clean, contemporary and well kept.' },
  { icon: Users, title: 'For Ladies & Gents', text: 'Everyone is welcome to train here.' },
  { icon: MapPin, title: 'Gulshan-e-Iqbal', text: 'Block 10-A, Karachi 75300.' },
];

export default function TrustStrip() {
  return (
    <section id="stats" aria-label="Why members trust Karachi Executive Gym" className="relative border-y border-line bg-coal">
      <div className="shell">
        <ul className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
              className="group flex flex-col gap-4 bg-coal px-4 py-8 first:pl-0 sm:px-8 sm:py-10 lg:py-12 [&:nth-child(3)]:pl-0 lg:[&:nth-child(3)]:pl-8"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-accent transition-transform duration-500 ease-premium group-hover:-translate-y-0.5" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-[0.625rem] font-semibold tracking-[0.3em] text-white/30">0{i + 1}</span>
              </div>
              <div>
                <p className="font-display text-[0.95rem] font-bold uppercase leading-tight tracking-[0.02em] text-white sm:text-lg" style={{ fontStretch: '106%' }}>
                  {title}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist sm:text-sm">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
