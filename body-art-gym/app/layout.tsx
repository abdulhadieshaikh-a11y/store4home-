import type { Metadata, Viewport } from 'next';
import { Anton, DM_Sans, Libre_Baskerville, Oswald } from 'next/font/google';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import JsonLd, { gymJsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';
import './globals.css';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-oswald', display: 'swap' });
const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-baskerville',
  display: 'swap',
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Body Art Gym — Old-School Bodybuilding Gym in BMCHS Sharafabad, Karachi',
    template: '%s | Body Art Gym Karachi',
  },
  description: site.description,
  applicationName: site.name,
  keywords: ['Body Art Gym', 'gym in Karachi', 'bodybuilding gym Karachi', 'BMCHS Sharafabad gym', 'CP & Berar Society'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: 'Body Art Gym — Built the old-school way',
    description: site.description,
  },
  twitter: { card: 'summary_large_image', title: 'Body Art Gym — Built the old-school way', description: site.description },
  formatDetection: { telephone: true, address: true },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1E130D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={`${anton.variable} ${oswald.variable} ${baskerville.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ember-500 focus:px-4 focus:py-3 focus:font-label focus:text-xs focus:uppercase focus:tracking-label focus:text-cream-50"
        >
          Skip to content
        </a>
        <JsonLd data={gymJsonLd()} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
