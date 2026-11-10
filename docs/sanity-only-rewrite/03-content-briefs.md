# 03 — CONTENT BRIEFS MARKETING-FIRST & ANTI-THIN-CONTENT

> **Workstream:** WS-C (lihat `MASTER-PLAN.md` §7)
> **Tujuan:** Brief per keluarga halaman kotacom.id — positioning → offer → proof → CTA → outline → FAQ → keyword → syarat "thick content". Plus aturan copywriting dan checklist gate `contentStatus=index`.
> **Bahasa situs:** Indonesia (profesional, kredibel, manfaat-oriented).
> **Status:** Dokumen perencanaan. Tidak mengubah kode/repo — hanya output `.md`.
> **Basis model konten:** dokumen `page` + `blocks[]` (lihat `01-content-model.md`). Setiap halaman = 1 `page` doc.

---

## 0. Cara pakai dokumen ini

1. Writer membuka brief keluarga halaman yang relevan, lalu membangun konten di Sanity Studio sebagai **`page` doc + `blocks[]`**.
2. Sebelum publish, isi checklist §10. Jika lulus → set `contentStatus = index` (masuk sitemap). Jika belum → `draft`/`reviewed`.
3. Data placeholder wajib diganti fakta nyata sebelum `index` (lihat §9 "Data yang HARUS diverifikasi").
4. Konvensi NAP, CTA, dan schema di §1 dipakai seragam di semua halaman.

---

## 1. Konvensi global (wajib, semua halaman)

### 1.1 NAP & kontak kanonik

| Field | Nilai kanonik |
|---|---|
| Brand | **Kotacom IT Service & Percetakan** |
| WhatsApp (kanonik) | **6285799520350** |
| Telepon tampil | (0857) 9952-0350 |
| Email | info@kotacom.id *(verifikasi)* |
| Kantor 1 | Graha Indraprasta G7/15, Tulangan, Sidoarjo |
| Kantor 2 | Jl. Tenggilis Mulya No. 76, Surabaya |
| Area layanan inti | Surabaya, Sidoarjo, Gresik, Mojokerto, Pasuruan, Malang (Jawa Timur) + pengiriman seluruh Indonesia |
| Jam operasional | Senin–Jumat 09.00–17.00 WIB, Sabtu 09.00–14.00 WIB *(verifikasi)* |

> ⚠️ **Jangan** pakai nomor/alamat placeholder lama yang masih muncul di beberapa script (`+62 812 3456 7890`, `+62 31 7345 6789`, "Jl. Raya Darmo Permai III No. 45"). NAP kanonik di tabel ini satu-satunya yang benar dan **harus identik** di settings, footer, halaman Contact, dan JSON-LD `LocalBusiness`/`Organization`.

### 1.2 Aturan CTA

- **1 primary CTA per halaman**, harus berisi nomor kanonik.
  - Format link: `https://wa.me/6285799520350?text=<pesan-berkonteks-URL-encoded>`
  - Contoh pesan: `Halo Kotacom, saya ingin konsultasi <layanan> untuk bisnis saya.`
- **1 secondary CTA** (boleh "Lihat Layanan", "Lihat Portofolio", "Ajukan Penawaran", "Lihat Harga", atau "Isi Form Kontak").
- Format label CTA: action + manfaat singkat, mis. "Konsultasi Gratis via WhatsApp", "Minta Penawaran Cetak Buku".
- CTA muncul minimal di: hero, setelah section offer, setelah proof, dan sticky mobile CTA.
- Event tracking (GA4): `cta_click`, `wa_click`, `form_submit` (MASTER-PLAN P12).

### 1.3 Schema & meta baseline (semua halaman)

- Crew `meta.title` ≤ 70 char, `meta.description` 140–160 char, `focusKeyword` + `secondaryKeywords` diisi.
- Canonical self-referencing (default digenerate; jangan override kecuali perlu).
- JSON-LD:
  - **Organization / LocalBusiness** di semua halaman (global dari `seoSettings`, `companyInfo`).
  - **Service** (`offers`, `areaServed`, `provider`) di halaman layanan.
  - **Product** (`offers`, `brand`, `aggregateRating` bila ada) di halaman produk.
  - **Article / BlogPosting** (`author`, `datePublished`, `dateModified`) di blog.
  - **FAQPage** di tiap halaman yang punya ≥ 1 FAQ (wajib ≥ 5 di halaman layanan).
  - **BreadcrumbList** di halaman dalam.
- Satu H1 per halaman; hierarki H2 → H3, jangan lompat level.

### 1.4 Block marketing yang dipakai (dari katalog block)

Hero → **Offers/Pricing** → **Split (apa yang Anda dapat)** → **Proof (Stats/Testimonial/Case teaser)** → Rich Content (edukasi) → FAQs → CTA/WhatsApp-CTA → internal link module → (opsional) Sticky mobile CTA.

---

## 2. Aturan copywriting (berlaku di semua brief)

1. **Manfaat > fitur.** Setiap fitur ditulis sebagai hasil untuk pembaca. ❌ "Kami pakai Next.js" → ✅ "Halaman Anda tampil cepat di HP, jadi calon pelanggan tidak kabur menunggu loading."
2. **Bicara ke satu pembaca.** Gunakan "Anda" dan bahasa pemilik bisnis, bukan bahasa developer. Sebut persona (mis. "pemilik toko", "penulis buku", "manajer operasional").
3. **Diferensiasi nyata, bukan klaim kosong.** Hindari "terbaik", "no. 1", "termurah" tanpa bukti. Ganti dengan diferensiasi spesifik: *satu alur delivery (website + software + IT + cetak)*, *proses spec-first untuk cetak*, *scope dilakukan per fase*.
4. **Hindari keyword stuffing.** Keyword utama muncul natural di H1, intro, 1–2 sub-heading, dan meta — bukan di setiap kalimat. Target kepadatan wajar (±0,5–1,5%), utamakan keterbacaan.
5. **Spesifik mengalahkan umum.** Sertakan angka, kota, jenis usaha, timeline, dan rentang harga bila ada. "Cocok untuk UMKM Surabaya & Sidoarjo" > "cocok untuk semua bisnis".
6. **Proof sebelum CTA.** Yakinkan (testimoni/angka/portofolio) dulu, baru minta kontak.
7. **Satu ide per section**, kalimat pendek, hindari jargon. Paragraf ≤ 4 baris.
8. **Aktif, bukan pasif.** "Kami cek file sebelum produksi" > "file akan diperiksa".
9. **Konsisten NAP & istilah.** Nama layanan, kota, dan nomor konsisten lintas halaman.
10. **Tanpa placeholder.** `{lokasi}`, `lorem`, "isi di sini", gambar contoh dengan watermark asing → HARAM sebelum `index`.

