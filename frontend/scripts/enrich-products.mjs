import path from 'node:path';
import { createClient } from '@sanity/client';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '..');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = '2024-01-01';
const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing Sanity auth token");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const productsRichData = {
  'banner-printing': {
    price: 35000,
    excerpt: 'Cetak Spanduk & Banner custom berkualitas tinggi dengan bahan Flexy kuat dan warna tajam. Cocok untuk promosi event, pameran, toko, maupun baliho luar ruangan.',
    features: [
      'Material Flexy standard (280gsm), medium (340gsm), atau premium (440gsm)',
      'Tinta outdoor anti luntur dan tahan cuaca',
      'Finishing lengkap: Mata ayam (eyelet), slongsong, atau lipat pas',
      'Proses pengerjaan cepat (1-2 hari kerja)'
    ]
  },
  'book-printing': {
    price: 25000,
    excerpt: 'Jasa cetak buku, majalah, jurnal, dan modul dengan pilihan metode jilid lengkap (lem panas, spiral, jahit benang). Kualitas cetak premium untuk POD maupun massal.',
    features: [
      'Print on Demand (POD) / Satuan hingga cetak Offset Massal',
      'Pilihan kertas isi: HVS, Bookpaper, Art Paper, Matte Paper',
      'Cover finishing: Hardcover, Softcover, Laminasi Doff/Glossy, Spot UV',
      'Jilid presisi dengan standar penerbitan'
    ]
  },
  'brochure-printing': {
    price: 1500,
    excerpt: 'Cetak brosur, flyer, dan pamflet efektif untuk promosi bisnis Anda. Pilihan lipat bervariasi dengan hasil warna separasi yang cerah dan memikat pelanggan.',
    features: [
      'Ukuran fleksibel (A4, A5, DL, Custom)',
      'Model lipatan: Bi-fold (lipat 2), Tri-fold (lipat 3), atau Gate-fold',
      'Bahan Art Paper 120gsm - 150gsm, atau Art Carton',
      'Tersedia layanan desain jika belum memiliki desain'
    ]
  },
  'business-card-printing': {
    price: 35000,
    excerpt: 'Kartu Nama Premium (Business Cards) sebagai wajah profesional bisnis Anda. Berbagai pilihan finishing eksklusif untuk memberikan kesan pertama yang tak terlupakan.',
    features: [
      'Cetak full color 1 sisi atau 2 sisi (bolak-balik)',
      'Material Art Carton 260gsm berkualitas tinggi',
      'Finishing eksklusif: Laminasi Doff/Glossy, Poly Emas/Perak, Emboss',
      'Isi 100 lembar (1 Box) dengan potong presisi'
    ]
  },
  'packaging-printing': {
    price: 4500,
    excerpt: 'Cetak kemasan (Packaging), Dus Makanan, dan Box Produk custom sesuai branding. Tingkatkan nilai jual produk Anda dengan kemasan yang aman, tebal, dan estetik.',
    features: [
      'Bahan Ivory, Duplex, Kraft, atau Corrugated Board',
      'Tersedia model Die Cut, Snap Lock, Auto Lock',
      'Pilihan cetakan Food Grade (aman untuk makanan langsung)',
      'Support finishing Laminasi, Window Patching (Jendela Mika), dan Hot Print'
    ]
  },
  'quran-printing': {
    price: 85000,
    excerpt: 'Cetak Al-Qur\'an custom untuk kebutuhan wakaf, yayasan, sekolah, maupun personal. Menggunakan standar cetak tinggi dan kertas khusus QPP (Quran Premium Paper).',
    features: [
      'Menggunakan Kertas QPP Halal yang awet dan nyaman dibaca',
      'Finishing Hardcover tebal berkualitas dengan tulisan Poly Emas/Perak',
      'Bisa custom desain cover untuk instansi, wakaf keluarga, atau pesantren',
      'Dilengkapi dengan pembatas halaman / pita eksklusif'
    ]
  },
  'sticker-printing': {
    price: 15000,
    excerpt: 'Cetak Stiker Label kemasan, decal mobil, stiker vinyl anti air, dan chromo premium. Bisa potong putus (Die-cut) atau setengah putus (Kiss-cut).',
    features: [
      'Bahan bervariasi: Vinyl Susu, Vinyl Transparan, Chromo, Bontax, Hologram',
      'Tahan air dan cuaca (untuk opsi Vinyl & finishing Laminasi)',
      'Cutting presisi menggunakan mesin die cut / kiss cut',
      'Cocok untuk stiker kemasan makanan, minuman, dan branding produk'
    ]
  },
  't-shirt-printing': {
    price: 75000,
    excerpt: 'Sablon Kaos Custom SATUAN maupun PARTAI untuk event, seragam kantor / komunitas. Material kaos premium Cotton Combed yang nyaman dan menyerap keringat.',
    features: [
      'Bahan kaos Cotton Combed 30s / 24s / 20s standar distro',
      'Metode Sablon DTF (Digital Transfer Film) warna tidak terbatas',
      'Tersedia Sablon Manual Plastisol & Polyflex untuk jumlah besar / spesifikasi khusus',
      'Awet, warna tajam, dan tidak mudah pecah saat disetrika'
    ]
  },
  'wedding-album-printing': {
    price: 180000,
    excerpt: 'Cetak Album Foto Pernikahan Eksklusif (Photobook / Wedding Album). Simpan momen berharga Anda dalam album hardcover elegan dengan halaman lay-flat.',
    features: [
      'Tipe jilid Board / Lay-flat (Halaman sambung tanpa terpotong di tengah)',
      'Hardcover tahan banting dibalut kulit sintetis / foto full cover',
      'Kertas foto tahan lama dengan lapisan anti air dan debu (Laminasi)',
      'Free Box Album eksklusif'
    ]
  },
  'cetak-percetakan-umum': {
    price: 10000,
    excerpt: 'Solusi Jasa Cetak & Percetakan Umum untuk segala kebutuhan administrasi dan promosi instansi/perusahaan Anda. Mulai dari Kop Surat, Amplop, Stopmap, hingga Id Card.',
    features: [
      'Mencakup segala produk alat tulis kantor & kebutuhan komersial',
      'Cetak Kop Surat, Nota NCR, Amplop, Map Folder',
      'Cetak Kalender Meja / Dinding, Lanyard, & ID Card Premium',
      'Layanan konsultasi gratis dan kecepatan cetak tinggi'
    ]
  }
};

