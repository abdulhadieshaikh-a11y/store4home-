import Art from '@/components/art/Art';
import { ButtonLink } from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/lib/site';

export default function CtaBand({
  title = 'Ready to train?',
  text = 'Visit the gym, call the front desk, or send an enquiry — we’ll get back to you.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-ember-500 text-cream-50">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[46%] opacity-90 md:block">
        <Art name="kettlebell" tone="ember" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ember-500 via-ember-500/40 to-transparent" />
      </div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="frame relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-label text-[0.72rem] uppercase tracking-wide2 text-iron-900">Membership & enquiries</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="cta-title" className="display-lg mt-4 text-cream-50">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="lede mt-6 max-w-lg text-cream-50/90">{text}</p>
          </Reveal>
          <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/membership" variant="dark">
              Enquire now
            </ButtonLink>
            <ButtonLink href={site.phone.href} variant="outline" arrow={false} className="!border-cream-50/60">
              Call {site.phone.display}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
