import ContactDetails from '@/components/sections/ContactDetails';
import EnquiryForm from '@/components/sections/EnquiryForm';
import MapEmbed from '@/components/sections/MapEmbed';
import Reveal from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Typography';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Body Art Gym: V3P8+JCQ, CP & Berar Society, BMCHS, Sharafabad, Karachi. Call 0344 2886383. Open Monday to Saturday, 8 AM to 1 AM.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-iron-900 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(196,84,28,0.2),transparent_70%)]" />
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />
        <div className="frame relative pb-20 sm:pb-28">
          <Eyebrow className="fade-late [--d:100ms]">Contact</Eyebrow>
          <h1 className="display-xl mt-6 text-cream">
            <span className="rise">
              <span style={{ ['--d' as string]: '150ms' }}>Find the</span>
            </span>
            <span className="rise">
              <span className="text-ember-400" style={{ ['--d' as string]: '280ms' }}>
                iron.
              </span>
            </span>
          </h1>

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="fade-late lg:col-span-5 [--d:450ms]">
              <ContactDetails />
            </div>
            <div className="fade-late lg:col-span-7 [--d:600ms]">
              <MapEmbed />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-form-title" className="paper py-20 sm:py-28">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="iron" className="!text-ember-600">
                Send a message
              </Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="contact-form-title" className="display-md mt-6 text-iron-900">
                Questions? Ask away.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-sm font-serif italic leading-relaxed text-iron-700">
                Membership, training, hours or anything else — drop us a line and the team will get back to you.
              </p>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-8">
            <EnquiryForm defaultInterest="Something else" submitLabel="Send message" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
