import { images } from '@/lib/site';
import Photo from './Photo';
import SectionHeading from './SectionHeading';

const spaces = [
  { key: 'floor', label: 'Training Floor', caption: 'Room to move, room to work.', span: 'md:col-span-4 md:row-span-2', aspect: 'aspect-[4/3] md:aspect-auto' },
  { key: 'strengthArea', label: 'Strength Area', caption: 'Where the heavy work happens.', span: 'md:col-span-2', aspect: 'aspect-[4/3] md:aspect-auto' },
  { key: 'cardioArea', label: 'Cardio Area', caption: 'Build your engine.', span: 'md:col-span-2', aspect: 'aspect-[4/3] md:aspect-auto' },
  { key: 'workoutSpace', label: 'Workout Space', caption: 'Open space for every routine.', span: 'md:col-span-3', aspect: 'aspect-[4/3] md:aspect-auto' },
  { key: 'environment', label: 'Fitness Environment', caption: 'Clean, modern and focused.', span: 'md:col-span-3', aspect: 'aspect-[4/3] md:aspect-auto' },
];

export default function Facilities() {
  return (
    <section id="facilities" className="section relative bg-coal" aria-labelledby="facilities-title">
      <div className="shell">
        <SectionHeading id="facilities-title" eyebrow="Facilities" title={<>Inside the gym.</>}>
          A look at the spaces you will train in — designed to keep you focused from warm-up to
          final set.
        </SectionHeading>

        <ul className="mt-14 grid gap-3 sm:gap-4 md:mt-20 md:grid-cols-6 md:[grid-auto-rows:minmax(15rem,20vw)] xl:[grid-auto-rows:17rem]">
          {spaces.map((s, i) => (
            <li key={s.key} className={`${s.span}`} data-reveal="image" style={{ '--reveal-delay': `${i * 80}ms` }}>
              <figure className={`group relative h-full overflow-hidden ${s.aspect}`}>
                <Photo
                  src={images[s.key].src}
                  alt={images[s.key].alt}
                  sizes={i === 0 ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                  className="absolute inset-0"
                  imgClassName="transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-[0.02em] text-white sm:text-xl" style={{ fontStretch: '106%' }}>
                      {s.label}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] text-fog/80">{s.caption}</p>
                  </div>
                  <span className="mb-1 h-px w-10 shrink-0 origin-right bg-accent transition-transform duration-700 ease-premium group-hover:scale-x-150" aria-hidden="true" />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
