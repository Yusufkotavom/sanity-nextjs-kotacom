#!/usr/bin/env node

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables from .env file
const envPath = join(process.cwd(), '.env')
const envContent = readFileSync(envPath, 'utf8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim()
  }
})

// Set environment variables
Object.assign(process.env, envVars)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
  useCdn: false
})

// List of slugs to delete
const slugsToDelete = [
  'tips-jitu-nego-harga-dengan-percetakan-biar-gak-kemahalan-1',
  '5-alasan-utama-kenapa-sewa-laptop-untuk-acara-kantor-lebih-untung',
  '5-jenis-kertas-terbaik-untuk-cetak-buku-novel-majalah-komik',
  '7-cara-merawat-laptop-agar-tidak-lemot-dan-awet-untuk-pemula',
  '7-langkah-wajib-menyiapkan-file-pdf-siap-cetak-agar-hasilnya-maksimal',
  'all-block',
  'butuh-cepat-jasa-cetak-buku-satuan-di-surabaya-siap-24-jam',
  'butuh-cepat-jasa-service-komputer-panggilan-terdekat-dari-kotacom',
  'butuh-cepat-opsi-jasa-cetak-buku-24-jam-di-surabaya-untuk-deadline-mepet',
  'cara-akurat-menghitung-biaya-cetak-buku-di-surabaya-update-2025',
  'cara-sederhana-untuk-menjaga-komputer-anda',
  'cari-jasa-cetak-buku-tahunan-sekolah-di-surabaya-ini-yang-perlu-diperhatikan',
  'cetak-buku-satuan-di-surabaya-ini-solusi-cepat-tanpa-minimum-order',
  'cetak-buku-tanpa-minimum-order-ini-layanan-print-on-demand-pod-surabaya',
  'cetak-digital-vs-offset-mana-yang-lebih-hemat-untuk-proyek-buku-anda-di-surabaya',
  'customize-your-gaming-setup-with-stylish-playstation-accessories',
  'digital-vs-offset-mana-metode-cetak-buku-yang-tepat-untuk-kebutuhan-anda',
  'download-dlc-boot-2019-v3-6-full-version-crack-latest-update',
  'download-wondershare-filmora-9-0-7-4-full-version-terbaru-gratis-crack',
  'elevate-your-skills-with-premium-playstation-gaming-accessories',
  'gaming-greatness-with-the-latest-playstation-accessories-and-gadgets',
  'hindari-revisi-7-kesalahan-fatal-saat-menyiapkan-file-siap-cetak-buku',
  'hindari-rugi-5-kesalahan-umum-penulis-pemula-saat-mencetak-buku-pertama',
  'how-to-create-an-intelligent-chatbot-in-python-3',
  'index-old',
  'jangan-salah-pilih-7-tips-memilih-jenis-kertas-terbaik-untuk-cetak-buku',
  'jangan-salah-pilih-panduan-lengkap-memilih-jenis-kertas-terbaik-untuk-buku-anda',
  'jasa-cetak-buku-aceh-tengah',
  'jasa-cetak-buku-agam',
  'jasa-cetak-buku-asahan',
  'jasa-cetak-buku-balangan',
  'jasa-cetak-buku-banggai-laut',
  'jasa-cetak-buku-bangka',
  'jasa-cetak-buku-batam',
  'jasa-cetak-buku-bolaang-mongondow',
  'jasa-cetak-buku-bolaang-mongondow-selatan',
  'jasa-cetak-buku-bolaang-mongondow-utara',
  'jasa-cetak-buku-bontang',
  'jasa-cetak-buku-buru',
  'jasa-cetak-buku-buton',
  'jasa-cetak-buku-dompu',
  'jasa-cetak-buku-dumai',
  'jasa-cetak-buku-empat-lawang',
  'jasa-cetak-buku-halmahera-barat',
  'jasa-cetak-buku-halmahera-utara',
  'jasa-cetak-buku-hulu-sungai-selatan',
  'jasa-cetak-buku-jambi',
  'jasa-cetak-buku-jembrana',
  'jasa-cetak-buku-kaur',
  'jasa-cetak-buku-kayong-utara',
  'jasa-cetak-buku-kepulauan-aru',
  'jasa-cetak-buku-klungkung',
  'jasa-cetak-buku-kutai-kartanegara',
  'jasa-cetak-buku-lampung-utara',
  'jasa-cetak-buku-lhokseumawe',
  'jasa-cetak-buku-makassar',
  'jasa-cetak-buku-maluku-tengah',
  'jasa-cetak-buku-maluku-tenggara',
  'jasa-cetak-buku-mandailing-natal',
  'jasa-cetak-buku-minahasa-tenggara',
  'jasa-cetak-buku-mukomuko',
  'jasa-cetak-buku-murung-raya',
  'jasa-cetak-buku-nagan-raya',
  'jasa-cetak-buku-palopo',
  'jasa-cetak-buku-pariaman',
  'jasa-cetak-buku-payakumbuh',
  'jasa-cetak-buku-pematangsiantar',
  'jasa-cetak-buku-pesawaran',
  'jasa-cetak-buku-pulang-pisau',
  'jasa-cetak-buku-pulau-taliabu',
  'jasa-cetak-buku-puncak',
  'jasa-cetak-buku-sabu-raijua',
  'jasa-cetak-buku-solok-selatan',
  'jasa-cetak-buku-sumba-tengah',
  'jasa-cetak-buku-sumba-timur',
  'jasa-cetak-buku-tabanan',
  'jasa-cetak-buku-tanah-bumbu',
  'jasa-cetak-buku-tanah-laut',
  'jasa-cetak-buku-tapanuli-selatan',
  'jasa-cetak-buku-tidore-kepulauan',
  'jasa-cetak-buku-tolikara',
  'jasa-cetak-buku-tual',
  'jasa-cetak-buku-wakatobi',
  'jasa-cetak-buku-waropen',
  'jasa-install-game-pes-2018-full-update-surabaya-pc-laptop-komputer-xbox-ps4-ps3',
  'jasa-isi-game-fifa-2019-fifa-2018-terbaru-surabaya',
  'jasa-komputer-rakitan-unbk-surabaya',
  'jasa-sevice-komputer-notebook-laptop-mac-macbook',
  'jasa-sharing-id-account-steam-pes-2020-fifa-2020',
  'jual-pc-karaoke-lagu-terupdate-dan-lengkap',
  'kalkulator-biaya-cetak-buku-di-surabaya-estimasi-harga-akurat-2025',
  'level-up-your-gameplay-with-top-notch-gaming-equipment',
  'lighthouse-scores',
  'md-test-sanity',
  'no-1-jual-game-pc-banjar',
  'no-1-jual-game-pc-bondowoso',
  'no-1-jual-game-pc-boyolali',
  'no-1-jual-game-pc-indramayu',
  'no-1-jual-game-pc-jakarta-timur',
  'no-1-jual-game-pc-pandeglang',
  'no-1-jual-game-pc-semarang',
  'no-1-jual-game-pc-sumenep',
  'paket-cetak-buku-murah-di-surabaya-solusi-hemat-untuk-skripsi-tugas-akhir',
  'panduan-memilih-jenis-jilid-buku-dari-softcover-hingga-hardcover-mewah',
  'payload-sample-post',
  'pentingnya-cover-menarik-rekomendasi-jasa-desain-cover-buku-di-surabaya',
  'rekomendasi-jual-game-pc-grobogan',
  'rekomendasi-jual-game-pc-gunungkidul',
  'rekomendasi-jual-game-pc-kepulauan-seribu',
  'rekomendasi-jual-game-pc-kulon-progo',
  'services',
  'cloud-services',
  'data-security',
  'jasa-install-corel-draw-sidoarjo-online',
  'jasa-install-ulang-windows-surabaya',
  'jasa-pembuatan-software-surabaya',
  'pembuatan-software',
  'sewa-bus-surabaya',
  'sistem-pos',
  'software',
  'studi-kasus-dari-naskah-jadi-cuan-kisah-sukses-penulis-indie-surabaya-cetak-buku',
  'template-jasa',
  'terbaik-jual-game-pc-majalengka',
  'terbaik-jual-game-pc-pacitan',
  'terbaik-jual-game-pc-probolinggo',
  'terbaik-jual-game-pc-salatiga',
  'terbaik-jual-game-pc-sampang',
  'terbaik-jual-game-pc-sidoarjo',
  'terbaik-jual-game-pc-situbondo',
  'terbaik-jual-game-pc-sragen',
  'terbaik-jual-game-pc-surabaya',
  'terbaik-jual-game-pc-tangerang',
  'test-field',
  'tips-cetak-buku-tahunan-sekolah-yearbook-keren-di-surabaya',
  'top-7-jasa-cetak-buku-murah-di-surabaya-dengan-kualitas-terjamin',
  'update-2025-rincian-estimasi-biaya-cetak-buku-satuan-di-surabaya',
  'konsultan-it-sidoarjo-terpercaya-2025',
  'backup-recovery-sistem-surabaya',
  'backup-recovery-surabaya-2025',
  'coworking-space-tech-surabaya-new',
  'digital-transformation-umkm-surabaya',
  'digital-transformation-umkm-surabaya-new',
  'digitalisasi-umkm-surabaya-sidoarjo-terbaik-2025-new',
  'jasa-it-support-surabaya-terpercaya',
  'jasa-pembuatan-website-surabaya',
  'konsultan-it-sidoarjo-terpercaya',
  'panduan-memilih-sistem-pos-untuk-umkm',
  'sistem-keamanan-jaringan-surabaya',
  'sistem-pos-surabaya-terbaik-untuk-umkm',
  'smart-city-surabaya',
  'software-development-surabaya-terbaik',
  'troubleshooting-komputer-surabaya',
  'what-is-headless-cms',
  'why-next-js-is-the-best-choice-for-your-website',
  'why-sanity-is-the-ultimate-cms-choice',
  'layanan',
  'agency-landing',
  'biro-jasa-perizinan',
  'jasa-pengukuhan-pkp'
]

