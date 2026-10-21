import {readFile, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parseArgs} from 'node:util';
import dotenv from 'dotenv';
import {SignJWT, importPKCS8} from 'jose';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const SITE = 'https://www.sorgfaltbau.de/';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const API = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}`;
const OUTPUT = path.join(ROOT, 'reports', 'search-console');

class GscError extends Error {
  constructor(code, status) {
    super(code);
    this.name = 'GscError';
    this.status = status;
  }
}

async function readEnv(file, optional = false) {
  try {
    return dotenv.parse(await readFile(file));
  } catch (error) {
    if (optional && error.code === 'ENOENT') return {};
    throw new GscError('credentials_file_unreadable');
  }
}

async function config() {
  const env = {};
  for (const file of ['.env', '.env.local', '.env.gsc.local']) {
    Object.assign(env, await readEnv(path.join(ROOT, file), true));
  }
  Object.assign(env, process.env);
  if (env.GSC_SITE_URL?.trim() !== SITE) {
    throw new GscError('GSC_SITE_URL_must_be_https://www.sorgfaltbau.de/');
  }

  let email = env.GSC_CLIENT_EMAIL?.trim();
  let encoded = env.GSC_PRIVATE_KEY_BASE64?.trim();
  let legacy = env.GSC_PRIVATE_KEY?.trim();
  let credentialSource = 'project_environment';
  if (!encoded && !legacy && env.GSC_CREDENTIALS_ENV_FILE?.trim()) {
    const sourcePath = path.resolve(ROOT, env.GSC_CREDENTIALS_ENV_FILE.trim());
    const source = await readEnv(sourcePath);
    const sourceEmail = source.GSC_CLIENT_EMAIL?.trim();
    if (email && sourceEmail !== email) {
      throw new GscError('credentials_email_mismatch');
    }
    email = sourceEmail;
    encoded = source.GSC_PRIVATE_KEY_BASE64?.trim();
    legacy = source.GSC_PRIVATE_KEY?.trim();
    credentialSource = 'external_env_reference';
    // Deliberately do not import the source project's GSC_SITE_URL or other secrets.
  }
  if (!email || (!encoded && !legacy)) throw new GscError('missing_gsc_credentials');
  const privateKey = (encoded
    ? Buffer.from(encoded, 'base64').toString('utf8')
    : legacy.replace(/\\n/g, '\n')).replace(/\r\n?/g, '\n').trim();
  return {email, privateKey, credentialSource};
}

async function accessToken(settings) {
  let assertion;
  try {
    const key = await importPKCS8(settings.privateKey, 'RS256');
    assertion = await new SignJWT({scope: SCOPE})
      .setProtectedHeader({alg: 'RS256', typ: 'JWT'})
      .setIssuer(settings.email)
      .setAudience(TOKEN_URL)
      .setIssuedAt()
      .setExpirationTime('10m')
      .sign(key);
  } catch {
    throw new GscError('invalid_gsc_private_key');
  }
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    signal: AbortSignal.timeout(20000),
  });
  const body = await response.json();
  if (!response.ok || !body.access_token) throw new GscError('google_auth_failed', response.status);
  // Tokens are used only in memory; neither the private key nor tokens are saved in reports.
  return body.access_token;
}

async function request(token, url, body) {
  const response = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? {'Content-Type': 'application/json'} : {}),
    },
    ...(body ? {body: JSON.stringify(body)} : {}),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) {
    // Do not print arbitrary server responses or request headers containing credentials.
    throw new GscError(response.status === 403 || response.status === 404
      ? 'property_access_denied_or_not_added'
      : 'google_api_failed', response.status);
  }
  return response.json();
}

function dateOnly(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? '')) throw new GscError('date_must_be_YYYY-MM-DD');
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new GscError('invalid_calendar_date');
  }
  return value;
}

function shiftDay(value, days) {
  const date = new Date(`${value}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

async function analytics(token, startDate, endDate, dimensions) {
  const rows = [];
  const rowLimit = 25000;
  for (let startRow = 0; startRow < 100000; startRow += rowLimit) {
    const data = await request(token, `${API}/searchAnalytics/query`, {
      startDate, endDate, dimensions, type: 'web', dataState: 'final',
      aggregationType: 'auto', rowLimit, startRow,
    });
    const page = data.rows ?? [];
    rows.push(...page);
    if (page.length < rowLimit) {
      return {dimensions, aggregationType: data.responseAggregationType, capped: false, rows};
    }
  }
  return {dimensions, capped: true, rows};
}

async function save(name, result) {
  await mkdir(OUTPUT, {recursive: true});
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = path.join(OUTPUT, `${name}-${stamp}.json`);
  await writeFile(filename, JSON.stringify(result, null, 2) + '\n', {flag: 'wx', mode: 0o600});
  return path.relative(ROOT, filename);
}

