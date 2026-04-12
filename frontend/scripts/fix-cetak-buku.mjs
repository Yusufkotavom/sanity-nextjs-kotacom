import { loadSanityEnv, createSanityWriteClient } from "./lib/sanity-page-guards.mjs";
import crypto from "crypto";

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  const query = `*[_type == "pageTemplate" && slug.current match "*cetak-buku*"][0]`;
  const doc = await client.fetch(query);
  
  if (!doc) {
    console.log("Not found!");
    return;
  }
  
  console.log(`Found doc: ${doc._id} (${doc.slug?.current}). Patching...`);

  // Preserve existing array keys if any, otherwise just blast over
  const structured = {
    ...doc.structured,
    primaryKeyword: "Jasa Cetak Buku Surabaya",
    description: "Layanan percetakan cetak buku profesional di Surabaya untuk penulis, penerbit, dan sekolah. Menyediakan cetak Print on Demand (POD) satuan hingga cetak massal offset dengan opsi material Bookpaper dan Artcarton.",
    intro: "Mencari jasa percetakan yang dijamin jilidnya kuat, halamannya presisi, dan hasil warnanya konstan tajam? Kotacom siap memfasilitasi produksi karya tulis Anda dengan standard Quality Control yang tertata mulai dari pra-cetak (pre-press) hingga eksekusi purna produksi.",
    highlights: [
      "Kualitas cetak konstan bebas buram berkat pengerjaan dengan mesin digital presisi dan offset terkini.",
      "Menyediakan lengkap variasi bahan Premium: Bookpaper 57/72gr standar novel fiksi, HVS putih cerah, hingga Artpaper dan Artcarton mengkilap.",
      "Kualitas Lem Jilid Panas (Perfect Binding) dan Opsi Jahit Benang dipastikan merekat abadi, aman dari kendala halaman rompal atau lepas.",
      "Tidak memberatkan dengan minimal order—melayani cetak 1 (satu) buah uji coba (POD) sampai angka ratusan dan ribuan eksemplar offset sekaligus.",
      "Pendampingan tuntas pra-produksi: Tim ahli akan memeriksa Bleed (margin batas pangkas cetak), resolusi gambar, layout, hingga memberikan proof sample gratis sebelum produksi massal berjalan."
    ],
    pricingPlans: [
      {
        _key: crypto.randomUUID(),
        name: "Paket POD (Print on Demand)",
        price: "Mulai Rp 25.000 / buku",
        description: "Dirancang optimal untuk penulis mandiri (indie), tes penetrasi pasar (prototip cover), maupun tugas pendidikan skala kecil.",
        recommended: false,
        items: [
          "Tanpa Minimum Batas Eksemplar (Mulai 1 Buku)",
          "Cover Hardcover Eksklusif / Softcover AC 260gr",
          "Kertas Isi HVS atau Bookpaper",
          "Finishing Laminasi Doff Elegan / Glossy Premium",
          "Perekatan Kuat Perfect Binding",
          "Kecepatan Pengerjaan Mesin Digital (3-5 Hari Kerja)"
        ]
      },
      {
        _key: crypto.randomUUID(),
        name: "Cetak Massal Offset Produksi",
        price: "Volume Based Pricing",
        description: "Menjawab kebutuhan penerbit, supply pengadaan buku pelajaran massal, atau agen LKS daerah dengan cost-per-page jauh lebih menekan.",
        recommended: true,
        items: [
          "Minimum Pengerjaan Mesin 500+ Eksemplar",
          "Cost per-Unit Dicincang Lebih Minimal (Efisiensi Budget)",
          "Konsistensi Akurasi Warna dari Eksemplar 1 hingga Ribuan",
          "Kemampuan Custom Cetak Emboss / Spot UV Foiling",
          "Diberikan Draft Proof Print Fisik Gratis Sebelum Tahap Masif",
          "Termasuk Dukungan Logistik Pengiriman Aman Massal"
        ]
      }
    ],
    serviceTypes: [
      {
        _key: crypto.randomUUID(),
        title: "Cetak Novel & Fiksi Kertas Kuning",
        description: "Produksi buku fiksi memukau dengan berat yang nyaman di genggaman, standard gramasi khas toko di pasaran.",
        items: ["Kertas Ringan Bookpaper 57/72gr", "Cover Bertebal Art Carton Presisi", "Pilihan Cover Foil/Emboss", "Lem Panas dan Jahit Benang Bebas Rontok"]
      },
      {
        _key: crypto.randomUUID(),
        title: "Modul Praktikum & Cetak Buku Pelajaran",
        description: "Ketepatan kecepatan bagi penyediaan sekolah dan perkuliahan. Menggunakan material putih andal bagi coretan pensil dan peninta siswa.",
        items: ["Kertas HVS 70gr atau 80gr Terang", "Pencetakan High-Speed Offset Massal", "Custom Penomoran/ISBN Margin Presisi", "Potongan Diskon Bulk Edukasi Terpadu"]
      },
      {
        _key: crypto.randomUUID(),
        title: "Profil Perusahaan (Company Profile) & Katalog",
        description: "Kartu AS perusahaan Anda yang mewah untuk disuguhkan ke calon prospek kakap, dengan tekstur material eksklusif super solid.",
        items: ["Pemakaian Art Paper Halus Tahan Tinta", "Reprographics Full Color Premium", "Opsi Pemilihan Jilid Hardcover Kaku", "Opsi Spiral Kawat Mewah Tahan Bekuk"]
      }
    ],
    testimonials: [
      {
        _key: crypto.randomUUID(),
        client: "Ahmad Rida - Penulis Self-Publishing",
        quote: "Udah dua kali masukin draft novel saya buat diprint massal pakai sistem POD di sini. Kualitas bookpapernya the best, teks nge-bold rapi gak nyampur tintanya. Lemnya juga aman walau ketekuk parah."
      },
      {
        _key: crypto.randomUUID(),
        client: "Dian Pratama - Koordinator Universitas",
        quote: "Sangat menolong banget deadline ngeprint ribuan lembar modul dan LPJ kampus akhir tahun. CS informatif ngabarin proses trimming sampa bindingnya jadi pikiran kita lega."
      },
      {
        _key: crypto.randomUUID(),
        client: "Arifin J. - Event Organizer Surabaya",
        quote: "Bikin zine sama katalog merchandise buat event anime bareng Kotacom sangat fast response. Sempet takut bleeding warnanya pecah, eh taunya mulus warnanya persis file kalibrasi monitor."
      }
    ],
    faqs: [
      {
        _key: crypto.randomUUID(),
        question: "Apakah bisa cuma order cetak satuan / 1 buku aja?",
        answer: "Tentu dong! Kotacom menyediakan jalur layanan Print-On-Demand (POD) lewat mesin digital. Jadi Anda tetap dilayani penuh tanpa syarat minimal 500 eksemplar."
      },
      {
        _key: crypto.randomUUID(),
        question: "Jenis standar kertas buku yang sering di industri toko buku itu menggunakan apa?",
        answer: "Umumnya untuk buku cerita atau fiksi novel yang ringan adalah memakai varian 'Bookpaper' tebal 57gr maupun 72gr. Sedangkan buku pengayaan edukasi atau modul LKS mayoritas mencetak di atas material kertas HVS putih."
      },
      {
        _key: crypto.randomUUID(),
        question: "Bolehkah saya minta diprint 1 buku 'tester' sebelum jalan cetak di atas 1000 eksemplar?",
        answer: "Fasilitas cetak sampel (Proof Print) justru kami utamakan agar Anda bisa memeriksa hasil kalibrasi pewarnaan gambar isi, margin pangkas (trim), serta daya rekat jilid supaya menghindari kesalahan pencetakan masif berkelanjutan."
      }
    ]
  };

  await client.patch(doc._id).set({
    structured: structured
  }).commit();
  console.log("Success patched", doc._id);
}

main().catch(console.error);
