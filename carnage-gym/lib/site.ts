/**
 * Single source of truth for Carnage Gym business information.
 * Update details here and they propagate across every page, the footer,
 * SEO metadata and the structured data (JSON-LD).
 */

export const site = {
  name: 'Carnage Gym',
  shortName: 'CARNAGE',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.carnagegym.pk',
  description:
    'Carnage Gym is a 24-hour training facility in Ittehad Commercial Area, Phase 6, DHA, Karachi. Open Monday to Saturday, around the clock.',

  phone: {
    display: '0300 6652819',
    href: 'tel:+923006652819',
    international: '+92 300 6652819',
  },

  address: {
    building: 'Building No. 5-C',
    street: 'Ittehad Lane 3',
    area: 'Ittehad Commercial Area',
    district: 'Phase 6, DHA',
    districtLong: 'Phase 6, Defence Housing Authority',
    city: 'Karachi',
    postalCode: '75500',
    country: 'Pakistan',
    countryCode: 'PK',
  },

  hours: {
    // 0 = Sunday … 6 = Saturday
    openDays: [1, 2, 3, 4, 5, 6],
    summary: 'Mon – Sat: Open 24 Hours · Sunday: Closed',
  },

  /**
   * Social handles were not provided. Add a URL to `href` to turn a placeholder
   * into a live link — items with an empty href render as “coming soon”.
   */
  social: [
    { label: 'Instagram', href: '' },
    { label: 'Facebook', href: '' },
    { label: 'TikTok', href: '' },
  ] as { label: 'Instagram' | 'Facebook' | 'TikTok'; href: string }[],
} as const;

export const addressOneLine = `${site.address.building}, ${site.address.street}, ${site.address.area}, ${site.address.district}, ${site.address.city} ${site.address.postalCode}, ${site.address.country}`;

const mapsQuery = encodeURIComponent(
  `Carnage Gym, ${site.address.building}, ${site.address.street}, ${site.address.area}, DHA Phase 6, Karachi`,
);

export const maps = {
  embed: `https://www.google.com/maps?q=${mapsQuery}&z=16&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  view: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Membership', href: '/membership' },
  { label: 'Hours', href: '/hours' },
  { label: 'Contact', href: '/contact' },
] as const;

export const days = [
  { key: 1, short: 'Mon', long: 'Monday' },
  { key: 2, short: 'Tue', long: 'Tuesday' },
  { key: 3, short: 'Wed', long: 'Wednesday' },
  { key: 4, short: 'Thu', long: 'Thursday' },
  { key: 5, short: 'Fri', long: 'Friday' },
  { key: 6, short: 'Sat', long: 'Saturday' },
  { key: 0, short: 'Sun', long: 'Sunday' },
] as const;
