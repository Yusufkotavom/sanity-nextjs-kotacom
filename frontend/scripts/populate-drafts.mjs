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
const block = (style, children) => ({
  _type: 'block',
  _key: genKey(),
  style,
  markDefs: [],
  children: children.map(c => ({
    _type: 'span',
    _key: genKey(),
    text: c.text,
    marks: c.marks || []
  }))
});

const listBlock = (listItem, children) => ({
  _type: 'block',
  _key: genKey(),
  style: 'normal',
  listItem,
  level: 1,
  markDefs: [],
  children: children.map(c => ({
    _type: 'span',
    _key: genKey(),
    text: c.text,
    marks: c.marks || []
  }))
});

// Generators tailored to document type
function generateServiceBody(title) {
  return [
    block('normal', [
      { text: `Selamat datang di layanan profesional kami untuk `, marks: [] },
      { text: title, marks: ['strong'] },
      { text: `. Di era digital saat ini, kebutuhan akan solusi yang andal dan tepat sasaran sangatlah krusial untuk memastikan keberhasilan dan pertumbuhan bisnis Anda di Surabaya dan sekitarnya.`, marks: [] }
    ]),
    block('h2', [{ text: `Mengapa Anda Membutuhkan ${title}?`, marks: [] }]),
    block('normal', [{ text: `Memilih mitra yang tepat dapat memberikan dampak signifikan terhadap operasional Anda. Layanan ini dirancang khusus dengan pendekatan modern, berfokus pada kualitas, kecepatan, dan efisiensi biaya. Tim ahli kami selalu siap mendengarkan kebutuhan spesifik Anda dan menyesuaikan setiap langkah pengerjaan untuk hasil yang maksimal.`, marks: [] }]),
    block('h3', [{ text: 'Keunggulan Layanan Kami', marks: [] }]),
    listBlock('bullet', [{ text: 'Konsultasi mendalam untuk memahami masalah dan tujuan bisnis Anda secara presisi.', marks: [] }]),
    listBlock('bullet', [{ text: 'Pengerjaan tepat waktu oleh tenaga ahli berpengalaman di bidangnya.', marks: [] }]),
    listBlock('bullet', [{ text: 'Dukungan pasca-pengerjaan yang responsif dan berorientasi pada kepuasan pelanggan.', marks: [] }]),
    listBlock('bullet', [{ text: 'Transparansi harga tanpa biaya tersembunyi.', marks: [] }]),
    block('normal', [
      { text: `Jangan ragu untuk menghubungi kami jika Anda membutuhkan konsultasi lebih lanjut mengenai `, marks: [] },
      { text: title, marks: ['strong'] },
      { text: `. Kami siap menjadi mitra strategis dalam perjalanan bisnis Anda.`, marks: [] }
    ])
  ];
}

function generateProductBody(title) {
  return [
    block('normal', [
      { text: `Tingkatkan produktivitas dan pengalaman Anda dengan `, marks: [] },
      { text: title, marks: ['strong'] },
      { text: `. Produk ini dirancang khusus untuk memenuhi standar tinggi bagi para profesional, gamer, maupun instansi yang membutuhkan keandalan tanpa kompromi.`, marks: [] }
    ]),
    block('h2', [{ text: `Spesifikasi dan Fitur Utama ${title}`, marks: [] }]),
    block('normal', [{ text: `Kami mengerti bahwa performa adalah segalanya. Oleh karena itu, setiap komponen dirakit dan diuji dengan standar kontrol kualitas yang ketat. Mulai dari manajemen suhu, efisiensi daya, hingga daya tahan komponen jangka panjang, semuanya telah kami perhitungkan untuk memberikan pengalaman penggunaan yang mulus dan bebas hambatan.`, marks: [] }]),
    block('h3', [{ text: 'Benefit Membeli dari Kami', marks: [] }]),
    listBlock('bullet', [{ text: 'Komponen 100% Original dengan garansi resmi distributor.', marks: [] }]),
    listBlock('bullet', [{ text: 'Perakitan rapi (cable management) untuk sirkulasi udara optimal.', marks: [] }]),
    listBlock('bullet', [{ text: 'Sudah melalui tahap stress-test dan Quality Control (QC) berlapis.', marks: [] }]),
    listBlock('bullet', [{ text: 'Dukungan teknis penuh (after-sales service) yang siap membantu Anda kapan saja.', marks: [] }]),
    block('normal', [
      { text: `Dapatkan segera `, marks: [] },
      { text: title, marks: ['strong'] },
      { text: ` dan rasakan sendiri perbedaan performanya. Segera lakukan pemesanan sebelum kehabisan stok!`, marks: [] }
    ])
  ];
}

