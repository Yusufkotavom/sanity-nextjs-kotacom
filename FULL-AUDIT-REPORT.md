# FULL SEO AUDIT REPORT

**Date:** 2026-04-04
**Target Sites:** 
- Live Site: `https://kotacom.id` (Astro legacy)
- Dev Site: `https://sanity.kotacom.id` (Next.js + Sanity migration target)
**Overall Scores:**
- Live Site: **56/100**
- Dev Site: **64/100**

---

## 1. Executive Summary
The migration to Next.js + Sanity (`sanity.kotacom.id`) shows an improvement in foundational SEO scores (from 56 to 64) primarily due to better routing and internal structures provided by the Next.js starter. However, **critical content and metadata mismatch issues** exist on the dev site. The dev site currently holds placeholder text ("Next.js Sanity CMS Starter") instead of the actual commercial business intent ("Solusi IT & Digital Terpadu"). 

## 2. Detailed Findings

### A. Technical SEO & Crawlability (Weight: 25%)
- **Live Site (`kotacom.id`):**
  - **Robots & Security:** Passes basic robots.txt and security header checks.
  - **Broken Links:** Found 13 broken links out of 73 total.
  - **Redirects:** Minimal redirect chains (1 hop).
- **Dev Site (`sanity.kotacom.id`):**
  - **Robots & Security:** Passes basic checks.
  - **Broken Links:** Fewer broken links, but still some present.
  - **AI Crawler Management:** `llms.txt` check indicates missing readiness for AI Search Engines (GEO) on both sites.
  - **Fix:** Ensure `llms.txt` is implemented in the Next.js `public/` directory.

### B. On-Page SEO & Metadata (Weight: 15%)
- **Live Site:** 
  - Title: `kotacom.id - IT Service & Publications Terpercaya`
  - Meta Description: `IT Service & Publications - Pengadaan, Service, Penjualan, Website Development, Software Development, Social Media Management`
  - H1: `Solusi IT & Digital Terpadu untuk Bisnis Anda`
- **Dev Site (Critical Issue):**
  - Title & OG Title: `Next.js Sanity CMS Starter | Kotacom` 
  - Meta Description: `A robust starter template built with Next.js 15 and Sanity CMS, designed to seamlessly integrate with Schema UI components.`
  - H1: `The Perfect Next.js + Sanity CMS Starter Kit`
  - **Impact:** The dev site will index for starter template keywords rather than IT/Printing services.
  - **Fix:** Port the business-specific metadata and H1s from the live site to the Sanity Global SEO settings and frontend overrides.

### C. Schema / Structured Data (Weight: 15%)
- Both sites currently show **`schema: []` (Empty)**.
- **Impact:** Missing out on Answer Engine Optimization (AEO) and Rich Snippets (LocalBusiness, Organization, Service, FAQPage).
- **Fix:** Implement Next.js App Router JSON-LD for `LocalBusiness`, `Organization`, and `WebSite`.

### D. Performance (CWV) (Weight: 10%)
- Core Web Vitals checks failed to complete gracefully in the script, but Next.js App Router typically provides better INP and LCP out of the box compared to older setups if images are optimized. 
- **Fix:** Use Next.js `<Image>` component consistently, especially for the hero sections which currently load from Cloudinary/Sanity CDN.

### E. Content Quality & Uniqueness (Weight: 20%)
- **Live Site:** High commercial keyword density (`IT Support`, `Jasa pembuatan website`, `Cetak Buku`).
- **Dev Site:** Over-indexed on developer terms (`Next.js`, `Sanity`, `Tailwind CSS`, `shadcn/ui`).
- **Fix:** Content rewrite required on the dev site's homepage to reflect the hybrid code-plus-Sanity model discussed in the `AGENTS.md` and `astro-migration-megaplan.md`.

---

## 3. Environment Limitations
- Pagespeed API calls timed out during the automated run. Manual Lighthouse testing is recommended post-deployment.
