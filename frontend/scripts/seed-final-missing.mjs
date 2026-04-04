import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple random key generator for Portable Text blocks
const genKey = () => crypto.randomBytes(6).toString('hex');

// Portable Text Builders
const block = (style, text) => ({
  _type: 'block',
  _key: genKey(),
  style,
  markDefs: [],
  children: [{
    _type: 'span',
    _key: genKey(),
    text: text,
    marks: []
  }]
});

async function main() {
  const envContent = await fs.readFile(path.join(__dirname, '../.env'), 'utf-8');
  const env = Object.fromEntries(
    envContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(line => line.split('=').map(part => part.trim()))
  );

  const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-01',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN,
  });

  const docsToCreate = [
    {
      _id: 'post-transformasi-bisnis',
      _type: 'post',
      title: 'Transformasi Bisnis di Era Digital',
      slug: { current: 'transformasi-bisnis', _type: 'slug' },
      excerpt: 'Pelajari bagaimana transformasi bisnis membantu perusahaan Anda berkembang di era digital ini dengan memanfaatkan teknologi yang tepat.',
      body: [
        block('normal', 'Transformasi bisnis bukan lagi sekadar pilihan, melainkan sebuah keharusan. Dengan pesatnya perkembangan teknologi, perusahaan dituntut untuk terus beradaptasi dan berinovasi demi mempertahankan relevansi dan daya saing di pasar.'),
        block('h2', 'Pentingnya Digitalisasi'),
        block('normal', 'Melalui digitalisasi, perusahaan dapat meningkatkan efisiensi operasional, menjangkau pasar yang lebih luas, dan memberikan pengalaman pelanggan yang lebih baik.')
      ]
    },
    {
      _id: 'post-digitalisasi-umkm-surabaya-sidoarjo-terbaik-2025',
      _type: 'post',
      title: 'Digitalisasi UMKM Surabaya Sidoarjo Terbaik 2025',
      slug: { current: 'digitalisasi-umkm-surabaya-sidoarjo-terbaik-2025', _type: 'slug' },
      excerpt: 'Mendorong pertumbuhan UMKM di Surabaya dan Sidoarjo melalui solusi digital terbaik yang dirancang khusus untuk tahun 2025.',
      body: [
        block('normal', 'Usaha Mikro, Kecil, dan Menengah (UMKM) merupakan tulang punggung perekonomian. Di Surabaya dan Sidoarjo, adopsi teknologi digital menjadi kunci utama untuk membuka potensi pasar yang lebih besar.'),
        block('h2', 'Solusi Digital untuk UMKM'),
        block('normal', 'Kami menyediakan berbagai solusi IT yang dirancang khusus untuk mendukung pertumbuhan UMKM, mulai dari pembuatan website, sistem Point of Sales (POS), hingga strategi pemasaran digital yang tepat sasaran.')
      ]
    },
    {
      _id: 'project-fashion-retail-pos-system-butik-cantik',
      _type: 'project',
      title: 'Fashion Retail POS System Butik Cantik',
      slug: { current: 'fashion-retail-pos-system-butik-cantik', _type: 'slug' },
      excerpt: 'Implementasi Sistem Point of Sales (POS) yang terintegrasi penuh untuk manajemen stok dan penjualan di Butik Cantik.',
      industry: 'Retail Fashion',
      clientName: 'Butik Cantik',
      completionYear: 2025,
      body: [
        block('normal', 'Proyek ini berfokus pada pengembangan dan implementasi sistem Point of Sales (POS) modern untuk Butik Cantik. Tujuan utamanya adalah untuk menyederhanakan proses transaksi, mengelola inventaris secara real-time, dan memberikan wawasan berbasis data untuk strategi penjualan.'),
        block('h2', 'Hasil yang Dicapai'),
        block('normal', 'Sistem yang kami kembangkan berhasil meningkatkan kecepatan layanan kasir dan akurasi data stok, yang pada akhirnya meningkatkan kepuasan pelanggan dan profitabilitas bisnis.')
      ]
    },
    {
      _id: 'project-it-infrastructure-upgrade-cv-maju-bersama',
      _type: 'project',
      title: 'IT Infrastructure Upgrade CV Maju Bersama',
      slug: { current: 'it-infrastructure-upgrade-cv-maju-bersama', _type: 'slug' },
      excerpt: 'Pembaruan infrastruktur IT menyeluruh untuk meningkatkan keamanan, stabilitas, dan performa jaringan internal CV Maju Bersama.',
      industry: 'Manufacturing',
      clientName: 'CV Maju Bersama',
      completionYear: 2025,
      body: [
        block('normal', 'Dalam proyek ini, kami melakukan pembaruan skala penuh terhadap infrastruktur IT CV Maju Bersama. Langkah ini diambil untuk mengatasi masalah performa jaringan yang melambat dan celah keamanan yang rentan.'),
        block('h2', 'Inovasi dan Keamanan'),
        block('normal', 'Dengan infrastruktur baru, stabilitas operasional meningkat secara signifikan, dan sistem keamanan data kini mematuhi standar industri tertinggi.')
      ]
    }
  ];

  const redirectsToCreate = [
    {
      _id: `redirect-${genKey()}`,
      _type: 'redirect',
      source: '/projects/education',
      destination: '/projects',
      permanent: true,
      isEnabled: true
    },
    {
      _id: `redirect-${genKey()}`,
      _type: 'redirect',
      source: '/projects/government',
      destination: '/projects',
      permanent: true,
      isEnabled: true
    },
    {
      _id: `redirect-${genKey()}`,
      _type: 'redirect',
      source: '/projects/retail',
      destination: '/projects',
      permanent: true,
      isEnabled: true
    },
    {
      _id: `redirect-${genKey()}`,
      _type: 'redirect',
      source: '/projects/manufacturing',
      destination: '/projects',
      permanent: true,
      isEnabled: true
    }
  ];

  const allDocs = [...docsToCreate, ...redirectsToCreate];

  console.log(`Preparing to publish ${allDocs.length} final documents (4 Contents, 4 Redirects)...`);
  let transaction = client.transaction();
  
  allDocs.forEach(doc => {
    transaction.createOrReplace(doc);
  });

  try {
    await transaction.commit();
    console.log(`✅ Successfully published ${allDocs.length} final documents directly to Live in Sanity.`);
  } catch (err) {
    console.error(`❌ Failed to publish documents:`, err.message);
  }
}

main().catch(console.error);