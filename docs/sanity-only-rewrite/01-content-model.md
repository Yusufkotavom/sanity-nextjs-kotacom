# 01 — CONTENT MODEL FINAL: "Sanity Page + Blocks Only"

> Workstream **WS-A** dari [MASTER-PLAN.md](./MASTER-PLAN.md).
> Tujuan: mendefinisikan model konten final agar **setiap halaman publik = 1 dokumen `page` di Sanity dengan `blocks[]`**, tanpa fallback ke Manifest/cities.json/json-usaha/serviceLocation/pageLocation.
> Status: rancangan konten (READ-ONLY terhadap kode). Belum ada perubahan skema/kode di repo ini — implementasi skema & frontend ada di tahap F1/F2 (lihat §6).

---

## 0. Ringkasan keputusan (TL;DR)

1. **Satu tipe dokumen penyaji halaman:** `page` (diperluas). Semua halaman marketing/hub/landing/legal = `page` doc.
2. **Kunci routing bukan sekadar `slug`, tapi `path`** (route absolut, unik). `slug` tetap ada untuk identitas/preview. Alasannya: halaman kota & layanan punya path bertingkat (`/pembuatan-website/surabaya`, `/percetakan/cetak-buku`) yang tidak bisa diwakili segmen slug tunggal. `path` inilah penggantinya field `route` lama di `serviceLocation`/`pageLocation`.
3. **Koleksi terstruktur tetap berdiri sendiri** (`post`, `product`, `project`, `service`, `author`, `category`, `testimonial`, `faq`) — karena butuh skema khusus untuk JSON-LD (harga, rating, dsb.). Yang berubah: **halaman INDEX-nya** (`/blog`, `/products`, `/projects`, `/services`) menjadi `page` doc dengan blok `collection-list`, dan **semua detail dirender lewat satu mesin blok yang sama**.
4. **Konsolidasi, bukan porting 1:1.** 394 `jasa-cetak-buku-*` + 43 `pembuatan-website/{kota}` = thin content → hanya kota ber-bukti yang jadi `page` doc; sisanya 301/410 (detail di WS-B).
5. **Block library final** = blok eksisting (dirapikan) + tambahan marketing-first (lead-form, comparison-table, collection-list, proof-metrics, project-showcase).
6. **Yang dipensiunkan dari jalur render:** `astro-static-manifest.json`, `cities.json`, `json-usaha/*.json`, `serviceLocation`, `pageLocation`, `pageTemplate`, `legacyPage`, `RewritePageShell` + seluruh `lib/legacy-pages/*`, dan route catch-all `[...segments]` lama.

---

## 1. Skema dokumen `page` (FINAL)

`page` menjadi **satu-satunya dokumen yang dipetakan ke URL publik** (untuk halaman non-koleksi). Struktur final menambah: `path`, `pageType`, `contentStatus`, `author`, `structuredData`, `settings.stickyCta`; dan **menghapus** field hybrid (`topBlockCount`).

### 1.1 Spesifikasi field

| Field | Tipe | Wajib | Grup Studio | Keterangan |
|---|---|---|---|---|
| `title` | string | ✅ | content | Judul H1 default & sumber SEO title bila `seo.title` kosong |
| `path` | string (route) | ✅ | settings | **Route absolut unik**, mis. `/`, `/about`, `/percetakan/cetak-buku`, `/jasa-cetak-buku-surabaya`. Ini kunci routing ke `page`. Validasi: diawali `/`, lowercase, `a-z0-9-/`, unik antar-doc |
| `slug` | slug | ✅ | settings | Segmen path terakhir (source: title). Untuk identitas/preview & internal link target |
| `pageType` | string (enum) | ✅ | settings | `landing` \| `service` \| `service-location` \| `hub` \| `index` \| `legal` \| `about`. Mengatur layout global & aturan render daftar |
| `contentStatus` | string (enum) | ✅ | settings | `draft` \| `review` \| `ready` \| `index`. **Gating publish + sitemap** (§1.3) |
| `seo` (obj) | object | ➖ | seo | `title, description, ogImage, canonical, noindex, focusKeyword, secondaryKeywords` (dipakai ulang `meta` yang sudah ada) |
| `settings` (obj) | object | ➖ | settings | `layout` (`full`\|`sidebar`), `showBreadcrumbs` (bool), `stickyCta` (obj: `enabled`, `label`, `href`, `whatsapp`) |
| `blocks[]` | array (page builder) | ✅ | content | Susunan konten utama (§2). Min 1 blok untuk `contentStatus=index` |
| `author` | reference → `author` | ➖ | content | E-E-A-T: penulis nyata untuk halaman layanan/artikel. Wajib untuk `pageType` bertema editorial |
| `publishedAt` | datetime | ➖ | settings | Tanggal publikasi/update konten (untuk dateModified JSON-LD) |
| `structuredData` (obj) | object | ➖ | seo | JSON-LD opsional: `schemaType` (`Service`\|`LocalBusiness`\|`FAQPage`\|`Organization`\|`WebPage`), plus field pendukung; jika kosong → dibangkitkan otomatis dari `pageType` + `seo` + `settings` |
| `aggregateRating` | object | ➖ | seo | Rating agregat (dipakai JSON-LD), sudah ada |
| `thumbnail` | image | ➖ | content | Preview OG fallback |
| `orderRank` | number | ➖ | — | Urutan editorial (sanity orderable) |

