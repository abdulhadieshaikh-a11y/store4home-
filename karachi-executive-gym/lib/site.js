// Single source of truth for business facts. Only verified information lives here.

export const site = {
  name: 'Karachi Executive Gym',
  shortName: 'KEG',
  tagline: 'Premium Gym in Gulshan-e-Iqbal, Karachi',
  description:
    'Karachi Executive Gym is a premium, professional gym in Block 10-A, Gulshan-e-Iqbal, Karachi — a modern fitness environment for ladies and gents. Call or WhatsApp 0312 9090455 to learn more.',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  phone: {
    display: '0312 9090455',
    e164: '+923129090455',
    href: 'tel:+923129090455',
  },
  whatsapp: {
    href: 'https://wa.me/923129090455',
    withText: (text) => `https://wa.me/923129090455?text=${encodeURIComponent(text)}`,
    defaultMessage:
      'Hello Karachi Executive Gym, I would like to know more about membership and training options.',
  },
  address: {
    line1: 'Block 10-A, Block 10 A Gulshan-e-Iqbal',
    city: 'Karachi',
    postalCode: '75300',
    country: 'Pakistan',
    countryCode: 'PK',
    region: 'Sindh',
    full: 'Block 10-A, Block 10 A Gulshan-e-Iqbal, Karachi, 75300, Pakistan',
  },
  maps: {
    href: 'https://www.google.com/maps/search/?api=1&query=Karachi+Executive+Gym+Block+10-A+Gulshan-e-Iqbal+Karachi+75300',
    embed:
      'https://maps.google.com/maps?q=Karachi%20Executive%20Gym%2C%20Block%2010-A%2C%20Gulshan-e-Iqbal%2C%20Karachi%2075300&z=15&output=embed',
  },
};

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Training', href: '#training' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

// Photography. Swap any `src` for the gym's own photos (drop files in /public and use '/filename.jpg').
const u = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  hero: { src: u('photo-1534438327276-14e5300c3a48', 2400), alt: 'Dark, dramatically lit gym floor with dumbbells and training equipment' },
  about: { src: u('photo-1517836357463-d25dfeac3438'), alt: 'Athlete gripping a loaded barbell before a heavy lift' },
  aboutDetail: { src: u('photo-1605296867304-46d5465a13f1', 900), alt: 'Close-up of stacked iron weight plates' },
  strength: { src: u('photo-1581009146145-b5ef050c2e1e', 1200), alt: 'Man performing a dumbbell curl in a dark gym' },
  cardio: { src: u('photo-1576678927484-cc907957088c', 1200), alt: 'Row of treadmills in a modern gym' },
  functional: { src: u('photo-1541534741688-6078c6bfb5c5', 1200), alt: 'Athlete training with a kettlebell' },
  general: { src: u('photo-1571019613454-1cb2f99b2d8b', 1200), alt: 'Person training on gym equipment' },
  weight: { src: u('photo-1518611012118-696072aa579a', 1200), alt: 'Focused training session in a gym' },
  conditioning: { src: u('photo-1549060279-7e168fcee0c2', 1200), alt: 'Training bench and equipment on a gym floor' },
  floor: { src: u('photo-1540497077202-7c8a3999166f', 1800), alt: 'Spacious gym training floor with equipment' },
  strengthArea: { src: u('photo-1534367610401-9f5ed68180aa', 1200), alt: 'Weight rack in a strength training area' },
  cardioArea: { src: u('photo-1558611848-73f7eb4001a1', 1200), alt: 'Cardio machines lined up in a gym' },
  workoutSpace: { src: u('photo-1574680096145-d05b474e2155', 1200), alt: 'Open workout space for functional training' },
  environment: { src: u('photo-1593079831268-3381b0db4a77', 1200), alt: 'Moody, modern fitness environment' },
  ladies: { src: u('photo-1583454110551-21f2fa2afe61', 1400), alt: 'Woman strength training with dumbbells' },
  gents: { src: u('photo-1583454155184-870a1f63aebc', 1400), alt: 'Man strength training in a gym' },
  cta: { src: u('photo-1532029837206-abbe2b7620e3', 2000), alt: 'Athlete training in a dark gym' },
};
