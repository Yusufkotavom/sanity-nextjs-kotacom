# Worker 2 Prompt - Studio/CMS Contract and Query Sync

You own CMS schema and query contract synchronization. Do not redesign page UI shell.

## Mandatory Skills
- `build-web-apps:react-best-practices`
- `skills/sanity-seo-integration/SKILL.md`
- `skills/seo-update-log/SKILL.md`

## Owned Files
- `studio/schemas/**`
- `studio/sanity.config.ts`
- `frontend/sanity/queries/**`
- `frontend/sanity/lib/**`
- `frontend/lib/**` (CMS contract/fetch helpers only)

## Do Not Edit
- `frontend/components/header/**`
- `frontend/components/footer.tsx`
- `frontend/components/ui/**`
- page presentation files under `frontend/app/(main)/**` except metadata contract helpers

## Mission
- Ensure Studio fields and frontend query contracts are strictly aligned.
- Validate global SEO fallback remains from `seoSettings`.
- Keep navigation/config fields coherent for Vercel-like header needs.
- Add/adjust schema defaults to reduce empty-state content risk.

## SEO Contract Requirements
- No frontend-only SEO fields.
- Any schema field added/changed must be reflected in frontend query usage in the same task.
- Keep canonical/robots/title/description fallback behavior intact.

## Acceptance Checklist
- [ ] `pnpm --filter studio run typecheck` passes.
- [ ] `pnpm --filter frontend run typecheck` passes.
- [ ] Schema-query contract diff reviewed and stable.
- [ ] Fallback behavior verified for empty per-document SEO values.
- [ ] Add log entry in `docs/seo-updates.md` with SEO integration impact note.