---

## 3. Ringkasan keluarga halaman & target

| # | Keluarga | Contoh URL | Template | Min kata | Catatan konsolidasi |
|---|---|---|---|---|---|
| A | Homepage | `/` | landing | 1000 | 1 halaman, hub semua lane |
| B | Hub Layanan | `/services` | service | 800+ | katalog kategori layanan |
| C | Pembuatan Website | `/pembuatan-website` (+ 7 vertikal) | service | 800 | vertikal = 1 halaman tiap, bukan per-kota |
| D | Software | `/software` (+ sistem-pos, dll) | service | 800 | sistem-pos punya brief sendiri (F) |
| E | Percetakan | `/percetakan` (+ layanan cetak inti) | service | 800 | konsolidasi produk cetak (lihat `02-url-migration`) |
| F | Sistem POS | `/sistem-pos` | service | 800 | halaman produk-software khusus |
| G | Halaman Produk | `/products`, `/products/{slug}` | product/blog | 600–1200 | CMS `product`; skeleton → perkuat |
| H | Kota Lokasi (kept) | `/layanan/{kota}` | service | 800 | hanya kota dgn bukti lokal nyata (§H) |
| I | Blog | `/blog`, `/blog/{slug}` | blog-index / post | 1200 (artikel) | index 500+, artikel 1200+ |
| J | About | `/about` | landing | 800 | E-E-A-T hub |
| K | Contact | `/contact` | landing | 600 | konversi + NAP + map |

> URL final per halaman diputuskan di WS-B (`02-url-migration.csv`). Brief ini fokus isi/struktur.

---

## A. HOMEPAGE — `/`

**(a) Positioning / angle unik**
Kotacom = **"satu sistem delivery untuk bisnis yang butuh bergerak cepat"**: website, software custom, IT support, dan percetakan di bawah satu alur kerja — bukan empat vendor terpisah yang harus dikoordinasi sendiri. Angle pembeda: *"Pahami hambatan → rakit lane yang relevan → kirim dengan follow-through."*

**(b) Target audiens + intent**
Pemilik/decision-maker UMKM hingga menengah di Surabaya–Sidoarjo–Jatim yang punya ≥ 1 kebutuhan digital/cetak dan ingin satu partner. Intent: **evaluasi partner** (informational→commercial). Pengunjung baru, belum tahu Kotacom.

**(c) Offer / paket konkret**
- Konsultasi & scoping **gratis** via WhatsApp.
- 4 lane: Website (mulai Rp 3 jt), Software custom (mulai Rp 15 jt), IT Support (paket bulanan/retainer), Percetakan (tanpa minimum order).
- Positioning "one-stop": paket gabungan (mis. website + company profile cetak) → tawarkan diskusi bundling.

**(d) Proof**
- Hero stat: > 500 klien, > 1.200 proyek *(verifikasi §9)*, 4 lane dalam 1 alur.
- Case teaser: Restaurant Management System (ringkas → link `/projects/restaurant-management-system`).
- Logo cloud klien *(wajib ganti logo asli, bukan placeholder)*.
- Testimoni 2–3 dengan nama + usaha + hasil.

**(e) CTA**
- Primary: **Konsultasi Gratis via WhatsApp** → `wa.me/6285799520350?text=Halo Kotacom, saya ingin konsultasi kebutuhan bisnis saya.`
- Secondary: **Lihat Layanan** → `/services`.

**(f) Outline H2/H3**
- H1: *Website, Software, IT Support & Percetakan dalam Satu Alur Kerja*
- H2: Kenapa Bisnis Memilih Kotacom
  - H3: Satu Partner, Empat Lane Layanan
  - H3: Proses yang Transparan dari Scope sampai Launch
- H2: Layanan Kami (grid 4 lane → link)
- H2: Cara Kami Bekerja (timeline: map → assemble → ship)
- H2: Hasil & Bukti (stats + case + testimoni)
- H2: Teknologi & Pendekatan
- H2: Pertanyaan yang Sering Diajukan
- H2: Siap Mulai? (CTA akhir)

**(g) FAQ (≥5)**
1. Layanan apa saja yang Kotacom kerjakan?
2. Apakah bisa ambil salah satu layanan saja, bukan paket lengkap?
3. Berapa lama proses pengerjaan?
4. Bagaimana alur konsultasi dan penawaran?
5. Apakah melayani klien di luar Surabaya/Sidoarjo?
6. Bagaimana cara memulai?

**(h) Keyword**
- Utama: `jasa IT dan percetakan Surabaya`
- Pendukung: `jasa pembuatan website Sidoarjo`, `software custom Surabaya`, `IT support Surabaya`, `percetakan Surabaya Sidoarjo`, `vendor IT terpercaya Jawa Timur`, `jasa percetakan dan website satu tempat`.

**(i) Syarat thick content**
≥ 1000 kata. ≥ 6 internal link (ke /services, /pembuatan-website, /software, /percetakan, /projects, /contact). Schema: Organization + LocalBusiness + FAQPage. Semua CTA pakai nomor kanonik. ≥ 1 bukti nyata (case/testimoni/logo asli).

---

## B. HUB LAYANAN — `/services`

**(a) Positioning / angle unik**
**"Katalog solusi yang dipetakan ke masalah bisnis"** — bukan daftar jasa. Tiap kategori dijelaskan dari *masalah operasional* yang diselesaikan, jadi pengunjung memilih berdasarkan kebutuhan, bukan berdasarkan nama layanan.

