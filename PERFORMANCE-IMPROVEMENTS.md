# Saran Perbaikan Performa - Home Page Kotacom

**Tanggal Analisis**: 5 April 2026  
**URL**: https://sanity.kotacom.id/  
**Skor Saat Ini**: 64/100 (Mobile)

## 📊 Metrik Performa Saat Ini

| Metrik | Nilai Saat Ini | Target | Status |
|--------|----------------|--------|--------|
| **FCP** (First Contentful Paint) | 1.1s | <1.8s | ✅ Baik |
| **LCP** (Largest Contentful Paint) | **20.1s** | <2.5s | ❌ **CRITICAL** |
| **TBT** (Total Blocking Time) | 380ms | <200ms | ⚠️ Perlu Perbaikan |
| **CLS** (Cumulative Layout Shift) | 0.001 | <0.1 | ✅ Sangat Baik |
| **Speed Index** | 3.8s | <3.4s | ⚠️ Perlu Perbaikan |

---

## 🔴 CRITICAL ISSUES

### 1. LCP Sangat Lambat (20.1s → Target: <2.5s)

**Masalah Utama**: Multiple Sanity queries berjalan sequential, blocking render

#### ✅ SUDAH DIPERBAIKI: Parallel Queries
```typescript
// ❌ SEBELUM (Sequential - lambat)
const { data: projectsData } = await sanityFetch({ query: PROJECTS_QUERY });
const { data: productsData } = await sanityFetch({ query: PRODUCTS_QUERY });
const { data: servicesData } = await sanityFetch({ query: SERVICES_QUERY });
const { data: postsData } = await sanityFetch({ query: POSTS_QUERY });

// ✅ SESUDAH (Parallel - cepat)
const [
  { data: projectsData },
  { data: productsData },
  { data: servicesData },
  { data: postsData }
] = await Promise.all([
  sanityFetch({ query: PROJECTS_QUERY }),
  sanityFetch({ query: PRODUCTS_QUERY }),
  sanityFetch({ query: SERVICES_QUERY }),
  sanityFetch({ query: POSTS_QUERY })
]);
```

**Estimasi Peningkatan**: 3-4x lebih cepat (dari ~4s menjadi ~1s untuk queries)

---

## ⚠️ HIGH PRIORITY IMPROVEMENTS

### 2. Reduce JavaScript Execution Time (1.4s)

#### A. Lazy Load Komponen Below-the-Fold

**File**: `frontend/app/(main)/page.tsx`

```typescript
import dynamic from 'next/dynamic';

// Lazy load komponen yang tidak terlihat di viewport awal
const ProjectsSection = dynamic(
  () => import('@/components/sections/projects-section'),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
);

const ProductsSection = dynamic(
  () => import('@/components/sections/products-section'),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
);

const TestimonialsSection = dynamic(
  () => import('@/components/sections/testimonials-section'),
  { loading: () => <div className="h-96 animate-pulse bg-muted/20" /> }
);
```

**Estimasi Peningkatan**: Reduce initial JS bundle by ~30-40%

#### B. Optimize Icon Imports

**File**: `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`

```typescript
// ❌ SEBELUM - Import semua icons
import {
  Blocks,
  LaptopMinimal,
  Network,
  Printer,
  Sparkles,
  Workflow,
  CheckCircle2,
  Trophy,
  MapPin,
} from "lucide-react";

// ✅ SESUDAH - Tree-shakeable imports
import Blocks from "lucide-react/dist/esm/icons/blocks";
import LaptopMinimal from "lucide-react/dist/esm/icons/laptop-minimal";
import Network from "lucide-react/dist/esm/icons/network";
import Printer from "lucide-react/dist/esm/icons/printer";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import Workflow from "lucide-react/dist/esm/icons/workflow";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Trophy from "lucide-react/dist/esm/icons/trophy";
import MapPin from "lucide-react/dist/esm/icons/map-pin";
```

**Estimasi Peningkatan**: Reduce icon bundle by ~15-20KB

---

### 3. Image Optimization

#### A. ✅ SUDAH DIPERBAIKI: Hero Image Priority
```typescript
<Image
  src="/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png"
  alt="Kotacom IT services and printing illustration"
  fill
  className="object-contain p-4"
  priority
  quality={85}           // ✅ Added
  loading="eager"        // ✅ Added
  fetchPriority="high"   // ✅ Added
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
/>
```

#### B. Convert Images to Modern Formats

**Action Required**: Convert PNG images to WebP/AVIF

```bash
# Install sharp for image optimization
npm install sharp

# Create optimization script
node scripts/optimize-images.js
```

**Script**: `scripts/optimize-images.js`
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images/kotacom-split-production-ready';
const outputDir = './public/images/optimized';

async function optimizeImages() {
  const files = fs.readdirSync(inputDir, { recursive: true });
  
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      console.log(`Optimized: ${file}`);
    }
  }
}

optimizeImages();
```

**Estimasi Peningkatan**: Reduce image size by 60-80%

---

### 4. Reduce Unused JavaScript (420 KiB)

#### A. Code Splitting per Section

**Create**: `frontend/components/sections/projects-section.tsx`

```typescript
import ProjectCard from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SectionShell, SectionIntro } from "@/components/ui/section-shell";