Catatan desain:
- **`path` vs `slug`:** pertahankan `slug` (schema slug) untuk pengalaman author & reference internal, tapi **lookup runtime memakai `path`**. Saat create, `path` di-generate dari `parent path + slug` lalu bisa di-override manual (mis. halaman programmatic). Unik global divalidasi di level aplikasi/plugin.
- **Hapus `topBlockCount`**, seluruh logika hybrid (`HYBRID_PAGE_SLUGS`, shell code-owned) **hilang** — karena tidak ada lagi section "code-owned di tengah halaman". Halaman homepage yang dulu hybrid menjadi murni `blocks[]`.
- **`pageType=index`** adalah special-case: `path` = `/blog`, `/products`, `/projects`, `/services` (index koleksi) atau `/` (homepage). Body-nya tetap `blocks[]`; untuk daftar koleksi dipakai blok `collection-list` (§2), bukan renderer kode khusus.

### 1.2 Bentuk skema (TypeScript ringkas)

```ts
// studio/schemas/documents/page.ts  (TARGET)
defineType({
  name: "page", type: "document", title: "Page",
  groups: [content, seo, settings],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: r => r.required() }),
    defineField({ name: "path", title: "Path (route absolut)", type: "string", group: "settings",
      description: "Contoh: /about, /percetakan/cetak-buku, /jasa-cetak-buku-surabaya",
      validation: r => r.required().custom(validateUniquePath) }),               // diawali '/', lowercase, unik
    defineField({ name: "slug", type: "slug", group: "settings",
      options: { source: "title", maxLength: 96 }, validation: r => r.required() }),
    defineField({ name: "pageType", type: "string", group: "settings", options: { list: PAGE_TYPES }, initialValue: "landing" }),
    defineField({ name: "contentStatus", type: "string", group: "settings",
      options: { list: ["draft","review","ready","index"] }, initialValue: "draft" }),
    pageBlocks,                                                                    // blocks[] (§2)
    defineField({ name: "author", type: "reference", to: [{type:"author"}], group: "content" }),
    meta,                                                                         // → seo {title,description,image,noindex,focusKeyword,secondaryKeywords,canonicalUrl}
    defineField({ name: "settings", type: "object", group: "settings", fields: [layout, showBreadcrumbs, stickyCta] }),
    defineField({ name: "structuredData", type: "object", group: "seo", fields: [schemaType, jsonLdRaw, ...] }),
    defineField({ name: "aggregateRating", type: "aggregateRating", group: "seo" }),
    defineField({ name: "thumbnail", type: "image", group: "content", fields: [alt] }),
    defineField({ name: "publishedAt", type: "datetime", group: "settings" }),
    orderRankField({ type: "page" }),
  ],
});
```

### 1.3 `contentStatus` — gating publish & sitemap (aturan)

| Nilai | Rendered? | Sitemap? | Robots | Kapan dipakai |
|---|---|---|---|---|
| `draft` | ❌ 404 | ❌ | — | WIP author |
| `review` | ✅ (draft mode/preview) | ❌ | `noindex` | QA internal |
| `ready` | ✅ | ❌ | `noindex` | Lulus thick-content tapi belum dipublikasi sengaja |
| `index` | ✅ | ✅ | `index,follow` | Produksi penuh |

Aturan gate (ditegakkan oleh query sitemap & metadata, **bukan** di kode manifest):
- Sitemap memuat `page` hanya bila `contentStatus == "index"` **dan** `seo.noindex != true`.
- `generateMetadata` set `robots` = `noindex` bila `contentStatus in ["draft","review","ready"]` atau `seo.noindex`.
- Checklist wajib sebelum boleh `index` (gate anti-thin, MASTER-PLAN P5/P6):
  - [ ] `seo.title` (≤70) & `seo.description` (≤160) terisi
  - [ ] ≥ 800 kata unik (layanan/komersial), ≥ 1200 (editorial) — dihitung dari teks `blocks[]`
  - [ ] ≥ 1 blok CTA (`cta-1`/`whatsapp-cta`/`lead-form`)
  - [ ] ≥ 3 internal link kontekstual
  - [ ] `author` terisi (untuk halaman layanan/editorial)
  - [ ] `structuredData` valid (atau auto-generate & lolos)

---

## 2. Katalog BLOCK types (FINAL)

Sumber: blok yang **sudah ada** di `studio/schemas/blocks/**` dan dipetakan di `frontend/components/blocks/index.tsx` + `page-blocks.ts`, ditambah **usulan tambahan marketing-first**. Semua blok wajib punya: `padding` (`section-padding`), `colorVariant` (`color-variant`), dan (kecuali disebut lain) preview.

