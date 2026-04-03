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

## Sanity Dev Communication Rule

- For all **agent-driven Sanity communication** (read/write/query/import/mutation via scripts/CLI), default to **development credentials first**.
- Priority for Sanity write auth in agent workflows:
  1. `SANITY_DEV` (expected to contain **dev write token**, not boolean)
  2. `SANITY_AUTH_TOKEN`
- Do **not** target production credentials by default for routine migration/content automation tasks unless explicitly requested by the user.
- Agent outputs/logs must never print raw token values.

## Sanity Public Content Guardrails

- For any agent task that seeds, inserts, imports, patches, or rewires **publicly rendered Sanity content**, the agent must follow:
  - `docs/sanity-seed-guardrails.md`
  - `skills/sanity-public-content-guardrails/SKILL.md`
  - `skills/hybrid-content-page-workflow/SKILL.md` when the task is creating or extending a hybrid main page
- Minimum required rules:
  - Public document `_id` values must not contain dots (`.`).
  - This applies both to primary documents such as `page` and referenced documents such as `faq`.
  - Every array item must include `_key`.
  - Every `link` object must explicitly set `isExternal`.
  - Internal links must use `isExternal: false` with `internalLink`.
  - External links must use `isExternal: true` with `href`.
- After agent-driven Sanity writes that affect public `page` content, the agent must audit the result and confirm public-read behavior, not only token-authenticated reads.

## Hybrid Main Page Rule

- For main landing pages that should remain code-owned but allow CMS-managed support content, prefer the repo hybrid pattern over full page replacement.
- Current preferred pattern:
  - route shell remains code-owned
  - Sanity `page` document is optional and public-readable
  - `topBlockCount` splits `blocks[]` into top and bottom zones around the code-owned middle shell
- Before adding a new hybrid main page, review:
  - `skills/hybrid-content-page-workflow/SKILL.md`
  - `docs/sanity-seed-guardrails.md`
