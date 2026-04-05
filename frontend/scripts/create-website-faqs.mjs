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

const faqData = [
  {
    _type: "faq",
    _id: "faq-website-timeline",
    title: "Berapa lama waktu yang dibutuhkan untuk membuat website?",
    body: [
      {
        _key: "answer-1",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-1-span",
            _type: "span",
            marks: [],
            text: "Waktu pembuatan website bervariasi tergantung kompleksitas:\n\n• Website Company Profile: 1-2 minggu\n• Website Toko Online: 2-3 minggu\n• Aplikasi Web Custom: 3-4 minggu\n• Website dengan template: 3-7 hari\n\nWaktu dapat lebih cepat jika semua konten dan requirement sudah lengkap dari awal."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-website-technology",
    title: "Teknologi apa yang digunakan untuk membuat website?",
    body: [
      {
        _key: "answer-2",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-2-span",
            _type: "span",
            marks: [],
            text: "Kami menggunakan teknologi terdepan seperti:\n\n• Frontend: React, Next.js, Angular, Vue.js\n• Backend: Node.js, Laravel, Python, PHP\n• Database: MySQL, PostgreSQL, MongoDB\n• Cloud: AWS, Google Cloud\n• Mobile: React Native, Flutter\n\nPemilihan teknologi disesuaikan dengan kebutuhan dan budget proyek Anda."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-mobile-friendly",
    title: "Apakah website yang dibuat sudah mobile-friendly?",
    body: [
      {
        _key: "answer-3",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-3-span",
            _type: "span",
            marks: [],
            text: "Ya, semua website yang kami buat sudah 100% responsive dan mobile-friendly. Website akan tampil sempurna di semua device:\n\n• Desktop & Laptop\n• Tablet (iPad, Android)\n• Smartphone (iOS, Android)\n\nKami juga melakukan testing di berbagai ukuran layar untuk memastikan user experience yang optimal."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-seo-optimization",
    title: "Apakah website sudah include SEO optimization?",
    body: [
      {
        _key: "answer-4",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-4-span",
            _type: "span",
            marks: [],
            text: "Ya, semua paket website sudah include SEO optimization dasar:\n\n• Meta tags optimization\n• Schema markup\n• Sitemap XML\n• Google Analytics setup\n• Page speed optimization\n• Mobile-first indexing\n• Clean URL structure\n\nUntuk SEO advanced, kami juga menyediakan layanan SEO terpisah dengan strategi content marketing dan link building."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-maintenance-cost",
    title: "Apakah ada biaya maintenance bulanan?",
    body: [
      {
        _key: "answer-5",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-5-span",
            _type: "span",
            marks: [],
            text: "Biaya maintenance tergantung paket yang dipilih:\n\n• Paket Starter: 3 bulan support gratis, setelah itu Rp 50rb/bulan\n• Paket Professional: 6 bulan support gratis, setelah itu Rp 100rb/bulan\n• Paket Enterprise: 1 tahun full maintenance included\n\nMaintenance meliputi: backup rutin, security updates, technical support, dan minor updates."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-revision-process",
    title: "Bagaimana proses revisi dan perubahan setelah website jadi?",
    body: [
      {
        _key: "answer-6",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-6-span",
            _type: "span",
            marks: [],
            text: "Proses revisi sangat mudah:\n\n• Selama development: revisi unlimited\n• Setelah website live: 2x revisi gratis dalam 30 hari\n• Revisi tambahan: Rp 50rb - 200rb tergantung kompleksitas\n• Request via WhatsApp/email dengan detail yang jelas\n• Timeline revisi: 1-3 hari kerja\n\nKami berkomitmen untuk kepuasan 100% klien."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-website-security",
    title: "Apakah website sudah aman dari hacker?",
    body: [
      {
        _key: "answer-7",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-7-span",
            _type: "span",
            marks: [],
            text: "Ya, keamanan website adalah prioritas utama kami:\n\n• SSL Certificate gratis\n• Regular security updates\n• Firewall protection\n• Backup otomatis harian\n• Malware scanning\n• Secure coding practices\n• HTTPS enforcement\n\nKami juga menyediakan security monitoring 24/7 untuk paket Enterprise."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-domain-hosting",
    title: "Apakah saya bisa request domain dan hosting sendiri?",
    body: [
      {
        _key: "answer-8",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-8-span",
            _type: "span",
            marks: [],
            text: "Tentu saja! Anda memiliki beberapa pilihan:\n\n• Gunakan hosting kami (recommended): lebih mudah maintenance\n• Gunakan hosting sendiri: kami bantu setup dan konfigurasi\n• Hybrid: domain dari Anda, hosting dari kami\n\nJika menggunakan hosting sendiri, pastikan spesifikasi minimal:\n• PHP 8.0+, MySQL 5.7+, SSL support, cPanel access"
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-payment-system",
    title: "Bagaimana cara kerja sistem pembayaran?",
    body: [
      {
        _key: "answer-9",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-9-span",
            _type: "span",
            marks: [],
            text: "Sistem pembayaran kami fleksibel:\n\n• DP 50% di awal project\n• Pelunasan 50% setelah website selesai\n• Pembayaran via: Transfer Bank, QRIS, GoPay, OVO\n• Invoice resmi dengan kwitansi\n• Cicilan tersedia untuk paket Enterprise\n\nTidak ada biaya tersembunyi, semua transparan dari awal."
          }
        ]
      }
    ]
  },
  {
    _type: "faq",
    _id: "faq-guarantee-support",
    title: "Apakah ada garansi dan after-sales support?",
    body: [
      {
        _key: "answer-10",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "answer-10-span",
            _type: "span",
            marks: [],
            text: "Ya, kami memberikan garansi lengkap:\n\n• Garansi kepuasan 100%\n• Garansi bug-free 30 hari\n• Support teknis sesuai paket yang dipilih\n• Training penggunaan website\n• Dokumentasi lengkap\n• Video tutorial\n• WhatsApp support group\n\nKami berkomitmen untuk long-term partnership dengan klien."
          }
        ]
      }
    ]
  }
]

async function createWebsiteFAQs() {
  try {
    console.log('Creating FAQ documents for website services...')
    
    // Create all FAQ documents
    const results = await Promise.all(
      faqData.map(faq => client.createOrReplace(faq))
    )
    
    console.log(`✅ Successfully created ${results.length} FAQ documents`)
    
    // Now add FAQ block to the page
    const faqBlock = {
      _type: "section-header",
      _key: "faq-header",
      tagLine: "❓ Tanya Jawab",
      title: "Pertanyaan yang Sering Ditanyakan",
      description: "Temukan jawaban lengkap untuk pertanyaan umum tentang jasa pembuatan website kami"
    }

    const faqsBlock = {
      _type: "faqs",
      _key: "website-faqs",
      colorVariant: "background",
      faqs: faqData.map(faq => ({
        _type: "reference",
        _ref: faq._id,
        _key: `ref-${faq._id}`
      }))
    }

    const faqCTA = {
      _type: "cta-1",
      _key: "faq-cta",
      colorVariant: "muted",
      stackAlign: "center",
      title: "Masih Ada Pertanyaan Lain?",
      body: [
        {
          _key: "faq-cta-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "faq-cta-span",
              _type: "span",
              marks: [],
              text: "Tim kami siap membantu menjawab semua pertanyaan Anda tentang pembuatan website. Konsultasikan kebutuhan bisnis Anda sekarang juga!"
            }
          ]
        }
      ],
      links: [
        {
          _key: "faq-cta-link",
          _type: "link",
          isExternal: false,
          title: "Konsultasi Gratis",
          buttonVariant: "default"
        }
      ]
    }

    // Get current page and add FAQ sections before the final CTA
    const currentPage = await client.fetch(
      `*[_id == "page-jasa-pembuatan-website-surabaya"][0]`
    )
    
    // Insert FAQ sections before the last 2 blocks (final CTA and stats)
    const updatedBlocks = [
      ...currentPage.blocks.slice(0, -2),
      faqBlock,
      faqsBlock,
      faqCTA,
      ...currentPage.blocks.slice(-2)
    ]
    
    const result = await client
      .patch('page-jasa-pembuatan-website-surabaya')
      .set({ blocks: updatedBlocks })
      .commit()
    
    console.log('✅ Successfully added FAQ section to page')
    console.log('📝 Total blocks now:', result.blocks.length)

  } catch (error) {
    console.error('❌ Error creating FAQs:', error.message)
  }
}

createWebsiteFAQs()