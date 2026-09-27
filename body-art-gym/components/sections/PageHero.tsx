import type { ReactNode } from 'react';
import type { ArtName, ArtTone } from '@/components/art/Art';
import Visual from '@/components/ui/Visual';
import { Eyebrow } from '@/components/ui/Typography';

/** Interior page hero: poster headline on the left, framed plate on the right. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  art,
  tone = 'dark',
  image,
  alt,
  plate,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  art: ArtName;
  tone?: ArtTone;
  image?: string;
  alt: string;
  plate: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-iron-900 pt-32 sm:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(196,84,28,0.18),transparent_70%)]" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="frame relative grid items-end gap-12 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Eyebrow className="fade-late [--d:100ms]">{eyebrow}</Eyebrow>
          <h1 className="display-lg mt-6 text-cream">{title}</h1>
          <div className="lede fade-late mt-8 max-w-xl text-cream/80 [--d:500ms]">{intro}</div>
          {children ? <div className="fade-late mt-10 flex flex-col gap-3 xs:flex-row [--d:650ms]">{children}</div> : null}
        </div>
        <div className="fade-late lg:col-span-5 [--d:300ms]">
          <div className="keyline relative mx-auto max-w-md bg-iron-950 p-2 lg:max-w-none">
            <Visual art={art} tone={tone} image={image} alt={alt} priority className="aspect-[4/5] w-full" />
            <div className="flex items-center justify-between px-2 pb-1 pt-3 font-label text-[0.62rem] uppercase tracking-label text-cream/50">
              <span>{plate}</span>
              <span>Body Art Gym · Karachi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
