import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Hammer,
  Home,
  MapPin,
  Paintbrush,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Services from '@/components/Services';
import ServiceAreaLocations from '@/components/ServiceAreaLocations';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { COMPANY_POSTAL_CODE, COMPANY_PRIMARY_PHONE, COMPANY_STREET_ADDRESS } from '@/lib/contact';
import { getAbsoluteUrl, getLocalizedAlternates, getSiteUrl } from '@/lib/site';

type Params = Promise<{ locale: string }>;

type ServicesPageCard = {
  title: string;
  text: string;
};

type ServicesPageStep = {
  title: string;
  text: string;
};

const focusIcons = [Home, Paintbrush, Hammer];
const executionIcons = [ClipboardList, Hammer, CheckCircle2];

const metaTitles: Record<string, string> = {
  de: 'Bau- und Renovierungsarbeiten in Halle (Saale) | SorgfaltBau',
  ru: 'Строительные и ремонтные работы в Halle (Saale) | SorgfaltBau',
};

const metaDescriptions: Record<string, string> = {
  de: 'SorgfaltBau übernimmt Bau- und Renovierungsarbeiten in Halle (Saale): Innenausbau, Trockenbau, Malerarbeiten, Bodenbeläge, Fassade, Dach, Pflaster- und Gartenarbeiten.',
  ru: 'SorgfaltBau выполняет строительные и ремонтные работы в Halle (Saale): отделку, гипсокартон, покраску, полы, фасады, кровлю, мощение и работы по участку.',
};

