# Repo Frontend + Sanity Architecture & Agent Operations Guide

Tanggal: 2026-04-06  
Status: Living document (codebase-driven)

## 1) Executive Summary

### Ringkasan temuan utama
- **FAKTA:** Repository ini adalah **pnpm monorepo** dengan app utama `frontend` (Next.js App Router), `studio` (Sanity Studio), `seo-dashboard` (ops app), `worker`, dan beberapa shared package (`packages/*`).
- **FAKTA:** Frontend berjalan dengan **Next.js 16 + React 19**, server components default, App Router, route groups `(main)`, hybrid data source (Sanity + repo-local legacy content).
- **FAKTA:** Integrasi Sanity sudah cukup matang: query layer terpisah, metadata fallback global `seoSettings`, reusable sections global, webhook revalidation, redirect sinkron dari dokumen `redirect`.
- **INFERENSI:** Sistem saat ini mengusung pola **hybrid migration**: route shell kode lama/rewrite tetap dipertahankan, Sanity memberi top/bottom support blocks via `topBlockCount`.
- **RISIKO UTAMA:** Ada ketidaksinkronan contract block SEO: schema/frontend renderer sudah mendukung (`company-info`, `testimonials-block`, `pricing-block`, `faq-block`), tetapi shared GROQ `blocksQuery` belum memproyeksikan block SEO tersebut.
- **PELUANG UTAMA:** Menstandarkan contract “schema -> query -> renderer -> docs -> scripts” dengan checklist sinkron otomatis akan menurunkan regression ketika menambah block/page type.

---

## 2) Repository Map

### Struktur strategis
- `frontend/` -> aplikasi publik Next.js.
- `studio/` -> Sanity Studio, schema, desk structure, document actions.
- `seo-dashboard/` -> dashboard operasional SEO terpisah.
- `worker/` -> proses background/cron worker.
- `packages/*` -> shared package (`db`, `ai`, `search`, `seo`, `content`, `sanity`).
- `docs/` -> dokumentasi operasional, migration plan, SEO logs.
- `skills/` -> skill bundle internal (termasuk vendored `claude-seo`).

### Entry points penting
- Root workspace: `package.json`, `pnpm-workspace.yaml`.
- Frontend app entry: `frontend/app/layout.tsx` dan route files di `frontend/app/(main)`.
- Sanity Studio entry: `studio/sanity.config.ts`.
- Frontend-Sanity fetch gateway: `frontend/sanity/lib/fetch.ts`.

---

## 3) Frontend Architecture Map

### Routing & rendering strategy
- **FAKTA:** App Router dengan route group `(main)` dan route dinamis (`[slug]`, `[...segments]`) untuk page/template resolver.
- **FAKTA:** Kombinasi jalur render:
  1. Pure Sanity block pages (`/[slug]` jika dokumen `page` ada),
  2. Template pages (`pageLocation/serviceLocation` -> `RewritePageShell`),
  3. Local fallback pages (legacy/static dataset),
  4. Hybrid pages (`PageHybridShell` untuk `/`, `/pembuatan-website`, `/percetakan`, `/software`).
- **FAKTA:** Main layout SSR server component fetch reusable sections + header/footer + floating WA + draft mode tools.

### Data layer & cache
- Fetch abstractions di `frontend/sanity/lib/fetch.ts`:
  - `fetchPublished` (no cache hint),
  - `fetchPublishedCached` (`next.revalidate`, tags).
- Global data (settings/navigation/theme/seo/reusable sections) pakai cache & tags.
- Detail content (page/post/product/service/project) revalidate 600 detik.
- `revalidate` layout `(main)` = 600.

### Preview & draft
- Draft mode menggunakan `next-sanity/live` (`SanityLive`, `defineLive`) dan `VisualEditing` di layout `(main)`.

### Error/loading boundaries
- Ada `app/error.tsx`, `app/global-error.tsx`, `app/not-found.tsx` dan per-route loading/error untuk `[slug]`.

---

## 4) Sanity Integration Map

### Client config
- `frontend/sanity/lib/client.ts`: `createClient` dengan `perspective: published`, stega filter khusus field UI props.
- Env contract via `frontend/sanity/lib/env.ts` (`NEXT_PUBLIC_SANITY_*`, `useCdn` by env/prod default).

### Query layer
- Query modular per domain (`page`, `post`, `product`, `service`, `project`, `template-page`, `navigation`, `settings`, `seo-settings`, dsb).
- Shared fragments: `shared/blocks`, `shared/meta`, `shared/image`, `shared/link`, `shared/body`.

### Preview/revalidation/webhook
- `app/api/revalidate/route.ts` melakukan `revalidatePath` berbasis `_type` + optional forward webhook ke `seo-dashboard` untuk indexing submit.

