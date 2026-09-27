import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/training', '/facilities', '/programs', '/membership', '/hours', '/contact'];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
