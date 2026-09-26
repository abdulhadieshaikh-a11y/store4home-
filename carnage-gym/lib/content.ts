import { images, type SiteImage } from './images';

/**
 * Training zones shown on the Facilities page (and previewed on Home).
 *
 * These describe general training disciplines with representative imagery.
 * Confirm the exact equipment and zones with the gym and edit freely — add,
 * remove or reorder items; layouts adapt automatically.
 */
export type Facility = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  image: SiteImage;
};

export const facilities: Facility[] = [
  {
    slug: 'strength',
    index: '01',
    title: 'Strength Training',
    kicker: 'Load · Progress · Repeat',
    description:
      'The foundation of everything. Space and equipment for the compound lifts and heavy, progressive work that builds real strength.',
    image: images.lifter,
  },
  {
    slug: 'free-weights',
    index: '02',
    title: 'Free Weights',
    kicker: 'Iron, unfiltered',
    description:
      'Dumbbells and plates for the lifters who prefer to move weight freely — every angle, every range, every rep on your terms.',
    image: images.dumbbells,
  },
  {
    slug: 'cardio',
    index: '03',
    title: 'Cardio',
    kicker: 'Engine work',
    description:
      'Conditioning for endurance and recovery. Build the engine that carries you through every other session.',
    image: images.cardio,
  },
  {
    slug: 'functional',
    index: '04',
    title: 'Functional Training',
    kicker: 'Move with intent',
    description:
      'Athletic, full-body movement for power, mobility and control — training that carries over outside the gym.',
    image: images.kettlebell,
  },
  {
    slug: 'training-floor',
    index: '05',
    title: 'Training Floor',
    kicker: 'Room to work',
    description:
      'An open floor that gives you room to set up, warm up and push through your programme without compromise.',
    image: images.floor,
  },
  {
    slug: 'environment',
    index: '06',
    title: 'Gym Environment',
    kicker: 'Serious by design',
    description:
      'Focused, disciplined and open around the clock from Monday to Saturday — an atmosphere built for people who show up.',
    image: images.interior,
  },
];

/** Reasons grounded in verified facts: the hours, the location, the ethos. */
export const pillars = [
  {
    index: '01',
    title: 'Open 24 Hours',
    body: 'Monday to Saturday, the doors never close. Train before dawn, after a late shift or at midnight — your schedule, not ours.',
  },
  {
    index: '02',
    title: 'In the Heart of DHA',
    body: 'Located on Ittehad Lane 3 in Ittehad Commercial Area, Phase 6 — central, accessible and easy to build into your routine.',
  },
  {
    index: '03',
    title: 'Built for Serious Training',
    body: 'An environment designed around the work itself. No distractions, no gimmicks — just a place to get stronger.',
  },
  {
    index: '04',
    title: 'Discipline as Culture',
    body: 'Consistency beats intensity, and intensity beats excuses. Carnage is for people who respect both.',
  },
];

/**
 * Membership plans — PLACEHOLDERS.
 * No pricing has been provided, so no prices are displayed. When plans are
 * confirmed, fill in `name`, `price`, `period` and `features`, and set
 * `placeholder: false`. Placeholder cards render an “on enquiry” state.
 */
export type Plan = {
  id: string;
  label: string;
  name: string;
  price?: string;
  period?: string;
  summary: string;
  features: string[];
  featured?: boolean;
  placeholder: boolean;
};

export const plans: Plan[] = [
  {
    id: 'plan-1',
    label: 'Plan 01',
    name: 'Monthly',
    summary: 'Flexible access for those starting their Carnage journey.',
    features: ['Plan details to be confirmed', 'Pricing available on enquiry'],
    placeholder: true,
  },
  {
    id: 'plan-2',
    label: 'Plan 02',
    name: 'Quarterly',
    summary: 'For the committed — a longer block to build real momentum.',
    features: ['Plan details to be confirmed', 'Pricing available on enquiry'],
    featured: true,
    placeholder: true,
  },
  {
    id: 'plan-3',
    label: 'Plan 03',
    name: 'Annual',
    summary: 'A full year of training for those who are in it for good.',
    features: ['Plan details to be confirmed', 'Pricing available on enquiry'],
    placeholder: true,
  },
];

export const faqs = [
  {
    q: 'What are your opening hours?',
    a: 'Carnage Gym is open 24 hours a day from Monday to Saturday. We are closed on Sundays.',
  },
  {
    q: 'Where is Carnage Gym located?',
    a: 'Building No. 5-C, Ittehad Lane 3, Ittehad Commercial Area, Phase 6, DHA, Karachi 75500.',
  },
  {
    q: 'How do I find out about membership options and pricing?',
    a: 'Call us on 0300 6652819 or send an enquiry through the contact form and the team will share current membership details.',
  },
  {
    q: 'Can I visit before joining?',
    a: 'Get in touch by phone or through the enquiry form to arrange a time to see the gym in person.',
  },
];
