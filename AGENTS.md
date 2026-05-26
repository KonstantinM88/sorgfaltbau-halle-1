# AGENTS.md

## Project

SorgfaltBau website for `sorgfaltbau.de`.

Base project was originally adapted from `onebbau.de`; old brand references should not be reintroduced.

## Agent Memory Rule

- Record important project changes in this `AGENTS.md` file before finishing work that changes architecture, integrations, shared UI systems, public copy/SEO structure, production assets, operational setup, or behavior future work must preserve.
- Keep the log concise and append new notes to the relevant existing section when possible instead of duplicating the same change in multiple places.

## Stack

- Next.js `16.2.5` App Router
- React `19.2.5`
- TypeScript
- next-intl for `de` and `ru`
- Tailwind CSS
- Prisma `7.7.0`
- PostgreSQL on Neon
- Prisma PostgreSQL adapter: `@prisma/adapter-pg`

## Important Commands

Use Git Bash on this Windows machine.

```bash
npm install
npm run dev
npm run build
npx prisma validate
npx prisma generate
```

Current scripts use webpack and `NODE_OPTIONS` because Turbopack/webpack cache previously hit memory errors on this machine.

## Key Paths

- `src/app/[locale]` - localized public pages
- `src/app/admin` - admin area
- `src/app/api` - API routes
- `src/components` - public UI sections/components
- `src/i18n/dictionaries` - main translations
- `messages` - older message files, still kept in repo
- `src/lib/prisma.ts` - Prisma Client setup
- `src/lib/auth.ts` - admin auth/JWT helpers
- `src/lib/site.ts` - production site URL helper
- `prisma/schema.prisma` - Prisma schema
- `prisma.config.ts` - Prisma 7 datasource config
- `public/uploads` - uploaded/brand assets
- `src/app/favicon.ico/route.ts` - generated favicon route

## Prisma 7 Notes

Prisma 7 no longer keeps datasource `url` in `schema.prisma`.

Current setup:

- `prisma/schema.prisma` contains `datasource db { provider = "postgresql" }`
- `prisma.config.ts` loads `DATABASE_URL` from `.env`
- runtime client uses `PrismaPg` adapter in `src/lib/prisma.ts`

Do not revert this to Prisma 6 style.

## Brand Assets

Current SorgfaltBau assets:

- `/uploads/hero-sb.webp`
- `/uploads/hero-mobile-sb.webp`
- `/uploads/hero-mobile-sb.webm`
- `/uploads/hero-mobile-sb.mp4`
- `/uploads/hero-b-video-mobile-720x960.mp4` - current primary mobile hero video
- `/uploads/hero-b-video.webm`
- `/uploads/hero-b-video.mp4`
- `/uploads/logo-sb-header.webp`
- `/uploads/logo-sb-footer.webp`
- `/uploads/logo-sb.webp`

Old `onebbau_*` assets were removed from `public/uploads`.

## Brand Colors

- Primary interactive color uses the logo navy blue `#071F35`.
- Existing Tailwind class names still use `brand-orange` for compatibility, but the token now maps to navy blue.
- Orange from the logo is preserved as `brand-accent` / `#F26422` for small accents if needed.

## Environment

`.env` is ignored and contains secrets. Do not print secret values in chat.

Important variables:

- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_SECONDARY_PHONE`
- `NEXT_PUBLIC_EMAIL`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`

After changing `ADMIN_JWT_SECRET`, old admin cookies become invalid. Clear browser cookies or visit `/api/auth/logout`, then log in again at `/admin/login`.

Next.js loads `.env.local` before `.env`. Do not leave an empty `SMTP_PASSWORD` in `.env.local`, because it overrides a configured mailbox password from `.env` during local contact-form tests.

## Completed Work Log

### Rebrand from Onebbau to SorgfaltBau

- Replaced old text references to `Onebbau`, `onebbau.de`, and related fallbacks.
- Updated metadata, JSON-LD, footer, contact e-mail fallbacks, admin labels.
- Updated production site URL to `https://www.sorgfaltbau.de`.
- Canonical and hreflang alternates now use absolute localized URLs from `src/lib/site.ts` so all SEO tags stay on the canonical `https://www.sorgfaltbau.de` host.
- Requests to `sorgfaltbau.de` are redirected permanently to `https://www.sorgfaltbau.de` via Next redirects and proxy host normalization to avoid split canonical/hreflang audits.

