---
name: repo-daily-ops
description: "Workflow harian operasional untuk repo Next.js + Sanity: audit contract block, validasi payload Sanity, sinkronisasi dokumentasi operasional, dan packaging skill.zip terverifikasi."
user-invokable: true
argument-hint: "[task] [options]"
version: "1.0.0"
---

# Repo Daily Ops Skill

## Tujuan
Menjalankan workflow harian yang berulang secara aman dan auditable:
1. cek parity schema-query-renderer,
2. validasi payload sebelum write ke Sanity,
3. build paket skill siap pakai (`skill.zip`).

## Trigger Penggunaan
Gunakan skill ini saat user meminta:
- audit kontrak block,
- validasi payload import/update Sanity,
- menyiapkan paket skill operasional,
- memastikan SOP harian berjalan konsisten.

## Input
- `task`: salah satu dari `contract-audit`, `payload-validate`, `build-skill-zip`, `daily-run`.
- Opsional:
  - `--input <json>` untuk payload validation.
  - `--write` untuk menulis autofix payload.
  - `--output <file>` untuk lokasi output.

## Output
- Laporan JSON/console per task.
- Exit code non-zero untuk kegagalan validasi.
- Artefak `skills/repo-daily-ops/skill.zip` untuk distribusi skill.

## Guardrails
- Jangan write payload tanpa validasi.
- Jangan izinkan public `_id` dengan titik.
- Jangan izinkan object `link` tanpa `isExternal`.
- Jangan deploy skill.zip jika file wajib skill belum lengkap.

## Dependencies
- Node.js runtime.
- Repo files:
  - `studio/schemas/blocks/shared/page-blocks.ts`
  - `frontend/sanity/queries/shared/blocks.ts`
  - `frontend/components/blocks/index.tsx`
- Scripts:
  - `frontend/scripts/ops-check-block-contract.mjs`
  - `frontend/scripts/ops-validate-sanity-payload.mjs`
  - `scripts/build-repo-daily-ops-skill-zip.mjs`

## Langkah Kerja

### A) contract-audit
1. Jalankan:
   - `node frontend/scripts/ops-check-block-contract.mjs`
2. Tinjau mismatch jika ada.
3. Sinkronkan layer schema/query/renderer.

### B) payload-validate
1. Jalankan dry-run:
   - `node frontend/scripts/ops-validate-sanity-payload.mjs --input <file.json>`
2. Jika perlu autofix:
   - `node frontend/scripts/ops-validate-sanity-payload.mjs --input <file.json> --write`

### C) build-skill-zip
1. Build + validasi paket:
   - `node scripts/build-repo-daily-ops-skill-zip.mjs`
2. Pastikan artefak tersedia di `skills/repo-daily-ops/skill.zip`.

### D) daily-run
Jalankan urutan A -> B -> C.

## References yang Dibutuhkan
- `references/use-case-matrix.md`
- `references/scripts.md`
- `references/daily-checklist.md`

## Scripts yang Dibutuhkan
- `frontend/scripts/ops-check-block-contract.mjs`
- `frontend/scripts/ops-validate-sanity-payload.mjs`
- `scripts/build-repo-daily-ops-skill-zip.mjs`

## Contoh Prompt Pemakaian
- "Jalankan repo-daily-ops untuk contract audit block."
- "Validasi payload ini sebelum upload ke Sanity, lalu autofix kalau aman."
- "Build skill.zip final dan validasi isi paketnya."
