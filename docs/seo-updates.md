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

## 2026-04-02 - Final SEO Snippet Guard Tuning (Short + Long Normalization)
- Changed files:
  - `frontend/lib/legacy-pages/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Enhanced metadata normalization to handle both edges:
    - title: normalized for too short and too long values
    - description: normalized for too short and too long values
  - This ensures rewrite-route metadata snippets remain consistently SEO-friendly without manual per-page adjustment.
- SEO impact:
  - Direct SEO impact: improves SERP snippet consistency and readability by maintaining practical title/description bounds across legacy rewrite routes.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Wave 2 SEO Rewrite Power-Up (Priority Slug Overrides + Meta Length Guard)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/lib/legacy-pages/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added priority commercial copy overrides for 10 money-page slugs across printing/website/software clusters (stronger final CTA title/description positioning).
  - Fixed enrichment consistency gap for `sistem-pos` by routing it through centralized SEO enrichment pipeline.
  - Added metadata guard (`normalizeMetaDescription`) in legacy metadata generator to keep generated meta descriptions within SEO-friendly length target (~120-155 chars) with safe truncation.
- SEO impact:
  - Direct SEO/integration impact: stronger conversion intent signals on high-value rewrite routes + improved snippet readability/consistency on SERP due to controlled description length.
  - No CMS schema/query contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Intent-Based SEO Rewrite Enrichment (Slug Pattern Packs)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extended centralized rewrite SEO enrichment with slug-intent packs for high-intent patterns (`harga/biaya`, `migrasi`, `toko-online/ecommerce`, `cetak-buku/buku`, `kalender`, `implementasi/instalasi`).
  - Added intent-driven keyword expansion and FAQ injection by slug pattern, while preserving dedupe/length guardrails in the enrichment flow.
  - Added default quick CTA links and normalized final CTA copy for key commercial sections (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) when route copy does not define them.
- SEO impact:
  - Direct SEO/integration impact: higher intent coverage and stronger commercial relevance per route family without manual per-page rewrite.
  - No schema/query contract changes (content generation layer only).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Content SEO Power Enrichment Layer (Centralized)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added centralized `enrichCopyForSeo` layer in rewrite-content pipeline and applied it across all `buildLegacyRewriteCopy` return paths.
  - Enrichment includes semantic keyword expansion + deduplication, stronger conversion-oriented intro/description normalization, FAQ intent expansion, and section-level default long-guide generation for major clusters.
  - This makes rewrite pages more content-rich and SEO-oriented without requiring per-route manual text patching.
- SEO impact:
  - Direct SEO/integration impact: improves topical relevance breadth, semantic keyword coverage, and intent-answer depth on rewrite routes.
  - No CMS schema/query contract changes required (code-driven rewrite content layer only).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - SEO Fallback Images Unified to ZIP Source (OG/Twitter/JSON-LD)
- Changed files:
  - `frontend/lib/illustrations/kotacom-split.ts`
  - `frontend/lib/seo-jsonld.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added centralized SEO fallback image constant in illustration source map (`KOTACOM_SPLIT_DEFAULT_SEO_IMAGE`).
  - Updated JSON-LD image resolver fallback to use the split-pack SEO image instead of legacy `/images/og-image.jpg`.
  - Updated metadata resolver fallback (OpenGraph/Twitter image) to use the same centralized split-pack SEO image.
- SEO impact:
  - Direct SEO/integration impact: social preview and structured data fallback imagery are now aligned to a consistent branded illustration source.
  - Preserved existing fallback hierarchy behavior (`meta.image` -> `page.image` -> `seo.defaultImage` -> centralized ZIP fallback).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Enriched About/Contact/404 + Added Global Micro Badge Strip from ZIP Source
- Changed files:
  - `frontend/components/micro-badges.tsx`
  - `frontend/components/ui/rewrite/page-shell.tsx`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/404.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable `MicroBadges` component using ZIP-sourced badge assets (`fast response`, `secure process`, `guarantee`, `nationwide delivery`, `custom request`).
  - Wired micro badges into rewrite and legacy page shells so pages that use these shells inherit the new trust-strip visual block.
  - Added section-based hero image mapping in rewrite shell so `about` and `contact` pages now automatically render split-pack hero illustrations.
  - Enriched 404 UI with dedicated split-pack 404 state image and integrated micro badge strip.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual/trust UX enrichment only; no CMS schema/query/metadata contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - ZIP Asset Mapping Centralization for All Illustration Consumers
- Changed files:
  - `frontend/lib/illustrations/kotacom-split.ts`
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added centralized illustration source map (`kotacom-split.ts`) that points to extracted ZIP assets under `/images/kotacom-split-production-ready`.
  - Migrated all active illustration consumers in rewrite/city-shell/style-guide to use centralized mapping constants instead of scattered hardcoded image paths.
  - Updated legacy landing sections proof-image fallback to the same centralized ZIP-based source to keep behavior consistent across UI variants.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: unified image source contract for illustration components, reducing path drift and easing future asset swaps.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Integrated `kotacom-split-production-ready` Assets into Active Rewrite UI
- Changed files:
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced legacy `images/percetakan/*.svg` illustration references with extracted production pack assets under `images/kotacom-split-production-ready/*`.
  - Wired `jasa-cetak-buku` city-shell hero to production hero image (`hero-cetak-buku-shark-v2.png`).
  - Updated rewrite landing defaults for service cards and proof cards with production-ready printing/website/IT/proof illustration files.
  - Updated `/style-guide` gallery sections (hero/service/support) to display new production pack assets.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: stronger visual consistency on CMS-driven rewrite pages and style-guide reference surfaces.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Extracted `kotacom-split-production-ready` Illustration Bundle
- Changed files:
  - `frontend/public/images/kotacom-split-production-ready/**`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extracted `frontend/public/images/kotacom-split-production-ready.zip` into `frontend/public/images/kotacom-split-production-ready/`.
  - Bundle contains normalized/cropped PNG shark mascot assets grouped by production categories (`hero`, `services/*`, `ui`, `proof`, `micro`, `states`, `about`, `contact`, plus `archive`).
  - Verified manifest and readme presence for direct integration mapping.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: ready-to-use visual assets for redesign/remodeling sections and service pages.
- Verification:
  - `unzip -l` verified archive index (53 entries total including manifest/readme).
  - `manifest.json` validated with `count: 51` asset file list.

## 2026-04-02 - Prompt Hardening + Priority-1 Illustration Regeneration (`v2`)
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `frontend/public/images/illustrations/hero/hero-jasa-cetak-buku-shark-v2.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-pod-shark-v2.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-offset-shark-v2.jpg`
  - `frontend/public/images/illustrations/services/service-finishing-jilid-shark-v2.jpg`
  - `frontend/public/images/illustrations/cta/cta-konsultasi-cetak-buku-shark-v2.jpg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added `Consistency Prompt Lock v2` section to the shark illustration master doc with stricter mascot/style/palette/composition constraints.
  - Added detailed regeneration prompts for the Priority-1 `jasa-cetak-buku` pack (hero, POD, offset, finishing, CTA).
  - Regenerated all 5 priority illustration assets as `-v2` variants using the hardened prompts.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual asset consistency improved for upcoming route-level migration/remodeling integration.
- Verification:
  - `file` command check passed for all regenerated outputs (valid JPEG image files, `1280x768`).

## 2026-04-02 - Priority-1 KOTA SHARK Illustration Generation (Jasa Cetak Buku Pack)
- Changed files:
  - `frontend/public/images/illustrations/hero/hero-jasa-cetak-buku-shark.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-pod-shark.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-offset-shark.jpg`
  - `frontend/public/images/illustrations/services/service-finishing-jilid-shark.jpg`
  - `frontend/public/images/illustrations/cta/cta-konsultasi-cetak-buku-shark.jpg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Generated first priority illustration pack based on `docs/flat-illustration-shark-plan.md` for `jasa-cetak-buku` workflow.
  - Produced 5 web-ready shark-mascot assets covering hero, core services (POD, offset, finishing), and conversion CTA visual.
  - Saved outputs in the standardized illustration directory structure for upcoming route/component integration.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual content assets prepared for migration/remodeling implementation; no schema/query/metadata contract changes in this step.
- Verification:
  - `file` command check passed for all outputs (valid JPEG image files, `1280x768`).

## 2026-04-02 - Kotacom Logo Remodeling Integration (Default Brand Asset + Style Guide Sync)
- Changed files:
  - `frontend/components/logo.tsx`
  - `frontend/public/images/branding/kotacom-logo.svg`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added official `kotacom.id` SVG logo asset into frontend public branding directory and wired it as the default logo fallback.
  - Refactored shared `Logo` component so Sanity-driven logo remains primary when available, while defaulting to the official Kotacom brand logo when CMS logo is empty.
  - Updated `/style-guide` page with a dedicated brand section showing integrated logo usage and key visual brand cues used in migration.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: improved cross-page branding consistency for migration UI shell while preserving existing CMS query/schema logo contract.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Manual cross-layer sync check completed: Studio `settings.logo` schema, frontend settings query (`SETTINGS_QUERY`), and frontend logo render fallback remain aligned.

