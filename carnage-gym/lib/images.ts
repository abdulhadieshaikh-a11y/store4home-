/**
 * Photography library.
 *
 * These are representative, high-quality training photographs served from the
 * Unsplash CDN (free to use under the Unsplash License). They are rendered in
 * monochrome by the <Photo> component to keep the black & white identity.
 *
 * To use Carnage Gym's own photography: drop files into /public/images and
 * replace a `src` below with e.g. '/images/training-floor.jpg'. Every page
 * reads from this file, so one edit updates the whole site.
 */

const u = (id: string) => `https://images.unsplash.com/${id}`;

export type SiteImage = { src: string; alt: string };

export const images = {
  hero: {
    src: u('photo-1534438327276-14e5300c3a48'),
    alt: 'Dark, moody gym floor lined with dumbbells and training equipment',
  },
  lifter: {
    src: u('photo-1517836357463-d25dfeac3438'),
    alt: 'Athlete gripping a loaded barbell under dramatic low light',
  },
  interior: {
    src: u('photo-1540497077202-7c8a3999166f'),
    alt: 'Wide view of a gym interior with rows of strength machines',
  },
  dumbbells: {
    src: u('photo-1593079831268-3381b0db4a77'),
    alt: 'Close-up of heavy dumbbells resting on a rack',
  },
  cable: {
    src: u('photo-1581009146145-b5ef050c2e1e'),
    alt: 'Athlete training on a cable machine with intense focus',
  },
  kettlebell: {
    src: u('photo-1583454110551-21f2fa2afe61'),
    alt: 'Athlete mid-set in a functional training session',
  },
  plates: {
    src: u('photo-1526506118085-60ce8714f8c5'),
    alt: 'Weight plates and strength equipment in a dark gym',
  },
  chalk: {
    src: u('photo-1532029837206-abbe2b7620e3'),
    alt: 'Athlete preparing for a heavy lift with chalked hands',
  },
  cardio: {
    src: u('photo-1576678927484-cc907957088c'),
    alt: 'Row of cardio machines in a modern gym',
  },
  rack: {
    src: u('photo-1605296867304-46d5465a13f1'),
    alt: 'Neat rack of dumbbells along a gym wall',
  },
  focus: {
    src: u('photo-1599058917212-d750089bc07e'),
    alt: 'Athlete standing in focus between sets',
  },
  floor: {
    src: u('photo-1571902943202-507ec2618e8f'),
    alt: 'Open training floor with equipment ready for use',
  },
} satisfies Record<string, SiteImage>;
