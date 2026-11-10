# 04 — Rencana Teknis FRONTEND: Single-Render-Path + SEO Wiring

> Workstream D dari MASTER-PLAN. Tujuan: frontend hanya merender **Sanity `page` + `blocks[]`**, tanpa fallback file kode. Semua wiring SEO (sitemap/robots/canonical/JSON-LD/meta-robots) berasal dari Sanity (`settings` global + meta per page + `contentStatus`). Redirect 301/410 dari dokumen `redirect` Sanity.
>
> **Dokumen ini riset & rencana saja.** Tidak ada perubahan kode, commit, push, atau deploy yang dilakukan. Semua path relatif terhadap `frontend/`.

---

## 0. Ringkasan eksekutif

| Item | Kondisi sekarang | Target |
|---|---|---|
| Sumber render halaman generik | 5 route dengan fallback: `page` Sanity → **template Sanity** → **file kode** (manifest/cities/json-usaha) | **1 route** `page`-by-slug → `blocks[]` saja |
| Util legacy | `lib/legacy-pages/*` (7 file), `lib/local-content/*` (cities 394, json-usaha 3, astro-catalog), `lib/templates/*` | dihapus dari jalur render |
| Content lokasi | `content/astro-local/jasa-cetak-buku-kota/cities.json` (394), `content/astro-local/json-usaha/*.json` (3) | dihapus |
| Sitemap | gabung CMS + `localStaticRoutes` + jsonUsaha + cityParams + `pageLocation`/`serviceLocation` | murni dari Sanity `page` (+ `post/product/service/project`), gated `contentStatus=index` |
| Redirect | `next.config.mjs` redirects() baca `redirect` Sanity (301/302) + `STATIC_REDIRECTS` di kode + `lib/seo/gone-paths.ts` (410 **dead code**, tidak dipakai) | redirect() dari Sanity, tambah dukungan **410 Gone** |
| JSON-LD | hanya di blog/products/services/projects | tambah JSON-LD generik dari `page` |
| `contentStatus` | hanya di `serviceLocation`/`pageLocation`/`template-page` | tambah ke skema `page`, gate sitemap & robots |

Prinsip: **satu jalur render, satu sumber status, no fallback.** Jika `page` tidak ada → 404 (atau 301/410 jika dipetakan di `redirect`).

---

## 1. Peta file: diubah / dihapus

### 1A. Route dinamis dengan fallback legacy/cities/json-usaha → DIGANTI

| File | Peran sekarang | Aksi |
|---|---|---|
| `app/(main)/[slug]/page.tsx` | urutan: template Sanity (`fetchTemplatePageByRoute`) → `fetchSanityPageBySlug` → **`getJasaCetakBukuCityBySlugOrFallback`** (cities.json). Ada `generateStaticParams` gabungan page+cities+template. | **HAPUS** (digabung ke catch-all baru) |
| `app/(main)/[...segments]/page.tsx` | **template Sanity by route** saja + `getLegacySectionChildren` (manifest) untuk siblings. | **HAPUS** (digabung) |
| `app/(main)/pembuatan-website/[slug]/page.tsx` | template Sanity → **`getLegacySectionSlug("pembuatan-website", …)`** (manifest). | **HAPUS** (digabung) |
| `app/(main)/percetakan/[...segments]/page.tsx` | **`getLegacySectionRouteBySegments`** (manifest) → `RewritePageShell`. | **HAPUS** (digabung) |
| `app/(main)/software/[slug]/page.tsx` | template Sanity → **`getLegacySectionSlug("software", …)`** (manifest). | **HAPUS** (digabung) |

> Route statis/hub (`/pembuatan-website`, `/percetakan`, `/software`, `/about`, `/contact`, `/blog`, `/products`, `/services`, `/projects`, `/sistem-pos`, `/privacy`) **tetap** sebagai folder statis → kontennya nanti jadi `page` yang cocok, tapi segmen statis apa pun di App Router selalu menang atas catch-all, jadi aman. Halaman indeks hub yang saat ini hardcode (`page.tsx` di folder tsb) dapat dikonversi belakangan menjadi `page` Sanity; prioritas WS-D adalah menghapus jalur fallback, bukan mengkonversi hub.

