# MASTER PLAN — Kotacom.id "Sanity Page + Blocks Only" Rewrite

> Tujuan: mengganti kotacom.id dari arsitektur **hybrid (file kode + Sanity template)** menjadi **100% Sanity Page + Blocks**, tanpa fallback kode, dengan kaidah **SEO (no thin content)** + **marketing-first**.

---

## 0. Keputusan inti (yang direkomendasikan)

1. **Satu sumber kebenaran:** setiap halaman publik = 1 dokumen `page` di Sanity dengan `blocks[]`. Tidak ada lagi render dari `astro-static-manifest.json`, `cities.json`, `json-usaha`, route file legacy, atau template `serviceLocation`/`pageLocation` sebagai sumber konten.
2. **No fallback:** hapus semua jalur render cadangan. Jika `page` tidak ada → 404 (bukan render template/kota).
3. **Konsolidasi > duplikasi:** 394 halaman kota + 43 halaman "per-kota" saat ini adalah **thin content** (template + ganti nama kota). Ini HARAM dipertahankan 1:1. Rencana = **konsolidasi** jadi sedikit halaman lokasi yang benar-benar berbeda, sisanya 301/410.
4. **Marketing-first:** tiap halaman wajib punya positioning → offer → proof → CTA → jalur konversi. Konten SEO bukan tujuan, **lead/penjualan** tujuan.
5. **Eksekusi bertahap di environment aman** (staging) dulu, baru cutover produksi setelah verifikasi. Tidak ada perubahan produksi sebelum approval.

---

## 1. Kondisi sekarang (fakta terverifikasi)

| Aspek | Temuan |
|---|---|
| Total URL publik (sitemap) | **986** |
| Code-based / programmatic | ±500 (394 kota + 104 legacy manifest + 3 JSON usaha + hub statis) |
| Sanity `page` docs | 238 |
| Sanity `serviceLocation` | 458 (mirror 394 kota + 48 percetakan + 10 pembuatan-website) |
| Sanity `pageLocation` | 43 (pembuatan-website per-kota) |
| Sumber route | 31 `page.tsx` (13 dinamis + 18 statis) + file kode (manifest/cities/json) |
| Index meta | semua `index,follow`; tanpa GSC tidak ada angka index resmi |
| Thin content | Halaman kota (`jasa-cetak-buku-*`), `pembuatan-website/{kota}` = duplikat template |
| Masalah utama | **Dua sumber** (kode + Sanity) → tidak terkontrol, edit di satu tempat tidak konsisten |

**Bukti thin content:** `/jasa-cetak-buku-aceh-barat` dibuat dari `cities.json` + swap nama kota; `serviceLocation` men-*mirror* data yang sama.

---

## 2. Prinsip rewrite (kaidah yang WAJIB diikuti)

### A. Arsitektur
- **P1** — Hanya render dari `page.blocks`. Hapus `[slug]` fallback ke manifest/cities/json-usaha.
- **P2** — Tidak ada `serviceLocation`/`pageLocation` sebagai sumber render halaman publik (boleh tetap ada sebagai *authoring aid* sementara, tapi final page = `page` doc).
- **P3** — `sitemap.xml`, `robots.txt`, canonical, JSON-LD semua digenerate dari Sanity (settings global + meta per page).
- **P4** — Redirect dikelola via dokumen `redirect` di Sanity (301/410), bukan di kode.

### B. SEO — No Thin Content
- **P5** — Setiap halaman ≥ **800 kata konten unik** untuk halaman layanan/komersial; blog ≥ 1200 kata. Tidak ada "swap nama kota".
- **P6** — Setiap halaman punya **judul, meta description, H1, H2-H3 hierarkis, FAQ, internal link (min 3 kontekstual), schema**.
- **P7** — Halaman lokasi hanya dibuat jika punya **bukti lokal nyata** (klien, foto, testimoni, alamat/area layanan, harga spesifik). Jika tidak → **konsolidasi/redirect**.
- **P8** — E-E-A-T: penulis nyata (`author`), tanggal update, NAP konsisten, testimoni, studi kasus.
- **P9** — Canonical self-referencing; hindari near-duplicate.

### C. Marketing-First
- **P10** — Struktur halaman = **Hero (positioning) → Offer (paket/harga) → Proof (portofolio/testimoni/angka) → CTA (WhatsApp/konsultasi)**.
- **P11** — Setiap halaman punya 1 **primary CTA** (WhatsApp 6285799520350) + 1 secondary.
- **P12** — Track konversi (GA4 event `cta_click`, `wa_click`, `form_submit`).
- **P13** — Copywriting fokus manfaat + diferensiasi, bukan keyword stuffing.

---

## 3. Target arsitektur konten (content model)

