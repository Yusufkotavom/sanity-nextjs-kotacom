# SEO ACTION PLAN

**Date:** 2026-04-04
**Target:** `sanity.kotacom.id`

Based on the full audit, these are the prioritized fixes required to restore SEO parity with the Astro live site and improve rankings (AEO, GEO, and Schema).

## 🔴 Critical Priority (Do This First)

| Issue | Impact | Fix | Verification |
| --- | --- | --- | --- |
| **Dev Site Content Mismatch** | `sanity.kotacom.id` will index for starter template terms rather than commercial keywords | Port live site H1 (`Solusi IT & Digital Terpadu...`) and hero copy. Ensure the `page` document in Sanity for the homepage is updated to reflect real services (Web Dev, Printing, Software). | Check H1 and text content on `/` |
| **Missing Global Meta Data** | Search engines will show "Next.js Sanity CMS Starter" for SERP snippets | Update `seoSettings` in Sanity Studio to default to Kotacom's real title (`kotacom.id - IT Service & Publications Terpercaya`) and description. | Inspect `<title>` and `<meta name="description">` |
| **Missing Structured Data (JSON-LD)** | Loss of rich snippets and AEO visibility | Implement `LocalBusiness` and `Organization` JSON-LD globally on `sanity.kotacom.id` frontend layout. Implement `Service` or `Product` schema on individual service pages. | Validate with Google Rich Results Test |

## ⚠️ High Priority (Do This Next)

| Issue | Impact | Fix | Verification |
| --- | --- | --- | --- |
| **Hreflang Tags Missing** | Incorrect regional targeting for ID language | Add `<link rel="alternate" hreflang="id-id" href="https://kotacom.id/" />` to `<head>`. | Inspect source for `hreflang` |
| **AI Crawler Optimization (llms.txt)** | Missing Answer Engine presence (ChatGPT, Perplexity) | Add `llms.txt` and `llms-full.txt` to `frontend/public/` detailing Kotacom's services and technical specs for LLMs. | `GET /llms.txt` returns 200 OK |
| **Unoptimized Images** | Slower LCP, affecting Core Web Vitals | Ensure all hero and service images use Next.js `<Image>` component for WebP/AVIF auto-conversion and sizing. | Check network payload sizes |

## 🟡 Medium Priority (Ongoing)

| Issue | Impact | Fix | Verification |
| --- | --- | --- | --- |
| **Broken Internal Links** | Crawl traps and wasted crawl budget | Run a broken link checker on the final staged Next.js build. Ensure old Astro routes (`/categories/percetakan`) redirect correctly. | `broken_links.py` reports 0 |
| **Sitemap & Robots Validation** | Sitemaps might include demo/dev routes | Verify `frontend/app/sitemap.ts` does not output `/component-ui` or starter-kit specific dummy routes. | Check `/sitemap.xml` |

---
**Next Step:** I will now start applying the critical content and metadata fixes to the frontend codebase and Sanity setup, following the guidelines in `AGENTS.md` and updating `docs/seo-updates.md`.