## 2026-04-02 - Sticky WhatsApp Icon Switched to WhatsApp Brand Glyph
- Changed files:
  - `frontend/components/floating-whatsapp-client.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced generic message bubble icon in sticky WhatsApp button with a dedicated WhatsApp brand-style SVG icon.
  - Preserved existing animation, CTA text behavior, and tracking link generation logic.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI-only update for clearer WhatsApp affordance.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Local Dev Stability Switch (`next dev --webpack`)
- Changed files:
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Switched frontend local dev script from Turbopack to Webpack (`next dev --webpack`) to avoid persistent Turbopack workspace-root inference failure in monorepo environment.
  - Keeps production build path unchanged (`next build`), while restoring reliable local startup for ongoing migration work.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: dev-runtime reliability improvement only.
- Verification:
  - Script-level change validated in `frontend/package.json`.
  - Runtime verification to be confirmed in user environment by re-running `pnpm dev`.

## 2026-04-02 - Turbopack Root Revert for Package-Local Resolution (`next`/`tailwindcss`)
- Changed files:
  - `frontend/next.config.mjs`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reverted `turbopack.root` from workspace root back to frontend package root (`__dirname`).
  - Prevents Turbopack from resolving dependencies from the wrong package boundary, which caused `next/package.json` and `tailwindcss(.css)` lookup failures under `frontend/app`.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: restores local frontend dev runtime stability for migration/SEO work.
- Verification:
  - Config-level validation completed; `turbopack.root` points to frontend package directory.
  - Runtime verification to be confirmed via clean local dev restart (`pnpm dev`) after cache reset.

## 2026-04-02 - Global Vercel-Style Grid Background Utility
- Changed files:
  - `frontend/app/globals.css`
  - `frontend/app/(main)/layout.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable global utility class `bg-grid-vercel` using dual linear-gradients (x/y) with radial mask for subtle Vercel-style square grid effect.
  - Applied `bg-grid-vercel` to main layout wrapper (`app/(main)/layout.tsx`) so all main pages inherit a consistent grid background layer.
  - Kept existing `ui-shell` background system intact; grid layer is additive and low-opacity.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual layer update only (no schema/query/metadata changes).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Mobile Nav Loop Hard-Fix (Remove `useEffect` State Init)
- Changed files:
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed `useEffect`-based `openGroups` initialization entirely to eliminate update-loop risk in dev runtime.
  - Added `defaultOpenGroupKeys` memo and moved open/close group initialization to `Sheet` `onOpenChange` event (`open => all groups`, `close => []`).
  - Keeps accordion behavior and full-open default state, while avoiding reactive dependency churn.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: fixes client-side stability issue in mobile navigation.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Fix Mobile Nav Infinite Render Loop (`Maximum update depth exceeded`)
- Changed files:
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Stabilized navigation-derived arrays with `useMemo` (`navItems`, `primaryItems`, `utilityItems`) to prevent effect dependency churn on every render.
  - Hardened `openGroups` initialization effect so state updates occur only when computed group keys actually change.
  - Removed unconditional `setOpenGroups([])` loop pattern when drawer closes.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: fixes client-side runtime crash in mobile navigation UI.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Footer Clean Mode (No Background/Button Surface)
- Changed files:
  - `frontend/components/footer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed button-style surface treatment from footer primary/utility links and converted them to plain text-link navigation.
  - Removed extra rounded wrapper styling from footer navigation columns so footer renders with no background panel/card feel.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI-only cleanup for footer visual consistency.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Mobile Navigation Full-Accordion + Icon Alignment
- Changed files:
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated mobile navigation drawer to full-width/full-height presentation with accordion groups open by default when menu is opened.
  - Preserved accordion interaction (each group remains collapsible/expandable) while improving full-menu visibility for faster scanning.
  - Adjusted icon placement for leaf/child links to right-aligned treatment for cleaner visual rhythm.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI/navigation presentation update only (route/query/schema unchanged).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Turbopack Root Fix for Dev Boot (`frontend/app` resolution error)
- Changed files:
  - `frontend/next.config.mjs`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated `turbopack.root` from frontend package directory to workspace root (`path.join(__dirname, "..")`) in monorepo setup.
  - This prevents Turbopack from resolving project context from `frontend/app` and fixes the `couldn't find next/package.json` startup failure.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: stabilizes local dev runtime so migration/SEO implementation can proceed without Turbopack boot errors.
- Verification:
  - Config-level validation completed; `next.config.mjs` now resolves root to monorepo workspace path.
  - Runtime verification to be confirmed in user local environment (`pnpm dev`) because sandbox cannot bind to port 3000.

## 2026-04-02 - Footer Navigation Cleanup (Remove Card Surface)
- Changed files:
  - `frontend/components/footer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed `surface-muted` card treatment from footer navigation column wrapper so footer links render in a cleaner flat style.
  - Kept footer navigation grouping and hierarchy intact; only visual container styling changed.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI-only cleanup on footer navigation presentation.
- Verification:
  - Manual code review on footer render path completed (navigation links/groups unchanged).

## 2026-04-02 - Home Background Cleanup (Remove Blue Glow Accent)
- Changed files:
  - `frontend/app/globals.css`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated global `ui-shell` glow token (`--glow-top`) in both light and dark themes from blue-tinted radial gradient to neutral grayscale tint.
  - Keeps existing separator and surface system intact while removing blue cast visible on Home background.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual consistency improvement only (no metadata/schema/query contract changes).
- Verification:
  - Manual CSS token check completed (`--glow-top` light/dark values updated).

## 2026-04-02 - Env Matrix Sync (`.env.example` + Deploy Env Templates)
- Changed files:
  - `frontend/.env.example`
  - `studio/.env.example`
  - `docs/env-reference.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Synced frontend env example with missing runtime keys used in code (`RESEND_AUDIENCE_ID`) and added complete optional migration/audit script env key list.
  - Updated Studio env example to include explicit `SANITY_STUDIO_AI_WRITER_ACTION_SECRET` for `AI Rewrite` action parity.
  - Updated env reference doc to reflect newsletter audience ID, `SEO_BING_INDEXNOW_ALIAS`, migration/audit env keys, and refreshed quick-start samples.
  - Updated local deploy env templates (`deploy/env/*`) by adding missing keys only (kept existing real values unchanged) for frontend, studio, and GitHub Actions usage.
- SEO impact:
  - No direct SEO rendering impact.
  - Integration impact: lowers env drift risk between local/dev/deploy and stabilizes AI Writer + SEO Ops runtime configuration.
- Verification:
  - Manual cross-check against `process.env.*` usage in `frontend/` and `studio/` completed.
  - Env key parity rechecked across `.env.example` and docs references.

## 2026-04-02 - Next Dev Warning Cleanup (`turbopack.root` + `proxy.ts`)
- Changed files:
  - `frontend/next.config.mjs`
  - `frontend/proxy.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added explicit `turbopack.root` in Next config to avoid workspace root inference warning caused by multiple lockfiles.
  - Migrated deprecated `middleware.ts` convention to `proxy.ts` and updated exported handler name to `proxy`.
  - Updated migration snapshot to record tooling cleanup.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: cleaner local/dev runtime signal and reduced warning noise during content migration operations.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Legacy Content Rendering Finetune (HTML/Markdown Lists & Structure)
- Changed files:
  - `frontend/lib/legacy-content/render.ts`
  - `frontend/components/blocks/legacy-rich-content.tsx`
  - `frontend/components/portable-text-renderer.tsx`
  - `frontend/app/globals.css`
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced regex-only legacy renderer with parser pipeline based on `unified` (`rehype-parse`, `rehype-sanitize`, `rehype-stringify`, `remark-parse`, `remark-rehype`) for more stable HTML/Markdown rendering.
  - Added sanitization schema and external link normalization to reduce broken/unsafe legacy markup while preserving semantic structures.
  - Added `legacy-prose` style system in global CSS to improve visual consistency for headings, bullet/number lists, links, tables, blockquotes, and spacing.
  - Switched legacy content render targets (`page` block renderer and `PortableText` custom type renderer) to use `legacy-prose`.
- SEO impact:
  - Direct integration impact: improved readability and structural clarity for migrated long-form content (including lists and numbered steps), reducing malformed rendering risk on indexable pages.
  - No metadata schema contract change.
- Verification:
  - `pnpm install` completed with lockfile update.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Legacy Rich Content Block + Safe-ID Import Validation
- Changed files:
  - `studio/schemas/blocks/legacy/legacy-rich-content.ts`
  - `studio/schema-types.ts`
  - `studio/schemas/documents/page.ts`
  - `studio/schemas/blocks/shared/block-content.ts`
  - `frontend/sanity/queries/legacy/legacy-rich-content.ts`
  - `frontend/sanity/queries/page.ts`
  - `frontend/lib/legacy-content/render.ts`
  - `frontend/components/blocks/legacy-rich-content.tsx`
  - `frontend/components/blocks/index.tsx`
  - `frontend/components/portable-text-renderer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a shared `legacy-rich-content` schema object to support raw `markdown` or `html` content ingestion for migration paths.
  - Wired the new block across Studio and frontend contracts: available in `page.blocks`, available in `post.body` (`block-content`), queried in page GROQ, and rendered in both page block renderer and Portable Text renderer.
  - Added lightweight markdown/html rendering utility with basic sanitization for HTML and markdown-to-HTML conversion for migration-ready rendering.
  - Validated critical import behavior: documents using dotted IDs can be missing from unauthenticated published reads; switched import IDs to non-dotted `legacy-*` format.
  - Executed Sanity import smoke test: imported 2 pages (`import-page-html-20260402`, `import-page-md-20260402`) and 2 posts (`import-post-html-20260402`, `import-post-md-20260402`) and verified they are visible in both public and authenticated published queries.
- SEO impact:
  - Direct SEO/integration impact: imported legacy content can now be rendered with controlled md/html handling while preserving root/blog slug architecture.
  - Import visibility reliability improved by enforcing safe non-dotted `_id` strategy for page/post migration docs.