### 1B. Route CMS first-class (BUKAN target hapus, tapi relevan)

`blog/[slug]`, `blog/category/[slug]`, `products/[slug]`, `products/category/[slug]`, `services/[slug]`, `services/category/[slug]`, `projects/[slug]`, `about/[slug]` — ini **tipe dokumen CMS tersendiri** (`post/product/service/project/category`), bukan fallback file kode. **Pertahankan** (mereka sudah "Sanity only"). Hanya tambahkan gate `contentStatus` bila skema nanti diberlakukan seragam.

### 1C. Util/lib yang DIHAPUS dari jalur render

| Path | Isi | Catatan |
|---|---|---|
| `lib/legacy-pages/astro-static.ts` | loader manifest (104 entri), `getLegacySection*` | hapus **setelah** tak ada konsumen |
| `lib/legacy-pages/astro-static-manifest.json` | 104 entri rute | hapus |
| `lib/legacy-pages/metadata.ts` | `generateLegacyPageMetadata` | hapus |
| `lib/legacy-pages/rewrite-content.ts` | `buildPercetakanCetakBukuCityCopy` (swap nama kota) | hapus |
| `lib/legacy-pages/internal-links.ts` | link internal legacy | hapus |
| `lib/legacy-pages/legacy-overrides.ts` | override legacy | hapus |
| `lib/legacy-pages/README.md`, `lib/legacy-pages/archive/*` | dokumentasi/arsip | hapus/arsipkan |
| `lib/local-content/jasa-cetak-buku-kota.ts` | loader cities.json (394) + static params | hapus |
| `lib/local-content/json-usaha.ts` | loader 3 JSON usaha | hapus |
| `lib/local-content/astro-catalog.ts` | katalog astro | hapus |
| `content/astro-local/jasa-cetak-buku-kota/cities.json` | 394 kota | hapus |
| `content/astro-local/json-usaha/*.json` (3: Biro_jasa_perizinan, Jasa_pengukuhan_PKP, agency_landing) | data usaha | hapus |
| `lib/templates/resolve-template.ts`, `lib/templates/route-policy.ts` | resolusi template + allowlist rute template | hapus (kecuali `route-policy` masih dipakai sitemap → hapus juga saat sitemap dibersihkan) |
| `lib/legacy-content/render.ts` (rich content legacy) | render blok legacy | audit; hapus bila hanya dipakai `RewritePageShell` |
| `components/ui/jasa-cetak-buku-city-shell.tsx` | shell kota | hapus |
| `components/ui/json-usaha-page.tsx` | shell JSON usaha | hapus |
| `components/ui/rewrite/page-shell.tsx` | shell template legacy (722 baris) | audit: hapus bila tak ada template legacy lagi |
| `lib/seo/gone-paths.ts` | daftar 410 hardcoded (**tidak dipakai di mana pun** — dead code) | pindahkan ke dokumen `redirect` Sanity berstatus 410 |

> **Urutan aman:** hapus konsumen dulu (route), baru hapus lib. Untuk mencegah build pecah, gunakan pencarian importer (`grep -rn "legacy-pages\|local-content\|jasa-cetak-buku\|json-usaha" app components`) sebelum menghapus tiap file.

### 1D. File yang DIPERTAHANKAN & di-rewire

- `components/blocks/index.tsx` — registry block (tetap; tambah block marketing baru).
- `sanity/lib/fetch.ts` — `fetchSanityPageBySlug` & `fetchSanityPagesStaticParams` jadi inti jalur tunggal; buang `fetchTemplatePage*`, `fetchLegacyPageOverrideByRoute`.
- `sanity/lib/metadata.ts` — `generatePageMetadata` jadi inti meta (rewire `contentStatus`).
- `app/sitemap.ts`, `app/robots.ts`, `next.config.mjs`, `app/api/revalidate/route.ts` — di-rewire (lihat §3, §4, §5).
- `app/(main)/page.tsx` (homepage) — konversi bertahap dari `PageHybridShell` ke render `page` by slug `index`.

