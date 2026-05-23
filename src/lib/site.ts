const PROD_SITE_URL = 'https://www.sorgfaltbau.de';
const DEV_SITE_URL = 'http://localhost:3000';

function normalizeSiteUrl(value: string) {
  const siteUrl = value.trim().replace(/\/+$/, '');
  if (siteUrl === 'https://sorgfaltbau.de') return PROD_SITE_URL;
  if (siteUrl === 'http://sorgfaltbau.de') return PROD_SITE_URL;
  return siteUrl;
}

export function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) return normalizeSiteUrl(siteUrl);
  return process.env.NODE_ENV === 'production' ? PROD_SITE_URL : DEV_SITE_URL;
}

export function getAbsoluteUrl(path = '') {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getLocalizedAlternates(path = '') {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';

  return {
    de: getAbsoluteUrl(`/de${normalizedPath}`),
    ru: getAbsoluteUrl(`/ru${normalizedPath}`),
  };
}