### Image/content handling
- `sanity/lib/image.ts` + `urlFor` dipakai konsisten di metadata dan page detail.
- Portable text dirender via `components/portable-text-renderer.tsx`.

### Studio customizations
- Singleton types, custom desk structure, presentation mappings, custom actions:
  - AI rewrite/extend untuk post/service/project,
  - Apply hybrid preset + convert page->post untuk `page`.

---

## 5) Content Model & Document Relationship Map

### Global/singleton docs
- `settings`: branding/logo/social/WhatsApp global.
- `navigation`: nav links + header CTA.
- `themeSettings`: token warna tema.
- `seoSettings`: fallback metadata + trust signals + pricing/testimonials/faq global.
- `seoOpsSettings`, `aiWriterSettings`: ops singleton.

### Core content docs
- `page`, `post`, `product`, `service`, `project`, `category`, `author`, `faq`, `testimonial`.
- `redirect` untuk path redirects dari Sanity.
- `reusableSection` untuk slot global (before/after header/footer).

### Template/migration docs
- `pageTemplate` (variant + structured rewrite copy + optional blocks + metaDefaults).
- `pageLocation` dan `serviceLocation` sebagai route-target docs untuk template resolver.
- `location`, `serviceType` sebagai supporting reference.

### Relasi utama
- post/product/service/project -> categories[] refs.
- post -> author ref.
- pageLocation/serviceLocation -> template ref (+ location/service/serviceType refs).
- page/post/service/project menggunakan shared `pageBlocks`.

---

## 6) Templating & Rendering Flow

### Flow A: Generic slug route
`request /:slug -> app/(main)/[slug]/page.tsx -> fetchTemplatePageByRoute(route)`  
- jika template ada: `RewritePageShell` virtual page.  
- jika tidak ada: `fetchSanityPageBySlug` -> `Blocks`.  
- fallback terakhir: local city dataset `jasa-cetak-buku-kota`.

### Flow B: Nested route template
`request /a/b/c -> app/(main)/[...segments]/page.tsx -> fetchTemplatePageByRoute` -> `RewritePageShell`.

### Flow C: Hybrid main routes
`route page -> PageHybridShell(slug)` -> split `blocks[]` pakai `topBlockCount` -> render top blocks -> code-owned middle shell -> bottom blocks.

### Block resolver
- `components/blocks/index.tsx` pakai dynamic import + `componentMap` berbasis `_type`.
- Unknown block fallback: warning + placeholder div.

### Fallback logic
- Metadata fallback: `meta.* -> page fields -> seoSettings global -> hardcoded default image`.
- Canonical fallback: `NEXT_PUBLIC_SITE_URL + slug`.
- Robots noindex: non-production atau `defaultNoIndex` atau page-level noindex.

---

## 7) Page Type Implementation Map

### Home (`/`)
- Source: `page` slug `index` + code middle section.
- Renderer: `app/(main)/page.tsx` + `PageHybridShell` + `HomePeparMiddleSection`.
- Jika ubah: cek `frontend/app/(main)/page.tsx`, `components/hybrid/*`, query `page.ts`, schema `page.ts`.

### Generic/static page (`/[slug]`)
- Source prioritas: `pageLocation/serviceLocation` template; fallback `page`; fallback local city dataset.
- Renderer: `app/(main)/[slug]/page.tsx`.
- Jika ubah: cek fetch/template resolver + `RewritePageShell` + `Blocks`.

### Blog detail/listing
- Detail: `app/(main)/blog/[slug]/page.tsx`, query `POST_QUERY`, PortableText + optional blocks + JSON-LD article.
- Listing: `app/(main)/blog/page.tsx` + categories filter.

### Product/service/project detail
- Detail pages menggabungkan hero image, body, taxonomy, optional blocks, WhatsApp CTA, JSON-LD.
- Category listing digabung di slug route (`/services/[slug]`, `/products/[slug]`) berdasarkan slug category.

### Landing/marketing hybrid (pembuatan-website, software, percetakan)
- Render: `PageHybridShell` + `RewritePageShell`.
- Sumber copy dominan: `lib/legacy-pages/rewrite-content` dan/atau template docs.

---

## 8) Reusable Components & Block Inventory

### Reusable global patterns
- Layout shell: `Header`, `Footer`, `ReusableSlotSections`, `FloatingWhatsApp`.
- Block system: hero, split, grid, carousel, timeline, cta, faqs, newsletter, all-posts, legacy-rich-content, SEO blocks.
- Reusable card/grid domain: `PostGrid`, `ProductGrid`, `ServiceGrid`, `ProjectGrid`.

