import type {Metadata} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {ArrowRight, Check, ChevronRight, Phone} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {locales} from '@/i18n/config';
import {COMPANY_PRIMARY_PHONE} from '@/lib/contact';
import {getAbsoluteUrl, getLocalizedAlternates} from '@/lib/site';
import {getBreadcrumbSchema, getServiceSchema} from '@/lib/seo';
import {
  SERVICE_SLUGS,
  getServiceBySlug,
  type ServiceLocaleContent,
} from '@/lib/services';

type Params = Promise<{locale: string; slug: string}>;

const UI = {
  de: {
    home: 'Startseite',
    services: 'Leistungen',
    included: 'Das gehört dazu',
    faqTitle: 'Häufige Fragen',
    relatedTitle: 'Weitere Leistungen',
    ctaTitle: 'Ihr Vorhaben in Halle (Saale)?',
    ctaText:
      'Beschreiben Sie kurz, worum es geht, oder senden Sie Fotos. Wir nennen den sinnvollen nächsten Schritt – erste Einschätzung, Besichtigung oder Angebot.',
    primaryCta: 'Kostenlose Beratung anfragen',
    callCta: 'Anrufen',
  },
  ru: {
    home: 'Главная',
    services: 'Услуги',
    included: 'Что входит',
    faqTitle: 'Частые вопросы',
    relatedTitle: 'Другие услуги',
    ctaTitle: 'Ваш проект в Halle (Saale)?',
    ctaText:
      'Коротко опишите задачу или пришлите фото. Назовём разумный следующий шаг — первичная оценка, осмотр или смета.',
    primaryCta: 'Бесплатная консультация',
    callCta: 'Позвонить',
  },
} as const;

function pickLocale(locale: string): 'de' | 'ru' {
  return locale === 'ru' ? 'ru' : 'de';
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({locale, slug}))
  );
}

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale, slug} = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const lang = pickLocale(locale);
  const c = service[lang];
  const path = `/services/${slug}`;

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: {
      canonical: getAbsoluteUrl(`/${locale}${path}`),
      languages: getLocalizedAlternates(path),
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      locale: lang === 'de' ? 'de_DE' : 'ru_RU',
      type: 'website',
      url: getAbsoluteUrl(`/${locale}${path}`),
      siteName: 'SorgfaltBau',
      images: [{url: service.image, width: 1200, height: 630, alt: c.title}],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.metaTitle,
      description: c.metaDescription,
      images: [service.image],
    },
    robots: {index: true, follow: true},
  };
}

export default async function ServiceDetailPage({params}: {params: Params}) {
  const {locale, slug} = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const lang = pickLocale(locale);
  const ui = UI[lang];
  const c: ServiceLocaleContent = service[lang];
  const path = `/services/${slug}`;
  const phoneHref = `tel:${COMPANY_PRIMARY_PHONE.replace(/\s+/g, '')}`;

  const related = service.related
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const jsonLd = [
    getServiceSchema({
      name: c.title,
      description: c.metaDescription,
      path: `/${locale}${path}`,
      serviceType: service.serviceType,
    }),
    getBreadcrumbSchema([
      {name: ui.home, path: `/${locale}`},
      {name: ui.services, path: `/${locale}/services`},
      {name: c.title, path: `/${locale}${path}`},
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {'@type': 'Answer', text: item.a},
      })),
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 sm:pt-28">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#061b2f] pb-14 pt-12 text-white sm:pb-20 sm:pt-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_50%,#0c314f_100%)]" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-accent/[0.16] blur-3xl" />
          <div className="absolute -right-20 bottom-12 h-80 w-80 rounded-full bg-white/[0.08] blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8">
            <div className="min-w-0">
              <nav
                aria-label="Breadcrumb"
                className="mb-7 flex flex-wrap items-center gap-2 text-sm text-slate-100/60"
              >
                <Link href={`/${locale}`} className="transition-colors hover:text-white">
                  {ui.home}
                </Link>
                <ChevronRight size={14} />
                <Link href={`/${locale}/services`} className="transition-colors hover:text-white">
                  {ui.services}
                </Link>
                <ChevronRight size={14} />
                <span className="text-slate-50/90">{c.title}</span>
              </nav>

              <h1 className="font-heading text-[2rem] leading-[1.05] sm:text-[3rem] md:text-[3.4rem]">
                {c.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100/82 sm:text-lg">
                {c.intro}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {ui.primaryCta}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12]"
                >
                  <Phone size={16} />
                  {ui.callCta}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/14 shadow-[0_30px_80px_rgba(0,0,0,0.38)]">
                <Image
                  src={service.image}
                  alt={c.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
            <div className="min-w-0">
              {c.sections.map((section) => (
                <div key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="font-heading text-2xl text-anthracite-950 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-anthracite-600">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Included */}
            <aside className="lg:pt-2">
              <div className="rounded-3xl border border-anthracite-100 bg-anthracite-50 p-6 sm:p-8">
                <h2 className="font-heading text-xl text-anthracite-950">{ui.included}</h2>
                <ul className="mt-5 space-y-3">
                  {c.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-anthracite-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/12 text-brand-accent">
                        <Check size={13} strokeWidth={2.4} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {/* FAQ */}
          <div className="mt-16 border-t border-anthracite-100 pt-12 sm:mt-20">
            <h2 className="font-heading text-2xl text-anthracite-950 sm:text-3xl">{ui.faqTitle}</h2>
            <div className="mt-6 divide-y divide-anthracite-100 border-y border-anthracite-100">
              {c.faq.map((item) => (
                <details key={item.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-anthracite-900">
                    {item.q}
                    <ChevronRight
                      size={18}
                      className="shrink-0 text-brand-accent transition-transform duration-200 group-open:rotate-90"
                    />
                  </summary>
                  <p className="mt-3 text-base leading-8 text-anthracite-600">{item.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16 sm:mt-20">
              <h2 className="font-heading text-2xl text-anthracite-950 sm:text-3xl">{ui.relatedTitle}</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => {
                  const rc = r[lang];
                  return (
                    <Link
                      key={r.slug}
                      href={`/${locale}/services/${r.slug}`}
                      className="group overflow-hidden rounded-3xl border border-anthracite-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-xl"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={r.image}
                          alt={rc.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-heading text-lg text-anthracite-950">{rc.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-anthracite-500">{rc.short}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                          {ui.services}
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* CTA */}
        <section id="contact" className="relative overflow-hidden bg-[#061b2f] py-16 text-white sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_55%,#0c314f_100%)]" />
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-heading text-2xl sm:text-4xl">{ui.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-100/82">{ui.ctaText}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {ui.primaryCta}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/16 bg-white/[0.07] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12]"
              >
                <Phone size={16} />
                {COMPANY_PRIMARY_PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </>
  );
}
