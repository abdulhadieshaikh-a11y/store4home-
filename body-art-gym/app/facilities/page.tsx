import CtaBand from '@/components/sections/CtaBand';
import PageHero from '@/components/sections/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Typography';
import Visual from '@/components/ui/Visual';
import { facilities } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Facilities',
  description:
    'Step inside Body Art Gym — an old-school training floor built around free weights and strength work in CP & Berar Society, BMCHS Sharafabad, Karachi.',
  path: '/facilities',
});

export default function FacilitiesPage() {
  const [iron, floor, station, plates] = facilities;
  return (
    <>
      <PageHero
        eyebrow="Facilities"
        title={
          <>
            Walk the
            <br />
            <span className="text-ember-400">floor.</span>
          </>
        }
        intro={<p>An authentic, old-school training environment — built around the iron and the people who come to work with it.</p>}
        art="rack"
        alt="Vintage illustration of a two-tier dumbbell rack"
        plate="Plate Nº 01 — The Iron"
      />

      {/* Gallery walk-through */}
      <section aria-labelledby="gallery-title" className="relative overflow-hidden bg-iron-950 py-24 sm:py-32">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative">
          <h2 id="gallery-title" className="sr-only">
            A walk through the gym
          </h2>

          {/* 01 — full-bleed panorama */}
          <figure>
            <Reveal effect="mask">
              <Visual art={floor.art} tone="dark" image={floor.image} alt="Vintage illustration of a loaded barbell on the training floor" className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]" sizes="100vw" />
            </Reveal>
            <figcaption className="mt-6 grid gap-4 border-b border-cream/10 pb-10 sm:grid-cols-12">
              <p className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-300 sm:col-span-3">
                Plate Nº {floor.number} — {floor.label}
              </p>
              <h3 className="display-md text-cream sm:col-span-4">{floor.title}</h3>
              <p className="leading-relaxed text-cream/70 sm:col-span-5">{floor.text}</p>
            </figcaption>
          </figure>

          {/* 02 + 03 — offset pair */}
          <div className="mt-20 grid gap-14 md:grid-cols-12 md:gap-10">
            <figure className="md:col-span-7">
              <Reveal effect="mask">
                <Visual art={iron.art} tone="dark" image={iron.image} alt="Vintage illustration of dumbbells racked in rows" className="aspect-[4/5] w-full" />
              </Reveal>
              <figcaption className="mt-6">
                <p className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-300">
                  Plate Nº {iron.number} — {iron.label}
                </p>
                <h3 className="display-md mt-3 text-cream">{iron.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-cream/70">{iron.text}</p>
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between gap-14 md:col-span-5 md:pt-32">
              <Reveal>
                <p className="font-serif text-2xl italic leading-snug text-cream/85 sm:text-3xl">
                  “Step in, and the outside world falls away. It’s just you, the iron and the work.”
                </p>
              </Reveal>
              <figure>
                <Reveal effect="mask">
                  <Visual art={station.art} tone="ember" image={station.image} alt="Vintage illustration of a bench press station" className="aspect-square w-full" />
                </Reveal>
                <figcaption className="mt-6">
                  <p className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-300">
                    Plate Nº {station.number} — {station.label}
                  </p>
                  <h3 className="display-md mt-3 text-cream">{station.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream/70">{station.text}</p>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* 04 — poster split */}
          <div className="mt-24 grid items-center gap-10 border-t border-cream/10 pt-20 md:grid-cols-2">
            <figure className="md:order-2">
              <Reveal effect="mask">
                <Visual art={plates.art} tone="cream" image={plates.image} alt="Vintage illustration of weight plates stacked on a post" className="aspect-[5/4] w-full" />
              </Reveal>
            </figure>
            <div className="md:order-1">
              <p className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-300">
                Plate Nº {plates.number} — {plates.label}
              </p>
              <h3 className="display-lg mt-4 text-cream">{plates.title}</h3>
              <p className="lede mt-5 max-w-md text-cream/75">{plates.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section aria-labelledby="visit-title" className="paper relative overflow-hidden py-24 sm:py-28">
        <div className="frame grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="iron" className="!text-ember-600">
                See it for yourself
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="visit-title" className="display-lg mt-6 text-iron-900">
                The best tour is in person.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140} className="lg:col-span-5">
            <p className="leading-relaxed text-iron-700">
              Find us in CP & Berar Society, BMCHS Sharafabad. Open Monday to Saturday, 8:00 AM to 1:00 AM. Call ahead on{' '}
              <a href={site.phone.href} className="font-medium text-iron-900 underline underline-offset-4 hover:text-ember-600">
                {site.phone.display}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <ButtonLink href={site.maps.directions} target="_blank" rel="noopener noreferrer" variant="dark">
                Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
              </ButtonLink>
              <ButtonLink href="/contact" variant="cream" className="!border-iron-900/30">
                Contact us
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
