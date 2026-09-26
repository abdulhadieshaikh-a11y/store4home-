import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { images } from '@/lib/site';
import Photo from './Photo';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-void"
      aria-labelledby="hero-title"
    >
      {/* Visual */}
      <div className="absolute inset-0 -z-10 animate-slow-zoom">
        <Photo
          src={images.hero.src}
          alt={images.hero.alt}
          priority
          sizes="100vw"
          className="h-full w-full"
          imgClassName="object-[62%_center] md:object-center"
        />
      </div>
      {/* Cinematic grading: keeps text readable on any photo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-void via-void/55 to-void/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-void/95 via-void/50 to-transparent md:from-void/90 md:via-void/40" />
      <div className="grain absolute inset-0 -z-10" />

      <div className="shell flex flex-1 flex-col justify-end pb-28 pt-32 sm:pb-32 md:justify-center md:pb-24 md:pt-40">
        <p
          className="mb-7 inline-flex w-fit animate-rise-in items-center gap-2.5 border border-white/15 bg-void/40 px-3.5 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-fog"
          style={{ animationDelay: '150ms' }}
        >
          <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          Gulshan-e-Iqbal, Karachi
        </p>

        <h1 id="hero-title" className="h-display text-[clamp(3.25rem,13vw,9.5rem)]">
          <span className="sr-only">Karachi Executive Gym — </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="block animate-rise-in" style={{ animationDelay: '250ms' }}>
              Train with
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <span className="block animate-rise-in text-accent" style={{ animationDelay: '380ms' }}>
              Purpose.
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div className="animate-rise-in" style={{ animationDelay: '560ms' }}>
            <p className="max-w-[34rem] text-pretty text-base leading-relaxed text-fog sm:text-lg">
              Elevate your fitness at Karachi Executive Gym — a modern, professional training
              environment for people who are serious about getting stronger, healthier and better.
            </p>
            <div className="mt-9 flex flex-col gap-3 xs:flex-row">
              <a href="#join" className="btn-primary">
                Join Now
                <ArrowUpRight className="btn-arrow h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#about" className="btn-ghost">
                Explore Gym
                <ArrowRight className="btn-arrow h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <p
            className="hidden animate-fade-in justify-self-end text-right text-[0.6875rem] font-medium uppercase leading-loose tracking-[0.28em] text-mist lg:block"
            style={{ animationDelay: '900ms' }}
          >
            Ladies &amp; Gents
            <br />
            Block 10-A · Karachi
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#stats"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-fade-in flex-col items-center gap-3 md:flex"
        style={{ animationDelay: '1200ms' }}
        aria-label="Scroll to learn more"
      >
        <span className="text-[0.625rem] font-medium uppercase tracking-[0.32em] text-mist">Scroll</span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 block h-1/2 animate-scroll-cue bg-accent" />
        </span>
      </a>
    </section>
  );
}
