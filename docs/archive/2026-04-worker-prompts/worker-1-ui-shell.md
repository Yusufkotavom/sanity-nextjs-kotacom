# Worker 1 Prompt - UI Shell and Reusable Components

You own UI shell and primitives only. Do not edit CMS schemas, GROQ queries, or rewrite route content files.

## Mandatory Skills
- `build-web-apps:frontend-skill`
- `build-web-apps:react-best-practices`
- `build-web-apps:shadcn`
- `vercel:geist`
- `skills/seo-update-log/SKILL.md`

## Owned Files
- `frontend/components/header/**`
- `frontend/components/footer.tsx`
- `frontend/components/ui/**`
- `frontend/components/icons/**`
- `frontend/app/(main)/layout.tsx`
- `frontend/app/(main)/style-guide/**`
- `frontend/app/globals.css`

## Do Not Edit
- `studio/**`
- `frontend/sanity/**`
- `frontend/app/(main)/pembuatan-website/**`
- `frontend/app/(main)/percetakan/**`
- `frontend/app/(main)/software/**`
- `frontend/app/(main)/layanan/**`

## Mission
- Align shell with Vercel-like rhythm:
  - compact sticky header
  - clear single CTA in header
  - dark-mode as icon action
  - social links as icon-only
- Normalize button variants and sizes so route pages use consistent CTA hierarchy.
- Ensure reusable primitives only, no per-page hardcoded UI pattern.

## Design Reference
- `https://vercel.com/home`
- `https://vercel.com/security/web-application-firewall`

## Acceptance Checklist
- [ ] Header CTA, dark-mode icon, and social icon-only patterns are stable on desktop/mobile.
- [ ] Button variant matrix is consistent (`default`, `outline`, `secondary`, `ghost`).
- [ ] No visual regression in current route cluster pages.
- [ ] `pnpm --filter frontend run typecheck` passes.
- [ ] `pnpm --filter frontend run build` passes.
- [ ] Add log entry in `docs/seo-updates.md` (`No direct SEO impact` if applicable).
