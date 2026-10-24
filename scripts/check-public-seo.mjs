import assert from 'node:assert/strict';
import {parseArgs} from 'node:util';

const {values} = parseArgs({options: {base: {type: 'string'}}});
const base = (values.base ?? 'http://127.0.0.1:3100').replace(/\/$/, '');
const canonicalOrigin = 'https://www.sorgfaltbau.de';

async function get(path) {
  const response = await fetch(`${base}${path}`, {redirect: 'manual', signal: AbortSignal.timeout(30000)});
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response.text();
}

function schemaTypes(value) {
  if (!value || typeof value !== 'object') return [];
  return [value['@type'], ...Object.values(value).flatMap(schemaTypes)].filter(Boolean);
}

const sitemap = await get('/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.ok(urls.length >= 40, 'Existing 40 sitemap URLs must be retained');
assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
const queue = [...urls];
const pages = new Map();

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    assert.ok(url.startsWith(canonicalOrigin + '/'), 'Unexpected sitemap origin');
    const path = new URL(url).pathname;
    const html = await get(path);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `${path}: expected one H1`);
    const locale = path.split('/')[1];
    assert.ok(['de', 'ru'].includes(locale), `${path}: missing locale`);
    assert.equal(html.match(/<html[^>]*lang="([^"]+)"/)?.[1], locale, `${path}: wrong HTML language`);
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], url, `${path}: canonical`);
    for (const lang of ['de', 'ru']) {
      const expected = `${canonicalOrigin}/${lang}${path.slice(3)}`;
      assert.ok(html.includes(`hrefLang="${lang}" href="${expected}"`), `${path}: ${lang} hreflang`);
    }
    const xDefault = `${canonicalOrigin}/de${path.slice(3)}`;
    assert.ok(html.includes(`hrefLang="x-default" href="${xDefault}"`), `${path}: x-default hreflang`);
    assert.ok(!html.includes('id="reviews"'), `${path}: unverified testimonials must stay removed`);
    assert.ok(html.match(/<title>[^<]+<\/title>/), `${path}: title`);
    assert.ok(html.match(/<meta name="description" content="[^"]+"/), `${path}: description`);
    assert.ok(!html.match(/<meta name="robots" content="[^"]*noindex/), `${path}: noindex`);
    const types = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap(match => schemaTypes(JSON.parse(match[1])));
    if (path.includes('/services/')) {
      for (const type of ['Service', 'HomeAndConstructionBusiness', 'BreadcrumbList', 'FAQPage']) {
        assert.ok(types.includes(type), `${path}: missing ${type}`);
      }
    }
    if (path.includes('/news/')) {
      assert.ok(types.includes('BlogPosting'), `${path}: missing BlogPosting`);
      assert.ok(types.includes('BreadcrumbList'), `${path}: missing breadcrumbs`);
    }
    pages.set(path, html);
  }
}
await Promise.all(Array.from({length: 4}, worker));

for (const entry of sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
  const url = entry[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
  const lastmod = entry[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  if (new URL(url).pathname.includes('/news/')) {
    assert.ok(lastmod && Number.isFinite(Date.parse(lastmod)), `${url}: article content date`);
    assert.ok(Date.parse(lastmod) <= Date.now(), `${url}: future content date`);
  } else {
    assert.equal(lastmod, undefined, `${url}: static URL must not get a build timestamp`);
  }
}

for (const lang of ['de', 'ru']) {
  const home = pages.get(`/${lang}`);
  const servicePaths = [...pages.keys()].filter(path => path.startsWith(`/${lang}/services/`));
  assert.equal(servicePaths.length, 8, `${lang}: existing service pages`);
  for (const path of servicePaths) assert.ok(home.includes(`href="${path}"`), `Homepage must link to ${path}`);
  assert.ok(home.includes('href="#contact"'), `${lang}: native contact anchor`);
  assert.ok(!home.match(/<source[^>]+\.mp4/), `${lang}: mobile video must stay deferred`);
  const renovation = pages.get(`/${lang}/news/wohnung-renovieren-in-halle-trockenbau-malerarbeiten-bodenverlegung`);
  const exterior = pages.get(`/${lang}/news/fassadensanierung-aussenanlagen-in-halle-fassade-einfahrt-terrasse`);
  const articleBody = html => html.match(/<article\b[\s\S]*?<\/article>/)?.[0] ?? '';
  for (const slug of ['trockenbau-halle', 'bodenbelaege-halle', 'wohnungsrenovierung-halle']) {
    assert.ok(articleBody(renovation).includes(`href="/${lang}/services/${slug}"`), `${lang}: article → ${slug}`);
  }
  for (const slug of ['fassadendaemmung-halle', 'pflasterarbeiten-halle']) {
    assert.ok(articleBody(exterior).includes(`href="/${lang}/services/${slug}"`), `${lang}: article → ${slug}`);
  }
}

const robots = await get('/robots.txt');
// Both the AI group and the wildcard group retain private API/admin exclusions,
// with longer public-media Allow rules taking precedence.
assert.equal((robots.match(/^Allow: \/api\/gallery\/media\/$/gm) ?? []).length, 2);
assert.equal((robots.match(/^Allow: \/api\/news\/media\/$/gm) ?? []).length, 2);
assert.equal((robots.match(/^Disallow: \/api$/gm) ?? []).length, 2);
assert.equal((robots.match(/^Disallow: \/admin$/gm) ?? []).length, 2);
console.log(JSON.stringify({base, checkedUrls: pages.size, passed: true,
  checks: ['HTTP 200', 'single H1', 'DE/RU html lang', 'canonical', 'reciprocal hreflang', 'x-default hreflang', 'no unverified testimonials',
    'metadata', 'JSON-LD', 'service discovery', 'contextual article links', 'deferred mobile video',
    'content-only lastmod', 'narrow public-media crawler access']}, null, 2));
