# SorgfaltBau: Google Search Console access

The local CLI reuses the existing SaaleWeb service account, with explicit user
authorization, for the exact URL-prefix property `https://www.sorgfaltbau.de/`.
It requests only `webmasters.readonly`. No public route, Next.js rendering,
contact logic, deployment, or database access is involved.

## Local configuration

The ignored `.env.gsc.local` is loaded by this CLI after `.env` and `.env.local`.
Shell environment variables take precedence. The CLI supports:

```dotenv
GSC_SITE_URL="https://www.sorgfaltbau.de/"
GSC_CLIENT_EMAIL="saaleweb-platform@saaleweb.iam.gserviceaccount.com"
GSC_CREDENTIALS_ENV_FILE="D:/projects/saaleweb-app/saaleweb-app/.env"
```

The external file is read only for the account email and private key; its site
URL and other environment variables are never imported. The key stays in the
existing local SaaleWeb file, without duplicating it or saving it in Git. If that
file is moved, update the reference. A different email in that file is rejected.

For a standalone environment, set `GSC_CLIENT_EMAIL` plus
`GSC_PRIVATE_KEY_BASE64` (preferred for Hostinger) or `GSC_PRIVATE_KEY` directly.
Base64 has priority. Escaped `\n` in a legacy PEM key is supported. Base64 is a
transport format, not encryption. Never use `NEXT_PUBLIC_` for credentials.

The CLI does not run automatically during build or on Hostinger; no production
environment changes are required for local audits.

## Grant access once

In the **SorgfaltBau** Search Console property, the owner should open
**Settings → Users and permissions → Add user**, enter
`saaleweb-platform@saaleweb.iam.gserviceaccount.com`, and select **Full** to match
the established SaaleWeb setup. The local CLI still uses only a read-only OAuth
scope. Ownership and new private keys are not needed.

The service account was authenticated successfully on 2026-10-21, but initially
the property was absent from its sites list and the exact-property lookup
returned HTTP 404. The owner then added it: `gsc:check` succeeded on 2026-10-21
with `siteFullUser`, and Search Analytics plus URL Inspection reads were verified.

## Commands

```bash
npm run gsc:check
npm run gsc:report -- --start 2026-05-01 --end 2026-10-18
npm run gsc:inspect -- --url https://www.sorgfaltbau.de/de --url https://www.sorgfaltbau.de/de/services/badsanierung-halle
```

`gsc:check` confirms access and reads submitted sitemaps. `gsc:report` exports
totals, daily data, queries, pages, countries, devices and query/page pairs as
JSON under ignored `reports/search-console/`. Supply explicit dates for a
repeatable comparison. Defaults are the 90-day period ending three days before
the current Pacific date, using finalized data only. This is a reporting buffer,
not a guarantee that Google has populated every day.

`gsc:inspect` reads the indexed status, crawl time and Google-selected canonical
for explicitly supplied URLs. It does not submit indexing requests or run live
tests. None of these commands changes users, sitemap submissions or website
content. Keys and tokens are never written to exports or printed.
Inspections run with at most three concurrent requests and preserve per-URL
failures in the export instead of discarding all successful results.

## Interpretation

- Google Search dates use Pacific time, not the local Berlin calendar day.
- Query data excludes anonymized searches and is subject to Google's internal
  top-row limits. Pagination cannot guarantee a complete dataset.
- Page and property totals use different aggregation and may not match.
- A successful sitemap does not prove that every URL has been indexed.
- `contents[].indexed` in the Sitemaps API is deprecated; a zero there is not
  evidence that the site's index is empty. Use individual URL inspections.
- Search Console shows search traffic, not form submissions, calls or revenue.
- The Page indexing and Links UI reports are not replaced by these API exports.

## Saved baseline and scheduled review windows

- Frozen audit: [2026-10-21 audit](seo/seo-audit-2026-10-21.md).
- Reviewed metrics and all 40 inspection results: [baseline JSON](seo/baseline-2026-10-21.json).
- [Follow-up procedure and exact indexing queue](seo/follow-up-2026-10-22.md):
  October 29 and November 5, adjusted if deployment occurs after October 22.
  These are documented project reminders, not an automated notification.
- The October 21 sitemap submission has been processed: 40 submitted URLs,
  no errors/warnings, last download `2026-10-21T21:39:38.938Z`. No repeat submission
  is required just to publish these content changes. Do not interpret that as
  confirmation that all URLs are indexed.
- Keep the baseline immutable; review/sanitize future reports before committing.

## References

- [Google: Search Console authorization and scopes](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing)
- [Google: Search Analytics query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)
- [Google: URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect)
- [Google: managing Search Console users](https://support.google.com/webmasters/answer/7687615)
