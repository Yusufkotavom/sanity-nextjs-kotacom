# 🚀 Panduan Deploy ke Cloudflare

Panduan lengkap untuk deploy Worker dan SEO Dashboard ke Cloudflare.

---

## ✅ Status Deployment

### Worker (Cloudflare Workers)
- **Status**: ✅ Deployed
- **URL**: https://seo-ops-worker.kotacom.workers.dev
- **Cron Triggers**: 5 schedules
  - `0 * * * *` - Setiap jam
  - `0 2 * * *` - Jam 2 pagi
  - `0 4 * * *` - Jam 4 pagi
  - `0 10 * * *` - Jam 10 pagi
  - `*/30 * * * *` - Setiap 30 menit

### SEO Dashboard (Cloudflare Pages)
- **Status**: ⏳ Pending manual setup
- **Build**: ✅ Verified locally

---

## 📦 1. Deploy Worker (Sudah Selesai)

Worker sudah berhasil di-deploy dengan command:

```bash
cd worker
pnpm wrangler deploy
```

**Catatan**: Cron triggers dikurangi dari 6 menjadi 5 karena limit free plan Cloudflare.

---

## 🌐 2. Deploy SEO Dashboard ke Cloudflare Pages

### Opsi A: Via Cloudflare Dashboard (Recommended)

1. **Login ke Cloudflare**
   - Buka https://dash.cloudflare.com
   - Login dengan akun yang sudah terhubung

2. **Buat Project Pages Baru**
   - Klik **Workers & Pages** di sidebar
   - Klik **Create application**
   - Pilih tab **Pages**
   - Klik **Connect to Git**

3. **Connect Repository**
   - Pilih repository: `Yusufkotavom/sanity-nextjs-kotacom`
   - Authorize akses jika diminta
   - Klik **Begin setup**

4. **Configure Build Settings**
   
   | Setting | Value |
   |---------|-------|
   | Project name | `seo-dashboard-kotacom` |
   | Production branch | `main` |
   | Framework preset | `Next.js` |
   | Build command | `pnpm build` |
   | Build output directory | `.next` |
   | Root directory | `seo-dashboard` |
   | Node version | `20` |

5. **Set Environment Variables**
   
   **🚀 CARA CEPAT - Upload Otomatis (Recommended)**
   
   Setelah project dibuat di Cloudflare, jalankan script untuk upload semua env vars sekaligus:
   
   ```bash
   cd seo-dashboard
   node upload-env-to-cloudflare.mjs seo-dashboard-kotacom
   ```
   
   Script akan membaca dari `.env.cloudflare` dan upload 40+ variables otomatis.
   
   **Cara Manual (Lambat)**
   
   Klik **Add variable** satu per satu - tidak disarankan karena ada 40+ variables.
   Lihat file `.env.cloudflare` untuk daftar lengkap.

6. **Deploy**
   - Klik **Save and Deploy**
   - Tunggu build process selesai (±3-5 menit)
   - Setelah selesai, Anda akan mendapat URL: `https://seo-dashboard-kotacom.pages.dev`

### Opsi B: Via Wrangler CLI

Jika sudah build locally:

```bash
cd seo-dashboard
pnpm build
npx wrangler pages deploy .next --project-name=seo-dashboard-kotacom
```

**Note**: Environment variables tetap harus di-set via dashboard untuk production.

---

## 🔧 3. Post-Deployment Configuration

### Custom Domain (Optional)

1. Di Cloudflare Pages project, klik **Custom domains**
2. Klik **Set up a custom domain**
3. Masukkan domain (contoh: `dashboard.kotacom.id`)
4. Ikuti instruksi DNS setup

### Webhook Setup

Setelah deploy, update webhook URL di:

1. **Sanity Studio**
   - Settings > API > Webhooks
   - URL: `https://seo-dashboard-kotacom.pages.dev/api/internal/content-published-webhook`
   - Secret: gunakan `REVALIDATE_SECRET` yang sama

2. **Google Search Console**
   - Jika menggunakan indexing webhook
   - URL: `https://seo-dashboard-kotacom.pages.dev/api/seo/indexing/webhook`

---

## 🔍 4. Verifikasi Deployment

### Test Worker
```bash
curl https://seo-ops-worker.kotacom.workers.dev
```

### Test SEO Dashboard
1. Buka `https://seo-dashboard-kotacom.pages.dev`
2. Login dengan credentials
3. Test fitur:
   - Dashboard analytics
   - Search console integration
   - SEO audit
   - Indexing status

---

## 🐛 Troubleshooting

### Build Failed: "Module not found"

**Penyebab**: Workspace dependencies tidak ter-resolve

**Solusi**:
1. Pastikan `pnpm-workspace.yaml` ada di root
2. Cloudflare Pages harus build dari root dengan `pnpm install`
3. Update build command menjadi:
   ```bash
   cd ../.. && pnpm install && cd seo-dashboard && pnpm build
   ```

### Environment Variables Tidak Terbaca

**Penyebab**: Variables tidak di-set atau typo

**Solusi**:
1. Cek di **Settings > Environment variables**
2. Pastikan prefix `NEXT_PUBLIC_` untuk client-side vars
3. Redeploy setelah update env vars

### Function Timeout

**Penyebab**: API route terlalu lambat (>10s free plan, >30s paid)

**Solusi**:
1. Optimalkan query database
2. Gunakan caching (Upstash Redis)
3. Pindahkan long-running tasks ke Worker

### Cron Triggers Limit Exceeded

**Penyebab**: Free plan limit 5 cron triggers

**Solusi**: Sudah di-handle dengan mengurangi triggers di `wrangler.toml`

---

## 📊 Monitoring

### Cloudflare Analytics

1. **Worker Metrics**
   - Workers & Pages > seo-ops-worker > Metrics
   - Monitor: Requests, Errors, CPU time

2. **Pages Analytics**
   - Workers & Pages > seo-dashboard-kotacom > Analytics
   - Monitor: Visits, Bandwidth, Build time

### Logs

```bash
# Worker logs
cd worker
pnpm wrangler tail

# Pages logs
# Via dashboard: Workers & Pages > seo-dashboard-kotacom > Logs
```

---

## 🔄 Update Deployment

### Auto-deploy (Recommended)

Setiap push ke branch `main` akan otomatis trigger rebuild di Cloudflare Pages.

### Manual Deploy

```bash
# Worker
cd worker
pnpm wrangler deploy

# SEO Dashboard (jika via CLI)
cd seo-dashboard
pnpm build
npx wrangler pages deploy .next --project-name=seo-dashboard-kotacom
```

---

## 📝 Checklist Deployment

- [x] Worker deployed ke Cloudflare Workers
- [x] Cron triggers dikonfigurasi (5 schedules)
- [x] Build seo-dashboard verified locally
- [ ] SEO Dashboard deployed ke Cloudflare Pages
- [ ] Environment variables di-set di Cloudflare
- [ ] Custom domain dikonfigurasi (optional)
- [ ] Webhooks di-update dengan URL baru
- [ ] Testing deployment berhasil

---

## 🆘 Support

Jika ada masalah:
1. Cek Cloudflare dashboard logs
2. Review build logs di Pages deployment
3. Test locally dengan `pnpm dev` terlebih dahulu
4. Cek dokumentasi: https://developers.cloudflare.com/pages/
