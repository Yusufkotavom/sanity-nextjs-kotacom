# SEO Dashboard Setup (Dashboard-First, Minimal ENV)

Dokumen ini menjelaskan setup lengkap SEO dashboard agar konfigurasi utama dikelola dari UI dashboard, bukan dari banyak `SEO_*` env.

## 1) Tujuan

- Mengurangi jumlah env SEO yang wajib.
- Menyimpan secret operasional (Google JSON, IndexNow key) lewat dashboard.
- Tetap aman: secret disimpan terenkripsi di dokumen Sanity `seoOpsSettings`.

## 2) ENV minimal yang tetap wajib

Di `frontend/.env`:

```env
SEO_SESSION_SECRET=replace-with-strong-session-secret
SANITY_AUTH_TOKEN=replace-with-sanity-write-token
# Recommended:
SEO_SETTINGS_ENCRYPTION_KEY=replace-with-32+chars-secret
```

Catatan:
- `SEO_SESSION_SECRET` dipakai untuk session login dashboard.
- `SANITY_AUTH_TOKEN` dipakai backend untuk simpan setting ke Sanity.
- `SEO_SETTINGS_ENCRYPTION_KEY` dipakai enkripsi/dekripsi secret. Jika kosong, fallback ke `SEO_SESSION_SECRET`.

## 3) Login dashboard pertama kali

Karena password dashboard sekarang disimpan di Sanity hash, lakukan bootstrap awal salah satu cara:

1. Cara A (disarankan):
- Isi sementara env berikut:
  - `SEO_DASHBOARD_PASSWORD=temporary-password`
- Login ke `/dashboard/seo/login`.
- Buka `/dashboard/seo/settings`.
- Isi field `New dashboard password`.
- Klik `Save SEO Ops Settings`.
- Setelah tersimpan, env password bisa dihapus.

2. Cara B:
- Di Sanity Studio, buka dokumen `SEO Ops Settings`.
- Isi `dashboardPasswordHash` dengan hash SHA256 (64 hex).

## 4) Setup Google Indexing API dari dashboard

Di `/dashboard/seo/settings`:

1. Centang `Google Indexing enabled`.
2. (Opsional) centang `Google aggressive mode`.
3. Paste isi full Service Account JSON ke field Google JSON.
4. Save.

Syarat Google API di sisi Google Cloud:
- Project Google Cloud aktif.
- API `Indexing API` enabled.
- Service account dibuat.
- URL/domain yang ingin di-submit sudah diverifikasi di Search Console dan service account punya akses owner/delegated yang sesuai.

## 5) Setup IndexNow dari dashboard

Di `/dashboard/seo/settings`:

1. Centang `IndexNow enabled`.
2. Isi `IndexNow host` (contoh `www.kotacom.id`).
3. Isi `IndexNow endpoint` (default sudah benar).
4. Isi `IndexNow key`.
5. (Opsional) isi `IndexNow key location`.
6. Save.

Jika `key location` kosong, sistem auto-generate: `https://<host>/<key>.txt`.

## 6) Field operasional yang bisa dikelola tanpa code

Di dashboard settings:
- `Auto submit on revalidate`
- `Max batch size`
- `Retry attempts`
- `Notes`

Semua ini tersimpan ke dokumen singleton `seoOpsSettings`.

## 7) Cara verifikasi cepat

1. Buka `/dashboard/seo`:
- Cek `Google API` status.
- Cek `IndexNow` status.

2. Buka `/dashboard/seo/settings`:
- Cek `Configuration Source`.
- Harus terlihat source dari `studio` setelah Anda save secret dari dashboard.

3. Buka `/dashboard/seo/indexing`:
- Submit 1 URL test.
- Pastikan job muncul dan status task berubah (`queued` -> `processing` -> `success/failed`).

## 8) Fallback legacy (opsional)

Jika setting Studio kosong, sistem masih bisa fallback ke env lama:
- `SEO_GOOGLE_*`
- `SEO_INDEXNOW_*`
- `SEO_DASHBOARD_PASSWORD` / `SEO_DASHBOARD_PASSWORD_SHA256`
- `SEO_INDEXING_*`

Direkomendasikan hanya dipakai sementara saat transisi.

## 9) Troubleshooting

1. `Save settings` gagal dengan pesan write config/token:
- Pastikan `SANITY_AUTH_TOKEN` valid dan punya permission mutate dataset.

2. `Encryption secret missing`:
- Set `SEO_SETTINGS_ENCRYPTION_KEY` atau minimal `SEO_SESSION_SECRET`.

3. Login gagal setelah pindah ke dashboard password:
- Pastikan `dashboardPasswordHash` sudah tersimpan di `seoOpsSettings`.
- Jika belum bisa login, aktifkan sementara `SEO_DASHBOARD_PASSWORD` untuk recovery lalu set ulang password dari dashboard.

4. Google submit gagal:
- Cek `Indexing API` enabled di GCP.
- Cek service account JSON valid.
- Cek properti Search Console sesuai domain/protocol dan akses account.

5. IndexNow submit gagal:
- Cek host dan endpoint.
- Pastikan key file bisa diakses publik di URL `keyLocation`.
