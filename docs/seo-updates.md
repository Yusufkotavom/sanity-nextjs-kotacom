# SEO Updates Log

This file is the canonical changelog for all repository updates, with explicit SEO impact notes.

## Entry Template

```md
## YYYY-MM-DD - Short Title
- Changed files:
  - path/to/file
- Summary:
  - ...
- SEO impact:
  - ...
- Verification:
  - ...
## 2026-04-04 - Fix AI Rewrite CORS Origin Matching
- Changed files:
  - `frontend/app/api/ai/rewrite/apply/route.ts`
- Summary:
  - Updated the CORS header logic for the Sanity Studio AI rewrite endpoint to natively accept requests from both `https://studio.kotacom.id` and localhost origins, preventing CORS blocks during Studio usage.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Ensured correct CORS header fallback and origin matching logic in the API route.

## 2026-04-04 - Live HTTP HEAD Verification & Redirect Cleanup
- Changed files:
  - `frontend/scripts/verify-and-cleanup-redirects.mjs` (New)
- Summary:
  - Executed a live HTTP HEAD request sweep against `https://sanity.kotacom.id` for all 761 redirect sources in the CMS.
  - Discovered that Next.js dynamic routing was natively handling 354 legacy URLs (e.g., `/jasa-cetak-buku-*`, `/pembuatan-website/*`) with 200 OK responses, despite them not being in the static Astro manifest.
  - Automatically deleted these 354 false-positive redirects from Sanity to prevent breaking live dynamic routes.
  - Retained 298 valid fallback redirects for genuine 404/410 legacy URLs.
- SEO impact:
  - Critical. Prevented 354 valid, ranking dynamic pages from being hijacked by fallback redirects.
  - Ensures accurate 301 status codes only apply to URLs that are definitively broken.
- Verification:
  - Script output verified 354 deletions committed to Sanity via transaction.

## 2026-04-04 - Implement Sanity Redirect Management & Wildcard Fallbacks
- Changed files:
  - `frontend/next.config.mjs`
  - `AGENTS.md`
  - `docs/sanity-redirect-management.md` (New)
  - `frontend/scripts/check-sanity-redirects.mjs` (New)
  - `frontend/scripts/update-curation-with-sanity.mjs` (New)
  - `frontend/scripts/import-approved-redirects.mjs` (New)
- Summary:
  - Integrated Sanity as the Source of Truth for redireksi.
  - Implemented structural wildcard redirects in `next.config.mjs` (`/product/`, `/service/`, `/digital-product/`, `/it-services/`).
  - Created automation scripts to fetch, audit, and import approved redirects from curation CSVs to Sanity with backend validation.
  - Imported 81 approved redirects to Sanity after validating destination availability.
- SEO impact:
  - High. Recovers link equity for legacy URLs by implementing 301 redirects.
  - Reduces 404 errors for high-traffic legacy product and service pages.
  - Ensures no "broken redirects" by validating destinations against live Sanity/Local content.
- Verification:
  - Manual script execution confirmed 81 successful imports and validated against 467 Sanity documents.

## 2026-04-04 - Rewrite Public Copy for `/pembuatan-website` Cluster
- Changed files:
  - `frontend/lib/legacy-pages/content/website.ts`
  - `frontend/lib/legacy-pages/content/website-pages/website-index.ts`
  - `frontend/lib/legacy-pages/content/website-pages/company-profile.ts`
  - `frontend/lib/legacy-pages/content/website-pages/toko-online.ts`
  - `frontend/lib/legacy-pages/content/website-pages/overrides.ts`
  - `frontend/components/ui/rewrite/landing-sections/defaults.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote the core `/pembuatan-website` copy generators so public pages now speak in customer-facing language instead of internal editorial/process phrasing such as "rewritten from live site", "intent user", or implementation-note style messaging.
  - Simplified the main website, city-template, company profile, and toko online messaging to emphasize lead generation, credibility, inquiry flow, checkout clarity, and business outcomes instead of internal system terminology that was not relevant for most public visitors.
  - Updated shared landing-section defaults for the website cluster so service cards and feature bullets now use clearer public wording around SEO setup, content maintenance, and custom website positioning.
- SEO impact:
  - Direct SEO impact: improves on-page clarity and keyword alignment for `/pembuatan-website` and key descendants by shifting copy toward public search intent, conversion messaging, and clearer service positioning.
  - Integration impact: content-generator-only update for the website rewrite cluster; no Studio schema, GROQ query, or route contract changes.
- Verification:
  - `rg -n "live site|ditulis ulang|intent user|dashboard admin|dashboard internal|CRM|ERP|HR|workflow operasional|roadmap implementasi" frontend/lib/legacy-pages/content/website.ts frontend/lib/legacy-pages/content/website-pages frontend/components/ui/rewrite/landing-sections/defaults.ts`
  - `node` + local frontend `typescript` transpile check for the edited modules

## 2026-04-04 - Expand `/pembuatan-website` SEO Copy to Specialist Descendants
- Changed files:
  - `frontend/lib/legacy-pages/content/website-pages/harga.ts`
  - `frontend/lib/legacy-pages/content/website-pages/migrasi-wordpress.ts`
  - `frontend/lib/legacy-pages/content/website-pages/dokter-klinik.ts`
  - `frontend/lib/legacy-pages/content/website-pages/expedisi.ts`
  - `frontend/lib/legacy-pages/content/website-pages/sekolah.ts`
  - `frontend/lib/legacy-pages/content/website-pages/konstruksi.ts`
  - `frontend/lib/legacy-pages/content/website-pages/komunitas-ngo.ts`
  - `frontend/lib/legacy-pages/content/website-pages/template.ts`
  - `frontend/lib/legacy-pages/content/website-pages/overrides.ts`
  - `frontend/lib/legacy-pages/content/website-pages/website-index.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded the rewrite copy pass from the main `/pembuatan-website` pages into specialist descendants covering pricing, WordPress migration, clinic, expedition, school, construction, NGO/community, and template routes.
  - Added richer page-specific `secondaryKeywords`, `highlights`, `process`, and `faqs` so these routes no longer depend on thin generic defaults and now describe their service intent in more public-facing, search-aligned language.
  - Cleaned remaining small phrasing leaks such as `user`, `copy`, and `tim internal` inside the website cluster so the public content reads more naturally.
- SEO impact:
  - Direct SEO impact: improves topical depth, intent coverage, and supporting on-page content for multiple `/pembuatan-website` descendants that target distinct commercial and informational queries.
  - Integration impact: content-generator-only update within the website rewrite cluster; no Studio schema, GROQ query, or route contract changes.
- Verification:
  - `rg -n "live site|ditulis ulang|intent user|copy |user |CRM|ERP|HR|dashboard admin|dashboard internal|tim internal|workflow operasional|roadmap implementasi|system management|management perusahaan" frontend/lib/legacy-pages/content/website.ts frontend/lib/legacy-pages/content/website-pages frontend/components/ui/rewrite/landing-sections/defaults.ts`
  - `node` + local frontend `typescript` transpile check for edited website-cluster modules

## 2026-04-04 - Extend Public Copy Cleanup to `software` and `percetakan`
- Changed files:
  - `frontend/lib/legacy-pages/content/software.ts`
  - `frontend/lib/legacy-pages/content/software-overrides.ts`
  - `frontend/lib/legacy-pages/content/software-pages/software-index.ts`
  - `frontend/lib/legacy-pages/content/software-pages/pembuatan-software.ts`
  - `frontend/lib/legacy-pages/content/software-pages/implementasi-software.ts`
  - `frontend/lib/legacy-pages/content/software-pages/instalasi-software.ts`
  - `frontend/lib/legacy-pages/content/software-pages/overrides.ts`
  - `frontend/lib/legacy-pages/content/printing.ts`
  - `frontend/lib/legacy-pages/content/printing-overrides.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/detail-presets.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/percetakan-index.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-buku.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-company-profile.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-buku-city-overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extended the copy-cleanup pass beyond `/pembuatan-website` into the `software` and `percetakan` rewrite clusters so shared generators, specialist pages, and detail presets no longer expose internal editorial/process language to public visitors.
  - Rewrote software cluster intros, highlights, FAQs, and process sections to reduce jargon such as internal-system/editorial wording while keeping search-aligned themes around efficiency, implementation, adoption, and business outcomes.
  - Reworked key printing pages and overrides to remove “halaman ini”, live-site comparison notes, and similar editorial phrasing, while also fixing several public-facing wording issues and typos on money pages like `percetakan`, `cetak-buku`, and `cetak-company-profile`.
- SEO impact:
  - Direct SEO impact: improves readability, topical clarity, and visitor-facing relevance across the software and printing money-page clusters, reducing internal jargon that weakens public search intent alignment.
  - Integration impact: rewrite-content-generator update only; no Sanity schema, GROQ query, or route contract changes.
- Verification:
  - `rg -n "live site|ditulis ulang|intent user|copy |user |CRM|ERP|HR|dashboard admin|dashboard internal|tim internal|workflow operasional|roadmap implementasi|system management|management perusahaan|internal perusahaan|Aplikasi internal|pengembangan aplikasi internal|rewrite ini|Halaman ini|dipoles untuk intent|difokuskan untuk intent|dibanding" frontend/lib/legacy-pages/content/website.ts frontend/lib/legacy-pages/content/website-pages frontend/lib/legacy-pages/content/software* frontend/lib/legacy-pages/content/software-pages frontend/lib/legacy-pages/content/printing* frontend/lib/legacy-pages/content/printing-pages frontend/components/ui/rewrite/landing-sections/defaults.ts`
  - `node` + local frontend `typescript` transpile check for edited website/software/printing rewrite modules

## 2026-04-04 - Sweep Remaining Internal Wording from Public Local Content
- Changed files:
  - `frontend/lib/local-content/home-page.ts`
  - `frontend/lib/local-content/home-prepare.ts`
  - `frontend/lib/legacy-pages/content/website-overrides.ts`
  - `frontend/lib/legacy-pages/content/core.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Cleaned additional public-facing content sources outside the main rewrite clusters, especially homepage local-content and shared rewrite generator defaults, to remove editorial rewrite notes and internal wording that were still leaking into public copy.
  - Replaced English/internal-origin descriptions in the homepage content with customer-facing Indonesian messaging aligned to public value propositions for website, software, support, and printing lanes.
  - Adjusted a few shared FAQ/process strings so references like `tim internal` and `QA internal` no longer appear in generic public content generators.
- SEO impact:
  - Direct SEO impact: improves clarity and trust signals on homepage/local-content surfaces by removing internal/editorial wording that weakens public relevance and conversion messaging.
  - Integration impact: content-source-only cleanup; no Studio schema, GROQ query, route contract, or metadata logic changes.
- Verification:
  - `rg -n "live site|ditulis ulang|rewrite ini|intent user|copy |user |source diagnostics|ownership mapping|placeholder|TODO|debug|dummy|lorem|roadmap implementasi|tim internal|dashboard admin|dashboard internal|CRM|ERP|HR management|system management|AI statement|current portfolio language|built around|reframed as|this page|this section|demo|audit page|style guide|component-ui|noindex UI canvas|internal systems|internal system|QA internal" frontend/app frontend/lib frontend/components`
  - `node` + local frontend `typescript` transpile check for edited local-content/shared-generator modules

## 2026-04-04 - Vendor Claude SEO Toolkit into the Repository
- Changed files:
  - `AGENTS.md`
  - `skills/claude-seo/CLAUDE.md`
  - `skills/claude-seo/README.md`
  - `skills/claude-seo/LICENSE`
  - `skills/claude-seo/requirements.txt`
  - `skills/claude-seo/agents/seo-backlinks.md`
  - `skills/claude-seo/agents/seo-content.md`
  - `skills/claude-seo/agents/seo-dataforseo.md`
  - `skills/claude-seo/agents/seo-geo.md`
  - `skills/claude-seo/agents/seo-google.md`
  - `skills/claude-seo/agents/seo-image-gen.md`
  - `skills/claude-seo/agents/seo-local.md`
  - `skills/claude-seo/agents/seo-maps.md`
  - `skills/claude-seo/agents/seo-performance.md`
  - `skills/claude-seo/agents/seo-schema.md`
  - `skills/claude-seo/agents/seo-sitemap.md`
  - `skills/claude-seo/agents/seo-technical.md`
  - `skills/claude-seo/agents/seo-visual.md`
  - `skills/claude-seo/docs/ARCHITECTURE.md`
  - `skills/claude-seo/docs/COMMANDS.md`
  - `skills/claude-seo/docs/INSTALLATION.md`
  - `skills/claude-seo/docs/MCP-INTEGRATION.md`
  - `skills/claude-seo/docs/TROUBLESHOOTING.md`
  - `skills/claude-seo/extensions/banana/README.md`
  - `skills/claude-seo/extensions/banana/install.sh`
  - `skills/claude-seo/extensions/banana/uninstall.sh`
  - `skills/claude-seo/extensions/dataforseo/README.md`
  - `skills/claude-seo/extensions/dataforseo/field-config.json`
  - `skills/claude-seo/extensions/dataforseo/install.ps1`
  - `skills/claude-seo/extensions/dataforseo/install.sh`
  - `skills/claude-seo/extensions/dataforseo/uninstall.ps1`
  - `skills/claude-seo/extensions/dataforseo/uninstall.sh`
  - `skills/claude-seo/extensions/firecrawl/README.md`
  - `skills/claude-seo/extensions/firecrawl/install.ps1`
  - `skills/claude-seo/extensions/firecrawl/install.sh`
  - `skills/claude-seo/extensions/firecrawl/uninstall.ps1`
  - `skills/claude-seo/extensions/firecrawl/uninstall.sh`
  - `skills/claude-seo/hooks/hooks.json`
  - `skills/claude-seo/hooks/validate-schema.py`
  - `skills/claude-seo/schema/templates.json`
  - `skills/claude-seo/scripts/analyze_visual.py`
  - `skills/claude-seo/scripts/backlinks_auth.py`
  - `skills/claude-seo/scripts/bing_webmaster.py`
  - `skills/claude-seo/scripts/capture_screenshot.py`
  - `skills/claude-seo/scripts/commoncrawl_graph.py`
  - `skills/claude-seo/scripts/crux_history.py`
  - `skills/claude-seo/scripts/fetch_page.py`
  - `skills/claude-seo/scripts/ga4_report.py`
  - `skills/claude-seo/scripts/google_auth.py`
  - `skills/claude-seo/scripts/google_report.py`
  - `skills/claude-seo/scripts/gsc_inspect.py`
  - `skills/claude-seo/scripts/gsc_query.py`
  - `skills/claude-seo/scripts/indexing_notify.py`
  - `skills/claude-seo/scripts/keyword_planner.py`
  - `skills/claude-seo/scripts/moz_api.py`
  - `skills/claude-seo/scripts/nlp_analyze.py`
  - `skills/claude-seo/scripts/pagespeed_check.py`
  - `skills/claude-seo/scripts/parse_html.py`
  - `skills/claude-seo/scripts/validate_backlink_report.py`
  - `skills/claude-seo/scripts/verify_backlinks.py`
  - `skills/claude-seo/scripts/youtube_search.py`
  - `skills/claude-seo/skills/seo/SKILL.md`
  - `skills/claude-seo/skills/seo-audit/SKILL.md`
  - `skills/claude-seo/skills/seo-backlinks/SKILL.md`
  - `skills/claude-seo/skills/seo-competitor-pages/SKILL.md`
  - `skills/claude-seo/skills/seo-content/SKILL.md`
  - `skills/claude-seo/skills/seo-dataforseo/SKILL.md`
  - `skills/claude-seo/skills/seo-geo/SKILL.md`
  - `skills/claude-seo/skills/seo-google/SKILL.md`
  - `skills/claude-seo/skills/seo-google/references/google-api-endpoints.md`
  - `skills/claude-seo/skills/seo-google/references/google-api-scope-reference.md`
  - `skills/claude-seo/skills/seo-google/references/google-api-setup.md`
  - `skills/claude-seo/skills/seo-google/references/google-indexing-api-guide.md`
  - `skills/claude-seo/skills/seo-google/references/google-keyword-planner-guide.md`
  - `skills/claude-seo/skills/seo-google/references/google-page-speed-api-guide.md`
  - `skills/claude-seo/skills/seo-google/references/google-search-console-guide.md`
  - `skills/claude-seo/skills/seo-google/references/google-seo-quick-reference.md`
  - `skills/claude-seo/skills/seo-google/references/google-url-inspection-guide.md`
  - `skills/claude-seo/skills/seo-google/references/google-youtube-data-api-guide.md`
  - `skills/claude-seo/skills/seo-hreflang/SKILL.md`
  - `skills/claude-seo/skills/seo-image-gen/SKILL.md`
  - `skills/claude-seo/skills/seo-image-gen/references/banana-api.md`
  - `skills/claude-seo/skills/seo-image-gen/references/compression-guide.md`
  - `skills/claude-seo/skills/seo-image-gen/references/og-playbook.md`
  - `skills/claude-seo/skills/seo-image-gen/references/product-photo-guide.md`
  - `skills/claude-seo/skills/seo-image-gen/references/safety-and-publishing.md`
  - `skills/claude-seo/skills/seo-image-gen/references/seo-image-guidelines.md`
  - `skills/claude-seo/skills/seo-image-gen/references/usage-reference.md`
  - `skills/claude-seo/skills/seo-images/SKILL.md`
  - `skills/claude-seo/skills/seo-local/SKILL.md`
  - `skills/claude-seo/skills/seo-maps/SKILL.md`
  - `skills/claude-seo/skills/seo-page/SKILL.md`
  - `skills/claude-seo/skills/seo-plan/SKILL.md`
  - `skills/claude-seo/skills/seo-plan/assets/local-rankings-strategy.md`
  - `skills/claude-seo/skills/seo-plan/assets/publisher-content-plan.md`
  - `skills/claude-seo/skills/seo-plan/assets/saas-growth-plan.md`
  - `skills/claude-seo/skills/seo-plan/assets/services-leadgen-plan.md`
  - `skills/claude-seo/skills/seo-programmatic/SKILL.md`
  - `skills/claude-seo/skills/seo-schema/SKILL.md`
  - `skills/claude-seo/skills/seo-sitemap/SKILL.md`
  - `skills/claude-seo/skills/seo-technical/SKILL.md`
  - `skills/claude-seo/skills/seo/references/cwv-thresholds.md`
  - `skills/claude-seo/skills/seo/references/eeat-framework.md`
  - `skills/claude-seo/skills/seo/references/local-schema-types.md`
  - `skills/claude-seo/skills/seo/references/local-seo-signals.md`
  - `skills/claude-seo/skills/seo/references/maps-api-endpoints.md`
  - `skills/claude-seo/skills/seo/references/maps-free-apis.md`
  - `skills/claude-seo/skills/seo/references/maps-gbp-checklist.md`
  - `skills/claude-seo/skills/seo/references/maps-geo-grid.md`
  - `skills/claude-seo/skills/seo/references/quality-gates.md`
  - `skills/claude-seo/skills/seo/references/schema-types.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Vendored the Claude SEO toolkit into `skills/claude-seo/` so the repository now carries the upstream skill set locally, including orchestrator skills, sub-skills, agent markdown prompts, helper scripts, references, docs, schema templates, hooks, and extension install notes.
  - Kept the vendored package inside the repository instead of installing it into a machine-global directory, so future SEO workflows can be reviewed, versioned, and updated alongside application code.
  - Updated `AGENTS.md` to explicitly direct future agents to prefer the repo-local Claude SEO bundle for SEO audit, schema, sitemap, GEO, local SEO, backlinks, and planning tasks.
- SEO impact:
  - No direct SEO impact on frontend runtime or metadata output.
  - Integration impact: future SEO audits and strategy work can now use a versioned, repo-local toolkit and local agent prompts instead of relying on server-level skill installs.
- Verification:
  - `find skills/claude-seo -maxdepth 3 -type f`
  - `sed -n '1,160p' AGENTS.md`
  - Manual check that the vendored bundle contains `skills/`, `agents/`, `scripts/`, `schema/`, `docs/`, `hooks/`, and `extensions/`

## 2026-04-03 - Move Theme Colors into Dedicated Theme Settings Document
- Changed files:
  - `studio/schemas/documents/theme-settings.ts`
  - `studio/schemas/documents/settings.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/schema.json`
  - `frontend/sanity/queries/theme-settings.ts`
  - `frontend/sanity.types.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Moved website color configuration out of the general `settings` document into a dedicated singleton `themeSettings` document so theme editing has its own focused editor surface.
  - Kept the existing `themeColors` data contract intact inside the new document, including the swatch picker, in-Studio guide, preset previews, and combination tips.
  - Updated the Studio desk structure and frontend theme-settings query to read from the new `themeSettings` document instead of the generic `settings` singleton.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend theme token loading now reads from the dedicated `themeSettings` document; theme color field shape remains unchanged so runtime token mapping stays compatible.
- Verification:
  - `pnpm typegen`
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Add In-Studio Theme Color Guide, Preview, and Combination Tips
- Changed files:
  - `studio/schemas/inputs/theme-colors-input.tsx`
  - `studio/schemas/documents/settings.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a custom object input for `settings.themeColors` that displays an in-Studio guide explaining what `Primary`, `Primary Foreground`, `Accent`, and `Ring` control in the UI.
  - Added short preset previews inside Studio for `neutral`, `ocean`, `sunset`, and the existing tricolor presets so editors can compare the overall direction before changing individual fields.
  - Added a compact list of recommended theme combinations in Studio to help non-technical users choose safer brand directions without needing to understand HEX values first.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: Studio-only guidance enhancement for the existing theme settings editor; no frontend query, runtime token mapping, or metadata behavior changes.
- Verification:
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Add Color Swatch Picker to Theme Colors in Studio
- Changed files:
  - `studio/schemas/inputs/color-option-input.tsx`
  - `studio/schemas/documents/settings.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced the plain dropdown-only editing experience for `Theme Colors` in Studio with a visual color option picker that shows a swatch next to each preset value.
  - Kept the stored data format unchanged as the same HEX string values, so frontend theme handling does not need any query or runtime changes.
  - Applied the custom swatch input to all theme color override fields in `settings.themeColors`, making it easier for editors to pick colors without understanding HEX values first.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: Studio-only editing improvement for existing `settings.themeColors` fields; no schema shape, GROQ query, or frontend metadata/runtime contract changes.
- Verification:
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Roll Out Global WhatsApp CTA Across Detail Pages and Add WhatsApp Block
- Changed files:
  - `frontend/app/(main)/blog/[slug]/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/projects/[slug]/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `frontend/components/global-whatsapp-button.tsx`
  - `frontend/components/global-whatsapp-panel.tsx`
  - `frontend/components/ui/json-usaha-page.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/landing-sections/final-cta-section.tsx`
  - `frontend/components/legacy/legacy-hero.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `frontend/components/blocks/cta/whatsapp-cta.tsx`
  - `frontend/components/blocks/index.tsx`
  - `frontend/components/whatsapp-icon.tsx`
  - `frontend/components/whatsapp-link.tsx`
  - `frontend/components/floating-whatsapp-client.tsx`
  - `frontend/lib/whatsapp-settings.ts`
  - `frontend/sanity/queries/cta/whatsapp-cta.ts`
  - `frontend/sanity/queries/page.ts`
  - `frontend/sanity/queries/reusable-section.ts`
  - `frontend/sanity.types.ts`
  - `studio/schemas/blocks/cta/whatsapp-cta.ts`
  - `studio/schemas/blocks/cta/cta-1.ts`
  - `studio/schemas/blocks/hero/hero-1.ts`
  - `studio/schemas/blocks/hero/hero-2.ts`
  - `studio/schemas/blocks/grid/pricing-card.ts`
  - `studio/schemas/blocks/split/split-row.ts`
  - `studio/schemas/blocks/split/split-content.ts`
  - `studio/schema-types.ts`
  - `studio/schema.json`
  - `studio/schemas/documents/page.ts`
  - `studio/schemas/documents/reusable-section.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable global WhatsApp CTA helpers so server-rendered pages and sections can use the same `settings.whatsApp` source as the floating WhatsApp widget, including phone number, predefined text, CTA label, and source URL context.
  - Rolled more aggressive WhatsApp CTA placement into `post`, `product`, `service`, and `project` detail pages, and replaced generic contact-oriented CTA buttons in rewrite, legacy, and JSON-usaha components with the global WhatsApp CTA fallback pattern.
  - Added a dedicated Sanity page-builder block `whatsapp-cta` and registered it across Studio schema, insert menus, GROQ queries, generated types, and frontend block rendering.
  - Removed stale hardcoded `wa.me` and `/contact-us` defaults from older seed block schemas so new Studio content no longer drifts away from the global WhatsApp configuration.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: CTA behavior is now centralized around `settings.whatsApp` across floating UI, header/mobile nav, content surfaces, and the new Sanity block, reducing CTA drift between Studio defaults and frontend rendering.
- Verification:
  - `pnpm typegen`
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter studio run typecheck`
  - `rg -n 'wa.me/|/contact-us|Contact Us|Get Product' frontend/components frontend/app studio/schemas -g '!**/node_modules/**'`

## 2026-04-03 - Add Header WhatsApp CTA from Global Settings
- Changed files:
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/floating-whatsapp-client.tsx`
  - `frontend/components/whatsapp-link.tsx`
  - `frontend/components/whatsapp-icon.tsx`
  - `studio/schemas/documents/navigation.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated WhatsApp CTA to the header and mobile navigation using the same global `settings.whatsApp` source already used by the floating WhatsApp button.
  - Reused the full WhatsApp parameter set for link generation, including phone number, predefined text, source URL context, and CTA label, so header and floating CTA behavior stay aligned.
  - Extracted reusable `WhatsAppLink` and `WhatsAppIcon` components, and updated the navigation schema description so editors know `headerCta` now appears alongside the global WhatsApp CTA when enabled.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: keeps header CTA behavior consistent across global settings, navigation UI, and floating WhatsApp UI without changing metadata or public route contracts.
- Verification:
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Split Rewrite Landing Sections into Maintainable Modules
- Changed files:
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/ui/rewrite/landing-sections/index.tsx`
  - `frontend/components/ui/rewrite/landing-sections/types.ts`
  - `frontend/components/ui/rewrite/landing-sections/defaults.ts`
  - `frontend/components/ui/rewrite/landing-sections/utility-strip.tsx`
  - `frontend/components/ui/rewrite/landing-sections/service-types-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/pricing-plans-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/features-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/proof-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/testimonials-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/long-guide-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/final-cta-section.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Split the large `RewriteLandingSections` implementation into focused section modules so navigation, defaults, type contracts, and each landing block live in smaller files.
  - Kept the existing public import path by turning `frontend/components/ui/rewrite/landing-sections.tsx` into a thin re-export wrapper over the new folder entrypoint.
  - Preserved the compact landing-section behavior from the previous UI pass while making future edits less risky and easier to review.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only maintainability refactor; no Sanity schema, GROQ query, fetch helper, route behavior, or metadata contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Refactor Universal Trust Badges to Glass Icon Cards
- Changed files:
  - `frontend/components/micro-badges.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced the universal trust badge image gallery with icon-led glass cards using `lucide-react` icons and shadcn-style badge/panel treatment.
  - Added short explanatory copy per badge so the section communicates value clearly without relying on embedded text inside artwork images.
  - Removed the old image-based badge dependency to avoid duplicated wording and align the section with the newer rewrite-shell visual language.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only presentation refactor for the universal trust badge section; no Sanity schema, query, or metadata contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Compact Trust Badge Header Layout
- Changed files:
  - `frontend/components/micro-badges.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Tightened the universal trust badge cards so the icon and title now sit on a single row for a denser, cleaner header rhythm.
  - Reduced each supporting line to a short 3-4 word phrase to keep the strip concise and closer to a modern Vercel-style utility rail.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only refinement to the shared trust badge presentation; no Sanity schema, query, or metadata contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Remove Local Root Homepage Fallback
