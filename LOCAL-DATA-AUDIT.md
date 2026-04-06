# Audit Halaman yang Masih Menggunakan Data Lokal

**Tanggal Audit:** 2026-04-06  
**Status:** Migrasi ke Sanity CMS masih dalam proses

## Executive Summary

Meskipun data telah dimigrasikan ke Sanity CMS (2026-04-05), masih ada **beberapa halaman dan route handlers** yang menggunakan data lokal sebagai sumber utama. Berikut adalah daftar lengkap halaman yang perlu diperbarui untuk menggunakan Sanity sebagai sumber data utama.

---

## 1. Halaman dengan Data Lokal Penuh

### 1.1 Homepage (`/`)
**File:** `frontend/app/(main)/page.tsx`  
**Status:** ❌ Menggunakan data lokal  
**Sumber Data:** `frontend/lib/local-content/home-page.ts`

**Detail:**
- Menggunakan `homePageContent` yang di-hardcode dalam TypeScript
- Berisi: hero stats, pillars, proofs, workflow, tech stack, final CTA
- **Rekomendasi:** Migrasi ke Sanity `page` document dengan slug `home` atau buat hybrid pattern

---

### 1.2 Jasa Cetak Buku Kota (Dynamic City Pages)
**Route:** `/jasa-cetak-buku-[kota]` (contoh: `/jasa-cetak-buku-jakarta`)  
**File:** `frontend/app/(main)/[slug]/page.tsx`  
**Status:** ❌ Menggunakan data lokal  
**Sumber Data:** 
- `frontend/lib/local-content/jasa-cetak-buku-kota.ts`
- `frontend/content/astro-local/jasa-cetak-buku-kota/cities.json`
- `frontend/content/astro-local/jasa-cetak-buku-kota/template.mdx`

**Detail:**
- 100+ halaman kota yang di-generate dari JSON lokal
- Menggunakan template MDX untuk konten
- Fallback generation untuk kota yang tidak ada di JSON
- **Rekomendasi:** Migrasi ke Sanity dengan template pattern atau tetap lokal jika konten sangat repetitif

---

### 1.3 JSON Usaha Pages (Service Landing Pages)
**Route:** `/services/[slug]` untuk beberapa slug tertentu  
**File:** `frontend/app/(main)/services/[slug]/page.tsx`  
**Status:** ⚠️ Hybrid - menggunakan lokal dan Sanity  
**Sumber Data:** 
- `frontend/lib/local-content/json-usaha.ts`
- `frontend/content/astro-local/json-usaha/*.json`

**Detail:**
- Halaman layanan yang di-generate dari file JSON Astro lama
- Berisi: hero, metrics, features, services, pricing, testimonials, FAQs
- Route handler mencoba Sanity dulu, fallback ke JSON lokal
- **Rekomendasi:** Migrasi semua JSON ke Sanity `page` documents

---

## 2. Halaman dengan Legacy Astro Static Data

### 2.1 Percetakan Section
**Routes:**
- `/percetakan` (index)
- `/percetakan/[...segments]` (nested pages)

**Files:**
- `frontend/app/(main)/percetakan/page.tsx`
- `frontend/app/(main)/percetakan/[...segments]/page.tsx`

**Status:** ❌ Menggunakan legacy data  
**Sumber Data:** `frontend/lib/legacy-pages/astro-static-manifest.json`

**Detail:**
- Menggunakan `getLegacySectionIndex()` dan `getLegacySectionRouteBySegments()`
- Struktur hierarki dari manifest JSON lokal
- **Rekomendasi:** Migrasi ke Sanity dengan parent-child page structure

---

### 2.2 Pembuatan Website Section
**Routes:**
- `/pembuatan-website` (index)
- `/pembuatan-website/[slug]` (child pages)

**Files:**
- `frontend/app/(main)/pembuatan-website/page.tsx`
- `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`

**Status:** ⚠️ Hybrid - menggunakan legacy dan Sanity template  
**Sumber Data:** 
- `frontend/lib/legacy-pages/astro-static.ts`
- Sanity template pages (fallback)

**Detail:**
- Index menggunakan `getLegacySectionIndex()`
- Child pages mencoba template Sanity dulu, fallback ke legacy
- **Rekomendasi:** Migrasi semua ke Sanity template pattern

---

### 2.3 Software Section
**Routes:**
- `/software` (index)
- `/software/[slug]` (child pages)

**Files:**
- `frontend/app/(main)/software/page.tsx`
- `frontend/app/(main)/software/[slug]/page.tsx`