**(b) Target audiens + intent**
Pemilik bisnis yang belum yakin butuh apa (website? software? cetak?). Intent: **navigational/informational → commercial** (peta menuju lane yang tepat).

**(c) Offer / paket konkret**
Kategori → paket ringkas per lane:
- Website: Company Profile (mulai Rp 3 jt), Toko Online/E-commerce (mulai Rp 15 jt), Custom.
- Software: MVP (mulai Rp 15 jt), Sistem POS, implementasi/instalasi.
- IT Support: retainer/paket dukungan.
- Percetakan: cetak buku, brosur, banner, kemasan, kartu nama, dll (spec-based).

**(d) Proof**
- Jumlah klien & proyek.
- "Cara memilih layanan" (decision helper).
- 2 testimoni lintas-lane + link case.
- Sertifikasi/awards *(verifikasi)*.

**(e) CTA**
- Primary: **Diskusikan Kebutuhan via WhatsApp**.
- Secondary: **Lihat Semua Layanan / Ajukan Penawaran** → `/contact`.

**(f) Outline H2/H3**
- H1: Layanan Kotacom — Pilih Solusi Sesuai Masalah Bisnis Anda
- H2: Mulai dari Masalah, Bukan dari Fitur
- H2: Website & Digital (H3 per jenis)
- H2: Software & Sistem Custom
- H2: IT Support & Infrastruktur
- H2: Percetakan & Materi Brand
- H2: Paket & Estimasi Investasi
- H2: Pertanyaan Umum Seputar Layanan
- H2: CTA

**(g) FAQ (≥5)**
1. Bagaimana cara menentukan layanan yang saya butuhkan?
2. Apakah bisa gabung beberapa layanan dalam satu proyek?
3. Apakah ada estimasi harga tiap layanan?
4. Apakah layanan IT support bersifat bulanan?
5. Bagaimana proses mulai dari konsultasi sampai eksekusi?
6. Apakah Kotacom mengerjakan proyek di luar Jawa Timur?

**(h) Keyword**
- Utama: `layanan IT perusahaan Surabaya`
- Pendukung: `jasa website software percetakan`, `solusi digital bisnis UMKM`, `vendor IT all-in-one Surabaya`, `katalog layanan percetakan dan website`.

**(i) Syarat thick content**
≥ 800 kata. ≥ 3 internal link kontekstual ke lane. Schema: Service (ItemList) + FAQPage + LocalBusiness. Tiap kategori punya anchor menuju halaman lane.

---

## C. PEMBUATAN WEBSITE — `/pembuatan-website`

**(a) Positioning / angle unik**
**"Website yang dirancang untuk menghasilkan lead & penjualan, bukan sekadar cantik."** Diferensiasi: struktur halaman disusun untuk alur konversi + cepat di HP + siap dikembangkan. Angle: *dari kunjungan → inquiry*.

**(b) Target audiens + intent**
Pemilik UMKM/company profile/toko online di Surabaya–Sidoarjo yang butuh website kredibel. Intent: **commercial** (cari jasa + harga + timeline).

**(c) Offer / paket konkret** *(dari `PRICING_PACKAGES.website` — verifikasi)*
- **Website Basic — mulai Rp 3.000.000**: 5–7 halaman, responsive, SEO basic, form kontak, domain `.id` + hosting 1 tahun, SSL, 3x revisi, training CMS, support 30 hari. Termin: DP 50% / pelunasan sebelum launch.
- **Website E-commerce — mulai Rp 15.000.000**: produk unlimited, payment gateway (Midtrans/Xendit), manajemen stok, order tracking, tools marketing, integrasi ekspedisi, maintenance 6 bulan.
- **Custom**: sesuai kebutuhan.
- **Vertikal** (halaman terpisah, bukan per-kota): Company Profile, Toko Online, Dokter/Klinik, Sekolah, Expedisi, Konstruksi, Komunitas/NGO, Migrasi WordPress, Harga.

**(d) Proof**
- Portofolio website nyata (link live) + skor performa.
- Testimoni pemilik usaha dengan hasil ("inquiry naik", "penjualan online naik").
- Timeline & proses transparan.
- Garansi support bug 30–90 hari.

**(e) CTA**
- Primary: **Konsultasi Website Gratis via WhatsApp** → pesan konteks website.
- Secondary: **Lihat Harga / Lihat Portofolio** → `/pembuatan-website/harga` & `/projects`.

**(f) Outline H2/H3**
- H1: Jasa Pembuatan Website untuk Bisnis yang Butuh Lead, Bukan Sekadar Tampilan
- H2: Masalah Website Lama yang Sering Mengganggu Penjualan
- H2: Apa yang Anda Dapat
  - H3: Struktur Berorientasi Konversi
  - H3: Performa Cepat di HP
  - H3: Siap SEO & Iklan
  - H3: Mudah Dikembangkan
- H2: Paket & Harga (pricing table: Basic / E-commerce / Custom)
- H2: Proses Kerja (4 langkah)
- H2: Portofolio & Hasil Klien
- H2: Pertanyaan Seputar Pembuatan Website
- H2: CTA

**(g) FAQ (≥5)**
1. Berapa lama proses pembuatan website?
2. Apakah harga sudah termasuk domain dan hosting?
3. Bisakah saya update konten sendiri?
4. Bagaimana sistem pembayarannya?
5. Ada garansi jika ada bug/error?
6. Apakah website siap untuk SEO dan iklan?

**(h) Keyword**
- Utama: `jasa pembuatan website Surabaya`
- Pendukung: `jasa pembuatan website Sidoarjo`, `pembuatan website company profile`, `jasa website toko online`, `website siap SEO`, `harga jasa pembuatan website`, `jasa website profesional Jawa Timur`.

**(i) Syarat thick content**
≥ 800 kata. ≥ 3 internal link (ke `/services`, `/products`, artikel blog terkait, `/contact`). Schema: Service + Offer (harga) + FAQPage. Hindari halaman per-kota duplikat — bila kota dipertahankan, wajib bukti lokal (§H).

