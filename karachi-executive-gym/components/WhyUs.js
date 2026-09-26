import { ShieldCheck, Gem, Users, MapPin, TrendingUp, MessageCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';

const features = [
  {
    icon: ShieldCheck,
    title: 'Professional Environment',
    text: 'A focused space designed around serious training — fewer distractions, more progress.',
  },
  {
    icon: Gem,
    title: 'Modern Experience',
    text: 'A clean, contemporary setting that makes every session feel like time well spent.',
  },
  {
    icon: Users,
    title: 'Ladies & Gents',
    text: 'A fitness destination that welcomes both ladies and gents, with respect as the standard.',
  },
  {
    icon: MapPin,
    title: 'Convenient Location',
    text: 'Located in Block 10-A, Gulshan-e-Iqbal — easy to reach and easy to make a habit.',
  },
  {
    icon: TrendingUp,
    title: 'Personal Progress',
    text: 'An environment that rewards consistency and supports long-term strength and fitness.',
  },
  {
    icon: MessageCircle,
    title: 'Easy to Reach Us',
    text: 'Questions about membership or training? Call or WhatsApp — getting answers is simple.',
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="section relative bg-coal" aria-labelledby="why-title">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="why-title" eyebrow="Why choose us" title={<>Built around <br className="hidden sm:block" />the work.</>} />
          <p className="lede max-w-sm lg:pb-2" data-reveal style={{ '--reveal-delay': '160ms' }}>
            Everything about Karachi Executive Gym is designed to help you show up, train well and
            keep coming back.
          </p>
        </div>

        <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 90}ms` }}
              className="group relative overflow-hidden bg-coal p-8 transition-colors duration-500 ease-premium hover:bg-graphite sm:p-10"
            >
              <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-premium group-hover:scale-x-100" aria-hidden="true" />
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center border border-white/10 transition-colors duration-500 group-hover:border-accent/60">
                  <Icon className="h-5 w-5 text-accent transition-transform duration-500 ease-premium group-hover:scale-110" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-bold text-white/15 transition-colors duration-500 group-hover:text-accent/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-10 font-display text-xl font-bold uppercase tracking-[0.01em] text-white sm:mt-14" style={{ fontStretch: '106%' }}>
                {title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