### Assets

- Converted uploaded `hero-sb.png` to `hero-sb.webp`.
- Converted `hero-b-video.mp4` to `hero-b-video.webm`.
- Created optimized mobile hero video/poster assets in portrait format.
- Cropped `logo-sb.png` into header/footer webp logo assets.
- Copied old section banners to new `sorgfaltbau_*` names so existing pages do not break.
- Generated a new branded `favicon.ico` route.
- Converted the new `sorgfaltbau_about_banner.webp` Temp asset into responsive about-page desktop/mobile WebP banners and removed the Temp source after publishing.
- Switched the about page to cache-busting `sorgfaltbau_about_banner_v2_*` image filenames after Next image cache kept serving the old Onebbau banner path.
- Converted `public/uploads/Temp/sorgfaltbau_about_banner_1.webp` into responsive cache-busting `/about` banners as `sorgfaltbau_about_banner_v3_*` and switched the page metadata/schema/image sources to them.
- Converted `public/uploads/Temp/confident_contractor_at_sunset_construction_site.webp` into responsive `/why-us` hero banners as `sorgfaltbau_why_us_contractor_v2_*` and switched the page image/metadata sources.
- Removed the temporary `confident_contractor_at_sunset_construction_site.webp` source from `public/uploads/Temp` after publishing the responsive `/why-us` versions.
- Converted `public/uploads/Temp/Kontakt_SG.webp` into responsive `/contact` hero banners as `sorgfaltbau_contact_banner_v2_*` and removed the Temp source after publishing.
- Converted `public/uploads/Temp/Service_SG.webp` into responsive `/services` banner assets as `sorgfaltbau_services_banner_v2_*` and removed the Temp source after publishing.

### Prisma / Database

- Synced new Neon DB using Prisma.
- Upgraded Prisma from `6.19.2` to `7.7.0`.
- Added `prisma.config.ts`.
- Added `@prisma/adapter-pg`, `pg`, and runtime adapter setup.
- Verified DB connectivity with empty counts: contacts/gallery/news were `0`.

### Dependency Updates

- Upgraded Next.js to `16.2.5`.
- Upgraded React and React DOM to `19.2.5`.
- Upgraded next-intl to `4.12.0`.
- Added npm overrides for `picomatch` and `@hono/node-server`.

### Dev Stability

- Removed temporary `.tools` local Node folder.
- Removed stale `.next` cache when it caused type/cache errors.
- Disabled webpack filesystem cache in `next.config.mjs` due memory allocation failures.
- Scripts use webpack mode and `--max-old-space-size=4096`.

### Brand Color Update

- Switched CTA/buttons/active interactive states from orange to logo navy blue via Tailwind brand tokens.
- Updated global focus and selection color to the same navy blue.

### Testimonials Visual Update

- Restyled the testimonials/reviews section with a branded navy gradient background.
- Improved text/card contrast for readability.
- Added a subtle animated light-wave sweep when the section enters the viewport.
- Light-wave sweep repeats every 3 seconds while the reviews section remains in view.
- Testimonial service badges use fixed grid sizing so two-line labels align with other cards.
- Fixed broken mojibake quote characters in testimonial text rendering.
- Adapted testimonial card grid across mobile, tablet, and desktop so cards do not become too narrow.
- Rewrote testimonial comments and changed reviewer names in Russian and German.
- Rewrote testimonial intro/highlight copy in Russian and German to sound more trustworthy and professional.

### Trust Badges Visual Update

- Restyled the three hero trust cards with branded navy accents, stronger icon blocks, subtle numbering, and hover depth.

### Services Visual Update

- Restyled the homepage services section with a subtle grid background, animated light sweep, stronger category headers, service counts, numbered cards, icon hover states, and motion hover lift.
- Expanded the service catalog in Russian and German with missing work types: facade/armoring, natural stone, roof repairs, parking/drainage, water collectors, openings, welding/metal structures, chimney insulation, turnkey interior/bath works, wood floor restoration, stairs, mowing, emergency trees, wood splitting/stacking, and earth/garden work.
- Restyled the full `/services` page hero and lower sections to match the current SorgfaltBau navy/grid visual system and switched its catalog section to reuse the animated homepage services component with page-specific intro copy.
- Strengthened `/services` RU/DE SEO copy, metadata and structured business data around concrete indoor/outdoor work types and the Halle (Saale) service area.
- Added reusable service-area location cards with scroll reveals, custom non-official SVG shields, municipality-inspired color palettes and German registration-style codes such as `HAL`, `MER`, `L` and `DZ`; `/services` uses the full variant and `/about` uses the compact variant.