const servicesImageMobile = '/uploads/sorgfaltbau_services_banner_v2_mobile_1122x1402.webp';
const servicesImageTablet = '/uploads/sorgfaltbau_services_banner_v2_tablet_1122x701.webp';
const servicesImageDesktop = '/uploads/sorgfaltbau_services_banner_v2_desktop_1122x1309.webp';

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'de';
  const title = metaTitles[lang];
  const description = metaDescriptions[lang];
  const image = servicesImageDesktop;

  return {
    title,
    description,
    alternates: {
      canonical: getAbsoluteUrl(`/${lang}/services`),
      languages: getLocalizedAlternates('/services'),
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'de' ? 'de_DE' : 'ru_RU',
      url: getAbsoluteUrl(`/${lang}/services`),
      siteName: 'SorgfaltBau',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'de';
  const t = await getTranslations({ locale, namespace: 'servicesPage' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const faq = await getTranslations({ locale, namespace: 'faq' });
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${lang}/services`;
  const email = process.env.NEXT_PUBLIC_EMAIL || 'service@sorgfaltbau.de';
  const constructionItems = services.raw('construction.items') as string[];
  const gardenItems = services.raw('garden.items') as string[];
  const focuses = t.raw('focuses') as ServicesPageCard[];
  const executionSteps = t.raw('execution') as ServicesPageStep[];
  const seoParagraphs = t.raw('seoParagraphs') as string[];
  const heroHighlights = t.raw('hero.highlights') as string[];
  const locations = t.raw('serviceArea.locations') as string[];
  const faqItems = faq.raw('items') as Array<{ question: string; answer: string }>;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: metaTitles[lang],
      description: metaDescriptions[lang],
      url: pageUrl,
      inLanguage: lang,
      isPartOf: {
        '@type': 'WebSite',
        name: 'SorgfaltBau',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: lang === 'de' ? 'Startseite' : 'Главная',
          item: `${siteUrl}/${lang}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('hero.title'),
          item: pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: 'SorgfaltBau',
      url: siteUrl,
      image: `${siteUrl}${servicesImageDesktop}`,
      telephone: COMPANY_PRIMARY_PHONE,
      email,
      areaServed: locations,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_STREET_ADDRESS,
        postalCode: COMPANY_POSTAL_CODE,
        addressLocality: 'Halle (Saale)',
        addressRegion: 'Sachsen-Anhalt',
        addressCountry: 'DE',
      },
      description: metaDescriptions[lang],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: lang === 'de' ? 'Leistungen' : 'Услуги',
        itemListElement: [
          {
            '@type': 'OfferCatalog',
            name: services('construction.title'),
            itemListElement: constructionItems.map((item) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: item,
              },
            })),
          },
          {
            '@type': 'OfferCatalog',
            name: services('garden.title'),
            itemListElement: gardenItems.map((item) => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: item,
              },
            })),
          },
        ],
      },
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-24 sm:pt-28">
        <section className="relative overflow-hidden bg-[#061b2f] pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_50%,#0c314f_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-accent/[0.16] blur-3xl" />
          <div className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-white/[0.08] blur-3xl" />
          <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-2xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-100/62 sm:mb-10"
            >
              <Link href={`/${lang}`} className="transition-colors hover:text-white">
                {lang === 'de' ? 'Startseite' : 'Главная'}
              </Link>
              <ChevronRight size={14} />
              <span className="text-slate-50/90">{t('hero.eyebrow')}</span>
            </nav>

            <div className="grid min-w-0 grid-cols-1 gap-10 lg:gap-12 xl:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] xl:items-start">
              <div className="min-w-0 xl:max-w-[42rem]">
                <span className="inline-flex rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-sm shadow-black/10 backdrop-blur">
                  {t('hero.eyebrow')}
                </span>
                <h1 className="mt-5 w-full min-w-0 max-w-full break-words font-heading text-[2.05rem] leading-[0.98] tracking-normal drop-shadow-[0_3px_18px_rgba(0,0,0,0.26)] min-[360px]:text-[2.25rem] sm:max-w-[14ch] sm:text-[3.8rem] sm:leading-[0.96] md:text-[4.45rem] xl:max-w-full xl:text-[4.7rem] 2xl:text-[5.05rem]">
                  <span className="block hyphens-auto text-white [overflow-wrap:anywhere]">
                    {t('hero.titleStart')}
                  </span>
                  <span className="mt-1 block hyphens-auto text-brand-accent drop-shadow-[0_8px_26px_rgba(242,100,34,0.28)] [overflow-wrap:anywhere]">
                    {t('hero.titleAccent')}
                  </span>
                  <span className="mt-1 block hyphens-auto text-white/92 [overflow-wrap:anywhere]">
                    {t('hero.titleEnd')}
                  </span>
                </h1>
                <p className="mt-6 w-full min-w-0 max-w-full break-words text-base leading-8 text-slate-100/84 sm:max-w-2xl sm:text-lg">
                  {t('hero.lead')}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3" role="list">
                  {heroHighlights.map((item, index) => (
                    <AnimateOnScroll
                      key={`${item}-${index}`}
                      variant="fadeUp"
                      delay={index * 0.08}
                    >
                      <div
                        className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-white/14 bg-white/[0.08] px-4 py-3.5 text-sm leading-6 text-slate-50/88 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/45 hover:bg-white/[0.12] hover:shadow-xl hover:shadow-brand-accent/10 sm:px-5"
                        role="listitem"
                      >
                        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:translate-x-[460%] group-hover:opacity-100" />
                        <span className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-accent/35 bg-brand-accent/10 text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                          <CheckCircle2 size={14} strokeWidth={1.9} />
                        </span>
                        <span className="relative pr-8">{item}</span>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-heading text-4xl leading-none text-white/[0.055] transition-colors duration-300 group-hover:text-brand-accent/15">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>

                <AnimateOnScroll
                  className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
                  variant="fadeUp"
                  delay={0.1}
                >
                  <a
                    href="#contact"
                    className="group relative inline-flex overflow-hidden rounded-full bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-light hover:shadow-2xl hover:shadow-brand-accent/10"
                  >
                    <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/28 to-transparent opacity-0 blur-lg transition-all duration-700 group-hover:translate-x-[520%] group-hover:opacity-100" />
                    <span className="relative inline-flex items-center justify-center gap-2">
                      {t('hero.primaryCta')}
                      <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                  <Link
                    href={`/${lang}/contact`}
                    className="group relative inline-flex overflow-hidden rounded-full border border-white/16 bg-white/[0.07] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12] hover:shadow-xl hover:shadow-brand-accent/10"
                  >
                    <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 blur-lg transition-all duration-700 group-hover:translate-x-[520%] group-hover:opacity-100" />
                    <span className="relative">{t('hero.secondaryCta')}</span>
                  </Link>
                </AnimateOnScroll>
              </div>

              <div className="relative min-w-0">
                <div className="absolute -left-6 top-10 hidden h-40 w-40 rounded-full border border-white/[0.08] 2xl:block" />
                <div className="absolute -right-10 bottom-6 hidden h-48 w-48 rounded-full border border-brand-accent/[0.24] 2xl:block" />

                <div className="relative overflow-hidden rounded-[2.2rem] border border-white/16 bg-white/[0.07] shadow-[0_30px_80px_rgba(0,0,0,0.38)] backdrop-blur-sm">
                  <div className="relative aspect-[4/5] sm:aspect-[16/10] xl:aspect-[6/7]">
                    <Image
                      src={servicesImageMobile}
                      alt={t('hero.imageAlt')}
                      fill
                      priority
                      sizes="(max-width: 639px) calc(100vw - 2rem), 0px"
                      className="object-cover object-center sm:hidden"
                    />
                    <Image
                      src={servicesImageTablet}
                      alt={t('hero.imageAlt')}
                      fill
                      priority
                      sizes="(max-width: 1280px) 80vw, 0vw"
                      className="hidden object-cover object-center sm:block xl:hidden"
                    />
                    <Image
                      src={servicesImageDesktop}
                      alt={t('hero.imageAlt')}
                      fill
                      priority
                      sizes="(max-width: 1280px) 0vw, 42vw"
                      className="hidden object-cover object-center xl:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041524]/35 via-transparent to-[#041524]/10 sm:from-[#041524]/24" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-[#041524]/68 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent backdrop-blur-sm sm:left-6 sm:top-6 sm:text-[11px]">
                      {t('hero.imageTag')}
                    </div>

                  </div>
                </div>

                <div className="mt-4">
                  <div className="rounded-[1.6rem] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:grid sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-start sm:gap-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/72">
                      {t('hero.imageTitle')}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-50/84 sm:mt-0">
                      {t('hero.imageText')}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" />
                    <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
                      {services('construction.title')}
                    </p>
                    <p className="relative mt-3 text-sm leading-7 text-slate-50/78">
                      {t('catalogConstructionText')}
                    </p>
                  </div>
                  <div className="group relative overflow-hidden rounded-[1.6rem] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/[0.18] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                    <p className="relative text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
                      {services('garden.title')}
                    </p>
                    <p className="relative mt-3 text-sm leading-7 text-slate-50/72">
                      {t('catalogGardenText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f9fb] py-16 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_50%,#eef4f8_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16">
              <div>
                <h2 className="font-heading text-3xl text-anthracite-900 sm:text-4xl">
                  {t('intro.title')}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-anthracite-600">
                  <p>{t('intro.paragraph1')}</p>
                  <p>{t('intro.paragraph2')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {focuses.map((item, index) => {
                  const Icon = focusIcons[index] || Hammer;

                  return (
                    <article
                      key={item.title}
                      className={`group relative overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-6 shadow-lg shadow-brand-orange/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/25 hover:shadow-2xl hover:shadow-brand-orange/10 ${
                        index === focuses.length - 1 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
                      <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl leading-none text-brand-orange/[0.06] transition-colors duration-300 group-hover:text-brand-orange/[0.12]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <h3 className="relative mt-5 font-heading text-2xl text-anthracite-900">
                        {item.title}
                      </h3>
                      <p className="relative mt-3 text-sm leading-7 text-anthracite-600 sm:text-base">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Services
          headingTitle={t('catalogTitle')}
          headingIntro={t('catalogIntro')}
          sectionId="services-catalog"
        />

        <section className="relative overflow-hidden bg-[#061b2f] py-16 text-white sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_48%,#0c314f_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/18" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="font-heading text-3xl sm:text-4xl">
                {t('executionTitle')}
              </h2>
              <p className="mt-4 text-base leading-8 text-white/[0.74] sm:text-lg">
                {t('executionIntro')}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {executionSteps.map((item, index) => {
                const Icon = executionIcons[index] || ClipboardList;

                return (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-2xl border border-white/14 bg-white/[0.08] p-6 shadow-2xl shadow-black/[0.18] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-lg shadow-black/15 transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/[0.72] sm:text-base">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="service-area" className="relative overflow-hidden bg-white py-16 sm:py-24">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_52%,#edf4f8_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.038)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:58px_58px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/20 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1.12fr)_minmax(24rem,0.88fr)] xl:items-start xl:gap-12">
              <div className="min-w-0">
                <AnimateOnScroll variant="fadeUp" duration={0.55}>
                  <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-3 rounded-full border border-brand-orange/15 bg-white/82 px-4 py-2 text-sm font-semibold text-brand-orange shadow-lg shadow-brand-orange/[0.06] backdrop-blur-sm">
                      <MapPin size={16} />
                      <span>{String(locations.length).padStart(2, '0')}</span>
                    </div>
                    <h2 className="mt-5 font-heading text-3xl text-anthracite-900 sm:text-4xl">
                      {t('serviceArea.title')}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-anthracite-600 sm:text-lg">
                      {t('serviceArea.text')}
                    </p>
                  </div>
                </AnimateOnScroll>

                <ServiceAreaLocations locations={locations} />
              </div>

              <AnimateOnScroll variant="slideRight" delay={0.08} duration={0.65}>
                <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#061b2f] p-6 text-white shadow-[0_28px_72px_rgba(7,31,53,0.24)] sm:p-8">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_48%,#0d3858_100%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:58px_58px]" />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/80 to-transparent" />
                  <div className="relative">
                    <h2 className="font-heading text-3xl text-white sm:text-4xl">
                      {t('seoTitle')}
                    </h2>
                    <div className="mt-6 space-y-5 text-base leading-8 text-white/74">
                      {seoParagraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        <Testimonials />
        <Faq />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
