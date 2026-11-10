# 02 — URL Inventory, Konsolidasi & Redirect Map

> Workstream **WS-B** dari `MASTER-PLAN.md`. Output mesin: `02-url-migration.csv` (986 baris).
> Prinsip: **anti-thin-content** (P5–P9) + **marketing-first** (P10–P13) + **satu sumber = Sanity `page`+blocks**.
> Lingkungan aman (tidak produksi). Tidak ada perubahan kode/commit.

---

## 1. Ringkasan eksekutif

| | Jumlah |
|---|---:|
| Total URL di sitemap live (`kotacom.id/sitemap.xml`) | **986** |
| **keep** (pertahankan, 1 halaman kuat) | **331** |
| **redirect** (301 ke halaman kanonik) | **634** |
| **ganti** (pertahankan URL, ganti konten total) | **13** |
| **merge** (gabung 301 ke halaman lain) | **1** |
| **410** (hapus, tanpa padanan) | **7** |

**Efek konsolidasi:** 986 → **331 URL** yang dipertahankan; **655 URL thin/duplikat/legacy dikonsolidasi** (634 redirect + 13 ganti relokasi + 1 merge + 7 hapus).

**Catatan penting:** dari 331 "keep", mayoritas adalah **konten CMS unik yang sudah ada** (152 product, 81 blog, 12 project, hub, dst). Jumlah halaman **marketing/layanan yang benar-benar perlu ditulis ulang tebal** ≈ **90** (12 hub + 14 percetakan + 20 website + 29 lokasi strategis + 3 software + 3 services). Inti penghematan thin-content = **422 halaman kota pabrikan**.

---

## 2. Distribusi per kategori & keputusan

| Tipe | Total | keep | redirect | ganti | merge | 410 | Sumber |
|---|---:|---:|---:|---:|---:|---:|---|
| hub statis | 12 | 12 | – | – | – | – | code (route) |
| `blog/*` | 81 | 81 | – | – | – | – | CMS (post + postCategory) |
| `products/*` | 160 | 160 | – | – | – | – | CMS (product + kategori) |
| `projects/*` | 12 | 12 | – | – | – | – | CMS (project) |
| `software/*` | 3 | 3 | – | – | – | – | CMS (serviceType) |
| `services/*` | 3 | – | – | 3 | – | – | code (json-usaha) |
| `percetakan/*` | 48 | 14 | 34 | – | – | – | CMS(serviceLocation)+code(manifest) |
| `pembuatan-website/*` | 43 | 20 | 23 | – | – | – | CMS(pageLocation)+code(manifest) |
| `jasa-cetak-buku-*(kota)` | 394 | 29 | 365 | – | – | – | **CMS(serviceLocation)+code(cities.json)** |
| root-slug lain | 230 | – | 212 | 10 | 1 | 7 | code(manifest/route) + CMS(page) |
| **TOTAL** | **986** | **331** | **634** | **13** | **1** | **7** | |

### Sumber data (dual-source problem)
- `cms:serviceLocation + code:cities.json` → **394** (bekas masalah "dua sumber": halaman kota ada di kode DAN mirror di Sanity).
- `cms:serviceLocation + code:manifest` → 58 · `cms:pageLocation + code:manifest` → 34.
- `cms:page` → 227 · `cms:product` → 152 · `cms:post` → 41 · `cms:project` → 12.
- `code:json-usaha` → 3 · `code:route` (tanpa dokumen) → 16.
- Status HTTP live: **985 × 200**, **1 × 404** (`/jasa-pembuatan-website-kotacom`).

---

## 3. Aturan keputusan (kaidah yang dipakai per baris CSV)

Terapkan **berurutan**; baris pertama yang cocok menang.

### A. KEEP — pertahankan sebagai 1 halaman kuat (marketing-first)
1. **Hub/inti** — `/`, `/about`, `/contact`, `/blog`, `/products`, `/projects`, `/services`, `/software`, `/percetakan`, `/pembuatan-website`, `/sistem-pos`, `/privacy`. (12)
2. **Konten CMS unik** — `blog/*` (post + kategori), `products/*` (produk + kategori), `projects/*`, `software/*` + `services/{serviceType}`, semua ≥ konten nyata. (268)
3. **Layanan cetak nyata & berbeda** — `percetakan/cetak-{al-quran, album-pernikahan, banner-spanduk, brosur, buku, buku-kenangan-sekolah, company-profile, kalender, kaos, kartu-nama, kemasan-product, stiker, undangan, yasin}`. (14)
4. **Sub-layanan website nyata** — `pembuatan-website/{harga, jasa-migrasi-wordpress, jasa-pembuatan-website-<industri>}`. (9)
5. **Kota strategis (lokasi)** — HANYA kota berpotensi + wajib dibangun bukti lokal unik (P7). Gate `contentStatus=index`.
   - **`jasa-cetak-buku-*` (29):** surabaya, sidoarjo, mojokerto (home base Jatim) + ibukota provinsi: denpasar, medan, makassar, palembang, balikpapan, banjarmasin, pontianak, samarinda, manado, padang, pekanbaru, batam, bandar-lampung, kupang, mataram, jayapura, ambon, ternate, bengkulu, jambi, pangkal-pinang, tanjung-pinang, kendari, palu, gorontalo, manokwari.
   - **`pembuatan-website/{kota}` (11):** surabaya, jakarta, bandung, semarang, malang, denpasar, medan, makassar, palembang, balikpapan, pekanbaru, batam, pontianak.
   - **⚠️ Syarat:** jika kota strategis **tidak** diisi bukti lokal (klien/foto/testimoni/area/harga spesifik), ubah keputusan → **redirect** ke hub layanan terkait.

