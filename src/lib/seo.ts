import {
  COMPANY_CITY,
  COMPANY_POSTAL_CODE,
  COMPANY_PRIMARY_PHONE,
  COMPANY_SECONDARY_PHONE,
  COMPANY_STREET_ADDRESS,
} from '@/lib/contact';
import {getSiteUrl} from '@/lib/site';

export const COMPANY_GOOGLE_PROFILE_URL =
  'https://www.google.com/maps?cid=8758564088334118206';

export const COMPANY_GEO = {
  latitude: 51.5164092,
  longitude: 11.9062511,
} as const;

export const COMPANY_PRICE_RANGE = '€€';

// Confirmed from the public Google Unternehmensprofil.
export const COMPANY_OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday'],
    opens: '09:00',
    closes: '14:00',
  },
] as const;

export const COMPANY_SAME_AS: string[] = [
  COMPANY_GOOGLE_PROFILE_URL,
];

export const AREA_SERVED_CITIES = [
  'Halle (Saale)',
  'Merseburg',
  'Leipzig',
  'Schkeuditz',
  'Delitzsch',
  'Landsberg',
  'Kabelsketal',
  'Teutschenthal',
  'Bad Lauchstädt',
  'Wettin-Löbejün',
  'Salzatal',
  'Petersberg',
] as const;

type LocaleLike = string;

export function getLocalBusinessSchema(locale: LocaleLike) {
  const baseUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'SorgfaltBau',
    legalName: 'SorgfaltBau',
    description:
      locale === 'ru'
        ? 'Строительная и ремонтная компания в Halle (Saale): ремонт, отделка, фасады, кровля и наружные работы.'
        : 'Bau- und Renovierungsunternehmen in Halle (Saale): Renovierung, Innenausbau, Fassade, Dach und Außenarbeiten.',
    url: `${baseUrl}/de`,
    telephone: COMPANY_PRIMARY_PHONE,
    email: process.env.NEXT_PUBLIC_EMAIL || 'service@sorgfaltbau.de',
    image: `${baseUrl}/uploads/hero-sb.webp`,
    logo: `${baseUrl}/uploads/logo-sb.webp`,
    priceRange: COMPANY_PRICE_RANGE,
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Bank transfer',
    knowsLanguage: ['de', 'ru'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_STREET_ADDRESS,
      postalCode: COMPANY_POSTAL_CODE,
      addressLocality: COMPANY_CITY,
      addressRegion: 'Sachsen-Anhalt',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY_GEO.latitude,
      longitude: COMPANY_GEO.longitude,
    },
    hasMap: COMPANY_GOOGLE_PROFILE_URL,
    openingHours: ['Mo-Fr 08:00-18:00', 'Sa 09:00-14:00'],
    openingHoursSpecification: COMPANY_OPENING_HOURS,
    areaServed: AREA_SERVED_CITIES.map((name) => ({
      '@type': 'City',
      name,
    })),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_PRIMARY_PHONE,
        contactType: 'customer service',
        availableLanguage: ['de', 'ru'],
        areaServed: 'DE',
      },
      {
        '@type': 'ContactPoint',
        telephone: COMPANY_SECONDARY_PHONE,
        contactType: 'customer service',
        availableLanguage: ['de', 'ru'],
        areaServed: 'DE',
      },
    ],
    sameAs: COMPANY_SAME_AS,
  };
}

export function getBreadcrumbSchema(
  items: Array<{name: string; path: string}>
) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

export function getServiceSchema(params: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  const baseUrl = getSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    serviceType: params.serviceType ?? params.name,
    url: `${baseUrl}${params.path.startsWith('/') ? params.path : `/${params.path}`}`,
    areaServed: AREA_SERVED_CITIES.map((name) => ({'@type': 'City', name})),
    provider: {'@id': `${baseUrl}/#localbusiness`},
  };
}