---

## 2. Desain render tunggal (SATU jalur)

### 2A. Route baru: `app/(main)/[...slug]/page.tsx`

Satu **catch-all wajib** `[...slug]` di root grup `(main)` menggantikan `[slug]` + `[...segments]` + route per-seksi.

Alasan `[...slug]` (wajib, bukan `[[...slug]]` opsional):
- Cocok untuk `/a` **dan** `/a/b/c` dengan satu file → menangani slug bersarang secara native.
- `/` (root) ditangani `app/(main)/page.tsx` terpisah; tidak perlu opsi.
- Segmen statis (`blog`, `services`, `percetakan`, dst.) **selalu menang** atas catch-all → routing mereka tidak terganggu; catch-all hanya menangkap rute yang tidak punya folder statis.

```
app/(main)/
  page.tsx                 # "/"  (homepage; page slug "index")
  [...slug]/page.tsx        # SEMUA rute lain -> fetch page by path
  blog/ products/ services/ projects/ about/ contact/ ... (statis, tetap)
```

**Konflik yang harus diverifikasi:** `about/[slug]`, `blog/[slug]`, dst. tetap eksis sebagai statis; pastikan tidak ada nama `page` Sanity yang bertabrakan dengan prefix statis ini (kalau ada, pindahkan konvensionalisasi). Next akan memilih statis; `page` dengan path berprefiks statis tidak akan pernah ter-render dari catch-all — dokumentasikan sebagai aturan authoring.

### 2B. Alur render

```
1. path = "/" + (params.slug ?? []).join("/")     // mis. ["percetakan","cetak-buku"]
2. kalau path === "/"  -> redirect ke/atau render homepage
3. page = await fetchSanityPageByPath({ route: path })   // PAGE_QUERY
4. kalau page ada DAN page.contentStatus !== 'draft' (lihat §3c):
        -> render <Blocks blocks={page.blocks} pageTitle={page.title} />
5. kalau page ada tapi contentStatus === 'draft' (dan bukan draft-mode):
        -> notFound()   // tidak boleh bocor ke publik
6. kalau page tidak ada:
        -> cek redirect Sanity (301/410) via next.config (§4). Kalau tidak ada map apa pun
        -> notFound()   // 404 murni, TIDAK ada fallback
```

`generateMetadata` memakai `fetchSanityPageByPath` yang sama (dibungkus `cache()` React agar tidak query dua kali) → `generatePageMetadata({ page, slug: path })`.

### 2C. Dukungan slug bersarang

Dua opsi model slug di Sanity (pilih **Opsi 1** — paling sederhana):

- **Opsi 1 — slug berisi path penuh.** `page.slug.current = "percetakan/cetak-buku"`. Query tetap `slug.current == $slug` dengan `$slug = "percetakan/cetak-buku"`. `generateStaticParams` mengembalikan `{ slug: row.slug.current.split("/") }`. Perlu validasi slug mengizinkan `/` (Sanity slug default menyaring `/`; tambahkan `options` yang mengizinkan atau pakai field string `path`).
- **Opsi 2 — field `route` string terpisah** (mis. `/percetakan/cetak-buku`) sebagai sumber kanonik; slug tetap sederhana. Query `route == $route`. Lebih eksplisit, menghindari keterbatasan slug type.

**Rekomendasi: Opsi 1 dengan validasi**, karena minim migrasi (skema `page` sudah punya `slug`). Query:

```groq
*[_type == "page" && slug.current == $slug][0]{
  title, contentStatus, blocks[]{ ... }, meta{ ... }, aggregateRating, structuredData
}
```

`generateStaticParams` (building ISR):

