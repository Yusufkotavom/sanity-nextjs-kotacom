# Pembuatan Website Page Expansion Guide

## Overview

Dokumen ini menjelaskan cara expand halaman `/pembuatan-website` di Sanity agar kontennya mirip dengan Kotacom Original (www.kotacom.id/pembuatan-website).

## New Block Types Created

### 1. Stats Hero Block (`stats-hero-block`)
Hero section dengan statistik dan eyebrow text.

**Fields:**
- `eyebrow`: Text kecil di atas title (contoh: "200+ Website Sukses Dibuat")
- `title`: Main headline
- `description`: Supporting text
- `image`: Hero image
- `links`: CTA buttons (max 2)

**Use Case:** Hero section dengan social proof statistics

---

### 2. Benefits Block (`benefits-block`)
Menampilkan 6 benefit cards dengan icon, badge, dan statistik.

**Fields:**
- `title`: Main title (contoh: "Keuntungan Website")
- `subtitle`: Subtitle
- `description`: Supporting text
- `benefits`: Array of benefit items
  - `icon`: Emoji icon
  - `title`: Benefit title
  - `description`: Benefit description
  - `badge`: Badge text (contoh: "📈 200% Peningkatan")
  - `badgeIcon`: Badge emoji

**Use Case:** Showcase 6 key benefits dengan statistik konkret

**Sample Content:**
```
Benefit 1: Tingkatkan Omset Hingga 200%
Badge: 📈 200% Peningkatan rata-rata omset klien kami

Benefit 2: Tingkatkan Kredibilitas Bisnis
Badge: ⭐ 85% Pelanggan lebih mempercayai bisnis dengan website

Benefit 3: Jangkau Pelanggan Global
Badge: 🌍 Global

Benefit 4: Biaya Pemasaran Lebih Efisien
Badge: 💰 70% Penghematan biaya pemasaran

Benefit 5: Analitik & Insight Bisnis
Badge: 📊 Real-time

Benefit 6: Operasional 24/7
Badge: ⏰ 24/7
```

---

### 3. Features Package Block (`features-package-block`)
Menampilkan paket lengkap yang didapat customer.

**Fields:**
- `title`: Main title (contoh: "Paket Lengkap")
- `subtitle`: Subtitle
- `description`: Supporting text
- `features`: Array of feature items
  - `icon`: Emoji icon
  - `title`: Feature title
  - `description`: Feature description
  - `badge`: Badge text

**Use Case:** Showcase what's included in the package

**Sample Content:**
```
1. Website Responsive Premium
2. SEO Optimization Lengkap
3. Support & Maintenance 24/7
4. Domain & Hosting Premium
5. Training & Dokumentasi
6. Bonus & Kejutan
```

---

### 4. Service Types Block (`service-types-block`)
Menampilkan 3 tipe layanan dengan pricing dan features.

**Fields:**
- `title`: Main title
- `description`: Supporting text
- `services`: Array of service types
  - `title`: Service name
  - `description`: Service description
  - `features`: Array of feature strings
  - `price`: Starting price (contoh: "Mulai Rp 500.000")
  - `timeline`: Timeline (contoh: "Timeline: 1-2 minggu")
  - `badge`: Optional badge (contoh: "POPULER")
  - `link`: CTA link

**Use Case:** Showcase 3 main service offerings dengan pricing

**Sample Content:**
```
1. Website Company Profile
   - Mulai Rp 500.000
   - Timeline: 1-2 minggu
   - Features: Responsive Design, SEO Optimized, Contact Form

2. Website Toko Online (POPULER)
   - Mulai Rp 990.000
   - Timeline: 2-3 minggu
   - Features: Shopping Cart, Payment Gateway, Admin Dashboard

3. Aplikasi Web Custom
   - Mulai Rp 1.999.000
   - Timeline: 3-4 minggu
   - Features: Custom Features, Database Integration, API Integration
```

---

### 5. Problem Solution Block (`problem-solution-block`)
Menampilkan pain points dan solusi.

**Fields:**
- `title`: Main title (contoh: "Apakah Bisnis Anda Mengalami Masalah Ini?")
- `problems`: Array of problem strings
- `solutionTitle`: Solution title (contoh: "💡 Solusi:")
- `solution`: Solution text

**Use Case:** Highlight pain points dan present solution

**Sample Content:**
```
Problems:
- Kehilangan pelanggan karena tidak ada website profesional
- Kompetitor unggul dengan website yang lebih menarik
- Sulit ditemukan di Google oleh calon pelanggan
- Penjualan online terbatas karena tidak ada platform yang tepat

Solution:
Website profesional yang responsif dan SEO-friendly dapat meningkatkan omset bisnis Anda hingga 200% dalam 6 bulan!
```

---

### 6. Value Props Block (`value-props-block`)
Menampilkan 4 value propositions.

