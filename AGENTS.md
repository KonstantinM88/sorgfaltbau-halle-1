# AGENTS.md

## Project

SorgfaltBau website for `sorgfaltbau-halle.de`.

Base project was originally adapted from `onebbau.de`; old brand references should not be reintroduced.

## Stack

- Next.js `16.2.3` App Router
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
- `NEXT_PUBLIC_EMAIL`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`
- `RESEND_API_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET`

After changing `ADMIN_JWT_SECRET`, old admin cookies become invalid. Clear browser cookies or visit `/api/auth/logout`, then log in again at `/admin/login`.

## Completed Work Log

### Rebrand from Onebbau to SorgfaltBau

- Replaced old text references to `Onebbau`, `onebbau.de`, and related fallbacks.
- Updated metadata, JSON-LD, footer, contact e-mail fallbacks, admin labels.
- Updated production site URL to `https://www.sorgfaltbau-halle.de`.

### Assets

- Converted uploaded `hero-sb.png` to `hero-sb.webp`.
- Converted `hero-b-video.mp4` to `hero-b-video.webm`.
- Created optimized mobile hero video/poster assets in portrait format.
- Cropped `logo-sb.png` into header/footer webp logo assets.
- Copied old section banners to new `sorgfaltbau_*` names so existing pages do not break.
- Generated a new branded `favicon.ico` route.

### Prisma / Database

- Synced new Neon DB using Prisma.
- Upgraded Prisma from `6.19.2` to `7.7.0`.
- Added `prisma.config.ts`.
- Added `@prisma/adapter-pg`, `pg`, and runtime adapter setup.
- Verified DB connectivity with empty counts: contacts/gallery/news were `0`.

### Dependency Updates

- Upgraded Next.js to `16.2.3`.
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

## Known Notes

- `npm audit` still reports issues tied to the requested `next@16.2.3` and its internal `postcss@8.4.31`.
- Build currently passes with `npm run build`.
- `pg` may warn about `sslmode=require`; later consider `sslmode=verify-full` in Neon `DATABASE_URL` if Neon accepts it.