### 2.1 Blok EKSISTING (dipertahankan)

| # | Schema type | Field utama | Tujuan (marketing role) |
|---|---|---|---|
| 1 | `hero-1` | tagLine, title, body (block-content), image, links[] (max 2) | Hero utama halaman — **Positioning** (headline + subcopy + 1–2 CTA) |
| 2 | `hero-2` | tagLine, title, body, image, links[] | Hero alternatif (fokus portofolio/visual) — variasi A/B |
| 3 | `stats-hero-block` | eyebrow, title, description, image, links[] | Hero + angka kunci (mis. "200+ project") — **Proof di atas lipatan** |
| 4 | `section-header` | tagLine, title, description, sectionWidth, stackAlign | Judul antar-section + intro (H2 hierarkis) |
| 5 | `split-row` | splitColumns[] (2 kolom: `split-content`/`split-info-list`/`split-image`/`split-cards-list`), noGap | Dua-kolom teks+visual — problem→solution, fitur vs gambar |
| 6 | `grid-row` | gridColumns, columns[] (`grid-card`/`grid-post`/`pricing-card`) | Grid kartu — layanan, fitur, paket, artikel terkait; **Offer/Proof** |
| 7 | `carousel-1` | size, indicators, images[] | Carousel gambar (galeri, portofolio visual) |
| 8 | `carousel-2` | testimonial[] (ref `testimonial`) | Carousel testimoni — **Proof** |
| 9 | `timeline-row` | timelines[] (`timelines-1`: title, tagLine, body) | Process steps / roadmap / sejarah — **Proses** |
| 10 | `cta-1` | tagLine, title, body, links[] (max 2) | CTA section (tombol primer+sekunder) — **Konversi** |
| 11 | `whatsapp-cta` | title, body, secondaryLink, (nomor dari Settings) | CTA WhatsApp langsung (nomor global 6285799520350) — **Konversi utama** |
| 12 | `logo-cloud-1` | title, images[] | Dinding logo klien/mitra — **Trust** |
| 13 | `faqs` | faqs[] (ref `faq` doc) | FAQ via dokumen FAQ reusable — **SEO + objection handling** |
| 14 | `form-newsletter` | consentText, buttonText, successMessage | Form subscribe email — **Capture ringan** |
| 15 | `all-posts` | (auto list posts) | Daftar artikel terbaru |
| 16 | `legacy-rich-content` | contentFormat (markdown/html), contentRaw | Konten legacy mentah — **lihat catatan migrasi §5**, diarahkan ke `rich-content` |
| 17 | `company-info` | title, description | Blok trust perusahaan (NAP ringkas) — **E-E-A-T** |
| 18 | `testimonials-block` | title, description, category (website/software/printing) | Grid testimoni terfilter — **Proof** |
| 19 | `pricing-block` | title, description, category | Paket harga dari SEO Settings — **Offer** |
| 20 | `faq-block` | title, description, category | FAQ dari SEO Settings — **SEO** |
| 21 | `benefits-block` | title, subtitle, description, benefits[] (icon emoji, title, desc, badge) | Manfaat berikon — **Value** |
| 22 | `features-package-block` | title, subtitle, description, features[] (icon, title, desc, badge) | Isi paket / fitur — **Offer detail** |
| 23 | `service-types-block` | title, description, services[] (title, desc, features[], price, timeline, badge, link) | Daftar jenis layanan + harga mulai — **Offer/catalog** |
| 24 | `problem-solution-block` | title, problems[], solutionTitle, solution | Problem → solusi naratif — **Positioning** |
| 25 | `value-props-block` | title, description, valueProps[] (icon, title, desc) | Nilai jual (mengapa kami) — **Differentiation** |

Sub-objek (bukan blok top-level, tetap dipakai): `split-content`, `split-cards-list`, `split-image`, `split-info-list`, `split-info`, `split-card`, `grid-card`, `grid-post`, `pricing-card`, `timelines-1`.

Blok **legacy khusus** yang perlu dirapikan: `legacy-rich-content` → **alias/deprecate ke `rich-content` native** (portable-text). Pertahankan hanya sebagai jembatan migrasi; blok baru wajib `rich-content`.

### 2.2 Blok TAMBAHAN (usulan marketing-first)

> Alasan: library eksisting kuat untuk hero/teks/paket, tetapi **lemah di konversi & proof terstruktur**. Lima blok ini mengisi gap marketing-first (P10–P13).

