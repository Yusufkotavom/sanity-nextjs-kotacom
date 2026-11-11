# Konten & SEO Guidelines — Money Pages (Sanity page + blocks)

Dokumen acuan WAJIB untuk semua halaman komersial ("money page") Kotacom.
Tujuan: konten **unik, tebal, berbobot**, patuh SEO white-hat, tanpa thin/duplikat/doorway.

## 0. Definisi "money page"
Halaman yang menyasar niat komersial/lokal dan diharapkan mendatangkan leads:
- `/jasa-cetak-buku-{kota}` — cetak buku per kota
- `/pembuatan-website/{kota}` — jasa website per kota
- `/percetakan/cetak-kalender/{kota}` — kalender per kota
- `/{no-1|rekomendasi|terbaik}-jual-game-pc-{kota}` — game PC per kota
- `/jasa-*` & `/service-*` lokal (Surabaya/Sidoarjo) — layanan IT/percetakan spesifik
- hub: `/percetakan`, `/percetakan/cetak-buku`, `/pembuatan-website`, `/software`, `/services`

Non-money (BUKAN recreate): spam/kasino, `/__trashed`, `/shop/page/N`, `/download/...`,
pagination, `/product/*` & `/posts/*` (rename path konten-sama → tetap 301).

## 1. Struktur WAJIB tiap halaman (urutan block Sanity)
1. `hero-1` — H1 (memuat primary keyword + kota/layanan), `tagLine` singkat, `body` = intro **2 paragraf (120–200 kata)** yang konkret (bukan jargon), `links` = [Minta Penawaran → /contact, Chat WhatsApp → wa.me/6285799520350].
2. `section-header` — pemisah bagian.
3. `rich-content` (markdown) — **inti, 7–9 sub-bagian `##`**, tiap sub 2–3 paragraf. Wajib mencakup (sesuai jenis):
   - konteks lokal/Siapa yang butuh (pelanggan di kota/segmen)
   - varian/tipe layanan (mis. jilid, jenis software, jenis kalender)
   - spesifikasi teknis nyata (ukuran, gramatur, dll)
   - proses/alur kerja
   - kendali mutu / garansi
   - faktor harga (JELASKAN faktor, JANGAN cantumkan nominal)
   - pengiriman/area layanan
   - tips praktis
4. `grid-row` (opsional) — 4–6 kartu layanan/produk ringkas.
5. `faqs` — **5–8** item, referensi ke dokumen `faq` (block `faqs` HANYA render `reference`).
6. `whatsapp-cta` — penutup + CTA WhatsApp/Contact.

Panjang total teks **900–1.500 kata**. Kurang dari 800 kata = GAGAL (thin).

## 2. Aturan SEO
### Title & meta
- `meta.title` **≤ 60 char**, memuat primary keyword + brand `| Kotacom` bila muat. Unik per halaman.
- `meta.description` **140–155 char**, memuat keyword + nilai + ajakan; unik per halaman.
- `meta.focusKeyword` = 1 frasa utama (mis. `jasa cetak buku surabaya`).
- `meta.secondaryKeywords` = 3–6 frasa pendukung relevan.
- `meta.noindex:false` untuk halaman yang sudah layak; `contentStatus:"index"`.

### On-page
- **tepat 1 `<h1>`** (dari hero-1), heading hierarkis (## lalu ### bila perlu), tanpa skip.
- keyword utama muncul natural di: H1, intro, ≥1 H2, ditutup — rasio wajar, **tanpa stuffing**.
- **internal linking**: ≥3 tautan konteks ke hub terkait (mis. /percetakan/cetak-buku, /contact, layanan saudara). Gunakan `links`/tautan di markdown.
- **E-E-A-T**: nada ahli, spesifik industri, sebut pengalaman/proses nyata. Hindari klaim kosong.
- tidak ada `[HARGA]` / `[KONFIRMASI]` / placeholder apa pun di halaman terbit.
- gambar (bila ada) wajib `alt` deskriptif ber-keyword.

### Anti-palsu (HARAM)
- JANGAN mengarang: testimoni, jumlah klien/proyek, rating, penghargaan, sertifikasi, angka penjualan.
- Harga: hanya jelaskan **faktor**; tanpa nominal kecuali dari sumber resmi.

### Unik (anti doorway)
- Tiap halaman ditulis khusus konteksnya. Larangan: menyalin paragraf antar-halaman atau boilerplate seragam. Wajib ada detail pembeda (kota, segmen, kasus, tips lokal).

### Structured data
- Emit JSON-LD via frontend: `Service` + `FAQPage` (dari `faqs`) + `LocalBusiness` bila relevan. Canonical self-referencing (otomatis). Pastikan FAQ yang tampil = yang di JSON-LD.

## 3. Pipeline penulisan
1. Susun data halaman: `path`, `kind`, `city`/`service`, hub terkait, seed.
2. Prompt LLM memakai template guidelines ini; output **JSON valid**:
   `{h1, metaTitle, metaDescription, focusKeyword, secondaryKeywords[], markdown, faq[{q,a}]}`.
3. Validasi keras: title≤60, desc 141–155, markdown ≥800 kata & punya ≥6 `##`, faq ≥5, tidak ada `[` / placeholder, tidak ada nominal Rp/%.
4. Konversi ke blocks; buat dokumen `faq` per halaman lalu `faqs` → references.
5. Upsert (transaksi) → rebuild → verifikasi: 200, 1×H1, title/meta, canonical, JSON-LD, 0 placeholder.
6. Sambungkan hub (internal link dua arah) & pastikan tidak menimpa halaman hidup.

## 4. Interim
Selama halaman belum memenuhi standar ini: set `contentStatus:"draft"` (noindex, keluar sitemap)
— JANGAN dibiarkan ter-index sebagai konten tipis. URL tetap 200 (bukan redirect).
