import type { Metadata } from 'next';
import { site } from './site';

/** Consistent per-page metadata: title, description, canonical and Open Graph. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: 'en_PK',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: `${title} | ${site.name}`, description },
  };
}
