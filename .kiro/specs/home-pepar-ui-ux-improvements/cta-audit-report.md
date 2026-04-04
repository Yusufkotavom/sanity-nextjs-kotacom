# CTA Audit Report: Home Pepar Page

**Date**: 2025-01-XX  
**Target File**: `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`  
**Requirement**: 4.3 - Document current CTA placement and visual weight  
**Auditor**: Kiro AI Agent

---

## Executive Summary

The `/home-pepar` page currently contains **11 distinct CTAs** across 7 major sections, with **3 WhatsApp CTAs** creating potential conversion confusion. The page exhibits CTA overload with multiple prominent buttons competing for attention in the same viewport, particularly in the middle sections.

### Key Findings

- **Total CTAs**: 11 conversion touchpoints (excluding floating WhatsApp)
- **WhatsApp CTAs**: 3 instances (Hero, Workflow Card, Closing Section)
- **Primary CTAs**: 2 (Hero section only)
- **Secondary CTAs**: 9 (distributed across 5 sections)
- **CTA Density**: Up to 4 CTAs visible in single viewport (Services section)
- **Visual Weight Issues**: Inconsistent button variants create unclear hierarchy

---

## Section-by-Section CTA Inventory

### 1. Hero Section (Lines 35-95)

**Viewport Position**: Above the fold  
**Section Type**: Primary conversion zone

