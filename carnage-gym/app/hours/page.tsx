import PageHero from '@/components/PageHero';
import Eyebrow from '@/components/Eyebrow';
import Photo from '@/components/Photo';
import Button from '@/components/Button';
import OpenStatus from '@/components/OpenStatus';
import HoursSchedule from '@/components/HoursSchedule';
import CTASection from '@/components/CTASection';
import { images } from '@/lib/images';
import { days, site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Opening Hours',
  description:
    'Carnage Gym opening hours: open 24 hours Monday to Saturday, closed on Sunday. Ittehad Commercial Area, DHA Phase 6, Karachi.',
  path: '/hours',
});

const d = (ms: number) => ({ ['--reveal-delay' as string]: `${ms}ms` });

export default function HoursPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Opening hours"
        title={['Open when', 'you are.']}
        intro="Early starts, late finishes, midnight sessions — from Monday to Saturday, Carnage never closes. Sunday is for recovery."
        image={images.cardio}
      >
        <OpenStatus className="text-chalk" />
      </PageHero>

      {/* ── Headline schedule ── */}
      <section aria-labelledby="hours-title" className="bg-bone py-24 text-void sm:py-32 lg:py-40">
        <div className="frame">
          <Eyebrow index="01" tone="dark">
            The schedule
          </Eyebrow>
          <h2 id="hours-title" className="sr-only">
            Weekly opening hours
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden border border-void/15 bg-void/15 lg:grid-cols-12">
            <div data-reveal className="bg-bone p-8 sm:p-12 lg:col-span-8">
              <p className="label text-void/55">Monday – Saturday</p>
              <p className="mt-6 font-display text-[clamp(4.5rem,15vw,13rem)] uppercase leading-[0.82]">
                Open
                <span className="block">24 hours</span>
              </p>
            </div>
            <div data-reveal style={d(150)} className="flex flex-col justify-between bg-void p-8 text-chalk sm:p-12 lg:col-span-4">
              <p className="label text-ash">Sunday</p>
              <p className="mt-6 font-display text-[clamp(4rem,15vw,9rem)] lg:text-[clamp(4rem,7.4vw,7.5rem)] uppercase leading-[0.82]">
                <span className="text-outline">Closed</span>
              </p>
              <p className="mt-8 text-sm text-fog">Rest. Recover. Come back stronger on Monday.</p>
            </div>
          </div>

          {/* Week bar */}
          <div className="mt-16" aria-hidden="true">
            <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
              {days.map((day, i) => {
                const open = (site.hours.openDays as readonly number[]).includes(day.key);
                return (
                  <div key={day.key} data-reveal style={d(i * 60)}>
                    <div className={`h-24 sm:h-40 ${open ? 'bg-void' : 'border border-dashed border-void/30'}`}>
                      {open && (
                        <div className="flex h-full items-end justify-center pb-3">
                          <span className="font-display text-lg text-chalk sm:text-2xl">24</span>
                        </div>
                      )}
                    </div>
                    <p className="label mt-3 text-center text-[0.6rem] text-void/60">{day.short}</p>
                  </div>
                );
              })}
            </div>
            <div className="label mt-6 flex justify-between text-void/50">
              <span>00:00</span>
              <span>Every open day, around the clock</span>
              <span className="hidden sm:inline">23:59</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Day by day ── */}
      <section aria-labelledby="daily-title" className="bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow index="02">Day by day</Eyebrow>
            <h2 id="daily-title" data-reveal className="display-md mt-10 text-chalk">
              Seven days.
              <span className="text-outline block">One day off.</span>
            </h2>
            <p data-reveal style={d(100)} className="lede mt-8 max-w-sm">
              Times are Karachi local time (PKT). Today is highlighted automatically.
            </p>
            <figure data-reveal="image" style={d(200)} className="relative mt-12 hidden aspect-[4/3] lg:block">
              <Photo image={images.dumbbells} sizes="40vw" />
            </figure>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <HoursSchedule />
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Button href={site.phone.href} icon="phone">
                Call {site.phone.display}
              </Button>
              <Button href="/contact" variant="outline">
                Contact the gym
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Any hour. Any day but Sunday." title={['See you', 'on the floor.']} image={images.lifter} />
    </>
  );
}