### Reusable block constraints
- Semua blocks yang dipakai frontend harus sinkron di 3 layer:
  1. Studio `page-blocks` type list,
  2. Frontend GROQ fragment (`shared/blocks.ts`),
  3. Frontend renderer map (`components/blocks/index.tsx`).
- **FAKTA mismatch saat ini:** layer (1) & (3) sudah memasukkan SEO blocks, layer (2) belum.

### Style system
- Tailwind v4 (CSS first) + custom utilities (`ui-shell`, typography utilities, surface panel).
- Theme tokens berasal dari CSS variables + override dari `themeSettings`.

---

## 9) Style Guide & Implementation Constraints

### Rule of thumb implementasi
1. **Reuse first**: gunakan `components/blocks/*`, `components/ui/*`, `RewritePageShell`, `PageHybridShell` sebelum buat komponen baru.
2. Ubah contract CMS-driven selalu lintas layer: schema + query + render.
3. Untuk route utama/hybrid, jaga middle shell code-owned (jangan full replace oleh CMS tanpa keputusan eksplisit).
4. Gunakan fallback metadata helper (`generatePageMetadata`/`generateBasicMetadata`) agar konsisten canonical/robots/OG.

### Hindari
- Menambah `_type` block baru tanpa update `shared/blocks.ts`.
- Menambahkan link object di seed/mutation tanpa `isExternal`.
- Menulis public document ID dengan titik (`.`).

---

## 10) SEO & EEAT Audit

### Temuan implementasi
- **Metadata:** terpusat di `sanity/lib/metadata.ts`, ada fallback global `seoSettings` + canonical + OG/Twitter + robots policy.
- **Sitemap/robots:** dynamic dari Sanity + static route + local dataset route, dengan noindex exclusions.
- **Schema markup:** Organization/WebSite/LocalBusiness hardcoded di root layout + page-level JSON-LD untuk article/product/service/breadcrumb.
- **EEAT:** ada field trust signals global (`seoSettings.companyInfo`, `testimonials`, `pricingPackages`, `faq`) dan block SEO khusus.

### Gap prioritas
1. Contract mismatch SEO blocks (tinggi).
2. Structured data Organization/LocalBusiness masih hardcoded; belum sepenuhnya source dari `seoSettings/settings`.
3. Hreflang masih statis `id-ID` tunggal di metadata helper.
4. Canonical language alternates belum route-aware (semua menunjuk root id-ID).

---

## 11) Risks, Gaps, and Technical Debt

- Kombinasi legacy rewrite + template + Sanity blocks menciptakan kompleksitas jalur render.
- Banyak route slug handlers multi-purpose (detail + category + local fallback) -> rawan regression jika contract berubah.
- Potensi mismatch schema-query-render (contoh SEO block).
- Banyak script operasi content; tanpa index/registry terstruktur agent berisiko memilih script yang salah.

---

## 12) Flow Changes / Outdated Docs Detection

### Perubahan flow penting (terdeteksi dari code)
- Hybrid main page pattern sudah aktif untuk beberapa slug utama via `PageHybridShell` + `topBlockCount`.
- Redirect source of truth split: structural wildcard di `next.config.mjs`, specific redirect dari Sanity `redirect` docs.
- SEO ops menjadi app terpisah (`seo-dashboard`) dan webhook revalidate bisa trigger indexing webhook.

### Dokumen yang perlu tetap dijaga sinkron
- `docs/astro-migration-megaplan.md`
- `docs/sanity-redirect-management.md`
- `docs/hybrid-page-cli-workflow.md`
- `docs/sanity-seed-guardrails.md`

---

## 13) Internal Documentation for Agents (Operational SoT)

### Checklist wajib sebelum implementasi
1. Tentukan page type target (hybrid / template / pure Sanity / legacy fallback).
2. Telusuri schema dokumen terkait di `studio/schemas/documents/*`.
3. Telusuri query terkait di `frontend/sanity/queries/*`.
4. Telusuri fetch helper yang dipakai route.
5. Telusuri renderer chain (`page.tsx` route -> component -> blocks).
6. Jika add/change field CMS-driven: update schema + query + render + docs.
7. Jika write content publik ke Sanity: jalankan guardrails (`_id`, `_key`, `isExternal`).
8. Update `docs/seo-updates.md` setiap perubahan repo.
9. Untuk task migration/SEO/redesign: update `docs/astro-migration-megaplan.md` status snapshot + workstream.

### Rule memilih komponen existing
- Block content: prioritaskan `components/blocks/*`.
- Rich long-form: gunakan `PortableTextRenderer`.
- CTA WhatsApp: gunakan `GlobalWhatsAppPanel` / `GlobalWhatsAppButton` / block `whatsapp-cta`.
- Hybrid landing: gunakan `PageHybridShell` + `RewritePageShell`.

