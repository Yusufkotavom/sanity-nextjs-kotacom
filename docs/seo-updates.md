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

## 2026-04-01 - Dependabot Schedule Adjusted Back to Weekly
- Changed files:
  - `.github/dependabot.yml`
  - `docs/seo-updates.md`
- Summary:
  - Changed Dependabot interval from monthly back to weekly for root, frontend, studio, and GitHub Actions ecosystems.
  - Kept strict controls from prior change: PR limit `2` and grouped minor/patch updates.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Configuration review completed.

## 2026-04-01 - Dependabot Run Volume Reduction
- Changed files:
  - `.github/dependabot.yml`
  - `docs/seo-updates.md`
- Summary:
  - Reduced Dependabot schedule from weekly to monthly for npm (root/frontend/studio) and GitHub Actions ecosystems.
  - Lowered `open-pull-requests-limit` from 10 to 2 for each ecosystem.
  - Added grouping for minor/patch updates so multiple dependency updates are bundled into fewer PRs.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Configuration review completed.

## 2026-04-01 - Local Security Cleanup for Deploy Key File
- Changed files:
  - `.gitignore`
  - `docs/seo-updates.md`
- Summary:
  - Added `deploy/*.json` to git ignore rules to prevent accidental commits of deploy key JSON files.
  - Performed local cleanup workflow to keep sensitive deploy key material out of pushed history.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Local git history cleanup prepared; no push executed.

## 2026-04-01 - Detailed Dashboard-First SEO Setup Documentation
- Changed files:
  - `docs/seo-dashboard-setup.md`
  - `docs/env-reference.md`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated detailed guide for dashboard-first SEO operations setup with minimal env requirements.
  - Documented complete flows for first login bootstrap, Google Indexing API setup, IndexNow setup, runtime verification, and troubleshooting.
  - Added cross-links from env/setup docs to the new dashboard setup guide.
- SEO impact:
  - Reduces setup errors in indexing operations by clarifying operational steps and recovery flow.
- Verification:
  - Documentation review completed.

## 2026-04-01 - SEO Dashboard-First Config with Encrypted Studio Secrets
- Changed files:
  - `frontend/app/api/seo/config/save/route.ts`
  - `frontend/app/api/seo/config/status/route.ts`
  - `frontend/app/api/seo/auth/login/route.ts`
  - `frontend/app/api/revalidate/route.ts`
  - `frontend/app/dashboard/seo/settings/page.tsx`
  - `frontend/lib/seo-ops/crypto.ts`
  - `frontend/lib/seo-ops/settings-source.ts`
  - `frontend/lib/seo-ops/sanity-write.ts`
  - `frontend/lib/seo-ops/session.ts`
  - `frontend/lib/seo-ops/api-auth.ts`
  - `frontend/lib/seo-ops/config.ts`
  - `frontend/lib/seo-ops/jobs.ts`
  - `frontend/sanity/queries/seo-ops-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/middleware.ts`
  - `studio/schemas/documents/seo-ops-settings.ts`
  - `frontend/.env.example`
  - `docs/env-reference.md`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dashboard save API to persist SEO Ops config into singleton `seoOpsSettings` document in Sanity.
  - Added AES-GCM secret encryption/decryption layer for Google service account JSON and IndexNow key, using server-side key (`SEO_SETTINGS_ENCRYPTION_KEY` or fallback `SEO_SESSION_SECRET`/`REVALIDATE_SECRET`).
  - Converted runtime config resolution to Studio-first with env fallback, so Google/IndexNow toggles and operational defaults can be managed from dashboard.
  - Added password-hash support from Studio (`dashboardPasswordHash`) so dashboard login no longer depends on env password by default.
  - Updated settings UI to edit/save Google, IndexNow, webhook behavior, queue defaults, notes, and optional new dashboard password.
  - Updated env docs/examples to make dashboard-first configuration the default and env-based `SEO_*` values as legacy fallback.
- SEO impact:
  - Improves operational SEO control by moving indexing engine setup to no-code dashboard flow while keeping secrets protected.
  - No direct change to page metadata rendering.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Environment Reference for Frontend/Studio and SEO Ops