```ts
const rows = await fetchSanityPagesStaticParams();          // PAGES_SLUGS_QUERY: {slug, contentStatus}
return rows
  .filter(r => r.contentStatus !== "draft")                 // jangan pre-build draft
  .map(r => ({ slug: r.slug.current.split("/") }));         // catch-all -> array
```

`export const dynamicParams = true` (default) agar slug baru dari Sanity tetap di-render on-demand tanpa rebuild penuh (ISR), lalu di-cache via tag (§5).

### 2D. 404 (bukan fallback)

- `notFound()` di `[...slug]/page.tsx` → render `app/(main)/not-found.tsx` (sudah ada) dengan status **404**.
- **Hapus** semua `return <RewritePageShell/>` / `<JasaCetakBukuCityShell/>` cadangan.
- Tidak ada "soft 404": jika `page` null → benar-benar 404, bukan halaman kosong.
- Verifikasi `app/not-found.tsx` & `app/(main)/not-found.tsx` tidak merender konten generik yang bisa membuat crawler menganggapnya 200 (pastikan status 404).

---

## 3. SEO wiring — semuanya dari Sanity

### 3A. Sumber data Sanity

| Kebutuhan | Sumber Sanity | Field |
|---|---|---|
| Sitemap | `page` (+ `post/product/service/project` bila tetap) | `slug`, `_updatedAt`, `contentStatus`, `meta.noindex` |
| robots.txt | `seoSettings` global | `defaultNoIndex`, `robotsDisallowPaths` |
| Canonical | `page.meta.canonicalUrl` → fallback self-referencing dari slug | `meta.canonicalUrl` |
| Meta robots | `page.meta.noindex` + `page.contentStatus` + `seoSettings.defaultNoIndex` | — |
| JSON-LD | `page.structuredData` + `page.aggregateRating` + `seoSettings.companyInfo` | — |
| Title/description/OG | `page.meta.title/description/image` → fallback `seoSettings` | — |

### 3B. Sitemap → `app/sitemap.ts` (bersih)

Hapus impor `getJasaCetakBukuCityStaticParams`, `getJsonUsahaStaticParams`, `isAllowedTemplateRoute`, query `pageLocation/serviceLocation`, dan `localStaticRoutes` hardcoded. Ganti query tunggal:

```groq
*[_type == "page"
  && defined(slug.current)
  && contentStatus == "index"          // gating
  && meta.noindex != true
]{ "loc": slug.current, _updatedAt }
```

Aturan URL: `slug.current == "index"` → `/`; selain itu `/{slug.current}` (termasuk path bersarang). `lastModified = _updatedAt`, `changeFrequency`/`priority` dari field opsional `seo.sitemapPriority/changefreq` bila ada, default `weekly`/`0.7`. Jika `seoSettings.defaultNoIndex === true` → **sitemap kosong**.

> Catatan: `post/product/service/project` yang tetap first-class boleh tetap masuk sitemap dengan query mereka (seperti sekarang), **tapi** lebih konsisten: gate mereka juga via `contentStatus`/`meta.noindex`. Karena tugas WS-D fokus `page`, minimal pastikan tidak ada lagi entri yang berasal dari file kode/template.

### 3C. `contentStatus` gating (tambah ke skema `page`)

Tambah field ke `studio/schemas/documents/page.ts`:

```ts
defineField({
  name: "contentStatus",
  title: "Content Status",
  type: "string",
  group: "seo",
  options: { list: [
    { title: "Draft",  value: "draft" },   // tidak di-render publik, tidak di-sitemap
    { title: "Ready",  value: "ready" },   // render publik, TIDAK di-sitemap, noindex
    { title: "Index",  value: "index" },   // render publik, di-sitemap, index,follow
  ], layout: "radio" },
  initialValue: "draft",
  validation: R => R.required(),
})
```

Semantik:
- `draft` → `notFound()` untuk publik (kecuali Draft Mode aktif), tidak di-sitemap.
- `ready` → render publik tapi `noindex, follow` + tidak di-sitemap (untuk halaman yang belum siap SEO).
- `index` → index,follow + masuk sitemap.

