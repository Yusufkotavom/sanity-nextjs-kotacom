# Sanity Redirect Management Workflow

Dokumen ini mendefinisikan standar operasional (SOP) untuk mengelola redireksi (301/302) pada proyek Next.js + Sanity Kotacom.

## Prinsip Utama
1. **Sanity as Source of Truth:** Seluruh aturan redirect spesifik (path-to-path) harus dikelola melalui dokumen tipe `redirect` di Sanity CMS.
2. **Backend Validation:** Sebelum menambahkan redirect baru, pastikan URL tujuan (`destination`) sudah **Live** atau tersedia di Sanity (Published/Draft) atau Local Repo.
3. **Wildcard Fallbacks:** Gunakan `next.config.mjs` hanya untuk aturan pola global (*wildcard*) yang bersifat struktural (misal: perubahaan namespace `/product/` -> `/products/`).

## Struktur Dokumen Redirect (Sanity)
| Field | Deskripsi | Contoh |
|-------|-----------|--------|
| `source` | Path lama (wajib diawali /) | `/old-service` |
| `destination` | Path baru atau URL lengkap | `/services/new-service` |
| `permanent` | Boolean (True = 301, False = 302) | `true` |
| `isEnabled` | Toggle aktif/nonaktif | `true` |

## Alur Update & Sinkronisasi
Setiap kali ada perubahan struktur konten atau audit GSC:
1. **Audit GSC:** Gunakan script `frontend/scripts/export-gsc-priority.mjs` untuk melihat URL yang menghasilkan 404 atau butuh migrasi.
2. **Kurasi Manual:** Update file CSV di `docs/curation/` untuk memetakan URL lama ke intent yang benar.
3. **Validasi & Import:** Jalankan `frontend/scripts/import-approved-redirects.mjs`. Script ini secara otomatis akan:
   - Mengecek apakah `finalDecision` sudah `approved_redirect`.
   - Melakukan validasi apakah `finalTargetPath` sudah ada di database Sanity/Local.
   - Meng-upload ke Sanity hanya jika tujuannya valid.

## Monitoring Status
Gunakan script `frontend/scripts/update-curation-with-sanity.mjs` untuk mendapatkan laporan berkala mengenai:
- Berapa banyak URL GSC yang sudah ter-cover halaman Sanity.
- Berapa banyak yang ter-cover oleh aturan redirect.
- Sisa URL yang masih "menggantung" (Warning).

## Penanganan Wildcard di Next.js
Aturan pola besar dikelola di `frontend/next.config.mjs` pada array `STATIC_REDIRECTS`. Gunakan format:
```javascript
{
  source: '/old-prefix/:slug',
  destination: '/new-prefix/:slug',
  permanent: true,
}
```