async function main() {
  const {values, positionals} = parseArgs({
    allowPositionals: true,
    options: {
      start: {type: 'string'},
      end: {type: 'string'},
      url: {type: 'string', multiple: true},
      help: {type: 'boolean'},
    },
  });
  const command = positionals[0] ?? 'check';
  if (values.help) {
    console.log('Read-only SorgfaltBau Search Console reporting.');
    console.log('npm run gsc:check');
    console.log('npm run gsc:report -- --start YYYY-MM-DD --end YYYY-MM-DD');
    console.log('npm run gsc:inspect -- --url https://www.sorgfaltbau.de/de [--url ...]');
    return;
  }
  if (!['check', 'report', 'inspect'].includes(command) || positionals.length > 1) {
    throw new GscError('unknown_command');
  }
  const settings = await config();
  const token = await accessToken(settings);
  const property = await request(token, API);
  if (property.permissionLevel === 'siteUnverifiedUser') throw new GscError('property_not_verified');
  const common = {
    generatedAt: new Date().toISOString(), siteUrl: SITE,
    account: settings.email, scope: SCOPE,
    credentialSource: settings.credentialSource, permissionLevel: property.permissionLevel,
  };

  if (command === 'check') {
    const sitemaps = await request(token, `${API}/sitemaps`);
    console.log(JSON.stringify({...common, connected: true, sitemaps: sitemaps.sitemap ?? []}, null, 2));
    return;
  }
  if (command === 'report') {
    const todayPT = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
    const endDate = dateOnly(values.end ?? shiftDay(todayPT, -3));
    const startDate = dateOnly(values.start ?? shiftDay(endDate, -89));
    if (startDate > endDate) throw new GscError('start_after_end');
    const dimensions = {
      totals: [], dates: ['date'], queries: ['query'], pages: ['page'],
      countries: ['country'], devices: ['device'], queryPages: ['query', 'page'],
    };
    const datasets = Object.fromEntries(await Promise.all(Object.entries(dimensions).map(
      async ([name, dims]) => [name, await analytics(token, startDate, endDate, dims)],
    )));
    const sitemaps = await request(token, `${API}/sitemaps`);
    const result = {
      ...common, startDate, endDate, type: 'web', dataState: 'final',
      dateTimeZone: 'America/Los_Angeles',
      notes: [
        'Google returns top rows subject to internal limits; query data is not a complete list of all searches.',
        'Anonymized queries are omitted. Page and property aggregations may have different totals.',
        'This report measures Google Search performance, not leads, calls or revenue.',
        'The URL Inspection API reports the indexed version, not a live test or an indexing request.',
      ],
      datasets, sitemaps: sitemaps.sitemap ?? [],
    };
    const file = await save(`performance-${startDate}-${endDate}`, result);
    console.log(JSON.stringify({siteUrl: SITE, startDate, endDate,
      totals: datasets.totals.rows[0] ?? null,
      returnedRows: Object.fromEntries(Object.entries(datasets).map(([name, data]) => [name, data.rows.length])),
      file}, null, 2));
    return;
  }

  if (!values.url?.length) throw new GscError('inspect_requires_--url');
  const urls = [...new Set(values.url)];
  for (const url of urls) {
    const parsed = new URL(url);
    if (!url.startsWith(SITE) || parsed.origin !== new URL(SITE).origin || parsed.username || parsed.password) {
      throw new GscError('inspection_url_outside_sorgfaltbau_property');
    }
  }
  const results = new Array(urls.length);
  let next = 0;
  async function inspectWorker() {
    while (next < urls.length) {
      const index = next++;
      const url = urls[index];
      try {
        const data = await request(token, 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
          inspectionUrl: url, siteUrl: SITE, languageCode: 'en-US',
        });
        results[index] = {url, ...data.inspectionResult};
      } catch (error) {
        results[index] = {url, error: error instanceof GscError ? error.message : 'inspection_failed'};
      }
    }
  }
  await Promise.all(Array.from({length: Math.min(3, urls.length)}, inspectWorker));
  const file = await save('inspection', {...common, results});
  console.log(JSON.stringify({file, results: results.map(({url, error, indexStatusResult}) => ({url, ...(error ? {error} : {}), ...indexStatusResult}))}, null, 2));
  if (results.some(result => result.error)) process.exitCode = 1;
}

main().catch((error) => {
  console.error(JSON.stringify({
    error: error instanceof GscError ? error.message : 'gsc_request_failed',
    ...(error instanceof GscError && error.status ? {httpStatus: error.status} : {}),
    help: 'See docs/search-console-access.md. No credentials or tokens are included in this output.',
  }, null, 2));
  process.exitCode = 1;
});