Konsisten dengan pola `contentStatus` yang sudah ada di `serviceLocation`/`pageLocation`.

### 3D. Canonical + meta robots → `sanity/lib/metadata.ts`

`buildMetadata()` (sudah ada) diperluas:
- `canonical = page.meta.canonicalUrl || ${SITE_URL}/${slug}` (self-referencing; `index` → `/`).
- `robots`: `noindex` jika **salah satu**: `seoSettings.defaultNoIndex`, `page.meta.noindex`, `!isProduction`, atau `contentStatus !== "index"`. Selain itu `index, follow`.
- Pertimbangkan hapus `alternates.languages` hardcoded `{ 'id-ID': 'https://www.kotacom.id/' }` yang saat ini **salah** (selalu menunjuk homepage) — ganti jadi self-referencing atau hapus sampai i18n nyata.

### 3E. robots.txt → `app/robots.ts`

Sudah dari Sanity (`seoSettings`). Perubahan minor: pastikan `sitemap` menunjuk `{SITE_URL}/sitemap.xml`; biarkan daftar AI crawler. Jika `defaultNoIndex` → `disallow: /`.

### 3F. JSON-LD → komponen baru di jalur tunggal

Buat `components/blocks/seo/page-json-ld.tsx` (atau di `[...slug]/page.tsx`) yang merakit:
- `Organization`/`LocalBusiness` dari `seoSettings.companyInfo` (NAP, serviceAreas) — 1× per halaman (di layout idealnya).
- `WebPage` + `BreadcrumbList` untuk `page` generik.
- `FAQPage` jika ada block FAQ.
- `AggregateRating` dari `page.aggregateRating` → `seoSettings.defaultAggregateRating`.
- Opsional `structuredData` mentah dari `page.structuredData` (escape + validasi).

Reuse helper di `lib/seo-jsonld.ts` (`buildBreadcrumbJsonLd`, `buildFaqJsonLd`, `resolveAggregateRating`). Render via `<script type="application/ld+json">` di server component.

---

## 4. Redirect 301/410 dari dokumen `redirect` Sanity

### 4A. Keputusan: `next.config.mjs redirects()` (bukan middleware)

Pertahankan mekanisme **`redirects()` di `next.config.mjs`** (sudah ada, membaca dokumen `redirect`). Alasan:
- `permanent: true` → **308** (setara 301 untuk semantik SEO; Next tidak mengeluarkan 301 literal). Untuk 301 literal, set header status via middleware/route.
- Redirect dari `redirects()` dievaluasi di edge, murah, dan **tidak** membebani runtime Node per-request seperti middleware.
- Build-time reading Sanity berarti redirect berubah **setelah redeploy** — trade-off yang diterima sekarang (dokumentasikan).

**Middleware TIDAK dipakai** untuk redirect konten karena: butuh fetch Sanity per-request (biaya + latensi) atau cache yang rumit, dan `redirects()` sudah cukup. Middleware hanya relevan bila butuh redirect dinamis tanpa redeploy (lihat 4D opsional).

### 4B. 410 Gone

Skema `redirect.ts` saat ini hanya `source/destination/permanent` (301/302). **Tambah dukungan Gone:**

```ts
defineField({ name: "statusCode", title: "Status Code", type: "string",
  options: { list: [
    { title: "301 Moved Permanently", value: "301" },
    { title: "302 Found (temporary)", value: "302" },
    { title: "410 Gone",            value: "410" },
  ]}})
```

- Untuk 410, `destination` tidak wajib.
- Di `next.config.mjs`: query pisahkan `statusCode == "410"` → kumpulkan ke daftar gone. Redirect 301/302 tetap lewat `redirects()` (Next tak bisa mengekspresikan 410 di `redirects()`), jadi 410 **harus** ditangani di route/middleware kecil:

