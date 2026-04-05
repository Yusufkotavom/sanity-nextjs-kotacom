# SEO Action Plan - Sanity Kotacom

**Site:** https://sanity.kotacom.id/ (Development)  
**Current Score:** 72/100  
**Target Score:** 85-90/100  
**Timeline:** 4 weeks

---

## 🔴 Phase 1: Critical Fixes (Week 1) - BLOCKING PRODUCTION

### 1. Add Meta Description
**Priority:** CRITICAL  
**Time:** 15 minutes  
**Impact:** High

```html
<meta name="description" content="Kotacom menyediakan solusi IT terpadu: pembuatan website, software development, IT support, dan percetakan profesional di Surabaya. Partner terpercaya untuk infrastruktur digital bisnis Anda.">
```

### 2. Add Robots Meta Tag (Dev Only)
**Priority:** CRITICAL  
**Time:** 5 minutes  
**Impact:** High

```html
<meta name="robots" content="noindex, nofollow">
```
⚠️ **REMOVE THIS TAG BEFORE PRODUCTION!**

### 3. Implement LocalBusiness Schema
**Priority:** CRITICAL  
**Time:** 30 minutes  
**Impact:** High

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "name": "Kotacom IT Service & Percetakan",
  "url": "https://www.kotacom.id",
  "telephone": "+6285799520350",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Graha Indraprasta G7/15",
    "addressLocality": "Tulangan",
    "addressRegion": "Sidoarjo",
    "postalCode": "61273",
    "addressCountry": "ID"
  },
  "areaServed": [
    {"@type": "City", "name": "Surabaya"},
    {"@type": "City", "name": "Sidoarjo"}
  ],
  "priceRange": "$$"
}
```

### 4. Add Open Graph Tags
**Priority:** CRITICAL  
**Time:** 20 minutes  
**Impact:** High

```html
<meta property="og:type" content="website">
<meta property="og:title" content="Kotacom | Solusi IT, Website, Software & Percetakan Surabaya">
<meta property="og:description" content="Solusi IT & Digital Terpadu untuk Bisnis Anda. Website, Software, IT Support, dan Percetakan Profesional.">
<meta property="og:url" content="https://www.kotacom.id/">
<meta property="og:image" content="https://www.kotacom.id/og-image.jpg">
<meta property="og:locale" content="id_ID">
```

### 5. Add Twitter Card Tags
**Priority:** CRITICAL  
**Time:** 10 minutes  
**Impact:** Medium

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Kotacom | Solusi IT, Website, Software & Percetakan Surabaya">
<meta name="twitter:description" content="Solusi IT & Digital Terpadu untuk Bisnis Anda.">
<meta name="twitter:image" content="https://www.kotacom.id/twitter-image.jpg">
```

**Phase 1 Total Time:** 1.5 hours  
**Phase 1 Impact:** +10-15 points

---

## ⚠️ Phase 2: Content Enhancements (Week 2)

### 6. Add FAQ Section
**Priority:** HIGH  
**Time:** 2 hours  
**Impact:** High

Add 4-6 FAQs covering:
- Waktu pembuatan website
- Garansi layanan
- Area layanan
- Biaya/pricing
- Proses kerja
- Support after launch

### 7. Add "Mengapa Memilih Kotacom" Section
**Priority:** HIGH  
**Time:** 1 hour  
**Impact:** Medium

Include:
- Berpengalaman sejak 2008
- One-stop solution
- Support berkelanjutan
- Harga transparan

### 8. Add Structured Address in Footer
**Priority:** HIGH  
**Time:** 30 minutes  
**Impact:** Medium

```html
<address>
  Kotacom IT Service & Percetakan<br>
  Graha Indraprasta G7/15<br>
  Tulangan, Sidoarjo 61273<br>
  <a href="tel:+6285799520350">+62 857-9952-0350</a>
</address>
```

### 9. Optimize H1 Tag
**Priority:** MEDIUM  
**Time:** 15 minutes  
**Impact:** Low

Current: "Solusi IT & Percetakan Terintegrasi"  
Suggested: "Solusi IT, Website, Software & Percetakan Terintegrasi Surabaya"

**Phase 2 Total Time:** 4 hours  
**Phase 2 Impact:** +5-8 points

---

## 📊 Phase 3: Technical Optimizations (Week 3)

### 10. Verify Image Alt Texts
**Priority:** HIGH  
**Time:** 2 hours  
**Impact:** Medium

- Audit all images
- Add descriptive alt text
- Include keywords naturally
- Ensure no missing alt attributes

### 11. Implement Breadcrumb Navigation
**Priority:** MEDIUM  
**Time:** 3 hours  
**Impact:** Medium

Add breadcrumbs to all pages:
- Home > Services > Website Development
- Home > Portfolio > Project Name