### Why Us Visual And Copy Update

- Restyled the homepage why-us section with the same branded background system, light sweep, numbered cards, icon hover states, and centered final row.
- Rewrote the five why-us reasons in Russian and German to sound more specific, reliable, and process-focused.
- Aligned the why-us card proof marker at the bottom of each card for symmetric layout.
- Restyled the full `/why-us` page to match the SorgfaltBau visual system: navy gradient hero, responsive contractor image, proof cards, highlighted trust rows, recommendation reasons, dark workflow section, audience cards, and scroll-triggered reveal effects.
- Added missing localized `/why-us` hero title split and proof-card translation keys in Russian and German.

### About Copy Update

- Rewrote homepage about text in Russian and German to sound more reliable, premium, and process-focused.
- Upgraded the homepage about experience badge into a localized trust signal with 10+ years, proof points, and branded styling.
- Restyled the full `/about` page to match the current SorgfaltBau visual system: navy gradient hero, grid textures, stronger image treatment, branded value/audience cards, and a dark process section.
- Rewrote `/about` RU/DE copy for a more confident, concrete, process-focused company presentation.
- Improved the `/about` hero headline readability with structured title lines, orange emphasis, and compact proof markers below the lead text.
- Added motion and hover effects to the `/about` hero proof cards, highlight rows, and right-side trust cards, including light sweeps, icon states, staggered fade-up, and lift effects.
- Added scroll-triggered reveal animations to the `/about` hero CTA buttons and stat cards, plus richer stat-card icons, accent lines, hover lift, light sweep, and numbered background markers.
- Converted the `/about` mobile hero proof cards and highlight rows to scroll-triggered `AnimateOnScroll` reveal animations with staggered timing instead of load-only CSS animation.
- Expanded the `/about` service-area list to 12 nearby cities/municipalities around Halle (Saale), including Leipzig.

### FAQ Visual And Copy Update

- Restyled the FAQ section to match the services/why-us standard: light grid background, animated light sweep, stronger question cards, numbered markers, and branded CTA.
- Added a small process checklist in the FAQ sidebar to clarify how questions, site review, scope, materials, timing, and extra work are handled.
- Rewrote FAQ copy in Russian and German to sound more specific, reliable, and process-focused.

### Contact Visual And Copy Update

- Restyled the homepage contact section as a branded dark CTA block with a navy gradient, subtle grid, animated light sweep, direct-contact panel, and stronger form card.
- Added contact proof points, clearer form intro/note copy, map CTA text, and better RU/DE request wording.
- Added `brand.light` Tailwind token so existing `brand-light` hover/gradient utilities render correctly.
- Restyled the full `/contact` page to match the SorgfaltBau visual system: navy gradient hero, new responsive contact image, direct contact cards, channel cards, dark response/process section, checklist panel, and scroll-triggered reveal effects.
- Reworked `/contact` RU/DE copy and metadata to be more direct, trustworthy, and process-focused.
- Moved contact-form delivery from Resend to Hostinger SMTP via Nodemailer and updated mailbox defaults to `service@sorgfaltbau.de`.
- Added Hostinger SMTP env examples and adjusted Datenschutzerklaerung RU/DE wording to describe Hostinger mail delivery.
- Added localized RU/DE customer auto-reply e-mails for submitted contact forms; confirmation failures are logged without turning an already accepted request into a client-side form error.
- Enabled browser autofill hints on the active contact form for customer name, e-mail, and telephone fields, and read submitted DOM form values so browser-filled data reaches the contact API reliably.
- Added a contact-form honeypot and in-process submission limits before SMTP sends: 6 requests per client IP per 15 minutes and 4 requests per recipient e-mail per hour on the current Node process.
- Aligned the two phone numbers in the `/contact` hero direct-contact card as equal clickable rows instead of primary/secondary text sizes.
- Kept contact-form mail `From` aligned to the SMTP mailbox domain; customer addresses remain in `Reply-To`, and invalid cross-domain `CONTACT_FROM_EMAIL` values fall back to the SMTP mailbox sender.
- Hardened contact-form deliverability after Gmail spam-header review: internal notifications and customer confirmations now use stable Latin subjects, explicit SMTP envelope senders, and confirmation e-mails include company contact details; MailChannels `X-MC-Relay: Junk/Bad` means a Hostinger/MailChannels relay classification issue, not SPF/DKIM/DMARC failure.
- Moved new admin gallery uploads and news cover uploads from runtime `public/uploads/*` writes to WebP bytes stored in PostgreSQL and served by `/api/gallery/media/[id]` and `/api/news/media/[id]` routes so Hostinger production deployments do not depend on uploaded files inside the Next build directory.
- Added Next image `localPatterns` for `/uploads/**`, `/images/**`, `/api/news/media/**`, and `/api/gallery/media/**`; news cover URLs include cache-busting query strings and must remain allowed for `next/image` in production.