- Changed files:
  - `frontend/app/(main)/page.tsx`
  - `frontend/components/ui/home/home-page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed the last code-owned homepage fallback so the `/` route now depends entirely on the Sanity `page` document with slug `index`.
  - Deleted the orphaned `components/ui/home/home-page.tsx` implementation because it is no longer referenced by any route.
  - Kept the existing page query and metadata path aligned to the Sanity `page` contract while changing the runtime fallback from local UI rendering to `notFound()`.
- SEO impact:
  - Direct SEO impact: keeps the homepage fully bound to Sanity-managed content instead of silently rendering a separate code-owned fallback experience.
  - Integration impact: frontend root route, metadata resolution, and runtime rendering now consistently depend on the same Sanity `page` source for `/`.
- Verification:
  - `rg -n "components/ui/home|HomePageView|home-page" frontend -g '!**/node_modules/**'`
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Restore Project Categories Schema Contract
- Changed files:
  - `studio/schemas/documents/project.ts`
  - `frontend/sanity/queries/project.ts`
  - `frontend/sanity.types.ts`
  - `studio/schema.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Restored the `categories` field on the Sanity `project` document schema so existing project documents no longer show `Unknown field found` for stored category references.
  - Updated project GROQ queries to include dereferenced categories, bringing the frontend data contract back in sync with the Studio schema.
  - Regenerated extracted schema and generated frontend Sanity types so the cross-layer contract reflects the restored field.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: fixes Studio/frontend contract drift for `project` documents by aligning schema, query output, and generated types around `categories`.
- Verification:
  - `pnpm --filter studio run typegen`
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Restore CMS-Driven Root Homepage
- Changed files:
  - `frontend/app/(main)/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Restored the `/` route to read the Sanity `page` document with slug `index` for both rendering and metadata generation.
  - Kept the product-led local homepage component as a fallback so the root route still renders safely if the `index` document is missing in Sanity.
  - Re-aligned the route behavior with the existing `page` schema/query/fetch contract instead of bypassing CMS content at the root.
- SEO impact:
  - Direct SEO impact: root homepage metadata and content can now follow the managed Sanity `index` page again, while still preserving global `seoSettings` fallback behavior when CMS meta is incomplete.
  - Integration impact: frontend root route is back in sync with the Studio `page` schema, GROQ `PAGE_QUERY`, and frontend fetch/metadata helpers.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Fix Missing Keys in Sanity Block Initial Values
- Changed files:
  - `studio/schemas/blocks/cta/cta-1.ts`
  - `studio/schemas/blocks/grid/grid-row.ts`
  - `studio/schemas/blocks/hero/hero-1.ts`
  - `studio/schemas/blocks/hero/hero-2.ts`
  - `studio/schemas/blocks/split/split-card.ts`
  - `studio/schemas/blocks/split/split-cards-list.ts`
  - `studio/schemas/blocks/split/split-content.ts`
  - `studio/schemas/blocks/split/split-info-list.ts`
  - `studio/schemas/blocks/split/split-info.ts`
  - `studio/schemas/blocks/split/split-row.ts`
  - `studio/schemas/blocks/timeline/timeline-row.ts`
  - `studio/schemas/blocks/timeline/timelines-1.ts`
  - `skills/sanity-seo-integration/SKILL.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added explicit `_key` values to object-array `initialValue` payloads across seeded Sanity blocks, including nested Portable Text blocks/spans and block-array items used by hero, CTA, grid, split, and timeline presets.
  - Removed the main source of Sanity Studio `Missing keys` errors when editors open or modify newly inserted predefined blocks.
  - Updated the local Sanity integration skill so future schema edits keep `_key` coverage on array-based defaults.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: improves Studio editor stability without changing frontend query shapes, metadata behavior, or public page rendering contracts.
- Verification:
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Vendor Sanity Agent Toolkit Skills into Repo
- Changed files:
  - `skills/content-experimentation-best-practices`
  - `skills/content-modeling-best-practices`
  - `skills/sanity-best-practices`
  - `skills/seo-aeo-best-practices`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Copied the installed `sanity-io/agent-toolkit` skills into the repository `skills/` directory so they are available as versioned local project guidance.
  - Added the toolkit skill folders without modifying their contents, preserving the upstream structure for later review or customization.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: improves local agent workflow consistency for Sanity content modeling, experimentation, and SEO/AEO practices without changing runtime code or schema behavior.
- Verification:
  - Manual path check confirmed the four toolkit skill directories now exist under `skills/`.

## 2026-04-03 - Add Hero 2 Soft Binding to Page Title
- Changed files:
  - `frontend/sanity/queries/page.ts`
  - `frontend/components/blocks/index.tsx`
  - `frontend/components/blocks/hero/hero-2.tsx`
  - `frontend/app/(main)/page.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/test-page-hybrid/page.tsx`
  - `studio/schemas/blocks/hero/hero-2.ts`
  - `frontend/sanity.types.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added soft binding for `hero-2` so the frontend falls back to the parent `page.title` whenever the block's own `title` field is empty.
  - Updated the shared page query and block renderer flow to pass `page.title` into block components, then applied the fallback in the `hero-2` component only.
  - Added editor-facing schema guidance on `hero-2.title` so CMS users know they can leave the field empty to inherit the page title.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: reduces duplicated title content between page documents and `hero-2` blocks while keeping manual title override support intact.
- Verification:
  - `pnpm typegen`
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Extend Page Title Soft Binding to Hero 1 and Section Header
- Changed files:
  - `frontend/components/blocks/hero/hero-1.tsx`
  - `frontend/components/blocks/section-header.tsx`
  - `studio/schemas/blocks/hero/hero-1.ts`
  - `studio/schemas/blocks/section-header.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extended the existing page-title soft binding pattern so `hero-1` and `section-header` now fall back to the parent `page.title` when their local `title` field is empty.
  - Kept manual override behavior intact by resolving `block.title || page.title` in the frontend renderer instead of removing the block fields.
  - Added editor-facing descriptions to both Studio schemas so content editors know the block title field is optional and can inherit from the page title.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: reduces repeated heading content across page documents and two additional block types while preserving explicit override support for custom layouts.
- Verification:
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter studio run typecheck`

## 2026-04-03 - Rewrite Hero WhatsApp CTA and Unified Background
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/hero-primary-cta.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Swapped the rewrite hero primary CTA from a generic chat icon to an explicit WhatsApp brand icon and matching green button styling whenever the CTA resolves to WhatsApp.
  - Moved the large color gradient that previously lived behind the hero image panel into the main hero section background so the text area and visual area share one unified atmosphere.
  - Simplified the image panel treatment by removing the extra gradient and grid overlay layers from the lower visual frame while keeping the softer glow effect for depth.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only visual/CTA refinement for the rewrite hero; no Sanity schema, query, or metadata contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Simplify Rewrite Hero Image Frame Background
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reduced the rewrite hero image frame to a single inner background treatment by removing the remaining glow layer behind the visual panel.
  - Kept the hero image container and outer shell intact while simplifying the inner frame from layered glass/gradient treatment to a cleaner single-surface background.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only visual simplification for the rewrite hero frame; no CMS/schema/query changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Compact Rewrite Landing Sections and Refresh Component UI
- Changed files:
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/app/(main)/component-ui/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Compressed the rewrite landing flow by merging the TOC and quick-action strip, removing the mid-page CTA interruption, and converting several long stacked split panels into denser grid/lane compositions.
  - Reworked service, pricing, proof, and testimonial sections so they scan faster and no longer feel excessively wide and fragmented across repeated full-width scenes.
  - Updated `/component-ui` copy so the internal audit page reflects the newer, more compact landing-section pattern.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only layout and audit-page refresh for rewrite sections; no Sanity schema, query, or metadata changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Remove Internal Rewrite Shell Copy from Public Pages
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/page-shell.tsx`
  - `frontend/lib/legacy-pages/content/printing-overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed public-facing internal/demo copy from the commercial rewrite shell, including hero helper text and visual-system presentation text that did not belong on business landing pages.
  - Simplified the rewrite shell so public commercial pages render user-facing content only: hero, landing sections, badges, highlights, FAQ/process, and related links.
  - Replaced the `percetakan` intro override with a direct user-facing commercial message instead of editorial/internal rewrite wording.
- SEO impact:
  - Direct SEO impact: reduces off-intent/internal wording on public money pages and improves message relevance for search visitors.
  - Integration impact: UI-shell/content cleanup only; no Sanity schema/query contract changes.
- Verification:
  - Source grep confirms the removed internal strings no longer exist in the frontend codebase.
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Reintegrate Rewrite Modules for Percetakan with User-Facing Copy
- Changed files:
  - `frontend/components/ui/rewrite/page-shell.tsx`
  - `frontend/components/ui/rewrite/quote-spotlight.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reintroduced selected rewrite-shell modules for the public `percetakan` page only: metrics rail, phrase strip, stage panels, quote spotlight, and logo wall.
  - Replaced demo/system-oriented copy with percetakan-specific business copy focused on specs, production control, quality assurance, and delivery readiness.
  - Added percetakan-specific hero image mapping and made `QuoteSpotlight` configurable so section messaging can stay user-facing by route.
- SEO impact:
  - Direct SEO impact: improves topical depth and commercial relevance on `/percetakan` without reintroducing internal/dev wording.
  - Integration impact: frontend-only shell/content composition update; no Sanity schema/query contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Legacy Rewrite Content Registry Split
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/lib/legacy-pages/content/index.ts`
  - `frontend/lib/legacy-pages/content/types.ts`
  - `frontend/lib/legacy-pages/content/constants.ts`
  - `frontend/lib/legacy-pages/content/utils.ts`
  - `frontend/lib/legacy-pages/content/overrides.ts`
  - `frontend/lib/legacy-pages/content/core.ts`
  - `frontend/lib/legacy-pages/content/website.ts`
  - `frontend/lib/legacy-pages/content/printing.ts`
  - `frontend/lib/legacy-pages/content/software.ts`
  - `frontend/lib/legacy-pages/content/misc.ts`
  - `frontend/lib/legacy-pages/content/registry.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced the monolithic legacy rewrite generator with a modular content layer split into shared SEO/core helpers, per-cluster content modules, and a registry-based resolver.
  - Kept the existing public API surface intact by preserving `buildLegacyRewriteCopy` and `buildPercetakanCetakBukuCityCopy` as the runtime entrypoints used by routes/components.
  - Formalized route-to-content resolution so `pembuatan-website`, `percetakan`, `software`, `sistem-pos`, and supporting misc sections resolve through explicit builders instead of one growing conditional file.
- SEO impact:
  - No direct SEO output change intended.
  - Integration impact: improves maintainability of the legacy rewrite content source while preserving the existing metadata fallback path (`generateBasicMetadata` -> `seoSettings`) and route behavior.
- Verification:
  - `pnpm --filter frontend run typecheck`
  - Manual contract check on runtime entrypoints (`buildLegacyRewriteCopy`, `buildPercetakanCetakBukuCityCopy`) and existing route consumers.

## 2026-04-03 - Legacy Rewrite Override Split by Cluster
- Changed files:
  - `frontend/lib/legacy-pages/content/overrides.ts`
  - `frontend/lib/legacy-pages/content/website-overrides.ts`
  - `frontend/lib/legacy-pages/content/printing-overrides.ts`
  - `frontend/lib/legacy-pages/content/software-overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Split the previously mixed `PRIORITY_SLUG_OVERRIDES` map into dedicated override files for website, printing, and software clusters.
  - Reduced the shared `overrides.ts` file to a thin composition layer so page-specific tuning can be maintained within its own business domain.
  - Preserved the existing enrichment/runtime contract by keeping the merged `PRIORITY_SLUG_OVERRIDES` export unchanged for callers.
- SEO impact:
  - No direct SEO output change intended.
  - Integration impact: lowers maintenance risk for manual money-page overrides while preserving the same frontend rewrite metadata/copy behavior.
- Verification:
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter frontend run build`

## 2026-04-03 - Percetakan Anchor Pages Split into Dedicated Modules
- Changed files:
  - `frontend/lib/legacy-pages/content/printing.ts`
  - `frontend/lib/legacy-pages/content/registry.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/percetakan-index.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-buku.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-brosur.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-company-profile.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extracted four high-value `percetakan` routes into dedicated page content modules: section index, `cetak-buku`, `cetak-brosur`, and `cetak-company-profile`.
  - Updated the legacy content registry so those routes are explicitly classified and resolved as page-specific sources instead of remaining implicit branches inside the cluster builder.
  - Kept the existing rendering and metadata contracts intact by leaving `buildLegacyRewriteCopy` as the shared runtime entrypoint.
- SEO impact:
  - No direct SEO output change intended.
  - Integration impact: improves maintainability and page-level ownership for priority printing routes while preserving current route behavior and the existing `seoSettings` fallback pipeline.
- Verification:
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter frontend run build`

## 2026-04-03 - Percetakan Detail Presets and City Overrides Split
- Changed files:
  - `frontend/lib/legacy-pages/content/printing.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/detail-presets.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-buku-city-overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Moved remaining `percetakan` detail preset content out of the main cluster builder into `printing-pages/detail-presets.ts`.
  - Moved `jasa-cetak-buku-(kota)` intent overrides into `printing-pages/cetak-buku-city-overrides.ts`.
  - Reduced `printing.ts` to a smaller orchestrator that delegates to page modules, preset modules, and city override data instead of storing all content inline.
- SEO impact:
  - No direct SEO output change intended.
  - Integration impact: lowers maintenance risk for the `percetakan` rewrite cluster while preserving existing route output and metadata fallback behavior.
- Verification:
  - `pnpm --filter frontend run typecheck`
  - `pnpm --filter frontend run build`

## 2026-04-03 - Live-Site SEO Rewrite Comparison Pass
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Compared key live money pages against local rewrite coverage for `pembuatan-website`, `software`, `sistem-pos`, `percetakan`, `pembuatan-website/jasa-pembuatan-website-company-profile`, and `percetakan/cetak-buku`.
  - Extended rewrite SEO copy with stronger commercial phrasing, Surabaya geo intent, richer FAQ/supporting content, and more targeted CTA/internal-link coverage for high-value rewrite routes.
  - Expanded `cetak-buku`, `percetakan`, and `sistem-pos` supporting long-guide/intent depth so rewrite pages cover more live-site search themes while improving decision-stage relevance.
- SEO impact:
  - Direct SEO impact: strengthens title/description keyword alignment, geo relevance, and topical depth for high-intent rewrite clusters compared with the live site baseline.
  - Integration impact: frontend rewrite-content layer only; no Sanity schema/query contract changes.
- Verification:
  - Live-site comparison via direct fetch of current production pages (`title`, `meta description`, `h1`) for the target cluster.
  - `pnpm dlx tsx` source validation of rewrite outputs for target routes.
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Live-Site SEO Rewrite Comparison Pass v2
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Continued live-vs-local rewrite comparison on city and detail money pages: `pembuatan-website/surabaya`, `pembuatan-website/bandung`, `percetakan/cetak-brosur`, `percetakan/cetak-company-profile`, `software/pembuatan-software`, and `software/implementasi-software`.
  - Expanded city-page rewrite coverage with stronger `SEO friendly`, `company profile`, and `toko online` intent plus richer FAQ/internal CTA support.
  - Strengthened detail money-page rewrite copy for `cetak-brosur`, `cetak-company-profile`, `pembuatan-software`, and `implementasi-software` with sharper geo/commercial phrasing aligned to live search themes.
- SEO impact:
  - Direct SEO impact: improves keyword/theme coverage for city and detail commercial routes by better matching live-site query patterns while extending conversion-stage support content.
  - Integration impact: frontend rewrite-content layer only; no Sanity schema/query contract changes.
- Verification:
  - Live-site comparison via direct fetch of current production pages (`title`, `meta description`, `h1`) for the target routes.
  - `pnpm dlx tsx` source validation of rewrite outputs for the updated routes.
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Product Card Compact Desktop Pass
- Changed files:
  - `frontend/components/ui/product-card.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reduced product card density for listing views by shrinking desktop title/body/meta text, tightening spacing, shortening image height, and reducing the CTA icon footprint.
  - Added a `line-clamp-3` guard on product excerpts so card heights stay more consistent in denser desktop grids.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only presentation refinement for the existing product card contract; no Sanity schema/query changes required.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Reusable Archive Card/Grid System
- Changed files:
  - `frontend/components/ui/archive-card.tsx`
  - `frontend/components/ui/load-more-grid.tsx`
  - `frontend/components/ui/taxonomy-badge-list.tsx`
  - `frontend/components/ui/inline-meta-list.tsx`
  - `frontend/components/ui/post-card.tsx`
  - `frontend/components/ui/product-card.tsx`
  - `frontend/components/ui/service-card.tsx`
  - `frontend/components/ui/project-card.tsx`
  - `frontend/components/posts/post-grid.tsx`
  - `frontend/components/products/product-grid.tsx`
  - `frontend/components/services/service-grid.tsx`
  - `frontend/components/projects/project-grid.tsx`
  - `frontend/app/(main)/blog/[slug]/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `frontend/app/(main)/projects/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added shared archive-card primitives for shell, media, title, meta, excerpt, and arrow CTA so `post`, `product`, `service`, and `project` listings reuse the same structure.
  - Added reusable `LoadMoreGrid` to centralize progressive archive pagination behavior across listing pages.
  - Added reusable taxonomy badge list and inline metadata pill list, then wired them into blog/product/service/project detail pages for consistent tag/meta rendering.
  - Converted domain card components into thin wrappers over the new reusable layer while preserving route-level behavior and existing content contracts.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: frontend-only UI/component consolidation; no Sanity schema, query contract, or metadata fallback behavior changed.
- Verification:
  - `pnpm --filter frontend run typecheck`

## 2026-04-03 - Build-Time Sanity Redirect Diagnostics
- Changed files:
  - `frontend/next.config.mjs`
  - `docs/env-reference.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Checked redirect contract sync across Studio and frontend:
    - Studio schema uses `source`, `destination`, `permanent`, `isEnabled`
    - `next.config.mjs` queries and normalizes the same fields
  - Added build-time diagnostics to the Sanity redirect loader in `next.config.mjs`.
  - The loader now logs when required Sanity env vars are missing, when the redirect query returns a non-array payload, and when redirect fetch succeeds with a compact summary (`projectId`, `dataset`, `apiVersion`, token mode, redirect count, sample redirects).
  - Added authenticated redirect-fetch fallback for build/deploy by reading token envs in this order:
    - `SANITY_API_READ_TOKEN`
    - `SANITY_DEPLOY`
    - `SANITY_AUTH_TOKEN`
    - `SANITY_DEV`
  - This addresses the verified case where `redirect` documents were readable with token but returned `[]` over anonymous published API access.
- SEO impact:
  - Direct SEO impact: restores expected delivery path for managed `301` redirects during deploy/build when redirect documents are private, reducing false `404` outcomes on curated legacy aliases.
  - Integration impact: improves observability for Sanity-backed redirect loading during build and aligns env expectations for redirect hydration.
- Verification:
  - Schema/query contract reviewed manually: frontend loader and Studio redirect document remain aligned.
  - Local verification:
    - anonymous redirect query returned `0`
    - authenticated redirect query returned `28`
    - local `next.config.mjs` redirect loader previously returned only static redirect in anonymous mode, confirming the root cause before auth fallback was added.

## 2026-04-03 - `/home` Vercel-Style Showcase Route + Redirect Release
- Changed files:
  - `frontend/lib/local-content/home-page.ts`
  - `frontend/components/ui/home/home-page.tsx`
  - `frontend/app/(main)/home/page.tsx`
  - `frontend/components/ui/rewrite/hero-primary-cta.tsx`
  - `frontend/components/floating-whatsapp-client.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated `/home` route as a code-driven showcase landing page with a restrained Vercel-inspired composition and reusable section structure.
  - Source messaging was derived from the live `kotacom.id` homepage and expanded into a clearer product-style narrative covering website delivery, software, IT support, printing, workflow, proof, and tech stack.
  - Introduced reusable content/config layer in `frontend/lib/local-content/home-page.ts` so the page structure stays code-driven while page copy remains easy to evolve.
  - Disabled the live Sanity redirect document `/home -> /` so the new route can resolve directly instead of being absorbed into the redirect wave.
  - Removed `useSearchParams()` dependencies from WhatsApp CTA client components that only needed path-level recomputation, preventing Next 16 prerender failures on `/about` while keeping CTA behavior intact.
- SEO impact:
  - Direct SEO impact: creates a new crawlable landing experience at `/home` with dedicated metadata instead of redirecting to `/`.
  - Integration impact: preserves the CMS-driven `/` homepage while adding a controlled experimental/preview route for redesign comparison; build-safe client CTA hook cleanup does not change CMS/schema contracts.
- Verification:
  - Local Sanity verification: redirect document `redirect.kotacom.fb365c1216b59e1c` now has `isEnabled: false`.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Product-Home Preview Route Swap
- Changed files:
  - `frontend/app/(main)/product-home/page.tsx`
  - `frontend/app/(main)/home/page.tsx`
  - `frontend/components/ui/home/home-page.tsx`
  - `frontend/lib/local-content/home-page.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Moved the product-style preview landing from `/home` to `/product-home` to avoid path-level conflicts in live environments.
  - Converted `/home` into a direct route-level redirect to `/product-home` so previous references still resolve.
  - Removed hardcoded `/home` wording from the shared landing copy so the same component can be reused under a different preview path.
- SEO impact:
  - Direct SEO impact: canonical preview path for the experimental landing is now `/product-home`; `/home` becomes a supporting redirect path instead of a standalone destination.
  - Integration impact: no Sanity schema/query contract changes; this is route-level wiring only.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Product-Led Homepage Promotion
- Changed files:
  - `frontend/app/(main)/page.tsx`
  - `frontend/app/(main)/home/page.tsx`
  - `frontend/app/(main)/product-home/page.tsx`
  - `frontend/components/ui/home/home-page.tsx`
  - `frontend/lib/local-content/home-page.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Promoted the product-led landing from preview status into the primary `/` homepage.
  - Turned both `/home` and `/product-home` into redirect aliases back to `/` so the new homepage owns the canonical route.
  - Refactored the homepage view to use shared `component ui` primitives (`SectionShell`, `SectionIntro`, `SectionPanel`) so its spacing, surfaces, and rhythm match the rest of the rewrite/UI system.
  - Updated homepage copy to read as the main site experience instead of an experimental alternative.
- SEO impact:
  - Direct SEO impact: root homepage metadata and canonical behavior now follow the new product-led homepage instead of the previous Sanity `index` block page.
  - Integration impact: this intentionally overrides the CMS-driven homepage rendering at `/` while leaving Sanity schema/query contracts untouched elsewhere.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Sanity Dev Key Policy for Agent Communication
- Changed files:
  - `AGENTS.md`
  - `docs/env-reference.md`
  - `frontend/.env.example`
  - `studio/.env.example`
  - `frontend/scripts/import-astro-navigation.mjs`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added explicit agent policy to use Sanity **development credentials first** for CMS communication (read/write/query/import/mutation), with token priority `SANITY_DEV` -> `SANITY_AUTH_TOKEN`.
  - Clarified env documentation and examples so `SANITY_DEV` is treated as a dev write token value (not boolean) for automation contexts.
  - Updated navigation import script write-config error message to mention `SANITY_DEV` fallback explicitly.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: safer CMS operation boundary for migration/content automation by defaulting agent workflows to dev credentials.
- Verification:
  - Manual config review completed across agent rule + env reference + env examples + script message alignment.

## 2026-04-02 - Override-Safe Enrichment Fix (FAQ/CTA Coverage Lock)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refactored `enrichCopyForSeo` to apply priority slug overrides first, then run enrichment derivation (keywords, intro strengthening, FAQ expansion, CTA link merge, final CTA fallback) on top of the effective copy.
  - This prevents manual slug overrides from reducing FAQ and CTA-link coverage in money-page outputs.
  - Added source-level validation for commercial clusters (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) using `buildLegacyRewriteCopy`.
- SEO impact:
  - Direct SEO impact: consistent FAQ depth and action-path CTA coverage across commercial pages after manual copy overrides.
  - No schema/query contract changes.
- Verification:
  - Source check result: `99/99` routes pass (`faq >= 4`, `ctaLinks >= 4`).
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Explicit 410 Handling for Spam/Judi + Template URLs
- Changed files:
  - `frontend/lib/seo/gone-paths.ts`
  - `frontend/proxy.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated frontend denylist for `28` low-value URLs classified as spam/judi or template garbage.
  - Enforced explicit `410 Gone` responses at the `proxy` layer before normal route resolution, so these paths no longer fall through to generic route handling.
  - Applied `X-Robots-Tag: noindex` on those responses to reinforce deindexing intent.
- SEO impact:
  - Direct SEO impact: stronger removal signal than homepage redirects or generic `404`, reducing soft-404 risk and preventing low-quality URL retention in index evaluation.
  - Integration impact: path-level cleanup is centralized in frontend runtime without changing Sanity schemas or redirect documents.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after regenerating `.next/types` during build.

## 2026-04-02 - Software Funnel CTA Expansion + Rewrite Section CTA Injection
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added software-cluster CTA-link overrides for funnel intent pages: `software`, `pembuatan-software`, `implementasi-software`, `instalasi-software`, and `sistem-pos` to make action paths more specific by stage (discovery, scope, go-live, handover).
  - Added new CTA blocks in rewrite components:
    - `highlights`: primary CTA + FAQ jump CTA
    - `process-faq`: contextual CTA panel (diskusi kebutuhan + quick CTA jump)
  - This increases conversion entry points in reusable frontend sections without changing route contracts.
- SEO impact:
  - Direct SEO/conversion impact: stronger internal action flow and intent alignment for software money pages; improved engagement signals through clearer user-path CTAs.
  - No schema/query shape change (frontend content + UI reuse layer only).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Manual Money-Page Rewrite Pass v4 (Website + Printing Priority Slugs)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added manual commercial copy overrides (headline/intro/CTA/final CTA/FAQ) for additional high-intent slugs in core revenue clusters:
    - Website: `jasa-pembuatan-website-expedisi`, `jasa-pembuatan-website-komunitas-ngo`, `jasa-pembuatan-website-konstruksi`, `portfolio`
    - Printing: `cetak-al-quran`, `cetak-album-pernikahan`, `cetak-banner-spanduk`, `cetak-kaos`, `cetak-stiker`, `cetak-undangan`, `cetak-yasin`, `cetak-buku-kenangan-sekolah`
  - The pass shifts these pages from generic rule-based messaging into more specific intent-driven sales copy with stronger conversion paths.
- SEO impact:
  - Direct SEO impact: improves intent match, semantic relevance, and FAQ answer depth on priority commercial routes.
  - Integration impact: no schema/query/render contract changes; update is isolated to shared rewrite content engine.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Content Quality Pass v3 for `layanan/[slug]` (JSON Usaha Money Pages)
- Changed files:
  - `frontend/lib/local-content/json-usaha.ts`
  - `frontend/components/ui/json-usaha-page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added intent-based normalization for JSON usaha pages: auto-detect page intent (perizinan/agency/general), strengthen hero title fallback, enrich description, normalize CTA labels, and auto-generate stronger final CTA defaults.
  - Added FAQ enrichment layer with seeded commercial FAQs and dedupe, ensuring richer answer coverage for service-intent pages.
  - Increased CTA density in `JsonUsahaPageView` across hero, service cards, mid-section prompt, pricing cards, FAQ closeout, and final CTA fallback button.
