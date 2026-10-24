# Security dependency refresh - 2026-10-24

## Scope and starting state

User requested patched Next.js and critical dependencies, preserving the site and
Hostinger compatibility. Initial npm audit returned 49 affected package entries:
1 critical, 46 high and 2 moderate. These counts include transitive/parent
packages, not 49 independently exploitable application endpoints. No exploitation
or incident was inferred from the alerts.

Existing local edits to AGENTS.md, the SEO audit and PDF generation files were
preserved. At completion of the dependency update, no new branch, commit, push,
production deployment, external email or database migration/write was performed.
The user subsequently authorized a full commit/push on October 24, targeting only
the existing `origin/main`; deployment and remote scanner results still need
separate confirmation. The reviewed PDF, its source and the robots handoff rule
are included with the security update; raw exports, secrets and temporary files
are excluded.

## Selected versions

Versions were verified against the live npm registry on October 24. Stable patch
lines were preferred over prereleases and unnecessary major migrations.

| Package | Before | After |
|---|---|---|
| next / eslint-config-next | 16.3.0 | 16.4.3 |
| sharp | 0.35.3 | 0.35.5 |
| nodemailer | 9.0.5 | 10.2.1 |
| prisma / @prisma/client / @prisma/adapter-pg | 7.9.1 | 7.10.1 |
| eslint | 9.39.2 | 9.39.5 |
| postcss (direct + override) | 8.5.26 | 8.5.31 |
| brace-expansion (minimatch overrides) | 5.0.9 | 5.0.12 |
| fast-uri override | 3.1.5 | 3.1.9 |
| js-yaml override | 4.3.1 | 4.3.2 |
| undici override | 6.28.0 | 6.29.1 |
| @hono/node-server override | 1.19.13 | 1.19.17 |

Added targeted overrides for Browserslist 4.29.4, source-map-js 1.2.2,
postcss-selector-parser 7.1.7, deepmerge-ts 8.0.2 and Zod 4.6.7. Prisma's new
stable config already uses deepmerge-ts 8.0.2 and its CLI resolves mysql2 3.24.4.
No direct MySQL application dependency was added; production remains PostgreSQL.

The existing minimatch 3 compatibility patch is retained because brace-expansion
5 exports an object rather than the function expected by minimatch 3. The parser
override crosses Tailwind 3/postcss-nested's declared major; representative
selector processing and the full CSS production build must pass. Do not remove
overrides blindly or suppress audit findings to obtain a green report.

React/React DOM stay at 19.2.8. next-intl stays at 4.12.0. Tailwind stays in major
3; install refreshed its compatible patch to 3.4.19 and Autoprefixer to 10.4.24.
No Prisma 8 RC, ESLint 10, Tailwind 4, or canary Next release was installed.

## Validation

- Install and Prisma Client generation: passed (7.10.1).
- Full `npm audit --json`: zero vulnerabilities at every severity.
- Production `npm audit --omit=dev --json`: zero vulnerabilities.
- Direct package.json/package-lock.json specifications: match.
- TypeScript `tsc --noEmit`: passed.
- ESLint: no errors; nine pre-existing warnings (unused imports and admin `<img>`).
  New compatibility check script separately passes ESLint with zero warnings.
- `node scripts/check-dependency-compatibility.mjs`: passed. Checks all installed
  minimatch versions with brace patterns, CSS selectors, deepmerge, Zod validation,
  Sharp WebP resize/decoding and Nodemailer MIME/envelope/reply-to construction.
  Nodemailer uses an in-memory stream transport; no SMTP connection or email sent.
- Standard `npm run build`: passed, Next.js 16.4.3 Webpack, 54/54 pages.
- Hostinger-oriented `NEXT_TEST_WASM=1 npm run build`: passed, 54/54 pages. Next
  downloaded SWC WASM 16.4.3 and confirmed use of WASM bindings in the log. Its
  Windows supported-platform warning also appeared; the actual forced-WASM path
  was verified against Next's loader (`NEXT_TEST_WASM` prevents native loading).
- Local production 40-page SEO/route regression: passed on 127.0.0.1:3127,
  including DE/RU language, canonical/hreflang, metadata/JSON-LD, discovery links,
  deferred video, real-content sitemap dates and unchanged media crawl rules.
- Actual Next image optimizer served a decoded 384px image successfully; admin
  login and both contact pages returned 200. No login or form submission occurred.
- `git diff --check`: passed. No application source, public route, robots.txt or
  Next config changes. The temporary test server is stopped after verification.

The first sandboxed install stopped on a Prisma postinstall permission error
while resolving the user's temporary directory. The explicitly approved
out-of-sandbox retry completed successfully. The npm cache is project-local and
ignored; existing document-rendering intermediates are now ignored too. No
application files or secrets were deleted to fix permissions.

## Hostinger handoff

Keep Node.js 22 supported by Prisma (`^22.12`) and Next (`>=20.9`), with the existing
`npm install`, `npm run build` and `npm run start` flow and Webpack options. Do not
switch to Turbopack or force Prisma's advertised prerelease upgrade. After a later
authorized push/deployment, verify the Hostinger build, DE/RU pages, optimized
images, admin access and a separately authorized real contact-form delivery test.

This change does not alter URLs, content, robots.txt or sitemap. It does not itself
require robots recrawl, sitemap resubmission or individual page reindexing. The
separate pending SEO publication/indexing checklist remains applicable.

Zero npm vulnerabilities is a dated dependency-audit result, not proof of absence
of every application/security issue. Remote GitHub/Hostinger scanners cannot be
claimed green before the patched lockfile is pushed, deployed and rescanned.

## Primary references

- [Next.js critical advisory, patched from 16.4.1](https://github.com/vercel/next.js/security/advisories/GHSA-673q-mjm6-r5xr)
- [Next.js support policy](https://nextjs.org/support-policy)
- [Next.js release metadata](https://registry.npmjs.org/next/16.4.3)
- [Sharp release metadata](https://registry.npmjs.org/sharp/0.35.5)
- [Nodemailer release metadata](https://registry.npmjs.org/nodemailer/10.2.1)
- [Prisma stable release metadata](https://registry.npmjs.org/prisma/7.10.1)
