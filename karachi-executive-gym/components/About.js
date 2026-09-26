import { ArrowRight } from 'lucide-react';
import { images } from '@/lib/site';
import Photo from './Photo';

const pillars = ['Strength', 'Consistency', 'Community'];

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden bg-void" aria-labelledby="about-title">
      {/* Oversized background word */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-16 select-none font-display text-[22vw] font-extrabold uppercase leading-none text-white/[0.025] lg:text-[16rem]"
        style={{ fontStretch: '120%' }}
      >
        Execute
      </span>

      <div className="shell relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5 lg:pr-6">
          <p className="eyebrow" data-reveal>About the gym</p>
          <h2 id="about-title" className="h-section mt-6 text-balance" data-reveal style={{ '--reveal-delay': '80ms' }}>
            A serious place <span className="text-white/40">to train.</span>
          </h2>
          <div className="mt-8 space-y-5 text-pretty text-base leading-relaxed text-mist sm:text-[1.0625rem]" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <p>
              Karachi Executive Gym is built for people who treat fitness as a priority. It is a
              professional, modern environment where you can focus on the work — building
              strength, improving health and staying consistent.
            </p>
            <p>
              Whether you are starting out or returning with fresh goals, you will find a clean,
              welcoming space in Gulshan-e-Iqbal where ladies and gents can train with confidence.
            </p>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8" data-reveal style={{ '--reveal-delay': '240ms' }}>
            {pillars.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-white">
                <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>

          <a href="#contact" className="group mt-10 inline-flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-white" data-reveal style={{ '--reveal-delay': '300ms' }}>
            <span className="border-b border-accent pb-1 transition-colors group-hover:text-accent">Plan your visit</span>
            <ArrowRight className="h-4 w-4 text-accent transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative ml-auto aspect-[4/5] w-[88%] sm:aspect-[5/6] lg:w-[86%]" data-reveal="image">
            <Photo
              src={images.about.src}
              alt={images.about.alt}
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="h-full w-full"
              imgClassName="transition-transform duration-[1.6s] ease-premium hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
          </div>
          {/* Detail inset */}
          <div
            className="absolute bottom-[-2.5rem] left-0 aspect-square w-[42%] border-[6px] border-void sm:w-[36%]"
            data-reveal="image"
            style={{ '--reveal-delay': '200ms' }}
          >
            <Photo src={images.aboutDetail.src} alt={images.aboutDetail.alt} sizes="(min-width: 1024px) 22vw, 40vw" className="h-full w-full" />
          </div>
          {/* Decorative frame + label */}
          <div className="pointer-events-none absolute -top-5 right-[-0.75rem] hidden h-32 w-32 border-r border-t border-accent/60 sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
