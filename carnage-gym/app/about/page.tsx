import PageHero from '@/components/PageHero';
import Eyebrow from '@/components/Eyebrow';
import Photo from '@/components/Photo';
import Button from '@/components/Button';
import Marquee from '@/components/Marquee';
import CTASection from '@/components/CTASection';
import { images } from '@/lib/images';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About',
  description:
    'The story and philosophy behind Carnage Gym — a 24-hour training ground in Ittehad Commercial Area, DHA Phase 6, Karachi, built on discipline, intensity and consistency.',
  path: '/about',
});

const d = (ms: number) => ({ ['--reveal-delay' as string]: `${ms}ms` });

const principles = [
  {
    word: 'Discipline',
    body: 'Motivation fades. Discipline is what gets you through the door on the days you don’t feel like it — and those are the days that count.',
  },
  {
    word: 'Intensity',
    body: 'Every session has a purpose. Train with focus, respect the weight, and give each set the effort it deserves.',
  },
  {
    word: 'Consistency',
    body: 'Results are built quietly, rep by rep, week by week. Show up, do the work, and let time do the rest.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="About Carnage"
        title={['Forged in', 'discipline.']}
        intro="Carnage Gym is a training ground for people who treat fitness as a practice, not a phase — open 24 hours, six days a week, in the heart of DHA Phase 6."
        image={images.focus}
        meta={['Karachi, Pakistan', 'DHA Phase 6', 'Mon – Sat · 24 Hours']}
      />

      {/* ── Brand introduction ── */}
      <section aria-labelledby="intro-title" className="bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="01">The brand</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <h2 id="intro-title" data-reveal className="font-display text-[clamp(2.2rem,4.6vw,4.4rem)] uppercase leading-[0.98] text-chalk">
              The name says it plainly. Carnage is what you leave behind when you give a session everything you have —{' '}
              <span className="text-ash">the doubt, the excuses, the version of you that wanted to stay home.</span>
            </h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <p data-reveal style={d(100)} className="leading-relaxed text-fog">
                We built Carnage Gym around a simple idea: serious training deserves a serious environment. A place with
                the space to work, the freedom to train on your own schedule, and an atmosphere that respects the effort
                you bring.
              </p>
              <p data-reveal style={d(200)} className="leading-relaxed text-fog">
                Located on Ittehad Lane 3 in Ittehad Commercial Area, we keep our doors open around the clock from Monday
                to Saturday — because progress doesn&rsquo;t keep office hours, and neither should your gym.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editorial image band ── */}
      <section aria-label="Training at Carnage" className="bg-void pb-24 sm:pb-32">
        <div className="frame grid grid-cols-12 gap-4 sm:gap-6">
          <figure data-reveal="image" className="relative col-span-12 aspect-[16/10] md:col-span-8">
            <Photo image={images.plates} sizes="(min-width: 768px) 66vw, 100vw" />
          </figure>
          <div className="col-span-12 grid grid-cols-2 gap-4 sm:gap-6 md:col-span-4 md:grid-cols-1">
            <figure data-reveal="image" style={d(120)} className="relative aspect-square md:aspect-[4/3]">
              <Photo image={images.cable} sizes="(min-width: 768px) 33vw, 50vw" />
            </figure>
            <figure data-reveal="image" style={d(240)} className="relative aspect-square md:aspect-[4/3]">
              <Photo image={images.rack} sizes="(min-width: 768px) 33vw, 50vw" />
            </figure>
          </div>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section aria-labelledby="philosophy-title" className="bg-bone py-24 text-void sm:py-32 lg:py-40">
        <div className="frame">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow index="02" tone="dark">
                The philosophy
              </Eyebrow>
              <h2 id="philosophy-title" data-reveal className="display-lg mt-10">
                Three rules.
                <span className="text-outline-dark block">No exceptions.</span>
              </h2>
            </div>
          </div>

          <ol className="mt-16 grid border-t border-void/15 md:grid-cols-3">
            {principles.map((p, i) => (
              <li
                key={p.word}
                data-reveal
                style={d(i * 120)}
                className="border-b border-void/15 py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span className="label text-void/50">0{i + 1}</span>
                <h3 className="mt-8 font-display text-5xl uppercase sm:text-6xl md:text-4xl lg:text-5xl xl:text-6xl">{p.word}</h3>
                <p className="mt-6 max-w-sm leading-relaxed text-void/70">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Mindset ── */}
      <section aria-labelledby="mindset-title" className="relative bg-void">
        <div className="grid lg:grid-cols-2">
          <figure data-reveal="image" className="relative aspect-[4/5] sm:aspect-[16/12] lg:aspect-auto lg:min-h-[100svh]">
            <Photo image={images.lifter} sizes="(min-width: 1024px) 50vw, 100vw" />
          </figure>
          <div className="flex items-center py-24 sm:py-32">
            <div className="frame max-w-2xl lg:mx-0 lg:px-16 xl:px-24">
              <Eyebrow index="03">Training mindset</Eyebrow>
              <h2 id="mindset-title" data-reveal className="display-md mt-10 text-chalk">
                The bar doesn&rsquo;t care
                <span className="text-outline block">how you feel.</span>
              </h2>
              <div className="mt-10 space-y-6 leading-relaxed text-fog">
                <p data-reveal style={d(100)}>
                  It only knows whether you showed up. That honesty is what we love about training — and it&rsquo;s the
                  standard we hold the gym to.
                </p>
                <p data-reveal style={d(200)}>
                  Whether you&rsquo;re chasing strength, conditioning or simply the discipline of a daily habit, Carnage
                  gives you the space and the hours to pursue it on your terms.
                </p>
              </div>
              <blockquote data-reveal style={d(300)} className="mt-14 border-l border-chalk pl-6">
                <p className="font-display text-3xl uppercase leading-tight text-chalk sm:text-4xl">
                  &ldquo;Earn it. Every single rep.&rdquo;
                </p>
                <footer className="label mt-4 text-ash">— The Carnage standard</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={['Earn it', 'Every rep', 'Every day', 'No excuses']} />

      {/* ── Facts (verified information only) ── */}
      <section aria-labelledby="facts-title" className="bg-void py-24 sm:py-32">
        <div className="frame">
          <h2 id="facts-title" className="sr-only">
            Carnage Gym at a glance
          </h2>
          <dl className="grid border-t border-white/10 sm:grid-cols-3">
            {[
              { k: 'Hours a day', v: '24', note: 'Monday to Saturday' },
              { k: 'Days a week', v: '6', note: 'Closed on Sundays' },
              { k: 'Location', v: 'DHA 6', note: 'Ittehad Commercial Area' },
            ].map((s, i) => (
              <div
                key={s.k}
                data-reveal
                style={d(i * 100)}
                className="border-b border-white/10 py-10 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
              >
                <dt className="label text-ash">{s.k}</dt>
                <dd className="mt-6 font-display text-7xl uppercase leading-none text-chalk sm:text-6xl lg:text-8xl">{s.v}</dd>
                <dd className="mt-4 text-sm text-fog">{s.note}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Button href="/membership">Explore membership</Button>
            <Button href="/facilities" variant="outline">
              View facilities
            </Button>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Ready?" title={['Join the', 'carnage.']} image={images.dumbbells} />
    </>
  );
}
