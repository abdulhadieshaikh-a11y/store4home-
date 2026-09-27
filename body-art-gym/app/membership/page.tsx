import Emblem from '@/components/art/Emblem';
import ContactDetails from '@/components/sections/ContactDetails';
import EnquiryForm from '@/components/sections/EnquiryForm';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Typography';
import { enquiryInterests } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Membership & Enquiries',
  description:
    'Ready to train? Send an enquiry to Body Art Gym in BMCHS Sharafabad, Karachi — or call 0344 2886383. Open Monday to Saturday, 8 AM to 1 AM.',
  path: '/membership',
});

const steps = [
  { n: '01', t: 'Enquire', d: 'Send the form or call the front desk.' },
  { n: '02', t: 'Talk it through', d: 'Get membership options and details directly from the gym.' },
  { n: '03', t: 'Visit', d: 'Come in Monday to Saturday, 8 AM — 1 AM.' },
  { n: '04', t: 'Start training', d: 'Show up. Put in the work. Stay consistent.' },
];

export default function MembershipPage({ searchParams }: { searchParams: { interest?: string } }) {
  const requested = typeof searchParams.interest === 'string' ? searchParams.interest : '';
  const match = enquiryInterests.find((o) => o.toLowerCase().startsWith(requested.toLowerCase()) && requested.length > 2);
  const defaultInterest = match ?? '';

  return (
    <>
      <section className="relative isolate overflow-hidden bg-iron-900 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_15%_10%,rgba(196,84,28,0.22),transparent_70%)]" />
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -left-24 bottom-10 hidden w-[28rem] opacity-[0.06] lg:block">
          <Emblem tone="cream" decorative />
        </div>

        <div className="frame relative grid gap-14 pb-20 lg:grid-cols-12 lg:gap-12 lg:pb-28">
          <div className="lg:col-span-5">
            <Eyebrow className="fade-late [--d:100ms]">Membership · Enquire</Eyebrow>
            <h1 className="display-xl mt-6 text-cream">
              <span className="rise">
                <span style={{ ['--d' as string]: '150ms' }}>Ready</span>
              </span>
              <span className="rise">
                <span style={{ ['--d' as string]: '260ms' }}>to</span>
              </span>
              <span className="rise">
                <span className="text-ember-400" style={{ ['--d' as string]: '370ms' }}>
                  train?
                </span>
              </span>
            </h1>
            <p className="lede fade-late mt-8 max-w-md text-cream/80 [--d:600ms]">
              Tell us a little about yourself and what you’re after. Membership options and details are shared directly by the gym.
            </p>
            <div className="fade-late mt-12 hidden border-t border-cream/10 pt-10 [--d:750ms] lg:block">
              <ContactDetails showButtons={false} />
            </div>
          </div>

          <div className="fade-late lg:col-span-7 [--d:400ms]">
            <div className="paper keyline-dark relative p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] xs:p-8 sm:p-12">
              <div className="flex items-center justify-between gap-4 border-b border-iron-900/15 pb-6">
                <h2 className="display-sm text-iron-900">Enquiry form</h2>
                <span className="font-label text-[0.62rem] uppercase tracking-label text-iron-600">Body Art Gym · Karachi</span>
              </div>
              <div className="mt-8">
                <EnquiryForm defaultInterest={defaultInterest} />
              </div>
            </div>
            <div className="mt-14 border-t border-cream/10 pt-10 lg:hidden">
              <ContactDetails />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="relative overflow-hidden bg-iron-950 py-20 sm:py-28">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative">
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="steps-title" className="display-md mt-6 text-cream">
              Four steps to the gym floor.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-px bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 90} className="bg-iron-950 p-6 sm:p-8">
                <span className="text-outline-ember block font-display text-6xl leading-none">{s.n}</span>
                <h3 className="mt-5 font-display text-2xl uppercase tracking-poster text-cream">{s.t}</h3>
                <p className="mt-2 text-cream/65">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
