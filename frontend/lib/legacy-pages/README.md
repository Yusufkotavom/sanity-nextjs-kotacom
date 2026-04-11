# Legacy Pages - Local Data (DEPRECATED)

## ⚠️ DEPRECATION NOTICE

**Status:** All data migrated to Sanity CMS (2026-04-05)

**Migration Complete:**
- ✅ All 104 local URLs now in Sanity
- ✅ 100% coverage achieved
- ✅ Sanity is now source of truth

**Current State:**
- Files kept as fallback during transition
- Route handlers still use local data as primary source
- Will be archived after route handlers updated

## Files in This Directory

### Core Data (Still in Use)
- `astro-static-manifest.json` - Local URL manifest (deprecated, use Sanity)
- `astro-static.ts` - Helper functions (deprecated, use Sanity queries)
- `metadata.ts` - Metadata generation (still used by routes)
- `internal-links.ts` - Link generation (still used by components)
- `rewrite-content.ts` - Content building (still used by components)

### Content Generation (Deprecated)
- `content/` - Local content generators (replaced by Sanity content)
  - All content now managed in Sanity CMS
  - These files no longer needed for new content

## Migration to Sanity

### What's in Sanity Now
- 290 Pages
- 39 Page Locations
- 38 Service Locations
- 34 Locations
- 28 Service Types
- 4 Templates

### How to Use Sanity Instead

**Old (Local):**
```typescript
import { getLegacySectionSlug } from "@/lib/legacy-pages/astro-static";
const page = getLegacySectionSlug("pembuatan-website", "jakarta");
```

**New (Sanity):**
```typescript
import { fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
const page = await fetchTemplatePageByRoute("/pembuatan-website/jakarta");
```

## Gradual Migration Plan

### Phase 1: ✅ Data Migration Complete
All local URLs migrated to Sanity

### Phase 2: ⏳ Route Handler Updates (Future)
Update route handlers to use Sanity first:
1. Update one route at a time
2. Test thoroughly
3. Keep local as fallback
4. Gradually remove local dependencies

### Phase 3: ⏳ Archive Local Data (Future)
After all routes updated:
1. Move files to `archive/` folder
2. Update imports if needed
3. Keep as historical reference

## Documentation

See detailed migration docs:
- `docs/astro-migration-megaplan.md` - Current migration/source-of-truth status
- `docs/seo-updates.md` - Change log and verification trail
- `docs/archive/README.md` - Historical plans and archived context

## Questions?

This is a gradual migration. Local data is safe to keep until all route handlers are updated to use Sanity as primary source.
