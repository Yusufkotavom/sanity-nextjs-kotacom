import { loadSanityEnv, createSanityWriteClient } from "./lib/sanity-page-guards.mjs";
import crypto from "crypto";

async function main() {
  await loadSanityEnv();
  const client = await createSanityWriteClient();

  const docId = "service-location-jasa-cetak-buku-surabaya";
  
  const structured = {
    primaryKeyword: "Jasa Cetak Buku Surabaya",
    secondaryKeywords: ["Print on Demand Surabaya", "Cetak Offset Massal", "Cetak Buku Jilid Lem Panas", "Cetak Custom Cover Buku"],
    description: "Layanan cetak buku profesional di Surabaya menggunakan mesin digital dan offset untuk cetak Print On Demand hingga produksi massal. Material kertas berstandar dari Bookpaper ringan hingga ArtCarton, diproses cepat dengan Quality Control ketat.",
    intro: "Mencari jasa percetakan yang dijamin jilidnya kuat, halamannya presisi, dan hasil warnanya konstan tajam? Kotacom Surabaya siap memfasilitasi produksi karya tulis atau buku modul Anda dengan standar pengecekan pra-cetak ketat dan material pabrikan terbaik—dari Bookpaper ringan yang standar novel, hingga HVS dan ArtCarton mengkilap.",
    highlights: [
      "Menggunakan kombinasi mesin digital kecepatan tinggi (Print-On-Demand) dan offset produksi besar untuk mencapai keseimbangan Biaya per Eksemplar Paling Murah.",
      "Mendukung keutuhan sampul lewat Jilid Lem Panas Penuh (Perfect Binding) dan Jahit Benang yang digaransi kuat, tidak melengkung, apalagi rontok.",
      "Pilihan material luas dan fleksibel: Sediakan Kertas Novel Bookpaper 57gr/72gr, HVS bersahaja 70gr/80gr, sampai Hardcover Eksklusif berlapis ArtCarton.",
      "Tugas pengecekan pra-cetak dieksekusi gratis untuk menekan cacat Margin/Bleed: Disediakan layanan sample (proof print) fisik 1 buah sebelum pesanan ribuan jalan.",
      "Sistem terfokus dan anti repot. Kirimkan PDF, atur durasi target tenggat waktu, dan pesanan cetak siap dikirim dengan jangkauan bebas hambatan ke seluruh kota."
    ],
    pricingPlans: [
      {
        _key: crypto.randomUUID(),
        name: "Paket POD (Cetak Satuan)",
        price: "Mulai Rp 25.000 / buku",
        description: "Ditujukan amat optimal untuk penulis yang menerbitkan secara indie, cetak tugas skripsi, atau tes proof pasar minimal.",
        recommended: false,
        items: [
          "Syarat Nol: Bisa Pesan Mulai 1 Eksemplar Saja",
          "Kualitas Warna Konstan Berkat Mesin Cetak Digital POD",
          "Kebebasan Tipe Jilid (Spiral, Softcover, atau Hardcover)",
          "Menggunakan Lapisan Laminasi Doff atau Glossy Anti Air",
          "Kecepatan Pengerjaan Ekspress di kisaran 3-5 Hari Kerja"
        ]
      },
      {
        _key: crypto.randomUUID(),
        name: "Cetak Massal (Offset)",
        price: "Mulai Rp 7.500 / buku*",
        description: "Cocok bagi penyuplai sekolah, agen modul, atau penerbit buku komersil berskala besar di atas ratusan buah.",
        recommended: true,
        items: [
          "Minimum Pencetakan Standar Pabrik: Mulai 200 hingga 500+ unit",
          "Ongkos Produksi (Cost) Semakin Dipangkas Drastis Jika Jumlah Naik",
          "Sangat Cocok untuk HVS Hitam-Putih Skala Modul Pendidikan",
          "Konsistensi Offset Mencegah Margin dan Akurasi Berpindah / Rusak",
          "Draft Cetak Gratis Diserahkan Ke Klien Sebelum Mesin Memproduksi Ribuan",
          "Jaminan Keamanan Logistik Rapi Sampai Depan Pintu Gudang/Kantor"
        ]
      }
    ],
    testimonials: [
      {
        _key: crypto.randomUUID(),
        client: "Ahmad Rida - Penulis Self-Publishing",
        quote: "Mulai bikin 25 buah novel indie secara POD di mari. Bookpapernya grade premium, enak dilihat. Terpenting, binding lem panasnya tebal ga seperti buku cetak ketengan biasa, sangat representatif buat dijual di toko buku."
      },
      {
        _key: crypto.randomUUID(),
        client: "Dian Pratama - Koordinator Pendidikan",
        quote: "Langganan buat ngeprint 3000 buku Panduan LKS Siswa Surabaya. Dari pra-cetak CS nya sangat informatif nanyain margin biar nggak kepotong waktu dipangkas sama pisau pabrik, pelayanannya beda jauh kualitas QC-nya!"
      },
      {
        _key: crypto.randomUUID(),
        client: "Arifin J. - Event Organizer Anime",
        quote: "Nge-print artbook fanmerch pakai ArtPaper full color. Resolusi monitor ga pecah dan bleeding warna cerahnya bener bener mulus terjaga sempurna. Top recommended!"
      }
    ],
    faqs: [
      {
        _key: crypto.randomUUID(),
        question: "Apakah bisa cuma cetak satu atau dua buah buku saja untuk keperluan tugas / proof (cek cetak test)?",
        answer: "Tak perlu pusing, karena kami memfasilitasi kebutuhan mesin Print-On-Demand (POD) secara khusus agar penerbit mandiri (indie) atau pelajar bisa mencetak tanpa minimal pembelian. 1-2 buku saja tetap kami eksekusi dengan laminasi standar kualitas toko."
      },
      {
        _key: crypto.randomUUID(),
        question: "Persepsi standar tentang Bookpaper dan HVS perbedaannya apa saja untuk materi kami?",
        answer: "Kertas warna krem sejuk (Bookpaper garmasi 57/72 gsm) kami kerahkan untuk meminimalisir lelah mata dan biasanya terpakai untuk penerbitan buku novel serta cerpen. Sedangkan bahan putih (HVS bersih 70/80 gsm) adalah bahan baku tangguh untuk peredaran modul pembelajaran, buku gambar atau LKS (Lembar Kerja), di mana tulis/corat sering dibutuhkan pembaca."
      },
      {
        _key: crypto.randomUUID(),
        question: "Bolehkah minta disediakan tester (Sample Proof) cetak 1 (Satu) sampel saja sebelum produksi proyek ribuan cetak masuk mesin offset?",
        answer: "Diwajibkan! Layanan proof print ini gratis untuk order massal untuk mengamankan kalibrasi foto/grafis dan batas potongan (bleed) tidak meleset serta ketebalan cover bisa divalidasi dan diacc Anda terlebih dahulu."
      }
    ]
  };

  console.log('Patching structured object over the DB...');
  await client.patch(docId).set({ structured }).commit();
  console.log("Success patched!");
}

main().catch(console.error);
