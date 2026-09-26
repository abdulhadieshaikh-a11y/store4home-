import { site } from '@/lib/site';

/** LocalBusiness (HealthClub) structured data for search engines. */
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: site.name,
    url: site.url,
    telephone: site.phone.international,
    description: site.description,
    image: `${site.url}/opengraph-image`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.building}, ${site.address.street}, ${site.address.area}`,
      addressLocality: site.address.city,
      addressRegion: 'Sindh',
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: 'DHA Phase 6, Karachi',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
