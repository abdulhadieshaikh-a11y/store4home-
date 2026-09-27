import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Body Art Gym',
    short_name: 'Body Art',
    description: 'Old-school bodybuilding gym in BMCHS Sharafabad, Karachi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1E130D',
    theme_color: '#1E130D',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
