import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { COMPANY_PHONE_TEXT } from '@/lib/contact';

type Params = Promise<{ locale: string }>;

const metaDescriptions: Record<string, string> = {
  de: 'Rechtliche Anbieterkennzeichnung (Impressum) von SorgfaltBau.',
  ru: 'Юридическая информация (Impressum) компании SorgfaltBau.',
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const lang = locale === 'ru' ? 'ru' : 'de';
  const title = 'Impressum — SorgfaltBau';
  const description = metaDescriptions[lang];

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/impressum`,
      languages: {
        de: '/de/impressum',
        ru: '/ru/impressum',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: lang === 'de' ? 'de_DE' : 'ru_RU',
      url: `/${lang}/impressum`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Impressum() {
  const t = useTranslations('impressum');
  const locale = useLocale();
  const phone = COMPANY_PHONE_TEXT;
  const email = process.env.NEXT_PUBLIC_EMAIL || 'service@sorgfaltbau-halle.de';
  const content = t('content', { phone, email });
  const legalLinks = [
    { label: t('privacyLink'), href: `/${locale}/datenschutz`, external: false },
    { label: t('ddgLink'), href: 'https://www.gesetze-im-internet.de/ddg/__5.html', external: true },
    { label: t('vsbgLink'), href: 'https://www.gesetze-im-internet.de/vsbg/__36.html', external: true },
    { label: t('consumerRedressLink'), href: 'https://consumer-redress.ec.europa.eu/dispute-resolution-bodies', external: true },
  ];

  return (
    <>
      <Header />
      <main className="pt-28 pb-20 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-3xl sm:text-4xl text-anthracite-900 mb-8">
            {t('title')}
          </h1>
          <div className="prose prose-anthracite max-w-none">
            {content.split('\n').map((line, i) => (
              <p key={i} className="text-anthracite-600 leading-relaxed mb-2">
                {line}
              </p>
            ))}
          </div>
          <section className="mt-10 rounded-lg border border-anthracite-200 bg-anthracite-50 p-5">
            <h2 className="font-heading text-xl text-anthracite-900 mb-4">
              {t('linksTitle')}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {legalLinks.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-3 rounded-md border border-anthracite-200 bg-white px-4 py-3 text-sm font-medium text-anthracite-700 transition-colors hover:border-brand-orange hover:text-brand-orange"
                  >
                    {item.label}
                    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center justify-between gap-3 rounded-md border border-anthracite-200 bg-white px-4 py-3 text-sm font-medium text-anthracite-700 transition-colors hover:border-brand-orange hover:text-brand-orange"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