| # | Schema type (usulan baru) | Field utama | Tujuan (marketing role) |
|---|---|---|---|
| 26 | `rich-content` | body (block-content native) | Blok konten riil (paragraf/H2-H3/list/gambar/tabel) **pengganti** legacy-rich-content. Wajib untuk semua konten SEO baru |
| 27 | `lead-form` | title, description, fields[] (name/email/phone/message, required flags), submitLabel, successMessage, whatsappFallback | **Form lead/konsultasi** (bukan cuma newsletter). Tuhan konversi utama halaman `service`/`landing`; kirim ke CRM/WA |
| 28 | `collection-list` | source (`post`\|`product`\|`service`\|`project`), categoryFilter (ref), limit, layout (grid/list), columns, showPagination | **Halaman index koleksi** dari blok (menggantikan renderer kode di `/blog`,`/products`,`/projects`,`/services`). Satu blok untuk semua daftar |
| 29 | `proof-metrics` | eyebrow, title, stats[] (value, label, icon), note | Band angka bukti (project selesai, klien, rating, tahun) **di tengah halaman** (bukan hero) — **Proof** |
| 30 | `project-showcase` | title, description, projects[] (ref `project` atau manual: title, image, result), layout | Studi kasus / portofolio teaser dengan hasil terukur — **Proof kuat** untuk service/lokasi |
| 31 | `comparison-table` | title, columns[] (header), rows[] (feature + nilai per kolom), highlightCol | Tabel perbandingan (Kami vs alternatif / paket) — **Differentiation/objection** |

Kandidat opsional (tier-2, buat bila konten menuntut — tidak wajib F1):
- `process-steps` — langkah bernomor (varian ringkas `timeline-row`).
- `video-embed` — section video YouTube (selain member `youtube` di block-content).
- `anchor-nav` — TOC untuk halaman panjang.
- `roi-calculator` / `free-tool` — kalkulator interaktif (lead magnet).
- `trust-badges` — sertifikasi/penghargaan (dari `seoSettings.companyInfo`).

**Catatan implementasi:** `sticky-mobile-cta` dan `breadcrumbs` **tidak** dibuat sebagai blok, melainkan:
- Sticky CTA → field `page.settings.stickyCta` (global per halaman, dirender layout).
- Breadcrumbs → auto-generate dari `path` (field `settings.showBreadcrumbs`).

### 2.3 Urutan insertMenu (grup di Studio)

Susun ulang `page-blocks.ts` `options.insertMenu.groups` menjadi:
`Hero` (hero-1/2, stats-hero) · `Content` (rich-content, section-header, split-row) · `Proof` (testimonials-block, carousel-2, logo-cloud-1, company-info, proof-metrics, project-showcase, grid-row[grid-post]) · `Offer` (pricing-block, features-package-block, service-types-block, pricing-card via grid-row, comparison-table) · `Conversion` (cta-1, whatsapp-cta, lead-form, form-newsletter) · `FAQ` (faqs, faq-block) · `Listing` (collection-list, all-posts, carousel-1, timeline-row) · `Legacy` (legacy-rich-content — deprecating).

---

## 3. Pemetaan keluarga halaman → 1 `page` doc + susunan blok

Format kolom: **Path** · **pageType** · **Sumber saat ini** · **Susunan blok target**.
Urutan blok mengikuti template marketing **Hero → Offer → Proof → CTA** (P10), diselingi FAQ/proses sesuai kebutuhan.

> **Prinsip koleksi:** `post`, `product`, `project`, `service` **tetap dokumen koleksi masing-masing** (untuk JSON-LD & relasi). Halaman **INDEX**-nya menjadi `page` doc dengan blok `collection-list`. Halaman **detail** item dirender oleh mesin blok yang sama (`post.body`/`product.body` sudah memakai `pageBlocks`). Jadi "satu render path" tercapai tanpa menghapus skema koleksi.

### 3.1 Halaman statis / marketing inti

| Path | pageType | Sumber saat ini | Susunan blok target |
|---|---|---|---|
| `/` (slug `index`) | landing | `PageHybridShell` + `HomePeparMiddleSection` (kode) | hero-1 → proof-metrics → section-header + grid-row(services) → split-row(keunggulan) → project-showcase → testimonials-block → logo-cloud-1 → pricing-block → faqs → whatsapp-cta |
| `/about` | about | manifest `about` (RewritePageShell) | hero-2 → rich-content(cerita) → proof-metrics → company-info → timeline-row(milestones) → testimonials-block → cta-1 |
| `/contact` | legal/service | manifest `contact` (kode) | hero-1(brief) → split-row(NAP + peta/company-info) → lead-form → faqs → whatsapp-cta |
| `/services` | index | hybrid: Sanity page `services` + legacy `layanan` + json-usaha | hero-1 → section-header → collection-list(source=service) → grid-row(kategori) → service-types-block → proof-metrics → testimonials-block → lead-form → whatsapp-cta |
| `/services/[slug]` | — (koleksi) | `service` doc | Render `service.body` (blocks) + blok standar: hero → benefits-block → features-package-block → process(timeline) → pricing-block → faqs → cta-1 |
| `/services/category/[slug]` | index | `category` doc listing | page doc opsional `/services/{kategori}` dgn `collection-list(categoryFilter)` — atau noindex (sesuai `seoSettings.noIndexServiceCategories`) |
| `/privacy` | legal | pageLocation `/privacy` / manifest | hero-2(ringkas) → rich-content → faqs |
| `/sistem-pos` | service/landing | template shell `software` (SistemPos) | hero-1 → problem-solution-block → features-package-block → benefits-block → proof-metrics → pricing-block → faqs → lead-form → whatsapp-cta |

