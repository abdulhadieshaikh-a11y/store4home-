import { images } from '@/lib/images';
import { site } from '@/lib/site';
import Button from '../Button';
import Photo from '../Photo';
import OpenStatus from '../OpenStatus';

type Props = {
  /** Optional background film (e.g. '/video/hero.mp4'). The photo is used as poster & fallback. */
  videoSrc?: string;
};

const lines = ['Built for those', 'who train', 'without limits.'];

export default function Hero({ videoSrc }: Props) {
  return (
    <section
      aria-labelledby="hero-title"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-void"
    >
      {/* Media layer */}
      <div className="absolute inset-0 animate-ken-burns">
        <Photo image={images.hero} sizes="100vw" priority quality={70} className="opacity-80" />
        {videoSrc && (
          <video
            className="photo-mono absolute inset-0 h-full w-full object-cover opacity-80 motion-reduce:hidden"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/35 to-void" />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_60%,transparent_0%,rgba(5,5,5,0.55)_100%)]" />

      {/* Vertical side rail (desktop) */}
      <div
        aria-hidden="true"
        className="label absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-90 animate-fade-in whitespace-nowrap text-ash [animation-delay:1400ms] xl:block"
      >
        Karachi · Pakistan — 24.8° N
      </div>

      <div className="frame relative flex flex-1 flex-col justify-end pb-8 pt-28 sm:pb-10 lg:pt-36">
        <p className="label mb-8 flex animate-fade-in items-center gap-4 text-fog [animation-delay:300ms] sm:mb-10">
          <span className="h-px w-10 bg-white/40" aria-hidden="true" />
          Carnage Gym — DHA Phase 6, Karachi
        </p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(3.25rem,min(9.6vw,15.5svh),10.5rem)] leading-[0.86] text-chalk"
        >
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.03em] md:whitespace-nowrap">
              <span
                className={`block animate-line-up ${i === 1 ? 'text-outline' : ''}`}
                style={{ animationDelay: `${420 + i * 130}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p className="lede max-w-md animate-fade-up md:col-span-5 [animation-delay:950ms]">
            A 24-hour training ground in the heart of DHA. No shortcuts, no excuses — just the work, and the people who
            show up for it.
          </p>
          <div className="flex animate-fade-up flex-col gap-4 sm:flex-row md:col-span-7 md:justify-end [animation-delay:1100ms]">
            <Button href="/about">Explore Carnage</Button>
            <Button href="/contact" variant="outline">
              Get in touch
            </Button>
          </div>
        </div>

        {/* Bottom meta bar */}
        <div className="mt-10 grid animate-fade-in grid-cols-2 items-end gap-6 border-t border-white/15 pt-6 [animation-delay:1300ms] md:grid-cols-4">
          <a
            href="#intro"
            className="group col-span-2 hidden items-center gap-4 text-fog transition-colors hover:text-chalk md:col-span-1 md:flex"
            aria-label="Scroll to introduction"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-white/15" aria-hidden="true">
              <span className="absolute inset-0 animate-scroll-cue bg-chalk" />
            </span>
            <span className="label">Scroll</span>
          </a>
          <OpenStatus className="col-span-2 text-chalk md:col-span-1" showDetail={false} />
          <p className="label text-fog">
            <span className="block text-chalk">Mon – Sat</span>Open 24 Hours
          </p>
          <a href={site.phone.href} className="label text-fog transition-colors hover:text-chalk md:text-right">
            <span className="block text-chalk">Call</span>
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
