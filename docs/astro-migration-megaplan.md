# Astro -> Next.js + Sanity Mega Plan

Date: 2026-04-01
Scope: Migration + per-URL curation + SEO rewrite optimization + UI redesign/refactor

## Goal

Migrate legacy Astro source into current Next.js + Sanity stack with:
- stable URL architecture
- SEO parity/improvement (technical + metadata + content quality)
- modernized UI system
- phased low-risk rollout (no ranking collapse)

## Success Metrics (Definition of Success)

- Build stability:
  - [ ] `pnpm --filter frontend run build` green
  - [ ] `pnpm --filter studio run build` green
- SEO technical:
  - [ ] `http_status_not_200` issue count reduced >= 80%
  - [ ] missing title/description/canonical/OG = 0 on canonical pages
  - [ ] sitemap + robots valid for target routes
- Migration coverage:
  - [ ] top 1000 auto-redirect mapped and deployed in staged wave
  - [ ] top 300 manual legacy URLs curated one-by-one
  - [ ] content parity for core templates (blog/service/product/project)
- UX redesign:
  - [ ] new design system applied to key templates
  - [ ] mobile + desktop verified for header/nav/CTA/content pages

## Current Status Snapshot (Already Done)

- [x] GSC export + migration curation pipeline built
- [x] metadata audit script built and executed
- [x] URL inspection script built (quota-aware caveat)
- [x] sitemap-driven export run with `sitemap-0.xml`
- [x] Astro source repository discovered and inventoried
- [x] baseline migration blueprint documented
- [x] route contract v1 published (`docs/astro-next-route-contract.md`)
- [x] top-300 manual curation worklist initialized (`docs/curation/manual-top300-worklist-v1.csv`)

## Workstream A - Platform & Data Foundation

### A1. CMS Contract Freeze
- [ ] Finalize document contracts for `post`, `service`, `product`, `project`, `category`, `seoSettings`, `redirect`.
- [ ] Remove/disable unused Supabase dependencies in migration path.
- [ ] Confirm frontend query contracts mirror studio schema exactly.

### A2. Route Contract Freeze
- [x] Publish canonical target route map:
  - `/blog/[slug]`
  - `/blog/category/[slug]`
  - `/services/[slug]`
  - `/products/[slug]`
  - `/projects/[slug]`
- [ ] Mark exceptions for legacy pages to keep as dedicated landing pages.
- [ ] Identify routes to be redirected only.

### A3. Import Pipeline
- [ ] Define extractor from Astro source content (MDX/frontmatter/static data) to import payload.
- [ ] Import high-priority content first (GSC weighted).
- [ ] Validate slug uniqueness and canonical mapping.

## Workstream B - Per-URL Curation (One by One)

### B1. Manual Queue Execution (Top 300)
- [x] Process `gsc-manual-priority-top300.csv` line-by-line.
- Note: v3 one-by-one curation completed for top-300 with explicit final decision per URL; 32 items remain `keep_or_redirect` pending CMS content existence validation.
- Progress snapshot (2026-04-01):
  - `approved_redirect`: 268
  - `approved_keep_or_redirect`: 32
  - `pending_manual_intent`: 0
  - Output files: `docs/curation/manual-top300-worklist-v3.csv`, `docs/curation/manual-top300-approved-redirect-v3.csv`, `docs/curation/manual-top300-keep-or-redirect-review.csv`, `docs/curation/manual-top300-pending-manual-intent-v3.csv`
- [ ] For each URL, assign:
  - keep (migrate as page)
  - merge (map to nearest canonical)
  - redirect (301 target)
- [ ] Add explicit reason code per mapping decision.

### B2. Auto Queue QA (Top 1000)
- [ ] Validate `gsc-redirect-auto-top1000.csv` for false positives.
- [ ] Spot check by intent similarity (topic, keyword, business intent).
- [ ] Approve for wave-based deployment.

### B3. Long-tail Backlog
- [ ] Continue remaining manual queue (750 total manual candidates).
- [ ] Archive low-value URLs (noindex/410 strategy candidate list).