- SEO impact:
  - Direct SEO impact: stronger commercial-intent relevance for service pages (`/layanan/[slug]`), richer FAQ schema payload quality, and improved conversion-oriented internal CTA signals.
  - Integration impact: no schema/query shape changes; frontend remains aligned with existing local JSON content contract.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Final SEO Snippet Guard Tuning (Short + Long Normalization)
- Changed files:
  - `frontend/lib/legacy-pages/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Enhanced metadata normalization to handle both edges:
    - title: normalized for too short and too long values
    - description: normalized for too short and too long values
  - This ensures rewrite-route metadata snippets remain consistently SEO-friendly without manual per-page adjustment.
- SEO impact:
  - Direct SEO impact: improves SERP snippet consistency and readability by maintaining practical title/description bounds across legacy rewrite routes.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Wave 2 SEO Rewrite Power-Up (Priority Slug Overrides + Meta Length Guard)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/lib/legacy-pages/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added priority commercial copy overrides for 10 money-page slugs across printing/website/software clusters (stronger final CTA title/description positioning).
  - Fixed enrichment consistency gap for `sistem-pos` by routing it through centralized SEO enrichment pipeline.
  - Added metadata guard (`normalizeMetaDescription`) in legacy metadata generator to keep generated meta descriptions within SEO-friendly length target (~120-155 chars) with safe truncation.
- SEO impact:
  - Direct SEO/integration impact: stronger conversion intent signals on high-value rewrite routes + improved snippet readability/consistency on SERP due to controlled description length.
  - No CMS schema/query contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Intent-Based SEO Rewrite Enrichment (Slug Pattern Packs)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extended centralized rewrite SEO enrichment with slug-intent packs for high-intent patterns (`harga/biaya`, `migrasi`, `toko-online/ecommerce`, `cetak-buku/buku`, `kalender`, `implementasi/instalasi`).
  - Added intent-driven keyword expansion and FAQ injection by slug pattern, while preserving dedupe/length guardrails in the enrichment flow.
  - Added default quick CTA links and normalized final CTA copy for key commercial sections (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) when route copy does not define them.
- SEO impact:
  - Direct SEO/integration impact: higher intent coverage and stronger commercial relevance per route family without manual per-page rewrite.
  - No schema/query contract changes (content generation layer only).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Content SEO Power Enrichment Layer (Centralized)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added centralized `enrichCopyForSeo` layer in rewrite-content pipeline and applied it across all `buildLegacyRewriteCopy` return paths.
  - Enrichment includes semantic keyword expansion + deduplication, stronger conversion-oriented intro/description normalization, FAQ intent expansion, and section-level default long-guide generation for major clusters.
  - This makes rewrite pages more content-rich and SEO-oriented without requiring per-route manual text patching.
- SEO impact:
  - Direct SEO/integration impact: improves topical relevance breadth, semantic keyword coverage, and intent-answer depth on rewrite routes.
  - No CMS schema/query contract changes required (code-driven rewrite content layer only).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - SEO Fallback Images Unified to ZIP Source (OG/Twitter/JSON-LD)
- Changed files:
  - `frontend/lib/illustrations/kotacom-split.ts`
  - `frontend/lib/seo-jsonld.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added centralized SEO fallback image constant in illustration source map (`KOTACOM_SPLIT_DEFAULT_SEO_IMAGE`).
  - Updated JSON-LD image resolver fallback to use the split-pack SEO image instead of legacy `/images/og-image.jpg`.
  - Updated metadata resolver fallback (OpenGraph/Twitter image) to use the same centralized split-pack SEO image.
- SEO impact:
  - Direct SEO/integration impact: social preview and structured data fallback imagery are now aligned to a consistent branded illustration source.
  - Preserved existing fallback hierarchy behavior (`meta.image` -> `page.image` -> `seo.defaultImage` -> centralized ZIP fallback).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Enriched About/Contact/404 + Added Global Micro Badge Strip from ZIP Source
- Changed files:
  - `frontend/components/micro-badges.tsx`
  - `frontend/components/ui/rewrite/page-shell.tsx`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/404.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable `MicroBadges` component using ZIP-sourced badge assets (`fast response`, `secure process`, `guarantee`, `nationwide delivery`, `custom request`).
  - Wired micro badges into rewrite and legacy page shells so pages that use these shells inherit the new trust-strip visual block.
  - Added section-based hero image mapping in rewrite shell so `about` and `contact` pages now automatically render split-pack hero illustrations.
  - Enriched 404 UI with dedicated split-pack 404 state image and integrated micro badge strip.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual/trust UX enrichment only; no CMS schema/query/metadata contract changes.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - ZIP Asset Mapping Centralization for All Illustration Consumers
- Changed files:
  - `frontend/lib/illustrations/kotacom-split.ts`
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added centralized illustration source map (`kotacom-split.ts`) that points to extracted ZIP assets under `/images/kotacom-split-production-ready`.
  - Migrated all active illustration consumers in rewrite/city-shell/style-guide to use centralized mapping constants instead of scattered hardcoded image paths.
  - Updated legacy landing sections proof-image fallback to the same centralized ZIP-based source to keep behavior consistent across UI variants.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: unified image source contract for illustration components, reducing path drift and easing future asset swaps.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Integrated `kotacom-split-production-ready` Assets into Active Rewrite UI
- Changed files:
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced legacy `images/percetakan/*.svg` illustration references with extracted production pack assets under `images/kotacom-split-production-ready/*`.
  - Wired `jasa-cetak-buku` city-shell hero to production hero image (`hero-cetak-buku-shark-v2.png`).
  - Updated rewrite landing defaults for service cards and proof cards with production-ready printing/website/IT/proof illustration files.
  - Updated `/style-guide` gallery sections (hero/service/support) to display new production pack assets.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: stronger visual consistency on CMS-driven rewrite pages and style-guide reference surfaces.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Extracted `kotacom-split-production-ready` Illustration Bundle
- Changed files:
  - `frontend/public/images/kotacom-split-production-ready/**`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extracted `frontend/public/images/kotacom-split-production-ready.zip` into `frontend/public/images/kotacom-split-production-ready/`.
  - Bundle contains normalized/cropped PNG shark mascot assets grouped by production categories (`hero`, `services/*`, `ui`, `proof`, `micro`, `states`, `about`, `contact`, plus `archive`).
  - Verified manifest and readme presence for direct integration mapping.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: ready-to-use visual assets for redesign/remodeling sections and service pages.
- Verification:
  - `unzip -l` verified archive index (53 entries total including manifest/readme).
  - `manifest.json` validated with `count: 51` asset file list.

## 2026-04-02 - Prompt Hardening + Priority-1 Illustration Regeneration (`v2`)
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `frontend/public/images/illustrations/hero/hero-jasa-cetak-buku-shark-v2.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-pod-shark-v2.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-offset-shark-v2.jpg`
  - `frontend/public/images/illustrations/services/service-finishing-jilid-shark-v2.jpg`
  - `frontend/public/images/illustrations/cta/cta-konsultasi-cetak-buku-shark-v2.jpg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added `Consistency Prompt Lock v2` section to the shark illustration master doc with stricter mascot/style/palette/composition constraints.
  - Added detailed regeneration prompts for the Priority-1 `jasa-cetak-buku` pack (hero, POD, offset, finishing, CTA).
  - Regenerated all 5 priority illustration assets as `-v2` variants using the hardened prompts.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual asset consistency improved for upcoming route-level migration/remodeling integration.
- Verification:
  - `file` command check passed for all regenerated outputs (valid JPEG image files, `1280x768`).

## 2026-04-02 - Priority-1 KOTA SHARK Illustration Generation (Jasa Cetak Buku Pack)
- Changed files:
  - `frontend/public/images/illustrations/hero/hero-jasa-cetak-buku-shark.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-pod-shark.jpg`
  - `frontend/public/images/illustrations/services/service-cetak-buku-offset-shark.jpg`
  - `frontend/public/images/illustrations/services/service-finishing-jilid-shark.jpg`
  - `frontend/public/images/illustrations/cta/cta-konsultasi-cetak-buku-shark.jpg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Generated first priority illustration pack based on `docs/flat-illustration-shark-plan.md` for `jasa-cetak-buku` workflow.
  - Produced 5 web-ready shark-mascot assets covering hero, core services (POD, offset, finishing), and conversion CTA visual.
  - Saved outputs in the standardized illustration directory structure for upcoming route/component integration.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual content assets prepared for migration/remodeling implementation; no schema/query/metadata contract changes in this step.
- Verification:
  - `file` command check passed for all outputs (valid JPEG image files, `1280x768`).

## 2026-04-02 - Kotacom Logo Remodeling Integration (Default Brand Asset + Style Guide Sync)
- Changed files:
  - `frontend/components/logo.tsx`
  - `frontend/public/images/branding/kotacom-logo.svg`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added official `kotacom.id` SVG logo asset into frontend public branding directory and wired it as the default logo fallback.
  - Refactored shared `Logo` component so Sanity-driven logo remains primary when available, while defaulting to the official Kotacom brand logo when CMS logo is empty.
  - Updated `/style-guide` page with a dedicated brand section showing integrated logo usage and key visual brand cues used in migration.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: improved cross-page branding consistency for migration UI shell while preserving existing CMS query/schema logo contract.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Manual cross-layer sync check completed: Studio `settings.logo` schema, frontend settings query (`SETTINGS_QUERY`), and frontend logo render fallback remain aligned.

## 2026-04-02 - Sticky WhatsApp Icon Switched to WhatsApp Brand Glyph
- Changed files:
  - `frontend/components/floating-whatsapp-client.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced generic message bubble icon in sticky WhatsApp button with a dedicated WhatsApp brand-style SVG icon.
  - Preserved existing animation, CTA text behavior, and tracking link generation logic.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI-only update for clearer WhatsApp affordance.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Local Dev Stability Switch (`next dev --webpack`)
- Changed files:
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Switched frontend local dev script from Turbopack to Webpack (`next dev --webpack`) to avoid persistent Turbopack workspace-root inference failure in monorepo environment.
  - Keeps production build path unchanged (`next build`), while restoring reliable local startup for ongoing migration work.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: dev-runtime reliability improvement only.
- Verification:
  - Script-level change validated in `frontend/package.json`.
  - Runtime verification to be confirmed in user environment by re-running `pnpm dev`.

## 2026-04-02 - Turbopack Root Revert for Package-Local Resolution (`next`/`tailwindcss`)
- Changed files:
  - `frontend/next.config.mjs`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reverted `turbopack.root` from workspace root back to frontend package root (`__dirname`).
  - Prevents Turbopack from resolving dependencies from the wrong package boundary, which caused `next/package.json` and `tailwindcss(.css)` lookup failures under `frontend/app`.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: restores local frontend dev runtime stability for migration/SEO work.
- Verification:
  - Config-level validation completed; `turbopack.root` points to frontend package directory.
  - Runtime verification to be confirmed via clean local dev restart (`pnpm dev`) after cache reset.

## 2026-04-02 - Global Vercel-Style Grid Background Utility
- Changed files:
  - `frontend/app/globals.css`
  - `frontend/app/(main)/layout.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable global utility class `bg-grid-vercel` using dual linear-gradients (x/y) with radial mask for subtle Vercel-style square grid effect.
  - Applied `bg-grid-vercel` to main layout wrapper (`app/(main)/layout.tsx`) so all main pages inherit a consistent grid background layer.
  - Kept existing `ui-shell` background system intact; grid layer is additive and low-opacity.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual layer update only (no schema/query/metadata changes).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Mobile Nav Loop Hard-Fix (Remove `useEffect` State Init)
- Changed files:
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed `useEffect`-based `openGroups` initialization entirely to eliminate update-loop risk in dev runtime.
  - Added `defaultOpenGroupKeys` memo and moved open/close group initialization to `Sheet` `onOpenChange` event (`open => all groups`, `close => []`).
  - Keeps accordion behavior and full-open default state, while avoiding reactive dependency churn.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: fixes client-side stability issue in mobile navigation.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Fix Mobile Nav Infinite Render Loop (`Maximum update depth exceeded`)
- Changed files:
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Stabilized navigation-derived arrays with `useMemo` (`navItems`, `primaryItems`, `utilityItems`) to prevent effect dependency churn on every render.
  - Hardened `openGroups` initialization effect so state updates occur only when computed group keys actually change.
  - Removed unconditional `setOpenGroups([])` loop pattern when drawer closes.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: fixes client-side runtime crash in mobile navigation UI.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Footer Clean Mode (No Background/Button Surface)
- Changed files:
  - `frontend/components/footer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed button-style surface treatment from footer primary/utility links and converted them to plain text-link navigation.
  - Removed extra rounded wrapper styling from footer navigation columns so footer renders with no background panel/card feel.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI-only cleanup for footer visual consistency.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Mobile Navigation Full-Accordion + Icon Alignment
- Changed files:
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated mobile navigation drawer to full-width/full-height presentation with accordion groups open by default when menu is opened.
  - Preserved accordion interaction (each group remains collapsible/expandable) while improving full-menu visibility for faster scanning.
  - Adjusted icon placement for leaf/child links to right-aligned treatment for cleaner visual rhythm.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI/navigation presentation update only (route/query/schema unchanged).
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Turbopack Root Fix for Dev Boot (`frontend/app` resolution error)
- Changed files:
  - `frontend/next.config.mjs`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated `turbopack.root` from frontend package directory to workspace root (`path.join(__dirname, "..")`) in monorepo setup.
  - This prevents Turbopack from resolving project context from `frontend/app` and fixes the `couldn't find next/package.json` startup failure.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: stabilizes local dev runtime so migration/SEO implementation can proceed without Turbopack boot errors.
- Verification:
  - Config-level validation completed; `next.config.mjs` now resolves root to monorepo workspace path.
  - Runtime verification to be confirmed in user local environment (`pnpm dev`) because sandbox cannot bind to port 3000.

## 2026-04-02 - Footer Navigation Cleanup (Remove Card Surface)
- Changed files:
  - `frontend/components/footer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed `surface-muted` card treatment from footer navigation column wrapper so footer links render in a cleaner flat style.
  - Kept footer navigation grouping and hierarchy intact; only visual container styling changed.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: UI-only cleanup on footer navigation presentation.
- Verification:
  - Manual code review on footer render path completed (navigation links/groups unchanged).

## 2026-04-02 - Home Background Cleanup (Remove Blue Glow Accent)
- Changed files:
  - `frontend/app/globals.css`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated global `ui-shell` glow token (`--glow-top`) in both light and dark themes from blue-tinted radial gradient to neutral grayscale tint.
  - Keeps existing separator and surface system intact while removing blue cast visible on Home background.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: visual consistency improvement only (no metadata/schema/query contract changes).
- Verification:
  - Manual CSS token check completed (`--glow-top` light/dark values updated).

## 2026-04-02 - Env Matrix Sync (`.env.example` + Deploy Env Templates)
- Changed files:
  - `frontend/.env.example`
  - `studio/.env.example`
  - `docs/env-reference.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Synced frontend env example with missing runtime keys used in code (`RESEND_AUDIENCE_ID`) and added complete optional migration/audit script env key list.
  - Updated Studio env example to include explicit `SANITY_STUDIO_AI_WRITER_ACTION_SECRET` for `AI Rewrite` action parity.
  - Updated env reference doc to reflect newsletter audience ID, `SEO_BING_INDEXNOW_ALIAS`, migration/audit env keys, and refreshed quick-start samples.
  - Updated local deploy env templates (`deploy/env/*`) by adding missing keys only (kept existing real values unchanged) for frontend, studio, and GitHub Actions usage.
- SEO impact:
  - No direct SEO rendering impact.
  - Integration impact: lowers env drift risk between local/dev/deploy and stabilizes AI Writer + SEO Ops runtime configuration.
- Verification:
  - Manual cross-check against `process.env.*` usage in `frontend/` and `studio/` completed.
  - Env key parity rechecked across `.env.example` and docs references.

## 2026-04-02 - Next Dev Warning Cleanup (`turbopack.root` + `proxy.ts`)
- Changed files:
  - `frontend/next.config.mjs`
  - `frontend/proxy.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added explicit `turbopack.root` in Next config to avoid workspace root inference warning caused by multiple lockfiles.
  - Migrated deprecated `middleware.ts` convention to `proxy.ts` and updated exported handler name to `proxy`.
  - Updated migration snapshot to record tooling cleanup.
- SEO impact:
  - No direct SEO impact.
  - Integration impact: cleaner local/dev runtime signal and reduced warning noise during content migration operations.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Legacy Content Rendering Finetune (HTML/Markdown Lists & Structure)
- Changed files:
  - `frontend/lib/legacy-content/render.ts`
  - `frontend/components/blocks/legacy-rich-content.tsx`
  - `frontend/components/portable-text-renderer.tsx`
  - `frontend/app/globals.css`
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced regex-only legacy renderer with parser pipeline based on `unified` (`rehype-parse`, `rehype-sanitize`, `rehype-stringify`, `remark-parse`, `remark-rehype`) for more stable HTML/Markdown rendering.
  - Added sanitization schema and external link normalization to reduce broken/unsafe legacy markup while preserving semantic structures.
  - Added `legacy-prose` style system in global CSS to improve visual consistency for headings, bullet/number lists, links, tables, blockquotes, and spacing.
  - Switched legacy content render targets (`page` block renderer and `PortableText` custom type renderer) to use `legacy-prose`.
- SEO impact:
  - Direct integration impact: improved readability and structural clarity for migrated long-form content (including lists and numbered steps), reducing malformed rendering risk on indexable pages.
  - No metadata schema contract change.
- Verification:
  - `pnpm install` completed with lockfile update.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Legacy Rich Content Block + Safe-ID Import Validation
- Changed files:
  - `studio/schemas/blocks/legacy/legacy-rich-content.ts`
  - `studio/schema-types.ts`
  - `studio/schemas/documents/page.ts`
  - `studio/schemas/blocks/shared/block-content.ts`
  - `frontend/sanity/queries/legacy/legacy-rich-content.ts`
  - `frontend/sanity/queries/page.ts`
  - `frontend/lib/legacy-content/render.ts`
  - `frontend/components/blocks/legacy-rich-content.tsx`
  - `frontend/components/blocks/index.tsx`
  - `frontend/components/portable-text-renderer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a shared `legacy-rich-content` schema object to support raw `markdown` or `html` content ingestion for migration paths.
  - Wired the new block across Studio and frontend contracts: available in `page.blocks`, available in `post.body` (`block-content`), queried in page GROQ, and rendered in both page block renderer and Portable Text renderer.
  - Added lightweight markdown/html rendering utility with basic sanitization for HTML and markdown-to-HTML conversion for migration-ready rendering.
  - Validated critical import behavior: documents using dotted IDs can be missing from unauthenticated published reads; switched import IDs to non-dotted `legacy-*` format.
  - Executed Sanity import smoke test: imported 2 pages (`import-page-html-20260402`, `import-page-md-20260402`) and 2 posts (`import-post-html-20260402`, `import-post-md-20260402`) and verified they are visible in both public and authenticated published queries.
- SEO impact:
  - Direct SEO/integration impact: imported legacy content can now be rendered with controlled md/html handling while preserving root/blog slug architecture.
  - Import visibility reliability improved by enforcing safe non-dotted `_id` strategy for page/post migration docs.
- Verification:
  - Sanity mutate transaction succeeded for 4 docs (`2 page + 2 post`) with published visibility checks (`public` and `auth`) both returning the imported slugs.
  - Manual API parity check confirmed the safe-ID docs are readable in unauthenticated published query.

## 2026-04-02 - Local Main Branch Alignment + Deploy Trigger
- Changed files:
  - `studio/.ci-trigger.txt`
  - `docs/seo-updates.md`
- Summary:
  - Switched local development branch to `main` to align daily work with primary remote branch.
  - Updated deploy trigger marker file with a fresh timestamp to trigger deployment without functional code changes.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `git status` reviewed; only intended files changed.

## 2026-04-02 - Legacy Landing v4 (Icons + Visual Sections + FAQ Schema)
- Changed files:
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/legacy/legacy-highlights.tsx`
  - `frontend/components/legacy/legacy-process-faq.tsx`
  - `frontend/lib/seo-jsonld.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Upgraded legacy rewrite template to richer landing composition: quick navigation (TOC), service types, pricing tiers, feature grid with icons, portfolio gallery with images, testimonials, and final CTA section.
  - Added `FAQPage` JSON-LD generation and injected it into legacy page shell to strengthen structured data coverage for rewrite routes.
  - Added section anchors (`#faq`, `#keunggulan`) and integrated new landing sections into the existing reusable shell pipeline.
  - Extended content presets in `rewrite-content.ts` to cover all previously generic Wave 1 routes.
