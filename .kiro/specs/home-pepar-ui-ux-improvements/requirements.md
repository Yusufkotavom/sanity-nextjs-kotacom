# Requirements Document: Home Pepar UI/UX Improvements

## Introduction

The `/home-pepar` page is a hybrid homepage candidate for Kotacom (IT services & printing company in Surabaya). While the page has strong content foundation and effective copy, it requires visual and UX improvements to match the quality of its messaging. This document outlines requirements to address critical visual gaps, reduce excessive whitespace, eliminate duplicate portfolio images, optimize CTA placement, and enhance overall user engagement while maintaining the existing content architecture.

## Glossary

- **Hero_Section**: The primary above-the-fold section containing headline, sub-label, dual CTAs, and trust bar
- **Middle_Section**: Code-owned React component (`home-pepar-middle-section.tsx`) containing services, tech stack, portfolio, and service cards
- **Trust_Bar**: Statistics display showing establishment year (2008), project count (150+), and geographic scope
- **Service_Tab**: Interactive tab component displaying four service categories (Website Dev, Software Dev, IT Support, Printing & Design)
- **Portfolio_Card**: Project showcase card with thumbnail, title, client, industry, year, and description
- **CTA**: Call-to-action button or link prompting user conversion (consultation, contact, WhatsApp)
- **Floating_WhatsApp**: Fixed-position WhatsApp button in bottom-right corner
- **Tech_Stack_Section**: Display of technology badges (React, Next.js, Laravel, PostgreSQL, etc.)
- **Testimonial_Block**: Client feedback section with quote, name, role, and company
- **Service_Cluster_Card**: 2×2 grid card showing service headline, bullet points, and CTA
- **Whitespace**: Vertical padding between major page sections
- **Visual_Hierarchy**: Arrangement of visual elements to guide user attention and comprehension

## Requirements

### Requirement 1: Add Hero Visual Element

**User Story:** As a visitor, I want to see a compelling visual in the hero section, so that I immediately understand the company's professional capability and feel engaged.

#### Acceptance Criteria

1. WHEN the `/home-pepar` page loads, THE Hero_Section SHALL display a hero illustration or image alongside the text card
2. THE Hero_Section SHALL position the visual element on the right side of the hero card OR as a background overlay
3. THE Hero_Section SHALL use generated illustration assets that represent IT services and printing business context
4. THE Hero_Section SHALL maintain responsive layout where the visual adapts to mobile viewport without breaking text readability
5. THE Hero_Section SHALL ensure the visual does not obscure or compete with the primary headline and CTA buttons

### Requirement 2: Eliminate Duplicate Portfolio Images

**User Story:** As a visitor reviewing the portfolio, I want to see unique visuals for each project, so that I can trust the authenticity of the company's work.

#### Acceptance Criteria

1. WHEN the Portfolio_Card collection renders, THE Middle_Section SHALL display unique thumbnail images for each of the 3 portfolio projects
2. THE Middle_Section SHALL NOT use identical images for "IT Infrastructure Upgrade CV Maju Bersama" and "Sistem Manajemen Koperasi Digital"
3. THE Middle_Section SHALL generate or assign project-specific illustrated thumbnails that represent each project's domain
4. FOR ALL Portfolio_Card instances, the thumbnail image SHALL be visually distinct and contextually relevant to the project type
5. THE Middle_Section SHALL maintain consistent illustration style across all portfolio thumbnails

### Requirement 3: Reduce Excessive Section Whitespace

**User Story:** As a visitor scrolling the page, I want sections to feel connected and cohesive, so that the page doesn't feel unnecessarily long or disconnected.

#### Acceptance Criteria

1. WHEN measuring vertical spacing between major sections, THE Middle_Section SHALL use maximum 80px padding between sections
2. THE Middle_Section SHALL reduce the distance between hero card and Trust_Bar from ~200px to 80px or less
3. THE Middle_Section SHALL reduce the distance between Tech_Stack_Section and Portfolio section from ~120px to 80px or less
4. THE Middle_Section SHALL maintain consistent section padding across all major content blocks
5. WHILE preserving visual breathing room, THE Middle_Section SHALL ensure sections feel part of a unified page flow

### Requirement 4: Optimize CTA Placement and Reduce Overload

**User Story:** As a visitor, I want clear primary actions without feeling overwhelmed by too many conversion prompts, so that I can make a decision without confusion.

#### Acceptance Criteria

1. WHEN the Hero_Section renders, THE Hero_Section SHALL display exactly 2 primary CTAs ("Jelajahi Solusi" and "Konsultasi Gratis")
2. WHEN the Services section renders, THE Middle_Section SHALL use subtle secondary CTA styling for "Konsultasi via WhatsApp" and "Lihat semua layanan"
3. THE Middle_Section SHALL limit the number of prominent CTAs visible in a single viewport to maximum 3 conversion touchpoints
4. THE Floating_WhatsApp button SHALL remain as a persistent conversion option but not count toward in-section CTA limits
5. THE Middle_Section SHALL ensure CTA hierarchy is clear: primary (hero) > secondary (section-level) > tertiary (floating)

### Requirement 5: Add Visual Icons to Service Tabs

**User Story:** As a visitor exploring services, I want to see representative icons or illustrations for each service category, so that I can quickly identify and differentiate service types.

#### Acceptance Criteria

1. WHEN the Service_Tab collection renders, THE Middle_Section SHALL display a large icon or mini illustration for each of the 4 service tabs
2. THE Middle_Section SHALL assign contextually appropriate icons for: Company Profile, POS & Dashboard, IT Support, and Print Books services
3. THE Middle_Section SHALL ensure icons are visually prominent and positioned consistently across all tabs
4. THE Middle_Section SHALL use icon style that matches the overall design system (lucide-react or custom illustrations)
5. THE Middle_Section SHALL maintain icon visibility and clarity on both mobile and desktop viewports

