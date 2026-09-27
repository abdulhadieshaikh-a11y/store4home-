import type { Metadata } from 'next';
import Link from 'next/link';
import Art from '@/components/art/Art';
import Emblem from '@/components/art/Emblem';
import CtaBand from '@/components/sections/CtaBand';
import HoursBoard from '@/components/sections/HoursBoard';
import { Arrow, ButtonLink } from '@/components/ui/Button';
import Marquee from '@/components/ui/Marquee';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow, Stamp } from '@/components/ui/Typography';
import Visual from '@/components/ui/Visual';
import { facilities, principles, programs } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Intro />
      <Training />
      <Programs />
      <Facilities />
      <Hours />
      <CtaBand />
    </>
  );
}

/* ─────────────────────────── Hero ─────────────────────────── */

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-iron-900">
      {/* Cinematic plate */}
      <div aria-hidden className="absolute inset-0 lg:left-auto lg:w-[60%]">
        <div className="absolute inset-0 animate-ken-burns">
          <Art name="barbell" tone="dark" className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-iron-900 via-iron-900/75 to-iron-900/30 lg:bg-gradient-to-r lg:from-iron-900 lg:via-iron-900/30 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-iron-900 to-transparent" />
      </div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      {/* Rotating emblem */}
      <div
        aria-hidden
        className="fade-late pointer-events-none absolute hidden w-52 opacity-90 [--d:900ms] sm:block sm:right-8 sm:top-auto sm:bottom-40 lg:bottom-[22%] lg:right-[5%] lg:w-56 xl:w-64"
      >
        <div className="animate-spin-slow motion-reduce:animate-none">
          <Emblem tone="cream" decorative />
        </div>
      </div>

      <div className="frame relative flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14 lg:justify-center lg:pt-40">
        <p className="fade-late font-label text-sm font-medium uppercase tracking-wide2 text-cream [--d:150ms]">
          Body Art Gym <span className="text-ember-400">·</span> Karachi
        </p>
        <h1 id="hero-title" className="display-xl mt-5 max-w-[11ch] text-cream">
          <span className="sr-only">Body Art Gym — </span>
          <span className="rise">
            <span style={{ ['--d' as string]: '200ms' }}>Built the</span>
          </span>
          <span className="rise">
            <span className="text-ember-400" style={{ ['--d' as string]: '330ms' }}>
              Old-school
            </span>
          </span>
          <span className="rise">
            <span style={{ ['--d' as string]: '460ms' }}>way.</span>
          </span>
        </h1>
        <p className="lede fade-late mt-7 max-w-md text-cream/80 [--d:800ms]">
          Iron, sweat and discipline. A bodybuilding and strength gym in BMCHS Sharafabad — open six days a week, until 1 AM.
        </p>
        <div className="fade-late mt-9 flex flex-col gap-3 xs:flex-row [--d:950ms]">
          <ButtonLink href="/facilities">Explore the gym</ButtonLink>
          <ButtonLink href="/membership" variant="outline">
            Enquire now
          </ButtonLink>
        </div>
      </div>

      {/* Fact strip */}
      <div className="fade-late relative border-t border-cream/10 bg-iron-950/60 backdrop-blur-sm [--d:1150ms]">
        <dl className="frame grid grid-cols-2 gap-px text-cream md:grid-cols-4">
          {[
            { k: 'Mon — Sat', v: '8:00 AM — 1:00 AM' },
            { k: 'Sunday', v: 'Closed' },
            { k: 'Call', v: site.phone.display, href: site.phone.href },
            { k: 'Find us', v: 'Sharafabad, Karachi', href: '/contact' },
          ].map((f) => (
            <div key={f.k} className="py-4 pr-4 md:py-5">
              <dt className="font-label text-[0.62rem] uppercase tracking-label text-ember-300">{f.k}</dt>
              <dd className="mt-1 font-display text-base uppercase tracking-poster xs:text-lg sm:text-xl">
                {f.href ? (
                  <a href={f.href} className="transition-colors hover:text-ember-300">
                    {f.v}
                  </a>
                ) : (
                  f.v
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────── Intro ─────────────────────────── */

function Intro() {
  return (
    <section aria-labelledby="intro-title" className="paper relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 w-[26rem] opacity-[0.07] sm:w-[34rem]">
        <div className="animate-spin-slow motion-reduce:animate-none">
          <Emblem tone="dark" decorative />
        </div>
      </div>

      <div className="frame relative">
        <Reveal>
          <Eyebrow tone="iron" className="!text-ember-600">
            The Body Art way
          </Eyebrow>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7" delay={80}>
            <h2 id="intro-title" className="display-lg text-iron-900">
              Train hard.
              <br />
              <span className="text-ember-500">Stay consistent.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-5 lg:pt-4">
            <Reveal delay={160}>
              <p className="font-serif text-xl leading-relaxed text-iron-800 sm:text-2xl">
                Body Art Gym is a bodybuilding and strength gym in the heart of BMCHS Sharafabad, Karachi.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 leading-relaxed text-iron-700">
                No gimmicks and no noise — just iron, focus and the discipline to keep showing up. Whether you are chasing your first heavy lift or your best
                physique, this is a place built for honest work.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <ButtonLink href="/about" variant="dark" className="mt-8">
                About the gym
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-iron-900/20 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal
              as="li"
              key={p.number}
              delay={i * 110}
              className="border-b border-iron-900/20 py-8 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
            >
              <Stamp n={p.number} className="text-ember-600" />
              <h3 className="display-sm mt-3 text-iron-900">{p.title}</h3>
              <p className="mt-3 max-w-xs leading-relaxed text-iron-700">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── Training ─────────────────────────── */

function Training() {
  const pillars = [
    { t: 'Strength', d: 'Heavy fundamentals, progressive loads.' },
    { t: 'Bodybuilding', d: 'Classic physique work. Volume and focus.' },
    { t: 'Fitness', d: 'Everyday strength and capacity.' },
    { t: 'Conditioning', d: 'The engine behind every set.' },
  ];
  return (
    <section aria-labelledby="training-title" className="relative overflow-hidden bg-iron-900 py-24 sm:py-32">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="frame relative grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <Reveal effect="mask">
            <Visual art="arm" tone="ember" alt="Vintage illustration of a flexed arm — the classic bodybuilding symbol" className="aspect-[4/5] w-full" />
          </Reveal>
          <div className="absolute -bottom-6 left-4 right-4 flex items-end justify-between sm:left-6 sm:right-auto">
            <p className="bg-iron-950 px-4 py-3 font-label text-[0.66rem] uppercase tracking-label text-cream/80">
              Plate Nº 02 — The Craft
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>Training</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="training-title" className="display-lg mt-6 text-cream">
              Discipline <span className="text-outline-ember">is the</span> program.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-6 max-w-lg text-cream/75">
              The old-school way is simple: lift with intent, train consistently, recover properly, repeat. The work is hard. That is the point.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-px bg-cream/10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.t} delay={200 + i * 80} className="group bg-iron-900 p-5 transition-colors duration-500 hover:bg-iron-800 sm:p-6">
                <span className="font-label text-[0.66rem] tracking-label text-ember-400">0{i + 1}</span>
                <h3 className="mt-2 font-display text-3xl uppercase tracking-poster text-cream">{p.t}</h3>
                <p className="mt-1 text-sm text-cream/65">{p.d}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={400}>
            <ButtonLink href="/training" className="mt-10">
              Explore training
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Programs ─────────────────────────── */

function Programs() {
  return (
    <section aria-labelledby="programs-title" className="paper relative overflow-hidden py-24 sm:py-32">
      <div className="frame">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow tone="iron" className="!text-ember-600">
                Programs
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="programs-title" className="display-lg mt-6 text-iron-900">
                Choose your
                <br />
                discipline.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="max-w-sm">
            <p className="font-serif italic leading-relaxed text-iron-700">
              Four ways into the iron. Schedules and details are available at the front desk — ask when you visit or call.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 border-t border-iron-900/25">
          {programs.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 90} className="border-b border-iron-900/25">
              <Link
                href={`/programs#${p.slug}`}
                className="group relative grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-8 sm:py-8 lg:grid-cols-[5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto]"
              >
                {/* mobile thumbnail */}
                <Visual art={p.art} tone="dark" image={p.image} alt="" zoom={false} className="aspect-square w-full sm:hidden" />
                <span className="hidden font-serif text-2xl italic text-ember-600 sm:block">{p.number}</span>
                <span>
                  <span className="block font-label text-[0.66rem] uppercase tracking-label text-iron-600 sm:hidden">Nº {p.number}</span>
                  <span className="block font-display text-[1.9rem] uppercase leading-none tracking-poster text-iron-900 xs:text-4xl transition-colors duration-300 group-hover:text-ember-600 sm:text-6xl lg:text-7xl">
                    {p.title}
                  </span>
                  <span className="mt-2 hidden text-iron-700 sm:block lg:hidden">{p.summary}</span>
                </span>
                <span className="hidden max-w-sm text-iron-700 lg:block">{p.summary}</span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-iron-900/40 text-iron-900 transition-all duration-500 group-hover:border-ember-500 group-hover:bg-ember-500 group-hover:text-cream-50 sm:h-14 sm:w-14">
                  <Arrow className="transition-transform duration-500 group-hover:-rotate-45" />
                  <span className="sr-only">View {p.title}</span>
                </span>

                {/* desktop hover preview */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-24 top-1/2 z-10 hidden w-48 -translate-y-1/2 rotate-3 scale-90 opacity-0 shadow-2xl transition-all duration-500 group-hover:rotate-0 group-hover:scale-100 group-hover:opacity-100 xl:block"
                >
                  <Visual art={p.art} tone="dark" image={p.image} alt="" zoom={false} className="aspect-[4/5] w-full" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12">
          <ButtonLink href="/programs" variant="dark">
            Discover programs
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── Facilities ─────────────────────────── */

function Facilities() {
  return (
    <section aria-labelledby="facilities-title" className="relative overflow-hidden bg-iron-950 py-24 sm:py-32">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="frame relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Large plate */}
          <div className="lg:col-span-7">
            <Reveal effect="mask">
              <Visual art="rack" tone="dark" alt="Vintage illustration of a dumbbell rack" label="Plate Nº 01 — The Iron" className="aspect-[4/5] w-full sm:aspect-[5/6]" />
            </Reveal>
          </div>

          {/* Editorial column */}
          <div className="flex flex-col lg:col-span-5 lg:pt-10">
            <Reveal>
              <Eyebrow>Facilities</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="facilities-title" className="display-lg mt-6 text-cream">
                Inside
                <br />
                the gym.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="lede mt-6 text-cream/75">
                A training floor built around the classics. Step in, and the outside world falls away — it is just you, the iron and the work.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-[1fr_1.1fr] items-end gap-5">
              <Reveal effect="mask" delay={200}>
                <Visual art="plates" tone="ember" alt="Vintage illustration of weight plates stacked on a post" className="aspect-square w-full" />
              </Reveal>
              <Reveal delay={260}>
                <p className="font-label text-[0.66rem] uppercase tracking-label text-ember-300">Plate Nº 04</p>
                <p className="mt-2 font-serif italic leading-relaxed text-cream/70">Iron racked and waiting. Load the bar and get to work.</p>
              </Reveal>
            </div>

            <ul className="mt-10 border-t border-cream/10">
              {facilities.slice(0, 3).map((f, i) => (
                <Reveal as="li" key={f.number} delay={i * 80} className="flex items-baseline justify-between gap-4 border-b border-cream/10 py-4">
                  <span className="font-display text-2xl uppercase tracking-poster text-cream">{f.title}</span>
                  <span className="font-label text-[0.66rem] uppercase tracking-label text-cream/50">{f.label}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <ButtonLink href="/facilities" variant="outline" className="mt-10">
                View facilities
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Hours ─────────────────────────── */

function Hours() {
  return (
    <section aria-label="Opening hours" className="relative overflow-hidden bg-iron-900 py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 opacity-60">
        <Art name="plates" tone="dark" className="h-full w-full" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-iron-900/80" />
      <div className="frame relative">
        <HoursBoard />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={site.maps.directions} target="_blank" rel="noopener noreferrer" variant="ember">
            Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          </ButtonLink>
          <ButtonLink href="/hours" variant="outline">
            All hours
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
