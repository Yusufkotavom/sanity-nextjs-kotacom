# Skill: Hybrid Content Page Workflow

## Purpose
Create or extend a hybrid main page where the route shell stays code-owned, while Sanity `page` blocks provide flexible support content above and below the stable middle section.

## When to Use
- Any task that applies the hybrid pattern to a main landing page such as `/pembuatan-website`, `/percetakan`, or `/software`.
- Any task that needs a repeatable workflow for:
  - creating the Sanity `page` document first
  - wiring the frontend route to the shared hybrid wrapper
  - splitting one freeform `blocks[]` array with `topBlockCount`

## Required Inputs
1. A stable route shell already exists in code.
2. The page should keep fallback behavior if the Sanity document is missing.
3. The Sanity document must be public-readable without a token.

## Rules
1. Keep the route shell code-owned.
2. Do not replace the main route with a full CMS page unless explicitly requested.
3. Use a public-safe document `_id` without dots.
4. Use one `blocks[]` array plus `topBlockCount` instead of per-block placement fields.
5. Keep metadata/fallback logic stable unless the task explicitly includes metadata migration.
6. Follow `skills/sanity-public-content-guardrails/SKILL.md` and `docs/sanity-seed-guardrails.md`.

## Workflow
1. Inspect the existing route and shell.
   - Confirm what must stay code-owned: shell, structured sections, schema JSON-LD, internal links, fallback behavior.
2. Confirm the route slug to use for the Sanity `page` document.
3. Create or patch the Sanity `page` document first.
   - Use safe `_id`, for example `page-pembuatan-website`
   - Set `slug.current`
   - Set `topBlockCount`
   - Seed minimal blocks that do not fight the existing shell
4. Verify the Sanity document is public-readable without a token.
5. Wire the route into the shared hybrid wrapper.
   - Render top blocks
   - Render the existing code-owned shell
   - Render bottom blocks
6. Keep route metadata stable unless explicitly changing it.
7. Run build and typecheck.
8. Update `docs/seo-updates.md`.
9. If the work affects migration/redesign status, update `docs/astro-migration-megaplan.md`.

## CLI Shortcut
- Use `pnpm --filter frontend run hybrid:create -- --slug=<slug> --preset=<preset>` for a dry-run preview.
- Use `pnpm --filter frontend run hybrid:route:create -- --slug=<slug> --preset=<preset>` when the route file does not exist yet and you want repo scaffold + Sanity seed in one step.
- Add `--write` to commit the document to Sanity after review.
- Supported modes:
  - `--mode=seed-missing` (default): only fills missing `title`, `topBlockCount`, and `blocks`
  - `--mode=upsert`: replaces the seeded hybrid fields with the selected preset
  - `--mode=create`: fails if the page slug already exists
- Supported presets:
  - `main-landing`
  - `homepage`
- Example:
  - `pnpm --filter frontend run hybrid:create -- --slug=percetakan --preset=main-landing --mode=seed-missing --write`
- Operational doc:
  - `docs/hybrid-page-cli-workflow.md`

## CLI Guarantees
- Uses dev-first Sanity credentials (`SANITY_DEV`, fallback `SANITY_AUTH_TOKEN`).
- Refuses unwired slugs unless `--allow-unwired` is supplied.
- Uses public-safe page IDs without dots for newly created documents.
- Normalizes generated block payloads through the same `_key` and `isExternal` guards used by the audit/normalizer scripts.
- Verifies public-read after a write so the created hybrid page is immediately usable by the frontend runtime.

## Recommended Seed Shape
- Use light support blocks first:
  - `section-header`
  - `grid-row`
  - `cta-1`
- Avoid duplicating the entire shell in Sanity.
- Keep the first rollout conservative:
  - top zone for support/proof framing
  - bottom zone for CTA/follow-up content

## Verification
- Public query for the page slug returns the document and `topBlockCount`.
- `blocks[]` render safely above and below the shell.
- The route still works if the Sanity document is removed or renamed.
- `pnpm --filter frontend run build` passes.
- `pnpm --filter frontend run typecheck` passes after build regenerates `.next/types`.
