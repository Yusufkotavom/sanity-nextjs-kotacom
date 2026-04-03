# Skill: Sanity Public Content Guardrails

## Purpose
Keep publicly rendered Sanity content safe for frontend reads, especially when documents are created or mutated through scripts, API calls, or agent workflows.

## When to Use
- Any task that seeds, inserts, imports, patches, migrates, or rewires Sanity documents that are rendered by the public frontend.
- Especially relevant for `page` documents and referenced content such as `faq`, `link`, and block arrays.

## Required Rules
1. Use dev-first write auth:
   - `SANITY_DEV`
   - fallback `SANITY_AUTH_TOKEN`
2. Do not use dotted `_id` values for public documents or referenced public documents.
   - Safe: `page-test-page-hybrid`
   - Unsafe: `page.test-page-hybrid`
3. Ensure every array item has `_key`.
4. Ensure every `link` object explicitly sets `isExternal`.
5. Use link fields consistently:
   - `isExternal: false` with `internalLink`
   - `isExternal: true` with `href`

## Workflow
1. Review `docs/sanity-seed-guardrails.md`.
2. Write or patch Sanity data using safe public IDs.
3. Audit array `_key` and `link.isExternal` integrity.
4. Verify public-read behavior without a token for the affected slug or document path.
5. Verify the frontend route or query still renders without null-reference crashes.
6. Update `docs/seo-updates.md`.
7. If the task is part of migration/redesign/SEO work, update `docs/astro-migration-megaplan.md`.

## Verification
- Public Sanity query for the affected document returns data without a token.
- Referenced content such as `faqs[]->` does not resolve to `null`.
- Frontend route renders without runtime crashes.