**Status:** ⚠️ Hybrid - menggunakan legacy dan Sanity template  
**Sumber Data:** 
- `frontend/lib/legacy-pages/astro-static.ts`
- Sanity template pages (fallback)

**Detail:**
- Sama seperti pembuatan-website section
- **Rekomendasi:** Migrasi semua ke Sanity template pattern

---

### 2.4 About Section
**Routes:**
- `/about` (index)
- `/about/[slug]` (child pages)

**Files:**
- `frontend/app/(main)/about/page.tsx`
- `frontend/app/(main)/about/[slug]/page.tsx`

**Status:** ❌ Menggunakan legacy data  
**Sumber Data:** `frontend/lib/legacy-pages/astro-static.ts`

**Detail:**
- Menggunakan `getLegacySectionIndex()` dan `getLegacySectionSlug()`
- **Rekomendasi:** Migrasi ke Sanity pages

---

### 2.5 Static Pages (Contact, Privacy, Sistem POS)
**Routes:**
- `/contact`
- `/privacy`
- `/sistem-pos`

**Files:**
- `frontend/app/(main)/contact/page.tsx`
- `frontend/app/(main)/privacy/page.tsx`
- `frontend/app/(main)/sistem-pos/page.tsx`

**Status:** ❌ Menggunakan legacy data  
**Sumber Data:** `frontend/lib/legacy-pages/astro-static.ts`

**Detail:**
- Menggunakan `getLegacySinglePage()`
- **Rekomendasi:** Migrasi ke Sanity pages

---

### 2.6 Services Index
**Route:** `/services`  
**File:** `frontend/app/(main)/services/page.tsx`  
**Status:** ⚠️ Hybrid - menggunakan legacy dan local JSON  
**Sumber Data:** 
- `frontend/lib/legacy-pages/astro-static.ts`
- `frontend/lib/local-content/json-usaha.ts`

**Detail:**
- Menggunakan `getLegacySinglePage()` untuk konten utama
- Menggunakan `getJsonUsahaPages()` untuk daftar layanan
- **Rekomendasi:** Migrasi semua ke Sanity

---

## 3. Utility Files yang Masih Digunakan

### 3.1 Legacy Pages Utilities
**Location:** `frontend/lib/legacy-pages/`

**Files yang masih aktif digunakan:**
- ✅ `astro-static-manifest.json` - Manifest URL lokal (deprecated tapi masih dipakai)
- ✅ `astro-static.ts` - Helper functions untuk akses data lokal
- ✅ `metadata.ts` - Generate metadata dari legacy data
- ✅ `internal-links.ts` - Generate internal links
- ✅ `rewrite-content.ts` - Build konten dari legacy data

**Status:** Masih digunakan oleh route handlers di atas

---

### 3.2 Local Content Utilities
**Location:** `frontend/lib/local-content/`

**Files yang masih aktif digunakan:**
- ✅ `home-page.ts` - Homepage content (hardcoded)
- ✅ `jasa-cetak-buku-kota.ts` - City pages generator
- ✅ `json-usaha.ts` - Service pages dari JSON
- ✅ `astro-catalog.ts` - Catalog dari Astro local files

**Status:** Masih digunakan oleh route handlers

---

### 3.3 Content Files
**Location:** `frontend/content/astro-local/`

**Struktur:**
```
content/astro-local/
├── jasa-cetak-buku-kota/
│   ├── cities.json (100+ cities)
│   ├── excluded-non-city.json
│   └── template.mdx
├── json-usaha/
│   └── *.json (multiple service JSON files)
└── pages/
    ├── posts/
    ├── services/
    ├── products/
    └── projects/
```

**Status:** Masih digunakan sebagai sumber data

---

## 4. Sitemap Integration

**File:** `frontend/app/sitemap.ts`  
**Status:** ⚠️ Menggunakan data lokal untuk beberapa URL

**Import dari local:**
```typescript
import { getJasaCetakBukuCityStaticParams } from "@/lib/local-content/jasa-cetak-buku-kota";
import { getJsonUsahaStaticParams } from "@/lib/local-content/json-usaha";
```

**Rekomendasi:** Update sitemap untuk menggunakan Sanity setelah migrasi selesai

---

## 5. Prioritas Migrasi

### Priority 1: High Impact Pages (Harus segera)
1. **Homepage** (`/`) - Halaman paling penting
2. **Services Index** (`/services`) - Hub untuk semua layanan
3. **Static Pages** (`/contact`, `/privacy`, `/sistem-pos`) - Mudah dimigrasikan

### Priority 2: Template-Based Pages (Medium)
4. **Pembuatan Website Section** - Sudah ada template pattern di Sanity
5. **Software Section** - Sama seperti pembuatan website
6. **About Section** - Konten relatif statis