- Changed files:
  - `docs/env-reference.md`
  - `frontend/.env.example`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated environment reference for required and optional variables across frontend, studio, and SEO Ops runtime.
  - Added copy-ready `.env` examples for frontend and studio, including indexing and dashboard auth variables.
  - Added documented option for `GOOGLE_APPLICATION_CREDENTIALS` and password hash mode via `SEO_DASHBOARD_PASSWORD_SHA256`.
  - Linked new env and GSC docs from setup guide for faster onboarding.
- SEO impact:
  - Reduces operational risk from env misconfiguration for indexing, migration scoring, and SEO dashboard access.
- Verification:
  - Documentation review completed.

## 2026-04-01 - GSC Migration Curation Script Expansion
- Changed files:
  - `frontend/scripts/export-gsc-priority.mjs`
  - `docs/gsc-priority-export.md`
- Summary:
  - Expanded GSC export script to produce migration-focused outputs, not only page/query summaries.
  - Added configurable migration arguments: `blogBase`, `categoryBase`, `minImpressionsForAuto`, and optional sitemap enrichment via `sitemapUrl`.
  - Added extra GSC breakdown exports by country and device.
  - Added path normalization and legacy URL classification to generate actionable mapping fields (`legacyType`, `migrationAction`, `suggestedTargetPath`, `mappingConfidence`).
  - Added auto-redirect export file ready for bulk import after review.
- SEO impact:
  - Improves migration planning quality and reduces risk of losing high-performing URLs during URL structure changes.
  - Enables data-driven redirect prioritization using real clicks/impressions and migration confidence.
- Verification:
  - `node --check frontend/scripts/export-gsc-priority.mjs` passed.
  - Full run completed with service account:
    - `pnpm --filter frontend run gsc:export -- --site-url https://www.kotacom.id/ --start-date 2025-01-01 --end-date 2026-04-01 --out-dir ./tmp/gsc-kotacom-full --blog-base /blog --category-base /blog/category --min-impressions-auto 1 --sitemap-url https://kotacom.id/sitemap-0.xml`

## 2026-04-01 - SEO Ops Dashboard + Indexing Automation APIs
- Changed files:
  - `frontend/middleware.ts`
  - `frontend/app/dashboard/seo/*`
  - `frontend/app/api/seo/*`
  - `frontend/lib/seo-ops/*`
  - `frontend/app/api/revalidate/route.ts`
  - `frontend/sanity/queries/seo-ops-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/.env.example`
  - `studio/schemas/documents/seo-ops-settings.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/sanity.config.ts`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added protected SEO Ops Dashboard (`/dashboard/seo`) with modules for overview, indexing jobs, migration-priority curation, technical audit, and settings/import utilities.
  - Added SEO Ops APIs for auth, indexing submit/retry/jobs, migration-priority reporting, technical audit reporting, and data imports.
  - Added indexing queue engine adapters (Google Indexing API and IndexNow) with retry handling and job/task status tracking.
  - Integrated `/api/revalidate` so content webhook revalidation can auto-enqueue indexing jobs.
  - Added Studio singleton document `seoOpsSettings` for operational toggles/notes (non-secret config), plus frontend query surface.
  - Added new SEO Ops environment variable templates and setup documentation.
- SEO impact:
  - Improves indexing operations and migration prioritization workflows.
  - Adds operational controls and observability for submit/retry monitoring.
  - No direct change to metadata rendering logic beyond operational automation hooks.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Batch GSC Export and Migration Priority Scoring Script
