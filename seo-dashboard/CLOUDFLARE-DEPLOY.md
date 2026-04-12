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

5. **Environment Variables**
   Tambahkan environment variables berikut di **Settings > Environment variables**:
   
   ```env
   NODE_VERSION=20
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=<your-read-token>
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-supabase-anon-key>
   GOOGLE_CLIENT_EMAIL=<your-service-account-email>
   GOOGLE_PRIVATE_KEY=<your-service-account-private-key>
   GOOGLE_PROPERTY_URI=<your-gsc-property>
   ```

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
