import { ButtonLink } from '@/components/ui/Button';
import { site } from '@/lib/site';

/** Address / phone / hours block, reused on Membership and Contact. */
export default function ContactDetails({ showButtons = true }: { showButtons?: boolean }) {
  return (
    <div className="text-cream">
      <dl className="grid gap-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="font-label text-[0.68rem] uppercase tracking-wide2 text-ember-300">Address</dt>
          <dd className="mt-3">
            <address className="not-italic leading-relaxed text-cream/85">
              <span className="block font-display text-2xl uppercase tracking-poster text-cream">{site.name}</span>
              {site.address.lines.map((l, i) => (
                <span key={l} className="block">
                  {l}
                  {i < site.address.lines.length - 1 ? ',' : ''}
                </span>
              ))}
            </address>
          </dd>
        </div>
        <div>
          <dt className="font-label text-[0.68rem] uppercase tracking-wide2 text-ember-300">Phone</dt>
          <dd className="mt-3">
            <a href={site.phone.href} className="font-display text-3xl tracking-poster transition-colors hover:text-ember-300">
              {site.phone.display}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-label text-[0.68rem] uppercase tracking-wide2 text-ember-300">Hours</dt>
          <dd className="mt-3 space-y-2 leading-snug">
            <p>
              <span className="block font-label text-[0.68rem] uppercase tracking-label text-cream/60">Monday — Saturday</span>
              <span className="font-display text-xl uppercase tracking-poster">8:00 AM — 1:00 AM</span>
            </p>
            <p>
              <span className="block font-label text-[0.68rem] uppercase tracking-label text-cream/60">Sunday</span>
              <span className="font-display text-xl uppercase tracking-poster">Closed</span>
            </p>
          </dd>
        </div>
      </dl>
      {showButtons ? (
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href={site.phone.href} arrow={false}>
            <span className="inline-flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2" />
              </svg>
              Call now
            </span>
          </ButtonLink>
          <ButtonLink href={site.maps.directions} target="_blank" rel="noopener noreferrer" variant="outline">
            Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
