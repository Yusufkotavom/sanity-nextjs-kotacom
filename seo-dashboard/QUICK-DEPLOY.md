# ⚡ Quick Deploy Guide - SEO Dashboard ke Cloudflare

Panduan singkat untuk deploy dalam 10 menit!

---

## 🚀 Quick Steps

### 1. Login Cloudflare (1 menit)
```bash
cd seo-dashboard
npx wrangler login
```

### 2. Buat Project di Dashboard (3 menit)
1. Buka https://dash.cloudflare.com
2. **Workers & Pages** > **Create** > **Pages** > **Connect to Git**
3. Pilih repo: `Yusufkotavom/sanity-nextjs-kotacom`
4. Configure:
   - Project name: `seo-dashboard-kotacom`
   - Root directory: `seo-dashboard`
   - Build command: `pnpm build`
   - Build output: `.next`
5. **SKIP env vars** - kita upload via script!
6. Klik **Save and Deploy**

### 3. Upload Environment Variables (2 menit)
```bash
node upload-env-to-cloudflare.mjs seo-dashboard-kotacom
```

### 4. Redeploy (2 menit)
- Push commit baru, atau
- Manual redeploy via dashboard

### 5. Verify (2 menit)
Buka: `https://seo-dashboard-kotacom.pages.dev`

---

## ✅ Done!

Total waktu: ~10 menit

URL Production: `https://seo-dashboard-kotacom.pages.dev`

---

## 📚 Dokumentasi Lengkap

- **Deployment Guide**: `CLOUDFLARE-DEPLOYMENT-GUIDE.md`
- **Env Upload Guide**: `ENV-UPLOAD-README.md`
- **Troubleshooting**: Lihat dokumentasi di atas

---

## 🆘 Troubleshooting Cepat

**Build failed?**
```bash
# Test build locally dulu
pnpm build
```

**Env vars tidak terbaca?**
```bash
# Verify di dashboard
# Settings > Environment variables
```

**Script upload error?**
```bash
# Pastikan sudah login
npx wrangler login

# Cek project name
npx wrangler pages project list
```

---

Selamat! Dashboard Anda sudah live! 🎉
