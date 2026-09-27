import CtaBand from '@/components/sections/CtaBand';
import PageHero from '@/components/sections/PageHero';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Typography';
import Visual from '@/components/ui/Visual';
import { programs } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Programs',
  description:
    'Strength, bodybuilding, fitness and conditioning at Body Art Gym, BMCHS Sharafabad, Karachi. Ask the front desk about schedules and details.',
  path: '/programs',
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title={
          <>
            Find your
            <br />
            <span className="text-ember-400">discipline.</span>
          </>
        }
        intro={<p>Four foundations of old-school training. Schedules and details are shared at the front desk — ask when you visit, call or send an enquiry.</p>}
        art="kettlebell"
        tone="ember"
        alt="Vintage illustration of a kettlebell on an orange sunburst"
        plate="Plate Nº 06 — The Engine"
      />

      {/* Index */}
      <nav aria-label="Programs" className="sticky top-16 z-30 border-y border-cream/10 bg-iron-950/90 backdrop-blur-md">
        <ul className="frame flex gap-6 overflow-x-auto py-4 [scrollbar-width:none] sm:gap-10">
          {programs.map((p) => (
            <li key={p.slug} className="shrink-0">
              <a href={`#${p.slug}`} className="font-label text-[0.72rem] uppercase tracking-label text-cream/70 transition-colors hover:text-ember-300">
                <span className="mr-2 font-serif italic normal-case tracking-normal text-ember-400">{p.number}</span>
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative bg-iron-900">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        {programs.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            aria-labelledby={`${p.slug}-title`}
            className="relative scroll-mt-32 border-b border-cream/10 py-20 sm:py-28"
          >
            <div className="frame grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Reveal effect="mask">
                  <Visual
                    art={p.art}
                    tone={i % 2 ? 'ember' : 'dark'}
                    image={p.image}
                    alt={`Vintage illustration representing the ${p.title.toLowerCase()} program`}
                    label={`Program Nº ${p.number}`}
                    className="aspect-[4/5] w-full"
                  />
                </Reveal>
              </div>

              <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-1' : ''}`}>
                <Reveal>
                  <p className="flex items-baseline gap-4">
                    <span className="text-outline-ember font-display text-7xl leading-none sm:text-8xl">{p.number}</span>
                    <span className="font-label text-[0.72rem] uppercase tracking-wide2 text-ember-300">{p.kicker}</span>
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 id={`${p.slug}-title`} className="display-lg mt-4 text-cream">
                    {p.title}
                  </h2>
                </Reveal>
                <Reveal delay={140}>
                  <p className="lede mt-5 max-w-xl text-cream/80">{p.description}</p>
                </Reveal>

                <Reveal delay={200}>
                  <dl className="mt-10 grid max-w-xl border-t border-cream/15 sm:grid-cols-2">
                    <div className="border-b border-cream/15 py-5 sm:border-r sm:pr-6">
                      <dt className="font-label text-[0.66rem] uppercase tracking-label text-cream/50">Schedule</dt>
                      <dd className="mt-2 font-display text-2xl uppercase tracking-poster text-cream">{p.schedule ?? 'On enquiry'}</dd>
                    </div>
                    <div className="border-b border-cream/15 py-5 sm:pl-6">
                      <dt className="font-label text-[0.66rem] uppercase tracking-label text-cream/50">Details</dt>
                      <dd className="mt-2 text-cream/80">
                        {p.details?.length ? (
                          <ul className="space-y-1">
                            {p.details.map((d) => (
                              <li key={d}>— {d}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="font-serif italic">Ask at the front desk or call {site.phone.display}.</span>
                        )}
                      </dd>
                    </div>
                  </dl>
                </Reveal>

                <Reveal delay={260}>
                  <ButtonLink href={`/membership?interest=${encodeURIComponent(p.title)}`} className="mt-10">
                    Enquire about {p.title}
                  </ButtonLink>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* Reserved slot for future programs */}
        <section aria-labelledby="more-title" className="relative py-20 sm:py-24">
          <div className="frame">
            <div className="flex flex-col items-start justify-between gap-8 border border-dashed border-cream/25 p-8 sm:p-12 md:flex-row md:items-center">
              <div>
                <p className="font-label text-[0.7rem] uppercase tracking-wide2 text-ember-300">Nº 05</p>
                <h2 id="more-title" className="display-md mt-3 text-cream">
                  More to come.
                </h2>
                <p className="mt-3 max-w-md font-serif italic text-cream/70">Ask at the front desk about what is running now.</p>
              </div>
              <ButtonLink href="/membership" variant="outline">
                Ask us
              </ButtonLink>
            </div>
          </div>
        </section>
      </div>

      <section aria-label="Programs note" className="paper py-16">
        <div className="frame">
          <Eyebrow tone="iron" className="!text-ember-600">
            Good to know
          </Eyebrow>
          <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-iron-800">
            Programs, timings and membership options are confirmed directly by the gym. Send an enquiry and the team will share the latest details with you.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
