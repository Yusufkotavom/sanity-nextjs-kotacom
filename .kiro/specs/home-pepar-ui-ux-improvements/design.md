# Design Document: Home Pepar UI/UX Improvements

## Overview

This design document specifies the technical implementation approach for visual and UX improvements to the `/home-pepar` page. The page is a hybrid homepage candidate for Kotacom that combines code-owned middle sections with optional CMS-managed top/bottom blocks. While the existing content foundation is strong, this design addresses critical visual gaps including missing hero imagery, duplicate portfolio thumbnails, excessive whitespace, CTA overload, and missing visual hierarchy elements.

### Design Goals

1. Add compelling visual elements without compromising content quality
2. Establish clear visual hierarchy through spacing, color, and iconography
3. Optimize conversion paths by reducing CTA overload
4. Enhance trust signals through improved testimonials and footer information
5. Maintain responsive behavior and accessibility standards
6. Preserve the existing hybrid architecture pattern

### Scope

This design covers modifications to:
- `frontend/components/hybrid/generated/home-pepar-middle-section.tsx` (primary component)
- `frontend/lib/local-content/home-prepare.ts` (content source)
- `frontend/components/header/index.tsx` (navigation and dark mode toggle)
- `frontend/components/footer.tsx` (local SEO enhancements)
- Asset integration from `frontend/public/images/kotacom-split-production-ready/`

Out of scope:
- Changes to the hybrid shell architecture (`PageHybridShell`)
- Modifications to Sanity CMS schema or top/bottom block rendering
- Changes to global design system components (Button, SectionShell, etc.)

## Architecture

### Current Architecture

The `/home-pepar` page follows the hybrid page pattern:

```
Page Route (page.tsx)
  └── PageHybridShell
        ├── Top Blocks (from Sanity CMS, optional)
        ├── Middle Section (code-owned component)
        └── Bottom Blocks (from Sanity CMS, optional)
```


The middle section is a React Server Component that:
- Fetches recent projects from Sanity via `PROJECTS_QUERY`
- Renders static content from `homePrepareContent` (TypeScript constant)
- Uses design system components (`SectionShell`, `SectionPanel`, `Button`)
- Maintains responsive grid layouts with Tailwind CSS

### Design Principles

1. **Component Isolation**: All changes remain within the middle section component and content file
2. **Asset Reuse**: Leverage existing illustration library rather than requiring new assets
3. **Responsive First**: All visual changes must work across mobile, tablet, and desktop viewports
4. **Accessibility**: Maintain WCAG 2.1 AA standards for contrast, focus states, and semantic HTML
5. **Performance**: Optimize images with Next.js Image component, lazy load where appropriate

## Components and Interfaces

### 1. Hero Section Enhancement (Requirement 1)

**Current State**: Hero section is rendered by `PageHybridShell` from Sanity CMS top blocks, displaying text-only card with headline, CTAs, and trust bar.

**Design Decision**: Add hero illustration as a background or side element within the existing hero block structure.

**Implementation Approach**:

Option A: Background Overlay Pattern
- Add illustration as background image with reduced opacity
- Position using CSS `background-image` with `background-position: right center`
- Ensure text remains readable with gradient overlay or increased contrast

Option B: Split Layout Pattern
- Modify hero block to use two-column grid on desktop
- Left column: existing text content
- Right column: illustration with `next/image` component
- Stack vertically on mobile

**Recommended**: Option B (Split Layout) for better control and accessibility

**Asset Selection**:
- Primary candidate: `/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png`
- Fallback: Custom illustration representing IT services (website, software, support icons)
- Dimensions: 600x600px minimum for retina displays

**Technical Specifications**:
```tsx
// Pseudo-code structure
<div className="grid md:grid-cols-[1fr_400px] gap-8 items-center">
  <div>{/* Existing hero content */}</div>
  <div className="relative aspect-square">
    <Image 
      src="/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png"
      alt="Kotacom IT services illustration"
      fill
      className="object-contain"
      priority
    />
  </div>
</div>
```


### 2. Portfolio Thumbnail Uniqueness (Requirement 2)

**Current State**: Portfolio cards fetch data from Sanity `PROJECTS_QUERY` and may display duplicate placeholder images if projects lack unique thumbnails.

**Design Decision**: Ensure each portfolio project has a unique, contextually relevant thumbnail.

**Implementation Approach**:

1. **Content Layer Solution** (Preferred):
   - Audit Sanity project documents for missing or duplicate images
   - Assign unique illustrations from `/images/kotacom-split-production-ready/services/` subdirectories
   - Map project types to appropriate service category illustrations:
     - Website projects → `/services/website/` illustrations
     - Software/POS projects → `/services/it/` illustrations
     - Printing projects → `/services/printing/` illustrations