function createPortableTextFeatures(features) {
  return [
    {
      _key: Math.random().toString(36).slice(2, 10),
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: Math.random().toString(36).slice(2, 10),
          _type: 'span',
          marks: ['strong'],
          text: 'Fitur & Spesifikasi Unggulan:'
        }
      ]
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _key: Math.random().toString(36).slice(2, 10), _type: 'span', marks: [], text: features[0] }]
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _key: Math.random().toString(36).slice(2, 10), _type: 'span', marks: [], text: features[1] }]
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _key: Math.random().toString(36).slice(2, 10), _type: 'span', marks: [], text: features[2] }]
    },
    {
      _key: Math.random().toString(36).slice(2, 10),
      _type: 'block',
      style: 'normal',
      listItem: 'bullet',
      children: [{ _key: Math.random().toString(36).slice(2, 10), _type: 'span', marks: [], text: features[3] }]
    }
  ];
}

async function run() {
  console.log("Fetching all products...");
  const products = await client.fetch(`*[_type == "product"]{ _id, title, slug }`);
  console.log(`Found ${products.length} products.`);

  for (const product of products) {
    if (!product.slug || !product.slug.current) continue;
    const info = productsRichData[product.slug.current];
    if (info) {
      console.log(`Updating product: ${product.title} (${product.slug.current})`);
      
      const bodyBlocks = createPortableTextFeatures(info.features);

      await client.patch(product._id)
        .set({
          price: info.price,
          excerpt: info.excerpt,
          body: bodyBlocks
        })
        .commit();
      
      console.log(`Successfully updated ${product.title}.`);
    } else {
      console.log(`Skipping ${product.title}, no mapping found.`);
    }
  }
}

run().catch(console.error);
