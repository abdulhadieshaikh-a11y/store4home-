import type { ArtName } from '@/components/art/Art';

/**
 * EDITABLE CONTENT
 * ----------------------------------------------------------------------------
 * Programs and facility areas below are written around the training focus the
 * gym has confirmed — strength, bodybuilding, fitness and conditioning — and
 * deliberately avoid inventing timetables, prices, trainers or equipment lists.
 *
 * To publish real details, fill in `schedule` / `details` (or add new entries).
 * Anything left `null` renders as an elegant "on enquiry" state.
 *
 * `image` is optional: drop a photo into /public/images and set e.g.
 * image: '/images/strength.jpg'. Until then the vintage illustration is shown.
 */

export type Program = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  summary: string;
  description: string;
  schedule: string | null;
  details: string[] | null;
  art: ArtName;
  image?: string;
};

export const programs: Program[] = [
  {
    slug: 'strength',
    number: '01',
    title: 'Strength',
    kicker: 'The foundation',
    summary: 'Heavy, honest work with the barbell and dumbbells. Build the base everything else stands on.',
    description:
      'Strength is where every physique begins. Train the fundamentals with intent — controlled reps, progressive loads and patient, repeatable effort, session after session.',
    schedule: null,
    details: null,
    art: 'barbell',
  },
  {
    slug: 'bodybuilding',
    number: '02',
    title: 'Bodybuilding',
    kicker: 'The craft',
    summary: 'Classic, old-school physique training. Volume, focus and the mind–muscle connection.',
    description:
      'The golden-era approach: train each muscle with purpose, chase the pump, respect recovery and build a physique one session at a time.',
    schedule: null,
    details: null,
    art: 'arm',
  },
  {
    slug: 'fitness',
    number: '03',
    title: 'Fitness',
    kicker: 'The everyday',
    summary: 'Train to feel strong, move well and stay consistent — whatever your starting point.',
    description:
      'Not every goal is a stage. Build everyday strength and fitness in a focused environment that rewards showing up and putting in the work.',
    schedule: null,
    details: null,
    art: 'dumbbell',
  },
  {
    slug: 'conditioning',
    number: '04',
    title: 'Conditioning',
    kicker: 'The engine',
    summary: 'Work capacity, stamina and grit. The engine behind every heavy set.',
    description:
      'Conditioning builds the capacity to train harder and recover faster. Keep the engine running alongside your strength work.',
    schedule: null,
    details: null,
    art: 'kettlebell',
  },
];

export type Facility = {
  number: string;
  label: string;
  title: string;
  text: string;
  art: ArtName;
  image?: string;
};

export const facilities: Facility[] = [
  {
    number: '01',
    label: 'The Iron',
    title: 'Free weights',
    text: 'Barbells, plates and dumbbells — the tools of old-school training, at the heart of the gym.',
    art: 'rack',
  },
  {
    number: '02',
    label: 'The Floor',
    title: 'Training floor',
    text: 'Space to set up, lift with focus and move through your session without distraction.',
    art: 'barbell',
  },
  {
    number: '03',
    label: 'The Station',
    title: 'Strength area',
    text: 'Where heavy compound work happens. Set up, brace, and move serious weight.',
    art: 'bench',
  },
  {
    number: '04',
    label: 'The Plates',
    title: 'Loaded & ready',
    text: 'Iron racked and waiting. Load the bar, chalk up and get to work.',
    art: 'plates',
  },
];

export const principles = [
  { number: '01', title: 'Discipline', text: 'Show up on the hard days. Discipline is what carries you when motivation runs out.' },
  { number: '02', title: 'Consistency', text: 'Results are built rep by rep, week after week. There are no shortcuts on the gym floor.' },
  { number: '03', title: 'Strength', text: 'Train with intent and respect the iron. Strength earned is strength kept.' },
];

export const enquiryInterests = [
  'Membership',
  'Strength training',
  'Bodybuilding',
  'Fitness',
  'Conditioning',
  'Opening hours / visit',
  'Something else',
];

export const marqueeWords = [
  'Train hard',
  'Stay consistent',
  'Lift heavy',
  'Open till 1 AM',
  'Built the old-school way',
  'Karachi',
];