- Changed files:
  - `frontend/scripts/export-gsc-priority.mjs`
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `docs/gsc-priority-export.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a CLI script to batch export Search Console data (`page`, `query`, and `page+query`) and generate migration-priority output.
  - Added URL scoring output (`priorityScore`, `recommendedAction`) to support selective migration of important pages first.
  - Added setup and usage guide for service-account auth and export command.
  - Registered `gsc:export` script in frontend workspace and added `googleapis` dependency.
- SEO impact:
  - Improves migration sequencing quality by prioritizing high-impact indexed URLs from GSC data.
- Verification:
  - `pnpm --filter frontend gsc:export -- --help` passed.

## 2026-04-01 - Global Robots + Category Noindex Controls
- Changed files:
  - `studio/schemas/documents/seo-settings.ts`
  - `frontend/sanity/queries/seo-settings.ts`
  - `frontend/app/robots.ts`
  - `frontend/app/sitemap.ts`
  - `frontend/app/(main)/blog/category/page.tsx`
  - `frontend/app/(main)/blog/category/[slug]/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added new global SEO controls in Studio: `noIndexBlogCategories`, `noIndexProductCategories`, `noIndexServiceCategories`, and `robotsDisallowPaths`.
  - Updated frontend SEO settings query to include the new fields.
  - Reworked `robots.txt` generation to use Studio global settings, including full-site noindex mode (`defaultNoIndex`) and optional disallow path list.
  - Reworked `sitemap.xml` generation to:
    - stop publishing URLs when `defaultNoIndex` is enabled,
    - include content URLs for page/post/product/service with `meta.noindex != true`,
    - include category URLs per surface (`/blog/category/[slug]`, `/products/[slug]`, `/services/[slug]`) only when relevant counts exist and global category noindex toggles are off.
  - Updated category metadata generation so global category noindex toggles are applied consistently for blog/product/service category pages.
- SEO impact:
  - Global indexing behavior can now be controlled centrally from Studio, including robots disallow rules.
  - Category indexing can now be switched off per surface globally while still supporting per-category `meta.noindex`.
  - Sitemap and metadata logic are now aligned with the same global + per-document noindex model.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Fix Reusable Section Orderable Schema Requirement
- Changed files:
  - `studio/schemas/documents/reusable-section.ts`
  - `docs/seo-updates.md`
- Summary:
  - Added required `orderRank` field (`orderRankField({ type: "reusableSection" })`) so `reusableSection` works with `orderableDocumentListDeskItem`.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Global Reusable Section with Placement Slots
- Changed files:
  - `studio/schemas/documents/reusable-section.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `frontend/sanity/queries/reusable-section.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/components/reusable-slot-sections.tsx`
  - `frontend/app/(main)/layout.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added new Sanity document type `reusableSection` so editors can create reusable block groups once and reuse them globally.
  - Added placement slot selection in Studio with four options: `beforeHeader`, `afterHeader`, `beforeFooter`, and `afterFooter`.
  - Added `isActive` and `priority` controls to manage publish behavior and render order without code changes.
  - Added frontend query/fetch flow to load active reusable sections and render selected blocks automatically in each layout slot.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Predefined Starter Content for Sanity Blocks
- Changed files:
  - `studio/schemas/blocks/hero/hero-1.ts`
  - `studio/schemas/blocks/hero/hero-2.ts`
  - `studio/schemas/blocks/section-header.ts`
  - `studio/schemas/blocks/cta/cta-1.ts`
  - `studio/schemas/blocks/grid/grid-card.ts`
  - `studio/schemas/blocks/grid/grid-row.ts`
  - `studio/schemas/blocks/grid/pricing-card.ts`
  - `studio/schemas/blocks/split/split-content.ts`
  - `studio/schemas/blocks/split/split-card.ts`
  - `studio/schemas/blocks/split/split-cards-list.ts`
  - `studio/schemas/blocks/split/split-info.ts`
  - `studio/schemas/blocks/split/split-info-list.ts`
  - `studio/schemas/blocks/split/split-row.ts`
  - `studio/schemas/blocks/timeline/timelines-1.ts`
  - `studio/schemas/blocks/timeline/timeline-row.ts`
  - `studio/schemas/blocks/forms/newsletter.ts`
  - `studio/schemas/blocks/logo-cloud/logo-cloud-1.ts`
  - `docs/seo-updates.md`
- Summary:
  - Added object-level `initialValue` on core page-builder blocks so newly inserted blocks are pre-populated instead of empty.
  - Seeded starter copy adapted from Kotacom-style messaging (IT services, website/software development, support, consultation CTA) for faster no-code editing.
  - Added nested starter items for complex blocks (`grid-row`, `split-row`, `timeline-row`) so editors get complete section scaffolds immediately.
  - Standardized starter CTA link objects to be valid with the shared `link` schema and shadcn/Geist-oriented button variants.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Studio Theme Color Picker with Geist Color List
