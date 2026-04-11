# Archived Legacy Content Generators

## Archive Date: 2026-04-05

## Why Archived?

These content generators are no longer needed because:
- ✅ All content now managed in Sanity CMS
- ✅ All 104 URLs migrated to Sanity
- ✅ Content editing done through Sanity Studio UI
- ✅ No longer need code-based content generation

## What's Archived Here

### content-generators/
Local content generation logic that was used before Sanity migration:
- `core.ts` - Generic content builder
- `registry.ts` - Content type registry
- `constants.ts` - Default values
- `overrides.ts` - Priority slug overrides
- `types.ts` - Type definitions
- `website.ts` - Website content generator
- `software.ts` - Software content generator
- `printing.ts` - Printing content generator
- `printing-pages/` - Specific printing page generators
- `software-pages/` - Specific software page generators

## Historical Context

These files were used to generate content for local static pages before we had Sanity CMS. They:
- Generated SEO-optimized copy
- Created structured content (FAQs, features, pricing)
- Handled location-based content variations
- Provided fallback content for pages

## Replacement

All functionality now handled by:
- **Sanity Studio** - Content editing UI
- **Template System** - `pageTemplate` documents
- **Location Tokens** - `{lokasi}` token replacement
- **Template Resolution** - `lib/templates/resolve-template.ts`

## If You Need This Code

These files are kept as reference for:
- Understanding old content structure
- Migrating remaining content patterns
- Historical documentation
- Rollback scenarios (unlikely)

## Related Documentation

- `docs/astro-migration-megaplan.md` - Migration status (active source)
- `docs/seo-updates.md` - Migration/update log
- `../README.md` - Legacy pages overview