2. **Fallback Layer Solution**:
   - If Sanity images are missing, generate deterministic placeholder based on project ID
   - Use different color schemes per project type
   - Ensure visual distinction through color, icon, or pattern variation

**Asset Mapping Strategy**:
```typescript
// In home-prepare.ts or component
const projectTypeToAsset = {
  'website': '/images/kotacom-split-production-ready/services/website/website-dev-1.png',
  'software': '/images/kotacom-split-production-ready/services/it/it-support-1.png',
  'printing': '/images/kotacom-split-production-ready/services/printing/printing-1.png',
} as const;
```

**Validation**:
- Each portfolio card must render a unique `src` attribute
- No two adjacent portfolio cards should share the same image URL
- Images should maintain consistent aspect ratio (16:9 or 4:3)

### 3. Section Spacing Optimization (Requirement 3)

**Current State**: Excessive vertical spacing between sections (up to 200px) creates disconnected page flow.

**Design Decision**: Standardize section spacing to maximum 80px while maintaining visual breathing room.

**Implementation Approach**:

1. **Audit Current Spacing**:
   - Hero to Trust Bar: Currently ~200px → Target 80px
   - Trust Bar to Services: Currently ~120px → Target 80px
   - Between all major sections: Standardize to 80px

2. **Tailwind Class Modifications**:
```tsx
// Current pattern
<SectionShell className="pt-8 lg:pt-12"> // 32px / 48px

// New pattern
<SectionShell className="pt-12 lg:pt-20"> // 48px / 80px max
```

3. **Spacing Scale**:
   - Mobile: 48px (pt-12) between sections
   - Tablet: 64px (pt-16) between sections
   - Desktop: 80px (pt-20) between sections maximum

**Technical Specifications**:
- Replace all `pt-8 lg:pt-12` with `pt-12 lg:pt-16`
- Replace all `pb-16 lg:pb-20` with `pb-12 lg:pb-16`
- Ensure consistent spacing across all `<SectionShell>` instances
- Maintain internal padding within `<SectionPanel>` components (unchanged)


### 4. CTA Optimization (Requirement 4)

**Current State**: Multiple prominent CTAs throughout the page create decision fatigue.

**Design Decision**: Establish clear CTA hierarchy with maximum 3 prominent CTAs per viewport.

**Implementation Approach**:

1. **CTA Classification**:
   - **Primary**: Hero CTAs ("Jelajahi Solusi", "Konsultasi Gratis") - keep prominent
   - **Secondary**: Section-level CTAs - reduce visual weight
   - **Tertiary**: Floating WhatsApp button - maintain as persistent option

2. **Visual Hierarchy**:
```tsx
// Primary CTAs (Hero only)
<Button variant="default" size="lg">Jelajahi Solusi</Button>
<Button variant="outline" size="lg">Konsultasi Gratis</Button>

// Secondary CTAs (Section level)
<Button variant="ghost" size="sm">Lihat semua layanan</Button>
<GlobalWhatsAppButton variant="outline" size="sm" />

// Tertiary (Floating)
<FloatingWhatsAppButton /> // Unchanged
```

3. **CTA Reduction Strategy**:
   - Remove duplicate "Konsultasi via WhatsApp" buttons from middle sections
   - Keep only one WhatsApp CTA per major section (workflow card)
   - Replace prominent CTAs in service cluster cards with subtle text links
   - Maintain closing section CTAs as final conversion point

**CTA Count Per Section**:
- Hero: 2 primary CTAs
- Services Overview: 1 secondary CTA (in workflow card)
- Portfolio: 1 secondary CTA ("Semua Portfolio")
- Service Clusters: 1 secondary CTA per card (3 total, but not in same viewport)
- Closing: 2 CTAs (final conversion point)
- Floating: 1 persistent WhatsApp button

### 5. Service Tab Icons (Requirement 5)

**Current State**: Service tabs display text-only labels without visual differentiation.

**Design Decision**: Add large, prominent icons to each of the 4 service tabs using lucide-react icons.

**Implementation Approach**:

1. **Icon Selection**:
```typescript
const serviceTabIcons = {
  'website': Globe, // or Monitor
  'software': Code2, // or Laptop
  'support': Headphones, // or Wrench
  'printing': Printer,
} as const;
```

2. **Visual Treatment**:
```tsx
<div className="flex items-center gap-4">
  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
    <Icon className="h-8 w-8 text-primary" />
  </div>
  <div>
    <div className="text-sm font-medium">{lane.eyebrow}</div>
    <div className="text-lg font-semibold">{lane.title}</div>
  </div>
</div>
```

3. **Responsive Behavior**:
   - Desktop: 64px icon container with 32px icon
   - Mobile: 48px icon container with 24px icon
   - Maintain consistent spacing and alignment across all tabs