- Changed files:
  - `studio/schemas/documents/settings.ts`
  - `frontend/sanity/queries/theme-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/app/layout.tsx`
  - `frontend/app/globals.css`
  - `docs/seo-updates.md`
- Summary:
  - Added `Settings > Theme Colors` in Sanity Studio so editors can change core UI colors without code changes.
  - Added `Theme Preset` selector with presets: `Neutral`, `Ocean`, `Sunset`, plus brand combinations `Brand Tricolor A/B/C` (red/blue/yellow exploration).
  - Replaced manual HEX-only input with dropdown lists based on a curated Geist-style color palette (`Default`, grayscale, blue, green, teal, amber, purple, red, rose).
  - Wired frontend layout to fetch preset + theme colors and inject CSS variables (`--studio-*`) at runtime.
  - Preset values auto-apply by default; individual color fields below the preset act as per-project overrides.
  - Updated global tokens to use Studio overrides for primary/accent/ring in both light and dark mode, with safe fallbacks.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Geist Typography Recipes and Component Adoption
- Changed files:
  - `frontend/app/globals.css`
  - `frontend/components/blocks/hero/hero-1.tsx`
  - `frontend/components/blocks/hero/hero-2.tsx`
  - `frontend/components/blocks/section-header.tsx`
  - `frontend/components/ui/product-card.tsx`
  - `frontend/components/ui/service-card.tsx`
  - `frontend/components/ui/post-card.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable typography utilities (`text-display-xl`, `text-display-lg`, `text-ui-body`, `text-ui-label`, `text-meta`) aligned with Geist hierarchy patterns.
  - Applied the new typography recipes across hero blocks, section headers, and content cards to reduce ad-hoc bold sizing and improve visual consistency.
  - Switched metadata lines (price/duration) to mono/tabular style via `text-meta`.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Geist-Inspired Global Color Token Remap
- Changed files:
  - `frontend/app/globals.css`
  - `docs/seo-updates.md`
- Summary:
  - Reworked global design tokens to a Geist-inspired semantic palette with explicit light/dark gray scales (`gray 1-10`) and background tiers (`background 1/2`).
  - Remapped existing app tokens (`background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, sidebar tokens) to the new scale without changing component structure.
  - Preserved compatibility for existing components by keeping the same semantic token names.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Switch Frontend Typography to Vercel Geist
- Changed files:
  - `frontend/app/layout.tsx`
  - `frontend/app/globals.css`
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `docs/seo-updates.md`
- Summary:
  - Replaced `Inter` setup with `GeistSans` and `GeistMono` in the Next.js root layout.
  - Applied official Geist CSS variables globally and ensured code-like elements (`code`, `kbd`, `samp`, `pre`) use mono typography.
  - Added `geist` dependency to frontend workspace.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Footer Full Menu from Sanity Navigation
- Changed files:
  - `frontend/components/footer.tsx`
  - `studio/schemas/documents/navigation.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `docs/seo-updates.md`
- Summary:
  - Upgraded footer to render a full multi-column menu sourced from `Navigation` links and their `Sub Menu` items (with `group` section labels).
  - Kept primary navigation links visible in the footer and added social links row with platform icons.
  - Clarified Studio field descriptions so editors know that Navigation/Sub Menu configuration is reused by footer.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter studio run build` passed.

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

## 2026-04-01 - Fix Studio CI Type Errors for Redirect Schema
- Changed files:
  - `studio/schemas/documents/redirect.ts`
- Summary:
  - Fixed TypeScript validator typings in redirect schema for Sanity v5 compatibility.
  - Replaced overly strict `Rule` annotations with Sanity-compatible callback signatures.
- SEO impact:
  - No direct SEO behavior change.
  - Restores CI stability so redirect model can be safely built/deployed.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Fix Deploy Workflow Non-Interactive Prompt (Studio)
- Changed files:
  - `.github/workflows/deploy-studio.yml`
- Summary:
  - Added `SANITY_STUDIO_APP_ID` as required variable in deploy workflow checks.
  - Passed `SANITY_STUDIO_APP_ID` into Studio build and deploy step environments.
- SEO impact:
  - No direct SEO behavior change.
  - Restores automated Studio deployment reliability.
