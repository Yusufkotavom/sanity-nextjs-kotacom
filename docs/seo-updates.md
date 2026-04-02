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
