import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],
    qualities: [75],
    minimumCacheTTL: 31536000,
    localPatterns: [
      { pathname: '/uploads/**' },
      { pathname: '/images/**' },
      { pathname: '/api/news/media/**' },
      { pathname: '/api/gallery/media/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'sorgfaltbau.de',
          },
        ],
        destination: 'https://www.sorgfaltbau.de/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2037 23:55:55 GMT',
          },
        ],
      },
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2037 23:55:55 GMT',
          },
        ],
      },
      {
        source: '/llms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/markdown; charset=utf-8',
          },
        ],
      },
    ];
  },
  webpack(config) {
    config.cache = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