**Fields:**
- `title`: Main title
- `description`: Supporting text
- `valueProps`: Array of value prop items
  - `icon`: Emoji icon
  - `title`: Value prop title
  - `description`: Value prop description

**Use Case:** Showcase 4 key value propositions

**Sample Content:**
```
1. Harga Terjangkau
2. Garansi Kepuasan 100%
3. Tim Ahli & Profesional
4. Proses Kerja Transparan
```

---

## Recommended Page Structure

Untuk membuat halaman `/pembuatan-website` mirip dengan Kotacom Original, gunakan struktur blocks berikut:

### Top Blocks (sebelum code-owned shell):
1. **Stats Hero Block** - Hero dengan "200+ Website Sukses Dibuat"
2. **Section Header** - "Pilih Jenis Website Anda"
3. **Benefits Block** - 6 benefit cards dengan statistik

### Bottom Blocks (setelah code-owned shell):
4. **Features Package Block** - Paket lengkap yang didapat
5. **Logo Cloud** - Tech stack showcase
6. **Problem Solution Block** - Pain points & solution
7. **Service Types Block** - 3 tipe layanan dengan pricing
8. **Grid Row** - Portfolio showcase (optional)
9. **Pricing Block** - Paket harga terjangkau
10. **Testimonials Block** - Testimoni klien
11. **Value Props Block** - 4 value propositions
12. **FAQ Block** - Pertanyaan yang sering ditanyakan
13. **CTA Block** - Final CTA

---

## Implementation Steps

### 1. Create Page in Sanity Studio

1. Go to Sanity Studio
2. Create new `page` document
3. Set slug: `pembuatan-website`
4. Set `topBlockCount`: 3 (untuk render 3 blocks pertama di atas shell)

### 2. Add Blocks

Add blocks dalam urutan yang direkomendasikan di atas.

### 3. Configure Each Block

Gunakan sample content yang disediakan di atas untuk setiap block.

### 4. Test

1. Build Sanity types: `cd studio && npm run typegen`
2. Build frontend: `cd frontend && npm run build`
3. Test locally: `npm run dev`
4. Check `/pembuatan-website` page

---

## Content Guidelines

### Tone & Style
- **Kotacom Original**: Agresif, sales-driven, banyak emoji, fokus pada hasil konkret
- **Sanity Version**: Profesional, consultative, minimal emoji, fokus pada proses

Untuk membuat mirip Kotacom Original:
- Gunakan emoji di icon fields
- Tambahkan statistik konkret di badge (200%, 85%, 70%)
- Gunakan bahasa persuasif dan urgent
- Highlight hasil bisnis (omset, kredibilitas, efisiensi)

### Pricing Strategy
- **Budget Tier**: Rp 500k - 1.9jt (Kotacom Original style)
- **Premium Tier**: 3jt - 15jt (Sanity style)

Pilih tier yang sesuai dengan target market.

---

## SEO Considerations

### Meta Fields
- `meta_title`: "Jasa Pembuatan Website Surabaya Terpercaya - kotacom.id"
- `meta_description`: "Tingkatkan omset bisnis Anda hingga 200% dengan website profesional yang responsif dan SEO-friendly. 200+ website sukses dibuat."
- `focusKeyword`: "pembuatan website"
- `secondaryKeywords`: ["jasa website", "website profesional", "website surabaya"]

### Schema Markup
Blocks yang sudah include schema markup:
- `testimonials-block`: Review schema
- `pricing-block`: Offer schema
- `faq-block`: FAQ schema
- `company-info`: Organization schema

---

## Maintenance

### Update Content
Content dapat diupdate langsung di Sanity Studio tanpa perlu deploy ulang (thanks to ISR).

### Add New Blocks
Jika perlu menambah block baru:
1. Create schema di `studio/schemas/blocks/seo/`
2. Create component di `frontend/components/blocks/seo/`
3. Register di `studio/schema-types.ts`
4. Add to `studio/schemas/blocks/shared/page-blocks.ts`
5. Add to `frontend/components/blocks/index.tsx`
6. Run typegen: `cd studio && npm run typegen`

---

## Troubleshooting

### Block tidak muncul
- Check apakah block sudah registered di `schema-types.ts`
- Check apakah component sudah di-import di `blocks/index.tsx`
- Run typegen: `cd studio && npm run typegen`

### Styling tidak sesuai
- Check `colorVariant` dan `padding` settings di block
- Customize di component file jika perlu

### Content tidak update
- Check ISR revalidation settings
- Force revalidate via API: `/api/revalidate?path=/pembuatan-website`

---

## Next Steps

1. Create sample page di Sanity Studio
2. Populate dengan content dari Kotacom Original
3. Test dan adjust styling
4. Deploy to production
5. Monitor performance dan conversion

---

## References

- Content comparison: `/content-comparison-kotacom-vs-sanity.md`
- Kotacom Original: https://www.kotacom.id/pembuatan-website
- Sanity Version: https://sanity.kotacom.id/pembuatan-website
