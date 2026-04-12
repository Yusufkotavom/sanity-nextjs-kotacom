# 🎯 Setup Cloudflare Pages untuk SEO Dashboard

## ⚠️ PENTING: Pages vs Workers

- **Worker** = Untuk cron jobs (sudah deployed: seo-ops-worker)
- **Pages** = Untuk Next.js app (SEO Dashboard) ← YANG KITA BUTUHKAN

## 📋 Langkah-langkah Setup Pages

### 1. Buka Cloudflare Dashboard
- URL: https://dash.cloudflare.com
- Login dengan akun Anda

### 2. Buat Pages Project (BUKAN Worker!)
1. Di sidebar kiri, klik **Workers & Pages**
2. Klik tombol **Create application** (biru, di kanan atas)
3. Pilih tab **Pages** (BUKAN Workers!)
4. Klik **Connect to Git**

### 3. Connect Repository
1. Pilih **GitHub** (atau Git provider Anda)
2. Authorize Cloudflare jika diminta
3. Pilih repository: `Yusufkotavom/sanity-nextjs-kotacom`
4. Klik **Begin setup**

### 4. Configure Build Settings

Isi form seperti ini:

```
┌─────────────────────────────────────────────┐
│ Set up builds and deployments               │
├─────────────────────────────────────────────┤
│ Project name                                │
│ seo-dashboard-kotacom                       │
│                                             │
│ Production branch                           │
│ main                                        │
│                                             │
│ Framework preset                            │
│ [Next.js ▼]                                 │
│                                             │
│ Build command                               │
│ pnpm build                                  │
│                                             │
│ Build output directory                      │
│ .next                                       │
│                                             │
│ Root directory (path)                       │
│ seo-dashboard                               │
│                                             │
│ Environment variables (optional)            │
│ [+ Add variable]                            │
│ NODE_VERSION = 20                           │
└─────────────────────────────────────────────┘
```

**Detail isian:**

| Field | Value |
|-------|-------|
| Project name | `seo-dashboard-kotacom` |
| Production branch | `main` |
| Framework preset | `Next.js` (pilih dari dropdown) |
| Build command | `pnpm build` |
| Build output directory | `.next` |
| Root directory | `seo-dashboard` |

**Environment variables (tambahkan 1 saja dulu):**
- Key: `NODE_VERSION`
- Value: `20`

### 5. Save and Deploy
1. Klik **Save and Deploy**
2. Tunggu build pertama selesai (akan gagal karena env vars belum lengkap - ini normal!)

### 6. Upload Environment Variables
Setelah project dibuat, jalankan di terminal:

```bash
cd seo-dashboard
npx wrangler login  # Jika belum login
node upload-env-to-cloudflare.mjs seo-dashboard-kotacom
```

### 7. Redeploy
1. Kembali ke Cloudflare dashboard
2. Workers & Pages > seo-dashboard-kotacom
3. Klik **View details** pada deployment terakhir
4. Klik **Retry deployment**

ATAU push commit baru ke GitHub untuk trigger auto-deploy.

---

## 🎯 Hasil Akhir

Setelah selesai, Anda akan punya:

1. ✅ **Worker**: `seo-ops-worker.kotacom.workers.dev` (sudah deployed)
2. ✅ **Pages**: `seo-dashboard-kotacom.pages.dev` (baru akan dibuat)

---

## 🔍 Cara Membedakan Pages vs Worker

### Pages (untuk Next.js/Static sites)
- Tab **Pages** saat create
- Ada build command & output directory
- Deploy dari Git repository
- URL: `*.pages.dev`

### Worker (untuk serverless functions)
- Tab **Workers** saat create
- Tidak ada build command (pakai wrangler.toml)
- Deploy via CLI atau dashboard upload
- URL: `*.workers.dev`

---

## ❓ FAQ

**Q: Kenapa tidak pakai Worker untuk SEO Dashboard?**
A: Worker untuk serverless functions/cron jobs. Next.js app butuh Pages (dengan build process).

**Q: Apakah Worker yang sudah dibuat perlu dihapus?**
A: TIDAK! Worker (seo-ops-worker) tetap diperlukan untuk cron jobs. Kita butuh KEDUANYA:
- Worker = Background jobs
- Pages = Frontend dashboard

**Q: Build pertama gagal, normal?**
A: Ya, normal! Karena env vars belum lengkap. Setelah upload env vars via script, redeploy akan berhasil.

---

## 🆘 Troubleshooting

**Tidak ada opsi "Connect to Git"?**
- Pastikan Anda di tab **Pages**, bukan Workers
- Refresh halaman dan coba lagi

**Repository tidak muncul?**
- Authorize Cloudflare di GitHub settings
- Refresh connection

**Build gagal terus?**
- Cek build logs di dashboard
- Pastikan env vars sudah di-upload
- Test build locally: `cd seo-dashboard && pnpm build`

---

Sekarang coba ikuti langkah di atas untuk membuat Pages project yang baru!
