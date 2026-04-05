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

const visualPageData = {
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
    // Hero Section with Visual Impact
    {
      _type: "hero-2",
      _key: "hero-visual",
      tagLine: "🚀 200+ Website Sukses Dibuat",
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
              text: "Tingkatkan omset bisnis Anda hingga 200% dengan website profesional yang responsif dan SEO-friendly. Dipercaya oleh 200+ klien di Surabaya dan sekitarnya."
            }
          ]
        }
      ],
      links: [
        {
          _key: "hero-link-1",
          _type: "link",
          isExternal: true,
          title: "💬 Chat WhatsApp",
          href: "https://wa.me/6285799520350",
          buttonVariant: "default"
        },
        {
          _key: "hero-link-2", 
          _type: "link",
          isExternal: true,
          title: "📱 Lihat Portfolio",
          href: "/projects",
          buttonVariant: "link"
        }
      ]
    },

    // Logo Cloud - Client Trust
    {
      _type: "logo-cloud-1",
      _key: "client-trust",
      colorVariant: "muted",
      title: "Dipercaya oleh 200+ bisnis di Surabaya & Jawa Timur"
    },

    // Split Layout - Visual Benefits with Image
    {
      _type: "split-row",
      _key: "benefits-visual",
      colorVariant: "background",
      noGap: false,
      splitColumns: [
        {
          _key: "benefits-content",
          _type: "split-content",
          tagLine: "🎯 Mengapa Website Penting?",
          title: "Tingkatkan Omset Hingga 200% dengan Website Profesional",
          body: [
            {
              _key: "benefits-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "benefits-span",
                  _type: "span",
                  marks: [],
                  text: "Website bukan lagi pilihan, tapi kebutuhan utama untuk bisnis modern. 85% pelanggan lebih mempercayai bisnis dengan website profesional. Jangkau pelanggan global 24/7 dan hemat 70% biaya pemasaran dibanding iklan tradisional."
                }
              ]
            }
          ],
          link: {
            _type: "link",
            isExternal: false,
            title: "🚀 Mulai Sekarang",
            buttonVariant: "default"
          }
        },
        {
          _key: "benefits-stats",
          _type: "split-cards-list",
          list: [
            {
              _key: "stat-omset",
              _type: "split-card",
              tagLine: "📈 Peningkatan Omset",
              title: "200%",
              body: [
                {
                  _key: "stat-omset-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "stat-omset-span",
                      _type: "span",
                      marks: [],
                      text: "Rata-rata peningkatan omset klien kami setelah memiliki website profesional"
                    }
                  ]
                }
              ]
            },
            {
              _key: "stat-trust",
              _type: "split-card",
              tagLine: "⭐ Kepercayaan Pelanggan",
              title: "85%",
              body: [
                {
                  _key: "stat-trust-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "stat-trust-span",
                      _type: "span",
                      marks: [],
                      text: "Pelanggan lebih mempercayai bisnis dengan website profesional"
                    }
                  ]
                }
              ]
            },
            {
              _key: "stat-savings",
              _type: "split-card",
              tagLine: "💰 Penghematan Biaya",
              title: "70%",
              body: [
                {
                  _key: "stat-savings-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "stat-savings-span",
                      _type: "span",
                      marks: [],
                      text: "Lebih hemat dibanding iklan tradisional dengan jangkauan global 24/7"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // WhatsApp CTA - Engaging
    {
      _type: "whatsapp-cta",
      _key: "whatsapp-urgent",
      colorVariant: "destructive",
      stackAlign: "center",
      tagLine: "⚠️ Jangan Terlambat!",
      title: "85% bisnis tanpa website kehilangan 200% peluang penjualan",
      body: [
        {
          _key: "urgent-body",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "urgent-span",
              _type: "span",
              marks: [],
              text: "Kompetitor Anda sudah online! Jangan biarkan mereka unggul. Konsultasi gratis sekarang dan dapatkan website profesional dalam 1-2 minggu."
            }
          ]
        }
      ],
      secondaryLink: {
        _type: "link",
        isExternal: true,
        title: "📞 (0857) 9952-0350",
        href: "tel:085799520350",
        buttonVariant: "outline"
      }
    },

    // Split Layout - Website Types with Visual Appeal
    {
      _type: "split-row",
      _key: "website-types-visual",
      colorVariant: "muted",
      splitColumns: [
        {
          _key: "types-intro",
          _type: "split-content",
          tagLine: "🎨 Pilih Jenis Website Anda",
          title: "Kami Buat Website Sesuai Kebutuhan Bisnis Anda",
          body: [
            {
              _key: "types-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "types-span",
                  _type: "span",
                  marks: [],
                  text: "Dari company profile hingga toko online lengkap, kami siap membantu berbagai jenis bisnis. Tidak yakin jenis website yang cocok? Tim ahli kami siap konsultasi gratis!"
                }
              ]
            }
          ],
          link: {
            _type: "link",
            isExternal: false,
            title: "💬 Konsultasi Gratis",
            buttonVariant: "default"
          }
        },
        {
          _key: "types-list",
          _type: "split-cards-list",
          list: [
            {
              _key: "type-company",
              _type: "split-card",
              tagLine: "🏢 Company Profile",
              title: "Mulai Rp 500K",
              body: [
                {
                  _key: "type-company-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "type-company-span",
                      _type: "span",
                      marks: [],
                      text: "Website profesional untuk memperkenalkan perusahaan. Responsive, SEO-friendly, 1-2 minggu selesai."
                    }
                  ]
                }
              ]
            },
            {
              _key: "type-ecommerce",
              _type: "split-card",
              tagLine: "🛒 Toko Online (POPULER)",
              title: "Mulai Rp 990K",
              body: [
                {
                  _key: "type-ecommerce-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "type-ecommerce-span",
                      _type: "span",
                      marks: [],
                      text: "E-commerce lengkap dengan payment gateway, admin dashboard, 2-3 minggu selesai."
                    }
                  ]
                }
              ]
            },
            {
              _key: "type-custom",
              _type: "split-card",
              tagLine: "⚙️ Custom Application",
              title: "Mulai Rp 1.999K",
              body: [
                {
                  _key: "type-custom-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "type-custom-span",
                      _type: "span",
                      marks: [],
                      text: "Aplikasi web khusus sesuai kebutuhan bisnis. Database integration, API, 3-4 minggu."
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // Timeline - Visual Process
    {
      _type: "timeline-row",
      _key: "process-timeline",
      colorVariant: "background",
      timelines: [
        {
          _key: "timeline-konsultasi",
          _type: "timelines-1",
          title: "Konsultasi & Analisis",
          tagLine: "Hari 1-2",
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
                  text: "Diskusi kebutuhan bisnis, target audience, dan fitur yang diinginkan. Gratis konsultasi via WhatsApp atau meeting."
                }
              ]
            }
          ]
        },
        {
          _key: "timeline-design",
          _type: "timelines-1",
          title: "Design & Development",
          tagLine: "Minggu 1-3",
          body: [
            {
              _key: "design-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "design-span",
                  _type: "span",
                  marks: [],
                  text: "Pembuatan design mockup, development website, dan testing. Update progress berkala via WhatsApp."
                }
              ]
            }
          ]
        },
        {
          _key: "timeline-launch",
          _type: "timelines-1",
          title: "Launch & Support",
          tagLine: "Minggu 4+",
          body: [
            {
              _key: "launch-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "launch-span",
                  _type: "span",
                  marks: [],
                  text: "Website live, training penggunaan, dan support 24/7. Garansi 1 tahun untuk semua paket."
                }
              ]
            }
          ]
        }
      ]
    },

    // Split Layout - Package Features Visual
    {
      _type: "split-row",
      _key: "package-features-visual",
      colorVariant: "primary",
      splitColumns: [
        {
          _key: "package-content",
          _type: "split-content",
          tagLine: "🎁 Paket Lengkap",
          title: "Lebih dari Sekadar Website, Solusi Digital Lengkap!",
          body: [
            {
              _key: "package-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "package-span",
                  _type: "span",
                  marks: [],
                  text: "Dapatkan website responsive premium, SEO optimization, hosting & domain, support 24/7, training lengkap, plus bonus logo design dan social media setup!"
                }
              ]
            }
          ],
          link: {
            _type: "link",
            isExternal: false,
            title: "🎯 Lihat Paket Lengkap",
            buttonVariant: "default"
          }
        },
        {
          _key: "package-features",
          _type: "split-cards-list",
          list: [
            {
              _key: "feature-responsive",
              _type: "split-card",
              tagLine: "📱 100% Mobile Responsive",
              title: "Design Modern",
              body: [
                {
                  _key: "responsive-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "responsive-span",
                      _type: "span",
                      marks: [],
                      text: "Tampil sempurna di desktop, tablet, dan mobile dengan loading super cepat"
                    }
                  ]
                }
              ]
            },
            {
              _key: "feature-seo",
              _type: "split-card",
              tagLine: "🚀 SEO Optimization",
              title: "Ranking Google",
              body: [
                {
                  _key: "seo-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "seo-span",
                      _type: "span",
                      marks: [],
                      text: "Meta tags, schema markup, Google Analytics setup untuk ranking teratas"
                    }
                  ]
                }
              ]
            },
            {
              _key: "feature-support",
              _type: "split-card",
              tagLine: "🛡️ Support 24/7",
              title: "Garansi 1 Tahun",
              body: [
                {
                  _key: "support-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "support-span",
                      _type: "span",
                      marks: [],
                      text: "Maintenance, backup, security monitoring, dan technical support penuh"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // Carousel - Portfolio Showcase
    {
      _type: "section-header",
      _key: "portfolio-header",
      tagLine: "🏆 Portfolio Terbaru",
      title: "Website Profesional yang Telah Kami Buat",
      description: "Lihat hasil karya website yang telah meningkatkan omset klien hingga 230%"
    },

    {
      _type: "carousel-1",
      _key: "portfolio-carousel",
      colorVariant: "muted",
      size: "three",
      indicators: "dots"
    },

    // Split Layout - Testimonials Visual
    {
      _type: "split-row",
      _key: "testimonials-visual",
      colorVariant: "background",
      splitColumns: [
        {
          _key: "testimonials-intro",
          _type: "split-content",
          tagLine: "💬 Kata Klien Kami",
          title: "Testimoni Nyata dari Bisnis yang Sukses",
          body: [
            {
              _key: "testimonials-body",
              _type: "block",
              style: "normal",
              markDefs: [],
              children: [
                {
                  _key: "testimonials-span",
                  _type: "span",
                  marks: [],
                  text: "Lebih dari 200 klien telah merasakan manfaat website profesional dari Kotacom. Rata-rata peningkatan omset 200% dalam 6-12 bulan!"
                }
              ]
            }
          ],
          link: {
            _type: "link",
            isExternal: true,
            title: "📱 Lihat Semua Testimoni",
            href: "/testimonials",
            buttonVariant: "default"
          }
        },
        {
          _key: "testimonials-list",
          _type: "split-cards-list",
          list: [
            {
              _key: "testimoni-sari",
              _type: "split-card",
              tagLine: "⭐⭐⭐⭐⭐ Butik Cantik Collection",
              title: "Ibu Sari Indrawati",
              body: [
                {
                  _key: "sari-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "sari-span",
                      _type: "span",
                      marks: [],
                      text: "\"Website e-commerce dari kotacom.id sangat membantu bisnis fashion kami. Omset naik 230% dalam 8 bulan!\""
                    }
                  ]
                }
              ]
            },
            {
              _key: "testimoni-ahmad",
              _type: "split-card",
              tagLine: "⭐⭐⭐⭐⭐ Warung Makan Sederhana",
              title: "Bapak Ahmad Subandi",
              body: [
                {
                  _key: "ahmad-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "ahmad-span",
                      _type: "span",
                      marks: [],
                      text: "\"Tim kotacom.id sangat profesional. Customer bisa order online dan omset naik drastis!\""
                    }
                  ]
                }
              ]
            },
            {
              _key: "testimoni-sinta",
              _type: "split-card",
              tagLine: "⭐⭐⭐⭐⭐ Klinik Sehat Bersama",
              title: "dr. Sinta Maharani",
              body: [
                {
                  _key: "sinta-body",
                  _type: "block",
                  style: "normal",
                  markDefs: [],
                  children: [
                    {
                      _key: "sinta-span",
                      _type: "span",
                      marks: [],
                      text: "\"Website klinik membantu pasien booking appointment online. Pelayanan jadi lebih efisien!\""
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },

    // FAQ Section
    {
      _type: "section-header",
      _key: "faq-header",
      tagLine: "❓ Tanya Jawab",
      title: "Pertanyaan yang Sering Ditanyakan",
      description: "Temukan jawaban lengkap untuk pertanyaan umum tentang jasa pembuatan website kami"
    },

    {
      _type: "faqs",
      _key: "website-faqs",
      colorVariant: "background",
      faqs: [
        { _type: "reference", _ref: "faq-website-timeline", _key: "ref-timeline" },
        { _type: "reference", _ref: "faq-website-technology", _key: "ref-technology" },
        { _type: "reference", _ref: "faq-mobile-friendly", _key: "ref-mobile" },
        { _type: "reference", _ref: "faq-seo-optimization", _key: "ref-seo" },
        { _type: "reference", _ref: "faq-maintenance-cost", _key: "ref-maintenance" }
      ]
    },

    // WhatsApp CTA - Final Push
    {
      _type: "whatsapp-cta",
      _key: "final-whatsapp",
      colorVariant: "primary",
      stackAlign: "center",
      tagLine: "🚀 Siap Meningkatkan Bisnis?",
      title: "Jangan Biarkan Kompetitor Unggul di Dunia Digital!",
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
              text: "Mulai transformasi digital bisnis Anda sekarang! Konsultasi gratis, estimasi harga transparan, dan garansi kepuasan 100%. Chat sekarang dan dapatkan website profesional dalam 1-2 minggu!"
            }
          ]
        }
      ],
      secondaryLink: {
        _type: "link",
        isExternal: true,
        title: "📞 (0857) 9952-0350",
        href: "tel:085799520350",
        buttonVariant: "outline"
      }
    }
  ]
}

async function createVisualWebsitePage() {
  try {
    console.log('Creating visual and engaging website page...')
    
    // Replace the existing page completely
    const result = await client
      .createOrReplace(visualPageData)
    
    console.log('✅ Successfully created visual website page:', result._id)
    console.log('📄 Title:', result.title)
    console.log('🔗 Slug:', result.slug.current)
    console.log('📝 Total blocks:', result.blocks.length)
    
    console.log('\n🎨 Visual components used:')
    const blockCounts = {}
    result.blocks.forEach(block => {
      blockCounts[block._type] = (blockCounts[block._type] || 0) + 1
    })
    
    Object.entries(blockCounts).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count}`)
    })

  } catch (error) {
    console.error('❌ Error creating visual page:', error.message)
  }
}

createVisualWebsitePage()