**Opsi 410:** tambahkan di `app/(main)/[...slug]/page.tsx` atau route `app/gone`:
```
// setelah fetch page null
if (await isGoneFromSanity(path)) {
  return new NextResponse("Gone", { status: 410 });
}
```
Dengan cek via cache in-memory (edge) atau middleware. **Rekomendasi:** middleware tipis yang baca Set gone dari env yang di-generate saat build (menyerupai pola `gone-paths.ts` sekarang, tapi bersumber Sanity). Migrasikan isi `lib/seo/gone-paths.ts` (31 path spam) → dokumen `redirect` statusCode=410, lalu hapus file itu.

### 4C. Urutan evaluasi

1. `redirects()` (301/308/302) — dievaluasi **sebelum** render route.
2. Route catch-all: fetch `page`.
3. Jika null → cek 410 (middleware/route).
4. Jika null juga → `notFound()` (404).

Redirect selalu **menang** di atas 404 untuk path yang dipetakan, sehingga URL yang di-cull tetap meneruskan link equity (301) atau ditandai Gone (410).

### 4D. (Opsional) redirect tanpa redeploy

Bila ingin edit redirect Sanity langsung efek tanpa rebuild: pindah ke **middleware.ts** yang fetch Set redirect/gone dari Sanity dengan `next: { revalidate: 300, tags: ['redirects'] }` dan `revalidatePath('/')`/revalidate tag via webhook (§5). Trade-off: +1 fetch per request tak ter-cache pertama, runtime edge. **Default: tetap `next.config.mjs`** untuk kesederhanaan; dokumentasikan opsi ini sebagai upgrade.

---

## 5. Strategi ISR / revalidate

### 5A. Prinsip

- **on-demand revalidation** (utamanya) + fallback time-based.
- Tag per halaman → revalidate presisi saat dokumen `page` berubah.
- `dynamicParams = true` → halaman baru langsung tersedia (SSR on-demand lalu di-cache), tanpa redeploy.
- Halaman **dihapus/di-`draft`** di Sanity: `fetchSanityPageBySlug` mengembalikan null → route mengeksekusi `notFound()` (404) atau redirect 301/410 dari map. **Perlu revalidate tag halaman tsb** agar cache lama tak menyajikan konten yang sudah dihapus.

### 5B. Tag & revalidate per halaman

Di `sanity/lib/fetch.ts`, `fetchSanityPageBySlug` sudah pakai `tags: ["pages", `page:${slug}`]`, `revalidate: 604800`. Perluas:
- `fetchSanityPageByPath` → `tags: ["pages", `page:${route}`]`.
- `fetchSanityPagesStaticParams` (generateStaticParams) tidak di-cache (build-time).

### 5C. Webhook revalidate → `app/api/revalidate/route.ts`

Perluas handler `collectPaths`:
- `_type === "page"` → `revalidatePath(`/${slug}`)` (termasuk path bersarang) **dan** `revalidateTag(`page:${slug}`)`; selalu `revalidatePath("/sitemap.xml")` (sitemap ikut berubah).
- `_type === "redirect"` → `revalidatePath("/", "layout")` (atau revalidate tag redirect) + sitemap.
- `_type === "seoSettings"` → revalidate sitemap/robots + semua path layout.
- Kirim juga ke SEO dashboard (sudah ada) untuk IndexNow/GSC.
- Tambahkan `revalidateTag("pages")` untuk perubahan masif.

> Saat ini handler **tidak** memanggil `revalidateTag`, hanya `revalidatePath`. Tambahkan `revalidateTag` agar cache `fetchPublishedCached` (yang pakai tags) benar-benar busted.

### 5D. Skenario konten berkurang (culling)

Saat 986 → ~150–250 URL (WS-B):
1. Buat dokumen `redirect` (301) atau `contentStatus=410` untuk tiap URL yang dibuang **sebelum** menghapus `page`-nya.
2. Set `page.contentStatus = "draft"` (atau hapus) untuk URL yang di-cull.
3. Trigger revalidate webhook (atau redeploy untuk `next.config` redirect).
4. Verifikasi: URL lama → 301/410, **bukan** 404 liar; sitemap hanya berisi URL aktif.

