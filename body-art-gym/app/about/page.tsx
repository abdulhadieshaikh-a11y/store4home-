import Emblem from '@/components/art/Emblem';
import CtaBand from '@/components/sections/CtaBand';
import PageHero from '@/components/sections/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow, Rule, Stamp } from '@/components/ui/Typography';
import Visual from '@/components/ui/Visual';
import { principles } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About',
  description:
    'Body Art Gym is an old-school bodybuilding and strength gym in CP & Berar Society, BMCHS Sharafabad, Karachi — built on discipline, consistency and respect for the iron.',
  path: '/about',
});

const code = [
  'Respect the iron.',
  'Train with intent.',
  'Leave the ego at the door.',
  'Rack your weights.',
  'Show up — especially on the hard days.',
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Body Art Gym"
        title={
          <>
            Iron.
            <br />
            Discipline.
            <br />
            <span className="text-ember-400">Respect.</span>
          </>
        }
        intro={
          <p>
            Body Art Gym is a bodybuilding and strength gym in CP & Berar Society, BMCHS Sharafabad, Karachi — built around the classic, old-school way of
            training.
          </p>
        }
        art="bench"
        alt="Vintage illustration of a bench press station with a loaded plate"
        plate="Plate Nº 03 — The Station"
      />

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="paper relative overflow-hidden py-24 sm:py-32">
        <div className="frame">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow tone="iron" className="!text-ember-600">
                  Training philosophy
                </Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 id="philosophy-title" className="display-md mt-6 text-iron-900">
                  The body is the canvas.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <blockquote className="font-serif text-3xl leading-snug text-iron-900 sm:text-4xl lg:text-[2.75rem]">
                  <span className="text-ember-500">“</span>Training is the art — practised every day, one rep, one set, one session at a time.
                  <span className="text-ember-500">”</span>
                </blockquote>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-2xl leading-relaxed text-iron-700">
                  The name says it all. Building a physique is a craft: it asks for patience, attention to detail and the discipline to keep going long after
                  the novelty wears off. At Body Art Gym, that craft is respected — whatever your starting point and whatever your goal.
                </p>
              </Reveal>
            </div>
          </div>

          <Rule className="mt-20 text-iron-900" />

          <ol className="mt-4 grid sm:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.number} delay={i * 100} className="py-8 sm:px-8 sm:first:pl-0">
                <Stamp n={p.number} className="text-ember-600" />
                <h3 className="display-sm mt-3 text-iron-900">{p.title}</h3>
                <p className="mt-3 max-w-xs leading-relaxed text-iron-700">{p.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Fitness culture */}
      <section aria-labelledby="culture-title" className="relative overflow-hidden bg-iron-900 py-24 sm:py-32">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 lg:order-2">
            <Reveal effect="mask">
              <Visual art="dumbbell" tone="ember" alt="Vintage illustration of a knurled dumbbell" label="Plate Nº 05 — The Grip" className="aspect-[4/5] w-full" />
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:order-1">
            <Reveal>
              <Eyebrow>Fitness culture</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="culture-title" className="display-lg mt-6 text-cream">
                A culture of <span className="text-ember-400">consistency.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="lede mt-8 max-w-xl text-cream/80">
                Old-school bodybuilding was never about trends. It was about turning up, doing the work and doing it again tomorrow.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-xl leading-relaxed text-cream/65">
                That spirit shapes the gym: a focused, no-nonsense environment where effort is respected and progress is earned. Whether you are brand new or
                have been lifting for years, the same simple idea applies — consistency beats intensity, and discipline beats motivation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee tone="cream" words={['Respect the iron', 'Train with intent', 'Leave the ego at the door', 'Rack your weights', 'Show up']} />

      {/* Strength-focused atmosphere: the code */}
      <section aria-labelledby="code-title" className="relative overflow-hidden bg-iron-950 py-24 sm:py-32">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative">
          <div className="mx-auto max-w-4xl border border-cream/15 p-2">
            <div className="relative border border-cream/10 px-6 py-14 text-center sm:px-14 sm:py-20">
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(196,84,28,0.2),transparent_70%)]" />
              <Emblem tone="ember" className="relative mx-auto w-24 sm:w-28" decorative />
              <p className="relative mt-8 font-label text-[0.72rem] uppercase tracking-wide2 text-ember-300">A strength-focused atmosphere</p>
              <h2 id="code-title" className="display-lg relative mt-4 text-cream">
                The old-school code
              </h2>
              <Rule className="relative mx-auto mt-8 max-w-xs text-ember-400" />
              <ol className="relative mt-10 space-y-5">
                {code.map((line, i) => (
                  <Reveal as="li" key={line} delay={i * 90} className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-5">
                    <span className="font-serif text-lg italic text-ember-400">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl uppercase tracking-poster text-cream sm:text-4xl">{line}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/training">View training</ButtonLink>
            <ButtonLink href="/facilities" variant="outline">
              See the facilities
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