### Dokumen `page` (satu-satunya penyaji halaman publik)
- `title`, `slug`, `seo{title,description,ogImage,noindex,canonical}`
- `settings{template: landing|service|blog-index|legal, layout}`
- `blocks[]` (page builder) — isi konten
- `contentStatus` (draft/ready/index) — gating publish & sitemap
- `author` ref, `_updatedAt`
- `structuredData` (JSON-LD opsional)

### Katalog block (dari yang sudah ada, ditambah bila perlu)
- Hero, Section Header, Rich Content, Split, CTA, FAQs, Grid, Carousel, Logo Cloud, Timeline, All Posts, Forms, SEO block, Shared/Reusable Section.
- Tambahan recommended untuk marketing: **Pricing/Offers**, **Testimonial(s)**, **Stats/Proof**, **Case Study teaser**, **Comparison**, **Process steps**, **Sticky mobile CTA**.

### Globals
- `settings` (NAP, sosial, WhatsApp, navigasi), `seoSettings`, `theme-settings`.

### Yang DIHAPUS dari jalur render
- `lib/legacy-pages/*`, `content/astro-local/*` (cities/json-usaha/manifest) sebagai sumber SSR/SSG.
- Route `[...segments]` catch-all legacy.
- `serviceLocation`/`pageLocation` render path.

---

## 4. Strategi konten & anti-thin-content (inti)

**Keputusan per kelompok URL** (detail di workstream B):
- **Homepage, /about, /contact, /services, /percetakan, /pembuatan-website, /software, /sistem-pos, /blog, /products, /projects** → tetap 1 halaman kuat (thick, marketing-first).
- **`percetakan/*` (48)** → konsolidasi jadi beberapa layanan cetak inti (buku, brosur, banner, kemasan, dll) yang benar-benar beda. Jika ada yang mirip → merge 301.
- **`pembuatan-website/{kota}` (43) + `jasa-cetak-buku-{kota}` (394)** → **BUKAN diporting 1:1**. Simpan hanya kota dengan potensi + bukti (mis. Surabaya, Sidoarjo, Gresik, Malang, dst). Sisanya 301 ke halaman layanan terkait / 410.
- **JSON usaha (3)** → jadikan halaman layanan nyata.
- **Produk/blog/projects (CMS sudah)** → pertahankan, perbaiki kualitas + schema.

Prinsip: **"less but better"** — 986 URL thin → target ±150–250 URL tebal & bernilai.

---

## 5. Migration & redirect

- Buat `redirect` map di Sanity untuk semua URL yang dihapus/merge (301) atau 410 (konten tak relevan).
- Verifikasi 0 broken link internal setelah culling.
- Update sitemap (hanya `contentStatus=index` & bukan noindex).
- Pertahankan URL penting yang ada traffic/backlink (perlu data GSC).

---

## 6. Fase eksekusi

| Fase | Isi | DoD |
|---|---|---|
| F0 | Audit index (GSC) + inventaris URL + keputusan keep/merge/redirect | dokumen keputusan 986 URL |
| F1 | Content model final (page+blocks) + katalog block | schema & block disetujui |
| F2 | Frontend single-render-path (hapus fallback) di **branch/staging** | build staging 200, tanpa manifest/cities |
| F3 | Isi konten thick + marketing-first per halaman (Sanity `page`) | semua halaman target ≥800 kata, CTA, schema |
| F4 | Redirect map aktif + sitemap/robots/canonical dari Sanity | 0 broken, redirect 301 valid |
| F5 | QA: SEO audit, performance, a11y, indexing request | audit lulus |
| F6 | Cutover produksi + monitoring GSC | index naik, traffic terjaga/naik |

---

## 7. Workstream subagent (paralel)

- **WS-A — Content model & block catalog:** finalkan schema `page`+blocks, peta setiap keluarga halaman → page+blocks, daftar block final. Output: `01-content-model.md`.
- **WS-B — URL inventory, konsolidasi & redirect map:** klasifikasi 986 URL (keep/merge/redirect/410), CSV + aturan. Output: `02-url-migration.csv` + `02-url-migration.md`.
- **WS-C — Content briefs marketing-first & anti-thin-content:** brief per keluarga halaman (positioning, offer, proof, CTA, outline H2, FAQ, kata kunci). Output: `03-content-briefs.md`.
- **WS-D — Frontend single-render-path & SEO wiring:** rencana teknis hapus fallback, render page+blocks saja, sitemap/robots/schema/redirect dari Sanity. Output: `04-frontend-render-plan.md`.

---

## 8. KPI & monitoring
- GSC: indexed coverage, impresi, klik, CTR, posisi. (Butuh pasang kredensial GSC.)
- Konversi: `wa_click`, `form_submit`, lead.
- Core Web Vitals.

## 9. Risiko & guardrail
- SEO turun saat culling → mitigasi: redirect 301 lengkap + simpan URL bernilai + cutover bertahap.
- Konten massal malah thin → mitigasi: gate `contentStatus=index` hanya jika lolos checklist thick.
- Duplikasi lokal → mitigasi: aturan P7.
