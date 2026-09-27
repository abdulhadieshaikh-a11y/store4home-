import Art from '@/components/art/Art';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-iron-900 pb-20 pt-32">
      <div aria-hidden className="absolute inset-0 opacity-50">
        <Art name="plates" tone="dark" className="h-full w-full" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-iron-900/70" />
      <div className="frame relative text-center">
        <p className="font-label text-[0.72rem] uppercase tracking-wide2 text-ember-300">Error 404</p>
        <h1 className="display-xl mt-6 text-cream">
          Missed <span className="text-ember-400">rep.</span>
        </h1>
        <p className="lede mx-auto mt-6 max-w-md text-cream/75">That page isn’t on the rack. Let’s get you back to the gym floor.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 xs:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
