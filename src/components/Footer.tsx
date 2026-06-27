'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowUp, ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import {
  COMPANY_MAP_URL,
  COMPANY_POSTAL_CITY,
  COMPANY_PRIMARY_PHONE,
  COMPANY_SECONDARY_PHONE,
  COMPANY_STREET_ADDRESS,
} from '@/lib/contact';
import {
  CONSTRUCTION_CATALOG_SLUGS,
  FOOTER_SERVICE_INDICES,
} from '@/lib/serviceCatalog';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const email = process.env.NEXT_PUBLIC_EMAIL || 'service@sorgfaltbau.de';
  const phoneToTel = (value: string) => value.replace(/\s+/g, '');
  const navigationItems = [
    { label: t('nav.home'), href: `/${locale}` },
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.services'), href: `/${locale}/services` },
    { label: t('nav.whyUs'), href: `/${locale}/why-us` },
    { label: t('nav.gallery'), href: `/${locale}#gallery` },
    { label: t('nav.news'), href: `/${locale}/news` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
  ];

  // Услуги в подвале — теперь ссылки на детальные страницы /services/[slug]
  const constructionItems = t.raw('services.construction.items') as string[];
  const serviceLinks = FOOTER_SERVICE_INDICES.map((i) => ({
    label: constructionItems[i],
    href: `/${locale}/services/${CONSTRUCTION_CATALOG_SLUGS[i]}`,
  }));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-[#041524] text-slate-200">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_52%,#0c314f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:58px_58px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-brand-accent/10 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-white/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.8fr_1fr_1.1fr]">
          <div className="rounded-2xl border border-white/14 bg-white/[0.075] p-5 shadow-2xl shadow-black/15 backdrop-blur-md sm:p-6">
            <div className="flex justify-center">
              <div className="inline-flex rounded-xl bg-white p-2 shadow-lg shadow-black/20">
              <Image
                src="/uploads/logo-sb-footer.webp"
                alt="SorgfaltBau"
                width={172}
                height={119}
                className="h-auto w-40 rounded-md"
              />
              </div>
            </div>
            <p className="mt-5 text-center text-sm leading-relaxed text-slate-100/78">
              {t('footer.description')}
            </p>
            <div className="mt-5 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.08] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100/80">
                <MapPin size={14} className="text-brand-accent" />
                {t('footer.region')}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-5 sm:p-6">
            <h4 className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2.5">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-slate-100/72 transition-colors hover:text-brand-accent"
                  >
                    <ChevronRight size={14} className="text-brand-accent/70 transition-transform group-hover:translate-x-0.5" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-5 sm:p-6">
            <h4 className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {t('footer.services')}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group flex items-start gap-2 text-sm leading-relaxed text-slate-100/72 transition-colors hover:text-brand-accent"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent transition-transform group-hover:scale-125" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/[0.055] p-5 sm:p-6">
            <h4 className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {t('nav.contact')}
            </h4>
            <div className="space-y-3">
              {[COMPANY_PRIMARY_PHONE, COMPANY_SECONDARY_PHONE].map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phoneToTel(phone)}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-slate-100/78 transition-colors hover:border-brand-accent/45 hover:bg-white/[0.095] hover:text-white"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange transition-colors group-hover:bg-brand-accent group-hover:text-white">
                    <Phone size={16} />
                  </span>
                  {phone}
                </a>
              ))}
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-slate-100/78 transition-colors hover:border-brand-accent/45 hover:bg-white/[0.095] hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange transition-colors group-hover:bg-brand-accent group-hover:text-white">
                  <Mail size={16} />
                </span>
                <span className="break-all">{email}</span>
              </a>
              <a
                href={COMPANY_MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 text-sm text-slate-100/78 transition-colors hover:border-brand-accent/45 hover:bg-white/[0.095] hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-brand-orange transition-colors group-hover:bg-brand-accent group-hover:text-white">
                  <MapPin size={16} />
                </span>
                <span>
                  {COMPANY_STREET_ADDRESS}
                  <span className="block text-slate-100/58 group-hover:text-white/80">
                    {COMPANY_POSTAL_CITY}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row lg:px-8">
          <p className="text-center text-xs text-slate-100/48 md:text-left">
            © {new Date().getFullYear()} SorgfaltBau. {t('footer.rights')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`/${locale}/impressum`}
              className="text-xs font-medium text-slate-100/50 transition-colors hover:text-brand-accent"
            >
              {t('nav.impressum')}
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-100/25" />
            <a
              href={`/${locale}/datenschutz`}
              className="text-xs font-medium text-slate-100/50 transition-colors hover:text-brand-accent"
            >
              {t('nav.datenschutz')}
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100/72 transition-all hover:-translate-y-0.5 hover:border-brand-accent/50 hover:bg-brand-accent hover:text-white"
            aria-label={t('footer.backToTop')}
          >
            {t('footer.backToTop')}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-brand-accent transition-colors group-hover:bg-white/20 group-hover:text-white">
              <ArrowUp size={15} strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
