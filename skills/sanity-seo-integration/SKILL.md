# Skill: Sanity SEO Integration

## Purpose
Keep SEO schema in Sanity Studio synchronized with frontend metadata behavior.

## When to Use
- Any change touching Studio SEO fields, metadata generation, sitemap/canonical/OG/Twitter logic, or fallback SEO behavior.

## Workflow
1. Update Studio schema documents/objects.
2. Update frontend query/fetch contracts.
3. Update metadata mapping in `frontend/sanity/lib/metadata.ts`.
4. Validate route-level metadata usage.
5. Ensure revalidation coverage if content model changed.
6. Run build checks.
7. Append entry to `docs/seo-updates.md`.

## Verification
- `pnpm --filter studio run build`
- `pnpm --filter frontend run build`
