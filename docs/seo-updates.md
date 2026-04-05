# SEO Updates Log

## 2026-04-05

### SEO Ops Dashboard Standalone App Split

**Changed files:**
- `seo-dashboard/app/layout.tsx` (new)
- `seo-dashboard/app/page.tsx` (new)
- `seo-dashboard/app/dashboard/seo/*` (moved)
- `seo-dashboard/app/api/seo/*` (moved)
- `seo-dashboard/app/api/ai/*` (moved)
- `seo-dashboard/lib/seo-ops/*` (moved)
- `seo-dashboard/lib/ai-writer/*` (moved)
- `seo-dashboard/sanity/lib/fetch.ts` (new)
- `seo-dashboard/sanity/queries/seo-ops-settings.ts` (new copy)
- `seo-dashboard/sanity/queries/ai-writer-settings.ts` (new copy)
- `seo-dashboard/components/ui/button.tsx` (new copy)
- `seo-dashboard/components/ui/input.tsx` (new copy)
- `seo-dashboard/package.json` (new)
- `seo-dashboard/next.config.mjs` (new)
- `seo-dashboard/middleware.ts` (new)
- `seo-dashboard/.env.example` (new)
- `seo-dashboard/scripts/*` (moved)
- `frontend/app/api/revalidate/route.ts`
- `frontend/package.json`
- `frontend/.env.example`
- `pnpm-workspace.yaml`
- `package.json`
- `docs/astro-migration-megaplan.md`
- `docs/sanity-redirect-management.md`
- `docs/gsc-priority-export.md`

**Summary:**
Moved the SEO Ops dashboard UI + API into a new standalone Next.js app (`seo-dashboard`) with its own scripts, Sanity fetch layer, and middleware auth gate. Removed the dashboard routes and SEO ops API endpoints from `frontend` and updated workspace wiring/scripts accordingly.

**Impact on SEO/Integration:**
- Frontend revalidate webhook no longer triggers SEO indexing submissions; that automation now lives only in the standalone dashboard app. If needed, revalidate should call the dashboard service explicitly.

**Verification:**
- Not run (manual start/build not executed).

---

### Multi-Level Service Location Pattern Support

**Changed files:**
- `frontend/sanity/queries/template-page.ts`
- `frontend/sanity/lib/fetch.ts`
- `studio/inputs/auto-route-input.tsx`
- `frontend/scripts/seed-service-location-examples.mjs` (new)

**Summary:**
Implemented support for multi-level URL patterns with service + location tokens using existing `service` document type:

1. **Pattern Support:**
   - 2-level: `/{category}/{lokasi}` (existing)
   - 3-level: `/{category}/{service}/{lokasi}` (new)
   - Examples:
     - `/pembuatan-website/toko-online/surabaya`
     - `/software/apotik/bandung`
     - `/percetakan/cetak-buku/jakarta`

2. **Query Enhancement:**
   - Updated `TEMPLATE_PAGE_BY_PATTERN_QUERY` to support optional `$service` parameter
   - Query now matches both service slug and location slug
   - Backward compatible with existing 2-level patterns

3. **Fetch Logic:**
   - Smart pattern detection tries 3-level first, then falls back to 2-level
   - Extracts service and city from URL segments automatically
   - Caching tags include service slug for granular revalidation

4. **Auto-Route Input:**
   - Now handles both `{service}` and `{lokasi}` tokens
   - Falls back to `slug` field if service not selected
   - Real-time preview shows computed route

5. **Using Existing Service Document:**
   - Leverages existing `service` document type (no new schema needed)
   - Service already has: title, slug, excerpt, pricing, duration, categories
   - ServiceLocation references service for reusable service definitions
   - Visible in Studio under "Services" menu

6. **Seed Examples:**
   - Service docs: toko-online, company-profile, apotik, klinik
   - Location docs: Jakarta, Bandung (added to existing Surabaya)
   - ServiceLocation docs with 3-level patterns
   - Complete with SEO keywords, FAQs, highlights

**How to Use in Studio:**
1. Create/select Service document (e.g., "Software Apotik")
2. Create ServiceLocation document
3. Set `routePattern`: `/software/{service}/{lokasi}`
4. Select Service reference (apotik)
5. Select Location reference (bandung)
6. Route auto-generates: `/software/apotik/bandung`

**Impact on SEO/Integration:**
- Enables scalable city + service combinations (e.g., 4 services × 34 cities = 136 pages)
- Each combination gets unique SEO content via template + overrides
- Service reference allows centralized service info management
- Location reference provides local context automatically
- Pattern matching ensures clean URLs without query parameters

**Verification:**
- ✅ Query supports optional service parameter
- ✅ Fetch logic tries 3-level then 2-level patterns
- ✅ Auto-route input handles multi-token replacement
- ✅ Service document already exists and visible in Studio
- ✅ Seed script executed: 4 services + 2 locations + 3 serviceLocations created
- ✅ Test URLs active:
  - `/pembuatan-website/toko-online/surabaya`
  - `/pembuatan-website/company-profile/jakarta`
  - `/software/apotik/bandung`

**Next Steps:**
- Scale to more services and cities
- Add service-specific content templates
- Implement service category filtering

---

## 2026-04-05

### Template System Enhancement - Complete Content & Link Format

**Changed files:**
- `frontend/scripts/seed-template-samples.mjs`
- `frontend/components/ui/rewrite/landing-sections/features-section.tsx`
- `frontend/components/ui/rewrite/landing-sections/proof-section.tsx`

**Summary:**
Enhanced template seed data with complete, production-ready content and proper link formatting:

1. **Complete Content for All Templates:**
   - Expanded all text fields with detailed, relevant content
   - Added 4-5 secondary keywords with {lokasi} token for SEO
   - Filled all sections: highlights (5 items), E-E-A-T (4 points), process (4 steps), FAQs (4 items)
   - Added 3 pricing tiers with detailed feature lists
   - Expanded testimonials, proof items, and long guides
   - All content uses {lokasi} token for automatic city injection

2. **Fixed Link Format (Critical):**
   - All links now use `isExternal: true` with `href` property
   - Applied to: ctaLink, ctaLinks, serviceTypes links, proofItems links
   - Prevents validation errors in Sanity Studio
   - Editors can now safely use templates without link errors

3. **Auto WhatsApp CTA Buttons:**
   - Added WA buttons to Features section (per feature)
   - Added WA buttons to Proof section (per portfolio item)
   - Pricing section already had WA buttons (preserved)
   - All use GlobalWhatsAppButton with contextual messages

4. **SEO Keyword Clustering:**
   - Each template now has 4-5 location-aware secondary keywords
   - Keywords automatically inject city name via {lokasi} token
   - Examples: "Cetak buku {lokasi}", "Web developer {lokasi}"
   - Supports high-intent local SEO targeting

**Impact on SEO/Integration:**
- Improved local SEO with keyword clustering (4-5 variations per template)
- E-E-A-T signals strengthened with detailed credibility content
- More conversion touchpoints with distributed WA CTAs
- Editors can now use templates immediately without filling from scratch
- Link format compliance prevents Studio validation errors

**Verification:**
- ✅ All links use isExternal format
- ✅ All content fields populated with relevant data
- ✅ {lokasi} tokens placed strategically for city injection
- ✅ WA buttons added to Features and Proof sections
- ✅ Ready for: `node --env-file=../vercel-frontend.env scripts/seed-template-samples.mjs --write`

---
