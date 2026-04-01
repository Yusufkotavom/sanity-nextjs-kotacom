# Astro to Next.js + Sanity Migration Plan (Kotacom)

Date: 2026-04-01
Source project (Astro): `/home/ubuntu/Kotacom-supabase-schhool`
Target project: `/home/ubuntu/next-js-sanity-starter`

## 1) Current Source Inventory

### Primary route groups detected in Astro
- Static/content pages: `/`, `/about`, `/contact`, `/privacy`, `/search`
- Blog/posts:
  - `/posts/[...page]`
  - `/posts/*.mdx`
  - `/category/[tag]/[...page]`
- Services:
  - `/services/index`
  - `/services/[...slug]`
  - `/services/[category]/[...page]`
- Products:
  - `/products/[...slug]`
  - `/products/[...page]`
  - `/products/[category]/[...page]`
- Projects:
  - `/projects/[...slug]`
  - `/projects/[...page]`
  - `/projects/[category]/[...page]`
- Legacy commercial landing groups:
  - `/pembuatan-website/*`
  - `/percetakan/*`
  - `/software/*`
  - `/layanan/*`
  - many root-level legacy post-like URLs

### SEO-related Astro components found
- `BaseHead.astro`, `SchemaMarkup.astro`, `AutoSchema.astro`, `partials/SeoPaginationHead.astro`, `partials/ItemListJsonLd.astro`

### Data dependencies found
- Supabase client present: `src/lib/supabase`
- SEO/content datasets in `src/data/*`
- MDX content in `src/pages/posts/*.mdx`, `services/*.mdx`, `projects/*.mdx`

## 2) Migration Principles

1. Freeze target URL architecture first (Next + Sanity), then migrate content.
2. Keep SEO fields single-source in Sanity (`seoSettings` global fallback + per-document override).
3. Do not depend on Supabase (suspended). Replace with Sanity documents/portable text.
4. Redirects activated in waves after route parity and metadata parity are validated.

## 3) Target URL Strategy (recommended)

- Blog posts: `/blog/[slug]`
- Blog category: `/blog/category/[slug]`
- Services: `/services/[slug]`
- Products: `/products/[slug]`
- Projects: `/projects/[slug]`
- Legacy landing pages:
  - Keep selective high-performing pages as dedicated pages.
  - Remaining legacy URLs redirected to canonical target pages.

## 4) Execution Phases

### Phase A - Content & Schema Parity (first)
- Map Astro content types to existing Sanity schema:
  - post, service, product, project, category, seo settings, navigation
- Add missing fields only when required by front-end rendering (avoid schema bloat).
- Import/migrate MDX content into Sanity documents.

### Phase B - Frontend Parity (Next)
- Build/align templates for:
  - blog detail/list/category
  - services/products/projects detail/list/category
  - key landing pages kept as canonical pages
- Port critical structured data behavior (Article, Breadcrumb, ItemList, Organization/WebSite where relevant).

### Phase C - SEO Stabilization
- Resolve metadata gaps from audit summary first:
  - `http_status_not_200`
  - overly long titles/descriptions
  - missing canonicals/OG on edge pages
- Ensure sitemap and robots outputs reflect canonical target structure.

### Phase D - Redirect Rollout
- Wave 1: high-traffic auto redirects (`gsc-redirect-auto-top1000.csv`)
- Wave 2: manual high-priority mappings (`gsc-manual-priority-top300.csv`)
- Wave 3: long tail
- Monitor 404/soft404 and indexing coverage after each wave.

## 5) Ready Data Assets (already generated)

- `frontend/tmp/gsc-kotacom-full-sitemap0/gsc-migration-curation.csv`
- `frontend/tmp/gsc-kotacom-full-sitemap0/gsc-redirect-auto-top1000.csv`
- `frontend/tmp/gsc-kotacom-full-sitemap0/gsc-manual-priority-top300.csv`
- `frontend/tmp/gsc-kotacom-full-sitemap0/seo-metadata-audit-summary.json`

## 6) Immediate Next Build Tasks

1. Route contract document:
   - final one-to-one mapping from Astro source paths to Next target paths.
2. Manual mapping completion for top 300 legacy URLs.
3. Sanity content import for high-traffic legacy pages not represented in current dataset.
4. Implement redirect import pipeline into Sanity `redirect` document.

