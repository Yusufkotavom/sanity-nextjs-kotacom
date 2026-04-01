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