async function deleteDocumentsBySlug() {
  console.log(`Starting deletion of ${slugsToDelete.length} documents...`)
  
  let deletedCount = 0
  let notFoundCount = 0
  let errorCount = 0

  for (const slug of slugsToDelete) {
    try {
      // Find documents with this slug
      const documents = await client.fetch(
        `*[slug.current == $slug]{ _id, _type, title }`,
        { slug }
      )

      if (documents.length === 0) {
        console.log(`❌ No document found with slug: ${slug}`)
        notFoundCount++
        continue
      }

      // Delete each document found
      for (const doc of documents) {
        try {
          await client.delete(doc._id)
          console.log(`✅ Deleted ${doc._type}: ${doc.title || doc._id} (slug: ${slug})`)
          deletedCount++
        } catch (deleteError) {
          console.error(`❌ Error deleting document ${doc._id}:`, deleteError.message)
          errorCount++
        }
      }

    } catch (error) {
      console.error(`❌ Error processing slug ${slug}:`, error.message)
      errorCount++
    }
  }

  console.log('\n=== DELETION SUMMARY ===')
  console.log(`✅ Successfully deleted: ${deletedCount} documents`)
  console.log(`❌ Not found: ${notFoundCount} slugs`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📊 Total processed: ${slugsToDelete.length} slugs`)
}

// Run the deletion
deleteDocumentsBySlug().catch(console.error)