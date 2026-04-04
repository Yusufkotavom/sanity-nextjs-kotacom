# Implementation Plan: Home Pepar UI/UX Improvements

## Overview

This implementation plan converts the design document into actionable coding tasks for improving the `/home-pepar` page. The tasks address 12 requirements covering hero visuals, portfolio uniqueness, spacing optimization, CTA hierarchy, service icons, navigation improvements, testimonials, footer SEO, and content preservation.

The implementation follows an incremental approach: critical visual fixes first, then CTA and icon improvements, followed by content refinements, and finally navigation and footer enhancements.

## Tasks

- [x] 1. Add hero visual element with split layout
  - Modify the hero section in Sanity CMS or create a hero block in the middle section
  - Implement split layout grid: text content on left, illustration on right
  - Use `next/image` component with `/images/kotacom-split-production-ready/hero/hero-cetak-buku-shark-v2.png`
  - Ensure responsive stacking on mobile (vertical layout)
  - Add proper alt text and priority loading for hero image
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Audit and fix portfolio thumbnail uniqueness
  - [x] 2.1 Audit Sanity project documents for duplicate or missing images
    - Query all projects displayed on `/home-pepar` page
    - Identify projects with missing or duplicate thumbnail images
    - Document project types (website, software, printing) for each project
    - _Requirements: 2.1, 2.2_
  
  - [x] 2.2 Assign unique illustrations to portfolio projects in Sanity
    - Map project types to appropriate service illustrations:
      - Website projects → `/services/website/service-website-*.png`
      - Software/POS projects → `/services/it/service-software-custom-shark.png`
      - Printing projects → `/services/printing/service-cetak-buku-*.png`
    - Update Sanity project documents with unique thumbnail references
    - Verify no two adjacent portfolio cards share the same image
    - _Requirements: 2.3, 2.4, 2.5_

- [x] 3. Optimize section spacing throughout the page
  - Update all `<SectionShell>` components in `home-pepar-middle-section.tsx`
  - Replace `pt-8 lg:pt-12` with `pt-12 lg:pt-16` for consistent spacing
  - Replace `pb-16 lg:pb-20` with `pb-12 lg:pt-16` where applicable
  - Reduce hero-to-trust-bar spacing to maximum 80px
  - Ensure consistent 48px (mobile) / 64px (tablet) / 80px (desktop) spacing
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 4. Optimize CTA hierarchy and reduce overload
  - [x] 4.1 Audit current CTA placement and visual weight
    - Count CTAs per viewport section
    - Identify duplicate WhatsApp CTAs in middle sections
    - Document current button variants and sizes
    - _Requirements: 4.3_
  
  - [x] 4.2 Reduce CTA visual weight in service sections
    - Change workflow card WhatsApp button to `variant="outline"` and `size="sm"`
    - Change "Lihat semua layanan" button to `variant="ghost"` and `size="sm"`
    - Update service cluster card CTAs to use `variant="outline"`
    - Maintain hero CTAs as primary (unchanged)
    - Maintain closing section CTAs as prominent (unchanged)
    - _Requirements: 4.1, 4.2, 4.4, 4.5_

- [x] 5. Add prominent icons to service tabs
  - Update the service lanes grid section in `home-pepar-middle-section.tsx`
  - Increase icon container size from `h-10 w-10` to `h-12 w-12` (desktop)
  - Increase icon size from `h-4 w-4` to `h-6 w-6`
  - Add colored background to icon containers: `bg-primary/10`
  - Ensure icons are visually prominent and contextually appropriate
  - Test responsive behavior on mobile (48px container, 24px icon)
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 6. Clarify geographic scope messaging in trust bar
  - Update trust bar section in `home-pepar-middle-section.tsx`
  - Replace "Nasional - Fokus Jatim" with clear messaging
  - Choose between "Berbasis di Surabaya" or "Melayani Seluruh Indonesia"
  - Maintain MapPin icon and consistent typography
  - Ensure messaging aligns with company's actual service delivery
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 7. Enhance testimonial identity and authenticity
  - [x] 7.1 Add avatar placeholders to testimonial blocks
    - Create initial-based avatar component or use existing avatar UI
    - Add avatar display above or beside testimonial author name
    - Ensure consistent sizing and positioning across all testimonials
    - _Requirements: 7.2_
  
  - [x] 7.2 Replace generic labels with realistic client identities
    - Replace "Klien Web Development" with realistic name (e.g., "Budi Santoso")
    - Replace "Klien IT Support" with realistic name (e.g., "Siti Rahayu")
    - Replace "Klien Percetakan" with realistic name (e.g., "Ahmad Wijaya")
    - Add company context if available (e.g., "PT Maju Jaya")
    - Add disclaimer note if using anonymized names for privacy
    - _Requirements: 7.1, 7.3, 7.4, 7.5_

- [x] 8. Replace "Home" link in navigation with valuable content link
  - Update `frontend/components/header/index.tsx` navigation menu
  - Remove "Home" link when on homepage route
  - Add "About" or "Blog" link in its place
  - Ensure navigation structure is consistent across desktop and mobile
  - Verify link functionality and routing
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9. Improve dark mode toggle visibility
  - Update `frontend/components/header/index.tsx` header component
  - Add text label to dark mode toggle (e.g., "Theme" or "Dark Mode")
  - Increase toggle button size or prominence
  - Ensure toggle is discoverable without hover interaction
  - Maintain functionality across desktop and mobile viewports
  - Use consistent icon and label styling with design system
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [-] 10. Reduce grid background dominance with section tone variation
  - Review current `SectionPanel` tone usage in `home-pepar-middle-section.tsx`
  - Apply varied tones across sections: neutral, sky, amber
  - Ensure sufficient contrast between background and content
  - Verify background patterns support rather than compete with content
  - Test visual hierarchy and readability across all sections
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [~] 11. Audit and enhance footer for local SEO
  - Update `frontend/components/footer.tsx` component
  - Add complete Surabaya business address with proper formatting
  - Add operating hours or business availability information
  - Add social media links (Facebook, Instagram, LinkedIn) with icons
  - Structure contact information for Local SEO optimization (schema markup if applicable)
  - Maintain consistent styling with overall design system
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [~] 12. Validate content preservation across all changes
  - Verify all headline copy is preserved, including "Bangun fondasi digital bisnis yang rapi, stabil, dan siap untuk tumbuh"
  - Verify benefit-oriented, non-technical tone is maintained in all service descriptions
  - Verify 3-step workflow explanation (Understand → Arrange → Execute) is intact
  - Verify all service bullets, tech stack items, and trust indicators are preserved
  - Verify visual changes enhance rather than replace content foundation
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [~] 13. Final checkpoint and cross-browser testing
  - Test all changes on Chrome, Firefox, Safari, and Edge
  - Test responsive behavior on mobile (375px), tablet (768px), and desktop (1440px)
  - Verify accessibility: keyboard navigation, focus states, screen reader compatibility
  - Run Lighthouse audit for performance, accessibility, and SEO scores
  - Ensure all tests pass, ask the user if questions arise

## Notes

- All tasks reference specific requirements for traceability
- Tasks are ordered by priority: critical visual fixes → CTA/icon improvements → content refinements → navigation/footer
- Each task builds incrementally on previous work
- Checkpoint task ensures quality validation before completion
- Content preservation (Task 12) should be validated throughout implementation, not just at the end
