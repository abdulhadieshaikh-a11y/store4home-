import PageHero from '@/components/PageHero';
import Eyebrow from '@/components/Eyebrow';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import ContactForm from '@/components/ContactForm';
import MapEmbed from '@/components/MapEmbed';
import OpenStatus from '@/components/OpenStatus';
import SocialLinks from '@/components/SocialLinks';
import { images } from '@/lib/images';
import { maps, site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact Carnage Gym — Building No. 5-C, Ittehad Lane 3, Ittehad Commercial Area, Phase 6, DHA, Karachi. Call 0300 6652819. Open 24 hours Monday to Saturday.',
  path: '/contact',
});

const d = (ms: number) => ({ ['--reveal-delay' as string]: `${ms}ms` });

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Contact"
        title={['Get in', 'touch.']}
        intro="Call the gym, send an enquiry or come and find us on Ittehad Lane 3 — we're open 24 hours, Monday to Saturday."
        image={images.floor}
      >
        <Button href={site.phone.href} icon="phone" ariaLabel={`Call Carnage Gym on ${site.phone.display}`}>
          Call {site.phone.display}
        </Button>
        <Button href={maps.directions} variant="outline" icon="arrowUpRight">
          Get directions
        </Button>
      </PageHero>

      {/* ── Details + form ── */}
      <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-16 bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame grid gap-20 lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-4" aria-label="Contact details">
            <Eyebrow index="01">Carnage Gym</Eyebrow>

            <div className="mt-12 space-y-12">
              <div data-reveal>
                <h2 className="label flex items-center gap-3 font-sans text-ash">
                  <Icon name="phone" className="h-4 w-4" /> Phone
                </h2>
                <a
                  href={site.phone.href}
                  className="mt-4 block font-display text-5xl uppercase leading-none text-chalk transition-opacity hover:opacity-70"
                >
                  {site.phone.display}
                </a>
                <p className="mt-3 text-sm text-fog">Tap to call · {site.phone.international}</p>
              </div>

              <div data-reveal style={d(80)}>
                <h2 className="label flex items-center gap-3 font-sans text-ash">
                  <Icon name="pin" className="h-4 w-4" /> Address
                </h2>
                <address className="mt-4 not-italic leading-relaxed text-chalk">
                  {site.address.building},
                  <br />
                  {site.address.street},
                  <br />
                  {site.address.area},
                  <br />
                  {site.address.district},
                  <br />
                  {site.address.city}, {site.address.postalCode},
                  <br />
                  {site.address.country}
                </address>
                <a
                  href={maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label mt-5 inline-flex items-center gap-2 text-chalk hover:underline hover:underline-offset-4"
                >
                  Get directions <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
                </a>
              </div>

              <div data-reveal style={d(160)}>
                <h2 className="label flex items-center gap-3 font-sans text-ash">
                  <Icon name="clock" className="h-4 w-4" /> Opening hours
                </h2>
                <dl className="mt-4 space-y-2 text-chalk">
                  <div className="flex justify-between gap-6 border-b border-white/10 pb-2">
                    <dt>Monday – Saturday</dt>
                    <dd>24 Hours</dd>
                  </div>
                  <div className="flex justify-between gap-6 border-b border-white/10 pb-2">
                    <dt>Sunday</dt>
                    <dd className="text-ash">Closed</dd>
                  </div>
                </dl>
                <OpenStatus className="mt-5 text-chalk" />
              </div>

              <div data-reveal style={d(240)}>
                <h2 className="label font-sans text-ash">Follow</h2>
                <SocialLinks className="mt-4" />
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-white/10 pt-10 lg:border-t-0 lg:pt-0">
              <p className="label text-ash">02 — Send an enquiry</p>
              <h2 id="enquire-title" data-reveal className="display-md mt-8 text-chalk">
                Tell us what
                <span className="text-outline block">you&rsquo;re training for.</span>
              </h2>
              <div className="mt-14">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section aria-labelledby="map-title" className="bg-void pb-24 sm:pb-32">
        <div className="frame">
          <div className="flex flex-col gap-6 border-t border-white/10 pt-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label text-ash">03 — Find us</p>
              <h2 id="map-title" className="display-md mt-8 text-chalk">
                Ittehad Commercial, DHA Phase 6
              </h2>
            </div>
            <Button href={maps.view} variant="outline" icon="arrowUpRight">
              Open in Google Maps
            </Button>
          </div>
          <div data-reveal="image" className="mt-12">
            <MapEmbed className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[21/9]" />
          </div>
        </div>
      </section>
    </>
  );
}
