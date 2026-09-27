import Art from '@/components/art/Art';
import HoursBoard from '@/components/sections/HoursBoard';
import CtaBand from '@/components/sections/CtaBand';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Opening Hours',
  description: 'Body Art Gym opening hours: Monday to Saturday, 8:00 AM to 1:00 AM. Sunday closed. BMCHS Sharafabad, Karachi.',
  path: '/hours',
});

const week = [
  { d: 'Monday', h: '8:00 AM — 1:00 AM' },
  { d: 'Tuesday', h: '8:00 AM — 1:00 AM' },
  { d: 'Wednesday', h: '8:00 AM — 1:00 AM' },
  { d: 'Thursday', h: '8:00 AM — 1:00 AM' },
  { d: 'Friday', h: '8:00 AM — 1:00 AM' },
  { d: 'Saturday', h: '8:00 AM — 1:00 AM' },
  { d: 'Sunday', h: 'Closed' },
];

export default function HoursPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-iron-900 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <div aria-hidden className="absolute inset-0 opacity-70">
          <Art name="barbell" tone="dark" className="h-full w-full" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-iron-900/80" />
        <div className="frame relative">
          <div className="fade-late [--d:150ms]">
            <HoursBoard headingLevel={1} />
          </div>
          <div className="fade-late mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row [--d:500ms]">
            <ButtonLink href={site.maps.directions} target="_blank" rel="noopener noreferrer">
              Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outline" arrow={false}>
              Call {site.phone.display}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="week-title" className="paper py-20 sm:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-label text-[0.72rem] uppercase tracking-wide2 text-ember-600">The week</p>
            <h2 id="week-title" className="display-md mt-4 text-iron-900">
              Six days on. One day off.
            </h2>
            <p className="mt-6 max-w-sm font-serif italic leading-relaxed text-iron-700">
              Morning sessions, lunch breaks, late nights — the floor is open from 8 in the morning until 1 at night, Monday through Saturday.
            </p>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Body Art Gym weekly opening hours</caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Hours</th>
                </tr>
              </thead>
              <tbody>
                {week.map((w, i) => (
                  <Reveal as="tr" key={w.d} delay={i * 50} className="border-b border-iron-900/20 first:border-t">
                    <th scope="row" className="py-4 pr-4 font-display text-2xl font-normal uppercase tracking-poster text-iron-900 sm:text-3xl">
                      {w.d}
                    </th>
                    <td className={`py-4 text-right font-label text-sm uppercase tracking-label sm:text-base ${w.h === 'Closed' ? 'text-ember-600' : 'text-iron-800'}`}>
                      {w.h}
                    </td>
                  </Reveal>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-sm text-iron-600">Sessions that start on Saturday run until 1:00 AM on Sunday morning. Times are Pakistan Standard Time.</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