### Header Navigation Update

- Restyled the mobile header menu as a branded drawer with a dark logo header, icon rows, active navigation state, language panel, contact CTA, backdrop close behavior, and scroll support on short viewports.
- Restyled desktop header navigation into a rounded glass panel with active page state and stronger hover/readability treatment for both solid inner-page headers and the homepage hero header.

### News Visual Update

- Restyled the public `/news` list page to match the SorgfaltBau visual system: navy gradient hero, light grid article area, branded news cards, orange accent details, and a dark CTA block while preserving the existing layout and data behavior.
- Kept news visibility consistent between `/news` and `/news/[slug]`: in production an article must be `published` and have `publishedAt <= now`; future-dated articles are treated as scheduled and should not be directly visible.

### Gallery Image Update

- Converted new PNG reference images from `public/uploads/Temp` to `1200x900` WebP files in `public/images`.
- Replaced the six homepage reference images and added three new homepage reference cards: parking/driveways, roof repair/insulation, and natural stone work.
- Added the same three categories to public gallery filters, admin gallery category selection, and the gallery upload API allow-list.
- Centralized gallery categories in `src/lib/galleryCategories.ts` and expanded them with additional service-based work types so admin upload categories, public gallery filters, and API validation stay in sync.

### Hero Readability Update

- Changed the hero location highlight to the logo orange accent token `brand-accent` and added a dark/orange text glow for better mobile video readability.
- Improved desktop hero readability with a subtle local navy radial backing behind the headline and a lighter text-shadow treatment so the text feels less washed out on bright image areas.

### Footer UX Update

- Added a localized footer "back to top" button with smooth scroll behavior and brand-accent hover styling.
- Restyled the full footer as a branded navy section with logo panel, service highlights, contact rows, legal links, grid texture, glow accents, and responsive layout.
- Center-aligned the footer logo, region badge, and column headings for a more symmetric footer composition.
- Kept footer navigation links left-aligned to match the services list rhythm.

### Contact Details Update

- Updated company address to `Waldmeisterstraße 19, 06120 Halle (Saale)`.
- Updated public phone handling to support primary `+49 176 623 76 777` and secondary `+49 176 237 95 681` numbers.
- Centralized address and phone fallbacks in `src/lib/contact.ts` and applied them to public pages, JSON-LD, legal pages, footer, and contact sections.

### Legal Pages Update

- Updated Impressum and Datenschutzerklärung owner data to `Iabangi Gheorghi`.
- Updated Gewerbeanmeldung details from the new document: Stadt Halle (Saale), Gemeindekennzahl `15002000`, Aktenzeichen `23/1258.01`, registered/beginning date `21.11.2024`, activity `Hausmeisterservice, Bauhelfer`.
- Replaced previous provider-identification wording with current `§ 5 DDG` wording and added legal reference links for Datenschutz, § 5 DDG, § 36 VSBG, and EU consumer redress bodies.

## Known Notes

- `npm audit` still reports issues tied to the requested `next@16.2.5` and its internal `postcss@8.4.31`.
- Build currently passes with `npm run build`.
- `pg` may warn about `sslmode=require`; later consider `sslmode=verify-full` in Neon `DATABASE_URL` if Neon accepts it.
