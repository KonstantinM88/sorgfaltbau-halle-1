import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
  webpack(config) {
    config.cache = false;
    return config;
  },
};

export default withNextIntl(nextConfig);
