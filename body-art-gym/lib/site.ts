/**
 * Single source of truth for every verified business fact.
 * Edit here and the whole site (pages, footer, SEO, structured data) updates.
 */

export const site = {
  name: 'Body Art Gym',
  shortName: 'Body Art',
  tagline: 'Old-school bodybuilding. Modern digital experience.',
  description:
    'Body Art Gym is an old-school bodybuilding and strength training gym in CP & Berar Society, BMCHS, Sharafabad, Karachi. Open Monday to Saturday, 8:00 AM to 1:00 AM.',
  // Set NEXT_PUBLIC_SITE_URL to the real domain in production (used for canonical URLs, sitemap, Open Graph).
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')
  ).replace(/\/$/, ''),
  locale: 'en_PK',

  phone: {
    display: '0344 2886383',
    tel: '+923442886383',
    href: 'tel:+923442886383',
  },

  address: {
    plusCode: 'V3P8+JCQ',
    lines: ['V3P8+JCQ', 'CP & Berar Society', 'BMCHS', 'Sharafabad', 'Karachi', 'Pakistan'],
    street: 'V3P8+JCQ, CP & Berar Society, BMCHS',
    area: 'Sharafabad',
    city: 'Karachi',
    region: 'Sindh',
    country: 'Pakistan',
    countryCode: 'PK',
    oneLine: 'V3P8+JCQ, CP & Berar Society, BMCHS, Sharafabad, Karachi, Pakistan',
  },

  hours: [
    { days: 'Monday — Saturday', short: 'Mon — Sat', open: '8:00 AM', close: '1:00 AM', closed: false },
    { days: 'Sunday', short: 'Sunday', open: null, close: null, closed: true },
  ],

  maps: {
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=' +
      encodeURIComponent('V3P8+JCQ, CP & Berar Society, BMCHS, Sharafabad, Karachi, Pakistan'),
    view:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('V3P8+JCQ, Sharafabad, Karachi, Pakistan'),
    embed:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('V3P8+JCQ, Sharafabad, Karachi, Pakistan') +
      '&z=16&output=embed',
  },
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Training', href: '/training' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Programs', href: '/programs' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Training', href: '/training' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Programs', href: '/programs' },
  { label: 'Opening Hours', href: '/hours' },
  { label: 'Membership', href: '/membership' },
  { label: 'Contact', href: '/contact' },
];