---

## D. SOFTWARE — `/software`

**(a) Positioning / angle unik**
**"Software custom untuk proses yang terlalu spesifik untuk template generik."** Pendekatan produk: petakan kebutuhan → prioritaskan modul inti → implementasi bertahap. Beda dari software house generik: fokus pada *alur kerja nyata tim klien*, bukan memaksa template.

**(b) Target audiens + intent**
Pemilik/decision-maker bisnis yang prosesnya sudah tidak tertampung Excel/tools umum: operasional, stok, laporan, multi-cabang. Intent: **commercial/evaluation** (butuh partner kredibel + estimasi).

**(c) Offer / paket konkret** *(verifikasi)*
- **Software MVP — mulai Rp 15.000.000**: core features, UI/UX dasar, web app, 1 role admin, DB setup, testing, source code ownership, deploy, dokumentasi, training 1 hari, support 30 hari. Termin: DP 40% / progress 30% / pelunasan sebelum deploy.
- **Enterprise/Custom**: multi-role, integrasi, high availability, SLA (custom).
- **Sub-halaman**: Implementasi Software, Instalasi Software, Pembuatan Software, Sistem POS (lihat §F).
- **Maintenance berkelanjutan**: mulai Rp 2 jt/bulan *(verifikasi)*.

**(d) Proof**
- Case: Restaurant Management System (operasional + stok + laporan satu sistem).
- Source code ownership (poin kepercayaan).
- Testimoni dengan hasil terukur (mis. "waktu admin berkurang 60%" — verifikasi angka).
- Dokumentasi & handover yang jelas.

**(e) CTA**
- Primary: **Audit Kebutuhan Software via WhatsApp**.
- Secondary: **Lihat Portofolio / Studi Kasus** → `/projects`.

**(f) Outline H2/H3**
- H1: Software Custom & Sistem Operasional untuk Bisnis yang Prosesnya Sudah Spesifik
- H2: Kapan Bisnis Butuh Software Custom (bukan tools siap pakai)
- H2: Apa yang Anda Dapat
  - H3: Analisis & Pemetaan Proses
  - H3: Pengembangan Bertahap (modul inti dulu)
  - H3: Integrasi dengan Sistem yang Sudah Dipakai
  - H3: Data & Laporan untuk Keputusan Cepat
- H2: Paket & Estimasi
- H2: Proses Kerja (discovery → iterasi → handover)
- H2: Studi Kasus & Hasil
- H2: FAQ Implementasi Software
- H2: CTA

**(g) FAQ (≥5)**
1. Bagaimana menentukan apakah saya butuh software custom?
2. Bisa integrasi dengan tools yang sudah dipakai?
3. Bagaimana pendekatan agar proyek tidak molor?
4. Apakah source code jadi milik saya?
5. Berapa lama support setelah deployment?
6. Bagaimana keamanan data saya?

**(h) Keyword**
- Utama: `jasa software development Surabaya`
- Pendukung: `software custom bisnis`, `pengembangan aplikasi custom`, `software house Surabaya`, `sistem operasional terintegrasi`, `jasa implementasi software`, `software enterprise UMKM`.

**(i) Syarat thick content**
≥ 800 kata. ≥ 3 internal link (ke `/sistem-pos`, `/services`, blog terkait, `/projects`). Schema: Service + Offer + FAQPage. Hindari klaim teknis tanpa penjelasan manfaat.

---

## E. PERCETAKAN — `/percetakan`

**(a) Positioning / angle unik**
**"Percetakan sebagai output bisnis, bukan daftar produk."** Diferensiasi: pendekatan *spec-first* — konsultasi kertas/jilid/finishing, cek file sebelum produksi, garansi cetak ulang untuk cacat produksi, bisa POD & offset.

**(b) Target audiens + intent**
Penulis/penerbit, sekolah/kampus, UMKM & perusahaan yang butuh materi cetak (buku, brosur, banner, kemasan, kartu nama). Intent: **commercial** (harga, kualitas, timeline, pengiriman).

**(c) Offer / paket konkret** *(verifikasi detail di `detail-presets`)*
- **Cetak Satuan — mulai Rp 50.000/unit**: tanpa minimum order, 2–3 hari kerja, konsultasi desain gratis, QC sebelum kirim.
- **Korporat/Volume**: harga grosir, SLA khusus.
- **Layanan cetak inti (halaman terpisah)**: Buku, Brosur/Flyer, Banner/Spanduk, Kemasan Produk, Kartu Nama, Stiker, Undangan, Album Pernikahan, Kalender, Company Profile, Yasin, Al-Quran, Buku Kenangan Sekolah.
- **Pengiriman** seluruh Indonesia (JNE/J&T/SiCepat/POS).

**(d) Proof**
- Contoh hasil cetak (foto asli, bukan stok).
- Garansi cetak ulang cacat produksi.
- Testimoni percetakan (nama + jenis usaha).
- Spesifikasi transparan (kertas, jilid, finishing).

**(e) CTA**
- Primary: **Minta Penawaran Cetak via WhatsApp** → pesan konteks cetak (sebut jenis produk).
- Secondary: **Lihat Semua Produk Cetak / Kirim File** → kategori terkait / `/contact`.

**(f) Outline H2/H3**
- H1: Jasa Percetakan Surabaya & Sidoarjo untuk Kebutuhan Bisnis & Personal
- H2: Kenapa Kualitas Cetak Harus Rapi & Terkontrol
- H2: Layanan Cetak Kami (grid jenis cetak → link)
- H2: Cara Kerja: Dari File ke Hasil
  - H3: Konsultasi Spesifikasi (kertas/jilid/finishing)
  - H3: Cek File Sebelum Produksi
  - H3: Produksi & Quality Check
  - H3: Pengiriman Aman
- H2: Estimasi Biaya Cetak (faktor yang menentukan harga)
- H2: Hasil & Testimoni
- H2: FAQ Percetakan
- H2: CTA