- SEO impact:
  - Direct SEO impact: better intent coverage, stronger on-page structure, richer internal sectioning, and FAQ structured data support.
  - No Studio schema/query contract changes in this cycle.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` not run in this cycle.

## 2026-04-02 - Worker 3 Content Rewrite Pass v3 (Remaining Route Coverage)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded slug-specific rewrite presets under `/pembuatan-website/*` for vertical intents (dokter/klinik, expedisi, komunitas/NGO, konstruksi, sekolah, toko online, template, portfolio).
  - Added city-aware rewrite branch for `/percetakan/cetak-kalender/[kota]` plus dedicated copy presets for remaining printing slugs (`cetak-album-pernikahan`, `cetak-banner-spanduk`, `cetak-brosur`, `cetak-company-profile`, `cetak-kaos`, `cetak-kartu-nama`, `cetak-kemasan-product`, `cetak-stiker`, `cetak-undangan`, `cetak-yasin`).
  - Completed the remaining generic route rewrite backlog for Wave 1 clusters.
- SEO impact:
  - Increases uniqueness and intent alignment on previously less-specific service pages.
  - No direct Studio schema/query change; frontend metadata fallback flow via `seoSettings` remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Coverage check script result: `TOTAL_GENERIC 0`.

## 2026-04-02 - TOC Local-Only Source Lock (No External Copy/Fetch)
- Changed files:
  - `frontend/lib/local-content/astro-catalog.ts`
  - `frontend/app/(main)/toc/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Removed all outside-repository source paths from local content catalog and locked catalog scan to `frontend/content/astro-local/pages` only.
  - Refactored `/toc` to local-only aggregation (core static links, local astro mirror, legacy manifest, docs index) and removed Sanity fetch dependency for this page.
  - Updated migration megapan snapshot to reflect local-first TOC behavior.
- SEO impact:
  - Direct integration impact: keeps URL coverage QA available without CMS/runtime dependency and prevents accidental coupling to out-of-repo sources.
  - No direct metadata schema change.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Scope Navigation-Only Fields in Shared Link Schema
- Changed files:
  - `studio/schemas/blocks/shared/link.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Scoped navigation-specific fields in the shared `link` schema (`buttonVariant`, `navLocation`, `showInFooter`, `icon`, `children`) so they only appear when editing `navigation` documents.
  - Updated `navLocation` validation to enforce required value only for `navigation` documents, preventing irrelevant validation pressure on non-navigation content (post/product/service/cta blocks).
- SEO impact:
  - No direct SEO impact.
  - Integration impact: reduces Studio authoring ambiguity and prevents navigation-only config from leaking into non-navigation content models.
- Verification:
  - `pnpm --filter studio run typecheck` passed.

## 2026-04-02 - Metadata Image Fallback Enhanced with Content Thumbnail
- Changed files:
  - `frontend/sanity/lib/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated metadata image resolver to use per-document content image as fallback when `meta.image` is empty.
  - New priority order for Open Graph/Twitter image: `meta.image` -> content main image (`page.image`) -> global `seoSettings.defaultImage` -> static `/images/og-image.jpg`.
- SEO impact:
  - Direct SEO impact: improves share-card relevance by using document thumbnail automatically when dedicated SEO image is not filled.
  - Studio-frontend contract remains compatible (no schema shape change).
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Add Project CMS Contract + Frontend Routes (`/projects`)
- Changed files:
  - `studio/schemas/documents/project.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/defaultDocumentNode.ts`
  - `studio/presentation/resolve.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `studio/schemas/blocks/shared/block-content.ts`
  - `frontend/sanity/queries/project.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/sanity/queries/shared/link.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/components/ui/project-card.tsx`
  - `frontend/app/(main)/projects/page.tsx`
  - `frontend/app/(main)/projects/[slug]/page.tsx`
  - `frontend/app/sitemap.ts`
  - `frontend/app/(main)/toc/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added new Studio `project` document schema and registered it in schema types + Studio desk structure.
  - Added Studio preview/presentation route resolution for project documents (`/projects/[slug]`).
  - Synced shared link/reference contracts so internal links can target `project` in navigation and rich text annotations.
  - Added frontend project data layer (GROQ queries + fetch helpers) and new routes: `/projects` listing and `/projects/[slug]` detail.
  - Extended sitemap path mapping and TOC core links to include project URLs.
- SEO impact:
  - Direct SEO/integration impact: project pages are now first-class routable content with metadata generation and sitemap inclusion.
  - Cross-layer sync completed for route/schema/query/render contracts of `project`.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - AI Writer Foundation with Gateway/BYOK + Key Rotation
- Changed files:
  - `studio/schemas/documents/ai-writer-settings.ts`
  - `studio/schema-types.ts`
  - `studio/sanity.config.ts`
  - `studio/structure.ts`
  - `frontend/sanity/queries/ai-writer-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/lib/ai-writer/sanity-write.ts`
  - `frontend/lib/ai-writer/settings-source.ts`
  - `frontend/lib/ai-writer/generate.ts`
  - `frontend/app/api/ai/config/status/route.ts`
  - `frontend/app/api/ai/config/save/route.ts`
  - `frontend/app/api/ai/generate/route.ts`
  - `frontend/package.json`
  - `docs/env-reference.md`
  - `docs/ai-writer-gateway-setup.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added singleton `aiWriterSettings` in Studio for provider mode, model routing, prompt templates, and encrypted credential pools.
  - Added authenticated AI config APIs to save/read runtime settings with encryption and Sanity persistence.
  - Added generation API with three execution modes: `gateway`, `direct-gemini` (multi-key rotation), and `direct-groq` (multi-key rotation).
  - Integrated Vercel AI Gateway client support in frontend dependencies.
  - Added setup docs for BYOK/OIDC, key rotation input format, and test payloads.
- SEO impact:
  - No direct SEO metadata output change yet.
  - Integration impact: enables controlled AI-assisted rewrite pipeline for post/service/project content operations.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - AI Writer Production Hardening (Dashboard + Validation)
- Changed files:
  - `frontend/app/dashboard/seo/layout.tsx`
  - `frontend/app/dashboard/seo/ai-writer/page.tsx`
  - `frontend/app/api/ai/config/save/route.ts`
  - `frontend/app/api/ai/generate/route.ts`
  - `frontend/lib/ai-writer/generate.ts`
  - `docs/ai-writer-gateway-setup.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated SEO dashboard page for AI Writer operations with save/test flow and runtime source visibility.
  - Added model-format validation for gateway mode (`provider/model`) at save API layer.
  - Added prompt size guard in generate API and normalized direct-provider model IDs (`google/*` and `groq/*` prefix handling).
  - Extended setup doc with production checklist for go-live hardening.
- SEO impact:
  - No direct metadata change.
  - Integration impact: production-safe operational control for AI rewrite pipeline with stronger validation and error prevention.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - AI Rewrite Apply Flow (Studio Action -> Draft Patch)
- Changed files:
  - `studio/document-actions/ai-rewrite-action.ts`
  - `studio/sanity.config.ts`
  - `frontend/app/api/ai/rewrite/apply/route.ts`
  - `frontend/.env.example`
  - `studio/.env.example`
  - `docs/env-reference.md`
  - `docs/ai-writer-gateway-setup.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added Studio document action `AI Rewrite` for `post`, `service`, and `project` documents.
  - Added backend route to generate rewritten content and patch it into Sanity draft (`title`, `excerpt`, `body`) in one flow.
  - Added action-secret auth path for Studio cross-origin calls (`AI_WRITER_ACTION_SECRET` / `SANITY_STUDIO_AI_WRITER_ACTION_SECRET`) and CORS handling for Studio origin.
  - Added environment and setup docs for production use of rewrite-apply flow.
- SEO impact:
  - Direct SEO impact: enables faster, repeatable rewrite operations on indexed content while preserving slug intent and draft-first publishing flow.
  - Integration impact: Studio action and frontend API are now linked for end-to-end content rewrite execution.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - AI Writer Docs Consolidation (Production-Focused)
- Changed files:
  - `docs/ai-writer-gateway-setup.md`
  - `docs/env-reference.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote AI writer documentation into a production-focused guide with clear scope, architecture, endpoint behavior, env matrix, setup steps, rewrite flow, and operational checklist.
  - Removed non-essential sections and duplicated notes to reduce ambiguity during rollout.
  - Corrected env ownership for `SANITY_STUDIO_AI_WRITER_ACTION_SECRET` to Studio section in env reference.
- SEO impact:
  - No direct SEO rendering change.
  - Integration impact: improves operational reliability and reduces configuration errors for AI-assisted rewrite pipeline.
- Verification:
  - Documentation update only (no runtime code change in this entry).

## 2026-04-02 - Worker 3 Content Rewrite Pass v2 (Slug-Specific Copy Expansion)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extended legacy rewrite copy with slug-specific variants to reduce repetitive content across cluster pages.
  - Added dedicated website-service variants (`harga`, `jasa-migrasi-wordpress`, `jasa-pembuatan-website-company-profile`) while keeping generic fallback for other service slugs.
  - Added printing detail variants for calendar/book-oriented pages and software detail variants (`implementasi-software`, `instalasi-software`, `pembuatan-software`).
  - Added specific content branch for `about/ai-statement`.
- SEO impact:
  - Improves semantic uniqueness and intent matching between pages within the same cluster.
  - No direct schema/query change; Studio-Frontend SEO contract remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` not run in this cycle.

## 2026-04-02 - Worker 3 Content Rewrite Pass for Legacy Service Clusters
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote legacy content mapping to reduce generic copy and strengthen intent alignment per cluster.
  - Added dedicated website index copy (`buildWebsiteIndexCopy`) with stronger conversion-oriented narrative and keyword coverage.
  - Improved printing/software cluster copy logic to differentiate section index pages vs detail pages, including CTA and supporting keyword refinements.
  - Refined Sistem POS branch with stronger keyword coverage and cluster-specific CTA.
- SEO impact:
  - Improves on-page semantic relevance for migrated legacy service pages and reduces duplicate boilerplate patterns across cluster routes.
  - No direct change to Studio schema/query contracts; existing `seoSettings` fallback behavior remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Worker 2 CMS Contract Sync for Navigation Links
- Changed files:
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Synced Studio-to-Frontend contract by adding `category` support to main `link.internalLink` references, matching existing frontend query route mapping.
  - Added destination validation on `link` and `navigation-link-child` objects to prevent empty navigation targets (external requires `href`, internal requires `internalLink`).
  - Hardened navigation query contract with deterministic document selection (`order(_updatedAt desc)[0...1]`) and `coalesce` defaults for `links`/`children` to reduce empty-state risk in header/footer rendering.
- SEO impact:
  - No direct metadata rendering change.
  - Improves integration safety by preventing broken internal/external navigation links that can degrade crawl path quality.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Parallel Worker Integration Pass (UI + CMS Contract + Rewrite Route Parity)
- Changed files:
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/header/social-links.tsx`
  - `frontend/components/footer.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `frontend/sanity/queries/navigation.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/app/(main)/percetakan/[...segments]/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx` (removed)
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx` (removed)
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Integrated Worker 1 UI shell refinements (single CTA emphasis, icon-only social actions, compact header rhythm) across header/footer/style guide.
  - Finalized Worker 2 navigation contract synchronization between Studio schema validation and frontend query defaults.
  - Finalized Worker 3 route parity hardening by consolidating nested `percetakan` URL handling into manifest-driven catch-all routing.
  - Enriched rewrite copy mapping for top cluster index pages (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) with stronger keyword and CTA differentiation.
- SEO impact:
  - Direct SEO impact: improves crawl continuity for nested `percetakan` legacy URLs and strengthens rewrite-page keyword/metadata alignment.
  - Integration impact: reduces frontend-backend contract drift for navigation-driven internal linking behavior.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - Rewrite Content Progress Tracker + High-Intent Alias Coverage
- Changed files:
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `docs/rewrite-content-progress.md`
  - `docs/seo-updates.md`
- Summary:
  - Added explicit rewrite progress tracker document to separate “already rewritten” versus “pending” items for content migration visibility.
  - Added alias slug support in legacy route resolver for high-intent `pembuatan-website` paths to reduce route gaps during rewrite-first phase.
  - Extended static param generation for `pembuatan-website/[slug]` so alias paths are pre-rendered and covered consistently.
- SEO impact:
  - Direct SEO/integration impact: lowers accidental 404 risk for legacy high-intent alias paths and improves execution traceability of rewrite content completion.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Content Wave Completion for Tracked Top-Priority Legacy URLs
- Changed files:
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `docs/rewrite-content-progress.md`
  - `docs/seo-updates.md`
- Summary:
  - Added supplemental legacy route coverage for previously pending high-priority paths:
    - `/pembuatan-website/portfolio`
    - `/pembuatan-website/sidoarjo`
  - Extended slug resolver + static params generation so these paths are included in SSG output without redirect dependency.
  - Added route-specific rewrite copy preset for `portfolio` and city-intent handling for `sidoarjo`.
  - Updated rewrite progress tracker status from pending to done for tracked top-priority cluster URLs.
- SEO impact:
  - Direct SEO impact: closes remaining tracked rewrite gaps on high-priority legacy cluster URLs and prevents orphan/404 behavior for these paths during rewrite-first rollout.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Internal-Link Strategy Added to Legacy Shell
- Changed files:
  - `frontend/lib/legacy-pages/internal-links.ts`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/legacy/legacy-related-links.tsx`
  - `docs/rewrite-content-progress.md`
  - `docs/seo-updates.md`
- Summary:
  - Added strategic internal-link fallback map per rewrite cluster (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`, trust pages).
  - Connected legacy shell to render “Jelajahi Selanjutnya” links before related legacy links, improving cross-cluster navigation paths.
  - Updated rewrite progress tracker to mark internal-link strategy as implemented for current wave (code-driven fallback mode).
- SEO impact:
  - Direct SEO impact: improves internal linking structure and crawl discoverability across canonical service/blog/contact paths from rewritten legacy pages.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Add /toc Unified Content Index (Sanity + Local Files)
- Changed files:
  - `frontend/app/(main)/toc/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added new `/toc` page that aggregates links from Sanity content (pages, posts, services, products, categories) and local content sources (legacy route manifest + local docs index JSON).
  - Implemented dynamic/no-store rendering to keep runtime content listing fresh from current source state.
  - Added grouped section layout with per-source counts to simplify migration and coverage checks.
- SEO impact:
  - Direct SEO/integration impact: improves crawl planning visibility and internal QA by exposing a consolidated site content index across CMS and local source pipelines.
- Verification:
  - `pnpm --filter frontend exec next build --webpack` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter studio run typecheck` passed.

## 2026-04-02 - Worker 3 Route Parity Hardening for Percetakan Nested Paths
- Changed files:
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/app/(main)/percetakan/[...segments]/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx` (removed)
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx` (removed)
  - `docs/seo-updates.md`
- Summary:
  - Replaced split dynamic routes under `percetakan` with a single manifest-driven catch-all (`[...segments]`) route.
  - Added helper APIs in legacy route registry to resolve section descendants and route lookup by segment array.
  - Consolidated metadata and rendering path for nested URLs (including `cetak-kalender/{kota}`) through one routing contract to reduce 404 risk during rewrite-first migration.
- SEO impact:
  - Direct technical SEO impact: improves legacy URL parity coverage for nested `percetakan` paths and reduces accidental crawl loss from route mismatch.
  - Keeps shared metadata helper path intact so global fallback behavior remains consistent.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - Worker 1 UI Shell Pass (Header/Nav + Icon Actions)
- Changed files:
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/header/social-links.tsx`
  - `frontend/components/footer.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refactored desktop header to a clearer single-CTA shell: primary nav stays focused, while CTA, dark-mode action, and icon-only social actions are grouped on the right.
  - Kept mobile shell compact and aligned action sizing (`sm`) for CTA/social/theme controls.
  - Enhanced reusable `SocialLinks` primitive with size variants (`sm`/`md`) and reused it in header/footer/style-guide.
  - Updated style-guide showcase to reflect Worker 1 contract: button matrix focus (`default`, `outline`, `secondary`, `ghost`) and icon-action pattern.
- SEO impact:
  - No direct SEO impact.
  - Indirect integration impact: navigation consistency and shared shell primitives reduce UI drift risk during rewrite rollout.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec next build --webpack` passed.

## 2026-04-02 - Footer Rewrite: Icon-Only Social Pattern
- Changed files:
  - `frontend/components/footer.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rewrote footer social rendering to use shared `SocialLinks` component with icon-only layout, replacing per-item text labels.
  - Aligned footer interaction style with shared UI contract (compact, reusable, and consistent icon treatment).
- SEO impact:
  - No direct SEO impact.
  - Indirect UX improvement can support cleaner navigation scanning for users.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Legacy Rewrite Routes: Metadata Fallback + JSON-LD Template Sync
- Changed files:
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/lib/legacy-pages/metadata.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/app/(main)/about/page.tsx`
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/contact/page.tsx`
  - `frontend/app/(main)/privacy/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/app/(main)/sistem-pos/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reworked legacy rewrite shell into reusable sections with stronger Vercel-style rhythm (hero, keyword chips, highlights, process, FAQ, related links, CTA).
  - Added centralized `generateLegacyPageMetadata` helper and migrated all rewritten legacy routes to metadata pipeline that preserves global fallback from `seoSettings`.
  - Added JSON-LD application on legacy template (Breadcrumb for all; Service schema for relevant clusters) and refreshed rewrite-copy mappings for trust/support pages.
- SEO impact:
  - Improves metadata consistency and prevents route-level hardcoded `noindex` drift on rewritten legacy clusters.
  - Preserves Studio->Frontend SEO fallback contract via existing `generateBasicMetadata` path; no schema shape change required.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Legacy Route Rewrite v1 with Reusable Shell Components
- Changed files:
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/components/legacy/legacy-hero.tsx`
  - `frontend/components/legacy/legacy-highlights.tsx`
  - `frontend/components/legacy/legacy-process-faq.tsx`
  - `frontend/components/legacy/legacy-related-links.tsx`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refactored legacy rewrite shell into reusable section components (hero, highlights, process+FAQ, related links) so Astro route clusters are template-driven and easier to scale.
  - Kept metadata pipeline on existing `generateBasicMetadata` flow to preserve global fallback from `seoSettings`.
  - Rewrote copy strategy for trust and service cluster pages (`layanan`, `about`, `contact`, `privacy`) to improve keyword intent alignment and CTA specificity.
- SEO impact:
  - Improves on-page semantic relevance and internal consistency across migrated legacy routes.
  - No schema/query contract change in Studio; frontend SEO fallback behavior remains unchanged.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Dependabot Schedule Adjusted Back to Weekly
- Changed files:
  - `.github/dependabot.yml`
  - `docs/seo-updates.md`
- Summary:
  - Changed Dependabot interval from monthly back to weekly for root, frontend, studio, and GitHub Actions ecosystems.
  - Kept strict controls from prior change: PR limit `2` and grouped minor/patch updates.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Configuration review completed.

## 2026-04-01 - Dependabot Run Volume Reduction
- Changed files:
  - `.github/dependabot.yml`
  - `docs/seo-updates.md`
- Summary:
  - Reduced Dependabot schedule from weekly to monthly for npm (root/frontend/studio) and GitHub Actions ecosystems.
  - Lowered `open-pull-requests-limit` from 10 to 2 for each ecosystem.
  - Added grouping for minor/patch updates so multiple dependency updates are bundled into fewer PRs.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Configuration review completed.

## 2026-04-01 - Local Security Cleanup for Deploy Key File
- Changed files:
  - `.gitignore`
  - `docs/seo-updates.md`
- Summary:
  - Added `deploy/*.json` to git ignore rules to prevent accidental commits of deploy key JSON files.
  - Performed local cleanup workflow to keep sensitive deploy key material out of pushed history.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - Local git history cleanup prepared; no push executed.

## 2026-04-01 - Detailed Dashboard-First SEO Setup Documentation
- Changed files:
  - `docs/seo-dashboard-setup.md`
  - `docs/env-reference.md`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated detailed guide for dashboard-first SEO operations setup with minimal env requirements.
  - Documented complete flows for first login bootstrap, Google Indexing API setup, IndexNow setup, runtime verification, and troubleshooting.
  - Added cross-links from env/setup docs to the new dashboard setup guide.
- SEO impact:
  - Reduces setup errors in indexing operations by clarifying operational steps and recovery flow.
- Verification:
  - Documentation review completed.

## 2026-04-01 - SEO Dashboard-First Config with Encrypted Studio Secrets
- Changed files:
  - `frontend/app/api/seo/config/save/route.ts`
  - `frontend/app/api/seo/config/status/route.ts`
  - `frontend/app/api/seo/auth/login/route.ts`
  - `frontend/app/api/revalidate/route.ts`
  - `frontend/app/dashboard/seo/settings/page.tsx`
  - `frontend/lib/seo-ops/crypto.ts`
  - `frontend/lib/seo-ops/settings-source.ts`
  - `frontend/lib/seo-ops/sanity-write.ts`
  - `frontend/lib/seo-ops/session.ts`
  - `frontend/lib/seo-ops/api-auth.ts`
  - `frontend/lib/seo-ops/config.ts`
  - `frontend/lib/seo-ops/jobs.ts`
  - `frontend/sanity/queries/seo-ops-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/middleware.ts`
  - `studio/schemas/documents/seo-ops-settings.ts`
  - `frontend/.env.example`
  - `docs/env-reference.md`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dashboard save API to persist SEO Ops config into singleton `seoOpsSettings` document in Sanity.
  - Added AES-GCM secret encryption/decryption layer for Google service account JSON and IndexNow key, using server-side key (`SEO_SETTINGS_ENCRYPTION_KEY` or fallback `SEO_SESSION_SECRET`/`REVALIDATE_SECRET`).
  - Converted runtime config resolution to Studio-first with env fallback, so Google/IndexNow toggles and operational defaults can be managed from dashboard.
  - Added password-hash support from Studio (`dashboardPasswordHash`) so dashboard login no longer depends on env password by default.
  - Updated settings UI to edit/save Google, IndexNow, webhook behavior, queue defaults, notes, and optional new dashboard password.
  - Updated env docs/examples to make dashboard-first configuration the default and env-based `SEO_*` values as legacy fallback.
- SEO impact:
  - Improves operational SEO control by moving indexing engine setup to no-code dashboard flow while keeping secrets protected.
  - No direct change to page metadata rendering.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Environment Reference for Frontend/Studio and SEO Ops
- Changed files:
  - `docs/env-reference.md`
  - `frontend/.env.example`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated environment reference for required and optional variables across frontend, studio, and SEO Ops runtime.
  - Added copy-ready `.env` examples for frontend and studio, including indexing and dashboard auth variables.
  - Added documented option for `GOOGLE_APPLICATION_CREDENTIALS` and password hash mode via `SEO_DASHBOARD_PASSWORD_SHA256`.
  - Linked new env and GSC docs from setup guide for faster onboarding.
- SEO impact:
  - Reduces operational risk from env misconfiguration for indexing, migration scoring, and SEO dashboard access.
- Verification:
  - Documentation review completed.

## 2026-04-01 - GSC Migration Curation Script Expansion
- Changed files:
  - `frontend/scripts/export-gsc-priority.mjs`
  - `docs/gsc-priority-export.md`
- Summary:
  - Expanded GSC export script to produce migration-focused outputs, not only page/query summaries.
  - Added configurable migration arguments: `blogBase`, `categoryBase`, `minImpressionsForAuto`, and optional sitemap enrichment via `sitemapUrl`.
  - Added extra GSC breakdown exports by country and device.
  - Added path normalization and legacy URL classification to generate actionable mapping fields (`legacyType`, `migrationAction`, `suggestedTargetPath`, `mappingConfidence`).
  - Added auto-redirect export file ready for bulk import after review.
- SEO impact:
  - Improves migration planning quality and reduces risk of losing high-performing URLs during URL structure changes.
  - Enables data-driven redirect prioritization using real clicks/impressions and migration confidence.
- Verification:
  - `node --check frontend/scripts/export-gsc-priority.mjs` passed.
  - Full run completed with service account:
    - `pnpm --filter frontend run gsc:export -- --site-url https://www.kotacom.id/ --start-date 2025-01-01 --end-date 2026-04-01 --out-dir ./tmp/gsc-kotacom-full --blog-base /blog --category-base /blog/category --min-impressions-auto 1 --sitemap-url https://kotacom.id/sitemap-0.xml`

## 2026-04-01 - SEO Ops Dashboard + Indexing Automation APIs
- Changed files:
  - `frontend/middleware.ts`
  - `frontend/app/dashboard/seo/*`
  - `frontend/app/api/seo/*`
  - `frontend/lib/seo-ops/*`
  - `frontend/app/api/revalidate/route.ts`
  - `frontend/sanity/queries/seo-ops-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/.env.example`
  - `studio/schemas/documents/seo-ops-settings.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/sanity.config.ts`
  - `ENV_SETUP.md`
  - `docs/seo-updates.md`
- Summary:
  - Added protected SEO Ops Dashboard (`/dashboard/seo`) with modules for overview, indexing jobs, migration-priority curation, technical audit, and settings/import utilities.
  - Added SEO Ops APIs for auth, indexing submit/retry/jobs, migration-priority reporting, technical audit reporting, and data imports.
  - Added indexing queue engine adapters (Google Indexing API and IndexNow) with retry handling and job/task status tracking.
  - Integrated `/api/revalidate` so content webhook revalidation can auto-enqueue indexing jobs.
  - Added Studio singleton document `seoOpsSettings` for operational toggles/notes (non-secret config), plus frontend query surface.
  - Added new SEO Ops environment variable templates and setup documentation.
- SEO impact:
  - Improves indexing operations and migration prioritization workflows.
  - Adds operational controls and observability for submit/retry monitoring.
  - No direct change to metadata rendering logic beyond operational automation hooks.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Batch GSC Export and Migration Priority Scoring Script
- Changed files:
  - `frontend/scripts/export-gsc-priority.mjs`
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `docs/gsc-priority-export.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a CLI script to batch export Search Console data (`page`, `query`, and `page+query`) and generate migration-priority output.
  - Added URL scoring output (`priorityScore`, `recommendedAction`) to support selective migration of important pages first.
  - Added setup and usage guide for service-account auth and export command.
  - Registered `gsc:export` script in frontend workspace and added `googleapis` dependency.
- SEO impact:
  - Improves migration sequencing quality by prioritizing high-impact indexed URLs from GSC data.
- Verification:
  - `pnpm --filter frontend gsc:export -- --help` passed.

## 2026-04-01 - Global Robots + Category Noindex Controls
- Changed files:
  - `studio/schemas/documents/seo-settings.ts`
  - `frontend/sanity/queries/seo-settings.ts`
  - `frontend/app/robots.ts`
  - `frontend/app/sitemap.ts`
  - `frontend/app/(main)/blog/category/page.tsx`
  - `frontend/app/(main)/blog/category/[slug]/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added new global SEO controls in Studio: `noIndexBlogCategories`, `noIndexProductCategories`, `noIndexServiceCategories`, and `robotsDisallowPaths`.
  - Updated frontend SEO settings query to include the new fields.
  - Reworked `robots.txt` generation to use Studio global settings, including full-site noindex mode (`defaultNoIndex`) and optional disallow path list.
  - Reworked `sitemap.xml` generation to:
    - stop publishing URLs when `defaultNoIndex` is enabled,
    - include content URLs for page/post/product/service with `meta.noindex != true`,
    - include category URLs per surface (`/blog/category/[slug]`, `/products/[slug]`, `/services/[slug]`) only when relevant counts exist and global category noindex toggles are off.
  - Updated category metadata generation so global category noindex toggles are applied consistently for blog/product/service category pages.
- SEO impact:
  - Global indexing behavior can now be controlled centrally from Studio, including robots disallow rules.
  - Category indexing can now be switched off per surface globally while still supporting per-category `meta.noindex`.
  - Sitemap and metadata logic are now aligned with the same global + per-document noindex model.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Fix Reusable Section Orderable Schema Requirement
- Changed files:
  - `studio/schemas/documents/reusable-section.ts`
  - `docs/seo-updates.md`
- Summary:
  - Added required `orderRank` field (`orderRankField({ type: "reusableSection" })`) so `reusableSection` works with `orderableDocumentListDeskItem`.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Global Reusable Section with Placement Slots
- Changed files:
  - `studio/schemas/documents/reusable-section.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `frontend/sanity/queries/reusable-section.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/components/reusable-slot-sections.tsx`
  - `frontend/app/(main)/layout.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added new Sanity document type `reusableSection` so editors can create reusable block groups once and reuse them globally.
  - Added placement slot selection in Studio with four options: `beforeHeader`, `afterHeader`, `beforeFooter`, and `afterFooter`.
  - Added `isActive` and `priority` controls to manage publish behavior and render order without code changes.
  - Added frontend query/fetch flow to load active reusable sections and render selected blocks automatically in each layout slot.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Predefined Starter Content for Sanity Blocks
- Changed files:
  - `studio/schemas/blocks/hero/hero-1.ts`
  - `studio/schemas/blocks/hero/hero-2.ts`
  - `studio/schemas/blocks/section-header.ts`
  - `studio/schemas/blocks/cta/cta-1.ts`
  - `studio/schemas/blocks/grid/grid-card.ts`
  - `studio/schemas/blocks/grid/grid-row.ts`
  - `studio/schemas/blocks/grid/pricing-card.ts`
  - `studio/schemas/blocks/split/split-content.ts`
  - `studio/schemas/blocks/split/split-card.ts`
  - `studio/schemas/blocks/split/split-cards-list.ts`
  - `studio/schemas/blocks/split/split-info.ts`
  - `studio/schemas/blocks/split/split-info-list.ts`
  - `studio/schemas/blocks/split/split-row.ts`
  - `studio/schemas/blocks/timeline/timelines-1.ts`
  - `studio/schemas/blocks/timeline/timeline-row.ts`
  - `studio/schemas/blocks/forms/newsletter.ts`
  - `studio/schemas/blocks/logo-cloud/logo-cloud-1.ts`
  - `docs/seo-updates.md`
- Summary:
  - Added object-level `initialValue` on core page-builder blocks so newly inserted blocks are pre-populated instead of empty.
  - Seeded starter copy adapted from Kotacom-style messaging (IT services, website/software development, support, consultation CTA) for faster no-code editing.
  - Added nested starter items for complex blocks (`grid-row`, `split-row`, `timeline-row`) so editors get complete section scaffolds immediately.
  - Standardized starter CTA link objects to be valid with the shared `link` schema and shadcn/Geist-oriented button variants.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Studio Theme Color Picker with Geist Color List
- Changed files:
  - `studio/schemas/documents/settings.ts`
  - `frontend/sanity/queries/theme-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/app/layout.tsx`
  - `frontend/app/globals.css`
  - `docs/seo-updates.md`
- Summary:
  - Added `Settings > Theme Colors` in Sanity Studio so editors can change core UI colors without code changes.
  - Added `Theme Preset` selector with presets: `Neutral`, `Ocean`, `Sunset`, plus brand combinations `Brand Tricolor A/B/C` (red/blue/yellow exploration).
  - Replaced manual HEX-only input with dropdown lists based on a curated Geist-style color palette (`Default`, grayscale, blue, green, teal, amber, purple, red, rose).
  - Wired frontend layout to fetch preset + theme colors and inject CSS variables (`--studio-*`) at runtime.
  - Preset values auto-apply by default; individual color fields below the preset act as per-project overrides.
  - Updated global tokens to use Studio overrides for primary/accent/ring in both light and dark mode, with safe fallbacks.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Geist Typography Recipes and Component Adoption
- Changed files:
  - `frontend/app/globals.css`
  - `frontend/components/blocks/hero/hero-1.tsx`
  - `frontend/components/blocks/hero/hero-2.tsx`
  - `frontend/components/blocks/section-header.tsx`
  - `frontend/components/ui/product-card.tsx`
  - `frontend/components/ui/service-card.tsx`
  - `frontend/components/ui/post-card.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable typography utilities (`text-display-xl`, `text-display-lg`, `text-ui-body`, `text-ui-label`, `text-meta`) aligned with Geist hierarchy patterns.
  - Applied the new typography recipes across hero blocks, section headers, and content cards to reduce ad-hoc bold sizing and improve visual consistency.
  - Switched metadata lines (price/duration) to mono/tabular style via `text-meta`.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Geist-Inspired Global Color Token Remap
- Changed files:
  - `frontend/app/globals.css`
  - `docs/seo-updates.md`
- Summary:
  - Reworked global design tokens to a Geist-inspired semantic palette with explicit light/dark gray scales (`gray 1-10`) and background tiers (`background 1/2`).
  - Remapped existing app tokens (`background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, sidebar tokens) to the new scale without changing component structure.
  - Preserved compatibility for existing components by keeping the same semantic token names.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Switch Frontend Typography to Vercel Geist
- Changed files:
  - `frontend/app/layout.tsx`
  - `frontend/app/globals.css`
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `docs/seo-updates.md`
- Summary:
  - Replaced `Inter` setup with `GeistSans` and `GeistMono` in the Next.js root layout.
  - Applied official Geist CSS variables globally and ensured code-like elements (`code`, `kbd`, `samp`, `pre`) use mono typography.
  - Added `geist` dependency to frontend workspace.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Footer Full Menu from Sanity Navigation
- Changed files:
  - `frontend/components/footer.tsx`
  - `studio/schemas/documents/navigation.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `docs/seo-updates.md`
- Summary:
  - Upgraded footer to render a full multi-column menu sourced from `Navigation` links and their `Sub Menu` items (with `group` section labels).
  - Kept primary navigation links visible in the footer and added social links row with platform icons.
  - Clarified Studio field descriptions so editors know that Navigation/Sub Menu configuration is reused by footer.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Stabilize Sanity Studio CI Deploy Targeting
- Changed files:
  - `.github/workflows/deploy-studio.yml`
  - `studio/sanity.cli.ts`
  - `studio/.env.example`
  - `README.md`
  - `docs/seo-updates.md`
- Summary:
  - Changed Studio deploy targeting in CLI config to prefer `deployment.studioHost` and only include `deployment.appId` when explicitly set.
  - Updated deploy workflow to stop requiring/passing `SANITY_STUDIO_APP_ID` in CI, reducing failures caused by stale or unauthorized app IDs.
  - Updated environment/documentation guidance to mark `SANITY_STUDIO_APP_ID` as optional for legacy/advanced targeting.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `SANITY_STUDIO_PREVIEW_URL=http://localhost:3000 SANITY_STUDIO_PROJECT_ID=ci-project SANITY_STUDIO_DATASET=production SANITY_STUDIO_HOSTNAME=ci-studio SANITY_STUDIO_API_VERSION=2026-03-23 pnpm --filter studio run build` passed.
  - `pnpm --filter studio run typecheck` failed due to pre-existing unrelated type errors in `studio/schemas/documents/redirect.ts`.

## 2026-04-01 - Global SEO Fallback Integration (Studio + Frontend)
- Changed files:
  - `studio/schemas/documents/seo-settings.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `studio/sanity.config.ts`
  - `studio/schemas/blocks/shared/meta.ts`
  - `studio/schemas/documents/category.ts`
  - `frontend/sanity/queries/seo-settings.ts`
  - `frontend/sanity/lib/fetch.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `frontend/app/layout.tsx`
  - `frontend/app/(main)/page.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `frontend/app/(main)/blog/[slug]/page.tsx`
  - `frontend/app/(main)/blog/page.tsx`
  - `frontend/app/(main)/blog/category/page.tsx`
  - `frontend/app/(main)/blog/category/[slug]/page.tsx`
  - `frontend/app/(main)/products/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `frontend/app/(main)/docs/[[...slug]]/page.tsx`
  - `frontend/app/(main)/style-guide/page.tsx`
  - `frontend/sanity/queries/category.ts`
  - `frontend/app/api/revalidate/route.ts`
- Summary:
  - Added singleton `seoSettings` document in Studio for global metadata fallback.
  - Wired frontend metadata generation to use global fallback when per-document meta is empty.
  - Standardized metadata generation across dynamic and static routes.
  - Extended category schema/query to support SEO fields.
  - Updated webhook revalidation coverage for `seoSettings` updates.
- SEO impact:
  - Global fallback now works for title, description, canonical, OG image, and Twitter card metadata.
  - Studio and frontend SEO model are now integrated end-to-end.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Newsletter Build-Safe Resend Initialization
- Changed files:
  - `frontend/app/api/newsletter/route.ts`
- Summary:
  - Moved `Resend` initialization into request runtime.
  - Added env guards for API key and audience ID.
  - Awaited contact creation call so failures are caught correctly.
- SEO impact:
  - No direct SEO impact.
- Verification:
  - `pnpm --filter frontend run build` passed after fix.

## 2026-04-01 - SEO Documentation, Agent Policy, and Skills
- Changed files:
  - `AGENTS.md`
  - `docs/seo-updates.md`
  - `skills/seo-update-log/SKILL.md`
  - `skills/sanity-seo-integration/SKILL.md`
- Summary:
  - Added repository-level agent policy requiring update log entry for every change.
  - Added canonical SEO updates documentation file and template.
  - Added two reusable skills for SEO integration workflow and changelog discipline.
- SEO impact:
  - Improves process consistency and traceability for future SEO-related changes.
- Verification:
  - File-level review completed.

## 2026-04-01 - Sanity Redirect Schema + Next.js Redirect Integration
- Changed files:
  - `studio/schemas/documents/redirect.ts`
  - `studio/schema-types.ts`
  - `studio/structure.ts`
  - `frontend/next.config.mjs`
- Summary:
  - Added `redirect` document schema in Sanity Studio with validation for `source`, `destination`, `permanent`, and `isEnabled`.
  - Registered redirect schema in Studio and added Redirects list in desk structure.
  - Integrated `next.config.mjs` to fetch enabled redirects from Sanity at build time and merge with static redirects.
- SEO impact:
  - Redirect rules can now be managed by content editors in Studio and applied in Next.js build config.
  - Improves migration/link hygiene and reduces 404 risk when URL structures change.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.
- References:
  - https://www.sanity.io/learn/course/seo-optimization/implementing-redirects
  - https://www.sanity.io/docs/developer-guides/managing-redirects-with-sanity
  - https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects

## 2026-04-01 - Advanced SEO Alignment: Studio Fields + JSON-LD + Metadata Hardening
- Changed files:
  - `studio/schemas/blocks/shared/meta.ts`
  - `frontend/sanity/queries/shared/meta.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `frontend/components/seo/json-ld.tsx`
  - `frontend/lib/seo-jsonld.ts`
  - `frontend/app/(main)/blog/[slug]/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
- Summary:
  - Added SEO fields in Studio meta schema: `canonicalUrl`, `focusKeyword`, `secondaryKeywords`.
  - Synced frontend query contract for new SEO fields.
  - Hardened metadata fallback logic to handle null-safe canonical/title/description and support OG type selection (`website`/`article`).
  - Added reusable JSON-LD component and generators.
  - Implemented structured data output for detail pages:
    - Blog post: `Article` + `BreadcrumbList`
    - Product detail: `Product` + `BreadcrumbList`
    - Service detail: `Service` + `BreadcrumbList`
- SEO impact:
  - Front and Studio SEO models are better aligned with fewer fallback gaps.
  - Rich-result eligibility improved via structured data on critical templates.
  - Canonical override is now supported from Studio.
- Verification:
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Fix Studio CI Type Errors for Redirect Schema
- Changed files:
  - `studio/schemas/documents/redirect.ts`
- Summary:
  - Fixed TypeScript validator typings in redirect schema for Sanity v5 compatibility.
  - Replaced overly strict `Rule` annotations with Sanity-compatible callback signatures.
- SEO impact:
  - No direct SEO behavior change.
  - Restores CI stability so redirect model can be safely built/deployed.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-01 - Fix Deploy Workflow Non-Interactive Prompt (Studio)
- Changed files:
  - `.github/workflows/deploy-studio.yml`
- Summary:
  - Added `SANITY_STUDIO_APP_ID` as required variable in deploy workflow checks.
  - Passed `SANITY_STUDIO_APP_ID` into Studio build and deploy step environments.
- SEO impact:
  - No direct SEO behavior change.
  - Restores automated Studio deployment reliability.
- Verification:
  - Root cause validated from GitHub Actions logs: non-interactive `select` prompt during `sanity deploy`.

## 2026-04-01 - Force Unattended Sanity Studio Deploy in CI
- Changed files:
  - `.github/workflows/deploy-studio.yml`
- Summary:
  - Updated deploy step command from `pnpm run deploy` to `pnpm exec sanity deploy --yes --no-build`.
  - Ensures CI deploy is fully non-interactive and reuses the Studio build artifact from the prior step.
- SEO impact:
  - No direct SEO behavior change.
  - Improves deployment reliability for SEO schema/content updates managed in Studio.
- Verification:
  - `sanity deploy --help` confirms `--yes` enables unattended mode.

## 2026-04-01 - Vercel-Style Navigation Model and Header UX Alignment
- Changed files:
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `studio/schemas/documents/navigation.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/footer.tsx`
- Summary:
  - Added navigation data controls in Studio for Vercel-like structure:
    - `navLocation` (`primary` or `utility`) to control link placement.
    - `showInFooter` toggle to control footer visibility.
    - Child link `description` and `badge` fields for richer dropdown panels.
  - Updated frontend navigation query to fetch child `description` and `badge`.
  - Refactored desktop header navigation to Vercel-style behavior:
    - Primary top-level links stay compact.
    - Child links render in grouped hover/focus dropdown panels.
    - Utility/CTA links render on the right with button variants.
  - Updated mobile menu to separate `Primary` and `Utility` sections and show child badge/description.
  - Updated footer to respect `showInFooter` and separate utility links into CTA-style actions.
- SEO impact:
  - No direct SEO metadata/schema change.
  - Improves information architecture consistency and internal link presentation across header/footer.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Navigation Icon Picker with Preview (Studio) + Frontend Icon Rendering
- Changed files:
  - `studio/schemas/blocks/shared/navigation-icon-options.tsx`
  - `studio/schemas/inputs/navigation-icon-input.tsx`
  - `studio/schemas/blocks/shared/navigation-icon.ts`
  - `studio/schema-types.ts`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `frontend/components/icons/navigation-icons.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
- Summary:
  - Added a dedicated `navigation-icon` schema type with a custom Studio input component that shows icon preview cards and supports icon search.
  - Replaced plain string icon fields on navigation link and child link schemas with the new picker type.
  - Added a curated navigation icon catalog (Vercel-like IA-friendly set) and preserved backward compatibility for older social icon values.
  - Updated frontend header navigation (desktop + mobile) to render selected icons for primary links, submenu links, and utility/CTA links.
- SEO impact:
  - No direct SEO metadata change.
  - Improves navigation clarity and scannability, supporting better internal-link discoverability for users.
- Performance/PageSpeed impact:
  - Low impact: icons are lightweight SVG components and only rendered where configured.
  - No additional network request for icon fonts/sprites.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - De-duplicate Global Site Name Between Settings and SEO Settings
- Changed files:
  - `studio/schemas/documents/settings.ts`
  - `studio/schemas/documents/seo-settings.ts`
  - `frontend/sanity/queries/settings.ts`
  - `frontend/sanity/queries/seo-settings.ts`
  - `frontend/sanity/lib/metadata.ts`
- Summary:
  - Refactored Studio so brand/site naming is managed in a single place:
    - `settings.siteName` editor field replaced by `settings.brandName`.
    - `seoSettings.siteName` field removed to avoid duplicate editing source.
  - Added prefilled defaults:
    - `settings.brandName` initial value: `Schema UI`.
    - `seoSettings.defaultTitle` and `seoSettings.defaultDescription` now have initial values.
  - Added backward-compatible query fallback:
    - Frontend settings query still exposes `siteName` via `coalesce(brandName, siteName, "Schema UI")`.
  - Updated metadata generation to resolve site name from `Settings` and use it as SEO fallback source.
- SEO impact:
  - Clarifies single source of truth for global site name and reduces misconfiguration risk.
  - Preserves stable metadata output through fallback logic for existing content.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - Header CTA + Move Theme Control Into Menu + Frontend/Backend Sync Policy
- Changed files:
  - `studio/schemas/documents/navigation.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/header-menu.tsx`
  - `AGENTS.md`
- Summary:
  - Added CMS-driven `headerCta` field in Navigation document for a single desktop header CTA button.
  - Updated navigation query and desktop/mobile header rendering to use `headerCta` with fallback from existing utility links.
  - Moved theme control out of always-visible header into menu patterns:
    - Desktop: new top-right dropdown menu with Appearance selector.
    - Mobile: Appearance section inside sheet menu.
  - Updated project agent policy to require frontend changes that depend on CMS/config data to be cross-checked and integrated with Studio schema + query + fetch layers.
- SEO impact:
  - No direct SEO metadata changes.
  - Improves stable IA/UX consistency for primary navigation and call-to-action exposure.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-01 - CI Env Alignment With GitHub Vars/Secrets (Remove Dummy Sanity Project)
- Changed files:
  - `.github/workflows/ci.yml`
- Summary:
  - Updated Frontend CI env to use repository `vars` and `secrets` instead of placeholder values (`ci-project`, `ci-read-token`).
  - Updated Studio CI env to use `SANITY_STUDIO_*` vars (with sensible fallback chaining) instead of hardcoded dummy values.
  - Keeps basic fallback defaults only for non-critical URLs to avoid empty-value crashes.
- SEO impact:
  - No direct SEO schema/metadata behavior change.
  - Restores CI build reliability for Sanity-backed pages and redirect loading.
- Verification:
  - Workflow patch validated against previous CI failure signature (`Dataset not found for project ID "ci-project"`).

## 2026-04-01 - GSC Curation Pipeline Hardening (Index Inspection + Metadata Health)
- Changed files:
  - `frontend/package.json`
  - `pnpm-lock.yaml`
  - `frontend/scripts/export-gsc-priority.mjs`
  - `frontend/scripts/inspect-gsc-index.mjs`
  - `frontend/scripts/audit-seo-metadata.mjs`
  - `frontend/scripts/merge-gsc-migration-health.mjs`
  - `docs/gsc-priority-export.md`
- Summary:
  - Added/ensured `googleapis` dependency so GSC export + URL Inspection scripts run reliably.
  - Fixed URL normalization in export and inspection scripts to preserve `www` hostname (required for URL-prefix property ownership checks in URL Inspection API).
  - Completed full GSC curation run for `https://www.kotacom.id/` (2025-01-01 to 2026-04-01), including migration mapping, URL Inspection, metadata audit, and merged health output.
  - Output directory:
    - `frontend/tmp/gsc-kotacom-full/`
  - Main outputs:
    - `gsc-migration-curation.csv`
    - `gsc-redirect-auto-import.csv`
    - `gsc-url-inspection.csv`
    - `seo-metadata-audit.csv`
    - `gsc-migration-health-merged.csv`
- SEO impact:
  - Direct SEO operations impact: migration planning now includes indexability + metadata quality status in one merged dataset.
  - Reduces redirect risk by prioritizing URLs based on search performance and inspection evidence.
- Verification:
  - `pnpm --filter frontend add -D googleapis` passed.
  - `pnpm --filter frontend gsc:export -- --site-url https://www.kotacom.id/ --start-date 2025-01-01 --end-date 2026-04-01 --out-dir ./tmp/gsc-kotacom-full ...` passed.
  - `pnpm --filter frontend exec node scripts/inspect-gsc-index.mjs -- --site-url https://www.kotacom.id/ --input-csv ./tmp/gsc-kotacom-full/gsc-pages.csv --out-dir ./tmp/gsc-kotacom-full --concurrency 15` passed.
  - `pnpm --filter frontend exec node scripts/audit-seo-metadata.mjs -- --input-csv ./tmp/gsc-kotacom-full/gsc-pages.csv --out-dir ./tmp/gsc-kotacom-full --concurrency 8` passed.
  - `pnpm --filter frontend exec node scripts/merge-gsc-migration-health.mjs -- --migration-csv ./tmp/gsc-kotacom-full/gsc-migration-curation.csv --inspection-csv ./tmp/gsc-kotacom-full/gsc-url-inspection.csv --metadata-csv ./tmp/gsc-kotacom-full/seo-metadata-audit.csv --out-dir ./tmp/gsc-kotacom-full` passed.

## 2026-04-01 - Astro Source Discovery + Migration Blueprint
- Changed files:
  - `docs/astro-to-next-migration-plan.md`
- Summary:
  - Discovered and validated Astro source repository for migration (`/home/ubuntu/Kotacom-supabase-schhool`, commit `6bcb8b5bf293d44ad19d916f1d72c2f89c273ae2`).
  - Documented route inventory, SEO component inventory, and phased migration blueprint from Astro to Next.js + Sanity.
  - Defined recommended target URL strategy and phased rollout plan (content/schema parity -> frontend parity -> SEO stabilization -> redirect waves).
- SEO impact:
  - Direct SEO planning impact: reduces migration risk by sequencing URL architecture and metadata parity before redirect activation.
- Verification:
  - Manual verification of Astro route tree (`src/pages`) and component tree (`src/components`) completed.
  - Source repo remote and commit identity verified.

## 2026-04-01 - Mega Plan Migration + SEO Rewrite + UI Refactor Checklist
- Changed files:
  - `docs/astro-migration-megaplan.md`
  - `AGENTS.md`
- Summary:
  - Added an execution-grade mega plan covering migration phases, per-URL curation workflow, SEO rewrite program, UI redesign/refactor tracks, redirect wave rollout, and measurable success criteria.
  - Added explicit content movement plan (Astro source buckets -> Sanity target types) with per-item checklist.
  - Updated `AGENTS.md` with mandatory agent execution checklist to keep `docs/astro-migration-megaplan.md` progress synchronized each execution cycle.
- SEO impact:
  - Direct SEO/integration planning impact: improves migration control and sequencing to reduce ranking-loss risk during rebuild and redirect rollout.
- Verification:
  - Manual review completed for new checklist structure and workstream completeness.
  - File-level verification: `docs/astro-migration-megaplan.md` and `AGENTS.md` created/updated successfully.

## 2026-04-01 - Route Contract v1 + Top-300 Manual Curation Worklist
- Changed files:
  - `docs/astro-next-route-contract.md`
  - `docs/curation/manual-top300-worklist-v1.csv`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Published formal route contract v1 for legacy Astro URL patterns to Next.js canonical routes, including ordered mapping rules, reason codes, conflict resolution, and validation checklist.
  - Initialized top-300 manual curation worklist from GSC priority dataset with prefilled proposed targets, decision types, confidence, and reason codes for one-by-one review.
  - Updated mega plan checklist/status to reflect route contract publication and manual curation kickoff.
- SEO impact:
  - Direct SEO/integration impact: improves redirect decision consistency and reduces random mapping risk by introducing deterministic mapping policy before rollout.
- Verification:
  - Source route inventory cross-checked against current Next route tree (`frontend/app`).
  - Worklist generated with 300 rows and reason-code distribution summary.

## 2026-04-01 - Top-300 Curation v2 Classification (Execution Queues)
- Changed files:
  - `docs/curation/manual-top300-worklist-v2.csv`
  - `docs/curation/manual-top300-approved-redirect.csv`
  - `docs/curation/manual-top300-keep-or-redirect-review.csv`
  - `docs/curation/manual-top300-pending-manual-intent.csv`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Upgraded top-300 curation worklist into operational v2 queue with final decision/status fields.
  - Split the queue into execution buckets:
    - `approved_redirect` (ready for redirect batch)
    - `approved_keep_or_redirect` (needs content existence check before final redirect/keep decision)
    - `pending_manual_intent` (requires one-by-one editorial intent mapping)
  - Added progress snapshot into mega plan to keep agent checklist synchronized with current execution state.
- SEO impact:
  - Direct SEO migration impact: enables controlled redirect rollout from reviewed subset while isolating ambiguous URLs to prevent wrong-intent redirects.
- Verification:
  - Row counts validated against source top-300 dataset:
    - approved_redirect: 216
    - approved_keep_or_redirect: 32
    - pending_manual_intent: 52

## 2026-04-01 - Top-300 Curation v3 Completion (No Pending Manual Intent)
- Changed files:
  - `docs/curation/manual-top300-worklist-v3.csv`
  - `docs/curation/manual-top300-approved-redirect-v3.csv`
  - `docs/curation/manual-top300-pending-manual-intent-v3.csv`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Completed v3 one-by-one intent mapping for previously unresolved manual queue items (tags, archives, product-category, download/comment/shop legacy URLs).
  - Reduced unresolved manual intent queue from 52 to 0.
  - Updated mega-plan execution snapshot and B1 status note to reflect top-300 completion state.
- SEO impact:
  - Direct SEO migration impact: top-300 priority set now has deterministic final decisions for redirect planning, reducing ambiguity before rollout.
- Verification:
  - Final decision distribution validated:
    - approved_redirect: 268
    - approved_keep_or_redirect: 32
    - pending_manual_intent: 0

## 2026-04-01 - Top-300 Redirect Import Artifact (v3)
- Changed files:
  - `docs/curation/manual-top300-approved-redirect-import.csv`
- Summary:
  - Generated redirect-import-ready CSV from top-300 curation v3 approved set.
  - Output format aligns with redirect ingestion needs (`source,destination,permanent,enabled,reason,queueOrder`).
  - Deduplicated by source path and excluded self-redirects.
- SEO impact:
  - Direct migration execution impact: provides immediate staged redirect batch candidate for high-priority legacy URLs.
- Verification:
  - Approved redirect rows exported: 268 (plus header row).
  - Pending manual intent file reduced to header-only state (`manual-top300-pending-manual-intent-v3.csv`).

## 2026-04-01 - Astro Static Cluster Scaffold in Next.js (Blog stays Sanity)
- Changed files:
  - `frontend/scripts/generate-astro-local-pages-manifest.mjs`
  - `frontend/lib/legacy-pages/astro-static-manifest.json`
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/app/(main)/about/page.tsx`
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/contact/page.tsx`
  - `frontend/app/(main)/privacy/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `frontend/app/(main)/sistem-pos/page.tsx`
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Added Astro manifest generator to map static legacy Astro pages into a local Next.js manifest (code-driven, no Sanity dependency).
  - Introduced legacy-page registry and reusable rendering shell.
  - Added Next.js routes for high-volume Astro service/landing clusters (`pembuatan-website`, `percetakan`, `software`, `layanan`) plus supporting pages (`about`, `contact`, `privacy`, `sistem-pos`).
  - All migrated legacy scaffold routes are currently marked noindex as temporary placeholders during rewrite phase.
  - Blog workflow remains Sanity-driven.
- SEO impact:
  - Integration impact: enables phased Astro-to-Next migration for non-blog pages while avoiding immediate risky bulk redirects.
  - Temporary noindex on scaffold pages prevents thin placeholder pages from being indexed before rewrite completion.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms new static routes for `pembuatan-website`, `percetakan`, `software`, `about`, `contact`, `privacy`, `layanan`, and `sistem-pos`.

## 2026-04-02 - Rewrite-first Strategy Applied (No Mass Redirect Yet)
- Changed files:
  - `frontend/next.config.mjs`
  - `frontend/scripts/generate-astro-local-pages-manifest.mjs`
  - `frontend/lib/legacy-pages/astro-static-manifest.json`
  - `frontend/lib/legacy-pages/astro-static.ts`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
- Summary:
  - Removed temporary mass-cleanup redirect rules to follow rewrite-first migration strategy.
  - Extended legacy manifest generator to include Astro programmatic city pages from `src/data/kota_website/*.json`.
  - Added route support for `/percetakan/cetak-kalender/[kota]` so city pages are present in Next rewrite phase instead of being redirected.
  - Regenerated legacy manifest; total legacy rewrite entries now include city routes.
- SEO impact:
  - Prevents premature redirect deployment before rewrite completion.
  - Keeps legacy city URLs available in controlled noindex rewrite phase, reducing migration gap risk.
- Verification:
  - `pnpm --filter frontend run legacy:manifest` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms generated city routes for:
    - `/pembuatan-website/[slug]` (includes city slugs)
    - `/percetakan/cetak-kalender/[kota]`.

## 2026-04-02 - Fix Legacy Dynamic Params Causing False 404 on Rewritten Astro Routes
- Changed files:
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Updated new legacy rewrite dynamic routes to await App Router `params` (Promise shape in Next 16 server components).
  - This fixes false `notFound()` cases where slug/kota was read as undefined at runtime, which caused 404 on valid routes.
- SEO impact:
  - Prevents accidental 404 responses on valid legacy rewrite URLs.
  - Keeps rewrite-first migration stable without forcing early redirects.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms static generation includes `/percetakan/[slug]`, `/pembuatan-website/[slug]`, and `/percetakan/cetak-kalender/[kota]` routes.

## 2026-04-02 - 3-Worker Rewrite Orchestration Doc (No-Overlap + Shared UI/SEO Contract)
- Changed files:
  - `docs/rewrite-worker-orchestration.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated orchestration playbook for parallel rewrite execution with 3 workers.
  - Defined strict non-overlapping file ownership per worker (UI shell, CMS contract, route rewrite/SEO application).
  - Added mandatory skill usage list, including reusable component requirement and explicit Vercel + shadcn + Geist UI contract.
  - Added shared SEO contract to keep Studio schemas, GROQ query contracts, and frontend metadata logic synchronized.
  - Added merge order and quality gates for stable integration.
- SEO impact:
  - Direct SEO/integration process impact: reduces schema-query-render drift and lowers migration risk by enforcing synchronized implementation and fallback behavior across workers.
- Verification:
  - Manual review completed for ownership matrix, shared standards, and checklist completeness.

## 2026-04-02 - Rewrite Template Activation for Legacy Astro Route Clusters
- Changed files:
  - `frontend/components/legacy/legacy-page-shell.tsx`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/lib/legacy-pages/metadata.ts`
  - `frontend/app/(main)/about/page.tsx`
  - `frontend/app/(main)/about/[slug]/page.tsx`
  - `frontend/app/(main)/contact/page.tsx`
  - `frontend/app/(main)/privacy/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/app/(main)/sistem-pos/page.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/pembuatan-website/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/percetakan/[slug]/page.tsx`
  - `frontend/app/(main)/percetakan/cetak-kalender/[kota]/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `frontend/app/(main)/software/[slug]/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Replaced placeholder-style legacy shell with reusable rewrite template sections (hero, highlights, process, FAQ, CTA, related links).
  - Added `rewrite-content` generator to produce section/slug-aware copy model for website city pages, printing pages, software pages, and generic pages.
  - Added centralized legacy metadata helper that maps rewritten pages to existing frontend metadata pipeline (`generateBasicMetadata`) so canonical/title/description/robots fallback behavior remains integrated.
  - Updated all migrated legacy route files to use centralized metadata helper instead of hardcoded noindex metadata.
- SEO impact:
  - Direct SEO impact: rewritten legacy pages now have richer, intent-aligned content scaffolding and dynamic meta descriptions per route cluster.
  - Integration impact: metadata generation stays synchronized with global SEO fallback logic from Studio (`seoSettings`) through existing frontend helper flow.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms affected legacy clusters compile and generate static paths, including `/percetakan/cetak-buku` via `/percetakan/[slug]`.

## 2026-04-02 - Worker Execution Prompts for Parallel Rewrite Tracks
- Changed files:
  - `docs/worker-prompts/worker-1-ui-shell.md`
  - `docs/worker-prompts/worker-2-cms-contract.md`
  - `docs/worker-prompts/worker-3-rewrite-pages.md`
  - `docs/seo-updates.md`
- Summary:
  - Added 3 copy-paste worker prompts to operationalize parallel execution without file overlap.
  - Each prompt includes mandatory skill usage, owned file boundaries, forbidden paths, mission scope, and acceptance checklist.
  - Prompt content is aligned with existing orchestration rules: Vercel + shadcn + Geist UI direction, reusable component policy, and SEO synchronization discipline.
- SEO impact:
  - Direct SEO/integration process impact: reduces parallel execution drift and improves consistency in metadata and fallback handling across worker outputs.
- Verification:
  - Manual review completed for ownership disjointness and checklist alignment with `docs/rewrite-worker-orchestration.md`.

## 2026-04-02 - Orchestration Docs Sync (Megaplan + SEO Log Consistency)
- Changed files:
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Synced mega-plan status after orchestration publication by adding completed snapshot item for the 3-worker rewrite contract.
  - Updated Workstream A2 checklist to mark legacy dedicated-landing-page exception mapping as completed, with explicit route-cluster note.
  - Added this log entry to keep AGENTS mandatory update-log compliance for the documentation-only sync cycle.
- SEO impact:
  - No direct SEO impact.
  - Integration governance impact: improves execution traceability and reduces coordination drift during rewrite/SEO synchronization.
- Verification:
  - Manual documentation review completed.

## 2026-04-02 - Percetakan `Jasa Cetak Buku` Template Enrichment (Export-Derived, No Content Reduction)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/legacy/legacy-process-faq.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Reworked `cetak-buku` rewrite content using structure patterns extracted from exported legacy cluster `jasa-cetak-buku-*` (399 rows with highly identical section architecture).
  - Expanded template depth to preserve and develop legacy substance (not reducing): stronger service scope, pricing tiers, richer process, extended FAQ set, and additional long-form knowledge guidance.
  - Added reusable `longGuide` contract on rewrite copy model and rendered it via a reusable section in landing template to keep long-form informational value visible on-page.
  - Upgraded FAQ rendering to shared shadcn `Accordion` component for consistent reusable UI behavior.
- SEO impact:
  - Direct SEO/content impact: improves topical completeness and intent match for `jasa cetak buku` style pages by aligning with proven legacy structure (keunggulan, estimasi, langkah pemesanan, FAQ, and deep guide topics).
  - Integration impact: no schema/query contract drift introduced; change is isolated to legacy rewrite template content layer.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build confirms static generation remains valid for `/percetakan/[...segments]` including `/percetakan/cetak-buku`.

## 2026-04-02 - Root Slug Adapter for Deduplicated `jasa-cetak-buku-kota` (Template + City Data)
- Changed files:
  - `frontend/content/astro-local/jasa-cetak-buku-kota/template.mdx`
  - `frontend/content/astro-local/jasa-cetak-buku-kota/cities.json`
  - `frontend/content/astro-local/jasa-cetak-buku-kota/excluded-non-city.json`
  - `frontend/lib/local-content/jasa-cetak-buku-kota.ts`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/legacy/jasa-cetak-buku-city-shell.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added frontend adapter that maps root slugs `jasa-cetak-buku-*` to a deduplicated local dataset generated from export artifacts.
  - Wired route fallback in `/(main)/[slug]` so city pages render from local `template.mdx + cities.json` before Sanity page lookup.
  - Expanded static params generation for root slug route by merging Sanity page slugs with local city slugs (deduplicated).
  - Added dedicated city-shell renderer using existing reusable legacy sections (hero/highlights/landing/process-faq/related-links) and JSON-LD support.
  - Added explicit helper for city-specific rewrite copy from the shared percetakan template contract.
- SEO impact:
  - Direct SEO impact: enables deterministic static generation for high-volume root slug city pages with unique metadata/title/description per city while keeping global fallback behavior.
  - Integration impact: no Studio schema change required; this is a frontend local-content adapter layer for migration/rewrite wave.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms `/(main)/[slug]` static path volume increased (`+396`), reflecting generated city root slugs.

## 2026-04-02 - Slug Coverage Fix for `jasa-cetak-buku-*` Export Parity (399/399)
- Changed files:
  - `frontend/lib/local-content/jasa-cetak-buku-kota.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Identified exact slug gap between export source and frontend dataset: source `399` vs cities dataset `394`.
  - Confirmed the `5` missing slugs are non-city variants from export cluster (`dari-pdf`, `novel-murah`, `yasin`, etc.).
  - Updated static params generation to merge `cities.json` + `excluded-non-city.json`, restoring route coverage parity to `399/399`.
  - Runtime fallback for `jasa-cetak-buku-*` remains active for defensive slug handling.
- SEO impact:
  - Direct SEO impact: removes potential 404 risk for missing exported root slugs and restores crawlable route parity to source export set.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Data parity check passed: `cities 394 + excluded 5 = combined 399`.

## 2026-04-02 - CTA Parity Fix for `jasa-cetak-buku-(kota)` from Export Template
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable quick-action CTA group to rewrite landing sections, enabled through `copy.ctaLinks` contract.
  - Aligned `jasa-cetak-buku-(kota)` CTA labels with export-source template pattern to avoid missing CTA intents:
    - `Hubungi Kami Sekarang`
    - `Tanya di Sini`
    - `Minta Penawaran Akurat di Sini`
    - `Chat & Cetak Sekarang`
  - Enabled these CTA links in both base `cetak-buku` copy preset and city-derived copy builder.
- SEO impact:
  - Direct content/UX impact: restores conversion-intent parity against legacy export pages so key CTA intents are preserved on city pages.
  - No direct Studio schema/query contract impact.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Build output confirms static root slug generation remains healthy (`/[slug]` +401 static paths).

## 2026-04-02 - Vercel-Style UI Shell Rewrite Pass (Reusable Header/Footer/Section Surfaces)
- Changed files:
  - `frontend/app/globals.css`
  - `frontend/app/(main)/layout.tsx`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/footer.tsx`
  - `frontend/components/ui/button.tsx`
  - `frontend/components/ui/card.tsx`
  - `frontend/components/ui/section-container.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Implemented a full UI-shell refresh to align visual direction closer to Vercel style while staying on reusable shadcn + Geist foundations.
  - Added reusable global surface/separator tokens and utilities (`ui-shell`, `section-divider`, `surface-card`, `surface-muted`) and applied them consistently across shared layout blocks.
  - Refined header/navigation (desktop + mobile) rhythm, dropdown/sheet surfaces, and action styles for clearer hierarchy with preserved CMS-driven menu behavior.
  - Refactored footer into cleaner two-zone composition and grouped link surfaces; updated legacy landing section surfaces/dividers so root-slug city pages inherit the same upgraded shell.
- SEO impact:
  - No direct metadata/schema change.
  - Indirect SEO/UX impact: stronger readability and CTA visibility on high-volume rewrite pages without changing route, slug, or CMS query contracts.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.
  - Manual parity checks: root slug adapter and template CTA strings remain present for `jasa-cetak-buku-*` flow (Hubungi/Tanya/Penawaran/Chat).

## 2026-04-02 - Shared UI Consolidation (`legacy` -> `ui`) + Shadcn Breadcrumb Alignment
- Changed files:
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/blocks/rich-content.tsx`
  - `frontend/components/blocks/legacy-rich-content.tsx`
  - `frontend/components/blocks/index.tsx`
  - `frontend/components/ui/breadcrumbs.tsx`
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Consolidated rewrite shell component naming into shared `ui` by renaming exported landing section component to `RewriteLandingSections`.
  - Promoted raw rich-content renderer into non-legacy shared block component (`rich-content`) and kept backward compatibility for Sanity block type `legacy-rich-content`.
  - Extended block map contract so both `_type: "legacy-rich-content"` and `_type: "rich-content"` render through the same shared component.
  - Reworked `Breadcrumbs` wrapper to follow shadcn breadcrumb structure more closely (clean list composition, proper current-page rendering, standard separators, stable keys, no forced primary/bold styling).
  - Stabilized local production build script on webpack (`next build --webpack`) to avoid Turbopack workspace-root inference regressions in this monorepo layout.
- SEO impact:
  - No direct metadata/schema changes.
  - Integration/UX impact: breadcrumb output is cleaner and more consistent across content templates; rich content block contract remains backward-compatible for existing imported Sanity data.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Product Listing Grid Update (2 Mobile / 4 Desktop) + Lazy Load "Show More"
- Changed files:
  - `frontend/components/products/product-grid.tsx`
  - `frontend/app/(main)/products/page.tsx`
  - `frontend/app/(main)/products/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable client component for product listing grid with progressive reveal behavior.
  - Set product card layout to `2 columns` on mobile and `4 columns` on desktop (`lg`).
  - Limited initial render to 16 items and added `Show more products` button to load next batches (16 each click).
  - Applied the same behavior consistently to both `/products` and `/products/[category]` listing views.
- SEO impact:
  - No direct SEO metadata/schema impact.
  - UX/performance impact: reduced initial product-card payload on large collections while preserving crawlable route/content structure.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Lazy Load Added for Post/Project/Service Listings (Layout Preserved)
- Changed files:
  - `frontend/components/posts/post-grid.tsx`
  - `frontend/components/projects/project-grid.tsx`
  - `frontend/components/services/service-grid.tsx`
  - `frontend/app/(main)/blog/page.tsx`
  - `frontend/app/(main)/blog/category/[slug]/page.tsx`
  - `frontend/app/(main)/projects/page.tsx`
  - `frontend/app/(main)/services/page.tsx`
  - `frontend/app/(main)/services/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable lazy-load listing components for post, project, and service archives.
  - Set default initial render to 16 items, with progressive loading via per-section button (`Show more posts/projects/services`).
  - Integrated lazy loading into blog main listing, blog category listing, projects listing, services listing, and services category listing route branch.
  - Kept existing grid layout behavior unchanged for these templates (no new column reconfiguration in this task).
- SEO impact:
  - No direct SEO metadata/schema/query change.
  - UX/performance impact: lowers initial list render payload for large archives while preserving route, links, and content discoverability.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Rewrite Template Refresh for `jasa-cetak-buku-*` and Related Rewrite Routes (Colorful + CTA-First)
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/ui/rewrite/related-links.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refreshed shared rewrite visual system used by `jasa-cetak-buku-(kota)` pages (including `/jasa-cetak-buku-bandung`) and other rewrite templates using the same UI shell.
  - Removed non-relevant surface labels from UI (no visible `legacy/rewrite wave/source file/legacy route` text in hero/related sections).
  - Expanded CTA density across long-form page flow (`hero`, `aksi cepat`, `final CTA`) with clearer multi-action paths.
  - Increased section spacing and introduced broader color surfaces/gradients (sky/cyan/emerald/violet/amber/indigo) to keep long content readable, less monotonous, and more engaging.
  - Preserved existing content/data contracts while improving presentation and conversion hierarchy.
- SEO impact:
  - No direct schema/query/metadata contract change.
  - Indirect SEO/engagement impact: improved readability and CTA prominence for long-form landing routes can improve user engagement signals.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Percetakan Visual Enrichment (Component-Level Color + Local Illustrations)
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/ui/rewrite/related-links.tsx`
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/public/images/percetakan/print-branding.svg`
  - `frontend/public/images/percetakan/print-promo.svg`
  - `frontend/public/images/percetakan/print-event.svg`
  - `frontend/public/images/percetakan/print-book.svg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable local illustration set for percetakan/service-like sections and wired visuals into rewrite templates.
  - Applied image cards to “Jenis Layanan” and refreshed portfolio proof visuals for rewrite pages (including `jasa-cetak-buku-(kota)` routes).
  - Adjusted color strategy per request: reduced full-section background coloration and moved emphasis into smaller components (chips, badges, icon accents, CTA/button accents, border accents).
  - Preserved content breadth while increasing visual breathing room and CTA touchpoints.
- SEO impact:
  - No direct metadata/schema/query contract change.
  - Indirect engagement impact: richer visual assets and clearer CTA hierarchy can improve scroll depth and conversion interaction.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Universal Hero Vector Integrated for `jasa-cetak-buku-(kota)` Pages
- Changed files:
  - `frontend/public/images/percetakan/hero-kotacom-universal.svg`
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added new universal flat-vector hero image branded `KOTACOM` for percetakan city routes.
  - Extended shared rewrite hero component with optional `heroImage` prop.
  - Integrated hero image only for `jasa-cetak-buku-(kota)` template via city shell adapter (covers Bandung and all city variants using same template).
- SEO impact:
  - No direct SEO metadata/schema impact.
  - UX impact: stronger first-screen visual context and brand recognition for city landing pages.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Book-Printing Visual Alignment (Gradient Flat Brand + Service-Specific Illustrations)
- Changed files:
  - `frontend/public/images/percetakan/hero-kotacom-universal.svg`
  - `frontend/public/images/percetakan/service-book-satuan.svg`
  - `frontend/public/images/percetakan/service-book-bulk.svg`
  - `frontend/public/images/percetakan/service-book-finishing.svg`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rebuilt universal hero vector to be explicitly relevant to `jasa-cetak-buku` intent (book-printing context) with colorful flat gradient brand treatment for `KOTACOM`.
  - Added three dedicated flat-vector illustrations for `Jenis Layanan Utama`:
    - Cetak Buku Satuan (POD)
    - Cetak Buku Massal (Offset)
    - Finishing & Jilid Premium
  - Updated rewrite landing service cards for percetakan routes to use book-printing specific titles, copy, and the new per-service images.
- SEO impact:
  - No direct SEO metadata/schema/query changes.
  - UX intent alignment improvement: above-the-fold and service section visuals now match cetak-buku search intent more closely.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Flat Illustration Master Plan (Shark Mascot) Documentation
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a single comprehensive illustration strategy document for website-wide flat-style assets with shark mascot direction.
  - Document includes: visual system, color rules (blue/red/yellow/black-white), mascot consistency rules, production scope by page/use-case (hero, contact, 404, service-specific, CTA/state), detailed prompt template, and highly detailed ready-to-use prompts.
  - Added production workflow, QA checklist, and recommended file structure for implementation.
- SEO impact:
  - No direct SEO impact.
  - Integration support impact: improves consistency for future visual content production and conversion-focused UX implementation.
- Verification:
  - Manual document review completed.

## 2026-04-02 - Flat Illustration Plan Expanded with Quick-Scan `Jasa` Coverage
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded the master illustration document with a quick-scan mapping for additional `jasa` clusters identified from active rewrite/service coverage.
  - Added explicit priority list for service-specific illustrations (website variants, software implementation/installation/custom, and percetakan variants).
  - Added highly detailed ready-to-use prompts for each additional jasa use case to accelerate batch illustration production with consistent mascot/style direction.
- SEO impact:
  - No direct SEO impact.
  - Integration/UX planning impact: improves visual-content readiness across broader service inventory.
- Verification:
  - Manual document review completed.

## 2026-04-02 - Illustration Plan Priority Lock + Remodeling Directive (`Jasa Cetak Buku` First)
- Changed files:
  - `docs/flat-illustration-shark-plan.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated illustration master plan to lock business priority order with `Jasa Cetak Buku` as Priority 1.
  - Added official KOTACOM logo reference URL into the plan for brand consistency guidance.
  - Added explicit remodeling directive section (hero, section rhythm, CTA cadence, trust elements, consistency rules) for high-priority cetak-buku rollout.
  - Added dedicated “Priority Pack Prompt” for `Jasa Cetak Buku` to accelerate production of conversion-oriented master visuals.
- SEO impact:
  - No direct SEO impact.
  - UX/conversion planning impact: clearer execution priority and remodeling guidance for highest-value landing cluster.
- Verification:
  - Manual document review completed.

## 2026-04-02 - Unified Style Guide Page + Priority Illustration Batch (Variations)
- Changed files:
  - `frontend/app/(main)/style-guide/page.tsx`
  - `frontend/public/images/percetakan/hero-kotacom-universal-v2.svg`
  - `frontend/public/images/percetakan/hero-kotacom-universal-v3.svg`
  - `frontend/public/images/percetakan/cta-cetak-buku-contact.svg`
  - `frontend/public/images/percetakan/social-proof-cetak-buku.svg`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rebuilt `/style-guide` into a single visual system page that now consolidates illustration direction, palette, design principles, priority pack, and a live gallery of generated assets.
  - Added two additional hero variations for `jasa-cetak-buku-(kota)` plus dedicated support visuals for CTA/contact and social proof.
  - The style guide now functions as the primary visual review surface for ongoing illustration rollout rather than a generic component demo page.
- SEO impact:
  - No direct SEO impact.
  - Integration/UX impact: creates a single internal review surface for visual consistency and accelerates rollout of conversion-focused imagery.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Importer for Repo-Local Astro Root-Slug Pages
- Changed files:
  - `frontend/scripts/import-astro-local-pages.mjs`
  - `frontend/package.json`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added an idempotent importer for the repo-local Astro source pack under `frontend/content/astro-local/jasa-cetak-buku-kota`.
  - The importer loads the local template plus city and excluded-slug datasets, builds Sanity `page` documents with `legacy-rich-content` blocks, and writes only missing slugs by default.
  - Updated the root-slug route to prefer imported Sanity `page` documents before falling back to the local dataset adapter so CMS content becomes the live source immediately after import.
- SEO impact:
  - Integration impact: repo-local Astro fallback content can now be promoted into Sanity while preserving slug and canonical continuity for root-slug pages.
  - No direct schema change; frontend route resolution now honors CMS content first for imported slugs.
- Verification:
  - Dry-run/import verification executed with the new importer script against the target Sanity dataset.

## 2026-04-02 - Imported Missing MDX Content from Astro Repo into Sanity
- Changed files:
  - `frontend/scripts/import-astro-repo-content.mjs`
  - `frontend/package.json`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated importer for MDX content stored in the external Astro repo at `/home/ubuntu/Kotacom-supabase-schhool/src/pages`.
  - Import scope was limited to content-document buckets only: `posts`, `services`, `projects`, and `products`.
  - Imported only documents that were missing in Sanity, along with the required `category` documents for referenced taxonomy terms.
  - Left the repo-local fallback pack `frontend/content/astro-local/jasa-cetak-buku-kota` untouched, per migration scope.
- SEO impact:
  - Integration impact: canonical CMS content now exists in Sanity for repo-Astro MDX documents, improving migration completeness across blog/service/project/product routes.
  - No direct SEO schema change; import preserved existing frontend/studio contracts and did not alter the local root-slug fallback pack.
- Verification:
  - Dry run before import reported `36` missing content docs and `89` new categories.
  - Write run imported `20` posts, `3` services, `12` projects, `1` product, and `89` categories.
  - Post-import dry run reported `missingTotal: 0`.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-02 - Code-Driven `layanan/[slug]` Coverage from Astro JSON Source
- Changed files:
  - `frontend/content/astro-local/json-usaha/Biro_jasa_perizinan.json`
  - `frontend/content/astro-local/json-usaha/Jasa_pengukuhan_PKP.json`
  - `frontend/content/astro-local/json-usaha/agency_landing.json`
  - `frontend/lib/local-content/json-usaha.ts`
  - `frontend/components/ui/json-usaha-page.tsx`
  - `frontend/app/(main)/layanan/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Copied the Astro `json_usaha` business-page source files into the frontend repo as migration-safe local content input.
  - Added a normalization adapter that maps the raw JSON structures into a single code-driven page contract for Next.js.
  - Implemented `/(main)/layanan/[slug]` as a static route that generates pages from the normalized JSON source and renders shared section blocks for hero, service list, pricing, testimonials, FAQ, and CTA.
  - This closes the missing legacy business-page gap for the `layanan/[slug]` Astro route without moving the content into Sanity.
- SEO impact:
  - Integration impact: preserves legacy business-page route coverage in a code-driven form while keeping metadata generation and breadcrumb/service/FAQ JSON-LD on the Next side.
  - No direct Sanity schema/query impact.
- Verification:
  - JSON source coverage check confirmed `3/3` slugs: `agency-landing`, `biro-jasa-perizinan`, `jasa-pengukuhan-pkp`.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-02 - Money Pages Content Quality Pass v2 (Manual Intent Rewrite + CTA Reuse)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded manual money-page rewrite overrides from generic priority CTA tuning into a deeper intent rewrite pass for 16 commercial slugs.
  - Fine-tuned conversion copy per slug on headline-level keyword focus (`primaryKeyword`), intro framing, final CTA message, CTA button label, and manual FAQ pairs to better match user intent on key commercial routes.
  - Included selected pages across website/printing/software clusters (`pembuatan-website`, `harga`, `jasa-migrasi-wordpress`, key `jasa-pembuatan-website-*`, `template`, `percetakan`, `cetak-buku`, `cetak-brosur`, `cetak-company-profile`, `cetak-kartu-nama`, `cetak-kemasan-product`, `software`, `pembuatan-software`, `implementasi-software`, `instalasi-software`, `sistem-pos`).
  - Synced shared UI behavior by replacing hardcoded final CTA text with `copy.ctaLabel` fallback in both rewrite and legacy landing section components so messaging remains consistent with page-specific rewrite copy.
- SEO/integration impact:
  - Direct SEO impact: stronger intent alignment and commercial relevance for priority money pages via manual copy tuning beyond rule-based enrichment.
  - Integration impact: UI CTA label now reuses central copy contract, reducing content/render drift between rewrite-content engine and rendered page CTA.
  - Astro vs Next comparison note: static Astro manifest supplies route/title scaffolding, while this pass upgrades Next rewrite output to intent-led commercial messaging on selected high-value pages.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Manual diff review completed for rewritten slugs and CTA reuse wiring.

## 2026-04-02 - City Money Pages Pass v1 (`jasa-cetak-buku-*` Top 20) + Metadata Sync
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/jasa-cetak-buku-city-shell.tsx`
  - `frontend/app/(main)/[slug]/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added manual intent overrides for top 20 GSC-priority city slugs in `buildPercetakanCetakBukuCityCopy` (`surabaya`, `sidoarjo`, `mojokerto`, `samarinda`, `jeneponto`, `mataram`, `banjarmasin`, `polewali-mandar`, `kendari`, `manado`, `jayapura`, `medan`, `pontianak`, `tomohon`, `kepulauan-sangihe`, `manokwari-selatan`, `sarolangun`, `palu`, `tanjung-pinang`, `pringsewu`).
  - Enriched city copy with more specific intro/CTA/final-CTA direction and city-level conversion framing.
  - Added reusable city FAQ set in the city-copy builder to keep long-tail city pages aligned with the same conversion and trust structure.
  - Synced city shell rendering to prefer rewrite copy for on-page intro/description instead of falling back to legacy excerpt text.
  - Synced root-slug metadata generation to use rewrite city title/description, so metadata output matches rendered city-copy strategy.
- SEO/integration impact:
  - Direct SEO impact: improved intent specificity and snippet quality across high-priority city commercial pages.
  - Integration impact: city route metadata and rendered content now share one rewrite source of truth, reducing copy drift between route-level metadata and UI output.
  - Cross-layer sync: frontend metadata route (`/(main)/[slug]`), rewrite content engine, and city-shell renderer updated in the same task.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - Manual check completed against local GSC priority source (`frontend/tmp/gsc-kotacom-full-sitemap0/gsc-pages-priority.csv`) for city target selection.

## 2026-04-02 - Frontend CTA Expansion + Live SEO Pass Check (Priority Sample)
- Changed files:
  - `frontend/lib/legacy-pages/rewrite-content.ts`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/legacy/legacy-landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Expanded centralized CTA strategy in rewrite engine:
    - Added section-level CTA seed packs (`pembuatan-website`, `percetakan`, `software`, `sistem-pos`) with mixed action intents (consultation, estimate, package, FAQ, discovery).
    - Added CTA de-duplication helper and merged page CTA + section CTA defaults to increase conversion action options per page.
    - Strengthened default final CTA description to be more action-oriented.
  - Expanded frontend conversion surfaces in both rewrite and legacy templates:
    - Added new mid-page conversion section `#cta-mid`.
    - Added extra final CTA action (`Lihat FAQ`) so users have more decision paths near final conversion block.
    - Added TOC entry for mid CTA when CTA links are available.
  - Ran live SEO metadata audit for priority sample with unrestricted network:
    - Output: `frontend/tmp/seo-pass-front-20260402-escalated/seo-metadata-audit.csv`
    - Summary: `frontend/tmp/seo-pass-front-20260402-escalated/seo-metadata-audit-summary.json`
- SEO/integration impact:
  - Direct frontend UX/SEO impact: stronger CTA density and clearer internal conversion paths across commercial page templates.
  - SEO pass status (live sample, 120 URLs): **not fully pass yet**.
    - `meta_description_too_long`: 106
    - `title_too_long`: 22
    - `http_status_not_200`: 10
  - Interpretation: residual failures are still dominated by legacy live pages/redirect gaps and long metadata on production URLs, not only migrated frontend templates.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend exec node scripts/audit-seo-metadata.mjs -- --input-csv ./tmp/gsc-kotacom-full-sitemap0/gsc-pages-priority.csv --input-column page --out-dir ./tmp/seo-pass-front-20260402-escalated --concurrency 6 --max-urls 120 --timeout-ms 12000` completed.

## 2026-04-02 - Frontend Metadata Normalization Unification + Money-Page Length Pass
- Changed files:
  - `frontend/lib/seo-normalize.ts` (new)
  - `frontend/lib/legacy-pages/metadata.ts`
  - `frontend/sanity/lib/metadata.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added shared frontend SEO normalization utility for title and description length management (`normalizeSeoTitle`, `normalizeSeoDescription`) in `frontend/lib/seo-normalize.ts`.
  - Refactored legacy metadata generator to use shared utility instead of local duplicate normalize functions.
  - Applied the same normalization in `frontend/sanity/lib/metadata.ts` (`buildMetadata`) so `generateBasicMetadata` and `generatePageMetadata` outputs are aligned with the same title/description quality envelope.
  - Improved short-title behavior to always reach minimum practical SEO title length by extending short outputs safely (for example on compact service names).
  - Validated money-page and city-page metadata lengths from frontend source layer:
    - 14 money routes (`/pembuatan-website*`, `/percetakan*`, `/software*`, `/sistem-pos`)
    - 20 top city routes (`jasa-cetak-buku-*` priority set)
    - Result: `TOTAL_FAIL=0`, `CITY_TOTAL_FAIL=0` for target ranges (title 30-60, description 120-155).
- SEO/integration impact:
  - Direct SEO impact: consistent metadata normalization across legacy and non-legacy metadata generators reduces title/description length outliers on frontend-generated routes.
  - Integration impact: one shared utility now controls normalization policy, reducing drift risk between route families.
  - Note on live-site gap: production audit sample still shows unresolved legacy URL issues outside migrated frontend scope and requires redirect/content cleanup waves.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm dlx tsx` metadata-length verification script run from `frontend` workspace confirmed pass for targeted money/city route sets.

## 2026-04-02 - Astro Navigation Sanitization + Sanity Import
- Changed files:
  - `frontend/scripts/import-astro-navigation.mjs`
  - `frontend/package.json`
  - `studio/schemas/blocks/shared/link.ts`
  - `frontend/components/header/index.tsx`
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated importer for the Astro header menu snapshot at `/home/ubuntu/Kotacom-supabase-schhool/website/content/astro-mirror/globals/main-menu.md`.
  - Normalized legacy Astro navbar paths to the current Next.js route contract before import, including `/posts -> /blog`, `/categories/percetakan -> /percetakan`, and generic trailing-slash archive links to their canonical archive roots.
  - Imported the Astro mega-menu structure, including grouped submenu sections, into the active Sanity `navigation` document and set the header CTA to WhatsApp.
  - Replaced several Astro placeholder submenu targets with live route hubs and enriched submenu content using:
    - local GSC-priority pages with strong click demand
    - live Sanity `project` and `product` documents for portfolio/catalog dropdown coverage
  - Added curated live/GSC submenu entries for high-value routes such as `jasa-cetak-buku-surabaya`, `jasa-instal-aplikasi-surabaya`, `jasa-install-software-macbook`, `jasa-recovery-data-surabaya`, `service-komputer-surabaya-panggilan`, `rekomendasi-rakit-pc-5-jutaan`, and other PC-guide posts.
  - Added Studio-controlled `showInHeader` support so top-level nav items can be footer-only; header rendering now excludes links with `showInHeader: false` while footer keeps using `showInFooter`.
  - Applied the new footer-only behavior to secondary top-level links imported from Astro so `About` and `Contact` stay available in the footer without adding more pressure to the main header.
  - Removed submenu description copy from header rendering and importer output so dropdowns stay denser and more scannable.
  - Updated mobile nav interaction so accordion groups stay collapsed when the menu opens instead of expanding all sections immediately.
  - Reworked top-level navigation IA so the broad `Services` bucket is split into more explicit business-led entries: `Home`, `Web Dev`, `IT Service`, `Percetakan`, `Portfolio`, `Produk`, `About`, and `Contact`, while `Blog` is retained as a footer-only support link.
  - Added `pnpm --filter frontend astro-nav:import` for repeatable dry-run and write execution.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: Astro-source navigation is now synchronized with the live Sanity menu contract, preserving route consistency and CMS control for primary links and submenus while making internal links more reflective of actual live demand and live content inventory.
  - Cross-layer sync: Studio navigation schema, importer payload, and frontend header/footer rendering now share the same visibility contract for footer-only behavior.
- Verification:
  - `pnpm --filter frontend exec node scripts/import-astro-navigation.mjs` dry run passed.
  - `pnpm --filter frontend exec node scripts/import-astro-navigation.mjs --write` passed using `SANITY_DEV` auth and updated Sanity document `navigation` to `linkCount: 9`, `childCount: 47`.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Rewrite Hero V2 + Shared WhatsApp CTA Contract
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/hero-primary-cta.tsx`
  - `frontend/components/floating-whatsapp-client.tsx`
  - `frontend/lib/whatsapp.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Rebuilt the shared rewrite hero into a centered Vercel-inspired composition with a tighter two-CTA hierarchy for service landing pages.
  - Added colored emphasis treatment to the hero headline and supporting description so the above-the-fold message feels more intentional and distinct.
  - Moved the hero primary CTA to a dedicated client component that builds its WhatsApp destination from the live Sanity settings contract (`phoneNumber`, `predefinedText`, `ctaText`, `sourceUrl`) while keeping the existing page CTA as fallback when WhatsApp is unavailable.
  - Extracted the WhatsApp URL builder into a shared utility and updated the floating WhatsApp CTA to use the same helper so both conversion surfaces stay behaviorally aligned.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: the rewrite hero and floating WhatsApp CTA now share the same Sanity-driven WhatsApp destination contract, reducing drift between conversion surfaces.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Visual Section Foundation for Rewrite Pages
- Changed files:
  - `frontend/components/ui/section-shell.tsx`
  - `frontend/app/globals.css`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `frontend/components/ui/rewrite/highlights.tsx`
  - `frontend/components/ui/rewrite/process-faq.tsx`
  - `frontend/components/ui/rewrite/related-links.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable rewrite-page UI primitives for section structure: container shell, section intro, tinted thin-frame panel, and split visual/content panel.
  - Added global surface utilities for connected gradient-tint panels so section backgrounds and thin frames feel more deliberate and visually continuous.
  - Migrated the rewrite-page quick navigation, service section, proof/portfolio section, highlights, process/FAQ, and related-link surfaces to the new primitives.
  - Shifted key rewrite sections from card-grid-first layouts toward a more visual-driven split-panel rhythm inspired by the Vercel reference pattern.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: shared rewrite UI sections now use a centralized visual-shell contract, reducing styling drift between landing-page components.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Visual Section Foundation V2 for Commercial Rewrite Blocks
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `frontend/components/ui/rewrite/landing-sections.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Moved the hero intro copy into a thin framed panel so the above-the-fold message matches the Vercel-inspired surface language already introduced in the hero shell.
  - Rebuilt pricing, features, testimonials, and final CTA blocks to follow the same visual-first split-panel rhythm instead of generic card-grid sections.
  - Added stronger continuity between commercial sections by keeping tint, border weight, and separator behavior consistent from hero through closeout CTA.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: commercial rewrite sections now share a more uniform visual contract, reducing divergence between high-intent page components.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Missing Vercel-Pattern Rewrite Primitives Added
- Changed files:
  - `frontend/components/ui/rewrite/inline-phrase-strip.tsx`
  - `frontend/components/ui/rewrite/metrics-rail.tsx`
  - `frontend/components/ui/rewrite/product-stage.tsx`
  - `frontend/components/ui/rewrite/quote-spotlight.tsx`
  - `frontend/components/ui/rewrite/logo-wall.tsx`
  - `frontend/components/ui/rewrite/page-shell.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable rewrite-page components to cover several patterns previously missing versus the Vercel references: metrics rail, inline phrase strip, staged product/story section, quote spotlight, and logo wall.
  - Wired the new primitives into the shared rewrite page shell so all rewrite pages can now render a richer product-led flow without custom one-off section code.
  - Resolved a transient Next route-validator issue during verification by clearing stale `frontend/.next` artifacts before rerunning typecheck.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: the shared rewrite shell now owns a broader visual component system, reducing the need for page-specific section implementations as more Vercel-like patterns are adopted.
- Verification:
  - `rm -rf frontend/.next && pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Draft-Only Sanity Live Mount for Public Routes
- Changed files:
  - `frontend/app/(main)/layout.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Updated the main frontend layout so `SanityLive` only mounts when Next.js Draft Mode is enabled.
  - Kept `DisableDraftMode` and `VisualEditing` behavior intact for draft sessions while removing unnecessary live-preview client bootstrapping from public routes.
  - This prevents public rewrite/city landing pages such as `/jasa-cetak-buku-surabaya` from hitting the observed client-side parsing failure during dev/runtime.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: public frontend rendering is now isolated from Sanity live-preview client behavior unless the session explicitly enters Draft Mode.
- Verification:
  - Pending manual route retest in local dev after layout change.

## 2026-04-03 - Noindex Component UI Canvas Route
- Changed files:
  - `frontend/app/(main)/component-ui/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated internal route at `/component-ui` to preview the current rewrite primitive system in one place.
  - The page showcases section shell, tinted panels, split visual sections, metrics rail, phrase strip, product stage, quote spotlight, and logo wall.
  - Metadata for the route is explicitly marked `noindex` so the UI sandbox stays out of the public search surface.
- SEO/integration impact:
  - Direct SEO impact: route is intentionally excluded from indexing through metadata `noindex`.
  - Integration impact: provides a stable internal review page for ongoing component-system work without coupling the audit flow to production landing pages.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Hero Description Surface Simplified
- Changed files:
  - `frontend/components/ui/rewrite/hero.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Removed the background panel treatment behind the main rewrite hero description so the intro copy renders as plain text again.
  - Kept the supporting conversion note below the intro without the framed surface.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: visual change only within the shared rewrite hero component.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Component UI Route Expanded into Sectioned Component Catalogue
- Changed files:
  - `frontend/app/(main)/component-ui/page.tsx`
  - `docs/seo-updates.md`
- Summary:
  - Expanded `/component-ui` from a simple visual sandbox into a structured component catalogue page.
  - Added per-section component metadata panels so each showcased block now explains the component name, source file, and intended role in the rewrite system.
  - Included the main rewrite components directly on the page: `RewriteHero`, `MetricsRail`, `InlinePhraseStrip`, `SectionShell` primitives, `ProductStage`, `RewriteLandingSections`, `MicroBadges`, `QuoteSpotlight`, `LogoWall`, `RewriteHighlights`, `RewriteProcessFaq`, and `RewriteRelatedLinks`.
- SEO/integration impact:
  - Direct SEO impact: none beyond the existing `noindex` behavior for the internal route.
  - Integration impact: `/component-ui` now acts as a clearer internal reference surface for the active rewrite component system.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Software Rewrite Cluster Split into Page Modules
- Changed files:
  - `frontend/lib/legacy-pages/content/software.ts`
  - `frontend/lib/legacy-pages/content/software-overrides.ts`
  - `frontend/lib/legacy-pages/content/registry.ts`
  - `frontend/lib/legacy-pages/content/software-pages/software-index.ts`
  - `frontend/lib/legacy-pages/content/software-pages/pembuatan-software.ts`
  - `frontend/lib/legacy-pages/content/software-pages/implementasi-software.ts`
  - `frontend/lib/legacy-pages/content/software-pages/instalasi-software.ts`
  - `frontend/lib/legacy-pages/content/software-pages/sistem-pos.ts`
  - `frontend/lib/legacy-pages/content/software-pages/overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Moved the main `software` anchor routes and `sistem-pos` into dedicated page modules under `content/software-pages/*` so they no longer live only as inline branches inside the cluster resolver.
  - Updated the legacy page registry to resolve `/software`, `/software/pembuatan-software`, `/software/implementasi-software`, `/software/instalasi-software`, and `/sistem-pos` as page-specific sources.
  - Reduced `software.ts` to shared fallback/detail orchestration and turned `software-overrides.ts` into a thinner composer around page-focused overrides.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: legacy software rewrite content is now maintained per page/module, reducing divergence risk between route-level intent and the runtime resolver while preserving the existing route contract.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after regenerating `.next/types` via the successful build.

## 2026-04-03 - Website Rewrite Cluster Started Moving to Page Modules
- Changed files:
  - `frontend/lib/legacy-pages/content/website.ts`
  - `frontend/lib/legacy-pages/content/website-overrides.ts`
  - `frontend/lib/legacy-pages/content/registry.ts`
  - `frontend/lib/legacy-pages/content/website-pages/website-index.ts`
  - `frontend/lib/legacy-pages/content/website-pages/harga.ts`
  - `frontend/lib/legacy-pages/content/website-pages/company-profile.ts`
  - `frontend/lib/legacy-pages/content/website-pages/toko-online.ts`
  - `frontend/lib/legacy-pages/content/website-pages/overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated `website-pages/*` content layer for the main `pembuatan-website` anchor routes instead of keeping those page definitions only inside the mixed cluster builder.
  - Updated the legacy route registry so `/pembuatan-website`, `/pembuatan-website/harga`, `/pembuatan-website/jasa-pembuatan-website-company-profile`, and `/pembuatan-website/jasa-pembuatan-website-toko-online` resolve as page-specific sources.
  - Reduced `website.ts` and `website-overrides.ts` by delegating anchor-page content and priority overrides to page-focused modules while preserving city/service fallback behavior.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: high-value website landing routes are now maintained closer to route ownership, reducing mixed-cluster coupling while keeping existing route, metadata, and fallback contracts intact.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after regenerating `.next/types` via the successful build.

## 2026-04-03 - Website Service Routes Completed into Page Modules
- Changed files:
  - `frontend/lib/legacy-pages/content/website.ts`
  - `frontend/lib/legacy-pages/content/website-overrides.ts`
  - `frontend/lib/legacy-pages/content/registry.ts`
  - `frontend/lib/legacy-pages/content/website-pages/migrasi-wordpress.ts`
  - `frontend/lib/legacy-pages/content/website-pages/dokter-klinik.ts`
  - `frontend/lib/legacy-pages/content/website-pages/expedisi.ts`
  - `frontend/lib/legacy-pages/content/website-pages/komunitas-ngo.ts`
  - `frontend/lib/legacy-pages/content/website-pages/konstruksi.ts`
  - `frontend/lib/legacy-pages/content/website-pages/sekolah.ts`
  - `frontend/lib/legacy-pages/content/website-pages/template.ts`
  - `frontend/lib/legacy-pages/content/website-pages/overrides.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added dedicated page modules for the remaining non-city `pembuatan-website` service routes so the website cluster no longer stores those page definitions inside one mixed preset object.
  - Expanded registry-level page resolution to cover the remaining website service routes, leaving city pages as the main parametric-template path.
  - Moved the corresponding page-level override copy into `website-pages/overrides.ts` and reduced `website-overrides.ts` to a thinner composer plus non-route-specific leftovers such as `portfolio`.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: website rewrite content ownership is now much closer to route boundaries, reducing mixed-cluster drift and making Astro-vs-Next parity work easier to do per page.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after regenerating `.next/types` via the successful build.

## 2026-04-03 - Website Page Parity Pass for Company Profile and Toko Online
- Changed files:
  - `frontend/lib/legacy-pages/content/website-pages/company-profile.ts`
  - `frontend/lib/legacy-pages/content/website-pages/toko-online.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Compared the legacy Astro sources for `jasa-pembuatan-website-company-profile` and `jasa-pembuatan-website-toko-online` against the new Next page modules.
  - Expanded the Next page-content modules so they now carry more of the original Astro intent: enterprise system integration for company profile, and payment/inventory/customer-management analytics for toko online.
  - Added more specific highlights, process steps, FAQs, and CTA links so these pages are less generic and closer to the business story expressed in the old Astro versions.
- SEO/integration impact:
  - Direct SEO impact: richer long-form intent alignment for two high-value landing pages, with stronger keyword/context coverage that better matches the original Astro source.
  - Integration impact: no contract changes; this is content-level parity refinement inside the existing page-module system.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after regenerating `.next/types` via the successful build.

## 2026-04-03 - Hybrid Sanity Plus Code-Driven Demo Page Added
- Changed files:
  - `frontend/app/(main)/test-page-hybrid/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated demo route at `/test-page-hybrid` to show the recommended hybrid pattern for important landing pages.
  - The route keeps the overall shell, explanatory sections, and source-status panels in code, while fetching and rendering Sanity `page` blocks for the editable middle sections.
  - Seeded a matching Sanity `page` document with slug `test-page-hybrid` plus two FAQ documents using dev-first credentials, so the route now demonstrates live `hero-1`, `section-header`, `grid-row`, `cta-1`, and `faqs` blocks coming from Sanity.
- SEO/integration impact:
  - Direct SEO impact: route metadata is forced to `noindex` because this page is an internal demo only.
  - Integration impact: proves that a money-page-safe hybrid delivery model can work with the existing `page` schema and block renderer, without moving entire route ownership into the CMS.
- Verification:
  - Sanity verification query confirmed slug `test-page-hybrid` with block types `hero-1`, `section-header`, `grid-row`, `cta-1`, and `faqs`.
  - `pnpm --filter frontend run build` passed with new route count `1145/1145`.
  - `pnpm --filter frontend run typecheck` passed after regenerating `.next/types` via the successful build.

## 2026-04-03 - Sanity Page Guardrails Added for _key and isExternal
- Changed files:
  - `frontend/package.json`
  - `frontend/scripts/lib/sanity-page-guards.mjs`
  - `frontend/scripts/audit-sanity-page-arrays.mjs`
  - `frontend/scripts/normalize-sanity-page-arrays.mjs`
  - `docs/sanity-seed-guardrails.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable Sanity page-guard helpers plus two commands: one audit script to detect missing `_key` and missing `link.isExternal`, and one normalizer script to patch `page` documents in place.
  - Standardized the write-token priority inside the new scripts to prefer `SANITY_DEV` before `SANITY_AUTH_TOKEN`, matching the repository's dev-first Sanity policy.
  - Ran the normalizer against the current dataset, which fixed legacy issues on existing `page` documents such as `index` and `blog`, then re-ran the audit to confirm the current dataset is clean.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: Sanity page content edited or seeded through scripts now has a repeatable safety net for list `_key` integrity and explicit internal-vs-external link behavior.
- Verification:
  - `pnpm --filter frontend run sanity:pages:audit -- --slug=test-page-hybrid` returned `affectedPageCount: 0`.
  - `node frontend/scripts/normalize-sanity-page-arrays.mjs --slug=test-page-hybrid` dry run returned `targetPageCount: 0`.
  - `pnpm --filter frontend run sanity:pages:normalize` patched affected legacy `page` documents and reduced their issue counts to zero.
  - `pnpm --filter frontend run sanity:pages:audit` returned `affectedPageCount: 0`.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Sanity Seed Rules Documented
- Changed files:
  - `docs/sanity-seed-guardrails.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated guardrail document for Sanity seed/insert workflows.
  - Documented the mandatory rules that every array item must include `_key` and every `link` object must explicitly set `isExternal`.
  - Included the expected audit and normalize commands to run after scripted writes.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: lowers the chance of future Studio editing failures or ambiguous link behavior during scripted Sanity writes.
- Verification:
  - Rule document reviewed against the current `link` schema and the working page-audit/normalize commands.

## 2026-04-03 - Hybrid FAQ Public Read Fix and Renderer Hardening
- Changed files:
  - `frontend/components/blocks/faqs.tsx`
  - `docs/sanity-seed-guardrails.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Hardened the FAQ block renderer to skip null references instead of throwing when a dereferenced FAQ is missing.
  - Traced the `/test-page-hybrid` runtime error to Sanity document IDs that used dots in public-facing referenced `faq` documents, which caused public dereference results to return `null` even though token-authenticated queries succeeded.
  - Migrated the demo FAQ documents and their page references to safe hyphenated IDs, and documented the no-dot rule for public Sanity documents and references.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: hybrid Sanity blocks on `/test-page-hybrid` now render correctly in public mode, and future public `page`/`faq` seed workflows have an explicit ID-safety rule.
- Verification:
  - Public Sanity query for slug `test-page-hybrid` now returns the page and all expected block types without a token.
  - Public Sanity query for the `faqs` block no longer returns `null` references.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-03 - AGENTS and Skill Updated for Public Sanity Guardrails
- Changed files:
  - `AGENTS.md`
  - `skills/sanity-public-content-guardrails/SKILL.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added repo-level agent instructions that require public Sanity seed/import work to follow the documented hybrid/public-content guardrails.
  - Added a reusable local skill for public Sanity content workflows, covering safe document IDs, `_key`, `link.isExternal`, public-read verification, and frontend null-safety checks.
  - Linked the new execution guidance into the migration megaplan so future agent-driven CMS work uses the same rules by default.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reduces recurrence of public-read failures for Sanity-backed pages and references during agent-driven content automation.
- Verification:
  - Manual review of `AGENTS.md`, `docs/sanity-seed-guardrails.md`, and the new skill confirmed the rules are aligned.

## 2026-04-03 - Test Page Hybrid Blueprint Refined
- Changed files:
  - `frontend/app/(main)/test-page-hybrid/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refactored `/test-page-hybrid` into a clearer hybrid blueprint with explicit code-owned intro and diagnostics, separate Sanity hero/proof and conversion zones, ownership mapping, and a stronger fallback explanation section.
  - Replaced the previous generic card-stack layout with a more deliberate sequence that better demonstrates how a real money page should split responsibility between route logic and CMS blocks.
  - Preserved the existing hybrid fetch/metadata behavior while making the route more useful as a reference implementation for `/pembuatan-website`.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: makes the hybrid delivery pattern easier to validate and reuse for production landing pages without changing the underlying Sanity contract.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after build regenerated `.next/types`.

## 2026-04-03 - Page-Level Hybrid Split Control Added
- Changed files:
  - `studio/schemas/documents/page.ts`
  - `frontend/sanity/queries/page.ts`
  - `frontend/app/(main)/test-page-hybrid/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a new `topBlockCount` field to Sanity `page` documents so editors can keep one freeform `blocks[]` array while controlling how many blocks render before the code-owned middle section on hybrid pages.
  - Updated the shared page query to fetch `topBlockCount` and refactored `/test-page-hybrid` to split on `blocks.slice(0, topBlockCount)` and `blocks.slice(topBlockCount)` instead of using hardcoded block-type zones.
  - Patched the live `test-page-hybrid` Sanity document to set `topBlockCount: 3`, keeping the demo immediately usable from Studio.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: hybrid page layout control now lives at the `page` document level, which is more flexible for editors and simpler than per-block placement fields.
- Verification:
  - Public Sanity query for `test-page-hybrid` returned `topBlockCount: 3`.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after build regenerated `.next/types`.

## 2026-04-03 - Pembuatan Website Main Route Hybrid Wrapper Added
- Changed files:
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Upgraded `/pembuatan-website` main route from pure local rewrite output to a hybrid wrapper that fetches the Sanity `page` document for slug `pembuatan-website` and renders top/bottom block zones around the existing `RewritePageShell`.
  - Kept metadata and the core local rewrite funnel unchanged so the route preserves its current internal-linking, schema, and conversion structure while still allowing Sanity-driven support/proof and CTA layers.
  - Seeded a public-safe Sanity `page` document for `pembuatan-website` with `topBlockCount: 2`, a support `section-header`, a `grid-row` of website offer cards, and a bottom `cta-1` block to make the hybrid behavior immediately testable.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: `/pembuatan-website` now supports Sanity-managed supplemental content without replacing the stable local rewrite shell or changing fallback metadata behavior.
- Verification:
  - Public Sanity query for slug `pembuatan-website` returned `_id: page-pembuatan-website`, `topBlockCount: 2`, and block types `section-header`, `grid-row`, `cta-1`.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed.
  - `curl http://168.110.210.101:3000/pembuatan-website` did not yet show the new seeded strings, indicating the live server likely is not running the latest repo build yet.

## 2026-04-03 - Reusable Main-Route Hybrid Wrapper and Workflow Added
- Changed files:
  - `frontend/components/hybrid/page-hybrid-shell.tsx`
  - `frontend/app/(main)/pembuatan-website/page.tsx`
  - `frontend/app/(main)/percetakan/page.tsx`
  - `frontend/app/(main)/software/page.tsx`
  - `AGENTS.md`
  - `skills/hybrid-content-page-workflow/SKILL.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Extracted the main-route hybrid behavior into a shared `PageHybridShell` that fetches a Sanity `page`, splits `blocks[]` using `topBlockCount`, and renders top/bottom zones around an existing code-owned route shell.
  - Switched the main routes for `pembuatan-website`, `percetakan`, and `software` to use the shared wrapper instead of route-local hybrid logic.
  - Seeded public-safe Sanity `page` documents for `percetakan` and `software` with conservative support/proof plus CTA blocks, and confirmed all three main hybrid slugs are publicly readable.
  - Added a dedicated hybrid-content workflow skill and referenced it from `AGENTS.md` so future agent work follows the same “create page in Sanity first, then wire wrapper” pattern.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: the hybrid main-page contract is now reusable across multiple primary landing pages without duplicating route logic, while keeping legacy rewrite shells and metadata behavior intact.
- Verification:
  - Public Sanity queries returned valid `page` documents for `pembuatan-website`, `percetakan`, and `software`, each with `topBlockCount` and public block data.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after build regenerated `.next/types`.

## 2026-04-03 - Homepage and Layanan Moved to Hybrid Page Shell
- Changed files:
  - `frontend/app/(main)/page.tsx`
  - `frontend/app/(main)/layanan/page.tsx`
  - `frontend/components/hybrid/home-middle-section.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Converted the root homepage `/` from a fully Sanity-rendered `Blocks` page into a hybrid route that keeps Sanity-managed top and bottom block zones while inserting a new code-owned middle section describing Kotacom's operating model and service lanes.
  - Switched `/layanan` to the shared `PageHybridShell` so the route now follows the same top/bottom Sanity block pattern around the existing rewrite shell used by other main landing pages.
  - Seeded the public `layanan` page document and updated the existing public `index` page document with `topBlockCount` so editors can continue reordering a single `blocks[]` array while deciding how much renders above the code-owned middle section.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: `/`, `/layanan`, `/pembuatan-website`, `/percetakan`, and `/software` now share one hybrid main-page contract, reducing route drift while preserving route-specific metadata and fallback behavior.
- Verification:
  - Public Sanity query confirmed `index` now exposes `topBlockCount: 5`.
  - Public Sanity query confirmed `layanan` resolves as a published page with `topBlockCount: 2`.
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Hybrid Indicator Added to Sanity Page List
- Changed files:
  - `studio/schemas/documents/page.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a preview rule to Sanity `page` documents so hybrid main pages now show a simple list subtitle such as `Hybrid · Top 2` directly in the Studio page list.
  - The indicator is computed from the route-owned hybrid slug whitelist and `topBlockCount`, so editors can recognize hybrid pages and their current split without opening each document or maintaining a manual toggle field.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: improves Studio editorial clarity for the hybrid main-page workflow without changing frontend rendering or the Sanity content contract.
- Verification:
  - `pnpm --filter studio run build` passed.

## 2026-04-03 - Hybrid Page CLI Scaffolder Added
- Changed files:
  - `frontend/package.json`
  - `frontend/scripts/create-hybrid-page.mjs`
  - `frontend/scripts/lib/hybrid-page-presets.mjs`
  - `frontend/scripts/lib/sanity-page-guards.mjs`
  - `skills/hybrid-content-page-workflow/SKILL.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a new preset-based CLI at `pnpm --filter frontend run hybrid:create -- ...` to scaffold or patch hybrid Sanity `page` documents quickly for main landing routes.
  - The new script supports `create`, `upsert`, and safe default `seed-missing` modes, uses dev-first write credentials, generates public-safe IDs, normalizes block payloads through the existing page guardrails, and verifies public-read after writes.
  - Added a small preset registry for `main-landing` and `homepage`, plus updated the hybrid workflow skill to document the new command and its guarantees.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reduces manual setup friction when converting a route to hybrid while preserving the public-read, `_key`, and `link.isExternal` rules already required by the frontend and Studio contracts.
- Verification:
  - `pnpm --filter frontend run hybrid:create -- --slug=layanan --preset=main-landing` passed as a dry run.
  - `pnpm --filter frontend run hybrid:create -- --slug=layanan --preset=main-landing --write` passed and confirmed public-read for `page-layanan`.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Hybrid CLI Workflow Documented
- Changed files:
  - `docs/hybrid-page-cli-workflow.md`
  - `skills/hybrid-content-page-workflow/SKILL.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated operational document for the hybrid page CLI workflow, covering purpose, presets, modes, dry-run versus write behavior, whitelist rules, rollout examples, troubleshooting, and linked source files.
  - Linked the hybrid workflow skill to the new document so both agent-driven and human-driven usage point to the same instructions.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reduces ambiguity for future hybrid rollout work and makes the preset-based CLI safer to use consistently across the team.
- Verification:
  - Manual review confirmed the new document matches the current CLI behavior, preset names, and write-verification contract.

## 2026-04-03 - Hybrid Route Bootstrap Generator Added
- Changed files:
  - `frontend/package.json`
  - `frontend/scripts/create-hybrid-route.mjs`
  - `docs/hybrid-page-cli-workflow.md`
  - `skills/hybrid-content-page-workflow/SKILL.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added `pnpm --filter frontend run hybrid:route:create -- ...` to scaffold a new hybrid route in the repo, generate a starter code-owned middle section component, register the slug in the hybrid registries, and hand off to the Sanity page seed flow.
  - The new bootstrap command is dry-run by default and includes anti-duplicate checks so it refuses to overwrite an existing route file or generated middle-section component.
  - Extended the hybrid CLI documentation to explain when to use `hybrid:create` versus `hybrid:route:create`.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reduces manual route-scaffolding work for new hybrid main pages while keeping Studio list indicators, CLI whitelist behavior, and Sanity seeding aligned.
- Verification:
  - `pnpm --filter frontend run hybrid:route:create -- --slug=demo-hybrid-route --preset=main-landing` passed as a dry run and reported the expected route file, component file, registry targets, and Sanity seed command.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Sanity Studio Hybrid Preset Action Added
- Changed files:
  - `studio/document-actions/apply-hybrid-preset-action.ts`
  - `studio/sanity.config.ts`
  - `docs/hybrid-page-cli-workflow.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a new Sanity Studio document action, `Apply Hybrid Preset`, for eligible `page` documents so editors can apply `main-landing` or `homepage` hybrid seeds directly from Studio without using the CLI.
  - The action only appears on known hybrid slugs, writes to the draft document instead of publishing immediately, and supports both `seed-missing` and `upsert` modes so editors can choose between safe fill-in behavior and deliberate overwrite.
  - Updated the hybrid workflow document to explain when to use the Studio action versus the CLI scaffolding commands.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reduces dependence on terminal access for hybrid page seeding while preserving the draft-review workflow and existing route/render contracts.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-03 - Hybrid Workflow Terminology Clarified and Smoke-Tested
- Changed files:
  - `frontend/scripts/create-hybrid-page.mjs`
  - `docs/hybrid-page-cli-workflow.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced the vague `eligible` wording with the clearer `supported hybrid slug` terminology, explicitly tying support to routes that already use `PageHybridShell` or are bootstrapped through the route generator.
  - Expanded the operational document with concrete smoke-test scenarios covering unsupported slugs, supported existing slugs, new slug dry-run, new slug write, duplicate-route protection, and cleanup behavior.
  - Ran an end-to-end temporary test slug (`hybrid-e2e-smoke`) through the bootstrap flow, verified the generated route and Sanity page, verified duplicate protection, and then cleaned the test slug back out of both the repo and the Sanity dataset.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: the hybrid rollout workflow is now both clearer for operators and validated against the main failure scenarios that matter in practice.
- Verification:
  - `pnpm --filter frontend run hybrid:create -- --slug=unsupported-hybrid-probe --preset=main-landing` failed as expected for an unsupported slug.
  - `pnpm --filter frontend run hybrid:create -- --slug=layanan --preset=main-landing` passed as a dry run for a supported existing slug.
  - `pnpm --filter frontend run hybrid:route:create -- --slug=hybrid-e2e-smoke --preset=main-landing` passed as a dry run.
  - `pnpm --filter frontend run hybrid:route:create -- --slug=hybrid-e2e-smoke --preset=main-landing --write` passed, including public-read verification for `page-hybrid-e2e-smoke`.
  - Re-running the same route bootstrap failed as expected due to duplicate protection.
  - Cleanup verification confirmed `hybrid-e2e-smoke` no longer exists in repo registries or public Sanity reads.
  - `pnpm --filter frontend run typecheck` passed after cleanup.
  - `pnpm --filter studio run typecheck` passed after cleanup.

## 2026-04-03 - Page to Post Conversion CLI Added
- Changed files:
  - `frontend/package.json`
  - `frontend/scripts/convert-page-to-post.mjs`
  - `docs/page-to-post-conversion-workflow.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a non-destructive CLI to convert a Sanity `page` document into a `post` document by copying and mapping title, slug, excerpt, meta, image, and body content into the blog schema.
  - The script prefers reusing `legacy-rich-content` blocks in `post.body`; if none exist, it falls back to hero and section-header text so root-page blog content can be moved into `/blog/[slug]` quickly without rewriting every block type first.
  - Added a dedicated workflow document that explains the mapping rules, dry-run/write behavior, `create` versus `upsert`, optional author/category refs, and the smoke-test pattern using a temporary post slug.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: provides a faster migration path for blog/article content that still lives in `page` documents, while keeping the source page untouched until redirect or cleanup decisions are made separately.
- Verification:
  - `pnpm --filter frontend run page:to-post -- --slug=test-page-hybrid` passed as a dry run and reported `bodySource: fallback-portable-text`.
  - `pnpm --filter frontend run page:to-post -- --slug=test-page-hybrid --post-slug=page-to-post-smoke --write` passed and created a publicly readable post for smoke testing.
  - Cleanup verification confirmed `page-to-post-smoke` was removed again and public-read returned `null`.
  - `pnpm --filter frontend run typecheck` passed after cleanup.

## 2026-04-03 - Sanity Studio Convert Page to Post Action Added
- Changed files:
  - `studio/document-actions/convert-page-to-post-action.ts`
  - `studio/sanity.config.ts`
  - `docs/page-to-post-conversion-workflow.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a new Sanity Studio document action, `Convert Page to Post`, so editors can bootstrap a `post` draft directly from a `page` document without using the CLI.
  - The action intentionally skips main hybrid landing pages, prompts for target slug and mode (`create` or `upsert`), reuses the same page-to-post mapping strategy as the CLI, and creates or updates a draft `post` while leaving the source `page` untouched.
  - Extended the page-to-post workflow document to explain when to use the Studio action versus the CLI workflow.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reduces dependence on terminal access for one-off blog migrations from `page` to `post` while preserving the safer non-destructive conversion pattern.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.
  - `pnpm --filter frontend run page:to-post -- --slug=test-page-hybrid` still passed after adding the Studio action.
  - `pnpm --filter frontend run page:to-post -- --slug=test-page-hybrid --post-slug=page-to-post-smoke --write` still passed.
  - Cleanup verification confirmed `page-to-post-smoke` was removed and public-read returned `null`.
  - `pnpm --filter frontend run typecheck` passed after cleanup.

## 2026-04-03 - Rewrite Theme Promoted and Legacy Duplicate Components Archived
- Changed files:
  - `frontend/components/blocks/hero/hero-1.tsx`
  - `frontend/components/blocks/hero/hero-2.tsx`
  - `frontend/components/blocks/section-header.tsx`
  - `frontend/components/blocks/grid/grid-card.tsx`
  - `frontend/components/blocks/grid/pricing-card.tsx`
  - `frontend/components/blocks/cta/cta-1.tsx`
  - `frontend/components/archive/legacy-rewrite-v0/README.md`
  - `frontend/components/archive/legacy-rewrite-v0/*`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Archived the unused pre-rewrite `frontend/components/legacy/*` family into `frontend/components/archive/legacy-rewrite-v0/` so the active source of truth is clearer and route code no longer competes with duplicate legacy shells.
  - Restyled the core Sanity block components used by generic page rendering (`hero-1`, `hero-2`, `section-header`, `grid-card`, `pricing-card`, and `cta-1`) to use the same rounded panel, spacing, and section-shell language that now defines the rewrite system.
  - Added an archive README that explicitly marks the archived legacy rewrite stack as historical reference only, not the active visual baseline.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: generic Sanity-rendered pages now read closer to the rewrite visual system, reducing the gap between `Blocks`-driven pages and rewrite/hybrid landing pages while lowering duplicate-component maintenance noise.
- Verification:
  - `pnpm --filter frontend run typecheck` passed after archiving the old legacy files and updating the active block theme.

## 2026-04-03 - Reusable Sanity UI Icon Picker Added
- Changed files:
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/components/icons/sanity-icon.tsx`
  - `frontend/package.json`
  - `frontend/sanity.types.ts`
  - `frontend/sanity/queries/navigation.ts`
  - `frontend/sanity/queries/shared/link.ts`
  - `studio/package.json`
  - `studio/sanity.config.ts`
  - `studio/schema-types.ts`
  - `studio/schema.json`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/blocks/shared/navigation-link-child.ts`
  - `studio/schemas/blocks/shared/ui-icon.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Integrated `sanity-plugin-icon-picker-v2` into Studio and added a reusable `ui-icon` schema alias restricted to Lucide and Simple Icons.
  - Added `uiIcon` fields to navigation links and submenu links while preserving the existing legacy `icon` string field for backward compatibility during migration.
  - Added a frontend `SanityIcon` renderer that prioritizes stored SVG from Studio, falls back to Lucide and Simple Icons by provider/name, and still supports legacy nav icon tokens.
  - Updated shared link and navigation GROQ contracts so CMS-driven navigation surfaces can consume the new icon object shape.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: Sanity Studio and frontend now share a reusable cross-surface icon contract for navigation items, enabling Lucide and Simple Icons without breaking existing legacy icon values.
- Verification:
  - `pnpm typegen` passed.
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Navigation More Menu and UI Icon Migration Completed
- Changed files:
  - `frontend/components/header/desktop-nav.tsx`
  - `frontend/components/header/mobile-nav.tsx`
  - `frontend/package.json`
  - `frontend/sanity.types.ts`
  - `frontend/scripts/migrate-navigation-ui-icons.mjs`
  - `studio/schema.json`
  - `studio/schemas/blocks/shared/link.ts`
  - `studio/schemas/documents/navigation.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added a dedicated `More` navigation lane for desktop overflow items so primary navbar width can stay constrained without forcing editors to misuse utility CTA slots.
  - Updated mobile navigation to render `More` items as their own section while preserving child-link accordions.
  - Added a Studio warning when more than 8 header-visible links remain in the primary navigation lane, guiding editors to move overflow into `More` or `Utility`.
  - Added and executed a dev-dataset migration script that converts legacy navigation icon tokens into `uiIcon` objects; current navigation document migrated 56 icon usages with zero unmapped values.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: navigation editing now has a clearer structure for overflow items, and CMS navigation icon data is standardized onto the new reusable `uiIcon` contract.
- Verification:
  - `pnpm --filter frontend run nav:icons:migrate` passed as dry run.
  - `pnpm --filter frontend run nav:icons:migrate -- --write` passed and updated the dev Sanity navigation document.
  - `pnpm typegen` passed.
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Hero and CTA Blocks Adopted Reusable UI Icons
- Changed files:
  - `frontend/components/blocks/cta/cta-1.tsx`
  - `frontend/components/blocks/cta/whatsapp-cta.tsx`
  - `frontend/components/blocks/hero/hero-1.tsx`
  - `frontend/components/blocks/hero/hero-2.tsx`
  - `frontend/sanity.types.ts`
  - `frontend/sanity/queries/cta/cta-1.ts`
  - `frontend/sanity/queries/cta/whatsapp-cta.ts`
  - `frontend/sanity/queries/hero/hero-1.ts`
  - `frontend/sanity/queries/hero/hero-2.ts`
  - `studio/schema.json`
  - `studio/schemas/blocks/cta/cta-1.ts`
  - `studio/schemas/blocks/cta/whatsapp-cta.ts`
  - `studio/schemas/blocks/hero/hero-1.ts`
  - `studio/schemas/blocks/hero/hero-2.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added reusable `uiIcon` fields to `hero-1`, `hero-2`, `cta-1`, and `whatsapp-cta` so editors can assign Lucide or Simple Icons at the block level.
  - Updated block GROQ queries and generated types so the new icon object is available to frontend renderers.
  - Updated Hero and CTA components to render icon-aware eyebrow/tagline rows and to show icon-aware CTA buttons using the shared `SanityIcon` renderer and existing link-level `uiIcon` data.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: Hero and CTA blocks now share the same icon contract as navigation, reducing one-off icon implementations across CMS-driven surfaces.
- Verification:
  - `pnpm typegen` passed.
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend run typecheck` passed.

## 2026-04-03 - Grid and Split Card Blocks Adopted Reusable UI Icons
- Changed files:
  - `frontend/components/blocks/grid/grid-card.tsx`
  - `frontend/components/blocks/grid/pricing-card.tsx`
  - `frontend/components/blocks/split/split-cards-item.tsx`
  - `frontend/components/blocks/split/split-info-item.tsx`
  - `frontend/sanity.types.ts`
  - `frontend/sanity/queries/grid/grid-card.ts`
  - `frontend/sanity/queries/grid/pricing-card.ts`
  - `frontend/sanity/queries/split/split-cards-list.ts`
  - `frontend/sanity/queries/split/split-info-list.ts`
  - `studio/schemas/blocks/grid/grid-card.ts`
  - `studio/schemas/blocks/grid/pricing-card.ts`
  - `studio/schemas/blocks/split/split-card.ts`
  - `studio/schemas/blocks/split/split-info.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Added `uiIcon` fields to `grid-card`, `pricing-card`, `split-card`, and `split-info` content models so editors can assign Lucide or Simple Icons to card/list blocks.
  - Updated nested grid and split GROQ queries so card/list item unions carry the new icon object into generated frontend types.
  - Updated grid and split renderers to display icons in card headings and CTA labels, with `split-info` using the icon as a fallback badge when no image is present.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: reusable icon support now spans navigation, hero, CTA, and core card/list page-builder blocks under one Sanity/frontend contract.
- Verification:
  - `pnpm typegen` passed.
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter frontend exec next typegen` passed.
  - `pnpm --filter frontend run typecheck` is currently blocked by an existing `.next/types/**/*.ts` route-type mismatch in `frontend/tsconfig.json`; the latest failure is not from the new `uiIcon` fields, which are present in regenerated `frontend/sanity.types.ts`.

## 2026-04-03 - Home Prepare Hybrid Route Scaffolded
- Changed files:
  - `frontend/app/(main)/home-pepar/page.tsx`
  - `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`
  - `frontend/scripts/lib/hybrid-page-presets.mjs`
  - `studio/schemas/documents/page.ts`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Scaffolded a new hybrid preview route at `/home-pepar` so the team can prepare the next homepage iteration without disturbing the live `/` contract.
  - Registered `home-pepar` as a supported hybrid slug in both the frontend scaffold registry and the Studio page preview registry.
  - Seeded a public Sanity `page` document (`page-home-pepar`) with the `homepage` preset and `topBlockCount: 2`, so the route already has top/bottom CMS zones plus a generated code-owned middle section.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: adds a separate hybrid homepage preparation route that uses the same page-shell and Sanity split contract as the main hybrid landing pages, making it safer to iterate on homepage migration before changing `/`.
- Verification:
  - `pnpm --filter frontend run hybrid:route:create -- --slug=home-pepar --preset=homepage --title='Home Prepare' --write` passed.
  - Seed verification confirmed public-read for `page-home-pepar` with `slug: home-pepar`, `blockCount: 3`, and `topBlockCount: 2`.
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter studio run typecheck` passed.

