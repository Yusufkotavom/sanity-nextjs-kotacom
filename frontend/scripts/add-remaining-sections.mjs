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

const additionalBlocks = [
  // Portfolio Section Header
  {
    _type: "section-header",
    _key: "portfolio-header",
    tagLine: "Portfolio Website Terbaru",
    title: "Lihat hasil karya website profesional yang telah kami buat untuk berbagai klien"
  },

  // Portfolio Grid
  {
    _type: "grid-row",
    _key: "portfolio-grid",
    colorVariant: "background",
    gridColumns: "grid-cols-3",
    columns: [
      {
        _key: "portfolio-ecommerce",
        _type: "grid-card",
        title: "Toko Fashion Online",
        excerpt: "Website e-commerce lengkap dengan payment gateway dan admin dashboard.",
        features: ["E-commerce", "4.9 Rating", "Butik Cantik Collection", "+230% Omset"]
      },
      {
        _key: "portfolio-restaurant",
        _type: "grid-card",
        title: "Warung Makan Sederhana",
        excerpt: "Website restoran dengan online ordering dan integrasi GoFood.",
        features: ["Restoran", "4.8 Rating", "F&B Business", "+165% Omset"]
      },
      {
        _key: "portfolio-healthcare",
        _type: "grid-card",
        title: "Klinik Sehat Bersama",
        excerpt: "Website klinik dengan sistem appointment dan patient portal.",
        features: ["Healthcare", "4.9 Rating", "Healthcare", "+220% Pasien"]
      }
    ]
  },

  // Portfolio CTA
  {
    _type: "cta-1",
    _key: "portfolio-cta",
    colorVariant: "muted",
    stackAlign: "center",
    title: "Lihat Portfolio Lengkap",
    links: [
      {
        _key: "portfolio-link",
        _type: "link",
        isExternal: true,
        title: "Lihat Semua Portfolio",
        href: "/projects",
        buttonVariant: "default"
      }
    ]
  },

  // Detailed Pricing Section Header
  {
    _type: "section-header",
    _key: "pricing-header",
    tagLine: "💰 Paket Harga Terjangkau",
    title: "Pilih Paket Website yang Tepat untuk Bisnis Anda",
    description: "Setiap paket dirancang khusus untuk memenuhi kebutuhan bisnis Anda dengan fitur lengkap dan harga terjangkau"
  },

  // Detailed Pricing Cards
  {
    _type: "grid-row",
    _key: "detailed-pricing",
    colorVariant: "background",
    gridColumns: "grid-cols-3",
    columns: [
      {
        _key: "starter-package",
        _type: "pricing-card",
        title: "Paket Starter",
        excerpt: "Perfect untuk bisnis baru mulai dari nol",
        price: 500000,
        currency: "IDR",
        timeline: "⏱️ 1-2 minggu pengerjaan",
        features: [
          "5 Halaman utama (Home, About, Services, Portfolio, Contact)",
          "Responsive Design (Mobile & Desktop)",
          "Modern UI/UX Design",
          "Contact Form dengan validasi",
          "Google Maps Integration",
          "WhatsApp Integration",
          "SEO Basic Optimization",
          "Fast Loading Speed",
          "SSL Certificate",
          "1 Tahun Hosting & Domain",
          "3 Bulan Support Gratis",
          "Training Penggunaan"
        ],
        link: {
          _type: "link",
          isExternal: false,
          title: "Pilih Paket Starter",
          buttonVariant: "default"
        }
      },
      {
        _key: "professional-package",
        _type: "pricing-card",
        title: "Paket Professional",
        excerpt: "Untuk bisnis yang berkembang dan butuh fitur lengkap",
        price: 990000,
        currency: "IDR",
        timeline: "⏱️ 2-3 minggu pengerjaan",
        isPopular: true,
        features: [
          "10+ Halaman lengkap",
          "Custom Design Premium",
          "Advanced Animations",
          "Product Catalog Management",
          "Shopping Cart & Checkout",
          "Payment Gateway Integration",
          "Order Management System",
          "Admin Dashboard",
          "Content Management System",
          "Analytics & Reporting",
          "User Management",
          "Advanced SEO Optimization",
          "Social Media Integration",
          "Email Marketing Setup",
          "Marketplace Integration",
          "6 Bulan Support Premium",
          "Monthly Performance Reports",
          "Security Updates"
        ],
        link: {
          _type: "link",
          isExternal: false,
          title: "Pilih Paket Professional",
          buttonVariant: "default"
        }
      },
      {
        _key: "enterprise-package",
        _type: "pricing-card",
        title: "Paket Enterprise",
        excerpt: "Untuk kebutuhan khusus enterprise & custom development",
        price: 1999000,
        currency: "IDR",
        timeline: "⏱️ 3-4 minggu pengerjaan",
        features: [
          "Full Custom Development",
          "Microservices Architecture",
          "Cloud Infrastructure Setup",
          "API Development & Integration",
          "Multi-user Management System",
          "Role-based Access Control",
          "Advanced Reporting Dashboard",
          "Data Analytics Integration",
          "Enterprise-grade Security",
          "CDN & Performance Optimization",
          "Backup & Disaster Recovery",
          "24/7 Monitoring & Alerts",
          "Dedicated Account Manager",
          "Priority Support 24/7",
          "1 Tahun Full Maintenance",
          "Monthly Strategy Consultation"
        ],
        link: {
          _type: "link",
          isExternal: false,
          title: "Konsultasi Enterprise",
          buttonVariant: "default"
        }
      }
    ]
  },

  // Custom Package CTA
  {
    _type: "cta-1",
    _key: "custom-package-cta",
    colorVariant: "muted",
    stackAlign: "center",
    title: "Butuh Paket Custom?",
    body: [
      {
        _key: "custom-body",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "custom-span",
            _type: "span",
            marks: [],
            text: "Kami juga menyediakan paket custom sesuai dengan kebutuhan spesifik bisnis Anda. Konsultasikan requirement Anda dengan tim kami untuk mendapatkan solusi terbaik."
          }
        ]
      }
    ],
    links: [
      {
        _key: "custom-link",
        _type: "link",
        isExternal: false,
        title: "Konsultasi Gratis",
        buttonVariant: "default"
      }
    ]
  },

  // Testimonials Section Header
  {
    _type: "section-header",
    _key: "testimonials-header",
    tagLine: "Apa Kata Klien Kami?",
    title: "Testimoni dari klien yang telah merasakan manfaat website profesional"
  },

  // Testimonials Grid
  {
    _type: "grid-row",
    _key: "testimonials-grid",
    colorVariant: "muted",
    gridColumns: "grid-cols-3",
    columns: [
      {
        _key: "testimonial-1",
        _type: "grid-card",
        title: "Ibu Sari Indrawati",
        excerpt: "\"Website e-commerce dari kotacom.id sangat membantu bisnis fashion kami. Sekarang bisa jual online dengan mudah dan omset naik 230% dalam 8 bulan!\"",
        features: ["Owner Butik Cantik Collection"]
      },
      {
        _key: "testimonial-2",
        _type: "grid-card",
        title: "Bapak Ahmad Subandi",
        excerpt: "\"Tim kotacom.id sangat profesional dalam membuat website restoran kami. Sekarang customer bisa order online dan omset naik drastis!\"",
        features: ["Owner Warung Makan Sederhana"]
      },
      {
        _key: "testimonial-3",
        _type: "grid-card",
        title: "dr. Sinta Maharani",
        excerpt: "\"Website klinik yang dibuat kotacom.id sangat membantu pasien untuk booking appointment online. Pelayanan jadi lebih efisien dan pasien puas!\"",
        features: ["Direktur Medis Klinik Sehat Bersama"]
      }
    ]
  },

  // Why Choose Us Section Header
  {
    _type: "section-header",
    _key: "why-choose-header",
    tagLine: "Keunggulan Kami",
    title: "Mengapa Memilih Kotacom?",
    description: "Kami menawarkan solusi terbaik dengan komitmen penuh terhadap kualitas dan kepuasan klien."
  },

  // Why Choose Us Grid
  {
    _type: "grid-row",
    _key: "why-choose-grid",
    colorVariant: "background",
    gridColumns: "grid-cols-2",
    columns: [
      {
        _key: "affordable-price",
        _type: "grid-card",
        title: "Harga Terjangkau",
        excerpt: "Dapatkan website berkualitas tinggi dengan harga yang kompetitif."
      },
      {
        _key: "satisfaction-guarantee",
        _type: "grid-card",
        title: "Garansi Kepuasan 100%",
        excerpt: "Kami menjamin kepuasan Anda dengan revisi tanpa batas."
      },
      {
        _key: "expert-team",
        _type: "grid-card",
        title: "Tim Ahli & Profesional",
        excerpt: "Dikerjakan oleh tim berpengalaman dan ahli di bidangnya."
      },
      {
        _key: "transparent-process",
        _type: "grid-card",
        title: "Proses Kerja Transparan",
        excerpt: "Kami akan selalu mengupdate progress proyek Anda secara berkala."
      }
    ]
  },

  // Template Section Header
  {
    _type: "section-header",
    _key: "template-header",
    tagLine: "🎨 Template Premium",
    title: "Template Website Premium Siap Pakai",
    description: "Website online dalam 24 jam dengan template premium yang sudah teruji di berbagai industri"
  },

  // Template Categories Grid
  {
    _type: "grid-row",
    _key: "template-categories",
    colorVariant: "background",
    gridColumns: "grid-cols-4",
    columns: [
      {
        _key: "corporate-template",
        _type: "grid-card",
        title: "Corporate Tech Modern",
        excerpt: "Template modern untuk perusahaan teknologi dengan clean design dan animasi smooth",
        price: 750000,
        currency: "IDR",
        features: ["Hero Section dengan Video", "Product Showcase Grid", "Responsive Navigation"],
        link: {
          _type: "link",
          isExternal: false,
          title: "Pilih Template Ini",
          buttonVariant: "default"
        }
      },
      {
        _key: "ecommerce-template",
        _type: "grid-card",
        title: "E-commerce Professional",
        excerpt: "Template lengkap untuk toko online dengan katalog produk dan sistem keranjang",
        price: 990000,
        currency: "IDR",
        features: ["Product Catalog Management", "Shopping Cart & Checkout", "Payment Integration"],
        link: {
          _type: "link",
          isExternal: false,
          title: "Pilih Template Ini",
          buttonVariant: "default"
        }
      },
      {
        _key: "restaurant-template",
        _type: "grid-card",
        title: "Fast Food Restaurant",
        excerpt: "Template untuk restoran cepat saji dengan menu digital dan online ordering",
        price: 650000,
        currency: "IDR",
        features: ["Digital Menu Display", "Online Ordering System", "Mobile App Integration"],
        link: {
          _type: "link",
          isExternal: false,
          title: "Pilih Template Ini",
          buttonVariant: "default"
        }
      },
      {
        _key: "healthcare-template",
        _type: "grid-card",
        title: "Medical Clinic Professional",
        excerpt: "Template untuk klinik kesehatan dengan appointment system dan medical directory",
        price: 850000,
        currency: "IDR",
        features: ["Appointment Booking System", "Medical Directory", "Patient Portal"],
        link: {
          _type: "link",
          isExternal: false,
          title: "Pilih Template Ini",
          buttonVariant: "default"
        }
      }
    ]
  },

  // Template Custom CTA
  {
    _type: "cta-1",
    _key: "template-custom-cta",
    colorVariant: "muted",
    stackAlign: "center",
    title: "Tidak Temukan Template yang Cocok?",
    body: [
      {
        _key: "template-custom-body",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "template-custom-span",
            _type: "span",
            marks: [],
            text: "Kami memiliki lebih dari 100+ template premium lainnya. Konsultasikan kebutuhan spesifik bisnis Anda dan dapatkan template custom yang sesuai."
          }
        ]
      }
    ],
    links: [
      {
        _key: "template-custom-link",
        _type: "link",
        isExternal: false,
        title: "Konsultasi Template Custom",
        buttonVariant: "default"
      }
    ]
  },

  // Final CTA Section
  {
    _type: "cta-1",
    _key: "final-cta",
    colorVariant: "primary",
    stackAlign: "center",
    title: "Siap Meningkatkan Bisnis dengan Website Profesional?",
    body: [
      {
        _key: "final-body",
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [
          {
            _key: "final-span",
            _type: "span",
            marks: [],
            text: "Jangan biarkan kompetitor unggul di dunia digital. Mulai transformasi bisnis Anda sekarang juga!"
          }
        ]
      }
    ],
    links: [
      {
        _key: "final-link-1",
        _type: "link",
        isExternal: false,
        title: "Konsultasi Gratis Sekarang",
        buttonVariant: "default"
      },
      {
        _key: "final-link-2",
        _type: "link",
        isExternal: true,
        title: "(0857) 9952-0350",
        href: "tel:085799520350",
        buttonVariant: "outline"
      }
    ]
  },

  // Final Stats
  {
    _type: "grid-row",
    _key: "final-stats",
    colorVariant: "primary",
    gridColumns: "grid-cols-3",
    columns: [
      {
        _key: "final-stat-1",
        _type: "grid-card",
        title: "200+",
        excerpt: "Website Sukses"
      },
      {
        _key: "final-stat-2",
        _type: "grid-card",
        title: "98%",
        excerpt: "Kepuasan Klien"
      },
      {
        _key: "final-stat-3",
        _type: "grid-card",
        title: "24/7",
        excerpt: "Support"
      }
    ]
  }
]

async function addRemainingSections() {
  try {
    console.log('Adding remaining sections to the website page...')
    
    // Get current page
    const currentPage = await client.fetch(
      `*[_id == "page-jasa-pembuatan-website-surabaya"][0]`
    )
    
    if (!currentPage) {
      console.log('❌ Page not found')
      return
    }

    // Append new blocks to existing blocks
    const updatedBlocks = [...currentPage.blocks, ...additionalBlocks]
    
    // Update the page
    const result = await client
      .patch('page-jasa-pembuatan-website-surabaya')
      .set({ blocks: updatedBlocks })
      .commit()
    
    console.log('✅ Successfully added remaining sections')
    console.log('📝 Total blocks now:', result.blocks.length)
    console.log('➕ Added blocks:', additionalBlocks.length)
    
    console.log('\n📋 New block breakdown:')
    const blockCounts = {}
    result.blocks.forEach(block => {
      blockCounts[block._type] = (blockCounts[block._type] || 0) + 1
    })
    
    Object.entries(blockCounts).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count}`)
    })

  } catch (error) {
    console.error('❌ Error adding sections:', error.message)
  }
}

addRemainingSections()