**(g) FAQ (≥5)**
1. Berapa lama waktu proses cetaknya?
2. Apakah saya perlu punya desain dulu?
3. Produk cetak apa yang paling sering dipesan bisnis?
4. Bagaimana memastikan hasil sesuai ekspektasi (proof)?
5. Apakah ada minimum order?
6. Bisa kirim ke luar kota/pulau?

**(h) Keyword**
- Utama: `jasa percetakan Surabaya`
- Pendukung: `cetak buku Surabaya`, `percetakan Sidoarjo`, `cetak banner spanduk`, `cetak brosur murah`, `percetakan UMKM`, `cetak kemasan produk`, `jasa cetak online Indonesia`.

**(i) Syarat thick content**
≥ 800 kata. ≥ 3 internal link (ke jenis cetak inti, `/services`, `/contact`). Schema: Service + Offer + FAQPage. Setiap halaman jenis cetak punya spesifikasi nyata (kertas, ukuran, opsi jilid) — bukan generik.

---

## F. SISTEM POS — `/sistem-pos`

**(a) Positioning / angle unik**
**"POS untuk pemilik outlet yang butuh transaksi cepat, stok akurat, dan laporan real-time — termasuk multi-cabang."** Bukan POS generik: difokuskan pada ritme operasional outlet (retail & F&B) dan implementasi bertahap.

**(b) Target audiens + intent**
Pemilik outlet retail/F&B (1 outlet sampai multi-cabang) di Surabaya/Jatim. Intent: **commercial** (fitur, harga, implementasi).

**(c) Offer / paket konkret**
- Implementasi POS (setup produk, user, rule operasional, training, go-live bertahap).
- Mode/opsi sesuai skala: single outlet → multi-cabang.
- Integrasi stok & penjualan lintas outlet, laporan owner/supervisor.
- Opsi offline/online resilience (koneksi putus tetap jalan).

**(d) Proof**
- Skenario implementasi (audit alur kasir → pilot go-live → stabilisasi).
- Testimoni pemilik outlet (hasil: transaksi lebih cepat, stok lebih akurat).
- Dukungan pasca go-live.

**(e) CTA**
- Primary: **Demo / Konsultasi Sistem POS via WhatsApp**.
- Secondary: **Lihat Software Lain / Studi Kasus** → `/software`, `/projects`.

**(f) Outline H2/H3**
- H1: Sistem POS untuk Outlet Retail & F&B — Cepat, Akurat, Real-time
- H2: Masalah Umum Kasir & Stok di Outlet
- H2: Fitur Inti
  - H3: Transaksi Cepat
  - H3: Stok Lintas Outlet
  - H3: Laporan Real-time
  - H3: Multi-cabang & Multi-user
- H2: Proses Implementasi (audit → konfigurasi → pilot → training)
- H2: Untuk Siapa (retail, F&B, distributor)
- H2: FAQ Sistem POS
- H2: CTA

**(g) FAQ (≥5)**
1. Apakah sistem POS bisa dipakai untuk multi-cabang?
2. Bagaimana jika internet di outlet putus?
3. Berapa lama implementasi & training?
4. Apakah bisa integrasi dengan stok/produk yang sudah ada?
5. Apakah ada biaya bulanan?
6. Bisa dikustomisasi sesuai alur outlet saya?

**(h) Keyword**
- Utama: `software sistem POS Surabaya`
- Pendukung: `aplikasi kasir online`, `sistem POS retail`, `software POS restoran`, `POS multi cabang`, `aplikasi kasir stok real-time`.

**(i) Syarat thick content**
≥ 800 kata. ≥ 3 internal link (ke `/software`, `/services`, artikel blog operasional). Schema: Service/SoftwareApplication + Offer + FAQPage.

---

## G. HALAMAN PRODUK — `/products` & `/products/{slug}`

**(a) Positioning / angle unik**
Katalog produk digital/cetak yang **siap transaksi + jelas spesifikasinya**. Index = *showroom*; detail = *halaman keputusan beli* (spesifikasi, harga, cara pesan).

**(b) Target audiens + intent**
Pembeli siap-beli atau pembanding. Intent: **transactional** (harga, spesifikasi, kualitas, cara pesan).

**(c) Offer / paket konkret**
- Produk dengan harga jelas (mis. Wedding Album, T-Shirt/Kaos, Stiker, Kartu Nama, Buku) *(verifikasi harga aktual — jangan pakai angka placeholder)*.
- Grup produk per kategori (Products category).
- Opsi custom/volume.

**(d) Proof**
- Foto produk asli + contoh hasil.
- Ulasan/rating klien (mengisi `aggregateRating` → JSON-LD).
- Contoh penggunaan (use case).
- Garansi kualitas.

**(e) CTA**
- Primary: **Pesan / Tanya Harga via WhatsApp** (sebut nama produk).
- Secondary: **Lihat Produk Lain / Lihat Kategori**.

**(f) Outline H2/H3**
- H1: (nama produk) — Spesifikasi, Harga & Cara Pesan
- H2: Spesifikasi Produk (tabel)
- H2: Pilihan Material & Finishing
- H2: Harga & Estimasi Volume
- H2: Cocok untuk Siapa / Kapan Dipakai
- H2: Ulasan Klien
- H2: Cara Pesan
- H2: FAQ Produk
- H2: CTA
- **Index** `/products`: H1 + H2 per kategori + grid produk + CTA.

**(g) FAQ (≥5)**
1. Berapa harga dan minimum order produk ini?
2. Berapa lama pengerjaan?
3. Apakah bisa custom desain/ukuran?
4. Bagaimana pengiriman & ongkir?
5. Apakah ada garansi produk?
6. Bagaimana cara pemesanan?

**(h) Keyword**
- Utama: (per-produk, mis. `cetak album pernikahan custom`, `cetak kaos satuan Surabaya`)
- Pendukung: kategori + kota + kata "murah/berkualitas/profesional" secara wajar.

**(i) Syarat thick content**
Index ≥ 600 kata; detail produk 600–1200 kata. ≥ 3 internal link (kategori, produk terkait, `/contact`). Schema: Product (`offers`, `brand`, `aggregateRating`) + BreadcrumbList + FAQPage. Harga WAJIB nyata (tanpa harga = kandidat `noindex` sampai dilengkapi).

