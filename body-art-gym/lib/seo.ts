import type { Metadata } from 'next';
import { site } from '@/lib/site';

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${site.name}`, description },
  };
}
