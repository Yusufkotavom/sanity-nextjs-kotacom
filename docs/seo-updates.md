# SEO Updates Log

This file is the canonical changelog for all repository updates, with explicit SEO impact notes.

## Entry Template

```md
## YYYY-MM-DD - Short Title
- Changed files:
  - path/to/file
- Summary:
  - ...
- SEO impact:
  - ...
- Verification:
  - ...
```

## 2026-04-01 - Stabilize Sanity Studio CI Deploy Targeting
- Changed files:
  - `.github/workflows/deploy-studio.yml`
  - `studio/sanity.cli.ts`
  - `studio/.env.example`
  - `README.md`
  - `docs/seo-updates.md`
- Summary:
  - Changed Studio deploy targeting in CLI config to prefer `deployment.studioHost` and only include `deployment.appId` when explicitly set.
  - Updated deploy workflow to stop requiring/passing `SANITY_STUDIO_APP_ID` in CI, reducing failures caused by stale or unauthorized app IDs.
  - Updated environment/documentation guidance to mark `SANITY_STUDIO_APP_ID` as optional for legacy/advanced targeting.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `SANITY_STUDIO_PREVIEW_URL=http://localhost:3000 SANITY_STUDIO_PROJECT_ID=ci-project SANITY_STUDIO_DATASET=production SANITY_STUDIO_HOSTNAME=ci-studio SANITY_STUDIO_API_VERSION=2026-03-23 pnpm --filter studio run build` passed.
  - `pnpm --filter studio run typecheck` failed due to pre-existing unrelated type errors in `studio/schemas/documents/redirect.ts`.

## 2026-04-01 - Global SEO Fallback Integration (Studio + Frontend)
- Changed files:
  - `studio/schemas/documents/seo-settings.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/sanity.config.ts`
  - `studio/schemas/blocks/shared/meta.ts`
  - `studio/schemas/documents/category.ts`
  - `frontend/sanity/queries/seo-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `frontend/app/layout.tsx`
  - `frontend/app/(main)/page.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `frontend/app/(main)/blog/[slug]/page.tsx`
  - `frontend/app/(main)/blog/page.tsx`
  - `frontend/app/(main)/blog/category/page.tsx`
  - `frontend/app/(main)/blog/category/[slug]/page.tsx`
  - `frontend/app/(main)/products/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `frontend/app/(main)/docs/[[...slug]]/page.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `frontend/sanity/queries/category.ts`
  - `frontend/app/api/revalidate/route.ts`
- Summary:
  - Added singleton `seoSettings` document in Studio for global metadata fallback.
  - Wired frontend metadata generation to use global fallback when per-document meta is empty.
  - Standardized metadata generation across dynamic and static routes.
  - Extended category schema/query to support SEO fields.
  - Updated webhook revalidation coverage for `seoSettings` updates.
- SEO impact:
  - Global fallback now works for title, description, canonical, OG image, and Twitter card metadata.
  - Studio and frontend SEO model are now integrated end-to-end.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Newsletter Build-Safe Resend Initialization
- Changed files:
  - `frontend/app/api/newsletter/route.ts`
- Summary:
  - Moved `Resend` initialization into request runtime.
  - Added env guards for API key and audience ID.
  - Awaited contact creation call so failures are caught correctly.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run build` passed after fix.

## 2026-04-01 - SEO Documentation, Agent Policy, and Skills
- Changed files:
  - `AGENTS.md`
  - `docs/seo-updates.md`
  - `skills/seo-update-log/SKILL.md`
  - `skills/sanity-seo-integration/SKILL.md`
- Summary:
  - Added repository-level agent policy requiring update log entry for every change.
  - Added canonical SEO updates documentation file and template.
  - Added two reusable skills for SEO integration workflow and changelog discipline.
- SEO impact:
  - Improves process consistency and traceability for future SEO-related changes.
- Verification:
  - File-level review completed.

## 2026-04-01 - Sanity Redirect Schema + Next.js Redirect Integration
- Changed files:
  - `studio/schemas/documents/redirect.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `frontend/next.config.mjs`
- Summary:
  - Added `redirect` document schema in Sanity Studio with validation for `source`, `destination`, `permanent`, and `isEnabled`.
  - Registered redirect schema in Studio and added Redirects list in desk structure.
  - Integrated `next.config.mjs` to fetch enabled redirects from Sanity at build time and merge with static redirects.
- SEO impact:
  - Redirect rules can now be managed by content editors in Studio and applied in Next.js build config.
  - Improves migration/link hygiene and reduces 404 risk when URL structures change.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.
- References:
  - https://www.sanity.io/learn/course/seo-optimization/implementing-redirects
  - https://www.sanity.io/docs/developer-guides/managing-redirects-with-sanity
  - https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects

## 2026-04-01 - Advanced SEO Alignment: Studio Fields + JSON-LD + Metadata Hardening
- Changed files:
  - `studio/schemas/blocks/shared/meta.ts`
  - `frontend/sanity/queries/shared/meta.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `frontend/components/seo/json-ld.tsx`
  - `frontend/lib/seo-jsonld.ts`
  - `frontend/app/(main)/blog/[slug]/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
- Summary:
  - Added SEO fields in Studio meta schema: `canonicalUrl`, `focusKeyword`, `secondaryKeywords`.
  - Synced frontend query contract for new SEO fields.
  - Hardened metadata fallback logic to handle null-safe canonical/title/description and support OG type selection (`website`/`article`).
  - Added reusable JSON-LD component and generators.
  - Implemented structured data output for detail pages:
    - Blog post: `Article` + `BreadcrumbList`
    - Product detail: `Product` + `BreadcrumbList`
    - Service detail: `Service` + `BreadcrumbList`
- SEO impact:
  - Front and Studio SEO models are better aligned with fewer fallback gaps.
  - Rich-result eligibility improved via structured data on critical templates.
  - Canonical override is now supported from Studio.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.