## 2026-04-03 - Home Prepare Candidate Content Expanded
- Changed files:
  - `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`
  - `frontend/lib/local-content/home-prepare.ts`
  - `frontend/components/archive/README.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Replaced the generated placeholder middle section for `/home-pepar` with a fuller homepage candidate that mirrors the live `kotacom.id` structure more closely: one-stop positioning, tech-stack trust strip, four core service lanes, a refined why-Kotacom block, and three commercial service clusters.
  - Moved the candidate homepage copy into a dedicated local content module so the route can evolve without turning the generated component into a hard-to-maintain blob.
  - Added a top-level archive README so archived components are explicitly documented as historical references rather than active UI sources.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: `/home-pepar` is now a materially more realistic hybrid rehearsal surface for the eventual homepage migration, and the archive folder now has explicit guardrails that reinforce the rewrite/hybrid stack as the active theme source.
- Verification:
  - `pnpm --filter frontend run build` passed and included static route generation for `/home-pepar`.
  - `pnpm --filter frontend run typecheck` passed after `.next/types` was regenerated by build.
  - `rg -n "components/archive|components/legacy" frontend -g '!**/.next/**'` returned no active imports outside the archive itself.

## 2026-04-03 - Home Prepare Hybrid Candidate Polished with Final Sanity Split
- Changed files:
  - `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`
  - `frontend/lib/local-content/home-prepare.ts`
  - `frontend/scripts/lib/hybrid-page-presets.mjs`
  - `frontend/components/blocks/split/split-cards-list.tsx`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Refined `/home-pepar` again so the code-owned middle section no longer repeats the same proposition as the top CMS hero, and instead focuses on service architecture, trust stack, lane breakdown, and final readiness framing.
  - Fixed the hybrid preset link helper so internal links default to `isExternal: false` while absolute URLs remain external, aligning the generator with the Sanity link contract already documented elsewhere in the repo.
  - Fixed a latent `split-cards-list` typing issue that blocked full production builds during the homepage candidate verification pass.
  - Updated the live `home-pepar` Sanity document so the split is now `topBlockCount: 1`, leaving only the CMS hero above the code-owned shell and moving proof + CTA below; also set preview metadata with `noindex: true` for safer pre-live iteration.
- SEO/integration impact:
  - Direct SEO impact: `/home-pepar` now resolves with preview metadata and `noindex, nofollow`, which is safer for a rehearsal route that is not yet intended as the canonical homepage.
  - Integration impact: the hybrid generator now produces link objects that respect internal/external behavior automatically, and the homepage candidate flow is more realistic because the top/bottom CMS zones no longer compete with the code-owned middle section.
- Verification:
  - `pnpm --filter frontend run build` passed after clearing `.next` and rebuilding from scratch.
  - `pnpm --filter frontend run typecheck` passed after the clean rebuild regenerated `.next/types`.
  - `pnpm --filter studio run typecheck` passed.
  - `curl -I http://127.0.0.1:3200/home-pepar` returned `200 OK` on the rebuilt local runtime.
  - `curl http://127.0.0.1:3200/home-pepar` confirmed the new hero copy, final readiness copy, and `noindex, nofollow` robots output.
  - Full-page desktop screenshot captured from the rebuilt local runtime: `home-pepar-desktop-final.png`.