function generatePostBody(title) {
  return [
    block('normal', [
      { text: `Dalam artikel ini, kita akan membahas secara mendalam topik yang sedang hangat diperbincangkan, yaitu `, marks: [] },
      { text: title, marks: ['strong'] },
      { text: `. Pemahaman yang komprehensif mengenai hal ini sangat penting, terutama di tengah pesatnya perkembangan teknologi dan dinamika pasar saat ini.`, marks: [] }
    ]),
    block('h2', [{ text: `Faktor-Faktor Kunci Terkait ${title}`, marks: [] }]),
    block('normal', [{ text: `Seringkali kita dihadapkan pada berbagai informasi yang membingungkan. Untuk itu, kami merangkum beberapa poin esensial yang dapat dijadikan panduan. Mulai dari konsep dasar, implementasi praktis, hingga dampaknya terhadap ekosistem digital secara luas. Menerapkan strategi yang tepat berdasarkan informasi yang akurat akan meminimalisir risiko kegagalan.`, marks: [] }]),
    block('h3', [{ text: 'Poin Penting untuk Diperhatikan', marks: [] }]),
    listBlock('bullet', [{ text: 'Pahami lanskap dan kebutuhan spesifik sebelum mengambil keputusan strategis.', marks: [] }]),
    listBlock('bullet', [{ text: 'Gunakan alat dan teknologi yang telah terbukti efektivitasnya di industri.', marks: [] }]),
    listBlock('bullet', [{ text: 'Evaluasi secara berkala untuk memastikan relevansi strategi dengan kondisi terkini.', marks: [] }]),
    block('h2', [{ text: `Kesimpulan`, marks: [] }]),
    block('normal', [
      { text: `Secara garis besar, `, marks: [] },
      { text: title, marks: ['strong'] },
      { text: ` menawarkan wawasan baru yang patut dieksplorasi lebih jauh. Tetaplah terhubung dengan blog kami untuk mendapatkan pembaruan informasi dan tips menarik lainnya seputar dunia IT dan teknologi terapan.`, marks: [] }
    ])
  ];
}

function generateExcerpt(title) {
  return `Temukan solusi dan informasi terbaik mengenai ${title}. Kami hadir untuk memenuhi kebutuhan operasional dan teknologi Anda dengan standar kualitas tertinggi.`;
}

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
    perspective: 'raw',
    token: env.SANITY_DEV || env.SANITY_AUTH_TOKEN,
  });

  // Fetch all drafts for service, product, post
  console.log('Fetching drafts from Sanity...');
  const drafts = await client.fetch(`
    *[_id in path("drafts.**") && _type in ["service", "product", "post"] && !defined(body)]
    { _id, _type, title }
  `);

  console.log(`Found ${drafts.length} drafts needing content.`);

  if (drafts.length === 0) return;

  const batchSize = 25;
  for (let i = 0; i < drafts.length; i += batchSize) {
    const batch = drafts.slice(i, i + batchSize);
    let transaction = client.transaction();

    batch.forEach(doc => {
      let body = [];
      if (doc._type === 'service') body = generateServiceBody(doc.title);
      else if (doc._type === 'product') body = generateProductBody(doc.title);
      else if (doc._type === 'post') body = generatePostBody(doc.title);

      transaction.patch(doc._id, p => p.set({
        body,
        excerpt: generateExcerpt(doc.title)
      }));
    });

    try {
      await transaction.commit();
      console.log(`✅ Patched batch ${Math.floor(i/batchSize) + 1} (${batch.length} docs).`);
    } catch (error) {
      console.error(`❌ Failed to patch batch ${Math.floor(i/batchSize) + 1}:`, error.message);
    }
  }

  console.log('Finished populating drafts with strict, SEO-optimized Portable Text content.');
}

main().catch(console.error);