- Verification:
  - Sanity mutate transaction succeeded for 4 docs (`2 page + 2 post`) with published visibility checks (`public` and `auth`) both returning the imported slugs.
  - Manual API parity check confirmed the safe-ID docs are readable in unauthenticated published query.

## 2026-04-02 - Local Main Branch Alignment + Deploy Trigger
- Changed files:
  - `studio/.ci-trigger.txt`
  - `docs/seo-updates.md`
- Summary:
  - Switched local development branch to `main` to align daily work with primary remote branch.
  - Updated deploy trigger marker file with a fresh timestamp to trigger deployment without functional code changes.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `git status` reviewed; only intended files changed.

## 2026-04-02 - Legacy Landing v4 (Icons + Visual Sections + FAQ Schema)
- Changed files:
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/legacy/legacy-highlights.tsx`
  - `frontend/components/legacy/legacy-process-faq.tsx`
  - `frontend/lib/seo-jsonld.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Upgraded legacy rewrite template to richer landing composition: quick navigation (TOC), service types, pricing tiers, feature grid with icons, portfolio gallery with images, testimonials, and final CTA section.
  - Added `FAQPage` JSON-LD generation and injected it into legacy page shell to strengthen structured data coverage for rewrite routes.
  - Added section anchors (`#faq`, `#keunggulan`) and integrated new landing sections into the existing reusable shell pipeline.
  - Extended content presets in `rewrite-content.ts` to cover all previously generic Wave 1 routes.
