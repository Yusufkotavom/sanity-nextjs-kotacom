# Local Data Cleanup Plan

Generated: 2026-04-05

## Current Status

Dari analisis URL comparison:
- 3 URLs sudah di Sanity dan masih di lokal (bisa dihapus dari lokal)
- 101 URLs masih hanya di lokal (perlu migrasi dulu)
- 3 URLs hanya di Sanity (sudah benar)

## Files Using Local Data

### Core Local Data Files
1. `frontend/lib/legacy-pages/astro-static-manifest.json` - Manifest lokal (104 URLs)
2. `frontend/lib/legacy-pages/astro-static.ts` - Helper functions untuk akses manifest

### Files Importing from astro-static.ts
**Route Handlers (App Router):**
- `frontend/app/(main)/pembuatan-website/page.tsx`
- `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
- `frontend/app/(main)/percetakan/page.tsx`
- `frontend/app/(main)/percetakan/[...segments]/page.tsx`
- `frontend/app/(main)/software/page.tsx`
- `frontend/app/(main)/software/[slug]/page.tsx`
- `frontend/app/(main)/about/page.tsx`
- `frontend/app/(main)/about/[slug]/page.tsx`
- `frontend/app/(main)/contact/page.tsx`
- `frontend/app/(main)/privacy/page.tsx`
- `frontend/app/(main)/services/page.tsx`
- `frontend/app/(main)/[slug]/page.tsx`
- `frontend/app/(main)/component-ui/page.tsx`

**Components:**
- `frontend/components/ui/rewrite/page-shell.tsx`
- `frontend/components/ui/rewrite/hero.tsx`
- `frontend/components/ui/rewrite/related-links.tsx`
- `frontend/components/ui/rewrite/landing-sections/*.tsx`
- `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
- `frontend/components/archive/legacy-rewrite-v0/*.tsx`

**Library Files:**
- `frontend/lib/legacy-pages/metadata.ts`
- `frontend/lib/legacy-pages/rewrite-content.ts`
- `frontend/lib/legacy-pages/internal-links.ts`
- `frontend/lib/legacy-pages/content/*.ts`

**Scripts:**
- `frontend/scripts/migrate-all-local-to-sanity.mjs` (migration tool)
- `frontend/scripts/compare-local-vs-sanity-urls.mjs` (comparison tool)
- `frontend/scripts/import-approved-redirects.mjs`
- `frontend/scripts/update-curation-with-sanity.mjs`
- `frontend/scripts/verify-live-links.mjs`
- `frontend/scripts/fallback-redirects.mjs`
- `frontend/scripts/generate-astro-local-pages-manifest.mjs`

## Cleanup Strategy

### Phase 1: Keep Local Data (Current Phase)
**Status:** ✅ DONE
- Keep manifest and helper functions
- Document comparison between local and Sanity
- Identify what needs migration

### Phase 2: Complete Migration (Next Phase)
**Status:** ⏳ PENDING
- Migrate remaining 101 URLs to Sanity:
  - 8 static pages (about, contact, etc.)
  - 68 city-based pages (pembuatan-website/*, percetakan/cetak-kalender/*)
  - 25 service pages (jasa-*, cetak-*, software/*)

### Phase 3: Update Route Handlers (After Migration)
**Status:** ⏳ PENDING
- Update all route handlers to fetch from Sanity first
- Keep local as fallback during transition
- Test all routes work correctly

### Phase 4: Remove Local Dependencies (Final Phase)
**Status:** ⏳ PENDING
- Remove imports from astro-static.ts
- Archive legacy files to `frontend/lib/legacy-pages/archive/`
- Update scripts to only use Sanity
- Remove manifest generation script

## Decision: Keep Local Data for Now

**Reasoning:**
1. Only 3 URLs migrated so far (3% complete)
2. 101 URLs still need migration (97% remaining)
3. Local data serves as source of truth for migration
4. Route handlers still depend on local data for most pages
5. Premature removal would break 97% of pages

**Next Steps:**
1. ✅ Document current state (this file)
2. ✅ Create URL comparison report
3. ⏳ Migrate remaining URLs to Sanity (bulk migration script)
4. ⏳ Update route handlers to use Sanity
5. ⏳ Archive local data files

## Files to Keep (For Now)

All local data files should be kept until Phase 2 (migration) is complete:
- `frontend/lib/legacy-pages/astro-static-manifest.json`
- `frontend/lib/legacy-pages/astro-static.ts`
- All dependent files

## Files Safe to Archive Now

These files are only used for migration/comparison and can be moved to archive:
- None yet - all scripts may be needed for bulk migration

## Recommendation

**DO NOT remove local data yet.** Instead:
1. Use local data as source for bulk migration
2. Create migration script for remaining 101 URLs
3. Verify all URLs work from Sanity
4. Then remove local dependencies

**Estimated Timeline:**
- Phase 2 (Migration): 1-2 days (bulk script + verification)
- Phase 3 (Route Updates): 1 day (update handlers)
- Phase 4 (Cleanup): 1 day (archive files)

Total: 3-4 days for complete cleanup