## Workstream C - SEO Rewrite & Optimization

### C1. Metadata Rewrite Program
- [ ] Rewrite title/meta for high-impression URLs with quality guardrails.
- [ ] Enforce length policy:
  - title target 50-60 chars
  - meta description target 120-155 chars
- [ ] Ensure canonical consistency for paginated and variant pages.

### C2. Structured Data
- [ ] Align JSON-LD by template (Article, BreadcrumbList, ItemList, Organization, WebSite).
- [ ] Ensure fallback global SEO data always available.
- [ ] Validate no schema duplication/conflict.

### C3. Technical SEO Fixes
- [ ] Resolve non-200 target pages prioritized by traffic.
- [ ] Remove orphan/no-value thin pages from index strategy.
- [ ] Rebuild sitemap coverage by canonical route set.

## Workstream D - UI Redesign + Refactor

### D1. Design System Alignment
- [ ] Define reusable primitives: typography, spacing, button variants, card patterns, nav behavior.
- [ ] Harmonize with current header/nav architecture and CMS-driven menus.

### D2. Template Refactor Priority
- [ ] Homepage
- [ ] Blog detail/list/category
- [ ] Service detail/list
- [ ] Product detail/list
- [ ] Project detail/list

### D3. Content UX Upgrade
- [ ] Improve readability modules (TOC, CTA in-content, related links, FAQ blocks).
- [ ] Ensure internal linking slots are CMS-configurable.

## Workstream E - Redirect Deployment Strategy

### E1. Wave Rollout
- [ ] Wave 1: top traffic redirects only (safe subset).
- [ ] Wave 2: remaining validated auto redirects.
- [ ] Wave 3: curated manual redirects.

### E2. Post-wave Monitoring
- [ ] Check 404/redirect-chain loops.
- [ ] Check GSC coverage/index trend after each wave.
- [ ] Rollback rules prepared for bad mappings.

## Content Movement Mega Plan

### Source Buckets
- [ ] Astro `posts/*.mdx` -> Sanity `post`
- [ ] Astro `services/*.mdx` -> Sanity `service`
- [ ] Astro `projects/*.mdx` -> Sanity `project`
- [ ] Legacy landing trees (`pembuatan-website`, `percetakan`, `software`, `layanan`) ->
  - keep-as-page OR merge-into-canonical OR redirect-only

### Movement Checklist Per Item
- [ ] Normalize slug
- [ ] Set canonical target route
- [ ] Map category/taxonomy
- [ ] Rewrite title + meta + OG
- [ ] Add schema blocks needed
- [ ] Add internal links to canonical cluster
- [ ] Mark redirect old URL

## Execution Cadence

### Sprint 1 (Foundation)
- [ ] Freeze schema/query/route contracts
- [ ] Start top-300 manual curation
- [ ] Fix highest-impact non-200 pages

### Sprint 2 (Template + Metadata)
- [ ] Complete core template parity
- [ ] Rewrite high-impression metadata batch
- [ ] Deploy redirect wave 1

### Sprint 3 (Scale + Cleanup)
- [ ] Expand content movement long-tail
- [ ] Deploy redirect wave 2-3
- [ ] Stabilize index coverage and remove residual gaps

## Risks & Controls

- Risk: redirect ke halaman intent tidak cocok -> Control: mandatory intent QA for high-impression URLs.
- Risk: schema/query mismatch after refactor -> Control: studio/frontend sync check in each PR.
- Risk: quota limits for URL inspection -> Control: schedule inspection in batches and cache results.

## Tracking Files

- Migration mapping data:
  - `frontend/tmp/gsc-kotacom-full-sitemap0/gsc-migration-curation.csv`
  - `frontend/tmp/gsc-kotacom-full-sitemap0/gsc-redirect-auto-top1000.csv`
  - `frontend/tmp/gsc-kotacom-full-sitemap0/gsc-manual-priority-top300.csv`
- Plan and execution docs:
  - `docs/astro-to-next-migration-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
