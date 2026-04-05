# Local Data Archive Plan

## Decision: Archive Instead of Delete

### Why Archive?

1. **Safety**: Keep as backup/reference
2. **Gradual Migration**: Route handlers can be updated incrementally
3. **Rollback**: Easy to restore if needed
4. **Documentation**: Preserves historical data structure

### What to Archive

**Core Local Data:**
- `frontend/lib/legacy-pages/astro-static-manifest.json` → Keep (still used by routes)
- `frontend/lib/legacy-pages/astro-static.ts` → Keep (still used by routes)

**Content Generation (Can Archive):**
- `frontend/lib/legacy-pages/content/` → Archive (not needed, Sanity has content)
- `frontend/lib/legacy-pages/rewrite-content.ts` → Keep (still used by components)

**Scripts (Keep for Tools):**
- `frontend/scripts/generate-astro-local-pages-manifest.mjs` → Archive (no longer needed)
- `frontend/scripts/migrate-all-local-to-sanity.mjs` → Keep (useful for reference)
- `frontend/scripts/compare-local-vs-sanity-urls.mjs` → Keep (useful tool)

### What NOT to Archive (Still in Use)

**Route Handlers:**
- All `app/(main)/**/page.tsx` files still use `getLegacy*` functions
- Need gradual update to Sanity-first approach

**Components:**
- `components/ui/rewrite/*` still use LegacyAstroPage types
- Need gradual refactor

**Library:**
- `lib/legacy-pages/metadata.ts` still used
- `lib/legacy-pages/internal-links.ts` still used

## Recommended Approach

### Phase 1: Document Current State ✅ DONE
- All URLs in Sanity
- Local data still primary source for routes

### Phase 2: Mark as Deprecated
- Add deprecation notices to local data files
- Document that Sanity is source of truth
- Keep local as fallback

### Phase 3: Gradual Route Updates (Future)
- Update routes one by one to use Sanity first
- Test each route thoroughly
- Keep local as fallback

### Phase 4: Archive When Safe (Future)
- After all routes updated
- After thorough testing
- Move to archive folder

## Current Action: Add Deprecation Notices

Instead of archiving now, we'll:
1. Add comments marking files as deprecated
2. Document that Sanity is now source of truth
3. Keep everything working as-is
4. Plan gradual migration

This is the safest approach that doesn't break anything.
