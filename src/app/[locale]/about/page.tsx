import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Hammer,
  Home,
  MapPin,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';
import { COMPANY_POSTAL_CODE, COMPANY_PRIMARY_PHONE, COMPANY_STREET_ADDRESS } from '@/lib/contact';
import { getSiteUrl } from '@/lib/site';

type Params = Promise<{ locale: string }>;

type AboutPageSectionItem = {
  title: string;
  text: string;
};

type AboutPageStat = {
  value: string;
  label: string;
};

type AboutPageProcess = {
  title: string;
  text: string;
};

type HeroProofItem = {
  value: string;
  label: string;
};

const valueIcons = [ShieldCheck, ClipboardCheck, MessageSquareMore];
const audienceIcons = [Home, Hammer, CheckCircle2];
const processIcons = [MapPin, ClipboardCheck, Hammer, ShieldCheck];
const heroProofIcons = [ShieldCheck, MapPin, MessageSquareMore];
const heroHighlightIcons = [MapPin, ClipboardCheck, MessageSquareMore];
const statIcons = [ShieldCheck, ClipboardCheck, MapPin, MessageSquareMore];

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'de';
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const title = `${t('hero.eyebrow')} | SorgfaltBau Halle`;
  const description = t('hero.lead');
  const aboutImage = '/uploads/sorgfaltbau_about_banner_v3_desktop_1800x2100.webp';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        de: '/de/about',
        ru: '/ru/about',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'de' ? 'de_DE' : 'ru_RU',
      url: `/${lang}/about`,
      siteName: 'SorgfaltBau',
      images: [
        {
          url: aboutImage,
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
      images: [aboutImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'de';
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  const faq = await getTranslations({ locale, namespace: 'faq' });
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${lang}/about`;
  const phone = COMPANY_PRIMARY_PHONE;
  const email = process.env.NEXT_PUBLIC_EMAIL || 'service@sorgfaltbau-halle.de';
  const values = t.raw('values') as AboutPageSectionItem[];
  const processSteps = t.raw('process') as AboutPageProcess[];
  const audiences = t.raw('audiences') as AboutPageSectionItem[];
  const stats = t.raw('stats') as AboutPageStat[];
  const faqItems = faq.raw('items') as Array<{ question: string; answer: string }>;
  const heroHighlights = t.raw('hero.highlights') as string[];
  const heroProof = t.raw('hero.proof') as HeroProofItem[];
  const locations = t.raw('serviceArea.locations') as string[];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: `${t('hero.eyebrow')} | SorgfaltBau Halle`,
      description: t('hero.lead'),
      url: pageUrl,
      inLanguage: lang,
      isPartOf: {
        '@type': 'WebSite',
        name: 'SorgfaltBau',
        url: siteUrl,
      },
      about: {
        '@type': 'HomeAndConstructionBusiness',
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
          name: t('hero.eyebrow'),
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
      email,
      telephone: phone,
      image: `${siteUrl}/uploads/sorgfaltbau_about_banner_v3_desktop_1800x2100.webp`,
      areaServed: locations,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_STREET_ADDRESS,
        postalCode: COMPANY_POSTAL_CODE,
        addressLocality: 'Halle (Saale)',
        addressRegion: 'Sachsen-Anhalt',
        addressCountry: 'DE',
      },
      description: t('hero.lead'),
      knowsAbout: [
        'Badsanierung',
        'Trockenbau',
        'Malerarbeiten',
        'Fassadenarbeiten',
        'Terrassenbau',
        'Fenster- und Türenmontage',
      ],
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
                <h1 className="mt-5 max-w-[14ch] font-heading text-[clamp(2.65rem,7.6vw,5.15rem)] leading-[0.95] tracking-[-0.02em] drop-shadow-[0_3px_18px_rgba(0,0,0,0.26)]">
                  <span className="block text-white">{t('hero.titleStart')}</span>
                  <span className="mt-1 block text-brand-accent drop-shadow-[0_8px_26px_rgba(242,100,34,0.28)]">
                    {t('hero.titleAccent')}
                  </span>
                  <span className="mt-1 block text-white/92">{t('hero.titleEnd')}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-slate-100/84 sm:text-lg">
                  {t('hero.lead')}
                </p>

                <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                  {heroProof.map((item, index) => {
                    const Icon = heroProofIcons[index] || ShieldCheck;

                    return (
                      <div
                        key={item.label}
                        style={{ animationDelay: `${140 + index * 90}ms` }}
                        className="group relative overflow-hidden rounded-2xl border border-white/14 bg-white/[0.08] p-4 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12] hover:shadow-2xl hover:shadow-brand-accent/10 motion-safe:animate-[fadeUp_0.7s_ease-out_both]"
                      >
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:translate-x-[420%] group-hover:opacity-100" />
                        <div className="relative flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange shadow-lg shadow-black/10 transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                            <Icon size={18} strokeWidth={1.8} />
                          </span>
                          <div>
                            <p className="font-heading text-2xl leading-none text-white">{item.value}</p>
                            <p className="mt-1 text-xs font-medium leading-5 text-slate-100/70">{item.label}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <ul className="mt-8 grid grid-cols-1 gap-3">
                  {heroHighlights.map((item, index) => {
                    const Icon = heroHighlightIcons[index] || CheckCircle2;

                    return (
                      <li
                        key={`${item}-${index}`}
                        style={{ animationDelay: `${260 + index * 90}ms` }}
                        className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-white/14 bg-white/[0.08] px-4 py-3.5 text-sm leading-6 text-slate-50/88 shadow-lg shadow-black/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-accent/45 hover:bg-white/[0.12] hover:shadow-xl hover:shadow-brand-accent/10 motion-safe:animate-[fadeUp_0.7s_ease-out_both] sm:px-5"
                      >
                        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:translate-x-[460%] group-hover:opacity-100" />
                        <span className="relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-accent/35 bg-brand-accent/10 text-brand-accent transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                          <Icon size={14} strokeWidth={1.9} />
                        </span>
                        <span className="relative pr-8">{item}</span>
                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-heading text-4xl leading-none text-white/[0.055] transition-colors duration-300 group-hover:text-brand-accent/15">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </li>
                    );
                  })}
                </ul>

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
                    href={`/${lang}/galerie`}
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
                  <div className="relative aspect-[4/5] sm:aspect-[16/11] xl:aspect-[6/7]">
                    <Image
                      src="/uploads/sorgfaltbau_about_banner_v3_mobile_1440x1800.webp"
                      alt={t('hero.imageAlt')}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover object-center sm:hidden"
                    />
                    <Image
                      src="/uploads/sorgfaltbau_about_banner_v3_desktop_1800x2100.webp"
                      alt={t('hero.imageAlt')}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 42vw"
                      className="hidden object-cover object-center sm:block"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041524]/80 via-[#041524]/22 to-[#041524]/8 sm:from-[#041524]/92 sm:via-[#041524]/25" />

                    <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-[#041524]/68 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-accent backdrop-blur-sm sm:left-6 sm:top-6 sm:text-[11px]">
                      {t('hero.imageTag')}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 hidden p-4 sm:block sm:p-6">
                      <div className="max-w-[34rem] rounded-[1.6rem] border border-white/16 bg-[#041524]/76 p-4 shadow-xl shadow-black/20 backdrop-blur-md sm:p-5">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/72">
                          {t('hero.imageTitle')}
                        </p>
                        <p className="mt-3 max-w-lg text-sm leading-7 text-slate-50/86 sm:text-base">
                          {t('hero.imageText')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:hidden">
                  <div className="rounded-[1.6rem] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-md">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/72">
                      {t('hero.imageTitle')}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-50/84">
                      {t('hero.imageText')}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div
                    style={{ animationDelay: '420ms' }}
                    className="group relative overflow-hidden rounded-[1.6rem] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12] motion-safe:animate-[fadeUp_0.75s_ease-out_both]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/70 to-transparent" />
                    <div className="pointer-events-none absolute -right-14 -top-14 h-28 w-28 rounded-full bg-brand-accent/12 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                    <div className="relative flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-lg shadow-black/15 transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                        <MessageSquareMore size={20} strokeWidth={1.8} />
                      </span>
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">
                          {t('hero.floatingCardTitle')}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-50/78">
                          {t('hero.floatingCardText')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ animationDelay: '520ms' }}
                    className="group relative overflow-hidden rounded-[1.6rem] border border-white/14 bg-white/[0.08] p-5 shadow-2xl shadow-black/[0.18] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/45 hover:bg-white/[0.12] motion-safe:animate-[fadeUp_0.75s_ease-out_both]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                    <Sparkles className="pointer-events-none absolute right-5 top-5 h-9 w-9 text-brand-accent/18 transition-all duration-500 group-hover:rotate-12 group-hover:text-brand-accent/30" />
                    <p className="relative max-w-[9ch] font-heading text-4xl leading-[1.05] text-white">
                      {t('hero.metricValue')}
                    </p>
                    <p className="relative mt-3 text-sm leading-6 text-slate-50/72">
                      {t('hero.metricLabel')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
              {stats.map((item, index) => {
                const Icon = statIcons[index] || ShieldCheck;

                return (
                  <AnimateOnScroll
                    key={item.label}
                    variant="fadeUp"
                    delay={index * 0.08}
                    className="h-full"
                  >
                    <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/14 bg-white/[0.08] p-5 shadow-xl shadow-black/[0.16] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-accent/45 hover:bg-white/[0.12] hover:shadow-2xl hover:shadow-brand-accent/10">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/22 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:translate-x-[520%] group-hover:opacity-100" />
                      <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl leading-none text-white/[0.055] transition-colors duration-300 group-hover:text-brand-accent/18">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-lg shadow-black/15 transition-colors duration-300 group-hover:bg-brand-accent group-hover:text-white">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>
                      <p className="relative font-heading text-3xl leading-none text-white sm:text-4xl">
                        {item.value}
                      </p>
                      <p className="relative mt-3 text-sm font-medium leading-6 text-slate-50/72">
                        {item.label}
                      </p>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f9fb] py-16 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_48%,#eef4f8_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
              <div>
                <span className="inline-flex rounded-full border border-brand-orange/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                  SorgfaltBau
                </span>
                <h2 className="mt-5 font-heading text-3xl text-anthracite-900 sm:text-4xl md:text-5xl">
                  {t('story.title')}
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-anthracite-600">
                  <p>{t('story.paragraph1')}</p>
                  <p>{t('story.paragraph2')}</p>
                  <p>{t('story.paragraph3')}</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-anthracite-100/80 bg-white p-6 shadow-xl shadow-brand-orange/[0.05] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-orange/[0.06]" />
                <h3 className="font-heading text-2xl text-anthracite-900">
                  {t('serviceArea.title')}
                </h3>
                <p className="mt-3 text-sm leading-7 text-anthracite-600 sm:text-base">
                  {t('serviceArea.text')}
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {locations.map((location) => (
                    <li
                      key={location}
                      className="flex items-center gap-2 rounded-xl border border-anthracite-100 bg-anthracite-50 px-4 py-3 text-sm font-medium text-anthracite-700"
                    >
                      <MapPin size={16} className="text-brand-orange" />
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white py-16 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.028)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.024)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl text-anthracite-900 sm:text-4xl md:text-5xl">
                {t('valuesTitle')}
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-orange" />
              <p className="mt-5 text-base leading-8 text-anthracite-600 sm:text-lg">
                {t('valuesIntro')}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
              {values.map((item, index) => {
                const Icon = valueIcons[index] || ShieldCheck;

                return (
                  <article
                    key={item.title}
                    className="group relative flex min-h-[17rem] flex-col overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-6 shadow-lg shadow-brand-orange/[0.04] transition-colors duration-300 hover:border-brand-orange/25 hover:shadow-2xl hover:shadow-brand-orange/10 sm:p-7"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(7,31,53,0.08)_0%,transparent_48%,rgba(242,100,34,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl leading-none text-brand-orange/[0.06] transition-colors duration-300 group-hover:text-brand-orange/[0.12]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/8 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                      <Icon size={26} strokeWidth={1.6} />
                    </div>
                    <h3 className="relative font-heading text-xl text-anthracite-900 sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-7 text-anthracite-600 sm:text-base">
                      {item.text}
                    </p>
                    <div className="relative mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-brand-orange">
                      <CheckCircle2 size={17} strokeWidth={1.8} />
                      <span>{t('hero.metricValue')}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#f7f9fb] py-16 sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_46%,#eef4f8_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-brand-orange/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange shadow-sm">
                  {t('hero.eyebrow')}
                </span>
                <h2 className="mt-5 font-heading text-3xl text-anthracite-900 sm:text-4xl md:text-5xl">
                  {t('audiencesTitle')}
                </h2>
                <p className="mt-5 text-base leading-8 text-anthracite-600 sm:text-lg">
                  {t('audiencesIntro')}
                </p>
                <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-anthracite-100 bg-white p-6 shadow-xl shadow-brand-orange/[0.05]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-orange text-white">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-anthracite-900">
                        {t('audiencesHighlight.title')}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-anthracite-600 sm:text-base">
                        {t('audiencesHighlight.text')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {audiences.map((item, index) => {
                  const Icon = audienceIcons[index] || Home;

                  return (
                    <article
                      key={item.title}
                      className={`group relative overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-6 shadow-lg shadow-brand-orange/[0.04] transition-colors duration-300 hover:border-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/10 sm:p-7 ${
                        index === audiences.length - 1 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/8 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <h3 className="mt-5 font-heading text-xl text-anthracite-900 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-anthracite-600 sm:text-base">
                        {item.text}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#061b2f] py-16 text-white sm:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_50%,#0c314f_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-accent/[0.14] blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-sm shadow-black/10 backdrop-blur">
                SorgfaltBau
              </span>
              <h2 className="mt-5 font-heading text-3xl text-white sm:text-4xl md:text-5xl">
                {t('processTitle')}
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-100/82 sm:text-lg">
                {t('processIntro')}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
              {processSteps.map((item, index) => {
                const Icon = processIcons[index] || ClipboardCheck;

                return (
                  <article
                    key={item.title}
                    className="group relative flex min-h-[17rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/16 bg-white/[0.08] p-6 shadow-xl shadow-black/20 backdrop-blur-md transition-colors duration-300 hover:border-white/28 hover:bg-white/[0.12]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
                    <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl leading-none text-white/[0.08]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-lg shadow-black/15 transition-colors group-hover:bg-brand-accent group-hover:text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-100/76 sm:text-base">
                      {item.text}
                    </p>
                  </article>
                );
              })}
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
