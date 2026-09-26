import Link from 'next/link';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/Marquee';
import Eyebrow from '@/components/Eyebrow';
import Photo from '@/components/Photo';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import OpenStatus from '@/components/OpenStatus';
import MapEmbed from '@/components/MapEmbed';
import CTASection from '@/components/CTASection';
import { images } from '@/lib/images';
import { facilities, pillars } from '@/lib/content';
import { maps, site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = {
  ...pageMeta({
    title: 'Carnage Gym — 24-Hour Gym in DHA Phase 6, Karachi',
    description: site.description,
    path: '/',
  }),
  title: { absolute: 'Carnage Gym — 24-Hour Gym in DHA Phase 6, Karachi' },
};

const d = (ms: number) => ({ ['--reveal-delay' as string]: `${ms}ms` });

export default function HomePage() {
  const featured = facilities.slice(0, 4);

  return (
    <>
      <Hero />

      <Marquee items={['Strength', 'Discipline', 'Focus', 'Power', 'Consistency', 'Intensity']} />

      {/* ── Intro ───────────────────────────────────────────── */}
      <section id="intro" aria-labelledby="intro-title" className="relative bg-bone py-24 text-void sm:py-32 lg:py-40">
        <div className="frame grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow index="01" tone="dark">
              The philosophy
            </Eyebrow>
            <h2 id="intro-title" data-reveal className="display-lg mt-10">
              Train with
              <span className="text-outline-dark block">purpose.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5">
            <p data-reveal style={d(100)} className="text-xl leading-relaxed text-void/80 sm:text-2xl sm:leading-snug">
              Carnage is not a place you pass through. It&rsquo;s where you come to do the work — deliberately,
              consistently, and without compromise.
            </p>
            <p data-reveal style={d(200)} className="mt-6 max-w-md leading-relaxed text-void/60">
              Open around the clock six days a week in Ittehad Commercial Area, DHA Phase 6, Carnage Gym is built for
              people who take their training seriously — whatever time their day begins.
            </p>
            <div data-reveal style={d(300)} className="mt-10">
              <Button href="/about" variant="text" tone="dark">
                Our story
              </Button>
            </div>
          </div>
        </div>

        {/* Asymmetric image pair */}
        <div className="frame mt-20 grid grid-cols-12 gap-4 sm:mt-28 sm:gap-6">
          <figure className="relative col-span-12 aspect-[4/3] sm:col-span-7 sm:aspect-[16/11]" data-reveal="image">
            <Photo image={images.lifter} sizes="(min-width: 640px) 58vw, 100vw" />
          </figure>
          <div className="col-span-12 flex flex-col justify-between gap-6 sm:col-span-5">
            <figure className="relative aspect-[4/5] w-full sm:ml-auto sm:mt-24 sm:w-4/5" data-reveal="image" style={d(150)}>
              <Photo image={images.chalk} sizes="(min-width: 640px) 33vw, 100vw" />
            </figure>
            <p className="label text-void/50 sm:text-right">
              Karachi · DHA Phase 6 <span className="mx-2">/</span> Ittehad Commercial
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured facilities ─────────────────────────────── */}
      <section aria-labelledby="facilities-title" className="relative bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame">
          <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow index="02">Featured facilities</Eyebrow>
              <h2 id="facilities-title" data-reveal className="display-lg mt-10 text-chalk">
                Where the
                <span className="block">work happens.</span>
              </h2>
            </div>
            <div data-reveal style={d(150)} className="max-w-sm">
              <p className="lede">Dedicated space for every discipline — from heavy compound lifts to conditioning.</p>
              <div className="mt-8">
                <Button href="/facilities" variant="outline">
                  View facilities
                </Button>
              </div>
            </div>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-6">
            {featured.map((f, i) => {
              const layout = [
                'lg:col-span-7 aspect-[4/5] sm:aspect-[4/5] lg:aspect-[16/12]',
                'lg:col-span-5 aspect-[4/5] lg:mt-24',
                'lg:col-span-5 aspect-[4/5] lg:-mt-24',
                'lg:col-span-7 aspect-[4/5] sm:aspect-[4/5] lg:aspect-[16/12]',
              ][i];
              return (
                <li key={f.slug} className={`group relative overflow-hidden ${layout}`} data-reveal="image" style={d(i * 90)}>
                  <Link href={`/facilities#${f.slug}`} className="absolute inset-0 block focus-visible:outline-offset-[-6px]">
                    <Photo
                      image={f.image}
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                      imgClassName="transition-transform duration-[1.6s] ease-expo group-hover:scale-105"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
                    <span className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8">
                      <span className="label text-chalk">{f.index}</span>
                      <span className="flex h-11 w-11 items-center justify-center border border-white/30 text-chalk transition-all duration-500 ease-expo group-hover:border-chalk group-hover:bg-chalk group-hover:text-void">
                        <Icon name="arrowUpRight" />
                      </span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <span className="label block text-fog">{f.kicker}</span>
                      <span className="mt-3 block font-display text-4xl uppercase leading-none text-chalk sm:text-5xl">
                        {f.title}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── Training environment ────────────────────────────── */}
      <section aria-labelledby="environment-title" className="grain relative flex min-h-[92svh] items-center overflow-hidden bg-void py-28">
        <div className="absolute inset-0">
          <Photo image={images.interior} sizes="100vw" className="opacity-60" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-void/20" />
        <div className="frame relative grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow index="03">Training environment</Eyebrow>
            <h2 id="environment-title" data-reveal className="display-lg mt-10 text-chalk">
              No noise.
              <span className="block">No shortcuts.</span>
              <span className="text-outline block">Just the work.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p data-reveal style={d(150)} className="lede">
              A focused, disciplined space where effort is the standard. Walk in, get to work, and leave better than you
              arrived — whether it&rsquo;s 6 AM or 2 AM.
            </p>
            <dl data-reveal style={d(250)} className="mt-12 grid grid-cols-2 border-t border-white/15">
              <div className="border-r border-white/15 py-6 pr-6">
                <dt className="label text-ash">Hours a day</dt>
                <dd className="mt-3 font-display text-6xl text-chalk">24</dd>
              </div>
              <div className="py-6 pl-6">
                <dt className="label text-ash">Days a week</dt>
                <dd className="mt-3 font-display text-6xl text-chalk">6</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── Why Carnage ─────────────────────────────────────── */}
      <section aria-labelledby="why-title" className="relative bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow index="04">Why Carnage</Eyebrow>
              <h2 id="why-title" data-reveal className="display-lg mt-10 text-chalk">
                Made for
                <span className="block">those who</span>
                <span className="text-outline block">show up.</span>
              </h2>
              <figure data-reveal="image" style={d(150)} className="relative mt-12 hidden aspect-[4/3] lg:block">
                <Photo image={images.focus} sizes="40vw" />
              </figure>
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {pillars.map((p, i) => (
              <li
                key={p.index}
                data-reveal
                style={d(i * 80)}
                className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-white/10 py-10 last:border-b sm:grid-cols-[5rem_1fr] sm:py-12"
              >
                <span className="label pt-3 text-ash transition-colors group-hover:text-chalk">{p.index}</span>
                <div>
                  <h3 className="font-display text-4xl uppercase text-chalk sm:text-5xl">{p.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-fog">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Opening hours ───────────────────────────────────── */}
      <section aria-labelledby="hours-title" className="relative overflow-hidden bg-bone py-24 text-void sm:py-32 lg:py-40">
        <div className="frame grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Eyebrow index="05" tone="dark">
              Opening hours
            </Eyebrow>
            <h2 id="hours-title" className="sr-only">
              Opening hours
            </h2>
            <p data-reveal aria-hidden="true" className="mt-10 font-display text-[clamp(8rem,30vw,22rem)] uppercase leading-[0.8] tracking-tight">
              24<span className="text-outline-dark">/6</span>
            </p>
            <OpenStatus tone="dark" className="mt-10 text-void" />
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p data-reveal className="font-display text-4xl uppercase leading-none sm:text-5xl">
              Monday – Saturday
              <span className="block text-void/40">Open 24 hours</span>
            </p>
            <p data-reveal style={d(100)} className="mt-8 font-display text-4xl uppercase leading-none sm:text-5xl">
              Sunday
              <span className="block text-void/40">Closed</span>
            </p>
            <div data-reveal style={d(200)} className="mt-12">
              <Button href="/hours" variant="outline" tone="dark">
                Full schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Location preview ────────────────────────────────── */}
      <section aria-labelledby="location-title" className="relative bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame">
          <Eyebrow index="06">Location</Eyebrow>
          <div className="mt-10 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 id="location-title" data-reveal className="display-md text-chalk">
                Ittehad Lane 3,
                <span className="block">DHA Phase 6.</span>
              </h2>
              <address data-reveal style={d(100)} className="mt-10 not-italic leading-relaxed text-fog">
                {site.address.building}, {site.address.street}
                <br />
                {site.address.area}
                <br />
                {site.address.districtLong}
                <br />
                {site.address.city} {site.address.postalCode}, {site.address.country}
              </address>
              <div data-reveal style={d(200)} className="mt-10 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                <Button href={maps.directions} icon="arrowUpRight">
                  Get directions
                </Button>
                <Button href={site.phone.href} variant="outline" icon="phone">
                  {site.phone.display}
                </Button>
              </div>
            </div>
            <div data-reveal="image" className="lg:col-span-7">
              <MapEmbed className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[480px]" />
            </div>
          </div>
        </div>
      </section>

      <CTASection title={['Your next rep', 'starts here.']} />
    </>
  );
}
