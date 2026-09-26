import { images, type SiteImage } from '@/lib/images';
import { site } from '@/lib/site';
import Button from './Button';
import Photo from './Photo';

type Props = {
  eyebrow?: string;
  title?: string[];
  body?: string;
  image?: SiteImage;
};

/** Closing call-to-action used at the foot of every page. */
export default function CTASection({
  eyebrow = 'Your move',
  title = ['The work', 'starts here.'],
  body = 'Call the gym or send an enquiry — the team will get back to you with everything you need to start training at Carnage.',
  image = images.plates,
}: Props) {
  return (
    <section className="grain relative overflow-hidden bg-void py-28 sm:py-36 lg:py-44">
      <div className="absolute inset-0">
        <Photo image={image} sizes="100vw" className="opacity-35" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />

      <div className="frame relative text-center">
        <p data-reveal className="label text-ash">
          {eyebrow}
        </p>
        <h2 data-reveal className="display-xl mx-auto mt-8 text-chalk" style={{ ['--reveal-delay' as string]: '100ms' }}>
          {title.map((t, i) => (
            <span key={t} className={`block ${i % 2 === 1 ? 'text-outline' : ''}`}>
              {t}
            </span>
          ))}
        </h2>
        <p data-reveal className="lede mx-auto mt-10 max-w-xl" style={{ ['--reveal-delay' as string]: '200ms' }}>
          {body}
        </p>
        <div
          data-reveal
          className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
          style={{ ['--reveal-delay' as string]: '300ms' }}
        >
          <Button href="/contact#enquire">Enquire now</Button>
          <Button href={site.phone.href} variant="outline" icon="phone" ariaLabel={`Call Carnage Gym on ${site.phone.display}`}>
            Call {site.phone.display}
          </Button>
        </div>
      </div>
    </section>
  );
}
