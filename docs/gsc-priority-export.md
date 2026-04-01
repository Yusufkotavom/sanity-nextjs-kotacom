# Batch Export GSC + Migration Curation

Script ini membantu kurasi URL migrasi berbasis data Google Search Console, termasuk rekomendasi mapping redirect.

## Lokasi Script

- `frontend/scripts/export-gsc-priority.mjs`

## Kebutuhan

1. Buat service account di Google Cloud.
2. Aktifkan Search Console API pada project tersebut.
3. Tambahkan email service account sebagai user pada properti Search Console (minimal read).
4. Simpan file JSON key service account.

## Menjalankan

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/abs/path/service-account.json
pnpm --filter frontend gsc:export -- \
  --site-url https://www.kotacom.id/ \
  --start-date 2025-01-01 \
  --end-date 2026-04-01 \
  --out-dir ./tmp/gsc-kotacom \
  --blog-base /blog \
  --category-base /blog/category \
  --min-impressions-auto 1 \
  --sitemap-url https://kotacom.id/sitemap-0.xml
```

Catatan:
- Untuk domain property gunakan format `sc-domain:kotacom.id`.
- `--sitemap-url` opsional untuk menambahkan URL tanpa traffic GSC ke hasil kurasi.

## Output

- `gsc-pages.csv`
- `gsc-queries.csv`
- `gsc-page-query.csv`
- `gsc-page-country.csv`
- `gsc-page-device.csv`
- `gsc-pages-priority.csv`
- `gsc-migration-curation.csv`
- `gsc-redirect-auto-import.csv`
- `gsc-summary.json`

## Kolom Penting

### `gsc-pages-priority.csv`
- `priorityScore`
- `seoPriorityAction`:
  - `migrate_now`
  - `improve_then_migrate`
  - `keep_archive_redirect`

### `gsc-migration-curation.csv`
- `legacyType`
- `migrationAction` (`keep_path` / `redirect_auto` / `review_manual`)
- `suggestedTargetPath`
- `mappingConfidence`

### `gsc-redirect-auto-import.csv`
- `source`
- `destination`
- `permanent`
- `isEnabled`
- disiapkan untuk import batch redirect setelah review.

## Tujuan Praktis

- Prioritaskan URL bernilai tinggi berdasarkan data nyata (click/impression/position).
- Pisahkan URL yang bisa auto-redirect vs yang wajib review manual.
- Percepat migrasi skala besar tanpa kehilangan trafik organik utama.