| CTA Label | Variant | Size | Link Target | Visual Weight | Notes |
|-----------|---------|------|-------------|---------------|-------|
| "Jelajahi Solusi" | `default` | default | `/layanan` | **High** | Primary CTA |
| "Konsultasi Gratis" | `outline` | default | WhatsApp | **High** | Primary CTA (WhatsApp #1) |

**Analysis**:
- ✅ Appropriate CTA count (2) for hero section
- ✅ Clear visual hierarchy with variant differentiation
- ✅ Both CTAs are prominent and action-oriented
- ⚠️ First of three WhatsApp CTAs on page

---

### 2. Trust Bar / Stats Section (Lines 98-127)

**Viewport Position**: Below hero  
**Section Type**: Trust indicator

| CTA Count | Notes |
|-----------|-------|
| 0 | No CTAs - appropriate for trust-building section |

**Analysis**:
- ✅ No CTAs - allows focus on credibility indicators
- ✅ Proper use of non-conversion section

---

### 3. Services Overview + Workflow Card (Lines 129-217)

**Viewport Position**: Mid-page (first scroll)  
**Section Type**: Service introduction with conversion prompt

| CTA Label | Variant | Size | Link Target | Visual Weight | Location |
|-----------|---------|------|-------------|---------------|----------|
| Service Lane Cards (4×) | N/A | N/A | Various `/layanan/*` | **Medium** | Clickable cards (not buttons) |
| "Konsultasi via WhatsApp" | Custom green | default | WhatsApp | **Very High** | Workflow card (WhatsApp #2) |
| "Lihat semua layanan" | `outline` | default | `/layanan` | **High** | Workflow card |

**Analysis**:
- ⚠️ **CTA Overload**: 6 conversion touchpoints in one section (4 card links + 2 buttons)
- ⚠️ **Duplicate WhatsApp CTA**: Second WhatsApp button (after hero)
- ⚠️ **Visual Weight Issue**: Green WhatsApp button (`bg-green-500`) is more prominent than hero CTAs
- ⚠️ **Hierarchy Confusion**: Both buttons in workflow card have high visual weight
- 📊 **Viewport Density**: 4-6 CTAs potentially visible simultaneously on desktop

**Recommendation**: Reduce visual weight of both workflow card CTAs to `variant="ghost"` or `variant="outline"` with `size="sm"`

---

### 4. Tech Stack Section (Lines 219-235)

**Viewport Position**: Mid-page  
**Section Type**: Technology showcase

| CTA Count | Notes |
|-----------|-------|
| 0 | No CTAs - appropriate for informational section |

**Analysis**:
- ✅ No CTAs - allows focus on technology credibility
- ✅ Proper use of non-conversion section

---

### 5. Portfolio Preview Section (Lines 238-260)

**Viewport Position**: Mid-page  
**Section Type**: Project showcase

| CTA Label | Variant | Size | Link Target | Visual Weight | Visibility |
|-----------|---------|------|-------------|---------------|------------|
| "Semua Portfolio" | `outline` | default | `/projects` | **High** | Desktop only (hidden on mobile) |
| "Semua Portfolio" | `outline` | default | `/projects` | **High** | Mobile only (full width) |

**Analysis**:
- ✅ Single CTA appropriate for portfolio section
- ✅ Responsive handling (desktop vs mobile placement)
- ✅ Outline variant provides appropriate secondary weight
- ℹ️ Technically 2 CTAs but only 1 visible per viewport

---

### 6. Service Lanes Detail Section (Lines 262-310)

**Viewport Position**: Lower mid-page  
**Section Type**: Detailed service descriptions

| CTA Label | Variant | Size | Link Target | Visual Weight | Count |
|-----------|---------|------|-------------|---------------|-------|
| "Buka lane" | `outline` | default | Various `/layanan/*` | **High** | 4× (one per lane card) |

**Analysis**:
- ⚠️ **CTA Density**: 4 identical CTAs in grid layout
- ⚠️ **Visual Weight**: All 4 buttons have high prominence (`outline` variant)
- 📊 **Viewport Density**: 2-4 CTAs visible simultaneously depending on screen size
- ℹ️ Cards are in 2-column grid (desktop), so 2 CTAs typically visible at once

**Recommendation**: Consider reducing to `variant="ghost"` or using text links instead

---

### 7. Highlights Section (Lines 312-343)

**Viewport Position**: Lower mid-page  
**Section Type**: Value proposition

| CTA Count | Notes |
|-----------|-------|
| 0 | No CTAs - appropriate for value communication section |

**Analysis**:
- ✅ No CTAs - allows focus on value propositions
- ✅ Proper use of non-conversion section

---

### 8. Testimonials Section (Lines 346-365)

**Viewport Position**: Lower page  
**Section Type**: Social proof

| CTA Count | Notes |
|-----------|-------|
| 0 | No CTAs - appropriate for testimonial section |

**Analysis**:
- ✅ No CTAs - allows focus on client feedback
- ✅ Proper use of social proof section

---

### 9. Service Clusters Section (Lines 367-410)

**Viewport Position**: Lower page  
**Section Type**: Featured service offerings

| CTA Label | Variant | Size | Link Target | Visual Weight | Count |
|-----------|---------|------|-------------|---------------|-------|
| "Lihat detail" | `outline` | default | Various service pages | **High** | 3× (one per cluster card) |

**Analysis**:
- ⚠️ **CTA Density**: 3 identical CTAs in grid layout
- ⚠️ **Visual Weight**: All 3 buttons have high prominence (`outline` variant)
- 📊 **Viewport Density**: 1-3 CTAs visible simultaneously depending on screen size
- ℹ️ Cards are in 3-column grid (desktop), so all 3 CTAs potentially visible at once

**Recommendation**: Consider reducing to `variant="ghost"` or smaller size

---

### 10. Closing / Final CTA Section (Lines 412-458)

**Viewport Position**: Bottom of page  
**Section Type**: Final conversion zone

| CTA Label | Variant | Size | Link Target | Visual Weight | Notes |
|-----------|---------|------|-------------|---------------|-------|
| "Konsultasi Sekarang" | Custom green | default | WhatsApp | **Very High** | WhatsApp #3 |
| "Kirim Brief Kebutuhan" | `outline` | default | `/contact` | **High** | Alternative conversion path |

**Analysis**:
- ✅ Appropriate CTA count (2) for closing section
- ⚠️ **Third WhatsApp CTA**: Duplicate conversion path
- ⚠️ **Visual Weight Issue**: Green WhatsApp button is extremely prominent
- ✅ Provides alternative conversion path (contact form)
- ℹ️ Final conversion opportunity before footer

---

## CTA Visual Weight Analysis

### Button Variant Distribution

| Variant | Count | Visual Weight | Usage |
|---------|-------|---------------|-------|
| `default` (primary) | 1 | **Very High** | Hero primary CTA only |
| `outline` | 9 | **High** | Hero secondary, portfolio, lanes, clusters, closing |
| Custom green (`bg-green-500`) | 2 | **Very High** | WhatsApp CTAs (workflow + closing) |
| `ghost` | 0 | **Low** | Not currently used |

### Visual Weight Issues

1. **Custom Green Buttons Dominate**: The `bg-green-500` WhatsApp buttons have higher visual weight than the hero primary CTA
2. **Too Many High-Weight CTAs**: 9 `outline` variant buttons create visual noise
3. **No Low-Weight CTAs**: Missing `ghost` or `link` variants for secondary actions
4. **Inconsistent Hierarchy**: Section-level CTAs compete with primary hero CTAs

---

## WhatsApp CTA Analysis

### WhatsApp CTA Instances

| Location | Label | Variant | Visual Weight | Distance from Previous |
|----------|-------|---------|---------------|------------------------|
| Hero | "Konsultasi Gratis" | `outline` | High | N/A (first) |
| Workflow Card | "Konsultasi via WhatsApp" | Custom green | **Very High** | ~800px scroll |
| Closing Section | "Konsultasi Sekarang" | Custom green | **Very High** | ~2000px scroll |

### WhatsApp CTA Issues

1. **Redundancy**: 3 WhatsApp CTAs for the same action (open WhatsApp chat)
2. **Visual Confusion**: Different labels for identical action
3. **Hierarchy Violation**: Mid-page WhatsApp CTA is more prominent than hero CTA
4. **Floating Button Ignored**: Page has persistent floating WhatsApp button (not counted in this audit)

**Recommendation**: Remove or significantly reduce visual weight of middle WhatsApp CTAs

---

## Viewport Density Analysis

### Maximum CTAs Per Viewport

| Viewport Size | Section | Max Visible CTAs | Issue Level |
|---------------|---------|------------------|-------------|
| Desktop (1440px) | Services Overview | 6 (4 cards + 2 buttons) | 🔴 Critical |
| Desktop (1440px) | Service Clusters | 3 buttons | 🟡 Moderate |
| Desktop (1440px) | Service Lanes | 4 buttons | 🟡 Moderate |
| Tablet (768px) | Services Overview | 4-5 | 🟡 Moderate |
| Mobile (375px) | Services Overview | 2-3 | 🟢 Acceptable |

**Critical Issue**: Services Overview section can show up to 6 conversion touchpoints simultaneously on desktop, violating the "maximum 3 CTAs per viewport" requirement (Requirement 4.3).

---

## Button Size Analysis

### Current Size Distribution

| Size | Count | Usage |
|------|-------|-------|
| Default | 11 | All CTAs use default size |
| `sm` | 0 | Not currently used |
| `lg` | 0 | Not currently used |

**Issue**: No size differentiation to establish hierarchy. All buttons have equal visual weight from size perspective.

**Recommendation**: Use `size="sm"` for secondary CTAs in middle sections.

---

## Compliance with Requirements

### Requirement 4.3: Limit CTAs per viewport to maximum 3

| Section | Current CTA Count | Compliant | Notes |
|---------|-------------------|-----------|-------|
| Hero | 2 | ✅ Yes | Within limit |
| Services Overview | 6 | ❌ No | Exceeds limit by 3 |
| Portfolio | 1 | ✅ Yes | Within limit |
| Service Lanes | 4 (2 visible) | ✅ Yes | 2-column grid |
| Service Clusters | 3 | ✅ Yes | At limit |
| Closing | 2 | ✅ Yes | Within limit |

**Overall Compliance**: ❌ **Non-compliant** - Services Overview section violates requirement

---

## Recommendations Summary

### High Priority (Critical)

1. **Remove or reduce visual weight of middle WhatsApp CTA** (Workflow card)
   - Change from `bg-green-500` to `variant="outline"` or `variant="ghost"`
   - Reduce size to `size="sm"`
   - Consider removing entirely (hero + closing + floating button sufficient)

2. **Reduce visual weight of workflow card CTAs**
   - Change "Lihat semua layanan" to `variant="ghost"` and `size="sm"`
   - Reduces Services Overview section from 6 to 4 effective CTAs

3. **Reduce visual weight of service lane CTAs**
   - Change "Buka lane" buttons to `variant="ghost"` or text links
   - Reduces visual competition with primary CTAs

### Medium Priority (Important)

4. **Reduce visual weight of service cluster CTAs**
   - Change "Lihat detail" buttons to `variant="ghost"` or `size="sm"`
   - Maintains conversion path with lower visual weight

5. **Standardize WhatsApp CTA labels**
   - Use consistent label across all instances
   - Suggested: "Konsultasi via WhatsApp" (most descriptive)

6. **Consider removing closing section WhatsApp CTA**
   - Floating WhatsApp button provides persistent access
   - Closing section could focus on contact form path only

### Low Priority (Enhancement)

7. **Add visual hierarchy through size differentiation**
   - Hero CTAs: `size="lg"` (increase prominence)
   - Section CTAs: `size="sm"` (reduce prominence)

8. **Consider converting some buttons to text links**
   - Service lane cards could use text links instead of buttons
   - Reduces visual noise while maintaining navigation

---

## Visual Weight Hierarchy Proposal

### Recommended CTA Hierarchy

| Priority | Variant | Size | Usage | Count |
|----------|---------|------|-------|-------|
| Primary | `default` | `lg` | Hero primary action | 1 |
| Primary Alt | `outline` | `lg` | Hero secondary action | 1 |
| Secondary | `outline` | `sm` | Section-level conversions | 2-3 |
| Tertiary | `ghost` | `sm` | Low-priority actions | 4-6 |
| Persistent | Custom | default | Floating WhatsApp | 1 |

**Total Recommended**: 8-11 CTAs (down from current 11, but with clearer hierarchy)

---

## Implementation Checklist for Task 4.2

Based on this audit, Task 4.2 should implement:

- [ ] Change workflow card WhatsApp button to `variant="outline"` and `size="sm"`
- [ ] Change "Lihat semua layanan" button to `variant="ghost"` and `size="sm"`
- [ ] Change service lane "Buka lane" buttons to `variant="ghost"`
- [ ] Change service cluster "Lihat detail" buttons to `variant="outline"` and `size="sm"`
- [ ] Consider removing workflow card WhatsApp CTA entirely
- [ ] Verify hero CTAs remain unchanged (primary visual weight)
- [ ] Verify closing section CTAs remain prominent (final conversion)
- [ ] Test viewport density after changes (should not exceed 3 prominent CTAs)

---

## Appendix: Code References

### Hero CTAs (Lines 86-93)
```tsx
<Button asChild variant="default">
  <Link href="/layanan">Jelajahi Solusi</Link>
</Button>
<GlobalWhatsAppButton
  label="Konsultasi Gratis"
  variant="outline"
/>
```

### Workflow Card CTAs (Lines 203-210)
```tsx
<GlobalWhatsAppButton
  label="Konsultasi via WhatsApp"
  className="rounded-full bg-green-500 text-white hover:bg-green-600"
/>
<Button asChild variant="outline">
  <Link href="/layanan">Lihat semua layanan</Link>
</Button>
```

### Service Lane CTAs (Lines 304-308)
```tsx
<Button asChild variant="outline">
  <Link href={lane.href}>Buka lane</Link>
</Button>
```

### Service Cluster CTAs (Lines 404-408)
```tsx
<Button asChild variant="outline">
  <Link href={cluster.href}>Lihat detail</Link>
</Button>
```

### Closing CTAs (Lines 449-455)
```tsx
<GlobalWhatsAppButton
  label="Konsultasi Sekarang"
  className="rounded-full bg-green-500 text-white hover:bg-green-600"
/>
<Button asChild variant="outline">
  <Link href="/contact">Kirim Brief Kebutuhan</Link>
</Button>
```

---

**End of Audit Report**
