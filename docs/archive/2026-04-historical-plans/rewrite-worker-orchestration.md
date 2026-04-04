# Rewrite Orchestration for 3 Workers

Date: 2026-04-02
Scope: Astro -> Next rewrite (non-blog pages), Vercel-style UI system, SEO hardening, Studio-Frontend sync.

## 1) Execution Model (No File Overlap)

Use 3 worker tracks with strict ownership. A worker may read any file, but only edit files in its owned set.

### Worker 1 - UI System + Navigation Shell
- Owns:
  - `frontend/components/header/**`
  - `frontend/components/footer.tsx`
  - `frontend/components/ui/**`
  - `frontend/components/icons/**`
  - `frontend/app/(main)/layout.tsx`
  - `frontend/app/(main)/style-guide/**`
  - `frontend/app/globals.css`
- Must not edit:
  - `studio/**`
  - `frontend/sanity/**`
  - route content files in service clusters (`pembuatan-website`, `percetakan`, `software`, `layanan`)
- Deliverables:
  - Vercel-like header/nav pattern, CTA placement, dark-mode icon pattern, social icon-only pattern.
  - Reusable button/icon/nav primitives.

### Worker 2 - CMS Contract + Query Integration
- Owns:
  - `studio/schemas/**`
  - `studio/sanity.config.ts`
  - `frontend/sanity/queries/**`
  - `frontend/sanity/lib/**`
  - `frontend/lib/**` (only CMS contract/fetch helpers)
- Must not edit:
  - `frontend/components/header/**`
  - `frontend/components/footer.tsx`
  - `frontend/app/(main)/**` page presentation files (except metadata helpers if needed)
- Deliverables:
  - Studio schema completeness for rewrite needs.
  - Query/fetch contract synchronized with Studio fields.
  - Fallback behavior preserved (`seoSettings` global fallback).

### Worker 3 - Route Rewrite + SEO Application
- Owns:
  - `frontend/app/(main)/about/**`
  - `frontend/app/(main)/contact/**`
  - `frontend/app/(main)/privacy/**`
  - `frontend/app/(main)/layanan/**`
  - `frontend/app/(main)/pembuatan-website/**`
  - `frontend/app/(main)/percetakan/**`
  - `frontend/app/(main)/software/**`
  - `frontend/app/(main)/sistem-pos/**`
  - `frontend/components/legacy/**`
  - `frontend/components/seo/**`
  - `frontend/lib/seo*.ts`
  - `frontend/scripts/generate-astro-local-pages-manifest.mjs`
  - `frontend/lib/legacy-pages/**`
- Must not edit:
  - `studio/**`
  - `frontend/components/header/**`, `frontend/components/footer.tsx`, `frontend/components/ui/**` (consume only)
- Deliverables:
  - Rewrite parity for legacy Astro routes.
  - Metadata/JSON-LD/canonical/robots integration with fallback-safe behavior.

## 2) Mandatory Skills to Use

Each worker must explicitly apply these skills during execution:
- `build-web-apps:frontend-skill` for page/UI composition quality.
- `build-web-apps:react-best-practices` for React/Next quality and performance.
- `build-web-apps:shadcn` for reusable component patterns and shadcn alignment.
- `vercel:geist` for typography/token discipline.
- `skills/sanity-seo-integration/SKILL.md` for Studio-Frontend SEO sync.
- `skills/seo-update-log/SKILL.md` to enforce changelog updates.

## 3) Reusable Component Rule (Hard Requirement)

- No page-specific one-off UI without extraction.
- If repeated >=2 times, extract into shared component under:
  - `frontend/components/ui/**` for primitives.
  - `frontend/components/blocks/**` for section-level compositions.
- Service/city pages must be template-driven using shared section blocks, not custom JSX per page.

## 4) Shared UI Contract (Vercel + shadcn + Geist)

Reference direction:
- `https://vercel.com/security/web-application-firewall`
- `https://vercel.com/home`

Standards:
- Typography: Geist Sans/Mono hierarchy, tight vertical rhythm, clear heading scale.
- Header: compact sticky header, concise nav labels, one strong CTA, balanced spacing.
- Buttons: limited variants (`default`, `outline`, `ghost`, `secondary`) with consistent size map.
- Icons: icon-only where suitable (dark mode + social), uniform stroke/size.
- Layout: wide-but-contained content width, strong whitespace, section rhythm consistency.
- Surfaces: subtle borders/contrast; avoid noisy gradients and ad-hoc color usage.
- Motion: minimal and purposeful only (hover/focus/entry where needed).

## 5) SEO Contract (Must Be 1:1 Studio <-> Frontend)

- Global fallback source is singleton `seoSettings`.
- Per-document SEO fields override global defaults when present.
- Required in frontend metadata pipeline:
  - title template
  - meta description
  - canonical URL
  - OG/Twitter image fallback
  - robots/noindex flags (global + per-doc/category when configured)
- Required in Studio:
  - fields used by frontend must exist in schema and be documented in query contract.
  - no frontend-only SEO fields.
- JSON-LD:
  - Organization + WebSite globally
  - Article/Service/Product/Breadcrumb per template where relevant
  - no invalid/empty schema nodes

## 6) Keyword Focus (Rewrite Wave 1)

Primary clusters to optimize:
- Jasa pembuatan website (nasional + kota pages)
- Percetakan (kategori utama + sublayanan seperti cetak buku/kalender)
- Software/Sistem POS
- Supporting trust pages (about/contact/privacy) for E-E-A-T

Per page minimum:
- 1 primary keyword
- 3-5 semantic supporting terms
- intent-aligned H1, intro, and CTA copy
- unique title/meta (no duplicated boilerplate)

## 7) Quality Gates Before Merge

Every worker must pass:
- `pnpm --filter frontend run typecheck` (if touching frontend)
- `pnpm --filter frontend run build` (if touching frontend routes/metadata)
- `pnpm --filter studio run typecheck` (if touching studio)
- manual check of owned routes/components
- update `docs/seo-updates.md` with changed files + SEO impact + verification

Integration gate (lead agent):
- Validate no file ownership conflict across worker branches.
- Re-run full frontend+studio checks after merge sequence.
- Confirm fallback behavior works when document SEO fields are empty.

## 8) Merge Order

1. Worker 1 (design system/shell) -> base for others.
2. Worker 2 (schema/query contract).
3. Worker 3 (route rewrite + metadata application).

If Worker 2 changes field contracts, Worker 3 rebases and adapts before final merge.