## 2026-04-03 - GitHub Actions Node 24 Opt-In Added
- Changed files:
  - `.github/workflows/ci.yml`
  - `.github/workflows/deploy-studio.yml`
  - `.github/workflows/validate.yml`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Added `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` at the workflow level for CI, Studio deploy, and template validation so the repository no longer relies on deprecated Node 20 execution for JavaScript-based GitHub Actions.
  - This keeps the existing workflow logic intact while removing the platform deprecation warning that was polluting recent runs on `main`.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: cleaner and more future-proof CI/CD behavior for the frontend/studio workflow stack that now carries the hybrid homepage rollout and Studio schema changes.
- Verification:
  - Workflow files updated without changing build/install command paths.
  - Follow-up push is required to trigger fresh Actions runs under the new workflow environment settings.

## 2026-04-03 - GitHub Actions Core Action Versions Updated
- Changed files:
  - `.github/workflows/ci.yml`
  - `.github/workflows/deploy-studio.yml`
  - `.github/workflows/validate.yml`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Upgraded `actions/checkout` from `v4` to `v6` across CI, Studio deploy, and template validation workflows.
  - Upgraded `actions/setup-node` from `v4` to `v6` in CI and Studio deploy workflows.
  - Upgraded `dorny/paths-filter` from `v3` to `v4` in CI change detection.
  - This reduces GitHub Actions runtime deprecation noise further after the initial Node 24 opt-in pass.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: cleaner CI/CD baseline for the frontend/studio stack and lower operational noise while hybrid homepage and Studio schema work continues.
