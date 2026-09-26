import { ArrowRight } from 'lucide-react';
import { images, site } from '@/lib/site';
import Photo from './Photo';

const panels = [
  {
    key: 'ladies',
    label: 'Ladies',
    title: 'Train with confidence.',
    text: 'A respectful, professional environment where women can focus on strength, health and their own goals.',
  },
  {
    key: 'gents',
    label: 'Gents',
    title: 'Train with intensity.',
    text: 'A focused floor for men who want to push harder, build strength and stay consistent.',
  },
];

export default function LadiesGents() {
  return (
    <section id="ladies-gents" className="relative bg-void" aria-labelledby="lg-title">
      <div className="shell section pb-0 sm:pb-0 lg:pb-0">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow" data-reveal>Ladies &amp; Gents</p>
            <h2 id="lg-title" className="h-section mt-6 text-balance" data-reveal style={{ '--reveal-delay': '80ms' }}>
              One standard. <br className="hidden sm:block" />
              <span className="text-accent">Everyone</span> welcome.
            </h2>
          </div>
          <p className="lede lg:col-span-5 lg:pb-2" data-reveal style={{ '--reveal-delay': '160ms' }}>
            Karachi Executive Gym welcomes both ladies and gents. Get in touch to learn about
            timings and arrangements that suit you.
          </p>
        </div>
      </div>

      <div className="mt-14 grid md:mt-20 md:grid-cols-2">
        {panels.map((p, i) => (
          <article
            key={p.key}
            className="group relative isolate flex min-h-[32rem] items-end overflow-hidden sm:min-h-[38rem] lg:min-h-[44rem]"
            aria-labelledby={`${p.key}-title`}
          >
            <Photo
              src={images[p.key].src}
              alt={images[p.key].alt}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="absolute inset-0 -z-10"
              imgClassName="transition-transform duration-[1.6s] ease-premium group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/50 to-void/10" />
            {i === 0 ? <div className="absolute inset-y-0 right-0 z-10 hidden w-px bg-line md:block" aria-hidden="true" /> : null}

            <div className="w-full p-6 pb-10 sm:p-10 lg:p-14" data-reveal style={{ '--reveal-delay': `${i * 120}ms` }}>
              <p className="font-display text-[clamp(4rem,11vw,9rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.03em] text-white/90" style={{ fontStretch: '115%' }}>
                {p.label}
              </p>
              <div className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-sm">
                  <h3 id={`${p.key}-title`} className="text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-fog/80">{p.text}</p>
                </div>
                <a
                  href={site.whatsapp.withText(`Hello Karachi Executive Gym, I would like information about ${p.label.toLowerCase()} membership and timings.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex shrink-0 items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-accent-light"
                >
                  Ask about timings
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