export default function ProjectsSection({ projects }: { projects: any[] }) {
  if (projects.length === 0) return null;

  return (
    <SectionShell>
      <div className="mb-8 flex items-end justify-between gap-4">
        <SectionIntro
          eyebrow="Portfolio & Case Studies"
          title="Proyek terbaru yang kami selesaikan."
          description="Beberapa contoh dari sistem, website, dan proyek IT yang kami kerjakan."
          className="mb-0"
        />
        <Button asChild variant="outline" className="hidden sm:flex">
          <Link href="/projects">Semua Portfolio</Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <ProjectCard key={project._id || (project.slug && project.slug.current)} {...project} />
        ))}
      </div>
    </SectionShell>
  );
}
```

**Repeat for**: ProductsSection, ServicesSection, PostsSection, TestimonialsSection

---

### 5. Implement Caching Strategy

#### A. Add Revalidation to Sanity Queries

**File**: `frontend/sanity/lib/fetch.ts` (or wherever sanityFetch is defined)

```typescript
export async function sanityFetch<T>({ 
  query, 
  params = {},
  revalidate = 3600 // 1 hour default
}: {
  query: string;
  params?: any;
  revalidate?: number | false;
}) {
  return fetch(SANITY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, params }),
    next: { 
      revalidate,
      tags: ['sanity'] 
    }
  }).then(res => res.json());
}
```

#### B. Add Static Generation for Home Page

**File**: `frontend/app/(main)/page.tsx`

```typescript
// Add at the top of the file
export const revalidate = 3600; // Revalidate every hour

// Or use ISR with on-demand revalidation
export const dynamic = 'force-static';
```

---

### 6. Reduce Network Payload (4,313 KiB)

#### A. Implement Compression

**File**: `frontend/next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true, // Enable gzip compression
  
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Optimize fonts
  optimizeFonts: true,
};

export default nextConfig;
```

#### B. Defer Non-Critical CSS

```typescript
// In layout.tsx or page.tsx
import { Suspense } from 'react';

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        {/* Non-critical styles */}
        <link rel="stylesheet" href="/styles/non-critical.css" media="print" onLoad="this.media='all'" />
      </Suspense>
      {children}
    </>
  );
}
```

---

### 7. Reduce Main Thread Work (2.1s)

#### A. Use Web Workers for Heavy Computations

**Create**: `frontend/workers/data-processor.worker.ts`

```typescript
// For processing large data sets
self.addEventListener('message', (e) => {
  const { type, data } = e.data;
  
  if (type === 'PROCESS_PROJECTS') {
    const processed = data.map(project => ({
      ...project,
      // Heavy processing here
    }));
    
    self.postMessage({ type: 'PROCESSED', data: processed });
  }
});
```

#### B. Debounce Expensive Operations

```typescript
import { useMemo } from 'react';
import debounce from 'lodash/debounce';

// In components with expensive calculations
const debouncedCalculation = useMemo(
  () => debounce((value) => {
    // Expensive operation
  }, 300),
  []
);
```

---

## 📈 Expected Performance Improvements

| Optimization | Current | Target | Improvement |
|--------------|---------|--------|-------------|
| **LCP** | 20.1s | 2.5s | **-88%** |
| **TBT** | 380ms | 150ms | **-60%** |
| **JS Execution** | 1.4s | 0.6s | **-57%** |
| **Network Payload** | 4,313 KiB | 1,500 KiB | **-65%** |
| **Overall Score** | 64 | 90+ | **+40%** |

---

## 🎯 Implementation Priority

### Phase 1 (Immediate - 1-2 days)
- [x] ✅ Parallel Sanity queries
- [x] ✅ Hero image optimization
- [ ] Add revalidation to queries
- [ ] Enable Next.js compression

### Phase 2 (Short-term - 3-5 days)
- [ ] Implement dynamic imports
- [ ] Split components into sections
- [ ] Optimize icon imports
- [ ] Convert images to WebP

### Phase 3 (Medium-term - 1-2 weeks)
- [ ] Implement caching strategy
- [ ] Add service worker for offline support
- [ ] Optimize third-party scripts
- [ ] Add performance monitoring

---

## 🔍 Monitoring & Testing

### Tools to Use
1. **Lighthouse CI** - Automated performance testing
2. **Web Vitals** - Real user monitoring
3. **Sentry Performance** - Error & performance tracking

### Setup Performance Monitoring

**File**: `frontend/app/layout.tsx`

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 📝 Additional Recommendations

### 1. Implement Skeleton Loading
```typescript
// Show skeleton while data loads
{isLoading ? (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map(i => (
      <div key={i} className="h-96 animate-pulse rounded-lg bg-muted/20" />
    ))}
  </div>
) : (
  <ProjectsSection projects={projects} />
)}
```

### 2. Preconnect to External Domains
```html
<!-- In head -->
<link rel="preconnect" href="https://cdn.sanity.io" />
<link rel="dns-prefetch" href="https://cdn.sanity.io" />
```

### 3. Add Resource Hints
```typescript
// In page.tsx
export const metadata = {
  other: {
    'link': [
      { rel: 'preload', href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
      { rel: 'prefetch', href: '/api/projects' },
    ]
  }
};
```

---

## 🚀 Quick Wins (Can be done in 1 hour)

1. ✅ **Parallel queries** - DONE
2. ✅ **Hero image optimization** - DONE  
3. **Add `revalidate` to page** - 5 minutes
4. **Enable compression in next.config** - 5 minutes
5. **Add preconnect links** - 5 minutes

---

## 📞 Next Steps

1. Test perubahan yang sudah dibuat dengan Lighthouse
2. Implement Phase 1 optimizations
3. Monitor performance dengan Web Vitals
4. Iterate berdasarkan data real user

**Target Akhir**: Performance Score 90+ (Mobile & Desktop)
