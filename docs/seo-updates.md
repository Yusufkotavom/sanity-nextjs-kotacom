# SEO Updates Log

## 2026-04-05

### Ops Dashboard MVP + Worker Scheduler

**Changed files:**
- `.github/workflows/ci.yml`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `packages/db/src/schema.ts`
- `packages/db/src/index.ts`
- `packages/ai/src/index.ts`
- `packages/search/src/index.ts`
- `packages/seo/src/index.ts`
- `packages/content/src/index.ts`
- `packages/sanity/src/index.ts`
- `worker/src/index.ts`
- `worker/wrangler.toml`
- `seo-dashboard/app/api/internal/cron-run/route.ts`
- `seo-dashboard/app/api/internal/content-published-webhook/route.ts`
- `seo-dashboard/app/api/internal/revalidate/route.ts`
- `seo-dashboard/app/api/templates/preview/route.ts`
- `seo-dashboard/app/api/templates/bulk-generate/route.ts`
- `seo-dashboard/app/api/ai/generate/route.ts`
- `seo-dashboard/app/api/ai/retry-parse/route.ts`
- `seo-dashboard/app/api/ai/push-to-sanity/route.ts`
- `seo-dashboard/app/api/seo/audit/route.ts`
- `seo-dashboard/app/api/seo/report/route.ts`
- `seo-dashboard/app/api/search/indexnow-submit/route.ts`
- `seo-dashboard/app/api/search/sitemap-submit/route.ts`
- `seo-dashboard/app/api/search/inspect/route.ts`
- `seo-dashboard/app/api/search/status/route.ts`
- `seo-dashboard/app/api/jobs/run-now/route.ts`
- `seo-dashboard/app/api/jobs/retry/route.ts`
- `seo-dashboard/middleware.ts`
- `seo-dashboard/components/app-sidebar.tsx`
- `seo-dashboard/components/seo-login-form.tsx`
- `seo-dashboard/components/templates-panel.tsx`
- `seo-dashboard/components/job-retry-button.tsx`
- `seo-dashboard/components/ai-actions.tsx`
- `seo-dashboard/app/dashboard/layout.tsx`
- `seo-dashboard/app/dashboard/page.tsx`
- `seo-dashboard/app/dashboard/jobs/page.tsx`
- `seo-dashboard/app/dashboard/templates/page.tsx`
- `seo-dashboard/app/dashboard/ai/page.tsx`
- `seo-dashboard/app/dashboard/seo/page.tsx`
- `seo-dashboard/app/dashboard/search/page.tsx`
- `seo-dashboard/app/dashboard/analytics/page.tsx`
- `seo-dashboard/components/ui/card.tsx`
- `seo-dashboard/components/ui/badge.tsx`
- `seo-dashboard/components/ui/table.tsx`
- `seo-dashboard/components/ui/textarea.tsx`
- `seo-dashboard/components/ui/select.tsx`
- `seo-dashboard/components/ui/label.tsx`

**Summary:**
Implemented the ops dashboard MVP architecture (shared packages, cron-driven worker, new API endpoints, and shadcn/Geist UI). Added scheduler hooks for sitemap submit, analytics pulls, and index inspection. Rebuilt the dashboard navigation/layout with new Jobs/Templates/AI/SEO/Search/Analytics screens and action buttons, plus auth middleware coverage for the new routes.

**Impact on SEO/Integration:**
- Adds Sanity webhook intake to mirror content into ops DB and enqueue SEO/search jobs.
- Adds scheduler + queue consumers for sitemap submission, analytics snapshots, and URL inspection.
- No direct SEO impact on the public frontend; ops-only.

**Verification:**
- Not run (build/test/manual check pending).

---

### SEO Dashboard Middleware Edge Fix

**Changed files:**
- `seo-dashboard/middleware.ts`
- `seo-dashboard/app/page.tsx`
- `seo-dashboard/components/seo-login-form.tsx`
- `seo-dashboard/app/dashboard/seo/login/page.tsx`
- `seo-dashboard/.env` (symlink)

