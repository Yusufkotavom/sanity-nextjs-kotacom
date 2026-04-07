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

## Local Claude SEO Bundle Rule

- This repository vendors a local Claude SEO toolkit under `skills/claude-seo/`.
- For SEO audit, technical SEO, on-page, schema, sitemap, image SEO, GEO, local SEO, maps, hreflang, backlinks, or SEO planning tasks, agents must review the relevant local skill first:
  - `skills/claude-seo/skills/seo/SKILL.md`
  - matching sub-skill under `skills/claude-seo/skills/seo-*/SKILL.md`
  - matching agent prompt under `skills/claude-seo/agents/seo-*.md` when delegation or role guidance is useful
- Prefer this repo-local bundle over machine-global SEO skills so the workflow stays versioned with the codebase.
- If a local Claude SEO skill references helper scripts, references, or docs, use the vendored paths under `skills/claude-seo/` instead of external or home-directory copies.

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

## Redirect Management Rule

- **Sanity as Source of Truth:** All specific path-to-path redirects must be managed in Sanity CMS using the `redirect` document type.
- **Structural Wildcards:** Structural redirects (e.g., `/product/:slug` -> `/products/:slug`) are managed in `frontend/next.config.mjs` via the `STATIC_REDIRECTS` array.
- **Validation Before Import:** Before importing or creating new redirects, agents MUST verify that the destination URL is valid (exists in Sanity or Local Repo).
- **Documentation:** For detailed workflow, refer to `docs/sanity-redirect-management.md`.
- **Scripts:**
  - Use `frontend/scripts/import-approved-redirects.mjs` to sync approved CSVs to Sanity.
  - Use `frontend/scripts/update-curation-with-sanity.mjs` to audit coverage.

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

## UI Component Architecture Rule

- **Strict Component Reusability**: When building or modifying React UI for the frontend, **agents must prioritize existing Shadcn UI components** or other predefined styles in `frontend/components/ui/` (e.g., `Button`, `Select`, `Tabs`, `Card`, etc.).
- **Do not use raw HTML elements** like `<select>`, standard `<button>`, or unstyled `<input>` when an equivalent scalable React UI component is available.
- **Missing Components**: If a standard UI component is missing, the agent MUST use the Shadcn CLI to install it (e.g., `cd frontend && npx shadcn@latest add [component]`) rather than building an isolated, ad-hoc version using generic HTML.
- Ensure any UI component built strictly matches the Vercel architecture and design systems currently enforced in the repository to ensure scalability.
