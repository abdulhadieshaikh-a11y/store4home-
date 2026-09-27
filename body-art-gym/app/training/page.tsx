import Link from 'next/link';
import CtaBand from '@/components/sections/CtaBand';
import PageHero from '@/components/sections/PageHero';
import { Arrow, ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Typography';
import Visual from '@/components/ui/Visual';
import { programs } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Training',
  description:
    'Strength, bodybuilding, fitness and conditioning — disciplined, old-school training at Body Art Gym in BMCHS Sharafabad, Karachi. Open Mon–Sat, 8 AM to 1 AM.',
  path: '/training',
});

const method = [
  { n: '01', t: 'Show up', d: 'Consistency is the first rep. Make training a fixed part of your week — and keep the appointment.' },
  { n: '02', t: 'Lift with intent', d: 'Every set has a purpose. Control the weight, own the movement, focus on the muscle.' },
  { n: '03', t: 'Progress', d: 'A little more, over time. Add weight, reps or quality — steadily, week after week.' },
  { n: '04', t: 'Recover', d: 'Growth happens between sessions. Sleep, eat well, and use Sunday to rest.' },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training"
        title={
          <>
            Train with
            <br />
            <span className="text-ember-400">purpose.</span>
          </>
        }
        intro={<p>Disciplined, old-school strength training — no gimmicks, no shortcuts. Just the fundamentals, done properly and done consistently.</p>}
        art="dumbbell"
        alt="Vintage illustration of a knurled dumbbell under a spotlight"
        plate="Plate Nº 05 — The Grip"
      >
        <ButtonLink href="/programs">Discover programs</ButtonLink>
        <ButtonLink href="/membership" variant="outline">
          Enquire now
        </ButtonLink>
      </PageHero>

      {/* The method */}
      <section aria-labelledby="method-title" className="paper relative overflow-hidden py-24 sm:py-32">
        <div className="frame">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <Eyebrow tone="iron" className="!text-ember-600">
                  Training discipline
                </Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="method-title" className="display-lg mt-6 text-iron-900">
                  The method.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140} className="max-w-md">
              <p className="font-serif text-lg italic leading-relaxed text-iron-700">
                Four principles that have built physiques for generations. Simple to understand. Hard to do. Worth it.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-px bg-iron-900/20 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m, i) => (
              <Reveal as="li" key={m.n} delay={i * 100} className="group relative bg-cream-200 p-6 pt-8 transition-colors duration-500 hover:bg-cream-100 sm:p-8">
                <span className="text-outline block font-display text-7xl leading-none text-iron-900/80 transition-colors duration-500 group-hover:text-ember-500 sm:text-8xl">
                  {m.n}
                </span>
                <h3 className="display-sm mt-6 text-iron-900">{m.t}</h3>
                <p className="mt-3 leading-relaxed text-iron-700">{m.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Disciplines */}
      <section aria-labelledby="disciplines-title" className="relative overflow-hidden bg-iron-900 py-24 sm:py-32">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative">
          <Reveal>
            <Eyebrow>Disciplines</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="disciplines-title" className="display-lg mt-6 max-w-3xl text-cream">
              Four ways into the iron.
            </h2>
          </Reveal>

          <div className="mt-16 space-y-20 sm:space-y-28">
            {programs.map((p, i) => (
              <article key={p.slug} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <Reveal effect="mask" className={`md:col-span-6 ${i % 2 ? 'md:order-2' : ''}`}>
                  <Visual
                    art={p.art}
                    tone={i % 2 ? 'ember' : 'dark'}
                    image={p.image}
                    alt={`Vintage illustration representing ${p.title.toLowerCase()} training`}
                    className="aspect-[5/4] w-full"
                  />
                </Reveal>
                <div className={`md:col-span-6 ${i % 2 ? 'md:order-1' : ''}`}>
                  <Reveal>
                    <p className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-400">
                      Nº {p.number} · {p.kicker}
                    </p>
                  </Reveal>
                  <Reveal delay={80}>
                    <h3 className="display-lg mt-4 text-cream">{p.title}</h3>
                  </Reveal>
                  <Reveal delay={140}>
                    <p className="lede mt-5 max-w-lg text-cream/75">{p.description}</p>
                  </Reveal>
                  <Reveal delay={200}>
                    <Link
                      href={`/programs#${p.slug}`}
                      className="group mt-8 inline-flex items-center gap-3 border-b border-cream/30 pb-2 font-label text-[0.75rem] uppercase tracking-label text-cream transition-colors hover:border-ember-400 hover:text-ember-300"
                    >
                      Program details <Arrow className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Reveal>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Late hours band */}
      <section aria-labelledby="late-title" className="relative overflow-hidden bg-iron-950 py-20 sm:py-28">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative text-center">
          <Reveal>
            <p className="font-label text-[0.72rem] uppercase tracking-wide2 text-ember-300">Monday — Saturday · 8:00 AM — 1:00 AM</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="late-title" className="display-xl mx-auto mt-6 max-w-5xl text-cream">
              Early mornings.
              <br />
              <span className="text-outline-ember">Late nights.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mx-auto mt-8 max-w-xl text-cream/75">
              Train before work, after work, or after midnight — the doors stay open until 1 AM, six days a week.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ButtonLink href="/hours" variant="outline" className="mt-10">
              Opening hours
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