### 3.2 Hub produk

| Path | pageType | Sumber saat ini | Susunan blok target |
|---|---|---|---|
| `/percetakan` | hub | manifest section `percetakan` + `fetchSanityProducts()` (kode `ProductGrid`) | hero-1 → section-header → service-types-block(cetak inti) → collection-list(source=product) → project-showcase(cetak) → pricing-block(printing) → faqs(printing) → whatsapp-cta |
| `/percetakan/cetak-buku` + layanan inti lain (`cetak-brosur`, `cetak-banner-spanduk`, `cetak-kalender`, `cetak-company-profile`, `cetak-al-quran`, dll — lihat §4) | service | `serviceLocation` (48) | hero-1 → benefits-block → features-package-block → proof-metrics → project-showcase → pricing-block → faqs → lead-form → whatsapp-cta |
| `/pembuatan-website` | hub | manifest section `pembuatan-website` | hero-1 → problem-solution-block → service-types-block(jenis website) → proof-metrics → project-showcase → pricing-block(website) → faqs(website) → whatsapp-cta |
| `/pembuatan-website/{layanan}` (`jasa-pembuatan-website-company-profile`, `-toko-online`, `-sekolah`, `-konstruksi`, `-dokter-klinik`, `-expedisi`, `-komunitas-ngo`, `jasa-migrasi-wordpress`, `harga`, `template`) | service | `serviceLocation` (10) | hero-1 → benefits-block → features-package-block → comparison-table(vs template) → project-showcase → pricing-block → faqs → lead-form → cta-1 |
| `/software` | hub | manifest section `software` | hero-1 → problem-solution-block → service-types-block → proof-metrics → project-showcase(software) → pricing-block(software) → faqs(software) → cta-1 |
| `/software/{layanan}` (`sistem-pos`, `pembuatan-software`, `implementasi-software`, `instalasi-software`, dst) | service | `serviceLocation` (3) + manifest | hero-1 → problem-solution-block → features-package-block → process(timeline) → proof-metrics → faqs → lead-form |

### 3.3 Koleksi editorial (blog / products / projects)

| Path | pageType | Sumber saat ini | Susunan blok target |
|---|---|---|---|
| `/blog` | index | kode (`fetchSanityPosts` + `PostGrid` + JsonLd) | hero-1(ringkas) → section-header → collection-list(source=post, layout=grid, pagination) → form-newsletter |
| `/blog/[slug]` | — (koleksi `post`) | `post` doc (`body` blocks) | `post.body` (blocks) + post-hero + related(`grid-row`grid-post) + cta-1. **Perkuat skema post**: wajib `author`, `excerpt`, `ma.meta`, affiliate/review (sudah ada) |
| `/blog/category/[slug]` | index | kode | page doc opsional `/blog/kategori/{slug}` dgn `collection-list(post, categoryFilter)` — atau noindex (sesuai `seoSettings.noIndexBlogCategories`) |
| `/products` | index | kode (`fetchSanityProducts`+`ProductGrid`) | hero-1(ringkas) → collection-list(source=product, grid, pagination) → section-header(kategori) → cta-1 |
| `/products/[slug]` | — (koleksi `product`) | `product` doc | `product.body` + product-hero(gallery) + pricing + reviews(JSON-LD) + related-grid + cta-1 |
| `/projects` | index | kode (`fetchSanityProjects`+`ProjectGrid`) | hero-1(ringkas) → project-showcase(all, filter) → collection-list(source=project) → cta-1 |
| `/projects/[slug]` | — (koleksi `project`) | `project` doc | `project.body` + project-hero + proof-metrics(hasil) + gallery(carousel-1) + cta-1 |

> **Bila ingin 100% "semua = page doc"** (opsi konservatif-kanonik): index koleksi bisa juga diformalkan sebagai `page` bila belum ada; detail item **tetap** dokumen koleksi karena alasan JSON-LD. Rekomendasi kuat: **jangan** mengubah `post`/`product`/`project` menjadi `page` — akan kehilangan skema harga/rating/relasi.

### 3.4 Halaman programmatic kota / legacy (KONSOLIDASI)

> Ini inti anti-thin-content (P5/P7). **Bukan porting 1:1.** Keputusan keep/merge/redirect per kota di WS-B (`02-url-migration.*`); di sini ditetapkan **bentuk konten** untuk yang di-KEEP.

