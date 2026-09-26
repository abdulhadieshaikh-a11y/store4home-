import PageHero from '@/components/PageHero';
import Eyebrow from '@/components/Eyebrow';
import Photo from '@/components/Photo';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import CTASection from '@/components/CTASection';
import { images } from '@/lib/images';
import { faqs, plans } from '@/lib/content';
import { site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Membership',
  description:
    'Enquire about membership at Carnage Gym, DHA Phase 6, Karachi. Contact the gym for current plans and pricing — open 24 hours, Monday to Saturday.',
  path: '/membership',
});

const d = (ms: number) => ({ ['--reveal-delay' as string]: `${ms}ms` });

const steps = [
  { n: '01', title: 'Enquire', body: 'Call the gym or send an enquiry through the website.' },
  { n: '02', title: 'Choose', body: 'Get current membership options and pick the plan that fits your training.' },
  { n: '03', title: 'Train', body: 'Start training — 24 hours a day, Monday to Saturday.' },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Membership"
        title={['Commit to', 'the work.']}
        intro="Membership at Carnage is simple: find the plan that fits your commitment and get to work. Contact the gym for current options and pricing."
        image={images.cable}
      >
        <Button href="/contact?enquiry=membership#enquire">Enquire about membership</Button>
        <Button href={site.phone.href} variant="outline" icon="phone">
          Contact Carnage
        </Button>
      </PageHero>

      {/* ── Plans (placeholders until confirmed) ── */}
      <section aria-labelledby="plans-title" className="bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow index="01">Plans</Eyebrow>
              <h2 id="plans-title" data-reveal className="display-lg mt-10 text-chalk">
                Choose your
                <span className="text-outline block">commitment.</span>
              </h2>
            </div>
            <p data-reveal style={d(100)} className="lede self-end lg:col-span-4 lg:col-start-9">
              Plan details and pricing are shared on enquiry, so you always get up-to-date information directly from the
              gym.
            </p>
          </div>

          <ul className="mt-16 grid gap-4 lg:grid-cols-3 lg:gap-6">
            {plans.map((plan, i) => {
              const featured = plan.featured;
              return (
                <li
                  key={plan.id}
                  data-reveal
                  style={d(i * 110)}
                  className={`group relative flex flex-col border p-8 transition-colors duration-500 sm:p-10 ${
                    featured
                      ? 'border-chalk bg-chalk text-void'
                      : 'border-white/15 bg-coal text-chalk hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`label ${featured ? 'text-void/60' : 'text-ash'}`}>{plan.label}</span>
                    {plan.placeholder && (
                      <span className={`label border px-2 py-1 text-[0.58rem] ${featured ? 'border-void/30' : 'border-white/20 text-ash'}`}>
                        Details soon
                      </span>
                    )}
                  </div>

                  <h3 className="mt-12 font-display text-5xl uppercase leading-none min-[380px]:text-6xl lg:text-5xl xl:text-6xl">{plan.name}</h3>
                  <p className={`mt-5 leading-relaxed ${featured ? 'text-void/70' : 'text-fog'}`}>{plan.summary}</p>

                  <div className={`mt-10 border-t pt-8 ${featured ? 'border-void/15' : 'border-white/10'}`}>
                    {plan.placeholder || !plan.price ? (
                      <p>
                        <span className="block font-display text-4xl uppercase">On enquiry</span>
                        <span className={`label mt-3 block ${featured ? 'text-void/55' : 'text-ash'}`}>
                          Contact the gym for pricing
                        </span>
                      </p>
                    ) : (
                      <p>
                        <span className="font-display text-5xl">{plan.price}</span>
                        {plan.period && <span className="label ml-2">/ {plan.period}</span>}
                      </p>
                    )}
                  </div>

                  <ul className={`mt-8 flex-1 space-y-3 text-sm ${featured ? 'text-void/75' : 'text-fog'}`}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Button
                      href={`/contact?enquiry=membership#enquire`}
                      variant={featured ? 'solid' : 'outline'}
                      tone={featured ? 'dark' : 'light'}
                      className="w-full justify-between"
                      ariaLabel={`Enquire about the ${plan.name} plan`}
                    >
                      Enquire now
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="label mt-8 text-ash/70">Plan names are indicative — final plans and pricing confirmed by Carnage Gym.</p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section aria-labelledby="steps-title" className="bg-bone py-24 text-void sm:py-32">
        <div className="frame">
          <Eyebrow index="02" tone="dark">
            How to join
          </Eyebrow>
          <h2 id="steps-title" data-reveal className="display-md mt-10">
            Three steps
            <span className="text-outline-dark block">to the floor.</span>
          </h2>
          <ol className="mt-16 grid border-t border-void/15 md:grid-cols-3">
            {steps.map((s, i) => (
              <li
                key={s.n}
                data-reveal
                style={d(i * 110)}
                className="border-b border-void/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-display text-8xl leading-none text-void/15">{s.n}</span>
                <h3 className="mt-6 font-display text-4xl uppercase">{s.title}</h3>
                <p className="mt-4 max-w-xs leading-relaxed text-void/70">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Enquiry band ── */}
      <section aria-labelledby="enquire-title" className="relative bg-void">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center py-24 sm:py-32">
            <div className="frame max-w-2xl lg:ml-auto lg:mr-0 lg:px-16 xl:px-24">
              <Eyebrow index="03">Talk to us</Eyebrow>
              <h2 id="enquire-title" data-reveal className="display-md mt-10 text-chalk">
                Questions?
                <span className="text-outline block">Just ask.</span>
              </h2>
              <p data-reveal style={d(100)} className="lede mt-8">
                The quickest way to get membership details is to call the gym directly — or leave your details and the
                team will get back to you.
              </p>
              <div data-reveal style={d(200)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/contact?enquiry=membership#enquire">Enquire about membership</Button>
                <Button href={site.phone.href} variant="outline" icon="phone">
                  {site.phone.display}
                </Button>
              </div>
            </div>
          </div>
          <figure data-reveal="image" className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[640px]">
            <Photo image={images.kettlebell} sizes="(min-width: 1024px) 50vw, 100vw" />
          </figure>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-labelledby="faq-title" className="bg-void py-24 sm:py-32 lg:py-40">
        <div className="frame grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="04">FAQ</Eyebrow>
            <h2 id="faq-title" data-reveal className="display-md mt-10 text-chalk">
              Good to know.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                data-reveal
                style={d(i * 70)}
                className="group border-t border-white/10 last:border-b [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-lg text-chalk transition-colors hover:text-fog sm:text-xl">
                  {f.q}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 transition-transform duration-500 ease-expo group-open:rotate-45">
                    <Icon name="plus" />
                  </span>
                </summary>
                <p className="max-w-xl pb-8 leading-relaxed text-fog">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection eyebrow="Start today" title={['No more', 'someday.']} image={images.floor} />
    </>
  );
}
