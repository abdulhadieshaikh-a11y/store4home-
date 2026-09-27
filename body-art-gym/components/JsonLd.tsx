import { site } from '@/lib/site';

export function gymJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${site.url}/#gym`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.tel,
    image: `${site.url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: `${site.address.area}, ${site.address.city}`,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    hasMap: site.maps.view,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '01:00',
      },
    ],
    areaServed: { '@type': 'City', name: 'Karachi' },
  };
}

export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
