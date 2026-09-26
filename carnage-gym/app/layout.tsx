import type { Metadata, Viewport } from 'next';
import { Anton, Inter } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import RevealObserver from '@/components/RevealObserver';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/site';
import './globals.css';

const display = Anton({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-display' });
const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Carnage Gym — 24-Hour Gym in DHA Phase 6, Karachi',
    template: '%s | Carnage Gym Karachi',
  },
  description: site.description,
  applicationName: site.name,
  keywords: ['Carnage Gym', 'gym Karachi', 'DHA Phase 6 gym', 'Ittehad Commercial', '24 hour gym Karachi'],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_PK',
    title: 'Carnage Gym — 24-Hour Gym in DHA Phase 6, Karachi',
    description: site.description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is running (no-JS visitors see everything). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <JsonLd />
      </head>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
