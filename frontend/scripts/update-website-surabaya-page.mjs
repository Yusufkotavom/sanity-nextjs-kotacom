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

const comprehensivePageData = {
  _type: "page",
  _id: "page-jasa-pembuatan-website-surabaya",
  title: "Jasa Pembuatan Website Surabaya Terpercaya",
  slug: {
    _type: "slug",
    current: "jasa-pembuatan-website-surabaya"
  },
  meta_title: "Jasa Pembuatan Website Surabaya Terpercaya - Kotacom",
  meta_description: "Jasa pembuatan website profesional di Surabaya. Website responsif, SEO-friendly, dan terpercaya. Tingkatkan omset bisnis hingga 200% dengan website berkualitas.",
  blocks: [
    // Hero Section with Stats
    {
      _type: "hero-1",
      _key: "hero-main",
      tagLine: "200+ Website Sukses Dibuat",
      title: "Jasa Pembuatan Website Profesional Surabaya",
      body: [
        {
          _key: "hero-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "hero-span",
              _type: "span",
              marks: [],
              text: "Tingkatkan omset bisnis Anda hingga 200% dengan website profesional yang responsif dan SEO-friendly"
            }
          ]
        }
      ],
      links: [
        {
          _key: "hero-link-1",
          _type: "link",
          isExternal: true,
          title: "WhatsApp",
          href: "https://wa.me/6285799520350",
          buttonVariant: "default"
        },
        {
          _key: "hero-link-2", 
          _type: "link",
          isExternal: true,
          title: "Lihat Portfolio",
          href: "/projects",
          buttonVariant: "outline"
        }
      ]
    },

    // Stats Grid
    {
      _type: "grid-row",
      _key: "stats-grid",
      colorVariant: "muted",
      gridColumns: "grid-cols-4",
      columns: [
        {
          _key: "rating-stat",
          _type: "grid-card",
          title: "4.9/5 Rating",
          excerpt: "Rating kepuasan klien"
        },
        {
          _key: "clients-stat",
          _type: "grid-card",
          title: "200+ Klien Puas",
          excerpt: "Website sukses dibuat"
        },
        {
          _key: "guarantee-stat",
          _type: "grid-card",
          title: "Garansi 1 Tahun",
          excerpt: "Support penuh"
        },
        {
          _key: "growth-stat",
          _type: "grid-card",
          title: "200% Growth",
          excerpt: "Peningkatan omset rata-rata"
        }
      ]
    },

    // Section Header - Jenis Website
    {
      _type: "section-header",
      _key: "jenis-website-header",
      tagLine: "Pilih Jenis Website Anda",
      title: "Kami siap membantu Anda membuat berbagai jenis website sesuai kebutuhan bisnis Anda",
      description: "Tidak yakin jenis website yang cocok? Konsultasikan dengan tim ahli kami"
    },

    // Comprehensive Website Types Grid
    {
      _type: "grid-row",
      _key: "website-types-grid",
      colorVariant: "background",
      gridColumns: "grid-cols-4",
      columns: [
        {
          _key: "website-sekolah",
          _type: "grid-card",
          title: "Website Sekolah",
          excerpt: "Website informasi sekolah dengan sistem manajemen siswa dan orang tua",
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/sekolah",
            buttonVariant: "link"
          }
        },
        {
          _key: "company-profile",
          _type: "grid-card",
          title: "Company Profile",
          excerpt: "Website perusahaan profesional dengan portofolio dan informasi layanan",
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/company-profile",
            buttonVariant: "link"
          }
        },
        {
          _key: "website-dokter",
          _type: "grid-card",
          title: "Website Dokter/Klinik",
          excerpt: "Website kesehatan dengan sistem appointment dan informasi layanan medis",
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/dokter-klinik",
            buttonVariant: "link"
          }
        },
        {
          _key: "toko-online",
          _type: "grid-card",
          title: "Website Toko Online",
          excerpt: "E-commerce lengkap dengan sistem pembayaran dan manajemen produk",
          isPopular: true,
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/toko-online",
            buttonVariant: "link"
          }
        },
        {
          _key: "website-expedisi",
          _type: "grid-card",
          title: "Website Expedisi",
          excerpt: "Website logistik dengan tracking pengiriman dan informasi layanan",
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/expedisi",
            buttonVariant: "link"
          }
        },
        {
          _key: "website-konstruksi",
          _type: "grid-card",
          title: "Website Konstruksi",
          excerpt: "Website konstruksi dengan portofolio project dan informasi layanan",
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/konstruksi",
            buttonVariant: "link"
          }
        },
        {
          _key: "website-ngo",
          _type: "grid-card",
          title: "Website Komunitas/NGO",
          excerpt: "Website gratis untuk komunitas dan NGO dengan sistem donasi",
          link: {
            _type: "link",
            isExternal: true,
            title: "Lihat Detail →",
            href: "/pembuatan-website/komunitas-ngo",
            buttonVariant: "link"
          }
        },
        {
          _key: "website-custom",
          _type: "grid-card",
          title: "Website Custom",
          excerpt: "Website khusus sesuai kebutuhan unik bisnis Anda",
          link: {
            _type: "link",
            isExternal: false,
            title: "Konsultasi Gratis →",
            buttonVariant: "link"
          }
        }
      ]
    },

    // CTA - Konsultasi Jenis Website
    {
      _type: "cta-1",
      _key: "konsultasi-jenis-cta",
      colorVariant: "primary",
      stackAlign: "center",
      title: "Konsultasi Jenis Website",
      body: [
        {
          _key: "konsultasi-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "konsultasi-span",
              _type: "span",
              marks: [],
              text: "Tidak yakin jenis website yang cocok? Konsultasikan dengan tim ahli kami"
            }
          ]
        }
      ],
      links: [
        {
          _key: "konsultasi-link",
          _type: "link",
          isExternal: false,
          title: "Konsultasi Gratis",
          buttonVariant: "default"
        }
      ]
    },

    // Section Header - Keuntungan Website
    {
      _type: "section-header",
      _key: "keuntungan-header",
      tagLine: "🎯 Keuntungan Website",
      title: "Mengapa Anda Harus Memiliki Website?",
      description: "Website bukan lagi pilihan, tapi kebutuhan utama untuk bisnis modern di era digital"
    },

    // Comprehensive Benefits Grid
    {
      _type: "grid-row",
      _key: "benefits-grid",
      colorVariant: "background",
      gridColumns: "grid-cols-3",
      columns: [
        {
          _key: "omset-benefit",
          _type: "grid-card",
          title: "Tingkatkan Omset Hingga 200%",
          excerpt: "Website memungkinkan bisnis Anda beroperasi 24/7, menjangkau pelanggan potensial di seluruh dunia, dan meningkatkan konversi penjualan melalui pemasaran digital yang efektif.",
          features: ["📈 200% Peningkatan rata-rata omset klien kami"]
        },
        {
          _key: "kredibilitas-benefit",
          _type: "grid-card",
          title: "Tingkatkan Kredibilitas Bisnis",
          excerpt: "Website profesional memberikan kesan pertama yang baik kepada pelanggan potensial. Tanpa website, bisnis Anda terlihat kurang serius dan sulit dipercaya di mata konsumen modern.",
          features: ["⭐ 85% Pelanggan lebih mempercayai bisnis dengan website"]
        },
        {
          _key: "global-benefit",
          _type: "grid-card",
          title: "Jangkau Pelanggan Global",
          excerpt: "Dengan website, bisnis Anda dapat diakses oleh pelanggan dari seluruh dunia 24 jam sehari. Tidak terbatas oleh lokasi geografis, website membuka peluang bisnis internasional.",
          features: ["🌍 Global - Pelanggan dari seluruh dunia dapat mengakses bisnis Anda"]
        },
        {
          _key: "efisien-benefit",
          _type: "grid-card",
          title: "Biaya Pemasaran Lebih Efisien",
          excerpt: "Website adalah investasi jangka panjang yang lebih murah dibandingkan iklan tradisional. Dengan SEO dan content marketing, Anda dapat menjangkau pelanggan target dengan biaya yang lebih rendah.",
          features: ["💰 70% Penghematan biaya pemasaran dibanding iklan tradisional"]
        },
        {
          _key: "analitik-benefit",
          _type: "grid-card",
          title: "Analitik & Insight Bisnis",
          excerpt: "Website memberikan data analitik yang berharga tentang perilaku pelanggan, preferensi, dan performa bisnis. Gunakan data ini untuk pengambilan keputusan yang lebih baik.",
          features: ["📊 Real-time Data analitik real-time untuk pengambilan keputusan"]
        },
        {
          _key: "operasional-benefit",
          _type: "grid-card",
          title: "Operasional 24/7",
          excerpt: "Website bekerja untuk Anda 24 jam sehari, 7 hari seminggu. Pelanggan dapat melihat produk/jasa, melakukan pemesanan, atau menghubungi Anda kapan saja tanpa batasan waktu.",
          features: ["⏰ 24/7 Bisnis Anda selalu terbuka untuk pelanggan"]
        }
      ]
    },

    // Warning CTA
    {
      _type: "cta-1",
      _key: "warning-cta",
      colorVariant: "destructive",
      stackAlign: "center",
      title: "Jangan Lewatkan Kesempatan Ini!",
      body: [
        {
          _key: "warning-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "warning-span",
              _type: "span",
              marks: [],
              text: "85% bisnis yang tidak memiliki website kehilangan peluang penjualan hingga 200% lebih besar. Website adalah investasi masa depan bisnis Anda."
            }
          ]
        }
      ],
      links: [
        {
          _key: "warning-link",
          _type: "link",
          isExternal: false,
          title: "Konsultasi Gratis Sekarang",
          buttonVariant: "default"
        }
      ]
    },

    // Section Header - Paket Lengkap
    {
      _type: "section-header",
      _key: "paket-header",
      tagLine: "🎁 Paket Lengkap",
      title: "Apa Yang Akan Anda Dapatkan?",
      description: "Lebih dari sekadar website, Anda mendapatkan solusi digital lengkap untuk bisnis Anda"
    },

    // Comprehensive Package Features Grid
    {
      _type: "grid-row",
      _key: "package-features-grid",
      colorVariant: "muted",
      gridColumns: "grid-cols-3",
      columns: [
        {
          _key: "responsive-feature",
          _type: "grid-card",
          title: "Website Responsive Premium",
          excerpt: "Website yang tampil sempurna di semua device (desktop, tablet, mobile) dengan design modern dan user-friendly interface.",
          features: [
            "Design Modern & Professional",
            "100% Mobile Responsive", 
            "Fast Loading Speed"
          ]
        },
        {
          _key: "seo-feature",
          _type: "grid-card",
          title: "SEO Optimization Lengkap",
          excerpt: "Optimasi SEO profesional untuk meningkatkan peringkat website Anda di mesin pencari Google dan menjangkau lebih banyak pelanggan potensial.",
          features: [
            "On-Page SEO Optimization",
            "Meta Tags & Schema Markup",
            "Google Analytics Setup"
          ]
        },
        {
          _key: "support-feature",
          _type: "grid-card",
          title: "Support & Maintenance 24/7",
          excerpt: "Dukungan teknis profesional dan maintenance website selama 1 tahun penuh. Kami siap membantu Anda kapan saja diperlukan.",
          features: [
            "24/7 Technical Support",
            "Regular Updates & Backups",
            "Security Monitoring"
          ]
        },
        {
          _key: "hosting-feature",
          _type: "grid-card",
          title: "Domain & Hosting Premium",
          excerpt: "Domain .com/.id premium dan hosting berkualitas tinggi dengan uptime 99.9%. Website Anda selalu online dan dapat diakses dengan cepat.",
          features: [
            "Domain Premium (.com/.id)",
            "99.9% Uptime Guarantee",
            "SSL Certificate Free"
          ]
        },
        {
          _key: "training-feature",
          _type: "grid-card",
          title: "Training & Dokumentasi",
          excerpt: "Panduan lengkap cara mengelola website dan training online untuk Anda dan tim. Dokumentasi yang mudah dipahami untuk maintenance website.",
          features: [
            "Admin Panel Training",
            "Complete Documentation",
            "Video Tutorial Library"
          ]
        },
        {
          _key: "bonus-feature",
          _type: "grid-card",
          title: "Bonus & Kejutan",
          excerpt: "Bonus menarik untuk setiap paket website. Konsultasi bisnis digital gratis, logo design, dan banyak kejutan lainnya untuk meningkatkan nilai bisnis Anda.",
          features: [
            "Konsultasi Bisnis Digital",
            "Logo Design Gratis",
            "Social Media Setup"
          ]
        }
      ]
    },

    // Ready CTA
    {
      _type: "cta-1",
      _key: "ready-cta",
      colorVariant: "primary",
      stackAlign: "center",
      title: "Ready untuk Memiliki Website Impian Anda?",
      body: [
        {
          _key: "ready-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "ready-span",
              _type: "span",
              marks: [],
              text: "Dapatkan semua benefit di atas dengan paket website lengkap dari Kotacom. Mulai transformasi digital bisnis Anda sekarang!"
            }
          ]
        }
      ],
      links: [
        {
          _key: "ready-link-1",
          _type: "link",
          isExternal: true,
          title: "Pesan Sekarang via WhatsApp",
          href: "https://wa.me/6285799520350",
          buttonVariant: "default"
        },
        {
          _key: "ready-link-2",
          _type: "link",
          isExternal: true,
          title: "Lihat Harga",
          href: "#pricing",
          buttonVariant: "outline"
        }
      ]
    },

    // Section Header - Tech Stack
    {
      _type: "section-header",
      _key: "tech-header",
      tagLine: "Tech Stack Kami",
      title: "Menggunakan teknologi terdepan untuk memberikan solusi digital yang berkualitas tinggi"
    },

    // Problem Section Header
    {
      _type: "section-header",
      _key: "problem-header",
      title: "Apakah Bisnis Anda Mengalami Masalah Ini?",
      description: "💡 Solusi: Website profesional yang responsif dan SEO-friendly dapat meningkatkan omset bisnis Anda hingga 200% dalam 6 bulan!"
    },

    // Problems Grid
    {
      _type: "grid-row",
      _key: "problems-grid",
      colorVariant: "destructive",
      gridColumns: "grid-cols-2",
      columns: [
        {
          _key: "problem-1",
          _type: "grid-card",
          title: "Kehilangan pelanggan karena tidak ada website profesional"
        },
        {
          _key: "problem-2", 
          _type: "grid-card",
          title: "Kompetitor unggul dengan website yang lebih menarik"
        },
        {
          _key: "problem-3",
          _type: "grid-card", 
          title: "Sulit ditemukan di Google oleh calon pelanggan"
        },
        {
          _key: "problem-4",
          _type: "grid-card",
          title: "Penjualan online terbatas karena tidak ada platform yang tepat"
        }
      ]
    },

    // Solution Stats
    {
      _type: "grid-row",
      _key: "solution-stats",
      colorVariant: "primary",
      gridColumns: "grid-cols-2",
      columns: [
        {
          _key: "solution-stat-1",
          _type: "grid-card",
          title: "200%",
          excerpt: "Peningkatan Omset"
        },
        {
          _key: "solution-stat-2",
          _type: "grid-card",
          title: "98%",
          excerpt: "Kepuasan Klien"
        }
      ]
    },

    // Section Header - Layanan Development
    {
      _type: "section-header",
      _key: "layanan-header",
      tagLine: "Layanan Website Development Terlengkap",
      title: "Kami menyediakan solusi website lengkap untuk semua kebutuhan bisnis Anda"
    },

    // Service Packages with Pricing
    {
      _type: "grid-row",
      _key: "service-packages",
      colorVariant: "background",
      gridColumns: "grid-cols-3",
      columns: [
        {
          _key: "company-package",
          _type: "pricing-card",
          title: "Website Company Profile",
          excerpt: "Website profesional untuk memperkenalkan perusahaan dan layanan Anda kepada calon pelanggan.",
          features: [
            "Responsive Design",
            "SEO Optimized", 
            "Contact Form"
          ],
          price: 500000,
          currency: "IDR",
          timeline: "Timeline: 1-2 minggu",
          link: {
            _type: "link",
            isExternal: false,
            title: "Pilih Paket",
            buttonVariant: "default"
          }
        },
        {
          _key: "ecommerce-package",
          _type: "pricing-card",
          title: "Website Toko Online",
          excerpt: "Platform e-commerce lengkap untuk menjual produk online dengan sistem pembayaran terintegrasi.",
          features: [
            "Shopping Cart",
            "Payment Gateway",
            "Admin Dashboard"
          ],
          price: 990000,
          currency: "IDR",
          timeline: "Timeline: 2-3 minggu",
          isPopular: true,
          link: {
            _type: "link",
            isExternal: false,
            title: "Pilih Paket",
            buttonVariant: "default"
          }
        },
        {
          _key: "custom-package",
          _type: "pricing-card",
          title: "Aplikasi Web Custom",
          excerpt: "Solusi web application khusus sesuai kebutuhan spesifik bisnis dan proses internal perusahaan.",
          features: [
            "Custom Features",
            "Database Integration",
            "API Integration"
          ],
          price: 1999000,
          currency: "IDR",
          timeline: "Timeline: 3-4 minggu",
          link: {
            _type: "link",
            isExternal: false,
            title: "Konsultasi",
            buttonVariant: "default"
          }
        }
      ]
    }
  ]
}

async function updateWebsitePage() {
  try {
    console.log('Updating Jasa Pembuatan Website Surabaya page with comprehensive content...')
    
    // Update the existing page
    const result = await client
      .patch('page-jasa-pembuatan-website-surabaya')
      .set(comprehensivePageData)
      .commit()
    
    console.log('✅ Successfully updated page:', result._id)
    console.log('📄 Title:', result.title)
    console.log('🔗 Slug:', result.slug.current)
    console.log('📝 Total blocks:', result.blocks.length)
    console.log('\n📋 Block breakdown:')
    
    const blockCounts = {}
    result.blocks.forEach(block => {
      blockCounts[block._type] = (blockCounts[block._type] || 0) + 1
    })
    
    Object.entries(blockCounts).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count}`)
    })

  } catch (error) {
    console.error('❌ Error updating page:', error.message)
  }
}

updateWebsitePage()