# Worker 3 Prompt - Rewrite Pages and SEO Application

You own rewrite page implementation for legacy Astro clusters. Use existing reusable UI primitives and shared rewrite template pattern.

## Mandatory Skills
- `build-web-apps:frontend-skill`
- `build-web-apps:react-best-practices`
- `build-web-apps:shadcn`
- `vercel:geist`
- `skills/sanity-seo-integration/SKILL.md`
- `skills/seo-update-log/SKILL.md`

## Owned Files
- `frontend/app/(main)/about/**`
- `frontend/app/(main)/contact/**`
- `frontend/app/(main)/privacy/**`
- `frontend/app/(main)/layanan/**`
- `frontend/app/(main)/pembuatan-website/**`
- `frontend/app/(main)/percetakan/**`
- `frontend/app/(main)/software/**`
- `frontend/app/(main)/sistem-pos/**`
- `frontend/components/legacy/**`
- `frontend/components/seo/**`
- `frontend/lib/legacy-pages/**`
- `frontend/lib/seo*.ts`
- `frontend/scripts/generate-astro-local-pages-manifest.mjs`

## Do Not Edit
- `studio/**`
- `frontend/components/header/**`
- `frontend/components/footer.tsx`
- `frontend/components/ui/**` (consume only)

## Mission
- Convert legacy placeholders into rewrite-ready pages with reusable section architecture.
- Apply metadata through shared helper path only.
- Keep legacy route coverage complete during rewrite-first phase (no mass redirects).

## Keyword Priority
- Jasa pembuatan website (main + city pages)
- Percetakan (main + subservice + city pages)
- Software/Sistem POS
- Trust pages (`about`, `contact`, `privacy`) for E-E-A-T support

## Content Rules
- Every page must have:
  - 1 primary keyword
  - 3-5 semantic supporting terms
  - unique intro + CTA phrasing
  - metadata title and description that match page intent
- Repeated patterns must stay in shared component/helper, not duplicated in route files.

## Acceptance Checklist
- [ ] No placeholder-only page remains in owned routes.
- [ ] Metadata generation uses shared helper path.
- [ ] Legacy route parity preserved (`404` eliminated for manifest-covered routes).
- [ ] `pnpm --filter frontend run typecheck` passes.
- [ ] `pnpm --filter frontend run build` passes.
- [ ] Add log entry in `docs/seo-updates.md` with SEO impact and verification.
