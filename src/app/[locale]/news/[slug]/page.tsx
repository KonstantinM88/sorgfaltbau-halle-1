// src/app/[locale]/news/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { COMPANY_POSTAL_CODE, COMPANY_STREET_ADDRESS } from '@/lib/contact';
import { getAbsoluteUrl, getLocalizedAlternates, getSiteUrl } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleClient from './ArticleClient';

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const isRu = locale === 'ru';
  const siteUrl = getSiteUrl();

  const article = await prisma.newsArticle.findUnique({
    where: { slug },
    select: {
      title: true,
      titleRu: true,
      excerpt: true,
      excerptRu: true,
      metaTitle: true,
      metaTitleRu: true,
      metaDesc: true,
      metaDescRu: true,
      coverUrl: true,
      published: true,
      publishedAt: true,
    },
  });

  if (
    !article ||
    (process.env.NODE_ENV === 'production' &&
      (!article.published || article.publishedAt > new Date()))
  ) {
    return { title: 'Not Found' };
  }

  const title = isRu
    ? (article.metaTitleRu || article.titleRu || article.title)
    : (article.metaTitle || article.title);
  const description = isRu
    ? (article.metaDescRu || article.excerptRu || article.excerpt)
    : (article.metaDesc || article.excerpt);
  const fullTitle = `${title} — SorgfaltBau`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/${locale}/news/${slug}`),
      languages: getLocalizedAlternates(`/news/${slug}`),
    },
    openGraph: {
      title: fullTitle,
      description,
      type: 'article',
      locale: isRu ? 'ru_RU' : 'de_DE',
      url: `${siteUrl}/${locale}/news/${slug}`,
      siteName: 'SorgfaltBau',
      ...(article.coverUrl
        ? {
            images: [
              {
                url: `${siteUrl}${article.coverUrl}`,
                width: 1200,
                height: 630,
                alt: title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate static slugs
export async function generateStaticParams() {
  const articles = await prisma.newsArticle.findMany({
    where: { published: true, publishedAt: { lte: new Date() } },
    select: { slug: true },
  });
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const isRu = locale === 'ru';
  const siteUrl = getSiteUrl();

  const article = await prisma.newsArticle.findUnique({
    where: { slug },
    select: {
      slug: true,
      title: true,
      titleRu: true,
      excerpt: true,
      excerptRu: true,
      content: true,
      contentRu: true,
      coverUrl: true,
      coverWidth: true,
      coverHeight: true,
      published: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  if (
    !article ||
    (process.env.NODE_ENV === 'production' &&
      (!article.published || article.publishedAt > new Date()))
  ) {
    notFound();
  }

  const title = isRu ? (article.titleRu || article.title) : article.title;
  const excerpt = isRu ? (article.excerptRu || article.excerpt) : article.excerpt;
  const content = isRu ? (article.contentRu || article.content) : article.content;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    url: `${siteUrl}/${locale}/news/${slug}`,
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    inLanguage: isRu ? 'ru' : 'de',
    ...(article.coverUrl
      ? {
          image: {
            '@type': 'ImageObject',
            url: `${siteUrl}${article.coverUrl}`,
            width: article.coverWidth,
            height: article.coverHeight,
          },
        }
      : {}),
    author: {
      '@type': 'Organization',
      name: 'SorgfaltBau',
      url: siteUrl,
    },
    publisher: {
      '@type': 'HomeAndConstructionBusiness',
      name: 'SorgfaltBau',
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_STREET_ADDRESS,
        postalCode: COMPANY_POSTAL_CODE,
        addressLocality: 'Halle (Saale)',
        addressRegion: 'Sachsen-Anhalt',
        addressCountry: 'DE',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/${locale}/news/${slug}`,
    },
  };

  return (
    <>
      <Header />
      <ArticleClient
        locale={locale}
        title={title}
        excerpt={excerpt}
        content={content}
        coverUrl={article.coverUrl}
        coverWidth={article.coverWidth}
        coverHeight={article.coverHeight}
        publishedAt={article.publishedAt.toISOString()}
        slug={slug}
      />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