**Summary:**
Adjusted middleware auth gate to avoid `node:crypto` usage in Edge runtime by validating cookie presence only (API routes still verify signatures server-side). Root now renders the SEO login form directly, and `/dashboard/seo/login` reuses the same form for consistency. SEO dashboard now reads environment variables from `frontend/.env` via a symlinked `seo-dashboard/.env`.

**Impact on SEO/Integration:**
- No direct SEO impact (dashboard-only).

**Verification:**
- Not run (build check pending).

---

### SEO Dashboard Sidebar UI

**Changed files:**
- `seo-dashboard/components/app-sidebar.tsx`
- `seo-dashboard/components/ui/sidebar.tsx` (added via shadcn)
- `seo-dashboard/components/ui/breadcrumb.tsx` (added via shadcn)
- `seo-dashboard/components/ui/separator.tsx` (added via shadcn)
- `seo-dashboard/components/ui/sheet.tsx` (added via shadcn)
- `seo-dashboard/components/ui/skeleton.tsx` (added via shadcn)
- `seo-dashboard/components/ui/tooltip.tsx` (added via shadcn)
- `seo-dashboard/components/ui/button.tsx` (added via shadcn)
- `seo-dashboard/components/ui/input.tsx` (added via shadcn)
- `seo-dashboard/hooks/use-mobile.ts` (added via shadcn)
- `seo-dashboard/app/dashboard/seo/layout.tsx`
- `seo-dashboard/app/layout.tsx`
- `seo-dashboard/app/dashboard/page.tsx` (added via shadcn)
- `seo-dashboard/app/globals.css` (updated via shadcn)
- `seo-dashboard/components.json` (added via shadcn)

**Summary:**
Applied shadcn sidebar layout (`sidebar-03`) to the SEO dashboard, replacing the old left-column navigation with a collapsible sidebar + breadcrumb header pattern.

**Impact on SEO/Integration:**
- No direct SEO impact (dashboard-only UI).

**Verification:**
- Not run (manual UI check pending).

---

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
- `seo-dashboard/app/api/seo/indexing/webhook/route.ts` (new)
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
Moved the SEO Ops dashboard UI + API into a new standalone Next.js app (`seo-dashboard`) with its own scripts, Sanity fetch layer, and middleware auth gate. Removed the dashboard routes and SEO ops API endpoints from `frontend` and updated workspace wiring/scripts accordingly. Added a secure webhook endpoint in the dashboard and reconnected frontend revalidate to trigger indexing via that webhook when configured.

**Impact on SEO/Integration:**
- Frontend revalidate webhook can optionally trigger SEO indexing submissions via the dashboard webhook when `SEO_DASHBOARD_URL` + `SEO_DASHBOARD_WEBHOOK_SECRET` are set.

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

## 2026-04-05

### ServiceType Document Implementation - Prevent Duplicate Pages

**Changed files:**
- `studio/schemas/documents/service-type.ts` (new)
- `studio/schemas/documents/service-location.ts` (updated)
- `studio/schema-types.ts` (updated)
- `studio/structure.ts` (updated)
- `frontend/sanity/queries/template-page.ts` (updated)
- `studio/inputs/auto-route-input.tsx` (updated)
- `frontend/scripts/migrate-all-local-to-sanity.mjs` (updated)
- `frontend/scripts/cleanup-and-remigrate-servicetypes.mjs` (new)
- `frontend/scripts/create-missing-servicetypes.mjs` (new)
- `frontend/scripts/check-sanity-state.mjs` (new)

**Summary:**
Created separate `serviceType` document type to prevent duplicate pages at `/services/{slug}` routes:

1. **Problem Identified:**
   - Services created as `service` type would generate standalone pages at `/services/{slug}`
   - This created duplicate pages for reference-only service data
   - Example: `/services/cetak-kalender` would exist alongside `/percetakan/cetak-kalender/{city}`