| Keluarga | Volume (verifikasi) | Sumber saat ini | Keputusan model |
|---|---|---|---|
| `jasa-cetak-buku-{kota}` | 394 (cities.json) + mirror `serviceLocation` | `cities.json` + `template.mdx` swap nama kota | **Hanya kota ber-bukti** (klien/foto/testimoni/harga lokal) → `page` doc `pageType=service-location`, `path=/jasa-cetak-buku-{kota}`. Susunan: hero-1(lokal) → problem-solution → **project-showcase(lokal wajib)** → proof-metrics(lokal) → pricing-block → faqs(lokal) → lead-form → whatsapp-cta. Sisanya **301** → `/percetakan/cetak-buku` atau **410** |
| `pembuatan-website/{kota}` | 43 `pageLocation` (34 per-kota) | `pageLocation` + shell | Sama: keep hanya kota ber-bukti → `page` doc `pageType=service-location`, `path=/pembuatan-website/{kota}`, blok lokal berbukti. Sisanya 301 → `/pembuatan-website` |
| `/percetakan/cetak-kalender/{kota}` | bagian dari 48 `serviceLocation` | `serviceLocation` catch-all | Merge ke `/percetakan/cetak-kalender` (feature "melayani seluruh Indonesia") — **bukan** 1 doc per kota |
| JSON usaha (3): `Biro_jasa_perizinan`, `Jasa_pengukuhan_PKP`, `agency_landing` | 3 | `json-usaha/*.json` + `getJsonUsahaPages()` (kode di `/services`) | Jadikan **halaman layanan nyata** → `page` doc `pageType=service`, `path=/layanan/{slug}` atau `/services/{slug}`. Blok: hero-1 → benefits-block → features-package-block → pricing-block → testimonials-block → faqs → lead-form (konten sudah kaya: metrics/features/pricing/testimonials/faq) |
| Catch-all legacy `/[...segments]` + `/percetakan/[...segments]` | — | `fetchTemplatePageByRoute` + `RewritePageShell` | **Dihapus.** Digantikan **satu** dynamic route `page`-by-`path` (§4) |

**Target akhir volume:** dari 986 URL thin → **±150–250 URL tebal** (sesuai MASTER-PLAN §4). Semua sisanya 301/410 via `redirect` doc.

---

## 4. Komponen/skema yang HARUS dipensiunkan dari jalur render

Hapus (atau hentikan pemakaian) sebagai **sumber render** halaman publik. Boleh disimpan di git sebagai arsip tapi **tidak boleh** direferensikan jalur SSR/SSG.

### 4.1 File data kode
| Artefak | Lokasi | Alasan |
|---|---|---|
| `astro-static-manifest.json` (104 entri) | `frontend/lib/legacy-pages/` | Sumber manifest legacy → digantikan `page` |
| `cities.json` (394) + `excluded-non-city.json` + `template.mdx` | `frontend/content/astro-local/jasa-cetak-buku-kota/` | Sumber swap-kota thin → `page` |
| `json-usaha/*.json` (3) | `frontend/content/astro-local/json-usaha/` | Sumber kode-driven → `page` |

### 4.2 Modul lib yang membaca data legacy
- `frontend/lib/legacy-pages/astro-static.ts` (+ `metadata.ts`, `rewrite-content.ts`, `internal-links.ts`, `legacy-overrides.ts`)
- `frontend/lib/local-content/jasa-cetak-buku-kota.ts`, `json-usaha.ts`, `astro-catalog.ts`, `home-page.ts`, `home-prepare.ts`
- `frontend/lib/legacy-pages/archive/content-generators/**` (seluruh generator kode)
- `frontend/lib/templates/resolve-template.ts`, `route-policy.ts` (`isAllowedTemplateRoute`)
- `frontend/components/ui/rewrite/page-shell.tsx` (`RewritePageShell`), `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`, `frontend/components/hybrid/page-hybrid-shell.tsx`, `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`

### 4.3 Tipe dokumen Sanity (dikeluarkan dari schema & query render)
| Tipe doc | Alasan pensiun |
|---|---|
| `serviceLocation` (458) | Sumber render lokasi; digantikan `page`. Data dimigrasi → §5 |
| `pageLocation` (43) | Sumber render lokasi; digantikan `page`. Data dimigrasi → §5 |
| `pageTemplate` | Shell/template code-owned (`shellId`, `isHybrid`, `topBlockCountDefault`) → **tidak relevan** tanpa hybrid |
| `legacyPage` | Override legacy (route/heroOverride/sectionOrder) → digantikan `page.blocks` langsung |
| `serviceType` (28) | Referensi pendukung lokasi; boleh tetap sebagai referensi katalog, tapi **bukan** sumber render halaman |

### 4.4 Route (file `page.tsx`) yang dihapus/digabung
- `frontend/app/(main)/[...segments]/page.tsx` — **catch-all legacy, hapus**
- `frontend/app/(main)/percetakan/[...segments]/page.tsx` — **hapus** (jadi `page` biasa)
- `frontend/app/(main)/pembuatan-website/[slug]/page.tsx` — **hapus** (jadi `page`)
- `frontend/app/(main)/software/[slug]/page.tsx`, `about/[slug]/page.tsx` — **hapus/lebur** ke dynamic `page`
- Fallback branch di: `frontend/app/(main)/[slug]/page.tsx`, `about/page.tsx`, `sistem-pos/page.tsx` (hapus cabang `getJasaCetakBukuCityBySlugOrFallback`, `fetchTemplatePageByRoute`, `RewritePageShell`)
- `frontend/app/(main)/services/page.tsx` — hapus cabang `getJsonUsahaPages()` & `getLegacySinglePage("layanan")`; sisakan render `page.blocks` untuk slug `services`

