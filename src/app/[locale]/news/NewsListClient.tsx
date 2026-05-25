// src/app/[locale]/news/NewsListClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Newspaper,
  ChevronRight,
  Phone,
} from 'lucide-react';

type Article = {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  excerpt: string;
  excerptRu: string;
  coverUrl: string | null;
  coverWidth: number;
  coverHeight: number;
  publishedAt: string;
};

type Props = {
  locale: string;
  articles: Article[];
};

const t = {
  de: {
    title: 'Neuigkeiten',
    subtitle: 'Aktuelles von SorgfaltBau',
    description: 'Tipps, Projektberichte und News aus der Welt des Bauens und Renovierens.',
    back: 'Startseite',
    readMore: 'Weiterlesen',
    noArticles: 'Noch keine Neuigkeiten vorhanden.',
    ctaTitle: 'Haben Sie ein Projekt?',
    ctaSubtitle: 'Kontaktieren Sie uns für eine kostenlose Beratung.',
    ctaButton: 'Kostenlose Beratung',
  },
  ru: {
    title: 'Новости',
    subtitle: 'Актуальное от SorgfaltBau',
    description: 'Советы, отчёты о проектах и новости из мира строительства и ремонта.',
    back: 'Главная',
    readMore: 'Подробнее',
    noArticles: 'Новостей пока нет.',
    ctaTitle: 'У вас есть проект?',
    ctaSubtitle: 'Свяжитесь с нами для бесплатной консультации.',
    ctaButton: 'Бесплатная консультация',
  },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function ArticleCard({
  article,
  locale,
  index,
}: {
  article: Article;
  locale: string;
  index: number;
}) {
  const isRu = locale === 'ru';
  const tx = isRu ? t.ru : t.de;
  const title = isRu ? (article.titleRu || article.title) : article.title;
  const excerpt = isRu ? (article.excerptRu || article.excerpt) : article.excerpt;
  const isFeatured = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      className={isFeatured ? 'col-span-full' : ''}
    >
      <Link
        href={`/${locale}/news/${article.slug}`}
        className={`group relative block overflow-hidden rounded-2xl border border-brand-orange/10 bg-white shadow-[0_18px_45px_rgba(7,31,53,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-[0_24px_64px_rgba(7,31,53,0.12)] ${
          isFeatured ? 'md:grid md:grid-cols-2 md:gap-0' : ''
        }`}
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Cover */}
        <div
          className={`relative overflow-hidden bg-[#eef4f8] ${
            isFeatured ? 'aspect-[16/9] md:aspect-auto md:min-h-[320px]' : 'aspect-[16/9]'
          }`}
        >
          {article.coverUrl ? (
            <Image
              src={article.coverUrl}
              alt={title}
              width={article.coverWidth || 1200}
              height={article.coverHeight || 630}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              sizes={isFeatured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Newspaper className="h-12 w-12 text-brand-orange/25" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-orange/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Date badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/[0.92] px-3 py-1.5 text-xs font-semibold text-brand-orange shadow-sm backdrop-blur-md">
              <Calendar className="h-3 w-3 text-brand-accent" />
              {formatDate(article.publishedAt, locale)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`relative p-5 sm:p-6 ${isFeatured ? 'flex flex-col justify-center' : ''}`}>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(7,31,53,0.045)_0%,transparent_45%,rgba(242,100,34,0.04)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <h2
            className={`relative font-heading text-brand-orange leading-tight transition-colors duration-300 group-hover:text-brand-accent ${
              isFeatured ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl'
            }`}
          >
            {title}
          </h2>
          {excerpt && (
            <p
              className={`relative mt-3 text-anthracite-600 leading-relaxed ${
                isFeatured ? 'text-sm sm:text-base line-clamp-4' : 'text-sm line-clamp-3'
              }`}
            >
              {excerpt}
            </p>
          )}
          <div className="relative mt-5 flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-all duration-300 group-hover:gap-2.5 group-hover:text-brand-accent">
            {tx.readMore}
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function NewsListClient({ locale, articles }: Props) {
  const isRu = locale === 'ru';
  const tx = isRu ? t.ru : t.de;

  return (
    <main className="min-h-screen bg-[#f7f9fb]">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-[#061b2f] pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_48%,#0c314f_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(242,100,34,0.14),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.09]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20 text-center">
          <a
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-brand-accent mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {tx.back}
          </a>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.095] backdrop-blur-sm px-4 py-2 text-xs font-semibold tracking-wider text-white/80 uppercase shadow-sm shadow-black/10">
              <Newspaper className="h-3.5 w-3.5 text-brand-accent" />
              {articles.length} {isRu ? 'статей' : 'Artikel'}
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-4 drop-shadow-[0_4px_20px_rgba(0,0,0,0.28)]"
          >
            {tx.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-brand-accent font-semibold text-lg sm:text-xl tracking-wide mb-3"
          >
            {tx.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-100/80 text-sm sm:text-base max-w-lg mx-auto leading-relaxed"
          >
            {tx.description}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 mx-auto w-20 h-1 bg-brand-accent rounded-full origin-center"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12">
            <path d="M0 48h1440V24C1240 4 960 0 720 0S200 4 0 24v24z" fill="#f7f9fb" />
          </svg>
        </div>
      </section>

      {/* ═══════ ARTICLES GRID ═══════ */}
      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7f9fb_0%,#ffffff_48%,#eef4f8_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="relative mx-auto max-w-6xl">
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} locale={locale} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-orange/10 bg-white/[0.86] py-24 text-center shadow-[0_18px_45px_rgba(7,31,53,0.07)] backdrop-blur">
              <Newspaper className="mx-auto mb-4 h-12 w-12 text-brand-orange/25" />
              <p className="text-anthracite-500 text-lg">{tx.noArticles}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#061b2f]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_50%,#0c314f_100%)]" />
        <div className="absolute inset-0 opacity-[0.08]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(242,100,34,0.16) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-tight mb-3">
            {tx.ctaTitle}
          </h2>
          <p className="text-slate-100/80 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            {tx.ctaSubtitle}
          </p>
          <a
            href={`/${locale}#contact`}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-brand-orange hover:bg-brand-accent hover:text-white font-semibold text-base transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone className="w-4 h-4" />
            {tx.ctaButton}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <div className="mt-14 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </section>
    </main>
  );
}
