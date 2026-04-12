# 🚀 Upload Environment Variables ke Cloudflare - Cara Cepat!

Panduan untuk upload 40+ environment variables ke Cloudflare Pages dalam hitungan menit, bukan jam!

---

## 🎯 Kenapa Pakai Script Ini?

- ✅ Upload 40+ variables dalam 2-3 menit
- ✅ Tidak perlu copy-paste manual satu per satu
- ✅ Otomatis skip placeholder values
- ✅ Error handling untuk setiap variable
- ✅ Progress tracking real-time

**Manual via dashboard = 30-45 menit** 😫  
**Pakai script ini = 2-3 menit** 🚀

---

## 📋 Prerequisites

1. Cloudflare Pages project sudah dibuat
2. Wrangler CLI sudah terinstall (otomatis via npx)
3. Sudah login ke Cloudflare via `wrangler login`

---

## 🔧 Cara Pakai

### Step 1: Pastikan Sudah Login ke Cloudflare

```bash
cd seo-dashboard
npx wrangler login
```

Browser akan terbuka, login dengan akun Cloudflare Anda.

### Step 2: Buat Project di Cloudflare Pages

Via dashboard:
1. Buka https://dash.cloudflare.com
2. Workers & Pages > Create application > Pages > Connect to Git
3. Pilih repo `Yusufkotavom/sanity-nextjs-kotacom`
4. Set project name: `seo-dashboard-kotacom`
5. Root directory: `seo-dashboard`
6. Build command: `pnpm build`
7. Build output: `.next`
8. **JANGAN** tambah env vars manual dulu - kita akan upload via script!

### Step 3: Upload Environment Variables

```bash
cd seo-dashboard
node upload-env-to-cloudflare.mjs seo-dashboard-kotacom
```

Script akan:
- ✅ Membaca `.env.cloudflare`
- ✅ Parse semua variables
- ✅ Skip comments dan placeholders
- ✅ Upload satu per satu ke Cloudflare
- ✅ Show progress dan hasil

Output contoh:
```
🚀 Uploading environment variables to Cloudflare Pages: seo-dashboard-kotacom

📋 Found 42 environment variables to upload

⬆️  Uploading: NEXT_PUBLIC_APP_URL
   ✅ Success

⬆️  Uploading: NEXT_PUBLIC_SANITY_PROJECT_ID
   ✅ Success

...

==================================================
✅ Upload selesai!
   Success: 40
   Failed: 2
==================================================
```

### Step 4: Verifikasi

1. Buka https://dash.cloudflare.com
2. Workers & Pages > seo-dashboard-kotacom
3. Settings > Environment variables
4. Cek semua variables sudah ada

### Step 5: Trigger Deployment

Setelah env vars di-upload, trigger deployment:
- Push commit baru ke GitHub, atau
- Manual redeploy via Cloudflare dashboard

---

## 🔍 File yang Digunakan

### `.env.cloudflare`

File ini berisi semua environment variables yang akan di-upload. Format:

```env
# Comments akan di-skip
KEY=value
ANOTHER_KEY=another-value
```

**PENTING**: 
- File ini sudah di-populate dari `.env.local`
- Jangan commit file ini ke Git (sudah di-ignore)
- Update values sesuai environment production Anda

### `upload-env-to-cloudflare.mjs`

Script Node.js yang melakukan upload. Features:
- Parse .env file
- Skip comments dan empty lines
- Skip placeholder values (replace-with-*, TODO)
- Upload via wrangler CLI
- Error handling per variable
- Progress tracking

---

## 🐛 Troubleshooting

### Error: "Not logged in"

**Solusi**:
```bash
npx wrangler login
```

### Error: "Project not found"

**Penyebab**: Project name salah atau belum dibuat

**Solusi**:
1. Cek project name di Cloudflare dashboard
2. Jalankan dengan project name yang benar:
   ```bash
   node upload-env-to-cloudflare.mjs <your-project-name>
   ```

### Error: "Failed to upload variable X"

**Penyebab**: Value mengandung karakter special yang perlu di-escape

**Solusi**:
1. Cek value di `.env.cloudflare`
2. Pastikan quotes dan newlines sudah benar
3. Untuk multiline values (seperti private keys), pastikan menggunakan `\n`

### Beberapa Variables Failed

**Normal!** Beberapa variables mungkin:
- Sudah ada (duplicate)
- Format value tidak valid
- Restricted by Cloudflare

Upload manual untuk variables yang failed via dashboard.

---

## 🔄 Update Environment Variables

Jika perlu update values:

1. Edit `.env.cloudflare`
2. Jalankan script lagi:
   ```bash
   node upload-env-to-cloudflare.mjs seo-dashboard-kotacom
   ```
3. Wrangler akan overwrite values yang sudah ada

---

## 🎓 Tips

1. **Backup dulu**: Sebelum upload, backup env vars yang sudah ada (jika ada)
2. **Test dulu**: Upload ke staging project dulu sebelum production
3. **Verify**: Selalu verify di dashboard setelah upload
4. **Redeploy**: Jangan lupa trigger redeploy setelah update env vars

---

## 📚 Alternative: Bash Script

Jika prefer bash, gunakan `cloudflare-env.sh`:

```bash
chmod +x cloudflare-env.sh
./cloudflare-env.sh seo-dashboard-kotacom
```

**Note**: Node.js script lebih reliable untuk handling special characters.

---

## 🆘 Need Help?

1. Cek Cloudflare dashboard logs
2. Cek wrangler version: `npx wrangler --version`
3. Cek project list: `npx wrangler pages project list`
4. Dokumentasi: https://developers.cloudflare.com/pages/

---

## ✅ Checklist

- [ ] Login ke Cloudflare via `wrangler login`
- [ ] Project sudah dibuat di Cloudflare Pages
- [ ] File `.env.cloudflare` sudah di-review dan update
- [ ] Jalankan `node upload-env-to-cloudflare.mjs`
- [ ] Verify di Cloudflare dashboard
- [ ] Trigger deployment
- [ ] Test aplikasi setelah deploy

Selamat! Environment variables Anda sudah ter-upload dengan cepat! 🎉
