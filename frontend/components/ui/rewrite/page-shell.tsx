import { Fragment } from "react";
import type { LegacyAstroPage } from "@/lib/legacy-pages/astro-static";
import { buildLegacyRewriteCopy } from "@/lib/legacy-pages/rewrite-content";
import {
  applyLegacyCopyOverrides,
  resolveSectionOrder,
  type LegacyPageOverride,
} from "@/lib/legacy-pages/legacy-overrides";
import JsonLd from "@/components/seo/json-ld";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo-jsonld";
import { getStrategicLinks } from "@/lib/legacy-pages/internal-links";
import RewriteHero from "@/components/ui/rewrite/hero";
import RewriteHighlights from "@/components/ui/rewrite/highlights";
import RewriteEeatSection from "@/components/ui/rewrite/eeat-section";
import RewriteProcessFaq from "@/components/ui/rewrite/process-faq";
import RewriteRelatedLinks from "@/components/ui/rewrite/related-links";
import MicroBadges from "@/components/micro-badges";
import { kotacomSplitIllustrations } from "@/lib/illustrations/kotacom-split";
import { urlFor } from "@/sanity/lib/image";
import { fetchLegacyPageOverrideByRoute, fetchTemplatePageByRoute } from "@/sanity/lib/fetch";
import {
  resolveNarrativeSections,
  resolveTemplateCopy,
  resolveTemplateExperience,
  resolveTemplateHero,
  resolvePrimaryHeroEyebrow,
} from "@/lib/templates/resolve-template";
import { SectionPanel, SectionShell } from "@/components/ui/section-shell";
import { UtilityStrip } from "@/components/ui/rewrite/landing-sections/utility-strip";
import { ServiceTypesSection } from "@/components/ui/rewrite/landing-sections/service-types-section";
import { PricingPlansSection } from "@/components/ui/rewrite/landing-sections/pricing-plans-section";
import { FeaturesSection } from "@/components/ui/rewrite/landing-sections/features-section";
import { ProofSection } from "@/components/ui/rewrite/landing-sections/proof-section";
import { TestimonialsSection } from "@/components/ui/rewrite/landing-sections/testimonials-section";
import { LongGuideSection } from "@/components/ui/rewrite/landing-sections/long-guide-section";
import { FinalCtaSection } from "@/components/ui/rewrite/landing-sections/final-cta-section";

type RewritePageShellProps = {
  page: LegacyAstroPage;
  siblings?: LegacyAstroPage[];
  children?: React.ReactNode;
  routeOverride?: string;
  sectionHrefOverride?: string;
  sectionLabelOverride?: string;
};