---

## H. HALAMAN KOTA LOKASI (yang dipertahankan)

**(a) Positioning / angle unik**
**"Partner lokal dengan bukti lokal nyata"** — hanya dibuat untuk kota yang benar-benar punya klien/kehadiran/foto/testimoni/area layanan konkret. Bukan swap nama kota. Format: `/layanan/{kota}` (satu halaman gabungan layanan) ATAU `/pembuatan-website/{kota}` untuk kota prioritas website.

**(b) Target audiens + intent**
Bisnis di kota tsb yang mencari vendor lokal. Intent: **commercial + local** (mencari di lokasi sendiri).

**(c) Offer / paket konkret**
Sama seperti halaman layanan induk, TAPI dgn harga/timeline/area yang dikontekstualkan ke kota. Tawarkan kunjungan/on-site untuk area inti (Surabaya/Sidoarjo).

**(d) Proof (WAJIB bukti lokal — syarat mutlak)**
- Nama klien/logo lokal dari kota tsb (≥ 1).
- Testimoni dari klien di kota tsb.
- Foto pekerjaan/kunjungan nyata di kota tsb.
- Area layanan spesifik (kecamatan/patokan).
- NAP & jarak dari kantor (Surabaya/Sidoarjo).

> **Aturan keep/consolidate (§P7):** Kota **dipertahankan** HANYA jika semua bukti lokal di atas tersedia. **Kandidat keep default:** Surabaya, Sidoarjo, Gresik, Malang, Mojokerto, Pasuruan. Kota tanpa bukti → **301** ke `/layanan`/`/pembuatan-website` atau **410**. Keputusan final per-URL ada di WS-B.
> **HARAM** membuat halaman kota yang isinya template + ganti nama kota (thin content).

**(e) CTA**
- Primary: **Konsultasi {Layanan} di {Kota} via WhatsApp**.
- Secondary: **Lihat Layanan Lengkap / Kunjungi Kantor {Surabaya|Sidoarjo}**.

**(f) Outline H2/H3**
- H1: Jasa {Layanan} di {Kota} — Didukung Tim Kotacom Surabaya–Sidoarjo
- H2: Kenapa Bisnis {Kota} Memilih Kotacom
- H2: Layanan di {Kota} (link ke lane)
- H2: Bukti Lokal (klien, testimoni, foto dari {Kota})
- H2: Area & Jangkauan Layanan di {Kota}
- H2: Proses Kerja & Estimasi
- H2: FAQ {Layanan} di {Kota}
- H2: CTA

**(g) FAQ (≥5)**
1. Apakah Kotacom melayani klien di {Kota}?
2. Bagaimana koordinasi jika proyek di {Kota}? (on-site/remote?)
3. Berapa biaya dan apakah ada biaya perjalanan?
4. Apakah bisa lihat contoh proyek di {Kota}?
5. Berapa lama pengerjaan untuk klien di {Kota}?
6. Bagaimana cara mulai?

**(h) Keyword**
- Utama: `jasa {layanan} {kota}` (mis. `jasa pembuatan website Surabaya`)
- Pendukung: `{layanan} {kota} terpercaya`, `{layanan} {kota} untuk UMKM`, `{layanan} dekat saya {kota}`, varian kecamatan/area {kota}.

**(i) Syarat thick content**
≥ 800 kata **unik per kota** (bukan boilerplate). WAJIB ≥ 1 bukti lokal nyata (§H-d). ≥ 3 internal link (ke layanan induk, kota/kawasan terkait, `/contact`). Schema: Service + `areaServed` = kota + LocalBusiness + FAQPage. Jika tidak memenuhi → jangan `index`.

---

## I. BLOG — `/blog` (index) & `/blog/{slug}` (artikel)

**(a) Positioning / angle unik**
Blog = **topical authority + lead capture**: menjawab pertanyaan bisnis/digital/cetak dari pemilik UMKM, lalu mengarahkan ke layanan. Bukan artikel SEO tipis.

**(b) Target audiens + intent**
Pemilik/decision-maker yang sedang riset. Intent: **informational**, mengarah ke commercial.

**(c) Offer / paket konkret**
- Lead magnet: checklist/ebook/template (mis. "Checklist Website Siap Launch", "Panduan Biaya Cetak Buku").
- Newsletter signup (`form-newsletter`).
- CTA kontekstual ke layanan terkait di akhir artikel.

**(d) Proof**
- Author nyata dengan bio (`author` ref + E-E-A-T).
- Tanggal publish & update (`datePublished`, `dateModified`).
- Data/sumber/kutipan.
- Contoh/portofolio nyata di dalam artikel.

**(e) CTA**
- Primary: **Konsultasi via WhatsApp** (konteks topik artikel).
- Secondary: sumber daya terkait / artikel lanjutan / newsletter.

**(f) Outline H2/H3**
- **Index** `/blog`: H1 + H2 per kategori + grid artikel terbaru + lead magnet + CTA.
- **Artikel**: H1 (judul bernilai) → intro yang menjawab intent → H2/H3 yang saling mengalir → contoh/visual → kesimpulan → CTA → artikel terkait.

**(g) FAQ (≥5)** (artikel how-to/komersial)
1–6 pertanyaan turunan topik (mis. untuk "Harga Cetak Buku": faktor harga, POD vs offset, minimum order, timeline, kualitas, pengiriman).

**(h) Keyword**
- Utama: 1 keyword utama per artikel (`focusKeyword`).
- Pendukung: 3–5 long-tail + pertanyaan "how/what/why" + modifikasi kota bila relevan.

**(i) Syarat thick content**
Artikel ≥ **1200 kata**. ≥ 3 internal link kontekstual (ke artikel terkait + 1 halaman layanan). Schema: Article/BlogPosting (`author`, tanggal) + BreadcrumbList + FAQPage (bila ada FAQ). Author wajib. Tidak duplikat antar artikel.

---

## J. ABOUT — `/about`

