import type {MetadataRoute} from 'next';
import {prisma} from '@/lib/prisma';
import {locales} from '@/i18n/config';
import {getSiteUrl} from '@/lib/site';
import {SERVICE_SLUGS} from '@/lib/services';

const STATIC_PATHS = [
  '',
  '/about',
  '/services',
  '/why-us',
  '/contact',
  '/news',
  '/galerie',
  '/impressum',
  '/datenschutz',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority:
        path === ''
          ? 1
          : path === '/news'
            ? 0.9
            : path === '/services'
              ? 0.85
              : 0.7,
    }))
  );

  // Посадочные страницы услуг /services/[slug]
  const serviceEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({
      url: `${baseUrl}/${locale}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  const articles = await prisma.newsArticle.findMany({
    where: {
      published: true,
      publishedAt: {lte: now},
    },
    select: {
      slug: true,
      updatedAt: true,
      publishedAt: true,
    },
    orderBy: {
      publishedAt: 'desc',
    },
  });

  const articleEntries: MetadataRoute.Sitemap = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/news/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...serviceEntries, ...articleEntries];
}
