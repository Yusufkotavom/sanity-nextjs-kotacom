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

const pageData = {
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
    // Hero Section
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
          isExternal: false,
          title: "Konsultasi Gratis",
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

    // Section Header - Jenis Website
    {
      _type: "section-header",
      _key: "jenis-website-header",
      tagLine: "Pilih Jenis Website Anda",
      title: "Kami siap membantu Anda membuat berbagai jenis website sesuai kebutuhan bisnis",
      description: "Tidak yakin jenis website yang cocok? Konsultasikan dengan tim ahli kami"
    },

    // Grid - Jenis Website
    {
      _type: "grid-row",
      _key: "jenis-website-grid",
      colorVariant: "background",
      gridColumns: "grid-cols-3",
      columns: [
        {
          _key: "website-company",
          _type: "grid-card",
          title: "Website Company Profile",
          excerpt: "Website profesional untuk memperkenalkan perusahaan dan layanan Anda kepada calon pelanggan.",
          features: ["Responsive Design", "SEO Optimized", "Contact Form"],
          price: 500000,
          currency: "IDR",
          timeline: "1-2 minggu",
          link: {
            _type: "link",
            isExternal: false,
            title: "Mulai Sekarang",
            buttonVariant: "default"
          }
        },
        {
          _key: "website-toko",
          _type: "grid-card", 
          title: "Website Toko Online",
          excerpt: "Platform e-commerce lengkap untuk menjual produk online dengan sistem pembayaran terintegrasi.",
          features: ["Shopping Cart", "Payment Gateway", "Admin Dashboard"],
          price: 990000,
          currency: "IDR",
          timeline: "2-3 minggu",
          isPopular: true,
          link: {
            _type: "link",
            isExternal: false,
            title: "Mulai Sekarang",
            buttonVariant: "default"
          }
        },
        {
          _key: "website-custom",
          _type: "grid-card",
          title: "Aplikasi Web Custom",
          excerpt: "Solusi web application khusus sesuai kebutuhan spesifik bisnis dan proses internal perusahaan.",
          features: ["Custom Features", "Database Integration", "API Integration"],
          price: 1999000,
          currency: "IDR", 
          timeline: "3-4 minggu",
          link: {
            _type: "link",
            isExternal: false,
            title: "Konsultasi",
            buttonVariant: "default"
          }
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

    // Split Row - Keuntungan
    {
      _type: "split-row",
      _key: "keuntungan-split",
      colorVariant: "background",
      splitColumns: [
        {
          _key: "keuntungan-content",
          _type: "split-content",
          tagLine: "Transformasi Digital",
          title: "Tingkatkan Omset & Kredibilitas Bisnis",
          body: [
            {
              _key: "keuntungan-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "keuntungan-span",
                  _type: "span",
                  marks: [],
                  text: "Website memungkinkan bisnis Anda beroperasi 24/7, menjangkau pelanggan potensial di seluruh dunia, dan meningkatkan konversi penjualan melalui pemasaran digital yang efektif."
                }
              ]
            }
          ],
          link: {
            _type: "link",
            isExternal: false,
            title: "Konsultasi Gratis Sekarang",
            buttonVariant: "default"
          }
        },
        {
          _key: "keuntungan-list",
          _type: "split-info-list",
          list: [
            {
              _key: "omset",
              _type: "split-info",
              title: "📈 200% Peningkatan Omset",
              body: [
                {
                  _key: "omset-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "omset-span",
                      _type: "span",
                      marks: [],
                      text: "Rata-rata peningkatan omset klien kami setelah memiliki website profesional"
                    }
                  ]
                }
              ],
              tags: ["Penjualan", "ROI"]
            },
            {
              _key: "kredibilitas",
              _type: "split-info",
              title: "⭐ 85% Lebih Dipercaya",
              body: [
                {
                  _key: "kredibilitas-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "kredibilitas-span",
                      _type: "span",
                      marks: [],
                      text: "Pelanggan lebih mempercayai bisnis dengan website profesional"
                    }
                  ]
                }
              ],
              tags: ["Trust", "Branding"]
            },
            {
              _key: "global",
              _type: "split-info",
              title: "🌍 Jangkauan Global 24/7",
              body: [
                {
                  _key: "global-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "global-span",
                      _type: "span",
                      marks: [],
                      text: "Pelanggan dari seluruh dunia dapat mengakses bisnis Anda kapan saja"
                    }
                  ]
                }
              ],
              tags: ["24/7", "Global"]
            }
          ]
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

    // Grid - Fitur Paket
    {
      _type: "grid-row",
      _key: "paket-grid",
      colorVariant: "muted",
      gridColumns: "grid-cols-2",
      columns: [
        {
          _key: "responsive",
          _type: "grid-card",
          title: "Website Responsive Premium",
          excerpt: "Website yang tampil sempurna di semua device (desktop, tablet, mobile) dengan design modern dan user-friendly interface.",
          features: ["Design Modern & Professional"]
        },
        {
          _key: "seo",
          _type: "grid-card",
          title: "SEO Optimization Lengkap",
          excerpt: "Optimasi SEO profesional untuk meningkatkan peringkat website Anda di mesin pencari Google dan menjangkau lebih banyak pelanggan potensial.",
          features: ["Meta Tags & Schema Markup"]
        },
        {
          _key: "support",
          _type: "grid-card",
          title: "Support & Maintenance 24/7",
          excerpt: "Dukungan teknis profesional dan maintenance website selama 1 tahun penuh. Kami siap membantu Anda kapan saja diperlukan.",
          features: ["Regular Updates & Backups"]
        },
        {
          _key: "hosting",
          _type: "grid-card",
          title: "Domain & Hosting Premium",
          excerpt: "Domain .com/.id premium dan hosting berkualitas tinggi dengan uptime 99.9%. Website Anda selalu online dan dapat diakses dengan cepat.",
          features: ["Domain Premium (.com/.id)"]
        }
      ]
    },

    // CTA Section
    {
      _type: "cta-1",
      _key: "cta-main",
      colorVariant: "primary",
      stackAlign: "center",
      tagLine: "Siap Meningkatkan Bisnis?",
      title: "Jangan biarkan kompetitor unggul di dunia digital",
      body: [
        {
          _key: "cta-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "cta-span",
              _type: "span",
              marks: [],
              text: "Mulai transformasi bisnis Anda sekarang juga dengan website profesional yang terpercaya!"
            }
          ]
        }
      ],
      links: [
        {
          _key: "cta-link-1",
          _type: "link",
          isExternal: false,
          title: "Konsultasi Gratis Sekarang",
          buttonVariant: "default"
        },
        {
          _key: "cta-link-2",
          _type: "link",
          isExternal: true,
          title: "(0857) 9952-0350",
          href: "tel:085799520350",
          buttonVariant: "outline"
        }
      ]
    }
  ]
}

async function createWebsitePage() {
  try {
    console.log('Creating Jasa Pembuatan Website Surabaya page...')
    
    // Check if page already exists
    const existingPage = await client.fetch(
      `*[_type == "page" && slug.current == $slug][0]`,
      { slug: "jasa-pembuatan-website-surabaya" }
    )

    if (existingPage) {
      console.log('❌ Page already exists with this slug')
      return
    }

    // Create the page
    const result = await client.create(pageData)
    console.log('✅ Successfully created page:', result._id)
    console.log('📄 Title:', result.title)
    console.log('🔗 Slug:', result.slug.current)
    console.log('📝 Blocks created:', result.blocks.length)

  } catch (error) {
    console.error('❌ Error creating page:', error.message)
  }
}

createWebsitePage()