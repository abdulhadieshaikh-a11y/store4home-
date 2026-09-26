import { Archivo, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import RevealObserver from '@/components/RevealObserver';

const display = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const title = 'Karachi Executive Gym | Premium Gym in Gulshan-e-Iqbal, Karachi';
const description =
  'Karachi Executive Gym is a premium gym in Block 10-A, Gulshan-e-Iqbal, Karachi. A professional, modern fitness environment for ladies and gents. Call or WhatsApp 0312 9090455.';

export const metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  applicationName: site.name,
  keywords: [
    'Karachi Executive Gym',
    'gym in Gulshan-e-Iqbal',
    'gym Karachi',
    'fitness Karachi',
    'ladies gym Karachi',
    'gents gym Karachi',
    'Block 10-A Gulshan-e-Iqbal',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    siteName: site.name,
    title,
    description,
    url: '/',
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
};

export const viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  '@id': `${site.url}/#gym`,
  name: site.name,
  description,
  url: site.url,
  telephone: site.phone.e164,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
  hasMap: site.maps.href,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: site.phone.e164,
    contactType: 'customer service',
    areaServed: 'Karachi',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