---

## 6. Migrasi aman + checklist verifikasi

### 6A. Langkah migrasi (staging dulu)

| Langkah | Aksi | Guardrail |
|---|---|---|
| M0 | Buat branch `feat/sanity-only-render` di repo (tidak deploy produksi) | — |
| M1 | Skema: tambah `contentStatus` ke `page`, `statusCode` ke `redirect` | review skema |
| M2 | Isi `page` untuk semua URL yang **dipertahankan** (dari WS-B/WS-C); set `contentStatus` | gate: ≥800 kata, CTA, schema |
| M3 | Tambah route baru `[...slug]/page.tsx` **di belakang feature flag** | lihat 6B |
| M4 | Rewire sitemap/robots/metadata/JSON-LD ke Sanity `page` | — |
| M5 | Migrasi `gone-paths.ts` + `STATIC_REDIRECTS` ke dokumen `redirect` Sanity | 301/410 lengkap |
| M6 | Hapus route lama (`[slug]`, `[...segments]`, per-seksi) & util legacy | `grep` importer dulu |
| M7 | Hapus `content/astro-local/*`, `lib/legacy-pages/*`, `lib/local-content/*` | build hijau |
| M8 | Deploy **staging** (Dokploy app `kotacom-frontend` staging) → QA | checklist 6D |
| M9 | Cutover produksi setelah approval + monitoring GSC | rollback siap |

### 6B. Feature flag (bila perlu)

Bila route baru & lama harus koeksis selama transisi, gunakan env flag yang dibaca di `[...slug]/page.tsx` / `next.config`:

```
NEXT_PUBLIC_SANITY_ONLY_RENDER=1   # true -> catch-all aktif; lama -> fallback legacy
```

Sederhananya: aktifkan catch-all hanya bila flag true; jika false, route lama tetap. Untuk produksi, **flag harus `1`** (tanpa fallback). Flag ini temporary, dihapus setelah M6–M7.

### 6C. Risiko build pecah

Sebelum menghapus tiap file lib, jalankan importer scan:
```
rg -n "legacy-pages|local-content|jasa-cetak-buku|json-usaha|rewrite-content|resolve-template|route-policy" app components
```
Hapus konsumen → baru hapus file.

### 6D. Checklist verifikasi (pasca M8 di staging)

- [ ] `pnpm build` (atau `next build`) **exit 0**, tanpa error/warning impor hilang; **tanpa** `content/astro-local`, `lib/legacy-pages`.
- [ ] `pnpm tsc --noEmit` (atau `tsc`) **bersih** (0 error).
- [ ] **0 broken internal link**: crawl staging (mis. `linkinator`, `lychee`, atau skrip sendiri) atas semua URL sitemap → semua 200/301/308/410, tidak ada 404 internal.
- [ ] Sitemap hanya berisi `contentStatus=index` & `meta.noindex!=true`; hitung jumlah entri = jumlah `page` index + CMS first-class; **tidak ada** entri `jasa-cetak-buku-*` dari cities.json kecuali yang memang jadi `page`.
- [ ] URL lama (sampel dari WS-B) → 301 ke target yang benar; URL spam → 410.
- [ ] `page` non-`index` (`draft`/`ready`) → 404 atau `noindex` sesuai semantik; **tidak** muncul di sitemap.
- [ ] `robots.txt` menunjuk sitemap; `defaultNoIndex` dihormati.
- [ ] Canonical **self-referencing** di setiap halaman (render HTML → cek `<link rel=canonical>`).
- [ ] Meta robots benar per `contentStatus`.
- [ ] JSON-LD valid (Rich Results Test / `schema.org` validator) minimal Organization + WebPage + FAQ.
- [ ] Slug bersarang render (mis. `/percetakan/cetak-buku`) & masuk sitemap dengan path benar.
- [ ] Revalidate webhook: ubah `page` di Sanity → halaman & sitemap ter-update tanpa rebuild.
- [ ] Draft Mode masih berfungsi (edit preview).
- [ ] `grep -rn "astro-static-manifest\|cities.json\|json-usaha\|RewritePageShell"` → 0 hasil di `app`.