- Verification:
  - Root cause validated from GitHub Actions logs: non-interactive `select` prompt during `sanity deploy`.

## 2026-04-01 - Force Unattended Sanity Studio Deploy in CI
- Changed files:
  - `.github/workflows/deploy-studio.yml`
- Summary:
  - Updated deploy step command from `pnpm run deploy` to `pnpm exec sanity deploy --yes --no-build`.
  - Ensures CI deploy is fully non-interactive and reuses the Studio build artifact from the prior step.
- SEO impact:
  - No direct SEO behavior change.
  - Improves deployment reliability for SEO schema/content updates managed in Studio.
- Verification:
  - `sanity deploy --help` confirms `--yes` enables unattended mode.

## 2026-04-01 - Vercel-Style Navigation Model and Header UX Alignment
- Changed files:
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `studio/schemas/documents/navigation.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/footer.tsx`
- Summary:
  - Added navigation data controls in Studio for Vercel-like structure:
    - `navLocation` (`primary` or `utility`) to control link placement.
    - `showInFooter` toggle to control footer visibility.
    - Child link `description` and `badge` fields for richer dropdown panels.
  - Updated frontend navigation query to fetch child `description` and `badge`.
  - Refactored desktop header navigation to Vercel-style behavior:
    - Primary top-level links stay compact.
    - Child links render in grouped hover/focus dropdown panels.
    - Utility/CTA links render on the right with button variants.
  - Updated mobile menu to separate `Primary` and `Utility` sections and show child badge/description.
  - Updated footer to respect `showInFooter` and separate utility links into CTA-style actions.
- SEO impact:
  - No direct SEO metadata/schema change.
  - Improves information architecture consistency and internal link presentation across header/footer.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Navigation Icon Picker with Preview (Studio) + Frontend Icon Rendering
- Changed files:
  - `studio/schemas/blocks/shared/navigation-icon-options.tsx`
  - `studio/schemas/inputs/navigation-icon-input.tsx`
  - `studio/schemas/blocks/shared/navigation-icon.ts`
  - `studio/schema-types.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `frontend/components/icons/navigation-icons.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
- Summary:
  - Added a dedicated `navigation-icon` schema type with a custom Studio input component that shows icon preview cards and supports icon search.
  - Replaced plain string icon fields on navigation link and child link schemas with the new picker type.
  - Added a curated navigation icon catalog (Vercel-like IA-friendly set) and preserved backward compatibility for older social icon values.
  - Updated frontend header navigation (desktop + mobile) to render selected icons for primary links, submenu links, and utility/CTA links.
- SEO impact:
  - No direct SEO metadata change.
  - Improves navigation clarity and scannability, supporting better internal-link discoverability for users.
- Performance/PageSpeed impact:
  - Low impact: icons are lightweight SVG components and only rendered where configured.
  - No additional network request for icon fonts/sprites.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - De-duplicate Global Site Name Between Settings and SEO Settings
- Changed files:
  - `studio/schemas/documents/settings.ts`
  - `studio/schemas/documents/seo-settings.ts`
  - `frontend/sanity/queries/settings.ts`
  - `frontend/sanity/queries/seo-settings.ts`
  - `frontend/sanity/lib/metadata.ts`
- Summary:
  - Refactored Studio so brand/site naming is managed in a single place:
    - `settings.siteName` editor field replaced by `settings.brandName`.
    - `seoSettings.siteName` field removed to avoid duplicate editing source.
  - Added prefilled defaults:
    - `settings.brandName` initial value: `Schema UI`.
    - `seoSettings.defaultTitle` and `seoSettings.defaultDescription` now have initial values.
  - Added backward-compatible query fallback:
    - Frontend settings query still exposes `siteName` via `coalesce(brandName, siteName, "Schema UI")`.
  - Updated metadata generation to resolve site name from `Settings` and use it as SEO fallback source.
- SEO impact:
  - Clarifies single source of truth for global site name and reduces misconfiguration risk.
  - Preserves stable metadata output through fallback logic for existing content.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Header CTA + Move Theme Control Into Menu + Frontend/Backend Sync Policy
