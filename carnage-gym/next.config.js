/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Remote photography is served straight from the Unsplash CDN, which resizes
    // and re-encodes on the fly. The custom loader builds a proper srcset for it.
    // Local images in /public are passed through untouched.
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
};

module.exports = nextConfig;
