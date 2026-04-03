# Skill: Sanity SEO Integration

## Purpose
Keep SEO schema in Sanity Studio synchronized with frontend metadata behavior.

## When to Use
- Any change touching Studio SEO fields, metadata generation, sitemap/canonical/OG/Twitter logic, or fallback SEO behavior.

## Workflow
1. Update Studio schema documents/objects.
2. If a Sanity schema uses `initialValue` for any array of objects, include stable `_key` values on every array item, including nested Portable Text blocks/spans, so Studio editors do not hit `Missing keys`.
3. Update frontend query/fetch contracts.
4. Update metadata mapping in `frontend/sanity/lib/metadata.ts`.
5. Validate route-level metadata usage.
6. Ensure revalidation coverage if content model changed.
7. Run build checks.
8. Append entry to `docs/seo-updates.md`.

## Verification
- `pnpm --filter studio run build`
- `pnpm --filter frontend run build`
