import type { SiteImage } from '@/lib/images';
import Photo from './Photo';

type Props = {
  index: string;
  eyebrow: string;
  title: string[];
  intro: string;
  image: SiteImage;
  children?: React.ReactNode;
  meta?: string[];
};

/** Cinematic header for inner pages — staggered line reveal over a graded photo. */
export default function PageHero({ index, eyebrow, title, intro, image, children, meta }: Props) {
  return (
    <section className="grain relative flex min-h-[88svh] items-end overflow-hidden bg-void pb-14 pt-36 sm:pb-20 lg:min-h-[92svh]">
      <div className="absolute inset-0 animate-ken-burns">
        <Photo image={image} sizes="100vw" priority quality={65} className="opacity-70" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/30" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-void/70 via-transparent to-transparent" />

      <div className="frame relative">
        <p className="label mb-8 flex animate-fade-in items-center gap-4 text-fog [animation-delay:200ms]">
          <span className="text-chalk">{index}</span>
          <span aria-hidden="true" className="h-px w-10 bg-white/30" />
          {eyebrow}
        </p>

        <h1 className="display-lg max-w-[14ch] text-chalk">
          {title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.04em]">
              <span className="block animate-line-up" style={{ animationDelay: `${250 + i * 110}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-12">
          <p className="lede animate-fade-up md:col-span-6 lg:col-span-5 [animation-delay:700ms]">{intro}</p>
          {children && (
            <div className="flex animate-fade-up flex-wrap items-start gap-4 md:col-span-6 md:justify-end lg:col-span-7 [animation-delay:850ms]">
              {children}
            </div>
          )}
        </div>

        {meta && (
          <ul className="label mt-10 flex animate-fade-in flex-wrap gap-x-8 gap-y-2 text-ash [animation-delay:1000ms]">
            {meta.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