**(a) Positioning / angle unik**
**"Tim lokal Surabaya–Sidoarjo yang menutup 4 lane digital & cetak."** About = hub kepercayaan (E-E-A-T): siapa kami, pengalaman, cara kerja, nilai.

**(b) Target audiens + intent**
Calon klien yang menimbang kepercayaan sebelum kontak. Intent: **trust building**.

**(c) Offer / paket konkret**
- Konsultasi gratis (jalur masuk).
- Ringkasan lane + link ke `/services`.

**(d) Proof**
- Tahun berdiri, jumlah klien/proyek *(verifikasi)*.
- Tim nyata (nama/peran, tanpa foto stok asing).
- Sertifikasi/keanggotaan (jika ada).
- Sejarah & milestone singkat.

**(e) CTA**
- Primary: **Konsultasi via WhatsApp**.
- Secondary: **Lihat Layanan / Kontak Kami**.

**(f) Outline H2/H3**
- H1: Tentang Kotacom
- H2: Siapa Kami
- H2: Cara Kami Bekerja (map → assemble → ship)
- H2: Nilai & Prinsip
- H2: Pengalaman & Capaian (angka, milestone)
- H2: Tim
- H2: FAQ
- H2: CTA

**(g) FAQ (≥5)**
1. Sejak kapan Kotacom beroperasi?
2. Di mana lokasi kantor?
3. Layanan apa yang jadi fokus utama?
4. Bagaimana Kotacom menjaga kualitas?
5. Apakah bisa kunjungan/on-site?
6. Bagaimana cara bekerja sama dengan Kotacom?

**(h) Keyword**
- Utama: `profil perusahaan IT Surabaya`
- Pendukung: `jasa IT terpercaya Sidoarjo`, `vendor website software cetak Jawa Timur`, `tentang Kotacom`.

**(i) Syarat thick content**
≥ 800 kata. ≥ 3 internal link (ke `/services`, `/projects`, `/contact`). Schema: Organization/AboutPage + LocalBusiness + FAQPage. NAP wajib konsisten.

---

## K. CONTACT — `/contact`

**(a) Positioning / angle unik**
**"Jalur tercepat dari kebutuhan ke penawaran."** Halaman konversi: semua opsi kontak jelas, NAP lengkap, peta, dan ekspektasi respons.

**(b) Target audiens + intent**
Siap menghubungi. Intent: **transactional/navigational**.

**(c) Offer / paket konkret**
- Konsultasi & penawaran gratis.
- Pilihan jalur: WhatsApp, telepon, email, form.
- Untuk cetak: panduan kirim file.

**(d) Proof**
- NAP lengkap (2 kantor) + peta + jam operasional.
- Janji waktu respons (mis. "dibalas pada jam kerja").
- Testimoni singkat / trust badges.

**(e) CTA**
- Primary: **Chat WhatsApp Sekarang** (nomor kanonik).
- Secondary: **Kirim Form / Telepon / Email**.

**(f) Outline H2/H3**
- H1: Hubungi Kotacom
- H2: Chat WhatsApp (paling cepat)
- H2: Kirim Form Kebutuhan
- H2: Kantor & Area Layanan (2 lokasi + peta)
- H2: Jam Operasional
- H2: Cara Menyiapkan Info agar Penawaran Lebih Cepat
- H2: FAQ
- H2: CTA

**(g) FAQ (≥5)**
1. Berapa lama respons setelah saya menghubungi?
2. Informasi apa yang perlu saya siapkan?
3. Apakah konsultasi benar-benar gratis?
4. Bagaimana cara mengirim file cetak?
5. Apakah bisa datang ke kantor?
6. Metode pembayaran apa yang tersedia?

**(h) Keyword**
- Utama: `kontak Kotacom Surabaya`
- Pendukung: `hubungi jasa IT Sidoarjo`, `alamat percetakan Surabaya`, `nomor WhatsApp jasa website Surabaya`.

**(i) Syarat thick content**
≥ 600 kata. ≥ 2 internal link (ke `/services`, `/about`). Schema: ContactPage + LocalBusiness (NAP + `areaServed`). NAP kanonik wajib akurat.

---

## 9. Data yang HARUS diverifikasi sebelum `index`

Beberapa angka masih berupa data seed/placeholder. **Wajib dikonfirmasi ke fakta nyata** sebelum gate `index`:

- [ ] Tahun berdiri (seed: 2015), jumlah klien (500), jumlah proyek (1.200).
- [ ] Email resmi (`info@kotacom.id`?), jam operasional, nomor telepon tampil.
- [ ] Harga paket website/software/cetak (masih dari `PRICING_PACKAGES` seed).
- [ ] Testimoni (nama, usaha, hasil) — ganti dari contoh seed; sertakan foto/izin.
- [ ] Logo klien asli (bukan placeholder), sertifikasi & awards (ISO/APJII/Golden Permit Award — verifikasi).
- [ ] Portofolio live (link website/proyek yang bisa diakses).
- [ ] Angka hasil ("revenue naik 150%", "admin turun 60%") — hanya pakai bila terverifikasi.

> Aturan: **lebih baik tanpa angka daripada angka palsu.** Klaim tak terverifikasi → hapus atau tandai, jangan `index`.

---

## 10. CHECKLIST ANTI-THIN-CONTENT — GATE `contentStatus=index`

Writer/editor mencentang semua **gate keras** sebelum set `contentStatus = index`. Gagal 1 gate keras → tetap `draft`/`reviewed` (tidak masuk sitemap).