### 4.5 Query & sitemap
- `frontend/sanity/queries/template-page.ts` (`TEMPLATE_PAGE_BY_ROUTE_QUERY`, `..._BY_PATTERN_`, `..._ROUTES_`) — **hapus**
- `frontend/app/sitemap.ts` — hapus `TEMPLATE_SITEMAP_QUERY`, `getJasaCetakBukuCityStaticParams()`, `getJsonUsahaStaticParams()`, `localStaticRoutes` hardcoded; ganti dengan **satu query** `*[_type=="page" && contentStatus=="index" && meta.noindex!=true]` + koleksi `post/product/project/service` yang `contentStatus/`published.

### 4.6 Yang TETAP (bukan legacy)
- Blok renderer `frontend/components/blocks/index.tsx` (dipertahankan, ditambah blok baru §2.2)
- Koleksi `post`, `product`, `project`, `service`, `author`, `category`, `testimonial`, `faq`
- `settings`, `seoSettings`, `navigation`, `redirect`, `reusableSection`, `seoOpsSettings`

---

## 5. Aturan migrasi data lama → `page` + `blocks`

### 5.1 Prinsip
1. **One-doc-per-URL, idempoten.** Migrasi = fungsi `upsert` berdasarkan `path` unik (bukan `_id` acak) supaya aman diulang.
2. **Konsolidasi dulu, migrasi kemudian.** Jalankan keputusan WS-B (keep/merge/redirect/410) → hanya URL `keep` yang dibuatkan `page`. URL `merge` tidak dibuatkan doc; URL `redirect` → `redirect` doc.
3. **`contentStatus` default `draft`.** Semua hasil migrasi masuk `draft`; naik ke `index` hanya lewat checklist §1.3. Tidak ada auto-index.
4. **Sumber prioritas saat konflik** (3 sumber tumpang tindih untuk URL sama):
   `page` (bila sudah ada) > `serviceLocation`/`pageLocation` > manifest > cities.json > json-usaha.
   Bila `page` sudah ada dan `serviceLocation` juga ada → **jangan** buat doc baru; merge blok `serviceLocation.blocks` ke `page.blocks` bila `page.blocks` kosong, lalu tandai `serviceLocation` obsolete.
5. **No thin carry-over.** Template `cities.json`+`template.mdx` (swap nama kota) **tidak** diporting mentah (P5/P7). Konten di-rewrite atau di-redirect.
6. **Gambar/aset** dipindah ke Sanity image asset; `coverImage`/`heroImage` string URL lama → upload + `alt`.

### 5.2 Peta field sumber → `page`

| Sumber field lama | → `page` field |
|---|---|
| `route` (`serviceLocation`/`pageLocation`) / manifest `route` | `path` |
| `title` | `title` |
| `slug.current` / `slug` segmen | `slug` |
| `_type` classifier (`serviceLocation`,`pageLocation`) + section | `pageType` (`service-location`/`service`/`hub`) |
| `contentStatus` (sudah ada di lokasi) | `contentStatus` (petakan `reviewed`→`review`) |
| `meta.*` (title/desc/noindex/canonical/focusKeyword/secondaryKeywords/image) | `seo.*` (rename grup) |
| `heroEyebrow`, `heroImage` | blok `hero-1/2` (tagLine, image) |
| `blocks[]` (kalau ada) | `blocks[]` (append) |
| `structured`/`templateRewriteCopy` (primaryKeyword, intro, highlights, eeatPoints, process, faqs, testimonials, pricingPlans, proofItems, longGuide) | pecah ke blok: `rich-content` (intro/longGuide), `benefits-block`(eeat/highlights), `timeline-row`(process), `faqs`(faqs), `testimonials-block`(testimonials), `pricing-block`(pricingPlans), `project-showcase`(proofItems) |
| `service`/`serviceType`/`location` ref | metadata internal saja (tak wajib render); boleh dipakai `structuredData`/`parent` |
| `topBlockCount`, `template`, `shellId`, `isHybrid` | **dibuang** |

### 5.3 Sumber spesifik

**A. `serviceLocation` → `page` (per `route`)**
- Buat/lookup `page` by `path = route`. Set `pageType` dari prefix (`/percetakan|/pembuatan-website|/software/{x}` → `service`; `jasa-cetak-buku-*` & `/{kota}` → `service-location` bila di-keep).
- Salin `title`, `meta`, `contentStatus`, `heroEyebrow/heroImage`, `blocks[]`.
- `structured` (jika ada) → pecah ke blok sesuai §5.2.
- **Untuk `jasa-cetak-buku-*` / `/{kota}`:** hanya proses bila WS-B menandai `keep`; selainnya skip + buat `redirect`.
- Setelah migrasi+verifikasi: hapus/abadikan `serviceLocation` doc.

