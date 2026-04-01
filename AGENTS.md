# AGENTS.md

## Mandatory Update Log

- For **every repository change** (not only SEO changes), the agent must add an entry to:
  - `docs/seo-updates.md`
- The entry must include:
  - Date (`YYYY-MM-DD`)
  - Changed files
  - Summary of what changed
  - Impact on SEO/integration (or explicit note: `No direct SEO impact`)
  - Verification status (build/test/manual check)

## SEO Integration Rules

- Keep Sanity Studio SEO schema and Frontend metadata logic in sync.
- If a field is added/changed in Studio SEO documents, update related query/fetch/metadata usage in Frontend in the same task.
- Preserve global fallback behavior from `seoSettings` when per-document meta is empty.

## Frontend-Backend Sync Rule

- Any frontend change that depends on CMS/config data must be cross-checked against Studio schemas, GROQ queries, and fetch helpers in the same task.
- Do not ship frontend-only shape changes for CMS-driven features; ensure Studio fields, query contracts, and frontend rendering stay integrated.

## Delivery Rule

- A task touching code is not complete until `docs/seo-updates.md` is updated.

## Agent Execution Checklist

- For migration / SEO / redesign tasks, the agent must also maintain checklist status in:
  - `docs/astro-migration-megaplan.md`
- At minimum, each execution cycle must update:
  - `Current Status Snapshot (Already Done)` when an item is completed
  - Related workstream TODO checkboxes (`[ ]` -> `[x]`) for completed tasks
  - Any blocked item with a short blocker note in the relevant section
- If a task result changes route behavior, schema shape, or metadata logic, the agent must verify cross-layer sync:
  - Studio schema
  - Frontend query/fetch contract
  - Frontend rendering/metadata output