### Rule update konten Sanity
- Gunakan script frontend/studio existing dahulu.
- Gunakan dev-first auth (`SANITY_DEV` fallback `SANITY_AUTH_TOKEN`).
- Lakukan dry-run jika script menyediakan mode ini.

---

## 14) Recommended Agent Skills

### 1. Repo Frontend + Sanity Analyst
- Tujuan: audit architecture + mapping schema/query/renderer berbukti file.
- Gunakan saat: discovery, impact analysis, bug kontrak CMS.
- Jangan gunakan saat: hanya butuh copywriting konten.
- Input: route/feature scope.
- Output: chain perubahan file-level + risk map.

### 2. Sanity Block/Page Selector
- Tujuan: memilih block yang kompatibel dengan renderer aktif.
- Guardrail: validasi block type ada di schema + query + renderer.

### 3. Page Implementation Planner
- Tujuan: breakdown implementasi page baru/update existing tanpa duplikasi.
- Output: langkah file-level + fallback plan.

### 4. Sanity Content Payload Builder
- Tujuan: mapping brief -> payload schema valid.
- Guardrail: field wajib, `_key`, `isExternal`, `_id` public-safe.

### 5. Sanity Upload/Update Operator
- Tujuan: eksekusi script write/update dengan dry-run/logging.
- Guardrail: dev-first credentials, no token leakage, post-write public-read audit.

### 6. Post/Page Content Generator with Guardrails
- Tujuan: draft konten sesuai model nyata + tone bisnis.
- Guardrail: dilarang klaim fitur di luar bukti repo/content.

### 7. SEO & EEAT Auditor
- Tujuan: audit metadata, schema, IA, trust signals, internal links.
- Guardrail: rekomendasi harus terkait file/schema/query konkret.

### 8. Competitor/Page Comparison Analyst
- Tujuan: bandingkan halaman eksternal vs template internal.
- Guardrail: hasil berupa rekomendasi implementable file-level.

### 9. Documentation Sync Checker
- Tujuan: deteksi mismatch code vs docs/skills.
- Output: daftar dokumen/skill/script yang wajib diselaraskan.

---

## 15) Recommended Reusable Scripts

### Prioritas adaptasi script yang sudah ada
1. **Block/page type inventory auditor**  
   Basis: `frontend/scripts/check-all-types.mjs` + parse schema/query/renderer map.
2. **Block compatibility validator**  
   Validasi 3-layer: `studio page-blocks` vs `queries/shared/blocks` vs `components/blocks/index`.
3. **Payload generator (page/post)**  
   Extend dari `create-hybrid-page.mjs` / `convert-page-to-post.mjs` dengan output JSON payload terverifikasi.
4. **Sanity update operator (dry-run/write)**  
   Standarkan pattern dari script import/update existing (`import-approved-redirects`, `update-curation-with-sanity`).
5. **Public-read verification script**  
   Setelah write, query tanpa token untuk slug target + dereference references.

### Required capabilities
- Input validation, dry-run, audit log, error summary, exit code non-zero saat gagal.

---

## 16) Prioritized Recommendations

### Quick wins
1. Sinkronkan SEO block fragments di `frontend/sanity/queries/shared/blocks.ts`.
2. Tambah script `block-contract-check` sebagai gate CI ringan.
3. Dokumentasikan matrix route->data source->renderer dalam docs ini (iterasi berikut).

### Medium effort
1. Refactor route slug pages multi-purpose menjadi resolver helper terpisah (kurangi coupling).
2. Pindahkan hardcoded Organization/LocalBusiness JSON-LD ke data-driven `seoSettings/settings` dengan fallback.

### Structural
1. Buat “CMS Contract Test Suite” (schema/query/render parity).
2. Buat registry scripts (`docs/scripts-index.md`) supaya operator agent tidak salah pilih script.

---

## 17) Appendix / Evidence

Evidence utama berasal dari:
- Workspace/config: root `package.json`, `pnpm-workspace.yaml`.
- Frontend routes/layout: `frontend/app/**`.
- Sanity fetch/query/client: `frontend/sanity/lib/*`, `frontend/sanity/queries/*`.
- Block renderer: `frontend/components/blocks/index.tsx`.
- Hybrid/template flows: `frontend/components/hybrid/*`, `frontend/lib/templates/*`.
- Studio schema/config/desk/actions: `studio/schemas/**`, `studio/sanity.config.ts`, `studio/structure.ts`, `studio/presentation/resolve.ts`.
- Guardrails/ops docs & skills: `docs/sanity-seed-guardrails.md`, `skills/sanity-public-content-guardrails/SKILL.md`, `skills/hybrid-content-page-workflow/SKILL.md`, `skills/claude-seo/skills/seo*/SKILL.md`.

