# Sanity Content Ops Manual

Tanggal: 2026-04-06

## Cakupan
Manual ini untuk workflow pembuatan konten:
- Post
- Product
- Service
- Project
- Page localisation (`pageLocation`)
- Service localisation (`serviceLocation`)

## SOP Operasional
1. Generate payload per tipe dokumen.
2. Validasi payload (guardrails `_id`, `_key`, `isExternal`).
3. Upsert dry-run.
4. Upsert write bila lolos validasi.

## Perintah Inti
```bash
node frontend/scripts/ops-generate-content-payload.mjs --type post --title "Contoh"
node frontend/scripts/ops-validate-sanity-payload.mjs --input tmp/post-contoh.json
node frontend/scripts/ops-upsert-sanity-content.mjs --input tmp/post-contoh.json
node frontend/scripts/ops-upsert-sanity-content.mjs --input tmp/post-contoh.json --write
```

## Skill Package
- `skills/sanity-content-ops/SKILL.md`
- `skills/sanity-content-ops/skill.zip`

## Integrasi Monorepo

- Root command: `pnpm run skill:content:generate|validate|upsert`
- Frontend command: `pnpm --filter frontend run skill:content:generate|validate|upsert`
- Cross-app validation command (studio/dashboard): `pnpm --filter studio run skill:content:validate` dan `pnpm --filter seo-dashboard run skill:content:validate`
