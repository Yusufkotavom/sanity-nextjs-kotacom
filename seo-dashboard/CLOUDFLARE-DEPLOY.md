# Deploy SEO Dashboard ke Cloudflare Pages

## Langkah Manual via Dashboard Cloudflare

1. **Login ke Cloudflare Dashboard**
   - Buka https://dash.cloudflare.com
   - Pilih akun Anda

2. **Buat Project Baru**
   - Klik **Workers & Pages** di sidebar
   - Klik **Create application**
   - Pilih **Pages** tab
   - Klik **Connect to Git**

3. **Connect Repository**
   - Pilih repository: `Yusufkotavom/sanity-nextjs-kotacom`
   - Klik **Begin setup**

4. **Configure Build Settings**
   ```
   Project name: seo-dashboard-kotacom
   Production branch: main
   Framework preset: Next.js
   Build command: pnpm build
   Build output directory: .next
   Root directory: seo-dashboard
   ```

5. **Environment Variables - CARA CEPAT! 🚀**
   
   **Opsi A: Upload Otomatis (Recommended)**
   
   Setelah project dibuat, upload semua env vars sekaligus:
   
   ```bash
   cd seo-dashboard
   node upload-env-to-cloudflare.mjs seo-dashboard-kotacom
   ```
   
   Script akan otomatis membaca dari `.env.cloudflare` dan upload 40+ variables dalam beberapa menit.
   
   **Opsi B: Manual via Dashboard (Lambat, tidak disarankan)**
   
   Tambahkan satu per satu di **Settings > Environment variables**. Lihat `.env.cloudflare` untuk daftar lengkap.

6. **Deploy**
   - Klik **Save and Deploy**
   - Tunggu proses build selesai

## Deploy via Wrangler CLI (Alternative)

Jika ingin deploy via CLI, gunakan:

```bash
cd seo-dashboard
pnpm build
npx wrangler pages deploy .next --project-name=seo-dashboard-kotacom
```

## Verifikasi Deployment

Setelah deploy berhasil, Anda akan mendapat URL seperti:
- Production: `https://seo-dashboard-kotacom.pages.dev`
- Custom domain bisa ditambahkan di **Custom domains** settings

## Troubleshooting

### Build Error: Module not found
- Pastikan semua dependencies di `package.json` sudah benar
- Cek apakah workspace dependencies (`@repo/*`) bisa di-resolve

### Environment Variables tidak terbaca
- Pastikan prefix `NEXT_PUBLIC_` untuk client-side variables
- Restart deployment setelah menambah env vars

### Function invocation timeout
- Cloudflare Pages Functions memiliki timeout 10 detik (free) atau 30 detik (paid)
- Optimalkan API routes yang lambat
