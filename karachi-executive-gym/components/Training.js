import { ArrowUpRight } from 'lucide-react';
import { images } from '@/lib/site';
import Photo from './Photo';
import SectionHeading from './SectionHeading';

const disciplines = [
  { key: 'strength', title: 'Strength Training', text: 'Build power and muscle with focused resistance work.' },
  { key: 'cardio', title: 'Cardio', text: 'Improve stamina, heart health and everyday energy.' },
  { key: 'functional', title: 'Functional Fitness', text: 'Train movements that carry over into daily life.' },
  { key: 'general', title: 'General Fitness', text: 'Feel better, move better and build a healthy routine.' },
  { key: 'weight', title: 'Weight Management', text: 'Pursue your body-composition goals with consistency.' },
  { key: 'conditioning', title: 'Conditioning', text: 'Develop endurance and the capacity to push further.' },
];

export default function Training() {
  return (
    <section id="training" className="section relative overflow-hidden bg-void" aria-labelledby="training-title">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="training-title" eyebrow="The training experience" title={<>Every goal. <span className="text-white/40">One floor.</span></>} />
          <p className="lede max-w-md lg:pb-2" data-reveal style={{ '--reveal-delay': '160ms' }}>
            However you like to train, the gym gives you the space to do it. Ask us about the
            training options currently available.
          </p>
        </div>
      </div>

      {/* Mobile: swipeable rail. Tablet+: editorial grid. */}
      <div className="mt-14 lg:mt-20">
        <ul
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 md:mx-auto md:grid md:max-w-shell md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-3 lg:px-12"
          aria-label="Training categories"
        >
          {disciplines.map((d, i) => (
            <li
              key={d.key}
              data-reveal
              style={{ '--reveal-delay': `${(i % 3) * 100}ms` }}
              className="w-[80%] shrink-0 snap-start xs:w-[70%] md:w-auto"
            >
              <a
                href="#contact"
                className="group relative block aspect-[4/5] overflow-hidden bg-graphite md:aspect-[5/6]"
                aria-label={`${d.title} — enquire about training`}
              >
                <Photo
                  src={images[d.key].src}
                  alt={images[d.key].alt}
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 80vw"
                  className="absolute inset-0"
                  imgClassName="grayscale-[35%] transition-[transform,filter] duration-[1.2s] ease-premium group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/0 transition-opacity duration-700 group-hover:opacity-90" />
                <span className="absolute left-6 top-6 font-display text-sm font-bold text-white/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center border border-white/20 bg-void/30 transition-all duration-500 ease-premium group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight className="h-4 w-4 text-white transition-colors duration-500 group-hover:text-white" aria-hidden="true" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-[-0.005em] text-white sm:text-[1.75rem]" style={{ fontStretch: '108%' }}>
                    {d.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog/90 md:translate-y-2 md:opacity-0 md:transition-all md:duration-500 md:ease-premium md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
                    {d.text}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