### Priority 3: Dynamic Generated Pages (Complex)
7. **Percetakan Section** - Struktur hierarki kompleks
8. **JSON Usaha Pages** - Perlu normalisasi data
9. **Jasa Cetak Buku Kota** - 100+ halaman, pertimbangkan tetap lokal atau template

---

## 6. Rekomendasi Strategi Migrasi

### Strategi A: Full Migration (Recommended)
**Migrasi semua ke Sanity CMS**

**Pros:**
- Single source of truth
- Konten bisa diedit via Studio
- Konsisten dengan arsitektur baru
- Lebih mudah maintain jangka panjang

**Cons:**
- Butuh effort besar untuk migrasi
- Perlu update banyak route handlers
- Testing ekstensif diperlukan

**Timeline:** 2-3 minggu

---

### Strategi B: Hybrid Approach (Pragmatic)
**Migrasi halaman penting, pertahankan generated pages**

**Migrasi ke Sanity:**
- Homepage
- Services index
- Static pages
- About section
- Pembuatan website & software (template pattern)

**Tetap lokal:**
- Jasa cetak buku kota (100+ halaman repetitif)
- Percetakan nested structure (jika terlalu kompleks)

**Pros:**
- Fokus pada halaman high-impact
- Lebih cepat selesai
- Tetap ada fallback untuk edge cases

**Cons:**
- Masih ada dual source of truth
- Maintenance complexity tetap ada

**Timeline:** 1-2 minggu

---

### Strategi C: Gradual Migration (Safe)
**Migrasi satu section per sprint**

**Sprint 1:** Homepage + static pages  
**Sprint 2:** Services section  
**Sprint 3:** About section  
**Sprint 4:** Template-based sections  
**Sprint 5:** Complex generated pages  

**Pros:**
- Risiko rendah
- Testing lebih thorough
- Bisa rollback per section

**Cons:**
- Timeline paling lama
- Dual maintenance lebih lama

**Timeline:** 4-5 minggu

---

## 7. Action Items

### Immediate (This Week)
- [ ] Pilih strategi migrasi (A, B, atau C)
- [ ] Setup Sanity schema untuk homepage content
- [ ] Migrasi homepage content ke Sanity
- [ ] Update `/` route handler untuk menggunakan Sanity

### Short Term (Next 2 Weeks)
- [ ] Migrasi static pages (contact, privacy, sistem-pos)
- [ ] Update services index untuk menggunakan Sanity
- [ ] Migrasi about section
- [ ] Update sitemap untuk menggunakan Sanity

### Medium Term (Next Month)
- [ ] Migrasi template-based sections (pembuatan-website, software)
- [ ] Migrasi atau refactor percetakan section
- [ ] Evaluasi JSON usaha pages migration
- [ ] Evaluasi jasa cetak buku kota strategy

### Long Term (After Full Migration)
- [ ] Archive legacy-pages folder
- [ ] Archive local-content folder
- [ ] Update documentation
- [ ] Remove unused imports
- [ ] Cleanup content/astro-local folder

---

## 8. Testing Checklist

Setelah setiap migrasi, pastikan:
- [ ] Route masih accessible
- [ ] Metadata (title, description) correct
- [ ] Internal links working
- [ ] Images loading properly
- [ ] SEO tags complete
- [ ] Sitemap updated
- [ ] No console errors
- [ ] Performance tidak menurun
- [ ] Draft mode working (jika applicable)

---

## 9. Rollback Plan

Jika ada masalah setelah migrasi:

1. **Immediate Rollback:** Revert route handler ke versi sebelumnya
2. **Data Rollback:** Legacy data masih ada, tinggal switch import
3. **Gradual Fix:** Fix issue di Sanity, test, deploy ulang

**Catatan:** Jangan hapus legacy data sampai yakin 100% migrasi sukses dan stabil minimal 2 minggu.

---

## 10. Kesimpulan

**Total Halaman Menggunakan Data Lokal:** ~150+ halaman
- Homepage: 1
- Static pages: 3
- Section indexes: 4
- Template pages: ~20
- JSON usaha pages: ~10
- Jasa cetak buku kota: 100+
- Percetakan nested: ~10

**Rekomendasi:** Gunakan **Strategi B (Hybrid Approach)** untuk balance antara effort dan impact.

**Next Step:** Mulai dengan migrasi homepage dan static pages minggu ini.

---

**Prepared by:** Kiro AI Assistant  
**Date:** 2026-04-06  
**Version:** 1.0