2. **Solution - ServiceType Document:**
   - Created new `serviceType` document type for reference-only data
   - Schema includes: title, slug, category, description, pricing, sortOrder
   - No route field - prevents standalone page generation
   - Used exclusively for location-based page references

3. **Schema Updates:**
   - `serviceLocation` now supports both `service` and `serviceType` references (mutually exclusive)
   - Hidden field logic prevents selecting both simultaneously
   - Queries fetch both types and prioritize serviceType slug
   - Auto-route input uses serviceType slug when available

4. **Migration Process:**
   - Created 25 serviceType documents from local manifest data
   - Categories: pembuatan-website (8), percetakan (14), software (3)
   - Updated 3 serviceLocation docs to reference serviceType instead of service
   - Deleted 9 old service documents that were reference-only
   - Added 3 missing serviceTypes: apotik, company-profile, toko-online

5. **Data Integrity:**
   - All serviceLocation documents now use serviceType references
   - No orphaned service references remain
   - No duplicate pages at `/services/` routes
   - All test URLs working correctly with serviceType

**Impact on SEO/Integration:**
- Prevents duplicate content issues from multiple URLs for same service
- Clean URL structure: location-based pages only (no standalone service pages)
- Scalable: can add unlimited service types without creating unwanted pages
- Maintains SEO value in location-specific URLs only
- No impact on existing page functionality

**Verification:**
- ✅ 28 serviceType documents created
- ✅ 0 old service documents remain
- ✅ 0 serviceLocation docs with old service references
- ✅ No pages exist at `/services/` routes
- ✅ Test URLs working:
  - `/software/apotik/bandung`
  - `/pembuatan-website/company-profile/jakarta`
  - `/pembuatan-website/toko-online/surabaya`
- ✅ ServiceType documents have no route field (reference-only)

**Next Steps:**
- Scale to more serviceType + location combinations
- Remove local hardcoded data after full migration verification
- Update content status from 'draft' to 'index' when ready for production

---

## 2026-04-05

### Local to Sanity Migration - Preparation Complete

**Changed files:**
- `docs/url-comparison-local-vs-sanity.md` (new)
- `docs/local-cleanup-plan.md` (new)
- `frontend/scripts/compare-local-vs-sanity-urls.mjs` (new)
- `frontend/scripts/migrate-remaining-urls-to-sanity.mjs` (new)

**Summary:**
Prepared comprehensive migration plan and tools to move all local URLs to Sanity:

1. **URL Comparison Report:**
   - Created detailed comparison between local manifest (104 URLs) and Sanity (6 URLs)
   - Identified 101 URLs that need migration
   - Categorized by type: 8 static, 68 city-based, 25 service pages
   - Report saved to `docs/url-comparison-local-vs-sanity.md`

2. **Cleanup Plan:**
   - Documented 4-phase cleanup strategy
   - Phase 1 (Documentation): ✅ Complete
   - Phase 2 (Migration): Ready to execute
   - Phase 3 (Route Updates): Pending
   - Phase 4 (Archive Local): Pending
   - Plan saved to `docs/local-cleanup-plan.md`

3. **Migration Script:**
   - Created bulk migration script for remaining 101 URLs
   - Handles 3 types: static pages, city-based pageLocations, service pages
   - Smart serviceType matching (tries exact slug, then without prefix)
   - Dry run tested successfully - all 101 URLs ready
   - Includes 1-3 second delays to avoid rate limiting

4. **Migration Readiness:**
   - ✅ 34 locations exist in Sanity
   - ✅ 28 serviceTypes exist in Sanity
   - ✅ 4 templates exist in Sanity
   - ✅ Script tested in dry run mode
   - ✅ All dependencies verified
   - Ready to execute: `node --env-file=../vercel-frontend.env scripts/migrate-remaining-urls-to-sanity.mjs --write`