- Verification:
  - Workflow references updated consistently across all three active workflow files.
  - A fresh push is required to confirm whether any remaining warnings are only from third-party vendor actions that have not yet published Node 24-native releases.

## 2026-04-03 - Studio Document Actions Hardened for Task UI
- Changed files:
  - `studio/document-actions/apply-hybrid-preset-action.ts`
  - `studio/document-actions/convert-page-to-post-action.ts`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Removed `useClient()` from the custom page document actions and switched both actions to `context.getClient(...)` from the Sanity document action props.
  - This avoids relying on a React hook context that is not guaranteed inside newer Studio surfaces such as Task creation and related document panels.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: Studio page actions are now less coupled to editor-only React context, reducing the chance that hybrid/page-to-post tooling crashes unrelated Studio workflows.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` completed without reporting an action-level type or bundle error during the refactor pass.

## 2026-04-03 - Page Custom Actions Disabled in Studio
- Changed files:
  - `studio/sanity.config.ts`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Removed the `page`-specific custom document actions (`Apply Hybrid Preset` and `Convert Page to Post`) from the active Studio action registry.
  - This is a temporary rollback to restore Studio stability while the action API mismatch affecting Task creation is debugged separately.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: editors temporarily lose the two `page` action buttons in Studio, but normal page editing/publishing remains available and Task creation should no longer execute those custom actions.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed after the rollback.

## 2026-04-03 - Sanity Studio Core Upgraded for Task Stability
- Changed files:
  - `studio/package.json`
  - `pnpm-lock.yaml`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Upgraded the Studio core packages from `sanity@5.17.1` / `@sanity/vision@5.17.1` / `@sanity/types@5.17.1` to `5.19.0`.
  - This follows the Task UI crash continuing after the `page` custom actions were removed, indicating the remaining fault is likely inside the Studio core/runtime rather than our action registry.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: newer Studio runtime and bundled Sanity internals for hosted Studio, intended to resolve the `useDocumentDivergences` Task error path while keeping the existing schema and editing model intact.
- Verification:
  - `pnpm --filter studio run typecheck` passed after the upgrade.
  - `pnpm --filter studio run build` passed after the upgrade.

## 2026-04-04 - Page Studio Actions Re-enabled After Core Upgrade
- Changed files:
  - `studio/sanity.config.ts`
  - `studio/document-actions/apply-hybrid-preset-action.ts`
  - `studio/document-actions/convert-page-to-post-action.ts`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Re-enabled the `page` custom Studio actions (`Apply Hybrid Preset` and `Convert Page to Post`) after the Studio core upgrade to `5.19.0`.
  - Restored the action implementation to the standard `useClient()` approach now that the underlying Task/document runtime issue appears resolved.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: the page-level hybrid/content migration tooling is available in Studio again without keeping the earlier temporary registry rollback.
- Verification:
  - `pnpm --filter studio run typecheck` passed.
  - `pnpm --filter studio run build` passed.

## 2026-04-04 - Historical Docs Archived
- Changed files:
  - `docs/archive/README.md`
  - `docs/archive/2026-04-historical-plans/astro-next-route-contract.md`
  - `docs/archive/2026-04-historical-plans/astro-to-next-migration-plan.md`
  - `docs/archive/2026-04-historical-plans/rewrite-content-progress.md`
  - `docs/archive/2026-04-historical-plans/rewrite-worker-orchestration.md`
  - `docs/archive/2026-04-worker-prompts/worker-1-ui-shell.md`
  - `docs/archive/2026-04-worker-prompts/worker-2-cms-contract.md`
  - `docs/archive/2026-04-worker-prompts/worker-3-rewrite-pages.md`
  - `docs/astro-migration-megaplan.md`
  - `docs/seo-updates.md`
- Summary:
  - Archived one-off migration planning docs, rewrite orchestration notes, and worker prompt files that were no longer referenced by active repo workflows.
  - Added `docs/archive/README.md` to distinguish active operational docs from historical planning artifacts.
  - Updated the migration megaplan to point at the archived paths for historical references that are still worth retaining.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: lower documentation noise and clearer separation between active workflow docs and historical migration notes.
- Verification:
  - Manual audit of `docs/` completed.
  - Active references in `docs/astro-migration-megaplan.md` updated to the new archive paths.

## 2026-04-04 - Rewrite Service Focus and Pricing Cards Polished
- Changed files:
  - `frontend/components/global-whatsapp-button.tsx`
  - `frontend/components/ui/rewrite/landing-sections/index.tsx`
  - `frontend/components/ui/rewrite/landing-sections/service-types-section.tsx`
  - `frontend/components/ui/rewrite/landing-sections/pricing-plans-section.tsx`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Added stronger hover motion and image/link lift behavior to the rewrite `Service Focus` lane cards.
  - Added per-plan WhatsApp CTA buttons to rewrite pricing cards using the global WhatsApp settings, while overriding the predefined message so each click references the selected pricing plan and current service page.
  - Gave the recommended pricing card a more prominent visual treatment with a brighter surface, stronger ring/shadow treatment, and a clearer recommended badge.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: pricing conversion CTAs now inherit the global WhatsApp configuration path while sending more contextual lead messages tied to the selected package.
- Verification:
  - `pnpm --filter frontend run typecheck` passed.
  - `pnpm --filter frontend run build` passed.

## 2026-04-04 - Home Pepar Rewritten Toward Live Messaging
- Changed files:
  - `frontend/app/(main)/home-pepar/page.tsx`
  - `frontend/components/hybrid/generated/home-pepar-middle-section.tsx`
  - `frontend/lib/local-content/home-prepare.ts`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Removed internal, prototype-facing language from `/home-pepar`, including hybrid implementation explanations and “prepare/readiness” phrasing.
  - Repositioned the route as a customer-facing homepage candidate with clearer service framing, stronger workflow messaging, and consultation-oriented CTA copy.
  - Updated fallback metadata so the route also reads like a production landing page when Sanity page data is unavailable.
- SEO/integration impact:
  - Improves message quality, topical clarity, and perceived relevance for the staged homepage candidate.
  - No schema/query contract change; this is a frontend copy and metadata wording refinement only.
- Verification:
  - `pnpm --filter frontend run build` passed.
  - `pnpm --filter frontend run typecheck` passed after build regenerated `.next/types`.

## 2026-04-04 - Restore Missing Printing Helper Import
- Changed files:
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-company-profile.ts`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Restored the missing `buildGenericCopy` import in the printing company profile page module.
  - This fixes the frontend production build failure that appeared in Vercel when `buildGenericCopy(page)` was referenced without a matching import.
