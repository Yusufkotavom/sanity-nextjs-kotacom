# Quick Reference: New SEO Blocks

## 🎯 Stats Hero Block

**When to use:** Opening hero section with statistics

**Key fields:**
```
eyebrow: "200+ Website Sukses Dibuat"
title: "Jasa Pembuatan Website Profesional"
description: "Tingkatkan omset hingga 200%"
image: Upload hero image
links: Max 2 CTA buttons
```

**Example:**
- Eyebrow: "200+ Website Sukses Dibuat"
- Title: "Jasa Pembuatan Website Profesional Surabaya"
- CTA 1: "WhatsApp" (primary)
- CTA 2: "Konsultasi Gratis" (outline)

---

## 📈 Benefits Block

**When to use:** Showcase 6 key benefits with statistics

**Structure:** 6 benefit cards in grid

**Each benefit:**
```
icon: "📈" (emoji)
title: "Tingkatkan Omset Hingga 200%"
description: "Website memungkinkan bisnis..."
badge: "200% Peningkatan rata-rata"
badgeIcon: "📈"
```

**Sample benefits:**
1. 📈 Tingkatkan Omset (200%)
2. ⭐ Kredibilitas Bisnis (85%)
3. 🌍 Jangkau Global
4. 💰 Efisiensi Biaya (70%)
5. 📊 Analytics Real-time
6. ⏰ Operasional 24/7

---

## 🎁 Features Package Block

**When to use:** Show what's included in package

**Structure:** 6 feature cards

**Each feature:**
```
icon: Optional emoji
title: "Website Responsive Premium"
description: "Website yang tampil sempurna..."
badge: "Design Modern & Professional"
```

**Sample features:**
1. Website Responsive Premium
2. SEO Optimization Lengkap
3. Support & Maintenance 24/7
4. Domain & Hosting Premium
5. Training & Dokumentasi
6. Bonus & Kejutan

---

## 🛠️ Service Types Block

**When to use:** Display 3 service tiers with pricing

**Structure:** 3 service cards

**Each service:**
```
title: "Website Company Profile"
description: "Website profesional untuk..."
features: ["Responsive", "SEO", "Contact Form"]
price: "Mulai Rp 500.000"
timeline: "Timeline: 1-2 minggu"
badge: "POPULER" (optional)
link: CTA button
```

**Sample services:**
1. Company Profile (Rp 500k)
2. Toko Online (Rp 990k) - POPULER
3. Web Custom (Rp 1.9jt)

---

## ⚠️ Problem Solution Block

**When to use:** Highlight pain points + solution

**Structure:**
```
title: "Apakah Bisnis Anda Mengalami Masalah Ini?"
problems: [
  "Kehilangan pelanggan...",
  "Kompetitor unggul...",
  "Sulit ditemukan di Google...",
  "Penjualan terbatas..."
]
solutionTitle: "💡 Solusi:"
solution: "Website profesional dapat meningkatkan omset 200%"
```

**Visual:** Problems in red, solution in green

---

## ✨ Value Props Block

**When to use:** Show 4 key value propositions

**Structure:** 4 cards in grid

**Each prop:**
```
icon: "💰" (emoji)
title: "Harga Terjangkau"
description: "Dapatkan website berkualitas..."
```

**Sample props:**
1. 💰 Harga Terjangkau
2. ✅ Garansi Kepuasan 100%
3. 👨‍💻 Tim Ahli & Profesional
4. 📋 Proses Kerja Transparan

---

## 🎨 Common Settings

### Color Variants
- `background` - Default white/light
- `muted` - Subtle gray
- `primary` - Brand color
- `sky` - Light blue

### Padding Options
- `none` - No padding
- `sm` - Small (py-8)
- `default` - Standard (py-12)
- `lg` - Large (py-16)

---

## 📋 Recommended Page Structure

### Top Blocks (before shell)
1. Stats Hero Block
2. Section Header ("Pilih Jenis Website")
3. Benefits Block (6 benefits)

### Bottom Blocks (after shell)
4. Features Package Block
5. Logo Cloud (tech stack)
6. Problem Solution Block
7. Service Types Block
8. Testimonials Block
9. Value Props Block
10. FAQ Block
11. CTA Block

**Set `topBlockCount: 3`** in page settings

---

## 🔗 CTA Link Configuration

### External Link
```
isExternal: true
href: "https://wa.me/6285799520350"
title: "WhatsApp"
buttonVariant: "default"
target: true (open new tab)
```

### Internal Link
```
isExternal: false
internalLink: Select page from dropdown
title: "Lihat Detail"
buttonVariant: "outline"
```

### Button Variants
- `default` - Primary button
- `outline` - Outlined button
- `ghost` - Text button
- `link` - Link style

---

## 💡 Content Tips

### Use Emojis
- 📈 Statistics/Growth
- 💰 Money/Pricing
- ⭐ Quality/Rating
- 🌍 Global/Reach
- ⏰ Time/24-7
- 📊 Analytics/Data
- ✅ Check/Guarantee
- 👨‍💻 Team/Professional

### Statistics to Highlight
- 200% omset increase
- 85% customer trust
- 70% cost savings
- 24/7 operations
- 200+ websites built
- 99.9% uptime

### Persuasive Words
- Profesional
- Terpercaya
- Terjangkau
- Garansi
- Gratis
- Cepat
- Mudah
- Lengkap

---

## 🚀 Quick Actions

### Add New Block
1. Go to Sanity Studio
2. Open page: "Pembuatan Website"
3. Click "+ Add item" in Blocks
4. Select from SEO group
5. Fill in fields
6. Save

### Reorder Blocks
1. Drag and drop blocks
2. Remember: topBlockCount splits blocks
3. Save changes

### Preview Changes
1. Click "Preview" in Studio
2. Or visit: `/pembuatan-website` in frontend

### Import Sample
```bash
cd studio
npx sanity dataset import ../pembuatan-website-sample-blocks.ndjson --dataset production --token YOUR_TOKEN --replace
```

---

## 🐛 Troubleshooting

### Block not showing
- Check if registered in schema-types.ts
- Check if component exists
- Run: `npm run typegen` in studio

### Styling issues
- Check colorVariant setting
- Check padding setting
- Verify Tailwind classes

### Content not updating
- Clear browser cache
- Check ISR revalidation
- Force revalidate: `/api/revalidate?path=/pembuatan-website`

---

## 📞 Need Help?

- Full guide: `docs/pembuatan-website-expansion-guide.md`
- Comparison: `content-comparison-kotacom-vs-sanity.md`
- Summary: `PEMBUATAN-WEBSITE-EXPANSION-SUMMARY.md`