**Impact on SEO/Integration:**
- No immediate impact (preparation only)
- Once migrated: all 104 URLs will be Sanity-managed
- Enables removal of local hardcoded data
- Simplifies content management workflow
- Improves scalability for future location/service combinations

**Verification:**
- ✅ Comparison script executed successfully
- ✅ Migration script dry run: 101 URLs ready
- ✅ 0 skipped URLs (all dependencies met)
- ✅ ServiceType slug matching works correctly
- ⏳ Actual migration pending user approval

**Decision: Keep Local Data Until Migration Complete**
- Local data serves as source of truth for migration
- 97% of pages still depend on local data
- Premature removal would break existing pages
- Will archive after successful migration and verification

---

## 2026-04-05

### Local Data Cleanup - Content Generators Archived ✅

**Changed files:**
- `frontend/lib/legacy-pages/content/` → `frontend/lib/legacy-pages/archive/content-generators/`
- `frontend/lib/legacy-pages/astro-static.ts` (added deprecation notice)
- `frontend/lib/legacy-pages/rewrite-content.ts` (updated imports to archive)
- `frontend/lib/legacy-pages/README.md` (new - deprecation documentation)
- `frontend/lib/legacy-pages/archive/README.md` (new - archive documentation)
- `frontend/scripts/generate-astro-local-pages-manifest.mjs` → `archive-generate-astro-local-pages-manifest.mjs`
- `docs/LOCAL-DATA-ARCHIVE-PLAN.md` (new)

**Summary:**
Cleaned up local data by archiving deprecated content generators while keeping route handlers functional:

1. **Content Generators Archived:**
   - Moved `content/` folder to `archive/content-generators/`
   - All content now managed in Sanity CMS
   - No longer need code-based content generation
   - Fixed all import paths to point to archive

2. **Deprecation Notices Added:**
   - Added deprecation comments to `astro-static.ts`
   - Created comprehensive README in legacy-pages folder
   - Documented that Sanity is now source of truth
   - Marked manifest generator script as archived

3. **What's Archived:**
   - Content generation logic (core.ts, registry.ts, etc.)
   - Service-specific generators (website.ts, software.ts, printing.ts)
   - Page-specific generators (printing-pages/, software-pages/)
   - Manifest generation script

4. **What's Kept (Still in Use):**
   - `astro-static-manifest.json` - Route manifest (deprecated but functional)
   - `astro-static.ts` - Helper functions (deprecated but functional)
   - `metadata.ts` - Metadata generation (still used by routes)
   - `internal-links.ts` - Link generation (still used)
   - `rewrite-content.ts` - Re-exports from archive (still works)

5. **Build Status:**
   - ✅ Build compiles successfully
   - ✅ All imports fixed and working
   - ✅ No broken references
   - ✅ Route handlers still functional
   - ✅ Components still work

**Impact on SEO/Integration:**
- No impact on functionality (everything still works)
- Cleaner codebase with deprecated code archived
- Clear documentation of what's deprecated
- Easier to identify what needs updating in future
- Sanity clearly marked as source of truth

**Verification:**
- ✅ Build compiles without errors
- ✅ All import paths fixed
- ✅ Exports still work from archive
- ✅ Route handlers unchanged
- ✅ No functionality broken

**Next Steps (Future):**
1. ⏳ Update route handlers to use Sanity first (Phase 3)
2. ⏳ Test all routes with Sanity as primary source
3. ⏳ Remove getLegacy* function calls
4. ⏳ Fully archive astro-static files after routes updated

**Current State:**
- Local data marked as deprecated but functional
- Content generators archived but accessible
- Route handlers still use local data
- Gradual migration path preserved
- Safe rollback possible if needed

---

## 2026-04-05

### Bulk Migration Complete - All Local URLs Now in Sanity ✅

**Changed files:**
- 101 new documents created in Sanity
- `docs/url-comparison-local-vs-sanity.md` (updated)
- `docs/MIGRATION-STATUS.md` (updated)