### 12. Add BreadcrumbList Schema
**Priority:** MEDIUM  
**Time:** 1 hour  
**Impact:** Low

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.kotacom.id/"
    }
  ]
}
```

### 13. Optimize Internal Linking
**Priority:** MEDIUM  
**Time:** 2 hours  
**Impact:** Medium

- Add "Layanan Terkait" sections
- Cross-link related services
- Link to specific service pages from homepage

**Phase 3 Total Time:** 8 hours  
**Phase 3 Impact:** +3-5 points

---

## 🚀 Phase 4: Advanced SEO (Week 4)

### 14. Create Service Area Pages
**Priority:** MEDIUM  
**Time:** 8 hours  
**Impact:** High (long-term)

Create pages for:
- /layanan/surabaya
- /layanan/sidoarjo
- /layanan/gresik
- /layanan/malang

### 15. Implement Service Schema
**Priority:** LOW  
**Time:** 3 hours  
**Impact:** Medium

Add Service schema for each service type:
- Website Development
- Software Development
- IT Support
- Printing Services

### 16. Set Up Google Search Console
**Priority:** HIGH  
**Time:** 1 hour  
**Impact:** High

- Verify site ownership
- Submit XML sitemap
- Monitor indexing status
- Track search performance

### 17. Create XML Sitemap
**Priority:** HIGH  
**Time:** 1 hour  
**Impact:** High

Ensure sitemap includes:
- All main pages
- Service pages
- Portfolio items
- Blog posts (if any)

**Phase 4 Total Time:** 13 hours  
**Phase 4 Impact:** +5-10 points (long-term)

---

## 📋 Pre-Production Checklist

### Must Complete Before Launch
- [ ] Remove `noindex` robots meta tag ⚠️
- [ ] Add meta description
- [ ] Implement LocalBusiness schema
- [ ] Add Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Verify all images have alt text
- [ ] Test mobile responsiveness
- [ ] Verify canonical tags
- [ ] Set up Google Search Console
- [ ] Submit XML sitemap

### Recommended Before Launch
- [ ] Add FAQ section
- [ ] Add "Mengapa Memilih Kotacom" section
- [ ] Add structured address
- [ ] Implement breadcrumb navigation
- [ ] Optimize internal linking
- [ ] Test Core Web Vitals
- [ ] Verify schema markup with Google Rich Results Test

---

## 📊 Expected Results

### Current State
- **SEO Score:** 72/100
- **Missing:** Meta description, schema markup, social tags
- **Strengths:** Good content, clear structure

### After Phase 1 (Week 1)
- **SEO Score:** 82-87/100
- **Improvements:** All critical meta tags, basic schema
- **Ready for:** Soft launch

### After Phase 2 (Week 2)
- **SEO Score:** 85-90/100
- **Improvements:** Enhanced content, better E-E-A-T
- **Ready for:** Full production launch

### After Phase 3-4 (Week 3-4)
- **SEO Score:** 88-92/100
- **Improvements:** Complete technical optimization
- **Ready for:** Aggressive SEO campaign

---

## 🎯 Quick Wins (Do First)

1. **Add meta description** (15 min) → +5 points
2. **Add robots noindex** (5 min) → Prevent indexing issues
3. **Implement LocalBusiness schema** (30 min) → +8 points
4. **Add OG tags** (20 min) → Better social sharing
5. **Add FAQ section** (2 hours) → +5 points

**Total Quick Wins Time:** 3 hours  
**Total Quick Wins Impact:** +18 points  
**New Score:** 90/100 ✅

---

## 💰 ROI Estimation

### Investment
- **Phase 1:** 1.5 hours (critical)
- **Phase 2:** 4 hours (high priority)
- **Phase 3:** 8 hours (medium priority)
- **Phase 4:** 13 hours (long-term)
- **Total:** 26.5 hours

### Expected Returns
- **Organic Traffic:** +30-50% in 3 months
- **Search Visibility:** +40-60% in 6 months
- **Local Rankings:** Top 3 for "IT services Surabaya"
- **Click-Through Rate:** +20-30% from better meta tags
- **Social Engagement:** +40-60% from OG tags

---

## 🔧 Implementation Notes

### For Developers
- All schema markup should be in `<script type="application/ld+json">`
- Use Next.js metadata API for meta tags
- Implement breadcrumbs using next/link
- Use next/image for all images (automatic alt text support)

### For Content Team
- Write FAQ answers in natural language
- Include target keywords naturally
- Keep meta descriptions 150-160 characters
- Use location keywords throughout content

### For Marketing Team
- Monitor Google Search Console weekly
- Track keyword rankings monthly
- A/B test meta descriptions
- Monitor Core Web Vitals

---

## 📞 Support

If you need help implementing any of these recommendations:
1. Refer to `SEO-AUDIT-SANITY-KOTACOM.md` for detailed explanations
2. Check Next.js documentation for metadata API
3. Use Google's Rich Results Test for schema validation
4. Contact SEO specialist for advanced optimizations

---

**Action Plan Created:** 2026-04-05  
**Next Review:** After Phase 1 completion  
**Target Launch:** After Phase 2 completion