### Gate keras (semua wajib ✅)
- [ ] **Panjang:** ≥ 800 kata (halaman layanan/lokasi) · ≥ 1200 kata (artikel blog) · ≥ 1000 kata (homepage) · ≥ 600 kata (produk/about) — konten **unik**, bukan boilerplate/template ganti nama.
- [ ] **Uniqueness:** tidak menyalin halaman lain; halaman kota punya paragraf & bukti yang benar-benar berbeda.
- [ ] **H1 tunggal + hierarki H2/H3** benar, tanpa lompat level.
- [ ] **FAQ ≥ 5** pertanyaan relevan + jawaban spesifik (bukan 1 kalimat generik), terisi di block FAQ → FAQPage schema.
- [ ] **Keyword:** 1 `focusKeyword` + `secondaryKeywords` diisi; keyword muncul natural (di H1, intro, 1–2 sub-heading, meta). **Tanpa keyword stuffing.**
- [ ] **Internal link ≥ 3** kontekstual (bukan "klik di sini"), mengarah ke halaman relevan (layanan/produk/blog).
- [ ] **Schema:** minimal Organization/LocalBusiness + tipe konten spesifik (Service/Product/Article) + FAQPage + BreadcrumbList.
- [ ] **Meta:** title ≤ 70 char, description 140–160 char, canonical self-referencing, indexable (`noindex=false`).
- [ ] **CTA:** 1 primary (WhatsApp **6285799520350**, pesan berkonteks) + 1 secondary. CTA hadir di hero & akhir.
- [ ] **Proof:** ≥ 1 bukti nyata (testimoni/portofolio/angka terverifikasi/logo asli). Untuk halaman kota: ≥ 1 bukti **lokal**.
- [ ] **NAP** konsisten dengan §1.1 (nama, WA, alamat, area).
- [ ] **Tanpa placeholder:** tidak ada `{lokasi}`, `lorem`, "isi di sini", gambar stok asing berwatermark, harga kosong.
- [ ] **Manfaat > fitur:** copy menjelaskan hasil untuk pembaca, bukan sekadar daftar fitur.
- [ ] **Data terverifikasi:** semua item §9 yang dipakai sudah dikonfirmasi (atau dihapus).
- [ ] **Prinsip seed guardrail** terpenuhi bila via script: `_key` tiap item array, `link.isExternal` eksplisit, `_id` tanpa titik.
- [ ] **Frontend sync:** bila menambah field/block, query/fetch/render sudah sinkron (AGENTS.md frontend-backend sync).

### Gate lunak (rekomendasi, tingkatkan kualitas)
- [ ] Ada section membedakan kompetitor (comparison / "kenapa bukan template").
- [ ] Ada elemen urgensi/risk-reversal wajar (garansi, respons cepat, slot terbatas) tanpa clickbait.
- [ ] Visual asli (screenshot/foto kerja), bukan stok.
- [ ] Reading level pas untuk pemilik bisnis (paragraf pendek, kalimat aktif).
- [ ] Cek 0 broken link internal.
- [ ] Cek mobile (sticky CTA berfungsi).

### Aturan gating (implementasi)
- `contentStatus` values: `draft` → `reviewed` → `index` (schema sudah ada di `page-location.ts`/`service-location.ts`; **selaraskan** ke `page` doc di `01-content-model`).
- Sitemap & JSON-LD hanya menyertakan `contentStatus == "index"` **dan** `meta.noindex != true`.
- Gate keras dijalankan sebelum memindahkan `reviewed → index`. Editor kedua wajib verifikasi (4-eyes).

---

## Lampiran A — Matriks internal linking antar keluarga

| Dari | Ke (min 3) |
|---|---|
| Homepage | /services, /pembuatan-website, /software, /percetakan, /projects, /contact |
| /services | tiap lane, /contact, /projects |
| /pembuatan-website | /pembuatan-website/{vertikal}, /products, blog terkait, /contact |
| /software | /sistem-pos, /services, /projects, /contact |
| /percetakan | tiap jenis cetak, /products, /contact |
| /sistem-pos | /software, /services, blog operasional, /contact |
| /products | kategori, produk terkait, /percetakan, /contact |
| Kota lokasi | lane induk, kota/kawasan terkait, /contact |
| Blog | artikel terkait, 1 halaman layanan, /services, /contact |
| /about | /services, /projects, /contact |
| /contact | /services, /about |

## Lampiran B — Template pesan WhatsApp (URL-encoded, pakai `wa.me/6285799520350?text=`)

- Homepage: `Halo Kotacom, saya ingin konsultasi kebutuhan bisnis saya.`
- Website: `Halo Kotacom, saya ingin konsultasi pembuatan website untuk bisnis saya.`
- Software: `Halo Kotacom, saya ingin diskusi software custom untuk bisnis saya.`
- Percetakan: `Halo Kotacom, saya ingin minta penawaran cetak <jenis produk>.`
- Sistem POS: `Halo Kotacom, saya ingin demo/konsultasi sistem POS untuk outlet saya.`
- Produk: `Halo Kotacom, saya ingin pesan/tanya harga <nama produk>.`
- Kota: `Halo Kotacom, saya ingin konsultasi layanan untuk bisnis di <kota>.`

## Lampiran C — Peta keluarga halaman → template & block inti

| Keluarga | `settings.template` | Block inti |
|---|---|---|
| Homepage | `landing` | Hero, Grid(lane), Timeline(proses), Stats+Testimonial(proof), FAQ, CTA/WhatsApp-CTA |
| Hub Layanan | `service` | Hero, Grid(kategori), Split(per lane), Pricing/Offers, FAQ, CTA |
| Lane (website/software/percetakan/POS) | `service` | Hero, Split(apa yang didapat), Pricing/Offers, Process, Proof, FAQ, CTA |
| Kota lokasi | `service` | Hero, Bukti lokal, Split(layanan), FAQ, CTA |
| Produk | `product`/`blog` | Hero, Rich Content(spesifikasi), Pricing, Testimonial, FAQ, CTA |
| Blog index | `blog-index` | Hero, All Posts, Lead magnet, CTA |
| Blog artikel | `blog` | Hero, Rich Content, Proof, FAQ, CTA, All Posts(terkait) |
| About | `landing` | Hero, Split(siapa kami), Timeline(milestone), Stats, FAQ, CTA |
| Contact | `landing` | Hero, Forms, Rich Content(NAP+map), FAQ, CTA |

---

*Dokumen ini adalah deliverable WS-C. Perubahan URL/keputusan keep-merge mengikuti `02-url-migration.csv` (WS-B); model konten & katalog block mengikuti `01-content-model.md` (WS-A); rencana teknis render mengikuti `04-frontend-render-plan.md` (WS-D).*
