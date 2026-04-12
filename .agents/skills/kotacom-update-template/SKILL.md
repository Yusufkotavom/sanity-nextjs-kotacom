---
name: kotacom-update-template
description: Panduan arsitektur sistem halaman template-dinamis (Lokasi & Layanan), konfigurasi Content Spinner, cara update (copywriting) template, dan alur mass-generation dokumen.
---

# Panduan Arsitektur Halaman Template Kotacom

Ini adalah kapabilitas *(Skill)* untuk memandu operasional pengelolaan konversi halaman (CRO), mass-generation, dan pemeliharaan *template-based pages* dalam repositori Kotacom (pembuatan website, percetakan, dan software).

## 1. Struktur Tiap Template (3 Lapisan Data)
Website ini menghindari duplikasi ratusan ribu baris teks untuk ribuan lokasi dengan arsitektur 3 lapis:

1. **Lapisan 1: Base/Fallback Hardcoded (Legacy Archive)**
   - Lokasi: `frontend/lib/legacy-pages/archive/`
   - Digunakan sebagai struktur murni bawaan sisa migrasi lama jika *Sanity CMS* gagal mengembalikan data.
2. **Lapisan 2: Master Content Template (The Engine)**
   - Lokasi: Sanity Document Type -> `pageTemplate` (Website, Printing, Software, Generic).
   - Menyimpan seluruh DNA Copywriting, Pricing, Testimoni, Hero section, hingga Rule-based Variants (Spinner).
   - Sanity ini *menimpa/mewarisi* Lapisan 1 agar teksnya dinamis dan terdesain CRO.
3. **Lapisan 3: The Route Shell (Page / Service Location)**
   - Lokasi: Sanity Document Type -> `pageLocation` & `serviceLocation`.
   - Dokumen "Kosong" yang hanya bertugas mendefinisikan *Route URL*, referensi *Kota (City)*, *Service*, serta memilih rujukan ke `pageTemplate` mana yang akan menjadi penggeraknya.

## 2. Sumber Render Engine (The Frontend Merge)
Ketika *user* membuka rute dinamis seperti `/pembuatan-website/[slug]` atau jalur migrasi `/[...segments]`, Next.js menggunakan 2 file vital:
- **`frontend/components/ui/rewrite/page-shell.tsx`:** Template arsitektur blok UI yang menentukan struktur baca pengguna. Disinilah hardcode copywriting *intensional* halaman di set.
- **`frontend/lib/templates/resolve-template.ts`:** Prosesor *"The Merger"*. Ia yang mengolah `pageLocation`, mengambil teks dari Lapisan 2 (CMS), mereplace *raw token* seperti `{lokasi}` atau `{layanan}`, memfilter konten berdasarkan *"lane"*, lalu memasukkannya ke dalam `page-shell`.

## 3. Scrip Penting Pendukung Ekosistem
Semua pemeliharaan CMS dilakukan secara rapi via skrip Node (bukan *mass manual editing*):

*   **`upgrade-template-conversion-content.mjs`**
    (Berada di `frontend/scripts/`).
    Membantu developer memperbarui langsung isi *Copywriting*, Headline, dan Content Spinner Variasi Teks untuk 4 Template Utama Kotacom tanpa meretas dari Dashboard CMS. Skrip ini menjamin teks SEO / Konversi berstandar baku. Diaktifkan via `node [file] --write`.
*   **`bulk-index-pages.mjs`**
    Menggunakan *Sanity Transaction* unuk memaksa ribuan laman baru yang masih berstatus `Draft` atau `noindex` berubah statusnya menjadi Publish/Index agar Google bisa merayapi seluruh landing page yang ada di platform.
*   **`link-templates.mjs`**
    Memindai rute yang terputus (tanpa master template di CMS) dan menyambungkannya secara otomatos berdasarkan `lane` rutenya.
*   **`patch-null-refs.mjs`**
    Sanity melarang nilai `null` pada tipe reference. Skrip ini melingkupi pembersihan tipe-tipe gagal tersebut di database secara instan dengan transaksi.

## 4. Proses Bulk Generation Page & Update
Jika Anda ingin me-generate kembali layanan ke 100 kota baru atau menajamkan CTR via narasi:

A. **Bulk Location Generation:** 
Biasanya Anda akan menggunakan *mass-importer script* (terletak di skill *sanity-mass-scraper-importer*) untuk membuat ratusan dokumen khusus Sanity type `pageLocation`. Gunakan guardrails dan hindari field-field manual yang tebal.

B. **Linking & Fixes:**
Setelah men-generate 100 dokumen lokasi, Anda memanggil `bulk-index-pages.mjs` (untuk mencabut noindex) dan `link-templates.mjs` (untuk menghubungkankan ke relasi CMS otak templatenya).

C. **Update Template Conversion (A/B Testing Konversi):**
Jika Anda menyadari halaman *percetakan* kurang convert:
1. Anda merubah kodingan di dalam object patching `page-template-percetakan` di dalam `upgrade-template-conversion-content.mjs`.
2. Atau menambahkan relasi spinner: "Kondisi butuh Layanan+Lokasi dengan text baru".
3. Anda run skrip itu `--write`.
4. Anda tidak perlu menyentuh ratusan dokumen `serviceLocation` karena Next.js akan mendistribusikannya secara otomatis di frontend.

## 5. Ringkasan
- Pahami bahwa variasi teks di CMS menggunakan kurung kurawal (`{lokasi}` / `{layanan}`) sebagai token.
- Selalu pastikan Sanity guardrails ditaati (jangan pernah menulis reference Sanity dengan _value_ murni `"null"`, gunakan _Undefined/Unset_ di Groq).
- Manfaatkan *Sanity Transaction Client* di dalam NodeJS jika mem-patch melebihi selusin halaman supaya tidak terjadi delay.
