import PageHero from '@/components/PageHero';
import Eyebrow from '@/components/Eyebrow';
import Photo from '@/components/Photo';
import Button from '@/components/Button';
import CTASection from '@/components/CTASection';
import { images } from '@/lib/images';
import { facilities } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Facilities',
  description:
    'Explore the training floor at Carnage Gym, DHA Phase 6, Karachi — strength training, free weights, cardio and functional training, open 24 hours Monday to Saturday.',
  path: '/facilities',
});

const d = (ms: number) => ({ ['--reveal-delay' as string]: `${ms}ms` });

// Mosaic spans for the gallery — cycles if more facilities are added.
const spans = [
  'lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto',
  'lg:col-span-5 aspect-[4/5] lg:aspect-[5/4]',
  'lg:col-span-5 aspect-[4/5] lg:aspect-[5/4]',
  'lg:col-span-5 aspect-[4/5] lg:aspect-[5/4]',
  'lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto',
  'lg:col-span-5 aspect-[4/5] lg:aspect-[5/4]',
];

export default function FacilitiesPage() {
  const gallery = facilities.filter((f) => f.slug !== 'environment');
  const environment = facilities.find((f) => f.slug === 'environment');

  return (
    <>
      <PageHero
        index="02"
        eyebrow="Facilities"
        title={['The floor', 'is yours.']}
        intro="Space and equipment for every discipline — strength, free weights, conditioning and functional work — available around the clock, six days a week."
        image={images.rack}
      >
        <Button href="#zones" variant="outline">
          Explore the zones
        </Button>
      </PageHero>

      {/* ── Zone index ── */}
      <section id="zones" aria-labelledby="zones-title" className="bg-void pt-24 sm:pt-32">
        <div className="frame">
          <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow index="01">Training zones</Eyebrow>
              <h2 id="zones-title" data-reveal className="display-md mt-10 text-chalk">
                Built around
                <span className="text-outline block">the work.</span>
              </h2>
            </div>
            <nav aria-label="Facility zones" className="lg:col-span-6 lg:col-start-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2">
                {facilities.map((f, i) => (
                  <li key={f.slug} data-reveal style={d(i * 50)}>
                    <a
                      href={`#${f.slug}`}
                      className="group flex items-center justify-between border-b border-white/10 py-4 text-fog transition-colors hover:text-chalk sm:mr-8"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="label text-ash">{f.index}</span>
                        <span className="font-display text-2xl uppercase">{f.title}</span>
                      </span>
                      <span aria-hidden="true" className="translate-x-0 transition-transform duration-500 ease-expo group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>

      {/* ── Mosaic gallery ── */}
      <section aria-label="Facilities gallery" className="bg-void py-12 sm:py-16">
        <div className="frame">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
            {gallery.map((f, i) => (
              <li
                key={f.slug}
                id={f.slug}
                className={`group relative scroll-mt-28 overflow-hidden ${spans[i % spans.length]}`}
                data-reveal="image"
                style={d((i % 2) * 120)}
              >
                <article className="absolute inset-0" aria-labelledby={`${f.slug}-title`}>
                  <Photo
                    image={f.image}
                    sizes="(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw"
                    imgClassName="transition-transform duration-[1.8s] ease-expo group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/0 transition-colors duration-700 lg:via-void/10 lg:group-hover:via-void/60"
                  />
                  <div className="absolute inset-x-0 top-0 flex justify-between p-6 sm:p-8">
                    <span className="label text-chalk">{f.index}</span>
                    <span className="label text-fog">{f.kicker}</span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                    <h3 id={`${f.slug}-title`} className="font-display text-4xl uppercase text-chalk sm:text-5xl lg:text-6xl">
                      {f.title}
                    </h3>
                    {/* Description: always visible on touch, revealed on hover/focus on desktop */}
                    <div className="grid transition-[grid-template-rows,opacity] duration-700 ease-expo lg:grid-rows-[0fr] lg:opacity-0 lg:group-focus-within:grid-rows-[1fr] lg:group-focus-within:opacity-100 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                      <p className="overflow-hidden">
                        <span className="block max-w-md pt-4 text-sm leading-relaxed text-fog sm:text-base">{f.description}</span>
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="label mt-8 text-ash/70">Imagery shown is representative of each training zone.</p>
        </div>
      </section>

      {/* ── Environment feature ── */}
      {environment && (
        <section
          id={environment.slug}
          aria-labelledby="environment-title"
          className="grain relative flex min-h-[90svh] scroll-mt-20 items-end overflow-hidden bg-void py-20 sm:py-28"
        >
          <div className="absolute inset-0">
            <Photo image={environment.image} sizes="100vw" className="opacity-65" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/10" />
          <div className="frame relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow index={environment.index}>{environment.kicker}</Eyebrow>
              <h2 id="environment-title" data-reveal className="display-lg mt-10 text-chalk">
                {environment.title.split(' ')[0]}
                <span className="text-outline block">{environment.title.split(' ').slice(1).join(' ')}</span>
              </h2>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <p data-reveal style={d(150)} className="lede">
                {environment.description}
              </p>
              <div data-reveal style={d(250)} className="mt-10">
                <Button href="/contact?enquiry=visit#enquire">Arrange a visit</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTASection eyebrow="See it for yourself" title={['Come train', 'at carnage.']} image={images.kettlebell} />
    </>
  );
}
