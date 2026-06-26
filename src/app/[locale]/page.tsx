import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBadges from '@/components/TrustBadges';
import About from '@/components/About';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Faq from '@/components/Faq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {getAbsoluteUrl, getLocalizedAlternates} from '@/lib/site';
import {getLocalBusinessSchema} from '@/lib/seo';

type Params = Promise<{locale: string}>;

export async function generateMetadata({params}: {params: Params}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getAbsoluteUrl(`/${locale}`),
      languages: getLocalizedAlternates(),
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'de' ? 'de_DE' : 'ru_RU',
      type: 'website',
      url: getAbsoluteUrl(`/${locale}`),
      siteName: 'SorgfaltBau',
      images: [
        {
          url: '/uploads/hero-sb.webp',
          width: 1200,
          height: 630,
          alt: 'SorgfaltBau',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/uploads/hero-sb.webp'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Home({params}: {params: Params}) {
  const {locale} = await params;

  const jsonLd = getLocalBusinessSchema(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <About />
        <Services />
        <WhyUs />
        <Testimonials />
        <Gallery />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
    </>
  );
}