**B. `pageLocation` → `page`**
- Sama seperti A, dengan `path = route`. Mayoritas sudah hub (`/about`,`/contact`,`/privacy`,`/sistem-pos`,`/pembuatan-website`,dst) → cek dulu apakah sudah ada `page` dengan path sama; jika ada, **merge** (jangan duplikasi).
- `pageLocation` per-kota (34) → ikuti aturan konsolidasi (§3.4).

**C. `cities.json` (394) → `page` (subset)**
- Filter: hanya slug di "keep-list" WS-B → buat `page op path=/jasa-cetak-buku-{slug}`, `pageType=service-location`, `contentStatus=draft`.
- `title`/`excerpt` sebagai basis copy; **wajib** dilengkapi blok bukti lokal sebelum `index` (P7). Bila tidak ada bukti → jangan dibuat; URL → 301/410.

**D. `json-usaha` (3) → `page`**
- `title`→title, `description`→seo.description, `path=/layanan/{slug}` (atau `/services/{slug}`), `pageType=service`.
- Map struktur kaya: `metrics`→`proof-metrics`; `features`/`services`/`deliverables`→`features-package-block`/`service-types-block`; `reasons`/`why_us`→`benefits-block`; `pricing`→`pricing-block` (atau `pricing-card` via grid-row); `testimonials`→`testimonials-block`; `faqs`→`faqs`/`faq-block`; `contentSections`→`rich-content`; `heroCta`/`finalCta`→`whatsapp-cta`/`cta-1`. (Semua field sudah dinormalisasi di `json-usaha.ts`.)

**E. `astro-static-manifest.json` (104)**
- Untuk `keep` yang belum punya `page`: buat `page` minimal (title/path/meta) lalu author mengisi blok. Untuk hub/landing inti (§3.1) lengkapi blok penuh.
- `sourceFile` legacy hanya jejak; tidak disimpan di render.

### 5.4 Redirect & verifikasi
- Setiap URL yang dihapus/merge → dokumen `redirect` (`source`, `destination`, `permanent=true`) atau 410 (`gonePaths`).
- Setelah migrasi: query diff `path` antara `page(kept)` + `redirect.source` vs daftar 986 URL lama untuk memastikan **0 URL tanpa tujuan** (0 broken).
- Sitemap diverifikasi ulang = hanya `page.contentStatus=="index"` + koleksi published.

### 5.5 Urutan eksekusi migrasi (aman, staging)
1. Deploy skema `page` final (menambah field; tidak merusak doc lama) di **staging**.
2. Jalankan skrip upsert `page` dari sumber berprioritas (§5.1.4) — semua `draft`.
3. Isi/rewrite blok thin → thick; lolos gate §1.3 untuk naik `index`.
4. Bangun `redirect` map (WS-B) untuk URL yang dibuang.
5. Ganti sitemap/route ke `page`-by-`path` (F2/frontend).
6. Smoke test: 0 broken, sitemap benar, sample halaman render blocks.
7. Baru cutover produksi (F6) setelah approval.

---

## 6. Keterkaitan & langkah lanjut (untuk workstream lain)

- **WS-B** memakai §3.4 + §5.4 untuk klasifikasi 986 URL (keep/merge/redirect/410) dan map `path` final.
- **WS-C** memakai §3 (susunan blok per keluarga) sebagai kerangka outline H2/FAQ/copy tiap halaman.
- **WS-D (frontend)** mengimplementasikan:
  - Satu dynamic route `app/(main)/[[...path]]/page.tsx` yang resolve `page` by `path` (dari Sanity saja) → `Blocks`/render sesuai `pageType`; `notFound()` bila tak ada. Ini **menggantikan** semua route per-seksi + catch-all legacy (bukan "fallback", melainkan render path tunggal dari Sanity).
  - Sitemap & metadata dari `contentStatus`/`seo` (§1.3); `redirect` dari dokumen `redirect`.
  - Tambah komponen blok baru §2.2 di `components/blocks/` + `index.tsx` + `pageBlocks.of`.
- **Prerequisite skema:** tambah `path, pageType, contentStatus, author, settings.stickyCta, structuredData` ke `page.ts`; hapus `topBlockCount` + `HYBRID_PAGE_SLUGS`; deprecate `pageLocation/serviceLocation/pageTemplate/legacyPage` dari `schema-types.ts`.

---

### Lampiran A — Fakta terverifikasi yang mendasari dokumen ini
- Sitemap live: **986 URL**; Sanity `page`=**238**, `serviceLocation`=**458** (394 `jasa-cetak-buku-*` + 48 `/percetakan/*` + 10 `/pembuatan-website/*` + 3 kosong + 3 `/software/*`), `pageLocation`=**43** (34 per-kota `/pembuatan-website/*`), `post`=41, `product`=152, `project`=164, `category`=154, `redirect`=400.
- File data kode: `astro-static-manifest.json` (**104**), `cities.json` (**394**), `json-usaha/*.json` (**3**).
- Blok eksisting (page-blocks `of`): 25 tipe (§2.1). Komponen di `components/blocks/index.tsx`: 26 mapping (termasuk `rich-content` alias).
