# Repo Frontend + Sanity Operations Manual

Tanggal: 2026-04-06
Status: Aktif (workflow harian)

## Tujuan
Dokumen ini menjadi panduan operasional harian (bukan dokumen migrasi) untuk pekerjaan berulang di repo ini: validasi contract schema-query-renderer, validasi payload Sanity, sinkronisasi dokumentasi, dan packaging skill.

## Use Case Matrix (Dokumentasi / Skill / Script)

| Use case berulang | Klasifikasi | Alasan |
|---|---|---|
| Audit mismatch block Studio vs GROQ vs renderer | Skill + Script | Berulang, teknis, perlu output terstandar |
| Validasi payload sebelum write ke Sanity | Skill + Script | Berulang, berisiko tinggi jika salah payload |
| Menyusun ringkasan workflow harian | Dokumentasi + Skill | Butuh SOP + eksekusi terarah |
| Build paket skill siap distribusi (`skill.zip`) | Skill + Script | Operasional berulang untuk agent onboarding |
| Penentuan prioritas perubahan bisnis/produk | Dokumentasi saja | Kontekstual, tidak cocok di-hardcode script |

## Workflow Harian (Singkat)

1. Jalankan audit contract:
   - `node frontend/scripts/ops-check-block-contract.mjs`
2. Validasi payload yang akan ditulis ke Sanity:
   - `node frontend/scripts/ops-validate-sanity-payload.mjs --input <file.json>`
3. Jalankan skill packaging validator:
   - `node scripts/build-repo-daily-ops-skill-zip.mjs`
4. Simpan artefak distribusi:
   - `skills/repo-daily-ops/skill.zip`

## Guardrails Operasional

- Untuk public docs, `_id` tidak boleh mengandung titik.
- Semua item array harus punya `_key`.
- Semua objek `link` harus memiliki `isExternal` eksplisit.
- Contract blok harus sinkron pada 3 layer:
  1. `studio/schemas/blocks/shared/page-blocks.ts`
  2. `frontend/sanity/queries/shared/blocks.ts`
  3. `frontend/components/blocks/index.tsx`

## Referensi Cepat

- Skill utama: `skills/repo-daily-ops/SKILL.md`
- Agent metadata: `skills/repo-daily-ops/agents/repo-daily-ops-agent.md`
- References matrix: `skills/repo-daily-ops/references/use-case-matrix.md`
- Script list: `skills/repo-daily-ops/references/scripts.md`

## Integrasi Monorepo

Skill command sudah diintegrasikan di root + app boundaries:

- Root: `pnpm run skill:verify:integration`, `pnpm run skill:zip:all`
- Frontend: `pnpm --filter frontend run skill:ops:contract`
- Studio: `pnpm --filter studio run skill:ops:contract`
- Dashboard: `pnpm --filter seo-dashboard run skill:ops:contract`