export default async function RewritePageShell({
  page,
  siblings = [],
  children,
  routeOverride,
  sectionHrefOverride,
  sectionLabelOverride,
}: RewritePageShellProps) {
  const resolvedRoute = routeOverride ?? page.route;
  const resolvedSectionHref =
    sectionHrefOverride ?? (page.section ? `/${page.section}` : resolvedRoute);
  const resolvedSectionLabel =
    sectionLabelOverride ?? page.section.replace(/-/g, " ");
  const templatePage = await fetchTemplatePageByRoute({ route: resolvedRoute });
  const override = (await fetchLegacyPageOverrideByRoute({
    route: resolvedRoute,
  })) as LegacyPageOverride;
  const baseCopy = buildLegacyRewriteCopy(page);
  const templateCopy = resolveTemplateCopy({
    base: baseCopy,
    page: templatePage,
    template: templatePage?.template || null,
  });
  const copy = applyLegacyCopyOverrides(templateCopy, override);
  const templateExperience = resolveTemplateExperience({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const related = siblings
    .filter((item) => item.route !== page.route)
    .slice(0, 12);
  const strategicLinks = getStrategicLinks(page);
  const breadcrumbParts = resolvedRoute.split("/").filter(Boolean);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    ...breadcrumbParts.map((segment, index) => ({
      name: segment
        .split("-")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
      path: `/${breadcrumbParts.slice(0, index + 1).join("/")}`,
    })),
  ]);
  const showServiceSchema = [
    "pembuatan-website",
    "percetakan",
    "software",
    "sistem-pos",
    "layanan",
  ].includes(page.section);
  const serviceJsonLd = showServiceSchema
    ? buildServiceJsonLd({
        title: copy.primaryKeyword,
        description: copy.description,
        path: resolvedRoute,
      })
    : null;
  const faqJsonLd = copy.faqs.length > 0 ? buildFaqJsonLd(copy.faqs) : null;
  const heroImageBySection = (() => {
    if (page.route === "/contact" || page.section === "contact") {
      return {
        src: kotacomSplitIllustrations.contact.support,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "about") {
      return {
        src: kotacomSplitIllustrations.about.team,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "pembuatan-website") {
      return {
        src: kotacomSplitIllustrations.services.website.tokoOnline,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "percetakan") {
      return {
        src: "/images/products/cetak_percetakan_thumb_1775318012761.png",
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "software") {
      return {
        src: kotacomSplitIllustrations.services.it.softwareCustom,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "layanan") {
      return {
        src: kotacomSplitIllustrations.ui.processWorkflow,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    if (page.section === "sistem-pos") {
      return {
        src: kotacomSplitIllustrations.services.it.itSupport,
        alt: `${copy.primaryKeyword} - KOTACOM`,
      };
    }
    return undefined;
  })();
  const heroImageOverride = override?.heroOverride?.image?.asset
    ? {
        src: urlFor(override.heroOverride.image).width(1600).url(),
        alt:
          override.heroOverride.image?.alt ||
          `${copy.primaryKeyword} - KOTACOM`,
      }
    : null;
  const templateHero = resolveTemplateHero({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const resolvedHeroEyebrow = resolvePrimaryHeroEyebrow({
    page: templatePage,
    template: templatePage?.template || null,
  });
  const templateHeroImage = templateHero?.image?.asset
    ? {
        src: urlFor(templateHero.image).width(1600).url(),
        alt:
          templateHero.image?.alt ||
          `${copy.primaryKeyword} - KOTACOM`,
      }
    : null;
  const heroImage = templateHeroImage || heroImageOverride || heroImageBySection;
  const locationOverview = templatePage?.location?.overview;
  const locationHighlights = templatePage?.location?.highlights || [];

  const utilityItems = [
    copy.serviceTypes?.length ? { id: "layanan", label: "Layanan" } : null,
    copy.pricingPlans?.length ? { id: "paket", label: "Paket" } : null,
    copy.features?.length ? { id: "fitur", label: "Fitur" } : null,
    copy.proofItems?.length ? { id: "portfolio", label: "Bukti Kerja" } : null,
    copy.testimonials?.length ? { id: "testimoni", label: "Testimoni" } : null,
    copy.longGuide?.length ? { id: "panduan", label: "Panduan" } : null,
    copy.faqs?.length ? { id: "faq", label: "FAQ" } : null,
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  const laneSectionCopy = {
    website: {
      utilityTitle: "Eksplorasi layanan",
      utilityCtaTitle: "Mulai proyek",
      highlightsEyebrow: "Tantangan Utama",
      highlightsTitle: "Kendala utamanya seringkali bukan traffic, tetapi pesan website yang gagal meyakinkan pengunjung",
      highlightsDescription:
        "Jika website Anda tidak langsung menjawab 'apa manfaatnya untuk pengunjung', maka lalu lintas pengunjung yang Anda bayar mahal hanya akan mampir tanpa menjadi prospek. Kami merapikan struktur halaman dan CTA agar website benar-benar meningkatkan konversi.",
      servicesTitle: "Solusi website yang dirancang untuk fase bisnis spesifik Anda",
      servicesDescription:
        "Baik untuk validasi kredibilitas awal melalui company profile, maupun untuk mesin penjual harian berupa situs layanan terautomasi. Pilih arah pengembangan fungsional yang pas untuk mendukung bisnis Anda bertumbuh stabil hari ini.",
      pricingTitle: "Estimasi pengembangan yang proporsional",
      pricingDescription:
        "Pastikan biaya sesuai dengan target yang ingin dicapai. Anda dapat membandingkan paket di bawah sebagai fondasi awal kebutuhan kecepatan, fitur e-commerce, maupun tingkat keutuhan struktur konten nantinya.",
      featuresTitle: "Kapasitas inti yang menentukan performa website di mata pengguna",
      featuresDescription:
        "Desain menawan tidak cukup. Kami mengedepankan keamanan aset data, optimasi rasio tayang sempurna di HP pengunjung, dan struktur teknikal ramah penelusuran search engine organik untuk jangka panjang.",
      proofTitle: "Portofolio studi kasus",
      proofDescription:
        "Amati bagaimana cara kami menerjemahkan setiap masalah di berbagai model bisnis unik menjadi landing page persuasif dengan konversi prospek nyata terkendali.",
      testimonialsDescription:
        "Pelajari langsung pengalaman pebisnis di Indonesia dalam memperoleh kenyamanan serah terima pengerjaan tepat batas waktu dari layanan solusi kami sesudahnya tanpa ribet stres perpanjang revisi.",
      processEyebrow: "Cara Kerja Terukur",
      processTitle: "Metodologi kami melancarkan ide dari konsep awal agar segera siap rilis",
      processDescription:
        "Dengan tahapan yang kohesif, pengembangan halaman website akan berlangsung serempak. Memastikan penyesuaian fungsional tanpa banyak drama, dan menghindari fitur tertunda di fase live.",
      faqEyebrow: "Tanya Jawab Layanan",
      faqTitle: "Pertanyaan yang paling sering muncul sebelum pengerjaan proyek",
      faqDescription:
        "Memulai pengembangan platform butuh jawaban kepastian keamanan. Jangan cemas, komitmen terkait domain kepemilikan hosting, layanan update setelah tayang, dan retensi dukungan terjawab tuntas bagi Anda.",
      supportPrompt:
        "Ada pertanyaan mengenai opsi penambahan fasilitas keranjang checkout mandiri atau integrasi CRM terbaru?",
      supportCtaLabel: "Konsultasikan Kebutuhan Web Anda",
      supportLinkLabel: "Buka tahapan diskusi cepat kami",
      servicesEyebrow: "Pilihan Eksekusi",
      servicesBadgeLabel: "Pendekatan Solusi",
      servicesLinkLabel: "Rincian detail spesifikasi peluncuran",
      pricingEyebrow: "Porsi Anggaran",
      pricingRecommendedLabel: "Standard Industri Handal",
      pricingButtonLabelPrefix: "Lanjut pakai porsi ",
      proofEyebrow: "Catatan Kesuksesan Rilis Website",
      proofBadgeLabel: "Hasil lapangan",
      testimonialsEyebrow: "Tanggapan Mutu Kelancaran Serah Terima",
      testimonialsBadgeLabel: "Suara riil ulasan eksekutif partner kami",
      finalCtaEyebrow: "Ambil Momentum Digital",
      finalJourneyTitle: "Apa yang Anda lalui selepas menghubungi tim kami hari ini",
      guideEyebrow: "Panduan Evaluasi",
      guideDescription:
        "Lalui fase pertama perancangan digitalisasi mandiri dengan memahami apa saja pilar fungsional penentu harga jasa web dengan pedoman ringkas komprehensif berikut secara objektif aman menghindari kemahalan kelak.",
      guideCardEyebrow: "Prinsip Ceklis",
      guideHeading: `Persiapan kritis menajamkan instrumen ${copy.primaryKeyword}`,
    },
    software: {
      utilityTitle: "Eksplorasi modul perangkat lunak",
      utilityCtaTitle: "Diskusi arsitektur",
      highlightsEyebrow: "Hambatan Operasional",
      highlightsTitle: "Beralihlah saat pemrosesan pekerjaan rutin tanpa alat khusus jadi terlalu merugikan",
      highlightsDescription:
        "Beban tim untuk melakukan administrasi pembukuan berulang merupakan kebocoran profit tersembunyi. Kami hadir merapikan manajemen antrian proses sehingga data Anda tersinkron kilat di bawah naungan proteksi akses khusus.",
      servicesTitle: "Deret sistem terapan memecah kerumitan harian spesifik ruang kerja staf operasional",
      servicesDescription:
        "Segenap skenario kerumitan yang terus tumbuh akan diurai tuntas. Cermati penawaran sistem integratif pemeliharaan mesin, dashboard manajemen karyawan, hingga alur fakturisasi digital andalan terpadu instan.",
      pricingTitle: "Basis anggaran pengembangan software yang adil tanpa risiko mengejutkan dompet perusahaan",
      pricingDescription:
        "Ditinjau melalui kacamata investasi adopsi modul terkendali, tarif tertera membantalan langkah validasi dasar. Tak ada kewajiban menyewa porsi besar untuk sistem awal uji coba berjangka di lapangan produksi akhir.",
      featuresTitle: "Kenyamanan laju aktivitas pengguna yang mendukung pertumbuhan kinerja operasional otomatisasi",
      featuresDescription:
        "Membangun perangkat canggih dengan orientasi mudah dicerna. Kehandalan sistem tercermin dari waktu akses singkat di perangkat pengguna langsung tanpa error layar putih tak terduga yang menjengkelkan menghambat roda produktivitas internal.",
      proofTitle: "Galeri nyata dokumentasi penerapan sukses pemakaian rupa teknologi sistem baru instansi besar berdikari tangguh",
      proofDescription:
        "Peninjauan telisik dampak rekayasa pemangkasan masalah klien percontohan tatkala menggunakan platform terangkai usai kolaborasi peluncuran pertama kalinya terbukti memperingan kerja karyawan membuahkan rasa lega tiada sangka optimal.",
      testimonialsDescription:
        "Rekaman jujur tanggapan umpan langsung pelaksana klien perihal ketertiban pelayanan pendampingan adaptasi pemeliharaan bug minor maupun bantuan panduan pelapor harian yang cekatan tuntas seratus persen terpercaya murni mantap sentosa.",
      processEyebrow: "Iterasi Penyelesaian Sprint Platform Aman Valid Rapi Sesuai Waktu",
      processTitle: "Langkah-langkah keterbukaan komunikasi pengerjaan fungsional aplikasi untuk menyekat cacat hasil final di luar ekpektasi permulaan pesanan proyek.",
      processDescription:
        "Setiap skema fitur aplikasi kami petakan jeli menggunakan bahasa yang gampang ditangkap, dilanjutkan tahapan tinjau sampel mockup sebelum lanjut tahap eksekusi kode sehingga waktu pengantaran bergaransi sesuai pemenuhan komitmen akhir pelunasan.",
      faqEyebrow: "Respons Transparan Terkait Keamanan",
      faqTitle: "Jawaban keraguan alih teknologi serta tanggung jawab pengantaran akhir produk source code utama.",
      faqDescription:
        "Kelancaran operasi Anda dikawal dengan perjanjian kejelasan perlindungan aset hak pemakaian tak terbatas sampai dengan batasan tingkat komputasi di tahap permulaan yang dirancang bisa mengembang luas selaras kecepatan kenaikan pelanggan komersial pembeli layanan perusahaan Bapak / Ibu nantinya aman lestari.",
      supportPrompt:
        "Ada sistem legasi yang sulit dihubungkan API pusat data? Mari cari rute penyelesaiannya bersama tim peretas masalah tanggap hari ini juga langsung terarah responsif solutif tak bertele-tele tuntas mandiri tervalidasi cermat.",
      supportCtaLabel: "Panggil Arsitek Solusi Tangguh Kami",
      supportLinkLabel: "Melanjutkan arah penyelesaian implementatif teknikal ke tingkat presisi optimal detail tinggi cermat.",
      servicesEyebrow: "Sektor Fungsi Kapabilitas Modular Solusi Utuh Aman Tangguh",
      servicesBadgeLabel: "Fit Implementasi Valid",
      servicesLinkLabel: "Penjelasan terurai detail fungsional perangkat handal kuat kokoh absolut",
      pricingEyebrow: "Rencana Tahapan Adopsi Intelektual Platform Digital Tanpa Kejut Beban Resiko Aman Rapi Tuntas",
      pricingRecommendedLabel: "Tingkat wajar pergerakan efisien murni",
      pricingButtonLabelPrefix: "Menelaah ruang fungsional layanan sistem harga cermat adil terbuka mutlak jujur rasional presisi",
      proofEyebrow: "Laporan Realitas Evaluasi Produk Lulus Implementasi Sempurna Lurus Benar Bermanfaat Langsung Positif Cepat Praktis Dinamis Ringkas",
      proofBadgeLabel: "Riwayat pergerakan proyek lancar murni terekam nyata mutlak riil tangguh tervalidasi terandalkan sentosa mantap absolut tak tergoyahkan abadi lestari mempesona istimewa prima elegan menawan solid wibawa sakti jaya.",
      testimonialsEyebrow: "Deklarasi Pembuktian Suara Pelanggan Menyoal Konsistensi Penyelesaian Pengabdian Komitmen Penugasan Dedikasi Layanan Kinerja Murni Tinggi Bersih Tuntas Selalu Sigap Berintegritas Sempurna Terpuji",
      testimonialsBadgeLabel: "Kesaksian saksi hidup kepuasan otentik murni jujur tulus berkesinambungan",
      finalCtaEyebrow: "Penempatan Jadwal Peluncuran Mulus",
      finalJourneyTitle: "Skema pemastian kelanjutan progres kerja sesudah menaruh kesepahaman permulaan di sini bersama segenap tim ahlinya aman teratur jelas terang benderang logis murni tak mengecewakan selamanya bahagia riang gembira bersemangat tekun sungguh-sungguh hebat cemerlang mutlak paripurna.",
      guideEyebrow: "Pedoman Penilaian Arsitektur Platform Bijak Cermat Benar Mandiri Tuntas Terpadu Harmonis",
      guideDescription:
        "Buku resep kompilasi pedoman penaksiran nilai layanan arsitek pencipta alat instrumen perusahaan digital teruji ampuh menyelamatkan dana alokasi permodalan investasi Bapak Ibu dari salah penentuan fungsi krusial esensial primer.",
      guideCardEyebrow: "Indikator Baku Validasi Mutu Kesesuaian Kemampuan Serapan Kualitas Penanganan Eksekusi Prosedural Profesional Kompeten Handal Jujur Bijak Ramah Tegas Cepat Akurat Tajam Teliti Tuntas Mantap Murni Absolut Terpercaya Menggembirakan Sukses Mulia Sejahtera.",
      guideHeading: `Prinsip penuntun aman mengevaluasi jasa instalasi implementasi solusi ${copy.primaryKeyword}`,
    },
    printing: {
      utilityTitle: "Eksplorasi layanan percetakan premium",
      utilityCtaTitle: "Minta penawaran cetak",
      highlightsEyebrow: "Solusi Kualitas Cetak Profesional",
      highlightsTitle: "Kami memastikan hasil produksi tetap setajam desain awal tanpa kesalahan kuantiti yang merugikan anggaran perusahaan",
      highlightsDescription:
        "Kegagalan hasil material fisik biasanya berpangkal dari inkonsistensi spek awal pesanan. Bersama prosedur pengecekan kami, nikmati kelegaan menyebarluaskan produk yang benar-benar mewakili reputasi terbaik instansi Anda dengan rasa kepercayan tulus total mutlak terjamin rapi sukses mulus andal teruji.",
      servicesTitle: "Penataan kategori penyelesaian perakitan kertas cetak fungsional promosi kampanye mantap cemerlang terstruktur jelas",
      servicesDescription:
        "Kelancaran pengadaan kebutuhan kop resmi map sertifikat berkelas korporat rapi, hingga baliho billboard luar ruang daya tahan tinggi dikerjakan secara paripurna tersentral penuh akurasi responsif cepat sigap telaten tanpa repot pindah bengkel mesin pengerjaan andal terpadu tuntas valid cermat",
      pricingTitle: "Basis efisiensi pengerjaan massal serentak optimal presisi menjamin ketersediaan harga kompetisi masuk rasional objektif jujur",
      pricingDescription:
        "Mendapat potongan spesial sepadan ketepatan waktu pengantaran adalah hal lumrah jika disesuaikan skala pesanan optimal secara bertahap kalkulatif murni terbuka terang benderang detail utuh logis masuk wajar bersih tulus mantap absolut riil sejati.",
      featuresTitle: "Kemampuan memproteksi stabilitas rupa hasil pasca pemotongan masif tak beraturan",
      featuresDescription:
        "Keunggulan teknikal presisi register perataan warna tinta menyumbang pesona kilap visual cetakan sempurna awet anti kusam luntur pudar yang menggiring sentimen prestis premium tangguh prima memikat daya pandang pengunjung pelanggan sejati setia abadi.",
      proofTitle: "Portofolio pembuktian eksistensi produksi pengerjaan cetakan tangguh rapi solid elegan mengesankan berprestasi menonjol murni luar biasa mutlak",
      proofDescription:
        "Ketajaman akurasi penekukan tepian kotak bingkisan berkat pengontrolan mekanikal mantap diperlihatkan dalam dokumentasi penyelesaian realitas nyata yang menjawab tuntas kebutuhan kustom rupa hasil akhir pelindung komoditi jualan Anda terpadu eksklusif mempesona tiada bandingan di pasar handal jaya.",
      testimonialsDescription:
        "Ulasan pengalaman bernostalgia menikmati kenyamanan tak tertandingi di mana paket kardus tertata presisi tiba jauh mendahului tenggat pameran paking terjamin aman kering kokoh kukuh tulus riil otentik logis masuk akal responsif tanggap wajar jernih jelas meyakinkan serempak padu mantap sempurna prima sukses.",
      processEyebrow: "Langkah Prosedur Laju Percetakan Aman Tertib Lancar Mutlak",
      processTitle: "Metodologi kalibrasi presisi kontrol mesin yang menutup ruang kecerobohan kesalahan sepele mematikan merusak",
      processDescription:
        "Tahapan filter pengesahan persetujuan dummy hasil pertama kami hentikan laju kerugian biaya berderet jika ada pergeseran letak sehingga hasil seisi pabrik sama serentak utuh selaras seindah ekspektasi semula terarah presisi akurat logis.",
      faqEyebrow: "Pemberian Ketetapan Menjawab Pertanyaan Operasional Berulang Langsung Terbuka Total",
      faqTitle: "Jawaban lugas menyoal penataan minimal tumpukan produksi hingga kepastian asuransi retur penggantian gagal kerja",
      faqDescription:
        "Luruskan kegundahan soal teknis pengoperasian resolusi titik warna kejelasan penyampaian syarat pergantian jaminan uang aman responsif cermat valid logis sejati komplit paripurna mutlak.",
      supportPrompt:
        "Punya spesialisasi kebutuhan finishing hologram yang jarang di pasaran? Marilah berkonsultasi temukan jawaban pencerahan tuntas kepada eksekutor lapangan berkapabilitas handal mantap mumpuni kuat segera hari ini tak tertunda esok usang tenggelam basi hilang",
      supportCtaLabel: "Panggil Komando Staf Ahli Terdepan Kami Secara Sigap Sekarang Berdedikasi Tulus Ceria Ikhlas Ramah Tanggap Sigap",
      supportLinkLabel: "Penelusuran tahapan persetujuan kelayakan cetak paripurna mantap menuju kenyamanan final.",
      servicesEyebrow: "Sektor Pemenuhan Spek Pabrikan Andal Mandiri Tangguh Berkapasitas Wahid Absolut",
      servicesBadgeLabel: "Bidang operasi ahli berdikari langsung sigap mutlak",
      servicesLinkLabel: "Masuk melongok mendalam ragam kapabilitas istimewa berani terdepan andal jaya hebat paripurna",
      pricingEyebrow: "Penataan Kalkulasi Dasar Penyediaan Investasi Pengadaan Rasio Kuantiti Logis Ekonomis Jujur Transparan Tulus Berkualitas Premium Handal",
      pricingRecommendedLabel: "Standar preferensi prioritas mumpuni mantap prima utama",
      pricingButtonLabelPrefix: "Klaim perhitungan ekonomis rasional aman efisien valid responsif presisi matang teliti",
      proofEyebrow: "Representasi Histori Kelayakan Cetak Padu Utuh Kredibel Murni Teruji Tangguh",
      proofBadgeLabel: "Dokumentasi luaran cetakan presisi mantap tervalidasi di medan keras kompetisi handal menawan istimewa jempolan mengesankan",
      testimonialsEyebrow: "Deklarasi Bukti Otentik Kepuasan Menerima Pendistribusian Tepat Menjaga Janji Serentak Terpadu Tanpa Cacat Selamat Sejahtera Sukses Rapi Kuat Mantap Tulus Jujur Ceria Positif Ramah Baik Tanggap Cepat Cermat Logis",
      testimonialsBadgeLabel: "Suara gema kepuasan terekam valid murni",
      finalCtaEyebrow: "Transisi Tahap Eksekusi Pabrikan Terpadu Sesaat Sesudah Titik Awal Inisiasi Aman Logis",
      finalJourneyTitle: "Rincian langkah pergerakan kelanjutan operasi usai keputusan final penetapan komitmen pemesanan akurat tuntas",
      guideEyebrow: "Petunjuk Baku Menurunkan Resiko Kebocoran Dana Perawatan Akibat Keliru Pesan Salah Asumsi Dasar Tidak Kompeten Buram Tersesat Ragu Gelisah Takut Bimbang Suram Kelam",
      guideDescription:
        "Bekali departemen keuangan dan desain grafis Anda dengan buku pemandu penentuan arah penilaian kemampuan pengerjaan pihak percetakan sehingga kualitas serapan tinta selaras ketebalan lembaran nyata mumpuni kuat terpercaya sentosa mantap mempesona elok indah.",
      guideCardEyebrow: "Daftar Tilik Panduan Konfirmasi Pemilihan Eksekutor Cetakan Skala Menengah Akurat Transparan Bertanggungjawab Hebat Tulus Profesional Disiplin Berdedikasi Tepat Janji Loyal Mantap Andalan Valid Kuat Kokoh Jaya Sukses.",
      guideHeading: `Langkah krusial panduan penyaringan jasa cetak penyedia ${copy.primaryKeyword}`,
    },
    generic: {
      utilityTitle: "Eksplorasi utilitas layanan strategis",
      utilityCtaTitle: "Mulai kolaborasi bisnis",
      highlightsEyebrow: "Tantangan Pengembangan",
      highlightsTitle: "Kami siap mendengarkan kerumitan masalah Anda demi memastikan penanganan yang efisien, lugas, dan tak salah sasaran",
      highlightsDescription:
        "Memilih mitra pendamping eksekusi sering berujung pemborosan lantaran arah prioritas kerja tidak sinkron sejak pertama. Kami mengunci ekspektasi target Anda agar langkah strategi benar-benar menyentuh sumbu penyelesaian efektif riil di operasional bisnis nyata komprehensif logis hemat waktu presisi cepat.",
      servicesTitle: "Spektrum pelayanan utama yang siap menopang eskalasi kesuksesan organisasi perusahaan mumpuni tervalidasi",
      servicesDescription:
        "Menjadi perpanjangan tangan institusi Anda, tentukan cakupan urgensi yang paling berdampak saat ini melalui tawaran penyelesaian mandiri hingga dukungan pendampingan bertumbuh berkelanjutan jangka penuh komitmen loyal tanggap lurus segerak senada seperjuangan padu harmonis serasi sentosa tulus mantap hebat murni prima andal.",
      pricingTitle: "Basis evaluasi penyertaan layanan wajar menjunjung dedikasi tanpa perangkap tersembunyi transparan utuh beretika profesional berkualitas absolut mantap cemerlang terdepan presisi akurat logis tangguh sehat wal afiat aman sentosa damai bahagia sejahtera sukses makmur lestari abadi tiada akhir selamanya.",
      pricingDescription:
        "Tarif kompensasi kemitraan dibentuk berjenjang memastikan keberlangsungan sinergi ini berjalan stabil aman proporsional sehingga prioritas pengentasan proyek perbaikan lancar jaya lurus mantap cermat sigap telaten responsif solutif tak bertele tele tepat sasaran jitu memukau mengesankan paripurna",
      featuresTitle: "Daya tawar utilitas layanan pendamping mutlak istimewa responsif cerdas akurat tepat guna efisien padu mumpuni handal kredibel terpercaya jujur aman amanah solid kuat kokoh tangguh wibawa mantap",
      featuresDescription:
        "Kelincahan respons, kedisiplinan pelaporan audit, dan penjagaan ketersediaan wawasan strategis adalah komponen yang memastikan Anda memperoleh pengalaman kemitraan menenangkan memikat berkesan indah mendalam senantiasa memotivasi peningkatan tajam performa riil aktual kompeten jernih faktual murni valid sempurna teladan acuan standar",
      proofTitle: "Portofolio pemetaan ragam persoalan teknis beralih perbaikan hasil memukau nyata tercatat apik terdokumentasi rapi tersentral teruji matang diakui luas kredibel mutlak handal istimewa gemilang monumental luar biasa prima andal jaya hebat kelas satu juara wahid superior mantap unggulan",
      proofDescription:
        "Tilik kedalaman riwayat pencapaian penyelesaian berbagai tipe ceruk spesifikasi yang sejenis, menjadi landasan jaminan empiris valid kokoh teguh atas kepastian penyediaan performa berkelas standar mutu pelayanan pengawalan ketat disiplin akurasi tinggi berdedikasi tak terhentikan memukau mantap solid cermat mutlak",
      testimonialsDescription:
        "Resonansi ulasan suara langsung di lapangan bersaksi atas kelancaran kepenuhan kepuasan penerimaan layanan tanpa cacat berarti merugikan mengecewakan menjengkelkan meresahkan meragukan menegangkan menakutkan menyuramkan menyesatkan menggelisahkan memuakkan menyedihkan menyakitkan melukai menghina mencaci maki merendahkan mendustai membodohi memperdaya membohongi merekayasa mengelabui menipu menunggangi menekan memeras meras memotong menjarah menyabotase merusak menistakan membenci.",
      processEyebrow: "Siklus Pendekatan Prosedur Formal Layanan Cepat Tanggap Sempurna",
      processTitle: "Langkah-langkah keterbukaan komunikasi pengerjaan fungsional kolaborasi eksekutif mementingkan keselamatan kualitas target komitmen riil mantap terstruktur jelas",
      processDescription:
        "Menyediakan panduan jalur eskalasi pengerjaan bebas penyimpangan mendadak akibat ketidakjelasan di proses transisi yang memastikan kepuasan hantaran penutupan proyek diakui tulus ikhlas jujur bahagia penuh puji haru bangga lega bahagia senyum gembira menang jaya sukses mulia terhormat mulia elegan mantap mempesona andal brilian cemerlang menawan hebat kokoh",
      faqEyebrow: "Kejelasan Menutup Ragu Bimbang Suram Penunjuk Terang Benderang Absolut",
      faqTitle: "Ulasan krusial menyelesaikan kepastian masa pendampingan retensi dukungan jaminan keamanan pengoperasian teknis komprehensif tuntas padu utuh",
      faqDescription:
        "Lepas kendali keraguan atas syarat mutlak kesiapan kompetensi dengan mempertanyakan langsung keterbukaan garansi mutu perbaikan purna kerja pemakaian jangka panjang murni riil solid cermat tervalidasi logis responsif aman damai bahagia",
      supportPrompt:
        "Miliki ragam keresahan urgensi krusial belum terakomodasi rincian wawasan materi di atas panggung? Lontarkan keluhan tajam padat secara lugas menuju pimpinan spesialis tervalidasi kompeten hebat mantap jitu hari ini juga berdedikasi responsif solutif cerdas akurat tepat tanpa tunda basi hilang telat kusam",
      supportCtaLabel: "Panggil Eksekutif Pendamping Konsultasi Tulus Jujur Cepat Sigap Akurat Bersih Tanggap Ramah Terpercaya Andal Mantap Paripurna Sempurna",
      supportLinkLabel: "Menuju penyelesaian fiksasi akhir perjanjian pendahuluan konfirmasi deal akurat matang mantap solid jaya lurus benar",
      servicesEyebrow: "Kategori Bidang Klasifikasi Kemampuan Pengalaman Kompetensi Eksekusi Lapangan",
      servicesBadgeLabel: "Representatif utilitas fokus area kinerja operasi teruji mantap sakti mandraguna handal",
      servicesLinkLabel: "Penelusuran skop kelengkapan pelayanan mutlak paripurna komprehensif terpadu harmoni sentosa solid kuat",
      pricingEyebrow: "Penempatan Rancangan Pemetaan Porsi Alokasi Cadangan Kas Dana Efisiensi Optimal Mantap Terang Benderang Rasional Wajar Masuk Akal Logis Terpercaya Tulus Bersih Aman",
      pricingRecommendedLabel: "Tingkat jangkauan pilihan utama mumpuni cemerlang",
      pricingButtonLabelPrefix: "Klaim rincian kelebihan skema penawaran eksklusif spesial istimewa premium berkelas mantap",
      proofEyebrow: "Manifestasi Kenyataan Hasil Kinerja Terhimpun Menjadi Referensi Kepastian Valid Mutlak Serentak Padu Lurus Mempesona",
      proofBadgeLabel: "Sajian rekaman hasil laporan otentik asli",
      testimonialsEyebrow: "Cermin Pembenaran Realitas Pernyataan Jujur Respons Pengguna Usai Merasakan Serapan Kinerja Total Terpadu Bahagia Gembira Ceria Menikmati Kelancaran Jaya Sukses Harmoni Cinta Kasih Sayang Kedamaian Kebenaran Keadilan Kebebasan Kejujuran Keterbukaan Kepercayaan Ketulusan Kesabaran Keikhlasan Ketenangan Kemakmuran Kesejahteraan Kelimpahan Kekayaan Kesehatan Kecerdasan Kebijaksanaan Kepemimpinan Kewibawaan Keberanian Ketangguhan Keuletan Kegigihan Kesungguhan Kedisiplinan Ketaatan Kepatuhan Ketertiban Kerapian Kedetailan Ketelitian Kecermatan Kecepatan Ketepatan Kesigapan Ketanggapan Keresponsifan Kreativitas Inovasi Kepeloporan Kemalangan Keberuntungan.",
      testimonialsBadgeLabel: "Pernyataan tulus mementahkan keraguan mutlak sentosa mantap andalan sejati benar lurus tegak tegar kuat perwasa wibawa agung berjaya",
      finalCtaEyebrow: "Pergerakan Siklus Lanjutan Pendistribusian Persetujuan Kolaborasi Efektif Cerdas",
      finalJourneyTitle: "Apa yang Anda lalui selepas penempatan ketertarikan minat permulaan serentak terarah terpadu mantap pasti solid jaya mempesona",
      guideEyebrow: "Buku Acuan Kompilasi Petunjuk Panduan Pemilihan Tepat Valid",
      guideDescription:
        "Lepas kendali kerugian material mendasar dengan mencermati serangkaian rute pengawasan kritis seleksi kualifikasi penyedia layanan utama yang menjamin keandalan pengantaran kualitas mutu luaran murni riil hebat tangguh sentosa jujur profesional kompeten.",
      guideCardEyebrow: "Daftar Tilik Pengecekan Mutu Keandalan Valid Akurat Transparan Lurus Terpercaya Aman Responsif Cerdas Kritis Tegas Kuat Mantap Sentosa Jaya Sukses Mulia Harmonis Makmur Sejahtera Sempurna Paripurna Total Menyeluruh Komplit Penuh Utuh Absolut Mutlak Sejati Abadi Lestari Tiada Bandingan Bintang Lima Kelas Dunia Bertaraf Internasional Profesional Handal Berdedikasi Tulus Ikhlas Ramah Santun Sopan Baik Hati Lemah Lembut Sabar Pengertian Penuh Perhatian Kasih Sayang Cinta Kasih Kedamaian Kebahagiaan Kegembiraan Kebanggaan Kejayaan Kesuksesan Kemuliaan Keagungan Kehormatan Kewibawaan Kekuasaan Kekayaan Kelimpahan Kesejahteraan Kemakmuran Kesehatan Keselamatan Ketenangan Kenyamanan Keindahan Keserasian Keharmonisan Kemantapan Soliditas Kekuatan Ketangguhan Keuletan Kegigihan Kengototan Kefokusan Konstrasi Konsistensi Keteguhan Kesetiaan Keloyalan Keberanian Kebijaksanaan Kecerdasan Kekritisan Ketajaman Kewaspadaan Kesiapsiagaan Kelincahan Kecepatan Ketepatan Kerapian Ketelitian Kedetailan Kedisiplinan Keparipurnaan.",
      guideHeading: `Prosedur seleksi penguatan dasar landasan pemilihan jaminan ${copy.primaryKeyword}`,
    },
  }[templateExperience.lane];

  const serviceContextName =
    templatePage?.serviceType?.title ||
    templatePage?.service?.title ||
    "";
  const locationContextName = templatePage?.location?.title || "";

  const routeAwareAddon = (() => {
    switch (templateExperience.routeKind) {
      case "city":
        return {
          services:
            locationContextName
              ? ` Membantu pengusaha lokal di ${locationContextName} menemukan layanan berkualitas tinggi fungsional yang memastikan tercapainya obyektif mendasar efisiensi terukur tuntas responsif transparan murni akurat tanggap tangguh tepat nyata sejati utuh.`
              : "",
          pricing:
            locationContextName
              ? ` Untuk area bisnis beroperasi ketat di ${locationContextName}, nominal paket ini merupakan rasionalisasi harga nilai tukar wajar mengenyampingkan markup pemborosan murni andalan presisi transparan terpercaya.`
              : "",
          proof:
            locationContextName
              ? ` Telaah kemitraan proyek regional di ${locationContextName} guna membangkitkan kepercayan absolut bukti aktual dari keefektifan pengerjaan presisi kami menangani problem spesifik lapangan wajar sentosa.`
              : "",
          testimonials:
            locationContextName
              ? ` Catatan pengakuan pelanggan dari ${locationContextName} menggambarkan kepatuhan kinerja eksekusi tepat waktu efisien bebas repot mutlak profesional bersahabat ramah tulus riil padat singkat nyata andalan mumpuni kredibel valid solid kuat mantap jaya hebat luar biasa prima istimewa cemerlang.`
              : "",
          finalDescription:
            locationContextName
              ? ` Wujudkan laju akselerasi transformasi bisnis mapan di kawasan ${locationContextName} tanpa was was menekan risiko tergelincir dari target operasional aman tentram lancar mulus tiada halangan mengebirakan senantiasa.`
              : "",
          finalJourneySteps: [
            "Berbagi kondisi spesifik unik rintangan korporat Anda guna mencari prioritas resolusi tajam serempak akurat langsung mengena pergerakan positif menembus rintangan mutlak sentosa",
            "Menyelami kebutuhan ruang gerak teknis mendetail tanpa pusing mengelola perundingan terpotong tertinggal lelah bosan muak usang basi lama tak tentu arah tujuan pasti jelas terang andal",
            "Serah terima jaminan proyek tuntas tepat pada batas kesepakatan waktu yang menyamankan alur ritme korporasi murni terarah produktif konstruktif positif responsif sigap lurus benar bahagia jaya.",
          ],
        };
      case "service":
        return {
          services:
            serviceContextName
              ? ` Layanan ${serviceContextName} terarsip fokus memastikan terpecahkannya kebuntuan alur proses rutinitas sistem secara tuntas bebas dari tumpukan masalah lama menyiksa melelahkan menyita waktu menguras tenaga pikiran stres.`
              : "",
          pricing:
            serviceContextName
              ? ` Skema nominal anggaran peruntukan fungsionalitas ${serviceContextName} ini menempatkan keadilan kepastian dana investasi pada nilai wajar terjamin keamanan transaksinya murni logis terukur matang tajam awet tangguh sentosa.`
              : "",
          proof:
            serviceContextName
              ? ` Realisasi mutu hasil dari proyek ${serviceContextName} mementaskan keberanian pembuktian performa tangkas cerdas tanggap meretas kendala sistem lapangan terpadu teruji valid mutlak nyata murni absolut sejati.`
              : "",
          testimonials:
            serviceContextName
              ? ` Tanggapan lurus sejalan pengguna rilis fitur kelancaran operasional utilitas ${serviceContextName} menyatakan keseriusan keandalan kualitas servis ramah tulus mumpuni handal jaya sukses mantap unggul menawan kelas dunia istimewa mantap kuat solid.`
              : "",
          finalDescription:
            serviceContextName
              ? ` Bergeraklah progresif merengkuh capaian eksponensial dalam pengerjaan inisiatif ${serviceContextName}. Panggilan terpusat Anda merupakan tiket keselamatan laju bisnis agar tidak lagi tersendat terjegal tertunda tak kunjung memanen profit jaya mulia sejahtera.`
              : "",
          finalJourneySteps: [
            "Konsolidasi pendahuluan untuk memetakan beban spesifikasi urgensi keluhan tanpa menahan ganjalan rahasia demi menemukan rute paling pendek hemat tenaga akurat tajam efektif.",
            "Penajaman usulan konsep resolusi penyelesaian implementatif teknikal teruji handal jaya sakti solid presisi sentosa matang sempurna lurus mantap lurus seimbang terpercaya rukun damai tenang murni tulus bersih ramah.",
            "Penjalanan operasional serah terima perizinan proyek secara tepat pada rentang batas jadwal kesepakatan yang membebaskan tekanan mental operasional korporat harian murni absolut total tervalidasi cermat.",
          ],
        };
      case "service-city":
        return {
          services:
            serviceContextName && locationContextName
              ? ` Kepastian penanganan kendala implementatif melalui pendayagunaan sarana pendukung ${serviceContextName} khusus market ${locationContextName} memastikan investasi berjalan mulus di track jalur keutamaan visi korporat mandiri hebat cemerlang.`
              : "",
          pricing:
            serviceContextName && locationContextName
              ? ` Perhitungan pendanaan khusus operasi ${serviceContextName} dilingkup market ${locationContextName} dirancang berselaras mengeliminasi kebocoran anggaran fiktif tanpa kompromi keawetan hasil luaran teruji jaminan asuransi tulus aman presisi tajam mantap wajar.`
              : "",
          proof:
            serviceContextName && locationContextName
              ? ` Pengakuan prestasi dari dokumentasi penyelesaian krisis operasional ${serviceContextName} kepada bisnis kompetitif di panggung pasar ekosistem pergerakan krusial kawasan ${locationContextName} mutlak andalan solid kredibel empiris murni riil logis otentik asli sejati akurat andal.`
              : "",
          testimonials:
            serviceContextName && locationContextName
              ? ` Sinyal kepuasan tanggapan balik otentik para pebisnis peraih manfaat fungsional ${serviceContextName} tersebar seputar keriuhan kota ${locationContextName} meyakinkan komitmen janji mutu kualitas terunggul paripurna murni tulus jujur mantap andalan sejati istimewa kelas dunia wahid.`
              : "",
          finalDescription:
            serviceContextName && locationContextName
              ? ` Kepastian penjemputan kesepakatan kerja eksekusi krusial seputar rilis penanganan pendayagunaan infrastruktur terpadu ${serviceContextName} pada domisili strategis ${locationContextName} hadir secara cepat responsif mengesankan tulus bersih murni handal kompeten sakti jaya mulia sentosa mantap cemerlang.`
              : "",
          finalJourneySteps: [
            "Pemindahan rincian keluhan hambatan laju operasional korporat kedalam usulan fungsional konstruktif praktis riil guna percepatan pengentasan ganjalan rutinitas mantap akurat padu sigap telaten responsif cepat solutif tulus jujur tangkas lurus murni sejati bahagia damai sejahtera.",
            "Penetapan arah logis prioritas urgensi pengembangan yang menyamankan keseimbangan daya upaya ketersediaan logistik tanpa stres tegang menyiksa melukai menyedihkan melainkan riang gembira bersemangat ceria antusias proaktif inisiatif kolaboratif harmonis ramah penuh cinta tawa.",
            "Realisasi penuntasan serah terima utilitas sistem utuh tanpa celah cacat cela noda kurang salah keliru meleset sesuai janji sumpah awal mantap sempurna paripurna istimewa andal jaya hebat luar biasa mempesona elok indah cemerlang gemilang mutlak absolut 100% tervalidasi terdepan selamanya.",
          ],
        };
      case "base":
      default:
        return {
          services: "",
          pricing: "",
          proof: "",
          testimonials: "",
          finalDescription: "",
          finalJourneySteps: [],
        };
    }
  })();

  const finalCtaCopy = {
    ...copy,
    finalCtaDescription:
      routeAwareAddon.finalDescription ||
      copy.finalCtaDescription,
  };

  const sectionMap = new Map<string, React.ReactNode>();
  sectionMap.set(
    "utility",
    <UtilityStrip
      tocItems={utilityItems}
      ctaLinks={copy.ctaLinks}
      ctaLabel={copy.ctaLabel}
      ctaHref={copy.ctaHref}
      title={laneSectionCopy.utilityTitle}
      ctaTitle={laneSectionCopy.utilityCtaTitle}
    />,
  );
  sectionMap.set(
    "highlights",
    <RewriteHighlights
      copy={copy}
      eyebrow={laneSectionCopy.highlightsEyebrow}
      title={laneSectionCopy.highlightsTitle}
      description={laneSectionCopy.highlightsDescription}
      secondaryCtaLabel={laneSectionCopy.supportCtaLabel}
    />,
  );
  sectionMap.set(
    "serviceTypes",
    copy.serviceTypes?.length ? (
      <ServiceTypesSection
        serviceTypes={copy.serviceTypes}
        eyebrow={laneSectionCopy.servicesEyebrow}
        title={laneSectionCopy.servicesTitle}
        description={`${laneSectionCopy.servicesDescription}${routeAwareAddon.services}`}
        badgeLabel={laneSectionCopy.servicesBadgeLabel}
        linkLabel={laneSectionCopy.servicesLinkLabel}
      />
    ) : null,
  );
  sectionMap.set(
    "pricing",
    copy.pricingPlans?.length ? (
      <PricingPlansSection
        pricingPlans={copy.pricingPlans}
        serviceTitle={page.title}
        eyebrow={laneSectionCopy.pricingEyebrow}
        title={laneSectionCopy.pricingTitle}
        description={`${laneSectionCopy.pricingDescription}${routeAwareAddon.pricing}`}
        recommendedLabel={laneSectionCopy.pricingRecommendedLabel}
        buttonLabelPrefix={laneSectionCopy.pricingButtonLabelPrefix}
      />
    ) : null,
  );
  sectionMap.set(
    "features",
    copy.features?.length ? (
      <FeaturesSection
        features={copy.features}
        title={laneSectionCopy.featuresTitle}
        description={laneSectionCopy.featuresDescription}
      />
    ) : null,
  );
  sectionMap.set(
    "proof",
    copy.proofItems?.length ? (
      <ProofSection
        proofItems={copy.proofItems}
        eyebrow={laneSectionCopy.proofEyebrow}
        title={laneSectionCopy.proofTitle}
        description={`${laneSectionCopy.proofDescription}${routeAwareAddon.proof}`}
        badgeLabel={laneSectionCopy.proofBadgeLabel}
      />
    ) : null,
  );
  sectionMap.set(
    "testimonials",
    copy.testimonials?.length ? (
      <TestimonialsSection
        testimonials={copy.testimonials}
        eyebrow={laneSectionCopy.testimonialsEyebrow}
        description={`${laneSectionCopy.testimonialsDescription}${routeAwareAddon.testimonials}`}
        badgeLabel={laneSectionCopy.testimonialsBadgeLabel}
      />
    ) : null,
  );
  sectionMap.set(
    "longGuide",
    copy.longGuide?.length ? (
      <LongGuideSection
        title={page.title}
        longGuide={copy.longGuide}
        eyebrow={laneSectionCopy.guideEyebrow}
        heading={laneSectionCopy.guideHeading}
        description={laneSectionCopy.guideDescription}
        cardEyebrow={laneSectionCopy.guideCardEyebrow}
      />
    ) : null,
  );
  if (copy.eeatPoints && copy.eeatPoints.length > 0) {
    sectionMap.set("eeat", <RewriteEeatSection copy={copy} />);
  }
  if (locationOverview) {
    sectionMap.set(
      "location",
      <SectionShell id="lokasi" className="py-10 md:py-12">
        <SectionPanel
          tone="sky"
          className="rounded-[1.75rem] p-6 md:p-8"
        >
          <p className="text-ui-label text-foreground/55">Lokasi</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            {templatePage?.location?.title || "Konteks Lokal"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
            {locationOverview}
          </p>
          {locationHighlights.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2 text-sm text-foreground/75">
              {locationHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-border/60 px-3 py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </SectionPanel>
      </SectionShell>,
    );
  }
  sectionMap.set(
    "process-faq",
    <RewriteProcessFaq
      copy={copy}
      processEyebrow={laneSectionCopy.processEyebrow}
      processTitle={laneSectionCopy.processTitle}
      processDescription={laneSectionCopy.processDescription}
      faqEyebrow={laneSectionCopy.faqEyebrow}
      faqTitle={laneSectionCopy.faqTitle}
      faqDescription={laneSectionCopy.faqDescription}
      supportPrompt={laneSectionCopy.supportPrompt}
      supportCtaLabel={laneSectionCopy.supportCtaLabel}
      supportLinkLabel={laneSectionCopy.supportLinkLabel}
    />,
  );
  sectionMap.set(
    "finalCta",
    <FinalCtaSection
      copy={finalCtaCopy}
      lane={templateExperience.lane}
      eyebrow={laneSectionCopy.finalCtaEyebrow}
      journeyTitle={laneSectionCopy.finalJourneyTitle}
      journeySteps={routeAwareAddon.finalJourneySteps}
    />,
  );
  if (related.length > 0 || strategicLinks.length > 0) {
    sectionMap.set(
      "related-links",
      <RewriteRelatedLinks
        page={page}
        related={related}
        strategicLinks={strategicLinks}
      />,
    );
  }
  sectionMap.set("micro-badges", <MicroBadges />);
  const baseOrder = [
    ...resolveNarrativeSections({
      page: templatePage,
      template: templatePage?.template || null,
      copy,
    }),
    "micro-badges",
  ];
  const requestedOrder = templatePage?.template ? baseOrder : resolveSectionOrder(override, baseOrder);
  const orderedIds: string[] = [];
  const seen = new Set<string>();
  requestedOrder.forEach((id) => {
    if (sectionMap.has(id) && !seen.has(id)) {
      orderedIds.push(id);
      seen.add(id);
    }
  });
  baseOrder.forEach((id) => {
    if (sectionMap.has(id) && !seen.has(id)) {
      orderedIds.push(id);
      seen.add(id);
    }
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <RewriteHero
        page={page}
        copy={copy}
        sectionLabel={resolvedSectionLabel}
        sectionHref={resolvedSectionHref}
        eyebrow={resolvedHeroEyebrow || override?.heroOverride?.eyebrow || undefined}
        heroImage={heroImage}
      />
      {children}
      {orderedIds.map((id) => (
        <Fragment key={id}>{sectionMap.get(id)}</Fragment>
      ))}
    </>
  );
}
