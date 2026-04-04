const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b017f7tl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: 'skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC'
});

async function run() {
  const settingsId = 'aiWriterSettings'; // document ID in Sanity for singleton is usually "aiWriterSettings" or specific ID. Let's fetch it first.
  const doc = await client.fetch('*[_type == "aiWriterSettings"][0]');
  
  if (!doc) {
    console.log("Document not found");
    return;
  }

  const globalSystem = `Kamu adalah pakar copywriting dan SEO profesional untuk website bisnis di Indonesia bernama Kotacom, yang bergerak di bidang pembuatan website, software, percetakan, dan sistem digital.

Gaya penulisanmu: hangat namun profesional, seperti konsultan bisnis berpengalaman yang berbicara langsung kepada calon klien.

Selalu tulis dalam Bahasa Indonesia yang baku, jelas, dan meyakinkan. Hindari kata-kata klise, jargon teknis yang membingungkan, dan kalimat pasif yang lemah.

Setiap konten harus memenuhi prinsip E-E-A-T Google: tunjukkan Pengalaman, Keahlian, Otoritas, dan Kepercayaan secara alami dalam tulisan.`;

  const postRewrite = `Tulis ulang artikel blog berikut sesuai standar SEO modern untuk pasar Indonesia.

ATURAN WAJIB:
- Judul (title): maksimal 60 karakter, mengandung kata kunci utama di awal kalimat, menggunakan angka atau kata daya tarik jika relevan (contoh: "5 Cara...", "Panduan Lengkap...", "Mengapa...")
- Ringkasan (excerpt): 120–155 karakter, rangkuman manfaat artikel yang mengundang klik, mengandung kata kunci utama
- Isi artikel (body): minimal 300 kata, dibagi dalam 3–5 paragraf yang mengalir. Paragraf pertama harus menjawab search intent pembaca secara langsung. Sisipkan kata kunci pendukung secara alami setiap 100–150 kata. Gunakan kalimat aktif dan konkret.
- Akhiri dengan kalimat penutup yang membangun kepercayaan dan mendorong pembaca mengambil langkah berikutnya.
- Jangan gunakan bullet points berlebihan — gunakan paragraf naratif.`;

  const serviceRewrite = `Tulis ulang halaman layanan ini agar persuasif, berorientasi pada kebutuhan klien, dan optimal untuk mesin pencari.

ATURAN WAJIB:
- Judul (title): maksimal 60 karakter, mencantumkan nama layanan + lokasi atau manfaat utama jika memungkinkan (contoh: "Jasa Pembuatan Website Profesional Surabaya")
- Ringkasan (excerpt): 120–155 karakter, menyebutkan layanan utama + keunggulan/keuntungan utama bagi klien
- Isi konten (body): 250–400 kata. Mulai dengan kalimat yang langsung menyentuh masalah atau kebutuhan klien. Jelaskan solusi yang ditawarkan dengan bahasa manfaat (bukan fitur). Sisipkan sinyal kepercayaan seperti pengalaman, jaminan, atau angka nyata jika ada. Tutup dengan ajakan bertindak yang mengandung kata kunci utama (contoh: "Konsultasikan kebutuhan website Anda sekarang").
- Gunakan kata kunci berbasis lokasi dan layanan secara alami (contoh: "di Surabaya", "untuk bisnis UMKM").`;

  const projectRewrite = `Tulis ulang halaman portofolio/studi kasus ini seperti kisah sukses yang membangun kepercayaan dan mendorong konversi.

ATURAN WAJIB:
- Judul (title): maksimal 60 karakter, menyebutkan jenis proyek + hasil atau nama klien (contoh: "Website Toko Online untuk Brand Fashion Lokal Surabaya")
- Ringkasan (excerpt): 120–155 karakter, gambaran singkat proyek: apa yang dibuat, untuk siapa, dan hasilnya
- Isi konten (body): 200–350 kata. Susun dalam format narasi: (1) Latar belakang & kebutuhan klien, (2) Solusi yang kami rancang, (3) Hasil & dampak nyata yang dicapai. Gunakan angka konkret jika tersedia (contoh: "meningkatkan traffic 40%", "selesai dalam 14 hari"). Tutup dengan kalimat yang mengundang calon klien baru untuk menghubungi Kotacom.
- Sertakan kata kunci kategori layanan dan lokasi secara alami untuk mendukung SEO halaman portofolio.`;

  await client.patch(doc._id).set({
    prompts: {
      globalSystem: doc?.prompts?.globalSystem || globalSystem,
      postRewrite: doc?.prompts?.postRewrite || postRewrite,
      serviceRewrite: doc?.prompts?.serviceRewrite || serviceRewrite,
      projectRewrite: doc?.prompts?.projectRewrite || projectRewrite,
    }
  }).commit();
  console.log("Success");
}

run().catch(console.error);