---

## 7. Risiko & rollback

| # | Risiko | Dampak | Mitigasi | Rollback |
|---|---|---|---|---|
| R1 | URL di-cull belum punya `page`/redirect → **404 massal** | SEO turun | selesaikan M2 & M5 sebelum M7 | aktifkan kembali fallback legacy (revert M6) via `git revert`/flag |
| R2 | Sitemap bocor URL thin/draft | kualitas index turun | gate `contentStatus=index` ketat | redeploy versi sitemap sebelumnya |
| R3 | Slug bersarang (`a/b/c`) tak terduga (Sanity slug menolak `/`) | rute gagal | validasi slug / Opsi 2 (`route` field) | ubah ke field `route` |
| R4 | Redirect Sanity hanya efek setelah redeploy | redirect lambat aktif | jalankan redeploy setelah edit besar; atau upgrade ke middleware (§4D) | — |
| R5 | 410 tidak didukung `redirects()` Next | tak bisa tandai Gone | route/middleware gone khusus (§4B) | temporer: 301 ke hub terdekat |
| R6 | Revalidate tak bust cache tag (hanya path) | konten lama tersaji | tambah `revalidateTag` (§5C) | redeploy |
| R7 | Tabrakan path `page` dengan prefix statis (`/blog/...`) | halaman tak ter-render | aturan authoring: `page` tak boleh berprefiks statis | rename slug |
| R8 | Draft bocor ke publik | kebocoran konten | `contentStatus!=index` → noindex & 404; draft-mode gate | set `draft`/`noindex` |
| R9 | Hapus lib yang masih dipakai (impor tersembunyi) | build pecah | importer scan sebelum hapus (§6C) | `git revert` file |
| R10 | ISR men-cache 404/redirect lama | status salah | revalidate tag saat `redirect`/`page` berubah | redeploy/cache bust |

**Rollback utama:** seluruh pekerjaan di branch/staging. Karena tidak ada perubahan produksi sebelum cutover (M9), rollback = `git revert` branch atau redeploy image sebelumnya di Dokploy (`kotacom-frontend`). Feature flag (§6B) memungkinkan kembalikan fallback legacy tanpa revert kode bila masih diperlukan.

---

## 8. Ringkasan perubahan file (referensi cepat)

**Dibuat**
- `app/(main)/[...slug]/page.tsx` — jalur render tunggal.
- `components/blocks/seo/page-json-ld.tsx` (opsional) — JSON-LD generik.
- `sanity/queries/page.ts` — `PAGE_QUERY` diperluas (+`contentStatus`,`structuredData`), `PAGES_SLUGS_QUERY` (+`contentStatus`).
- Middleware/route gone (opsional) untuk 410.

**Diubah**
- `sanity/lib/fetch.ts`, `sanity/lib/metadata.ts`, `app/sitemap.ts`, `app/robots.ts`, `next.config.mjs`, `app/api/revalidate/route.ts`.
- `studio/schemas/documents/page.ts` (+`contentStatus`), `studio/schemas/documents/redirect.ts` (+`statusCode`/410).

**Dihapus**
- `app/(main)/[slug]/`, `app/(main)/[...segments]/`, `app/(main)/percetakan/[...segments]/`, `app/(main)/pembuatan-website/[slug]/`, `app/(main)/software/[slug]/` (page.tsx).
- `lib/legacy-pages/*`, `lib/local-content/{jasa-cetak-buku-kota,json-usaha,astro-catalog}.ts`, `lib/templates/*`, `lib/seo/gone-paths.ts`, `lib/legacy-content/render.ts` (audit).
- `content/astro-local/*`.
- `components/ui/{jasa-cetak-buku-city-shell,json-usaha-page}.tsx`, `components/ui/rewrite/*` (audit).