### Requirement 6: Clarify Geographic Scope Messaging

**User Story:** As a visitor evaluating service coverage, I want clear and non-contradictory information about where the company operates, so that I can determine if they serve my location.

#### Acceptance Criteria

1. WHEN the Trust_Bar renders, THE Trust_Bar SHALL display either "Based in Surabaya" OR "Serving All Indonesia" instead of "Nasional - Fokus Jatim"
2. THE Trust_Bar SHALL use messaging that is concrete and non-contradictory
3. THE Trust_Bar SHALL maintain the MapPin icon alongside the geographic scope text
4. THE Trust_Bar SHALL ensure the chosen messaging aligns with the company's actual service delivery model
5. THE Trust_Bar SHALL display the geographic scope with consistent typography and visual weight as other trust indicators

### Requirement 7: Add Client Identity to Testimonials

**User Story:** As a visitor reading testimonials, I want to see the client's full identity (name, position, company), so that I can trust the authenticity of the feedback.

#### Acceptance Criteria

1. WHEN the Testimonial_Block renders, THE Middle_Section SHALL display full name, position, and company name for each testimonial
2. THE Testimonial_Block SHALL include an avatar (initial-based or photo) for each testimonial author
3. THE Testimonial_Block SHALL replace generic labels like "Klien Web Development" with actual client names
4. THE Testimonial_Block SHALL maintain visual hierarchy where quote text is primary and identity details are secondary
5. IF actual client names are not available for privacy reasons, THE Middle_Section SHALL use realistic placeholder names with clear indication of anonymization

### Requirement 8: Replace "Home" Link in Navigation

**User Story:** As a visitor using the navigation, I want access to valuable pages instead of redundant links, so that I can efficiently explore the site.

#### Acceptance Criteria

1. WHEN the navigation menu renders, THE Header SHALL NOT display a "Home" link when already on the homepage
2. THE Header SHALL replace the "Home" link with either "About Us" OR "Blog" link
3. THE Header SHALL ensure the replacement link provides access to high-value content not otherwise easily accessible
4. THE Header SHALL maintain consistent navigation structure across desktop and mobile viewports
5. THE Header SHALL ensure the navigation change does not break existing navigation patterns or user expectations

### Requirement 9: Improve Dark Mode Toggle Visibility

**User Story:** As a visitor who prefers dark mode, I want to easily find and use the dark mode toggle, so that I can adjust the interface to my preference.

#### Acceptance Criteria

1. WHEN the Header renders, THE Header SHALL display the dark mode toggle with a text label OR in a more prominent position
2. THE Header SHALL ensure the dark mode toggle is visually discoverable without requiring hover or exploration
3. THE Header SHALL maintain the toggle's functionality while improving its visual prominence
4. THE Header SHALL ensure the toggle is accessible on both desktop and mobile viewports
5. THE Header SHALL use consistent icon and label styling that matches the overall design system

### Requirement 10: Reduce Grid Background Dominance

**User Story:** As a visitor viewing the page, I want the background to support rather than compete with content, so that I can focus on the information and services.

#### Acceptance Criteria

1. WHEN sections render with grid backgrounds, THE Middle_Section SHALL use varied background colors per section to reduce visual monotony
2. THE Middle_Section SHALL ensure grid background patterns do not dominate empty areas or distract from content
3. THE Middle_Section SHALL apply subtle background variations (neutral, sky, amber tones) to different section types
4. THE Middle_Section SHALL maintain sufficient contrast between background and foreground content
5. THE Middle_Section SHALL ensure background treatments enhance rather than compete with visual hierarchy

### Requirement 11: Audit and Enhance Footer for Local SEO

**User Story:** As a visitor or search engine, I want complete business information in the footer, so that I can contact the company or understand their local presence.

#### Acceptance Criteria

1. WHEN the Footer renders, THE Footer SHALL display the complete Surabaya business address
2. THE Footer SHALL display operating hours or business availability information
3. THE Footer SHALL include social media links (Facebook, Instagram, LinkedIn, etc.) with proper icons
4. THE Footer SHALL ensure all contact information is structured for Local SEO optimization
5. THE Footer SHALL maintain consistent styling with the overall page design system

### Requirement 12: Maintain Content Quality and Copy Foundation

**User Story:** As a visitor, I want the improved visual design to preserve the existing high-quality content and messaging, so that I receive both excellent information and excellent presentation.

#### Acceptance Criteria

1. WHEN visual improvements are implemented, THE Middle_Section SHALL preserve all existing headline copy including "Bangun fondasi digital bisnis yang rapi, stabil, dan siap untuk tumbuh"
2. THE Middle_Section SHALL maintain the benefit-oriented, non-technical tone of all service descriptions
3. THE Middle_Section SHALL preserve the 3-step workflow explanation (Understand → Arrange → Execute)
4. THE Middle_Section SHALL maintain all existing service bullets, tech stack items, and trust indicators
5. THE Middle_Section SHALL ensure visual changes enhance rather than replace the strong content foundation

## Requirements Quality Validation

All requirements in this document follow EARS patterns and INCOSE quality rules:

- Active voice with clear system/component names
- No vague terms (all criteria are measurable or verifiable)
- No pronouns (specific component names used throughout)
- Consistent terminology via Glossary
- No escape clauses or absolutes
- Positive statements (focus on what SHALL be done)
- One testable thought per acceptance criterion
- Solution-free at requirements level (implementation details deferred to design phase)