- Changed files:
  - `studio/schemas/documents/navigation.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/header-menu.tsx`
  - `AGENTS.md`
- Summary:
  - Added CMS-driven `headerCta` field in Navigation document for a single desktop header CTA button.
  - Updated navigation query and desktop/mobile header rendering to use `headerCta` with fallback from existing utility links.
  - Moved theme control out of always-visible header into menu patterns:
    - Desktop: new top-right dropdown menu with Appearance selector.
    - Mobile: Appearance section inside sheet menu.
  - Updated project agent policy to require frontend changes that depend on CMS/config data to be cross-checked and integrated with Studio schema + query + fetch layers.
- SEO impact:
  - No direct SEO metadata changes.
  - Improves stable IA/UX consistency for primary navigation and call-to-action exposure.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - CI Env Alignment With GitHub Vars/Secrets (Remove Dummy Sanity Project)
- Changed files:
  - `.github/workflows/ci.yml`
- Summary:
  - Updated Frontend CI env to use repository `vars` and `secrets` instead of placeholder values (`ci-project`, `ci-read-token`).
  - Updated Studio CI env to use `SANITY_STUDIO_*` vars (with sensible fallback chaining) instead of hardcoded dummy values.
  - Keeps basic fallback defaults only for non-critical URLs to avoid empty-value crashes.
- SEO impact:
  - No direct SEO schema/metadata behavior change.
  - Restores CI build reliability for Sanity-backed pages and redirect loading.
- Verification:
  - Workflow patch validated against previous CI failure signature (`Dataset not found for project ID "ci-project"`).

## 2026-04-01 - GSC Curation Pipeline Hardening (Index Inspection + Metadata Health)
- Changed files:
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `frontend/scripts/export-gsc-priority.mjs`
  - `frontend/scripts/inspect-gsc-index.mjs`
  - `frontend/scripts/audit-seo-metadata.mjs`
  - `frontend/scripts/merge-gsc-migration-health.mjs`
  - `docs/gsc-priority-export.md`
- Summary:
  - Added/ensured `googleapis` dependency so GSC export + URL Inspection scripts run reliably.
  - Fixed URL normalization in export and inspection scripts to preserve `www` hostname (required for URL-prefix property ownership checks in URL Inspection API).
  - Completed full GSC curation run for `https://www.kotacom.id/` (2025-01-01 to 2026-04-01), including migration mapping, URL Inspection, metadata audit, and merged health output.
  - Output directory:
    - `frontend/tmp/gsc-kotacom-full/`
  - Main outputs:
    - `gsc-migration-curation.csv`
    - `gsc-redirect-auto-import.csv`
    - `gsc-url-inspection.csv`
    - `seo-metadata-audit.csv`
    - `gsc-migration-health-merged.csv`
- SEO impact:
  - Direct SEO operations impact: migration planning now includes indexability + metadata quality status in one merged dataset.
  - Reduces redirect risk by prioritizing URLs based on search performance and inspection evidence.
- Verification:
  - `pnpm --filter frontend add -D googleapis` passed.
  - `pnpm --filter frontend gsc:export -- --site-url https://www.kotacom.id/ --start-date 2025-01-01 --end-date 2026-04-01 --out-dir ./tmp/gsc-kotacom-full ...` passed.
  - `pnpm --filter frontend exec node scripts/inspect-gsc-index.mjs -- --site-url https://www.kotacom.id/ --input-csv ./tmp/gsc-kotacom-full/gsc-pages.csv --out-dir ./tmp/gsc-kotacom-full --concurrency 15` passed.
  - `pnpm --filter frontend exec node scripts/audit-seo-metadata.mjs -- --input-csv ./tmp/gsc-kotacom-full/gsc-pages.csv --out-dir ./tmp/gsc-kotacom-full --concurrency 8` passed.
  - `pnpm --filter frontend exec node scripts/merge-gsc-migration-health.mjs -- --migration-csv ./tmp/gsc-kotacom-full/gsc-migration-curation.csv --inspection-csv ./tmp/gsc-kotacom-full/gsc-url-inspection.csv --metadata-csv ./tmp/gsc-kotacom-full/seo-metadata-audit.csv --out-dir ./tmp/gsc-kotacom-full` passed.
