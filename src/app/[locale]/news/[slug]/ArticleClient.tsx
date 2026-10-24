// src/app/[locale]/news/[slug]/ArticleClient.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getSiteUrl } from '@/lib/site';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Share2,
  Phone,
  Clock,
} from 'lucide-react';

type Props = {
  locale: string;
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string | null;
  coverWidth: number;
  coverHeight: number;
  publishedAt: string;
  slug: string;
};

const t = {
  de: {
    back: 'Alle Neuigkeiten',
    share: 'Teilen',
    readTime: (m: number) => `${m} Min. Lesezeit`,
    ctaTitle: 'Interesse geweckt?',
    ctaButton: 'Kostenlose Beratung',
    renovationLead: 'Wenn Sie die Umsetzung nicht selbst koordinieren möchten, unterstützt SorgfaltBau Sie bei der',
    renovationAnchor: 'professionellen Wohnungsrenovierung in Halle',
    renovationTail: '– von der Besichtigung bis zur abgestimmten Übergabe.',
    pavingLead: 'Wenn Sie Einfahrt, Hof oder Wege professionell umsetzen lassen möchten, finden Sie weitere Informationen zu unseren',
    pavingAnchor: 'Pflasterarbeiten in Halle',
    pavingTail: '.',
    bathroomLead: 'Wenn Sie die Arbeiten nicht selbst koordinieren möchten, finden Sie weitere Informationen zu unserer',
    bathroomAnchor: 'Badsanierung in Halle',
    bathroomTail: '.',
    facadeLead: 'Wenn Sie Putz, Anstrich oder Dämmung umsetzen lassen möchten, finden Sie Leistungsumfang und Anfrage auf unserer Seite zur',
    facadeAnchor: 'Fassadensanierung in Halle',
    drywallLead: 'Für die Ausführung von Wänden, Decken und Verkleidungen erfahren Sie mehr über unseren',
    drywallAnchor: 'Trockenbau in Halle',
    flooringLead: 'Für die fachgerechte Umsetzung finden Sie weitere Informationen zu',
    flooringAnchor: 'Bodenbelägen und Bodenverlegung in Halle',
  },
  ru: {
    back: 'Все новости',
    share: 'Поделиться',
    readTime: (m: number) => `${m} мин. чтения`,
    ctaTitle: 'Заинтересовались?',
    ctaButton: 'Бесплатная консультация',
    renovationLead: 'Если вы не хотите самостоятельно координировать все этапы, SorgfaltBau выполнит',
    renovationAnchor: 'профессиональный ремонт квартиры в Halle',
    renovationTail: '— от осмотра до согласованной передачи результата.',
    pavingLead: 'Если вы хотите профессионально выполнить въезд, двор или дорожки, подробнее об услуге читайте на странице',
    pavingAnchor: 'укладки брусчатки в Halle',
    pavingTail: '.',
    bathroomLead: 'Если вы не хотите самостоятельно координировать все этапы, подробнее об услуге читайте на странице',
    bathroomAnchor: 'ремонта ванной в Halle',
    bathroomTail: '.',
    facadeLead: 'Если планируете ремонт штукатурки, покраску или утепление, объём работ и способ обращения описаны на странице',
    facadeAnchor: 'ремонта фасада в Halle',
    drywallLead: 'Об устройстве стен, потолков и обшивок подробнее читайте на странице',
    drywallAnchor: 'гипсокартонных работ в Halle',
    flooringLead: 'Подробнее о подготовке основания и укладке читайте на странице',
    flooringAnchor: 'напольных покрытий в Halle',
  },
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function estimateReadTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Smart content renderer.
 * Supports:
 *  - Single \n as paragraph break
 *  - ## and ### headings
 *  - Short standalone lines as subheadings (bold, no period at end)
 *  - * or – or - bullet lists (grouped into <ul>)
 *  - Regular paragraphs with proper spacing
 */
type ContextualLink = {
  afterHeading: string;
  lead: string;
  anchor: string;
  tail: string;
  href: string;
};

function renderContent(text: string, contextualLinks: ContextualLink[] = []) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;
  const renderedLinks = new Set<ContextualLink>();

  const renderContextualLink = (heading: string) => {
    for (const contextualLink of contextualLinks) {
      if (renderedLinks.has(contextualLink) || !heading.includes(contextualLink.afterHeading)) continue;
      elements.push(
      <p key={key++} className="mb-5 mt-4 text-anthracite-600 leading-[1.8]">
        {contextualLink.lead}{' '}
        <Link
          href={contextualLink.href}
          className="font-semibold text-brand-orange underline decoration-brand-orange/30 underline-offset-4 transition-colors hover:text-brand-orange-dark"
        >
          {contextualLink.anchor}
        </Link>
        {contextualLink.tail}
      </p>,
      );
      renderedLinks.add(contextualLink);
    }
  };

  const isListLine = (line: string) => /^\s*[*\u2013\u2014-]\s/.test(line);
  const isHeading2 = (line: string) => line.startsWith('## ');
  const isHeading3 = (line: string) => line.startsWith('### ');
  const isSubheading = (line: string) => {
    const t = line.trim();
    // Short line (≤80 chars), doesn't end with period/comma, not a list, not empty
    return t.length > 0 && t.length <= 80 && !/[.,;]$/.test(t) && !isListLine(line) && !isHeading2(line) && !isHeading3(line);
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) { i++; continue; }

    // ### Heading
    if (isHeading3(line)) {
      const heading = line.slice(4);
      elements.push(
        <h3 key={key++} className="text-lg sm:text-xl font-heading font-bold text-anthracite-900 mt-8 mb-3">
          {heading}
        </h3>
      );
      renderContextualLink(heading);
      i++;
      continue;
    }

    // ## Heading
    if (isHeading2(line)) {
      const heading = line.slice(3);
      elements.push(
        <h2 key={key++} className="text-xl sm:text-2xl font-heading font-bold text-anthracite-900 mt-10 mb-4">
          {heading}
        </h2>
      );
      renderContextualLink(heading);
      i++;
      continue;
    }

    // Collect consecutive list items into a single <ul>
    if (isListLine(lines[i])) {
      const items: string[] = [];
      while (i < lines.length && isListLine(lines[i])) {
        items.push(lines[i].trim().replace(/^\s*[*\u2013\u2014-]\s*/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-5 space-y-3 pl-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-4 text-anthracite-600 leading-[1.8]">
              <span className="mt-[11px] h-2 w-2 flex-shrink-0 rounded-full bg-brand-orange" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Check if this short line is a subheading (followed by text or list)
    if (isSubheading(line)) {
      const nextIdx = i + 1;
      const nextLine = nextIdx < lines.length ? lines[nextIdx].trim() : '';
      // It's a subheading if next line is non-empty content (paragraph or list)
      if (nextLine && !isSubheading(nextLine)) {
        elements.push(
          <h3 key={key++} className="text-lg sm:text-xl font-heading font-bold text-anthracite-900 mt-10 mb-3">
            {line}
          </h3>
        );
        renderContextualLink(line);
        i++;
        continue;
      }
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-anthracite-600 leading-[1.8] mb-5">
        {line}
      </p>
    );
    i++;
  }

  return elements;
}

export default function ArticleClient({
  locale,
  title,
  excerpt,
  content,
  coverUrl,
  coverWidth,
  coverHeight,
  publishedAt,
  slug,
}: Props) {
  const isRu = locale === 'ru';
  const tx = isRu ? t.ru : t.de;
  const readTime = estimateReadTime(content);
  const siteUrl = getSiteUrl();
  const isRenovationGuide =
    slug === 'wohnung-renovieren-in-halle-trockenbau-malerarbeiten-bodenverlegung';
  const service = (serviceSlug: string) => `/${locale}/services/${serviceSlug}`;
  const renovationLink = (afterHeading: string): ContextualLink => ({
    afterHeading,
    lead: tx.renovationLead,
    anchor: tx.renovationAnchor,
    tail: tx.renovationTail,
    href: service('wohnungsrenovierung-halle'),
  });
  const pavingLink = (afterHeading: string): ContextualLink => ({
    afterHeading,
    lead: tx.pavingLead,
    anchor: tx.pavingAnchor,
    tail: tx.pavingTail,
    href: service('pflasterarbeiten-halle'),
  });
  const facadeLink = (afterHeading: string): ContextualLink => ({
    afterHeading,
    lead: tx.facadeLead,
    anchor: tx.facadeAnchor,
    tail: '.',
    href: service('fassadendaemmung-halle'),
  });
  const flooringLink = (afterHeading: string): ContextualLink => ({
    afterHeading,
    lead: tx.flooringLead,
    anchor: tx.flooringAnchor,
    tail: '.',
    href: service('bodenbelaege-halle'),
  });

  // Ссылки на услуги по slug статьи; afterHeading должен совпадать с заголовком в тексте из админки.
  const contextualLinksBySlug: Record<string, ContextualLink[]> = {
    'fassadensanierung-aussenanlagen-in-halle-fassade-einfahrt-terrasse': [
      pavingLink(isRu ? 'Въезд во двор:' : 'Einfahrt pflastern:'),
      facadeLink(isRu ? 'Ремонт фасада в Halle' : 'Fassadensanierung in Halle:'),
    ],
    'badsanierung-halle-kosten-ablauf-dauer': [{
      afterHeading: isRu
        ? 'Сколько стоит ремонт ванной в Halle?'
        : 'Was kostet eine Badsanierung in Halle?',
      lead: tx.bathroomLead,
      anchor: tx.bathroomAnchor,
      tail: tx.bathroomTail,
      href: service('badsanierung-halle'),
    }],
    'wohnung-renovieren-in-halle-trockenbau-malerarbeiten-bodenverlegung': [
      {
        afterHeading: isRu ? 'Гипсокартонные работы в Halle' : 'Trockenbau in Halle:',
        lead: tx.drywallLead,
        anchor: tx.drywallAnchor,
        tail: '.',
        href: service('trockenbau-halle'),
      },
      flooringLink(isRu ? 'Укладка ламината и напольных покрытий' : 'Bodenverlegung und Laminatverlegung'),
    ],
    'einfahrt-pflastern-in-halle-unterbau-gefaelle-entwaesserung-und-kosten': [
      pavingLink(isRu ? 'Как мы работаем с въездом в Halle' : 'So gehen wir bei einer Einfahrt in Halle vor'),
    ],
    'risse-in-der-fassade-ursachen-dringlichkeit-und-sanierung-in-halle': [
      facadeLink(isRu ? 'Ремонт фасада в Halle с SorgfaltBau' : 'Fassadensanierung in Halle mit SorgfaltBau'),
    ],
    'entkernung-und-baureinigung-in-halle-ablauf-entsorgung-und-kosten': [
      renovationLink(isRu ? 'Что происходит после демонтажа' : 'Wie es nach der Entkernung weitergeht'),
    ],
    'wohnung-vor-neuvermietung-renovieren-in-halle-checkliste-fuer-vermieter': [
      flooringLink(isRu ? 'Полы' : 'Böden'),
      renovationLink(isRu ? 'Ремонт между арендаторами под ключ' : 'Renovierung zwischen zwei Mietern koordinieren lassen'),
    ],
  };
  const contextualLinks = contextualLinksBySlug[slug] ?? [];

  const shareUrl = typeof window !== 'undefined'
    ? window.location.href
    : `${siteUrl}/${locale}/news/${slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* ═══════ COVER ═══════ */}
      {coverUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6"
        >
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
            <Image
              src={coverUrl}
              alt={title}
              width={coverWidth || 1200}
              height={coverHeight || 630}
              className="w-full h-auto object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* ═══════ ARTICLE ═══════ */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Back link */}
        <Link
          href={`/${locale}/news`}
          className="inline-flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-brand-orange transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          {tx.back}
        </Link>

        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center gap-4 mb-5"
        >
          <span className="inline-flex items-center gap-1.5 text-sm text-anthracite-400">
            <Calendar className="h-4 w-4 text-brand-orange" />
            {formatDate(publishedAt, locale)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm text-anthracite-400">
            <Clock className="h-4 w-4 text-brand-orange" />
            {tx.readTime(readTime)}
          </span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-brand-orange transition-colors"
          >
            <Share2 className="h-4 w-4" />
            {tx.share}
          </button>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-3xl sm:text-4xl md:text-5xl text-anthracite-900 leading-tight mb-5"
        >
          {title}
        </motion.h1>

        {/* Excerpt */}
        {excerpt && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-anthracite-500 leading-relaxed mb-8 border-l-4 border-brand-orange/30 pl-4"
          >
            {excerpt}
          </motion.p>
        )}

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-anthracite-200/60 to-transparent mb-8" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-[17px] leading-relaxed"
        >
          {renderContent(content, contextualLinks)}

          {isRenovationGuide && (
            <p className="mb-5 mt-8 text-anthracite-600 leading-[1.8]">
              {tx.renovationLead}{' '}
              <Link
                href={`/${locale}/services/wohnungsrenovierung-halle`}
                className="font-semibold text-brand-orange underline decoration-brand-orange/30 underline-offset-4 transition-colors hover:text-brand-orange-dark"
              >
                {tx.renovationAnchor}
              </Link>{' '}
              {tx.renovationTail}
            </p>
          )}

        </motion.div>

        {/* Bottom divider */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-anthracite-200/60 to-transparent" />

        {/* CTA inline */}
        <div className="mt-10 rounded-2xl bg-anthracite-50 border border-anthracite-100 p-6 sm:p-8 text-center">
          <h3 className="font-heading text-xl sm:text-2xl text-anthracite-900 mb-3">
            {tx.ctaTitle}
          </h3>
          <a
            href={`/${locale}#contact`}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-brand-orange/20"
          >
            <Phone className="w-4 h-4" />
            {tx.ctaButton}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Back link bottom */}
        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-brand-orange transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {tx.back}
          </Link>
        </div>
      </article>
    </main>
  );
}



//-----делаю больше отсттупы 
// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   ArrowLeft,
//   Calendar,
//   ChevronRight,
//   Share2,
//   Phone,
//   Clock,
// } from 'lucide-react';

// type Props = {
//   locale: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   coverUrl: string | null;
//   coverWidth: number;
//   coverHeight: number;
//   publishedAt: string;
//   slug: string;
// };

// const t = {
//   de: {
//     back: 'Alle Neuigkeiten',
//     share: 'Teilen',
//     readTime: (m: number) => `${m} Min. Lesezeit`,
//     ctaTitle: 'Interesse geweckt?',
//     ctaButton: 'Kostenlose Beratung',
//   },
//   ru: {
//     back: 'Все новости',
//     share: 'Поделиться',
//     readTime: (m: number) => `${m} мин. чтения`,
//     ctaTitle: 'Заинтересовались?',
//     ctaButton: 'Бесплатная консультация',
//   },
// };

// function formatDate(dateStr: string, locale: string) {
//   return new Date(dateStr).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'de-DE', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });
// }

// function estimateReadTime(text: string): number {
//   const words = text.split(/\s+/).length;
//   return Math.max(1, Math.round(words / 200));
// }

// /**
//  * Smart content renderer.
//  * Supports:
//  *  - Single \n as paragraph break
//  *  - ## and ### headings
//  *  - Short standalone lines as subheadings (bold, no period at end)
//  *  - * or – or - bullet lists (grouped into <ul>)
//  *  - Regular paragraphs with proper spacing
//  */
// function renderContent(text: string) {
//   const lines = text.split('\n');
//   const elements: React.ReactNode[] = [];
//   let i = 0;
//   let key = 0;

//   const isListLine = (line: string) => /^\s*[*\u2013\u2014-]\s/.test(line);
//   const isHeading2 = (line: string) => line.startsWith('## ');
//   const isHeading3 = (line: string) => line.startsWith('### ');
//   const isSubheading = (line: string) => {
//     const t = line.trim();
//     // Short line (≤80 chars), doesn't end with period/comma, not a list, not empty
//     return t.length > 0 && t.length <= 80 && !/[.,;]$/.test(t) && !isListLine(line) && !isHeading2(line) && !isHeading3(line);
//   };

//   while (i < lines.length) {
//     const line = lines[i].trim();

//     // Skip empty lines
//     if (!line) { i++; continue; }

//     // ### Heading
//     if (isHeading3(line)) {
//       elements.push(
//         <h3 key={key++} className="text-lg sm:text-xl font-heading font-bold text-anthracite-900 mt-8 mb-3">
//           {line.slice(4)}
//         </h3>
//       );
//       i++;
//       continue;
//     }

//     // ## Heading
//     if (isHeading2(line)) {
//       elements.push(
//         <h2 key={key++} className="text-xl sm:text-2xl font-heading font-bold text-anthracite-900 mt-10 mb-4">
//           {line.slice(3)}
//         </h2>
//       );
//       i++;
//       continue;
//     }

//     // Collect consecutive list items into a single <ul>
//     if (isListLine(lines[i])) {
//       const items: string[] = [];
//       while (i < lines.length && isListLine(lines[i])) {
//         items.push(lines[i].trim().replace(/^\s*[*\u2013\u2014-]\s*/, ''));
//         i++;
//       }
//       elements.push(
//         <ul key={key++} className="my-5 space-y-2.5 pl-1">
//           {items.map((item, j) => (
//             <li key={j} className="flex items-start gap-3 text-anthracite-600 leading-relaxed">
//               <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
//               <span>{item}</span>
//             </li>
//           ))}
//         </ul>
//       );
//       continue;
//     }

//     // Check if this short line is a subheading (followed by text or list)
//     if (isSubheading(line)) {
//       const nextIdx = i + 1;
//       const nextLine = nextIdx < lines.length ? lines[nextIdx].trim() : '';
//       // It's a subheading if next line is non-empty content (paragraph or list)
//       if (nextLine && !isSubheading(nextLine)) {
//         elements.push(
//           <h3 key={key++} className="text-lg sm:text-xl font-heading font-bold text-anthracite-900 mt-10 mb-3">
//             {line}
//           </h3>
//         );
//         i++;
//         continue;
//       }
//     }

//     // Regular paragraph
//     elements.push(
//       <p key={key++} className="text-anthracite-600 leading-[1.8] mb-5">
//         {line}
//       </p>
//     );
//     i++;
//   }

//   return elements;
// }

// export default function ArticleClient({
//   locale,
//   title,
//   excerpt,
//   content,
//   coverUrl,
//   coverWidth,
//   coverHeight,
//   publishedAt,
//   slug,
// }: Props) {
//   const isRu = locale === 'ru';
//   const tx = isRu ? t.ru : t.de;
//   const readTime = estimateReadTime(content);

//   const shareUrl = typeof window !== 'undefined'
//     ? window.location.href
//     : `https://www.sorgfaltbau.de/${locale}/news/${slug}`;

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({ title, url: shareUrl });
//       } catch { /* cancelled */ }
//     } else {
//       await navigator.clipboard.writeText(shareUrl);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-white pt-20">
//       {/* ═══════ COVER ═══════ */}
//       {coverUrl && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6"
//         >
//           <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
//             <Image
//               src={coverUrl}
//               alt={title}
//               width={coverWidth || 1200}
//               height={coverHeight || 630}
//               className="w-full h-auto object-cover"
//               sizes="(max-width: 1024px) 100vw, 1024px"
//               priority
//             />
//           </div>
//         </motion.div>
//       )}

//       {/* ═══════ ARTICLE ═══════ */}
//       <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
//         {/* Back link */}
//         <Link
//           href={`/${locale}/news`}
//           className="inline-flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-brand-orange transition-colors mb-8 group"
//         >
//           <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
//           {tx.back}
//         </Link>

//         {/* Meta */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-wrap items-center gap-4 mb-5"
//         >
//           <span className="inline-flex items-center gap-1.5 text-sm text-anthracite-400">
//             <Calendar className="h-4 w-4 text-brand-orange" />
//             {formatDate(publishedAt, locale)}
//           </span>
//           <span className="inline-flex items-center gap-1.5 text-sm text-anthracite-400">
//             <Clock className="h-4 w-4 text-brand-orange" />
//             {tx.readTime(readTime)}
//           </span>
//           <button
//             onClick={handleShare}
//             className="inline-flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-brand-orange transition-colors"
//           >
//             <Share2 className="h-4 w-4" />
//             {tx.share}
//           </button>
//         </motion.div>

//         {/* Title */}
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="font-heading text-3xl sm:text-4xl md:text-5xl text-anthracite-900 leading-tight mb-5"
//         >
//           {title}
//         </motion.h1>

//         {/* Excerpt */}
//         {excerpt && (
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-lg text-anthracite-500 leading-relaxed mb-8 border-l-4 border-brand-orange/30 pl-4"
//           >
//             {excerpt}
//           </motion.p>
//         )}

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-anthracite-200/60 to-transparent mb-8" />

//         {/* Content */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="text-base sm:text-[17px] leading-relaxed"
//         >
//           {renderContent(content)}
//         </motion.div>

//         {/* Bottom divider */}
//         <div className="mt-12 h-px bg-gradient-to-r from-transparent via-anthracite-200/60 to-transparent" />

//         {/* CTA inline */}
//         <div className="mt-10 rounded-2xl bg-anthracite-50 border border-anthracite-100 p-6 sm:p-8 text-center">
//           <h3 className="font-heading text-xl sm:text-2xl text-anthracite-900 mb-3">
//             {tx.ctaTitle}
//           </h3>
//           <a
//             href={`/${locale}#contact`}
//             className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold transition-all duration-300 shadow-lg shadow-brand-orange/20"
//           >
//             <Phone className="w-4 h-4" />
//             {tx.ctaButton}
//             <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
//           </a>
//         </div>

//         {/* Back link bottom */}
//         <div className="mt-8 text-center">
//           <Link
//             href={`/${locale}/news`}
//             className="inline-flex items-center gap-1.5 text-sm text-anthracite-400 hover:text-brand-orange transition-colors group"
//           >
//             <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
//             {tx.back}
//           </Link>
//         </div>
//       </article>
//     </main>
//   );
// }