- SEO impact:
  - Direct SEO impact: better intent coverage, stronger on-page structure, richer internal sectioning, and FAQ structured data support.
  - No Studio schema/query contract changes in this cycle.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` not run in this cycle.

## 2026-04-02 - Worker 3 Content Rewrite Pass v3 (Remaining Route Coverage)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded slug-specific rewrite presets under `/pembuatan-website/*` for vertical intents (dokter/klinik, expedisi, komunitas/NGO, konstruksi, sekolah, toko online, template, portfolio).
  - Added city-aware rewrite branch for `/percetakan/cetak-kalender/[kota]` plus dedicated copy presets for remaining printing slugs (`cetak-album-pernikahan`, `cetak-banner-spanduk`, `cetak-brosur`, `cetak-company-profile`, `cetak-kaos`, `cetak-kartu-nama`, `cetak-kemasan-product`, `cetak-stiker`, `cetak-undangan`, `cetak-yasin`).
  - Completed the remaining generic route rewrite backlog for Wave 1 clusters.
- SEO impact:
  - Increases uniqueness and intent alignment on previously less-specific service pages.
  - No direct Studio schema/query change; frontend metadata fallback flow via `seoSettings` remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Coverage check script result: `TOTAL_GENERIC 0`.

## 2026-04-02 - TOC Local-Only Source Lock (No External Copy/Fetch)
- Changed files:
  - `frontend/lib/local-content/astro-catalog.ts`
  - `frontend/app/(main)/toc/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed all outside-repository source paths from local content catalog and locked catalog scan to `frontend/content/astro-local/pages` only.
  - Refactored `/toc` to local-only aggregation (core static links, local astro mirror, legacy manifest, docs index) and removed Sanity fetch dependency for this page.
  - Updated migration megapan snapshot to reflect local-first TOC behavior.
- SEO impact:
  - Direct integration impact: keeps URL coverage QA available without CMS/runtime dependency and prevents accidental coupling to out-of-repo sources.
  - No direct metadata schema change.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Scope Navigation-Only Fields in Shared Link Schema
- Changed files:
  - `studio/schemas/blocks/shared/link.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Scoped navigation-specific fields in the shared `link` schema (`buttonVariant`, `navLocation`, `showInFooter`, `icon`, `children`) so they only appear when editing `navigation` documents.
  - Updated `navLocation` validation to enforce required value only for `navigation` documents, preventing irrelevant validation pressure on non-navigation content (post/product/service/cta blocks).
- SEO impact:
  - No direct SEO impact.
  - Integration impact: reduces Studio authoring ambiguity and prevents navigation-only config from leaking into non-navigation content models.
- Verification:
  - `pnpm --filter studio run typecheck` passed.

## 2026-04-02 - Metadata Image Fallback Enhanced with Content Thumbnail
- Changed files:
  - `frontend/sanity/lib/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated metadata image resolver to use per-document content image as fallback when `meta.image` is empty.
  - New priority order for Open Graph/Twitter image: `meta.image` -> content main image (`page.image`) -> global `seoSettings.defaultImage` -> static `/images/og-image.jpg`.
- SEO impact:
  - Direct SEO impact: improves share-card relevance by using document thumbnail automatically when dedicated SEO image is not filled.
  - Studio-frontend contract remains compatible (no schema shape change).
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Add Project CMS Contract + Frontend Routes (`/projects`)
- Changed files:
  - `studio/schemas/documents/project.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/defaultDocumentNode.ts`
  - `studio/presentation/resolve.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `studio/schemas/blocks/shared/block-content.ts`
  - `frontend/sanity/queries/project.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/sanity/queries/shared/link.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/components/ui/project-card.tsx`
  - `frontend/app/(main)/projects/page.tsx`
  - `frontend/app/(main)/projects/[slug]/page.tsx`
  - `frontend/app/sitemap.ts`
  - `frontend/app/(main)/toc/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added new Studio `project` document schema and registered it in schema types + Studio desk structure.
  - Added Studio preview/presentation route resolution for project documents (`/projects/[slug]`).
  - Synced shared link/reference contracts so internal links can target `project` in navigation and rich text annotations.
  - Added frontend project data layer (GROQ queries + fetch helpers) and new routes: `/projects` listing and `/projects/[slug]` detail.
  - Extended sitemap path mapping and TOC core links to include project URLs.
- SEO impact:
  - Direct SEO/integration impact: project pages are now first-class routable content with metadata generation and sitemap inclusion.
  - Cross-layer sync completed for route/schema/query/render contracts of `project`.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - AI Writer Foundation with Gateway/BYOK + Key Rotation
- Changed files:
  - `studio/schemas/documents/ai-writer-settings.ts`
  - `studio/schema-types.ts`
  - `studio/sanity.config.ts`
  - `studio/structure.ts`
  - `frontend/sanity/queries/ai-writer-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/lib/ai-writer/sanity-write.ts`
  - `frontend/lib/ai-writer/settings-source.ts`
  - `frontend/lib/ai-writer/generate.ts`
  - `frontend/app/api/ai/config/status/route.ts`
  - `frontend/app/api/ai/config/save/route.ts`
  - `frontend/app/api/ai/generate/route.ts`
  - `frontend/package.json`
  - `docs/env-reference.md`
  - `docs/ai-writer-gateway-setup.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added singleton `aiWriterSettings` in Studio for provider mode, model routing, prompt templates, and encrypted credential pools.
  - Added authenticated AI config APIs to save/read runtime settings with encryption and Sanity persistence.
  - Added generation API with three execution modes: `gateway`, `direct-gemini` (multi-key rotation), and `direct-groq` (multi-key rotation).
  - Integrated Vercel AI Gateway client support in frontend dependencies.
  - Added setup docs for BYOK/OIDC, key rotation input format, and test payloads.
- SEO impact:
  - No direct SEO metadata output change yet.
  - Integration impact: enables controlled AI-assisted rewrite pipeline for post/service/project content operations.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - AI Writer Production Hardening (Dashboard + Validation)
- Changed files:
  - `frontend/app/dashboard/seo/layout.tsx`
  - `frontend/app/dashboard/seo/ai-writer/page.tsx`
  - `frontend/app/api/ai/config/save/route.ts`
  - `frontend/app/api/ai/generate/route.ts`
  - `frontend/lib/ai-writer/generate.ts`
  - `docs/ai-writer-gateway-setup.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated SEO dashboard page for AI Writer operations with save/test flow and runtime source visibility.
  - Added model-format validation for gateway mode (`provider/model`) at save API layer.
  - Added prompt size guard in generate API and normalized direct-provider model IDs (`google/*` and `groq/*` prefix handling).
  - Extended setup doc with production checklist for go-live hardening.
- SEO impact:
  - No direct metadata change.
  - Integration impact: production-safe operational control for AI rewrite pipeline with stronger validation and error prevention.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - AI Rewrite Apply Flow (Studio Action -> Draft Patch)
- Changed files:
  - `studio/document-actions/ai-rewrite-action.ts`
  - `studio/sanity.config.ts`
  - `frontend/app/api/ai/rewrite/apply/route.ts`
  - `frontend/.env.example`
  - `studio/.env.example`
  - `docs/env-reference.md`
  - `docs/ai-writer-gateway-setup.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added Studio document action `AI Rewrite` for `post`, `service`, and `project` documents.
  - Added backend route to generate rewritten content and patch it into Sanity draft (`title`, `excerpt`, `body`) in one flow.
  - Added action-secret auth path for Studio cross-origin calls (`AI_WRITER_ACTION_SECRET` / `SANITY_STUDIO_AI_WRITER_ACTION_SECRET`) and CORS handling for Studio origin.
  - Added environment and setup docs for production use of rewrite-apply flow.
- SEO impact:
  - Direct SEO impact: enables faster, repeatable rewrite operations on indexed content while preserving slug intent and draft-first publishing flow.
  - Integration impact: Studio action and frontend API are now linked for end-to-end content rewrite execution.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - AI Writer Docs Consolidation (Production-Focused)
- Changed files:
  - `docs/ai-writer-gateway-setup.md`
  - `docs/env-reference.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote AI writer documentation into a production-focused guide with clear scope, architecture, endpoint behavior, env matrix, setup steps, rewrite flow, and operational checklist.
  - Removed non-essential sections and duplicated notes to reduce ambiguity during rollout.
  - Corrected env ownership for `SANITY_STUDIO_AI_WRITER_ACTION_SECRET` to Studio section in env reference.
- SEO impact:
  - No direct SEO rendering change.
  - Integration impact: improves operational reliability and reduces configuration errors for AI-assisted rewrite pipeline.
- Verification:
  - Documentation update only (no runtime code change in this entry).

## 2026-04-02 - Worker 3 Content Rewrite Pass v2 (Slug-Specific Copy Expansion)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extended legacy rewrite copy with slug-specific variants to reduce repetitive content across cluster pages.
  - Added dedicated website-service variants (`harga`, `jasa-migrasi-wordpress`, `jasa-pembuatan-website-company-profile`) while keeping generic fallback for other service slugs.
  - Added printing detail variants for calendar/book-oriented pages and software detail variants (`implementasi-software`, `instalasi-software`, `pembuatan-software`).
  - Added specific content branch for `about/ai-statement`.
- SEO impact:
  - Improves semantic uniqueness and intent matching between pages within the same cluster.
  - No direct schema/query change; Studio-Frontend SEO contract remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` not run in this cycle.

## 2026-04-02 - Worker 3 Content Rewrite Pass for Legacy Service Clusters
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote legacy content mapping to reduce generic copy and strengthen intent alignment per cluster.
  - Added dedicated website index copy (`buildWebsiteIndexCopy`) with stronger conversion-oriented narrative and keyword coverage.
  - Improved printing/software cluster copy logic to differentiate section index pages vs detail pages, including CTA and supporting keyword refinements.
  - Refined Sistem POS branch with stronger keyword coverage and cluster-specific CTA.
- SEO impact:
  - Improves on-page semantic relevance for migrated legacy service pages and reduces duplicate boilerplate patterns across cluster routes.
  - No direct change to Studio schema/query contracts; existing `seoSettings` fallback behavior remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Worker 2 CMS Contract Sync for Navigation Links
- Changed files:
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Synced Studio-to-Frontend contract by adding `category` support to main `link.internalLink` references, matching existing frontend query route mapping.
  - Added destination validation on `link` and `navigation-link-child` objects to prevent empty navigation targets (external requires `href`, internal requires `internalLink`).
  - Hardened navigation query contract with deterministic document selection (`order(_updatedAt desc)[0...1]`) and `coalesce` defaults for `links`/`children` to reduce empty-state risk in header/footer rendering.
- SEO impact:
  - No direct metadata rendering change.
  - Improves integration safety by preventing broken internal/external navigation links that can degrade crawl path quality.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Parallel Worker Integration Pass (UI + CMS Contract + Rewrite Route Parity)
- Changed files:
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/header/social-links.tsx`
  - `frontend/components/footer.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `frontend/sanity/queries/navigation.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/app/(main)/percetakan/[...segments]/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx` (removed)
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx` (removed)
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Integrated Worker 1 UI shell refinements (single CTA emphasis, icon-only social actions, compact header rhythm) across header/footer/style guide.
  - Finalized Worker 2 navigation contract synchronization between Studio schema validation and frontend query defaults.
  - Finalized Worker 3 route parity hardening by consolidating nested `percetakan` URL handling into manifest-driven catch-all routing.
  - Enriched rewrite copy mapping for top cluster index pages (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) with stronger keyword and CTA differentiation.
- SEO impact:
  - Direct SEO impact: improves crawl continuity for nested `percetakan` legacy URLs and strengthens rewrite-page keyword/metadata alignment.
  - Integration impact: reduces frontend-backend contract drift for navigation-driven internal linking behavior.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - Rewrite Content Progress Tracker + High-Intent Alias Coverage
- Changed files:
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `docs/rewrite-content-progress.md`
  - `docs/seo-updates.md`
- Summary:
  - Added explicit rewrite progress tracker document to separate “already rewritten” versus “pending” items for content migration visibility.
  - Added alias slug support in legacy route resolver for high-intent `pembuatan-website` paths to reduce route gaps during rewrite-first phase.
  - Extended static param generation for `pembuatan-website/[slug]` so alias paths are pre-rendered and covered consistently.
- SEO impact:
  - Direct SEO/integration impact: lowers accidental 404 risk for legacy high-intent alias paths and improves execution traceability of rewrite content completion.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Content Wave Completion for Tracked Top-Priority Legacy URLs
- Changed files:
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `docs/rewrite-content-progress.md`
  - `docs/seo-updates.md`
- Summary:
  - Added supplemental legacy route coverage for previously pending high-priority paths:
    - `/pembuatan-website/portfolio`
    - `/pembuatan-website/sidoarjo`
  - Extended slug resolver + static params generation so these paths are included in SSG output without redirect dependency.
  - Added route-specific rewrite copy preset for `portfolio` and city-intent handling for `sidoarjo`.
  - Updated rewrite progress tracker status from pending to done for tracked top-priority cluster URLs.
- SEO impact:
  - Direct SEO impact: closes remaining tracked rewrite gaps on high-priority legacy cluster URLs and prevents orphan/404 behavior for these paths during rewrite-first rollout.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Internal-Link Strategy Added to Legacy Shell
- Changed files:
  - `frontend/lib/legacy-pages/internal-links.ts`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/legacy/legacy-related-links.tsx`
  - `docs/rewrite-content-progress.md`
  - `docs/seo-updates.md`
- Summary:
  - Added strategic internal-link fallback map per rewrite cluster (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`, trust pages).
  - Connected legacy shell to render “Jelajahi Selanjutnya” links before related legacy links, improving cross-cluster navigation paths.
  - Updated rewrite progress tracker to mark internal-link strategy as implemented for current wave (code-driven fallback mode).
- SEO impact:
  - Direct SEO impact: improves internal linking structure and crawl discoverability across canonical service/blog/contact paths from rewritten legacy pages.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Add /toc Unified Content Index (Sanity + Local Files)
- Changed files:
  - `frontend/app/(main)/toc/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added new `/toc` page that aggregates links from Sanity content (pages, posts, services, products, categories) and local content sources (legacy route manifest + local docs index JSON).
  - Implemented dynamic/no-store rendering to keep runtime content listing fresh from current source state.
  - Added grouped section layout with per-source counts to simplify migration and coverage checks.
- SEO impact:
  - Direct SEO/integration impact: improves crawl planning visibility and internal QA by exposing a consolidated site content index across CMS and local source pipelines.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter studio run typecheck` passed.

## 2026-04-02 - Worker 3 Route Parity Hardening for Percetakan Nested Paths
- Changed files:
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/app/(main)/percetakan/[...segments]/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx` (removed)
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx` (removed)
  - `docs/seo-updates.md`
- Summary:
  - Replaced split dynamic routes under `percetakan` with a single manifest-driven catch-all (`[...segments]`) route.
  - Added helper APIs in legacy route registry to resolve section descendants and route lookup by segment array.
  - Consolidated metadata and rendering path for nested URLs (including `cetak-kalender/{kota}`) through one routing contract to reduce 404 risk during rewrite-first migration.
- SEO impact:
  - Direct technical SEO impact: improves legacy URL parity coverage for nested `percetakan` paths and reduces accidental crawl loss from route mismatch.
  - Keeps shared metadata helper path intact so global fallback behavior remains consistent.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - Worker 1 UI Shell Pass (Header/Nav + Icon Actions)
- Changed files:
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/header/social-links.tsx`
  - `frontend/components/footer.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refactored desktop header to a clearer single-CTA shell: primary nav stays focused, while CTA, dark-mode action, and icon-only social actions are grouped on the right.
  - Kept mobile shell compact and aligned action sizing (`sm`) for CTA/social/theme controls.
  - Enhanced reusable `SocialLinks` primitive with size variants (`sm`/`md`) and reused it in header/footer/style-guide.
  - Updated style-guide showcase to reflect Worker 1 contract: button matrix focus (`default`, `outline`, `secondary`, `ghost`) and icon-action pattern.
- SEO impact:
  - No direct SEO impact.
  - Indirect integration impact: navigation consistency and shared shell primitives reduce UI drift risk during rewrite rollout.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - Footer Rewrite: Icon-Only Social Pattern
- Changed files:
  - `frontend/components/footer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote footer social rendering to use shared `SocialLinks` component with icon-only layout, replacing per-item text labels.
  - Aligned footer interaction style with shared UI contract (compact, reusable, and consistent icon treatment).
- SEO impact:
  - No direct SEO impact.
  - Indirect UX improvement can support cleaner navigation scanning for users.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Legacy Rewrite Routes: Metadata Fallback + JSON-LD Template Sync
- Changed files:
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/lib/legacy-pages/metadata.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/app/(main)/about/page.tsx`
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/contact/page.tsx`
  - `frontend/app/(main)/privacy/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/app/(main)/sistem-pos/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reworked legacy rewrite shell into reusable sections with stronger Vercel-style rhythm (hero, keyword chips, highlights, process, FAQ, related links, CTA).
  - Added centralized `generateLegacyPageMetadata` helper and migrated all rewritten legacy routes to metadata pipeline that preserves global fallback from `seoSettings`.
  - Added JSON-LD application on legacy template (Breadcrumb for all; Service schema for relevant clusters) and refreshed rewrite-copy mappings for trust/support pages.
- SEO impact:
  - Improves metadata consistency and prevents route-level hardcoded `noindex` drift on rewritten legacy clusters.
  - Preserves Studio->Frontend SEO fallback contract via existing `generateBasicMetadata` path; no schema shape change required.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Legacy Route Rewrite v1 with Reusable Shell Components
- Changed files:
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/legacy/legacy-hero.tsx`
  - `frontend/components/legacy/legacy-highlights.tsx`
  - `frontend/components/legacy/legacy-process-faq.tsx`
  - `frontend/components/legacy/legacy-related-links.tsx`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refactored legacy rewrite shell into reusable section components (hero, highlights, process+FAQ, related links) so Astro route clusters are template-driven and easier to scale.
  - Kept metadata pipeline on existing `generateBasicMetadata` flow to preserve global fallback from `seoSettings`.
  - Rewrote copy strategy for trust and service cluster pages (`layanan`, `about`, `contact`, `privacy`) to improve keyword intent alignment and CTA specificity.
- SEO impact:
  - Improves on-page semantic relevance and internal consistency across migrated legacy routes.
  - No schema/query contract change in Studio; frontend SEO fallback behavior remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

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

## 2026-04-01 - Astro Source Discovery + Migration Blueprint
- Changed files:
  - `docs/astro-to-next-migration-plan.md`
- Summary:
  - Discovered and validated Astro source repository for migration (`/home/ubuntu/Kotacom-supabase-schhool`, commit `6bcb8b5bf293d44ad19d916f1d72c2f89c273ae2`).
  - Documented route inventory, SEO component inventory, and phased migration blueprint from Astro to Next.js + Sanity.
  - Defined recommended target URL strategy and phased rollout plan (content/schema parity -> frontend parity -> SEO stabilization -> redirect waves).
- SEO impact:
  - Direct SEO planning impact: reduces migration risk by sequencing URL architecture and metadata parity before redirect activation.
- Verification:
  - Manual verification of Astro route tree (`src/pages`) and component tree (`src/components`) completed.
  - Source repo remote and commit identity verified.

## 2026-04-01 - Mega Plan Migration + SEO Rewrite + UI Refactor Checklist
- Changed files:
  - `docs/astro-migration-megaplan.md`
  - `AGENTS.md`
- Summary:
  - Added an execution-grade mega plan covering migration phases, per-URL curation workflow, SEO rewrite program, UI redesign/refactor tracks, redirect wave rollout, and measurable success criteria.
  - Added explicit content movement plan (Astro source buckets -> Sanity target types) with per-item checklist.
  - Updated `AGENTS.md` with mandatory agent execution checklist to keep `docs/astro-migration-megaplan.md` progress synchronized each execution cycle.
- SEO impact:
  - Direct SEO/integration planning impact: improves migration control and sequencing to reduce ranking-loss risk during rebuild and redirect rollout.
- Verification:
  - Manual review completed for new checklist structure and workstream completeness.
  - File-level verification: `docs/astro-migration-megaplan.md` and `AGENTS.md` created/updated successfully.

## 2026-04-01 - Route Contract v1 + Top-300 Manual Curation Worklist
- Changed files:
  - `docs/astro-next-route-contract.md`
  - `docs/curation/manual-top300-worklist-v1.csv`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Published formal route contract v1 for legacy Astro URL patterns to Next.js canonical routes, including ordered mapping rules, reason codes, conflict resolution, and validation checklist.
  - Initialized top-300 manual curation worklist from GSC priority dataset with prefilled proposed targets, decision types, confidence, and reason codes for one-by-one review.
  - Updated mega plan checklist/status to reflect route contract publication and manual curation kickoff.
- SEO impact:
  - Direct SEO/integration impact: improves redirect decision consistency and reduces random mapping risk by introducing deterministic mapping policy before rollout.
- Verification:
  - Source route inventory cross-checked against current Next route tree (`frontend/app`).
  - Worklist generated with 300 rows and reason-code distribution summary.

## 2026-04-01 - Top-300 Curation v2 Classification (Execution Queues)
- Changed files:
  - `docs/curation/manual-top300-worklist-v2.csv`
  - `docs/curation/manual-top300-approved-redirect.csv`
  - `docs/curation/manual-top300-keep-or-redirect-review.csv`
  - `docs/curation/manual-top300-pending-manual-intent.csv`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Upgraded top-300 curation worklist into operational v2 queue with final decision/status fields.
  - Split the queue into execution buckets:
    - `approved_redirect` (ready for redirect batch)
    - `approved_keep_or_redirect` (needs content existence check before final redirect/keep decision)
    - `pending_manual_intent` (requires one-by-one editorial intent mapping)
  - Added progress snapshot into mega plan to keep agent checklist synchronized with current execution state.
- SEO impact:
  - Direct SEO migration impact: enables controlled redirect rollout from reviewed subset while isolating ambiguous URLs to prevent wrong-intent redirects.
- Verification:
  - Row counts validated against source top-300 dataset:
    - approved_redirect: 216
    - approved_keep_or_redirect: 32
    - pending_manual_intent: 52

## 2026-04-01 - Top-300 Curation v3 Completion (No Pending Manual Intent)
- Changed files:
  - `docs/curation/manual-top300-worklist-v3.csv`
  - `docs/curation/manual-top300-approved-redirect-v3.csv`
  - `docs/curation/manual-top300-pending-manual-intent-v3.csv`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Completed v3 one-by-one intent mapping for previously unresolved manual queue items (tags, archives, product-category, download/comment/shop legacy URLs).
  - Reduced unresolved manual intent queue from 52 to 0.
  - Updated mega-plan execution snapshot and B1 status note to reflect top-300 completion state.
- SEO impact:
  - Direct SEO migration impact: top-300 priority set now has deterministic final decisions for redirect planning, reducing ambiguity before rollout.
- Verification:
  - Final decision distribution validated:
    - approved_redirect: 268
    - approved_keep_or_redirect: 32
    - pending_manual_intent: 0

## 2026-04-01 - Top-300 Redirect Import Artifact (v3)
- Changed files:
  - `docs/curation/manual-top300-approved-redirect-import.csv`
- Summary:
  - Generated redirect-import-ready CSV from top-300 curation v3 approved set.
  - Output format aligns with redirect ingestion needs (`source,destination,permanent,enabled,reason,queueOrder`).
  - Deduplicated by source path and excluded self-redirects.
- SEO impact:
  - Direct migration execution impact: provides immediate staged redirect batch candidate for high-priority legacy URLs.
- Verification:
  - Approved redirect rows exported: 268 (plus header row).
  - Pending manual intent file reduced to header-only state (`manual-top300-pending-manual-intent-v3.csv`).

## 2026-04-01 - Astro Static Cluster Scaffold in Next.js (Blog stays Sanity)
- Changed files:
  - `frontend/scripts/generate-astro-local-pages-manifest.mjs`
  - `frontend/lib/legacy-pages/astro-static-manifest.json`
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/app/(main)/about/page.tsx`
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/contact/page.tsx`
  - `frontend/app/(main)/privacy/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `frontend/app/(main)/sistem-pos/page.tsx`
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Added Astro manifest generator to map static legacy Astro pages into a local Next.js manifest (code-driven, no Sanity dependency).
  - Introduced legacy-page registry and reusable rendering shell.
  - Added Next.js routes for high-volume Astro service/landing clusters (`pembuatan-website`, `percetakan`, `software`, `layanan`) plus supporting pages (`about`, `contact`, `privacy`, `sistem-pos`).
  - All migrated legacy scaffold routes are currently marked noindex as temporary placeholders during rewrite phase.
  - Blog workflow remains Sanity-driven.
- SEO impact:
  - Integration impact: enables phased Astro-to-Next migration for non-blog pages while avoiding immediate risky bulk redirects.
  - Temporary noindex on scaffold pages prevents thin placeholder pages from being indexed before rewrite completion.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms new static routes for `pembuatan-website`, `percetakan`, `software`, `about`, `contact`, `privacy`, `layanan`, and `sistem-pos`.

## 2026-04-02 - Rewrite-first Strategy Applied (No Mass Redirect Yet)
- Changed files:
  - `frontend/next.config.mjs`
  - `frontend/scripts/generate-astro-local-pages-manifest.mjs`
  - `frontend/lib/legacy-pages/astro-static-manifest.json`
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
- Summary:
  - Removed temporary mass-cleanup redirect rules to follow rewrite-first migration strategy.
  - Extended legacy manifest generator to include Astro programmatic city pages from `src/data/kota_website/*.json`.
  - Added route support for `/percetakan/cetak-kalender/[kota]` so city pages are present in Next rewrite phase instead of being redirected.
  - Regenerated legacy manifest; total legacy rewrite entries now include city routes.
- SEO impact:
  - Prevents premature redirect deployment before rewrite completion.
  - Keeps legacy city URLs available in controlled noindex rewrite phase, reducing migration gap risk.
- Verification:
  - `pnpm --filter frontend run legacy:manifest` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms generated city routes for:
    - `/pembuatan-website/[slug]` (includes city slugs)
    - `/percetakan/cetak-kalender/[kota]`.

## 2026-04-02 - Fix Legacy Dynamic Params Causing False 404 on Rewritten Astro Routes
- Changed files:
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Updated new legacy rewrite dynamic routes to await App Router `params` (Promise shape in Next 16 server components).
  - This fixes false `notFound()` cases where slug/kota was read as undefined at runtime, which caused 404 on valid routes.
- SEO impact:
  - Prevents accidental 404 responses on valid legacy rewrite URLs.
  - Keeps rewrite-first migration stable without forcing early redirects.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms static generation includes `/percetakan/[slug]`, `/pembuatan-website/[slug]`, and `/percetakan/cetak-kalender/[kota]` routes.

## 2026-04-02 - 3-Worker Rewrite Orchestration Doc (No-Overlap + Shared UI/SEO Contract)
- Changed files:
  - `docs/rewrite-worker-orchestration.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated orchestration playbook for parallel rewrite execution with 3 workers.
  - Defined strict non-overlapping file ownership per worker (UI shell, CMS contract, route rewrite/SEO application).
  - Added mandatory skill usage list, including reusable component requirement and explicit Vercel + shadcn + Geist UI contract.
  - Added shared SEO contract to keep Studio schemas, GROQ query contracts, and frontend metadata logic synchronized.
  - Added merge order and quality gates for stable integration.
- SEO impact:
  - Direct SEO/integration process impact: reduces schema-query-render drift and lowers migration risk by enforcing synchronized implementation and fallback behavior across workers.
- Verification:
  - Manual review completed for ownership matrix, shared standards, and checklist completeness.

## 2026-04-02 - Rewrite Template Activation for Legacy Astro Route Clusters
- Changed files:
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/lib/legacy-pages/metadata.ts`
  - `frontend/app/(main)/about/page.tsx`
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/contact/page.tsx`
  - `frontend/app/(main)/privacy/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/app/(main)/sistem-pos/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Replaced placeholder-style legacy shell with reusable rewrite template sections (hero, highlights, process, FAQ, CTA, related links).
  - Added `rewrite-content` generator to produce section/slug-aware copy model for website city pages, printing pages, software pages, and generic pages.
  - Added centralized legacy metadata helper that maps rewritten pages to existing frontend metadata pipeline (`generateBasicMetadata`) so canonical/title/description/robots fallback behavior remains integrated.
  - Updated all migrated legacy route files to use centralized metadata helper instead of hardcoded noindex metadata.
- SEO impact:
  - Direct SEO impact: rewritten legacy pages now have richer, intent-aligned content scaffolding and dynamic meta descriptions per route cluster.
  - Integration impact: metadata generation stays synchronized with global SEO fallback logic from Studio (`seoSettings`) through existing frontend helper flow.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms affected legacy clusters compile and generate static paths, including `/percetakan/cetak-buku` via `/percetakan/[slug]`.

## 2026-04-02 - Worker Execution Prompts for Parallel Rewrite Tracks
- Changed files:
  - `docs/worker-prompts/worker-1-ui-shell.md`
  - `docs/worker-prompts/worker-2-cms-contract.md`
  - `docs/worker-prompts/worker-3-rewrite-pages.md`
  - `docs/seo-updates.md`
- Summary:
  - Added 3 copy-paste worker prompts to operationalize parallel execution without file overlap.
  - Each prompt includes mandatory skill usage, owned file boundaries, forbidden paths, mission scope, and acceptance checklist.
  - Prompt content is aligned with existing orchestration rules: Vercel + shadcn + Geist UI direction, reusable component policy, and SEO synchronization discipline.
- SEO impact:
  - Direct SEO/integration process impact: reduces parallel execution drift and improves consistency in metadata and fallback handling across worker outputs.
- Verification:
  - Manual review completed for ownership disjointness and checklist alignment with `docs/rewrite-worker-orchestration.md`.

## 2026-04-02 - Orchestration Docs Sync (Megaplan + SEO Log Consistency)
- Changed files:
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Synced mega-plan status after orchestration publication by adding completed snapshot item for the 3-worker rewrite contract.
  - Updated Workstream A2 checklist to mark legacy dedicated-landing-page exception mapping as completed, with explicit route-cluster note.
  - Added this log entry to keep AGENTS mandatory update-log compliance for the documentation-only sync cycle.
- SEO impact:
  - No direct SEO impact.
  - Integration governance impact: improves execution traceability and reduces coordination drift during rewrite/SEO synchronization.
- Verification:
  - Manual documentation review completed.

## 2026-04-02 - Percetakan `Jasa Cetak Buku` Template Enrichment (Export-Derived, No Content Reduction)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/legacy/legacy-process-faq.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reworked `cetak-buku` rewrite content using structure patterns extracted from exported legacy cluster `jasa-cetak-buku-*` (399 rows with highly identical section architecture).
  - Expanded template depth to preserve and develop legacy substance (not reducing): stronger service scope, pricing tiers, richer process, extended FAQ set, and additional long-form knowledge guidance.
  - Added reusable `longGuide` contract on rewrite copy model and rendered it via a reusable section in landing template to keep long-form informational value visible on-page.
  - Upgraded FAQ rendering to shared shadcn `Accordion` component for consistent reusable UI behavior.
- SEO impact:
  - Direct SEO/content impact: improves topical completeness and intent match for `jasa cetak buku` style pages by aligning with proven legacy structure (keunggulan, estimasi, langkah pemesanan, FAQ, and deep guide topics).
  - Integration impact: no schema/query contract drift introduced; change is isolated to legacy rewrite template content layer.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build confirms static generation remains valid for `/percetakan/[...segments]` including `/percetakan/cetak-buku`.

## 2026-04-02 - Root Slug Adapter for Deduplicated `jasa-cetak-buku-kota` (Template + City Data)
- Changed files:
  - `frontend/content/astro-local/jasa-cetak-buku-kota/template.mdx`
  - `frontend/content/astro-local/jasa-cetak-buku-kota/cities.json`
  - `frontend/content/astro-local/jasa-cetak-buku-kota/excluded-non-city.json`
  - `frontend/lib/local-content/jasa-cetak-buku-kota.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/legacy/jasa-cetak-buku-city-shell.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added frontend adapter that maps root slugs `jasa-cetak-buku-*` to a deduplicated local dataset generated from export artifacts.
  - Wired route fallback in `/(main)/[slug]` so city pages render from local `template.mdx + cities.json` before Sanity page lookup.
  - Expanded static params generation for root slug route by merging Sanity page slugs with local city slugs (deduplicated).
  - Added dedicated city-shell renderer using existing reusable legacy sections (hero/highlights/landing/process-faq/related-links) and JSON-LD support.
  - Added explicit helper for city-specific rewrite copy from the shared percetakan template contract.
- SEO impact:
  - Direct SEO impact: enables deterministic static generation for high-volume root slug city pages with unique metadata/title/description per city while keeping global fallback behavior.
  - Integration impact: no Studio schema change required; this is a frontend local-content adapter layer for migration/rewrite wave.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms `/(main)/[slug]` static path volume increased (`+396`), reflecting generated city root slugs.

## 2026-04-02 - Slug Coverage Fix for `jasa-cetak-buku-*` Export Parity (399/399)
- Changed files:
  - `frontend/lib/local-content/jasa-cetak-buku-kota.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Identified exact slug gap between export source and frontend dataset: source `399` vs cities dataset `394`.
  - Confirmed the `5` missing slugs are non-city variants from export cluster (`dari-pdf`, `novel-murah`, `yasin`, etc.).
  - Updated static params generation to merge `cities.json` + `excluded-non-city.json`, restoring route coverage parity to `399/399`.
  - Runtime fallback for `jasa-cetak-buku-*` remains active for defensive slug handling.
- SEO impact:
  - Direct SEO impact: removes potential 404 risk for missing exported root slugs and restores crawlable route parity to source export set.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Data parity check passed: `cities 394 + excluded 5 = combined 399`.

## 2026-04-02 - CTA Parity Fix for `jasa-cetak-buku-(kota)` from Export Template
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable quick-action CTA group to rewrite landing sections, enabled through `copy.ctaLinks` contract.
  - Aligned `jasa-cetak-buku-(kota)` CTA labels with export-source template pattern to avoid missing CTA intents:
    - `Hubungi Kami Sekarang`
    - `Tanya di Sini`
    - `Minta Penawaran Akurat di Sini`
    - `Chat & Cetak Sekarang`
  - Enabled these CTA links in both base `cetak-buku` copy preset and city-derived copy builder.
- SEO impact:
  - Direct content/UX impact: restores conversion-intent parity against legacy export pages so key CTA intents are preserved on city pages.
  - No direct Studio schema/query contract impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms static root slug generation remains healthy (`/[slug]` +401 static paths).

## 2026-04-02 - Vercel-Style UI Shell Rewrite Pass (Reusable Header/Footer/Section Surfaces)
- Changed files:
  - `frontend/app/globals.css`
  - `frontend/app/(main)/layout.tsx`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/footer.tsx`
  - `frontend/components/ui/button.tsx`
  - `frontend/components/ui/card.tsx`
  - `frontend/components/ui/section-container.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Implemented a full UI-shell refresh to align visual direction closer to Vercel style while staying on reusable shadcn + Geist foundations.
  - Added reusable global surface/separator tokens and utilities (`ui-shell`, `section-divider`, `surface-card`, `surface-muted`) and applied them consistently across shared layout blocks.
  - Refined header/navigation (desktop + mobile) rhythm, dropdown/sheet surfaces, and action styles for clearer hierarchy with preserved CMS-driven menu behavior.
  - Refactored footer into cleaner two-zone composition and grouped link surfaces; updated legacy landing section surfaces/dividers so root-slug city pages inherit the same upgraded shell.
- SEO impact:
  - No direct metadata/schema change.
  - Indirect SEO/UX impact: stronger readability and CTA visibility on high-volume rewrite pages without changing route, slug, or CMS query contracts.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Manual parity checks: root slug adapter and template CTA strings remain present for `jasa-cetak-buku-*` flow (Hubungi/Tanya/Penawaran/Chat).

## 2026-04-02 - Shared UI Consolidation (`legacy` -> `ui`) + Shadcn Breadcrumb Alignment
- Changed files:
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/blocks/rich-content.tsx`
  - `frontend/components/blocks/legacy-rich-content.tsx`
  - `frontend/components/blocks/index.tsx`
  - `frontend/components/ui/breadcrumbs.tsx`
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Consolidated rewrite shell component naming into shared `ui` by renaming exported landing section component to `RewriteLandingSections`.
  - Promoted raw rich-content renderer into non-legacy shared block component (`rich-content`) and kept backward compatibility for Sanity block type `legacy-rich-content`.
  - Extended block map contract so both `_type: "legacy-rich-content"` and `_type: "rich-content"` render through the same shared component.
  - Reworked `Breadcrumbs` wrapper to follow shadcn breadcrumb structure more closely (clean list composition, proper current-page rendering, standard separators, stable keys, no forced primary/bold styling).
  - Stabilized local production build script on webpack (`next build --webpack`) to avoid Turbopack workspace-root inference regressions in this monorepo layout.
- SEO impact:
  - No direct metadata/schema changes.
  - Integration/UX impact: breadcrumb output is cleaner and more consistent across content templates; rich content block contract remains backward-compatible for existing imported Sanity data.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Product Listing Grid Update (2 Mobile / 4 Desktop) + Lazy Load "Show More"
- Changed files:
  - `frontend/components/products/product-grid.tsx`
  - `frontend/app/(main)/products/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable client component for product listing grid with progressive reveal behavior.
  - Set product card layout to `2 columns` on mobile and `4 columns` on desktop (`lg`).
  - Limited initial render to 16 items and added `Show more products` button to load next batches (16 each click).
  - Applied the same behavior consistently to both `/products` and `/products/[category]` listing views.
- SEO impact:
  - No direct SEO metadata/schema impact.
  - UX/performance impact: reduced initial product-card payload on large collections while preserving crawlable route/content structure.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Lazy Load Added for Post/Project/Service Listings (Layout Preserved)
- Changed files:
  - `frontend/components/posts/post-grid.tsx`
  - `frontend/components/projects/project-grid.tsx`
  - `frontend/components/services/service-grid.tsx`
  - `frontend/app/(main)/blog/page.tsx`
  - `frontend/app/(main)/blog/category/[slug]/page.tsx`
  - `frontend/app/(main)/projects/page.tsx`
  - `frontend/app/(main)/services/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable lazy-load listing components for post, project, and service archives.
  - Set default initial render to 16 items, with progressive loading via per-section button (`Show more posts/projects/services`).
  - Integrated lazy loading into blog main listing, blog category listing, projects listing, services listing, and services category listing route branch.
  - Kept existing grid layout behavior unchanged for these templates (no new column reconfiguration in this task).
- SEO impact:
  - No direct SEO metadata/schema/query change.
  - UX/performance impact: lowers initial list render payload for large archives while preserving route, links, and content discoverability.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Template Refresh for `jasa-cetak-buku-*` and Related Rewrite Routes (Colorful + CTA-First)
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/ui/rewrite/related-links.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refreshed shared rewrite visual system used by `jasa-cetak-buku-(kota)` pages (including `/jasa-cetak-buku-bandung`) and other rewrite templates using the same UI shell.
  - Removed non-relevant surface labels from UI (no visible `legacy/rewrite wave/source file/legacy route` text in hero/related sections).
  - Expanded CTA density across long-form page flow (`hero`, `aksi cepat`, `final CTA`) with clearer multi-action paths.
  - Increased section spacing and introduced broader color surfaces/gradients (sky/cyan/emerald/violet/amber/indigo) to keep long content readable, less monotonous, and more engaging.
  - Preserved existing content/data contracts while improving presentation and conversion hierarchy.
- SEO impact:
  - No direct schema/query/metadata contract change.
  - Indirect SEO/engagement impact: improved readability and CTA prominence for long-form landing routes can improve user engagement signals.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Percetakan Visual Enrichment (Component-Level Color + Local Illustrations)
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/ui/rewrite/related-links.tsx`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/public/images/percetakan/print-branding.svg`
  - `frontend/public/images/percetakan/print-promo.svg`
  - `frontend/public/images/percetakan/print-event.svg`
  - `frontend/public/images/percetakan/print-book.svg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable local illustration set for percetakan/service-like sections and wired visuals into rewrite templates.
  - Applied image cards to “Jenis Layanan” and refreshed portfolio proof visuals for rewrite pages (including `jasa-cetak-buku-(kota)` routes).
  - Adjusted color strategy per request: reduced full-section background coloration and moved emphasis into smaller components (chips, badges, icon accents, CTA/button accents, border accents).
  - Preserved content breadth while increasing visual breathing room and CTA touchpoints.
- SEO impact:
  - No direct metadata/schema/query contract change.
  - Indirect engagement impact: richer visual assets and clearer CTA hierarchy can improve scroll depth and conversion interaction.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Universal Hero Vector Integrated for `jasa-cetak-buku-(kota)` Pages
- Changed files:
  - `frontend/public/images/percetakan/hero-kotacom-universal.svg`
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added new universal flat-vector hero image branded `KOTACOM` for percetakan city routes.
  - Extended shared rewrite hero component with optional `heroImage` prop.
  - Integrated hero image only for `jasa-cetak-buku-(kota)` template via city shell adapter (covers Bandung and all city variants using same template).
- SEO impact:
  - No direct SEO metadata/schema impact.
  - UX impact: stronger first-screen visual context and brand recognition for city landing pages.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Book-Printing Visual Alignment (Gradient Flat Brand + Service-Specific Illustrations)
- Changed files:
  - `frontend/public/images/percetakan/hero-kotacom-universal.svg`
  - `frontend/public/images/percetakan/service-book-satuan.svg`
  - `frontend/public/images/percetakan/service-book-bulk.svg`
  - `frontend/public/images/percetakan/service-book-finishing.svg`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rebuilt universal hero vector to be explicitly relevant to `jasa-cetak-buku` intent (book-printing context) with colorful flat gradient brand treatment for `KOTACOM`.
  - Added three dedicated flat-vector illustrations for `Jenis Layanan Utama`:
    - Cetak Buku Satuan (POD)
    - Cetak Buku Massal (Offset)
    - Finishing & Jilid Premium
  - Updated rewrite landing service cards for percetakan routes to use book-printing specific titles, copy, and the new per-service images.
- SEO impact:
  - No direct SEO metadata/schema/query changes.
  - UX intent alignment improvement: above-the-fold and service section visuals now match cetak-buku search intent more closely.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Flat Illustration Master Plan (Shark Mascot) Documentation
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a single comprehensive illustration strategy document for website-wide flat-style assets with shark mascot direction.
  - Document includes: visual system, color rules (blue/red/yellow/black-white), mascot consistency rules, production scope by page/use-case (hero, contact, 404, service-specific, CTA/state), detailed prompt template, and highly detailed ready-to-use prompts.
  - Added production workflow, QA checklist, and recommended file structure for implementation.
- SEO impact:
  - No direct SEO impact.
  - Integration support impact: improves consistency for future visual content production and conversion-focused UX implementation.
- Verification:
  - Manual document review completed.

## 2026-04-02 - Flat Illustration Plan Expanded with Quick-Scan `Jasa` Coverage
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded the master illustration document with a quick-scan mapping for additional `jasa` clusters identified from active rewrite/service coverage.
  - Added explicit priority list for service-specific illustrations (website variants, software implementation/installation/custom, and percetakan variants).
  - Added highly detailed ready-to-use prompts for each additional jasa use case to accelerate batch illustration production with consistent mascot/style direction.
- SEO impact:
  - No direct SEO impact.
  - Integration/UX planning impact: improves visual-content readiness across broader service inventory.
- Verification:
  - Manual document review completed.

## 2026-04-02 - Illustration Plan Priority Lock + Remodeling Directive (`Jasa Cetak Buku` First)
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated illustration master plan to lock business priority order with `Jasa Cetak Buku` as Priority 1.
  - Added official KOTACOM logo reference URL into the plan for brand consistency guidance.
  - Added explicit remodeling directive section (hero, section rhythm, CTA cadence, trust elements, consistency rules) for high-priority cetak-buku rollout.
  - Added dedicated “Priority Pack Prompt” for `Jasa Cetak Buku` to accelerate production of conversion-oriented master visuals.
- SEO impact:
  - No direct SEO impact.
  - UX/conversion planning impact: clearer execution priority and remodeling guidance for highest-value landing cluster.
- Verification:
  - Manual document review completed.

## 2026-04-02 - Unified Style Guide Page + Priority Illustration Batch (Variations)
- Changed files:
  - `frontend/app/(main)/style-guide/page.tsx`
  - `frontend/public/images/percetakan/hero-kotacom-universal-v2.svg`
  - `frontend/public/images/percetakan/hero-kotacom-universal-v3.svg`
  - `frontend/public/images/percetakan/cta-cetak-buku-contact.svg`
  - `frontend/public/images/percetakan/social-proof-cetak-buku.svg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rebuilt `/style-guide` into a single visual system page that now consolidates illustration direction, palette, design principles, priority pack, and a live gallery of generated assets.
  - Added two additional hero variations for `jasa-cetak-buku-(kota)` plus dedicated support visuals for CTA/contact and social proof.
  - The style guide now functions as the primary visual review surface for ongoing illustration rollout rather than a generic component demo page.
- SEO impact:
  - No direct SEO impact.
  - Integration/UX impact: creates a single internal review surface for visual consistency and accelerates rollout of conversion-focused imagery.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Importer for Repo-Local Astro Root-Slug Pages
- Changed files:
  - `frontend/scripts/import-astro-local-pages.mjs`
  - `frontend/package.json`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added an idempotent importer for the repo-local Astro source pack under `frontend/content/astro-local/jasa-cetak-buku-kota`.
  - The importer loads the local template plus city and excluded-slug datasets, builds Sanity `page` documents with `legacy-rich-content` blocks, and writes only missing slugs by default.
  - Updated the root-slug route to prefer imported Sanity `page` documents before falling back to the local dataset adapter so CMS content becomes the live source immediately after import.
- SEO impact:
  - Integration impact: repo-local Astro fallback content can now be promoted into Sanity while preserving slug and canonical continuity for root-slug pages.
  - No direct schema change; frontend route resolution now honors CMS content first for imported slugs.
- Verification:
  - Dry-run/import verification executed with the new importer script against the target Sanity dataset.

## 2026-04-02 - Imported Missing MDX Content from Astro Repo into Sanity
- Changed files:
  - `frontend/scripts/import-astro-repo-content.mjs`
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated importer for MDX content stored in the external Astro repo at `/home/ubuntu/Kotacom-supabase-schhool/src/pages`.
  - Import scope was limited to content-document buckets only: `posts`, `services`, `projects`, and `products`.
  - Imported only documents that were missing in Sanity, along with the required `category` documents for referenced taxonomy terms.
  - Left the repo-local fallback pack `frontend/content/astro-local/jasa-cetak-buku-kota` untouched, per migration scope.
- SEO impact:
  - Integration impact: canonical CMS content now exists in Sanity for repo-Astro MDX documents, improving migration completeness across blog/service/project/product routes.
  - No direct SEO schema change; import preserved existing frontend/studio contracts and did not alter the local root-slug fallback pack.
- Verification:
  - Dry run before import reported `36` missing content docs and `89` new categories.
  - Write run imported `20` posts, `3` services, `12` projects, `1` product, and `89` categories.
  - Post-import dry run reported `missingTotal: 0`.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Code-Driven `layanan/[slug]` Coverage from Astro JSON Source
- Changed files:
  - `frontend/content/astro-local/json-usaha/Biro_jasa_perizinan.json`
  - `frontend/content/astro-local/json-usaha/Jasa_pengukuhan_PKP.json`
  - `frontend/content/astro-local/json-usaha/agency_landing.json`
  - `frontend/lib/local-content/json-usaha.ts`
  - `frontend/components/ui/json-usaha-page.tsx`
  - `frontend/app/(main)/layanan/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Copied the Astro `json_usaha` business-page source files into the frontend repo as migration-safe local content input.
  - Added a normalization adapter that maps the raw JSON structures into a single code-driven page contract for Next.js.
  - Implemented `/(main)/layanan/[slug]` as a static route that generates pages from the normalized JSON source and renders shared section blocks for hero, service list, pricing, testimonials, FAQ, and CTA.
  - This closes the missing legacy business-page gap for the `layanan/[slug]` Astro route without moving the content into Sanity.
- SEO impact:
  - Integration impact: preserves legacy business-page route coverage in a code-driven form while keeping metadata generation and breadcrumb/service/FAQ JSON-LD on the Next side.
  - No direct Sanity schema/query impact.
- Verification:
  - JSON source coverage check confirmed `3/3` slugs: `agency-landing`, `biro-jasa-perizinan`, `jasa-pengukuhan-pkp`.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Money Pages Content Quality Pass v2 (Manual Intent Rewrite + CTA Reuse)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded manual money-page rewrite overrides from generic priority CTA tuning into a deeper intent rewrite pass for 16 commercial slugs.
  - Fine-tuned conversion copy per slug on headline-level keyword focus (`primaryKeyword`), intro framing, final CTA message, CTA button label, and manual FAQ pairs to better match user intent on key commercial routes.
  - Included selected pages across website/printing/software clusters (`pembuatan-website`, `harga`, `jasa-migrasi-wordpress`, key `jasa-pembuatan-website-*`, `template`, `percetakan`, `cetak-buku`, `cetak-brosur`, `cetak-company-profile`, `cetak-kartu-nama`, `cetak-kemasan-product`, `software`, `pembuatan-software`, `implementasi-software`, `instalasi-software`, `sistem-pos`).
  - Synced shared UI behavior by replacing hardcoded final CTA text with `copy.ctaLabel` fallback in both rewrite and legacy landing section components so messaging remains consistent with page-specific rewrite copy.
- SEO/integration impact:
  - Direct SEO impact: stronger intent alignment and commercial relevance for priority money pages via manual copy tuning beyond rule-based enrichment.
  - Integration impact: UI CTA label now reuses central copy contract, reducing content/render drift between rewrite-content engine and rendered page CTA.
  - Astro vs Next comparison note: static Astro manifest supplies route/title scaffolding, while this pass upgrades Next rewrite output to intent-led commercial messaging on selected high-value pages.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Manual diff review completed for rewritten slugs and CTA reuse wiring.

## 2026-04-02 - City Money Pages Pass v1 (`jasa-cetak-buku-*` Top 20) + Metadata Sync
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added manual intent overrides for top 20 GSC-priority city slugs in `buildPercetakanCetakBukuCityCopy` (`surabaya`, `sidoarjo`, `mojokerto`, `samarinda`, `jeneponto`, `mataram`, `banjarmasin`, `polewali-mandar`, `kendari`, `manado`, `jayapura`, `medan`, `pontianak`, `tomohon`, `kepulauan-sangihe`, `manokwari-selatan`, `sarolangun`, `palu`, `tanjung-pinang`, `pringsewu`).
  - Enriched city copy with more specific intro/CTA/final-CTA direction and city-level conversion framing.
  - Added reusable city FAQ set in the city-copy builder to keep long-tail city pages aligned with the same conversion and trust structure.
  - Synced city shell rendering to prefer rewrite copy for on-page intro/description instead of falling back to legacy excerpt text.
  - Synced root-slug metadata generation to use rewrite city title/description, so metadata output matches rendered city-copy strategy.
- SEO/integration impact:
  - Direct SEO impact: improved intent specificity and snippet quality across high-priority city commercial pages.
  - Integration impact: city route metadata and rendered content now share one rewrite source of truth, reducing copy drift between route-level metadata and UI output.
  - Cross-layer sync: frontend metadata route (`/(main)/[slug]`), rewrite content engine, and city-shell renderer updated in the same task.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Manual check completed against local GSC priority source (`frontend/tmp/gsc-kotacom-full-sitemap0/gsc-pages-priority.csv`) for city target selection.

## 2026-04-02 - Frontend CTA Expansion + Live SEO Pass Check (Priority Sample)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded centralized CTA strategy in rewrite engine:
    - Added section-level CTA seed packs (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) with mixed action intents (consultation, estimate, package, FAQ, discovery).
    - Added CTA de-duplication helper and merged page CTA + section CTA defaults to increase conversion action options per page.
    - Strengthened default final CTA description to be more action-oriented.
  - Expanded frontend conversion surfaces in both rewrite and legacy templates:
    - Added new mid-page conversion section `#cta-mid`.
    - Added extra final CTA action (`Lihat FAQ`) so users have more decision paths near final conversion block.
    - Added TOC entry for mid CTA when CTA links are available.
  - Ran live SEO metadata audit for priority sample with unrestricted network:
    - Output: `frontend/tmp/seo-pass-front-20260402-escalated/seo-metadata-audit.csv`
    - Summary: `frontend/tmp/seo-pass-front-20260402-escalated/seo-metadata-audit-summary.json`
- SEO/integration impact:
  - Direct frontend UX/SEO impact: stronger CTA density and clearer internal conversion paths across commercial page templates.
  - SEO pass status (live sample, 120 URLs): **not fully pass yet**.
    - `meta_description_too_long`: 106
    - `title_too_long`: 22
    - `http_status_not_200`: 10
  - Interpretation: residual failures are still dominated by legacy live pages/redirect gaps and long metadata on production URLs, not only migrated frontend templates.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec node scripts/audit-seo-metadata.mjs -- --input-csv ./tmp/gsc-kotacom-full-sitemap0/gsc-pages-priority.csv --input-column page --out-dir ./tmp/seo-pass-front-20260402-escalated --concurrency 6 --max-urls 120 --timeout-ms 12000` completed.

## 2026-04-02 - Frontend Metadata Normalization Unification + Money-Page Length Pass
- Changed files:
  - `frontend/lib/seo-normalize.ts` (new)
  - `frontend/lib/legacy-pages/metadata.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added shared frontend SEO normalization utility for title and description length management (`normalizeSeoTitle`, `normalizeSeoDescription`) in `frontend/lib/seo-normalize.ts`.
  - Refactored legacy metadata generator to use shared utility instead of local duplicate normalize functions.
  - Applied the same normalization in `frontend/sanity/lib/metadata.ts` (`buildMetadata`) so `generateBasicMetadata` and `generatePageMetadata` outputs are aligned with the same title/description quality envelope.
  - Improved short-title behavior to always reach minimum practical SEO title length by extending short outputs safely (for example on compact service names).
  - Validated money-page and city-page metadata lengths from frontend source layer:
    - 14 money routes (`/pembuatan-website*`, `/percetakan*`, `/software*`, `/sistem-pos`)
    - 20 top city routes (`jasa-cetak-buku-*` priority set)
    - Result: `TOTAL_FAIL=0`, `CITY_TOTAL_FAIL=0` for target ranges (title 30-60, description 120-155).
- SEO/integration impact:
  - Direct SEO impact: consistent metadata normalization across legacy and non-legacy metadata generators reduces title/description length outliers on frontend-generated routes.
  - Integration impact: one shared utility now controls normalization policy, reducing drift risk between route families.
  - Note on live-site gap: production audit sample still shows unresolved legacy URL issues outside migrated frontend scope and requires redirect/content cleanup waves.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm dlx tsx` metadata-length verification script run from `frontend` workspace confirmed pass for targeted money/city route sets.