- SEO/integration impact:
  - No direct SEO impact.
  - Integration impact: restores successful frontend build/deploy for the legacy printing rewrite stack.
- Verification:
  - `pnpm --filter frontend run build` passed after restoring the import.

## 2026-04-04 - Deepen Percetakan Money-Page Copy
- Changed files:
  - `frontend/lib/legacy-pages/content/printing.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/percetakan-index.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-buku.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-company-profile.ts`
  - `frontend/lib/legacy-pages/content/printing-pages/cetak-brosur.ts`
  - `docs/seo-updates.md`
  - `docs/astro-migration-megaplan.md`
- Summary:
  - Strengthened the shared `percetakan` fallback copy with clearer Surabaya intent, safer print-process wording, and a stronger consultation FAQ.
  - Rewrote `/percetakan` to better cover business print demand across books, company profiles, brochures, banners, and promo materials while replacing weaker proof and guide copy with more relevant internal journeys.
  - Expanded `/percetakan/cetak-buku`, `/percetakan/cetak-company-profile`, and `/percetakan/cetak-brosur` with sharper commercial keywords, richer highlights/process/FAQ sections, and more specific CTA link sets tied to the actual print decision being made.
- SEO/integration impact:
  - Improves topical specificity and commercial relevance for high-intent printing pages.
  - No schema/query contract change; this is a local content refinement pass only.
- Verification:
  - Local TypeScript transpile check for the edited printing content modules passed.

## 2026-04-04 - Implement SEO Parity Fixes (llms.txt, hreflang, JSON-LD)
- Changed files:
  - `frontend/sanity/lib/metadata.ts`
  - `frontend/app/layout.tsx`
  - `frontend/public/llms.txt`
  - `frontend/public/llms-full.txt`
  - `FULL-AUDIT-REPORT.md`
  - `ACTION-PLAN.md`
- Summary:
  - Generated full SEO audit using Agentic-SEO-Skill for live site and dev site.
  - Added `llms.txt` and `llms-full.txt` for AI crawler optimization (GEO).
  - Added `id-ID` hreflang tag to global metadata configuration.
  - Added `LocalBusiness` JSON-LD schema to the root layout to restore rich snippets.
- SEO impact:
  - Direct SEO impact: Restores Answer Engine Optimization (AEO) readiness, enables local business rich snippets, and corrects regional indexing via hreflang.
- Verification:
  - Checked layout.tsx and metadata.ts structure.
  - Next.js build verification pending.


## 2026-04-04 - Sanity Content Mismatch Fix for Kotacom Migration
- Changed files:
  - Sanity Studio Database (`seoSettings` & `page` with slug `index`) via API script
- Summary:
  - Executed a mutation script to override the default "Next.js Sanity CMS Starter" placeholder text.
  - Set `seoSettings.defaultTitle` to "kotacom.id - IT Service & Publications Terpercaya".
  - Set `seoSettings.defaultDescription` to the live site's commercial IT & printing description.
  - Updated `page` (index) title and metadata to match the live site intent ("Solusi IT & Digital Terpadu").
- SEO impact:
  - Direct SEO impact: Critical fix to ensure the Next.js target site does not index for starter template developer terms. Aligns the dev environment's primary SERP snippet with the live site.
- Verification:
  - Mutation completed successfully and verified via script logs.


## 2026-04-04 - Update Sanity Content Mismatch to KOTACOM
- Changed files:
  - Sanity Studio Database (`seoSettings` & `page` with slug `index`) via API script
- Summary:
  - Updated `seoSettings.defaultTitle` and `page` (index) `meta.title` from "kotacom.id - IT Service..." to "KOTACOM - IT Service...".
- SEO impact:
  - Direct SEO impact: Ensures branding in metadata uses KOTACOM instead of the domain name.
- Verification:
  - Mutation completed successfully and verified via script logs.


## 2026-04-04 - Rename Publications to Percetakan and update to www URL
- Changed files:
  - `frontend/public/llms.txt`
  - `frontend/public/llms-full.txt`
  - `frontend/app/layout.tsx`
  - `frontend/sanity/lib/metadata.ts`
  - Sanity Studio Database (`seoSettings` & `page` with slug `index`) via API script
- Summary:
  - Replaced "Publications" with "Percetakan" across llms text files, layout JSON-LD schema, and Sanity SEO/Page metadata settings.
  - Updated website URL from `https://kotacom.id` to `https://www.kotacom.id` across llms text files, layout JSON-LD schema, and hreflang tag in metadata.
- SEO impact:
  - Direct SEO impact: Consistent branding emphasizing "Percetakan" and aligning canonical / primary target URL to the www subdomain.
- Verification:
  - Frontend build passed. Script logs verified Sanity document patches.


## 2026-04-04 - Maximize Global JSON-LD Schema
- Changed files:
  - `frontend/app/layout.tsx`
- Summary:
  - Upgraded basic `LocalBusiness` JSON-LD schema to a comprehensive local schema.
  - Added `@type` array (["LocalBusiness", "ProfessionalService"]).
  - Included `priceRange`, complete `address` (with street), `areaServed` (Surabaya, Indonesia), and `contactPoint`.
  - Added `openingHoursSpecification`.
  - Integrated social profiles via `sameAs`.
  - Added `aggregateRating` and `hasOfferCatalog` outlining the main services (IT, Web Dev, Printing).
- SEO impact:
  - Direct SEO impact: Drastically improves rich snippet eligibility, Local SEO relevance (Maps, Knowledge Graph), and Answer Engine Optimization (AEO) context by explicitly declaring operating hours, contact info, ratings, and service catalog.
- Verification:
  - Verified JSON syntax inside layout.


## 2026-04-04 - Update Business Addresses and Locations
- Changed files:
  - `frontend/app/layout.tsx`
  - Sanity Studio Database (`seoSettings` & `page` with slug `index`) via API script
- Summary:
  - Updated JSON-LD schema to reflect dual locations: Graha Indraprasta Tulangan (Sidoarjo) and Jl. Tenggilis Mulya (Surabaya).
  - Broadened `areaServed` to explicitly include both Sidoarjo and Surabaya.
  - Refined SEO metadata descriptions in Sanity to highlight local service availability in Sidoarjo & Surabaya.
- SEO impact:
  - Direct SEO impact: Enhances local search visibility for both Sidoarjo and Surabaya regions. Strengthens Knowledge Graph by providing accurate, multi-location physical addresses.
- Verification:
  - Verified JSON-LD structure and script-based content updates.

