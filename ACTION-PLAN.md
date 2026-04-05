# SEO Action Plan: https://sanity.kotacom.id/

**Priority:** Development Site Optimization  
**Generated:** 2026-04-05  
**Overall Score:** 78/100 (Good)

---

## Critical Actions (Fix Today)

### 1. Fix Sitemap Domain Configuration 🔴

**Priority:** P0 - Critical  
**Effort:** 1 hour  
**Impact:** High - Prevents indexing confusion

**Problem:**
Sitemap menampilkan production URLs (`sanity-nextjs-kotacom-frontend.vercel.app`) instead of dev URLs (`sanity.kotacom.id`)

**Solution:**
```typescript
// frontend/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kotacom.id';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // ... other URLs
  ];
}
```

**Verification:**
```bash
curl https://sanity.kotacom.id/sitemap.xml | grep -o "https://[^<]*" | head -5
# Should show: https://sanity.kotacom.id/
```

---

### 2. Update robots.txt Sitemap Reference 🔴

**Priority:** P0 - Critical  
**Effort:** 15 minutes  
**Impact:** High - Ensures correct sitemap discovery

**Problem:**
robots.txt references production sitemap URL

**Solution:**
```typescript
// frontend/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kotacom.id';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

**Verification:**
```bash
curl https://sanity.kotacom.id/robots.txt | grep Sitemap
# Should show: Sitemap: https://sanity.kotacom.id/sitemap.xml
```

---

### 3. Fix Social Meta URLs 🔴

**Priority:** P0 - Critical  
**Effort:** 30 minutes  
**Impact:** Medium - Correct social sharing previews

**Problem:**
og:url and og:image point to production domain

**Solution:**
```typescript
// frontend/app/layout.tsx or page.tsx
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kotacom.id'),
  openGraph: {
    url: '/',
    images: [
      {
        url: '/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

**Verification:**
```bash
curl -s https://sanity.kotacom.id/ | grep -E 'og:url|og:image'
```

---

## High Priority Actions (This Week)

### 4. Remove Double Slashes in URLs ⚠️

**Priority:** P1 - High  
**Effort:** 1 hour  
**Impact:** Medium - Cleaner URLs

**Problem:**
Image URLs contain double slashes: `//images/`

**Solution:**
```typescript
// Check all URL construction logic
const imageUrl = new URL('/images/hero.png', baseUrl).toString();
// Instead of: `${baseUrl}//images/hero.png`
```

**Files to Check:**
- `frontend/app/layout.tsx`
- `frontend/components/blocks/*.tsx`
- `frontend/lib/sanity/image.ts`

---

### 5. Add Missing Twitter Meta Tags ⚠️

**Priority:** P1 - High  
**Effort:** 15 minutes  
**Impact:** Low - Better Twitter cards

**Solution:**
```typescript
export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    site: '@kotacom_id', // Add your Twitter handle
    creator: '@kotacom_id',
    title: 'Kotacom | Solusi IT, Website, Software & Percetakan Surabaya',
    description: 'Jasa IT terpadu pembuatan website, software custom, IT support, dan cetak profesional',
    images: ['/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png'],
  },
};
```

---

### 6. Setup Performance Monitoring Alternative ⚠️

**Priority:** P1 - High  
**Effort:** 2 hours  
**Impact:** High - Get CWV baseline

**Problem:**
PageSpeed Insights API gagal untuk dev domain

**Solutions:**

**Option A: Vercel Analytics (Recommended)**
```bash
npm install @vercel/analytics
```

```typescript
// frontend/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Option B: Manual PSI Testing**
```bash
# Test production domain as baseline
python3 .kiro/skills/agentic-seo-skill/scripts/pagespeed.py https://www.kotacom.id/ --strategy mobile
```

---

## Medium Priority Actions (This Month)

### 7. Add Structured Data (JSON-LD) ℹ️

**Priority:** P2 - Medium  
**Effort:** 3 hours  
**Impact:** Medium - Rich results eligibility

**Solution:**
```typescript
// frontend/components/structured-data.tsx
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kotacom",
    "description": "Solusi IT & Digital Terpadu untuk Bisnis Anda",
    "url": "https://www.kotacom.id",
    "telephone": "+62-xxx-xxxx-xxxx",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Surabaya",
      "addressRegion": "Jawa Timur",
      "addressCountry": "ID"
    },
    "sameAs": [
      "https://facebook.com/kotacom",
      "https://instagram.com/kotacom"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

### 8. Optimize Meta Descriptions ℹ️

**Priority:** P2 - Medium  
**Effort:** 2 hours  
**Impact:** Medium - Better CTR

**Current Issue:**
Descriptions appear truncated in social meta

**Solution:**
```typescript
// Keep descriptions 150-160 characters
const description = "Jasa IT terpadu: pembuatan website, software custom, IT support, dan percetakan profesional di Surabaya. Satu partner untuk semua kebutuhan digital bisnis Anda.";
```

---

## Environment Configuration Checklist

### Development Environment Setup

```bash
# seo-dashboard/.env or frontend/.env.development
NEXT_PUBLIC_SITE_URL=https://sanity.kotacom.id
NEXT_PUBLIC_STUDIO_URL=http://localhost:3333
NEXT_PUBLIC_SITE_ENV=development
NEXT_PUBLIC_SANITY_DATASET=production
```

### Production Environment Setup

```bash
# frontend/.env.production
NEXT_PUBLIC_SITE_URL=https://www.kotacom.id
NEXT_PUBLIC_STUDIO_URL=https://sanity.kotacom.id
NEXT_PUBLIC_SITE_ENV=production
NEXT_PUBLIC_SANITY_DATASET=production
```

### Verification Commands

```bash
# 1. Check sitemap URLs
curl -s https://sanity.kotacom.id/sitemap.xml | grep -o "https://[^<]*" | head -3

# 2. Check robots.txt
curl https://sanity.kotacom.id/robots.txt

# 3. Check meta tags
curl -s https://sanity.kotacom.id/ | grep -E 'og:url|og:image|twitter:' | head -10

# 4. Check security headers
curl -I https://sanity.kotacom.id/ | grep -E 'strict-transport|x-frame|x-content'

# 5. Test llms.txt
curl https://sanity.kotacom.id/llms.txt
```

---

## Implementation Timeline

| Week | Tasks | Estimated Hours |
|------|-------|-----------------|
| Week 1 | Critical fixes (1-3) | 2 hours |
| Week 1 | High priority (4-6) | 4 hours |
| Week 2-3 | Medium priority (7-8) | 5 hours |
| Week 4 | Testing & verification | 2 hours |

**Total Effort:** ~13 hours

---

## Success Metrics

### Before Fix
- ❌ Sitemap URLs: Production domain
- ❌ robots.txt: Production sitemap
- ❌ Social meta: Production URLs
- ⚠️ Performance: No data
- ✅ Security: 100/100
- ✅ AI Readiness: 95/100

### After Fix (Target)
- ✅ Sitemap URLs: Dev domain
- ✅ robots.txt: Dev sitemap
- ✅ Social meta: Dev URLs
- ✅ Performance: Monitored
- ✅ Security: 100/100
- ✅ AI Readiness: 95/100
- ✅ Structured Data: Implemented

**Target Overall Score:** 85/100 (Excellent)

---

## Documentation Requirements

After implementing fixes, update:

1. **docs/seo-updates.md**
   ```markdown
   ## 2026-04-05 - Dev Environment SEO Configuration Fix
   
   **Changed Files:**
   - frontend/app/sitemap.ts
   - frontend/app/robots.ts
   - frontend/app/layout.tsx
   - seo-dashboard/.env
   
   **Changes:**
   - Fixed sitemap to use environment-specific URLs
   - Updated robots.txt sitemap reference
   - Corrected social meta URLs
   - Added environment variable documentation
   
   **Impact:**
   - Resolved indexing confusion between dev and production
   - Improved social sharing accuracy
   - Better environment isolation
   
   **Verification:**
   - ✅ Sitemap URLs verified
   - ✅ robots.txt updated
   - ✅ Social meta tags tested
   ```

2. **README.md** (if needed)
   - Document environment variable requirements
   - Add deployment checklist

---

## Contact & Support

**Questions?** Refer to:
- SEO Skill: `.kiro/skills/agentic-seo-skill/SKILL.md`
- Sanity Docs: `docs/sanity-seed-guardrails.md`
- Agent Rules: `AGENTS.md`