**Summary:**
Successfully migrated all 101 remaining URLs from local manifest to Sanity CMS:

**Migration Results:**
- ✅ Created: 101 documents
- ✅ Skipped: 0 documents
- ✅ Errors: 0 documents
- ⏱️ Duration: ~8 minutes (with rate limiting)

**Documents Created:**
1. **Static Pages (8):**
   - `/about`, `/about/ai-statement`, `/contact`, `/layanan`
   - `/pembuatan-website/harga`, `/pembuatan-website/template`
   - `/privacy`, `/sistem-pos`

2. **Page Locations (34):**
   - `/pembuatan-website/{city}` for all 34 Indonesian cities
   - Pattern: `/{category}/{lokasi}`

3. **Service Locations (34):**
   - `/percetakan/cetak-kalender/{city}` for all 34 cities
   - Pattern: `/{category}/{service}/{lokasi}`

4. **Service Pages (25):**
   - 8 pembuatan-website services (jasa-*)
   - 14 percetakan services (cetak-*)
   - 3 software services

**Final Sanity State:**
- Total Route Documents: 367
  - Pages: 290
  - Page Locations: 39
  - Service Locations: 38
- Supporting Documents:
  - Locations: 34
  - Service Types: 28
  - Templates: 4

**URL Coverage:**
- Local URLs: 104
- Sanity URLs: 107 (104 from local + 3 new)
- URLs in Both: 104 (100% coverage)
- Only in Local: 0 ✅
- Only in Sanity: 3 (new content)

**Verification:**
- ✅ All 104 local URLs now exist in Sanity
- ✅ Sample URLs tested and working
- ✅ No broken references
- ✅ All documents have proper structure
- ✅ Rate limiting worked (no API errors)

**Impact on SEO/Integration:**
- All URLs now managed in Sanity CMS
- Enables content team to edit without code changes
- Scalable for future location/service combinations
- Ready for local data cleanup (Phase 3-4)
- All documents start with `contentStatus: "draft"` and `noindex: true`

**Next Steps:**
1. ⏳ Review documents in Sanity Studio
2. ⏳ Update route handlers to prioritize Sanity over local
3. ⏳ Test all URLs work from Sanity in production
4. ⏳ Update `contentStatus` to "index" when ready
5. ⏳ Archive local data files after verification

**Local Data Status:**
- Keep for now as fallback during transition
- Can be archived after route handlers updated
- Serves as backup/reference during Phase 3-4

---

---

### Sanity Agent Toolkit Installation

**Changed files:**
- `.agents/skills/sanity-best-practices/` (40 files added)
- `.agents/skills/content-modeling-best-practices/` (5 files added)
- `.agents/skills/seo-aeo-best-practices/` (5 files added)
- `.agents/skills/content-experimentation-best-practices/` (5 files added)
- `skills-lock.json` (new)

**Summary:**
Installed Sanity Agent Toolkit skills from https://github.com/sanity-io/agent-toolkit using `npx skills add sanity-io/agent-toolkit`. This provides AI agents with comprehensive best practices for:
- Sanity development (GROQ, schema design, TypeGen, Visual Editing, framework integrations)
- Content modeling (structured content principles, references vs embedding)
- SEO/AEO (EEAT principles, structured data, technical SEO)
- Content experimentation (A/B testing methodology, statistical foundations)

**Impact on SEO/Integration:**
- Provides AI agents with official Sanity best practices for schema design, GROQ queries, and SEO implementation
- Includes SEO/AEO guidance with EEAT principles and structured data patterns
- Helps maintain consistency with Sanity's recommended patterns for Next.js integration
- No runtime impact - skills are documentation for AI agents only

**Verification:**
- Skills installed successfully in `.agents/skills/` directory
- 40 reference files covering all major Sanity topics
- Compatible with Kiro, Cursor, Claude Code, and other Agent Skills-compatible tools
