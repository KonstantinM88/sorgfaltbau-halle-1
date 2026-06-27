// src/proxy.ts
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from '@/i18n/config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: false,
  alternateLinks: false,
});

const STATIC_ASSET_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const CACHEABLE_PUBLIC_ASSET_PATH =
  /^\/(?:images|uploads)\/.+\.(?:avif|webp|png|jpe?g|gif|svg|ico|mp4|webm|woff2?)$/i;

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get('host')?.split(':')[0]?.toLowerCase();

  if (hostname === 'sorgfaltbau.de') {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    url.hostname = 'www.sorgfaltbau.de';
    return NextResponse.redirect(url, 308);
  }

  // Google Search Console verification files in site root.
  if (/^\/google[a-z0-9]+\.html$/i.test(pathname)) {
    return NextResponse.next();
  }

  if (CACHEABLE_PUBLIC_ASSET_PATH.test(pathname)) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', STATIC_ASSET_CACHE_CONTROL);
    return response;
  }

  // Admin routes: check auth cookie.
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    return NextResponse.next();
  }

  // Admin login and API routes do not use locale routing.
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const hasLocalePrefix = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url, 308);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/images/:path*',
    '/uploads/:path*',
    '/((?!_next|images|uploads|favicon.ico|robots.txt|sitemap.xml|llms.txt).*)',
  ],
};
