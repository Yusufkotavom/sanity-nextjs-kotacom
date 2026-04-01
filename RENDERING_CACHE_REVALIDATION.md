# Rendering, Cache, Revalidate (Next.js + Sanity)

Dokumen ini menjelaskan mode rendering dan cache behavior di project ini, termasuk kapan konten baru muncul otomatis dan kapan butuh revalidate/redeploy.

## 1) Mode rendering di Next.js (App Router)

`Static (SSG)`
- HTML di-generate saat build.
- Cepat, SEO bagus.
- Konten baru tidak otomatis muncul sampai cache direfresh (ISR/webhook/redeploy).

`ISR (Incremental Static Regeneration)`
- Tetap static, tapi cache bisa diperbarui tanpa full redeploy.
- Bisa by timer (`revalidate = 60`) atau on-demand (`revalidatePath`/`revalidateTag`).

`SSR (Dynamic)`
- Render setiap request di server.
- Data paling fresh, tapi cost/latency lebih tinggi.
- Tidak cocok untuk semua halaman CMS jika traffic tinggi.

`CSR`
- Data diambil di browser.
- Bukan strategi utama project ini untuk halaman konten publik.

## 2) Kondisi project ini saat ini

Secara umum project ini memakai static/SSG untuk halaman konten.

Dari output build:
- `○` = static prerender
- `●` = SSG (generateStaticParams)
- `ƒ` = dynamic route (server on-demand)

Rute penting:
- `● /blog/[slug]` -> SSG
- `● /products/[slug]` -> SSG (gabungan detail + category slug)
- `● /services/[slug]` -> SSG (gabungan detail + category slug)
- `● /[slug]` -> SSG
- `ƒ /api/revalidate` -> dynamic API endpoint

Implikasi:
- Publish konten baru di Sanity tidak selalu langsung terlihat jika cache route masih valid.
- Solusi: on-demand revalidate webhook (sudah disiapkan).

## 3) Kenapa dev terasa “langsung update”

Saat `pnpm dev`, Next.js dev server:
- sering re-run fetch/render,
- cache behavior tidak seketat production.

Akibatnya, perubahan Sanity terlihat cepat di local. Ini normal dan berbeda dengan production.

## 4) Revalidate yang sudah ditambahkan

Endpoint:
- `frontend/app/api/revalidate/route.ts`

Mekanisme:
- Validasi `REVALIDATE_SECRET`
- Menerima payload webhook Sanity (`_type`, `slug`, optional `path`)
- Menjalankan `revalidatePath(...)` ke path terkait:
  - global: `/`, `/blog`, `/products`, `/services`
  - per type:
    - `post` -> `/blog`, `/blog/[slug]`, `/blog/category`
    - `product` -> `/products`, `/products/[slug]`
    - `service` -> `/services`, `/services/[slug]`
    - `category` -> `/blog/category/[slug]`, `/products/[slug]`, `/services/[slug]`
    - `page` -> `/<slug>` atau `/` untuk index
    - `settings`/`navigation` -> invalidate route utama

## 5) Apa itu invalidate cache?

Invalidate cache = menandai cache lama sebagai stale agar request berikutnya membangun versi baru.

Pada App Router, saat `revalidatePath('/blog/my-post')`:
- cache route `/blog/my-post` dibersihkan,
- request berikutnya render ulang dengan data terbaru dari Sanity,
- hasil baru disimpan lagi ke cache.

Jadi tidak perlu full redeploy setiap publish.

## 6) Kapan perlu redeploy?

Masih perlu redeploy jika:
- ubah code/components/layout,
- ubah dependency/build config,
- ubah env var (mis. `NEXT_PUBLIC_SITE_URL`, `REVALIDATE_SECRET`).

Tidak perlu redeploy untuk konten rutin jika webhook revalidate sudah benar.

## 7) Setup produksi yang direkomendasikan

1. Set `REVALIDATE_SECRET` di Vercel (frontend).
2. Buat webhook Sanity:
   - URL: `https://<frontend-domain>/api/revalidate?secret=<REVALIDATE_SECRET>`
   - Trigger: create/update/delete
   - Filter:
     `_type in ["post","product","service","category","page","settings","navigation"]`
3. Publish konten di Sanity -> frontend auto refresh cache path terkait.

## 8) Troubleshooting cepat

Jika publish tidak update:
1. Cek `REVALIDATE_SECRET` sama persis di Vercel + webhook URL.
2. Cek webhook delivery log di Sanity (status 200/401/500).
3. Test manual:
   - `POST https://<domain>/api/revalidate?secret=<secret>`
   - body:
```json
{"_type":"post","slug":{"current":"my-post"}}
```
4. Pastikan slug route dan payload sesuai format.