### B. REDIRECT (301) — konsolidasi ke halaman kanonik
6. **Halaman kota thin pabrikan** (template + swap nama kota):
   - `jasa-cetak-buku-{kota}` non-strategis (**365**) → `/percetakan/cetak-buku`
   - `pembuatan-website/{kota}` non-strategis (**23**) → `/pembuatan-website`
   - `percetakan/cetak-kalender/{kota}` (**34**) → `/percetakan/cetak-kalender`
7. **Legacy programmatic root-slug** (212) → layanan/produk kanonik:
   - `jual-game-pc-*`, `no-1/terbaik/rekomendasi-jual-game-pc-*`, `isi-game-pc-*` (**92**) → `/products/game-pc`
   - `jasa-install*` / `jasa-instal*` (**50**) → `/software`
   - `service-*`, `jasa-service/servis/upgrade/sewa/recovery/flash-hp/root-*` (**28**) → `/services`
   - `jasa-rakit-pc*`, `rakit-pc-*`, `rekomendasi-*-pc`, `pc-gaming-*` (**18**) → `/products/rakit-pc`
   - `jual-flashdisk/dvd/kontputer/software-*` (**9**) → `/products`
   - karaoke (`sewa-karaoke`, `paket-home-karaoke`, `jasa-isi-lagu-karaoke`, dst.) (**8**) → `/products/pc-karaoke`
   - `jasa-pembuatan-website*`, `jasa-website*` → `/pembuatan-website`
   - non-kota di klaster cetak buku (`jasa-cetak-buku-novel-murah`, `-dari-pdf-surabaya`, `-edisi-terbatas-*`, `-satuan-terdekat-*`) → `/percetakan/cetak-buku`; `-yasin-surabaya` → `/percetakan/cetak-yasin`
   - AC/CCTV/alarm/kasir lepas → `/services`

### C. GANTI — pertahankan URL, ganti konten total
8. **Landing json-usaha generik** (3): `/services/agency-landing`, `/services/biro-jasa-perizinan`, `/services/jasa-pengukuhan-pkp` → tulis ulang sebagai `page`+blocks layanan nyata (positioning→offer→proof→CTA).
9. **Artikel unik yang nyasar di root** (10) → relokasi (ganti) ke `/blog/{slug}` (konten SEO bernilai). Termasuk 2 artikel jilid yang saling near-duplicate (`soft-cover-hard-cover-*` & `softcover-vs-hardcover-*`) → pilih 1 kanonik, yang lain merge.

### D. MERGE (301) — gabung ke halaman setara
10. `/percetakan-buku-murah-surabaya` (1) → `/percetakan/cetak-buku` (landing duplikat).

### E. 410 — hapus (tak relevan / berisiko / usang)
11. `download-*` (**3**, ISO/software ilegal) · `list-software-*` (**2**, list usang) · `index-old` (**1**) · `jasa-pembuatan-website-kotacom` (**1**, sudah 404).

---

## 4. Aturan target redirect (validasi)

- **0 broken:** semua target 301/merge (634+1) sudah dicek menunjuk ke URL yang **ada di set keep** (program‑validasi lulus, 0 meleset).
- Redirect dikelola lewat **dokumen `redirect` di Sanity** (P4) — source/destination/permanent (301=true) — **bukan** di kode. Format sudah ada & terisi **400 dokumen**; map ini menambah/menyelaraskan sisa.
- **Batas ukuran tool:** sitemap 986 URL + map redirect (±650 baris) jauh di bawah batas tool; dokumen `redirect` menyimpan 1 URL/baris sehingga aman untuk konten besar.
- Canonical self-referencing untuk semua `keep`; hindari near-duplicate (P9).
- Untuk URL **keep-kota berstatus sementara thin** → set `meta.noindex=true` sampai konten tebal siap; buka index hanya setelah gate P5 lolos.

---

## 5. Verifikasi yang sudah dilakukan
- Sitemap live di-`curl` → 986 URL unik (host `www.kotacom.id`).
- Status HTTP dicek untuk **seluruh 986** (HEAD, paralel): 985×200 + 1×404.
- Matching sumber dilakukan ke: Sanity `page`(238) `post`(41) `product`(152) `project`(164) `serviceLocation`(458) `pageLocation`(43) `serviceType`(28) `category`(154) `redirect`(400) · file kode `cities.json`(394) `astro-static-manifest.json`(104) `json-usaha`(3).
- Integritas target redirect divalidasi program (0 broken).
