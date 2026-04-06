---
name: sanity-content-ops
description: "Skill operasional untuk membuat semua jenis konten utama (post, product, service, project) dan localisation docs (pageLocation, serviceLocation), termasuk generate payload, validasi, dan upsert Sanity dengan dry-run default."
user-invokable: true
argument-hint: "[generate|validate|upsert] [options]"
version: "1.0.0"
---

# Sanity Content Ops Skill

## Tujuan
Menyediakan workflow harian siap pakai untuk membuat dan mengelola:
- `post`
- `product`
- `service`
- `project`
- `pageLocation`
- `serviceLocation`

## Trigger penggunaan
Gunakan saat user meminta:
- buat konten baru untuk salah satu tipe di atas,
- generate payload dari brief,
- validasi payload sebelum import/update,
- upsert ke Sanity dengan mode aman.

## Input
- Aksi: `generate`, `validate`, `upsert`
- Parameter inti:
  - `--type <post|product|service|project|pageLocation|serviceLocation>`
  - `--title <text>`
  - `--slug <slug>` (opsional, auto dari title)
  - `--route </path>` (wajib untuk localisation docs)
  - `--input <file.json>` untuk validate/upsert
  - `--write` untuk mode write ke Sanity

## Output
- File payload JSON siap edit/import.
- Laporan validasi (pass/fail).
- Laporan dry-run atau write result.

## Guardrails
- Default mode upsert adalah dry-run.
- Write mode hanya berjalan jika env token tersedia (`SANITY_DEV` -> `SANITY_AUTH_TOKEN`).
- `_id` publik tidak boleh mengandung titik.
- `pageLocation/serviceLocation` wajib route yang dimulai `/`.

## Dependencies
- Script:
  - `frontend/scripts/ops-generate-content-payload.mjs`
  - `frontend/scripts/ops-upsert-sanity-content.mjs`
  - `frontend/scripts/ops-validate-sanity-payload.mjs`
- Dokumen:
  - `docs/repo-frontend-sanity-operations-manual.md`
  - `docs/sanity-seed-guardrails.md`

## Langkah kerja

### 1) Generate payload
```bash
node frontend/scripts/ops-generate-content-payload.mjs --type post --title "Judul Post" --output tmp/post.json
```

### 2) Validate payload
```bash
node frontend/scripts/ops-validate-sanity-payload.mjs --input tmp/post.json
```

### 3) Upsert dry-run
```bash
node frontend/scripts/ops-upsert-sanity-content.mjs --input tmp/post.json
```

### 4) Upsert write
```bash
node frontend/scripts/ops-upsert-sanity-content.mjs --input tmp/post.json --write
```

## References
- `references/content-types.md`
- `references/workflow.md`
- `references/commands.md`

## Scripts
- `scripts/generate.sh`
- `scripts/validate.sh`
- `scripts/upsert.sh`
- `scripts/build-skill-zip.sh`

## Contoh prompt
- "Buat payload product baru dari brief ini lalu validasi."
- "Siapkan serviceLocation untuk route `/software/surabaya` dan jalankan dry-run upsert."
- "Generate post, validate, lalu upsert ke Sanity pakai token dev."
