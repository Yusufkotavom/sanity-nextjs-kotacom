/**
 * generate-page-thumbnails.mjs
 *
 * Batch generate page thumbnails menggunakan 2 Vercel AI Gateway key:
 *   KEY1 → xai/grok-imagine-image ($0.02/img) ~125 images
 *   KEY2 → google/imagen-4.0-generate-001 ($0.04/img) ~70 images
 *
 * Run: node --env-file=../vercel-frontend.env scripts/generate-page-thumbnails.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'page-thumbnails');
fs.mkdirSync(outputDir, { recursive: true });

const KEY1 = process.env.AI_GATEWAY_API_KEY;        // Grok key
const KEY2 = process.env.VERCEL_API_KEY || ''; // Imagen key

const GATEWAY = 'https://ai-gateway.vercel.sh/v1/images/generations';
const BRAND   = 'with subtle "Kotacom" brand text in bottom center in white semi-transparent clean sans-serif font';

// ─── BATCH 1: Key1 — Grok ($0.02 × 125 = ~$2.50) ────────────────────────────
const GROK_BATCHES = [

  // ── Homepage (3 variations) ──
  { cat:'homepage', v:1, model:'xai/grok-imagine-image', file:'home_grok_1.png',
    prompt:`Premium square hero thumbnail for Indonesian IT company Kotacom Surabaya homepage. Dark deep navy blue to midnight blue gradient background. Futuristic holographic cityscape of Surabaya with glowing network nodes and data streams. Central glowing laptop showing a modern business dashboard. ${BRAND}. Photorealistic digital art style. 1024x1024.` },
  { cat:'homepage', v:2, model:'xai/grok-imagine-image', file:'home_grok_2.png',
    prompt:`Square hero thumbnail for Indonesian IT Company Kotacom homepage. Dark space-black background with electric blue and purple nebula-like gradient. Abstract digital globe made of glowing data lines in center. Floating tech icons around: world, gear, code brackets, cloud. ${BRAND}. Premium vibrant illustration.` },
  { cat:'homepage', v:3, model:'xai/grok-imagine-image', file:'home_grok_3.png',
    prompt:`Square thumbnail for IT solutions company homepage. Dark charcoal background with cyan and teal gradient rays. Central modern office setup with team of diverse Indonesian professionals working on laptops with holographic overlays. Professional corporate photography mixed with digital art. ${BRAND}.` },

  // ── Layanan / Services Overview (4 variations) ──
  { cat:'layanan', v:1, model:'xai/grok-imagine-image', file:'layanan_grok_1.png',
    prompt:`Square hero thumbnail for Indonesian IT services company Kotacom all services page. Dark deep blue background. Isometric flat-design illustration of 6 floating service cards: globe web icon, gear software icon, printing machine icon, support headset, server rack, wifi tower. Each card glows with neon accents. Premium clean vector art. ${BRAND}.` },
  { cat:'layanan', v:2, model:'xai/grok-imagine-image', file:'layanan_grok_2.png',
    prompt:`Square thumbnail for comprehensive IT solutions services. Dark navy background with indigo gradient. A hexagonal grid of glowing service icons: website development, software, printing, IT support, networking, cloud. Interconnected with light beam lines. Modern tech illustration. ${BRAND}.` },
  { cat:'layanan', v:3, model:'xai/grok-imagine-image', file:'layanan_grok_3.png',
    prompt:`Square thumbnail for Indonesian IT services layanan. Dark slate background. Large central monitor showing services menu with 4 quadrant icons. Blue and teal glow effects. Professional minimalist tech UI design art. ${BRAND}.` },
  { cat:'layanan', v:4, model:'xai/grok-imagine-image', file:'layanan_grok_4.png',
    prompt:`Square thumbnail for Indonesian comprehensive IT company services. Dark background gradient deep purple to black. Circular orbit of glowing tech service icons around central Kotacom logo placeholder. Stars and particles in background. Premium digital space art style. ${BRAND}.` },

  // ── Pembuatan Website (5 variations) ──
  { cat:'website', v:1, model:'xai/grok-imagine-image', file:'website_grok_1.png',
    prompt:`Square hero thumbnail for Indonesian website development service jasa pembuatan website. Dark teal and deep cyan gradient background. Large glowing browser window showing modern Indonesian company website homepage with clean layout. Floating UI elements: toggles, color palettes, fonts. ${BRAND}. Premium tech illustration.` },
  { cat:'website', v:2, model:'xai/grok-imagine-image', file:'website_grok_2.png',
    prompt:`Square thumbnail for web development agency in Indonesia. Dark midnight blue background. Code editor window with colorful HTML/CSS syntax on left, live website preview on right. Responsive design mockup: desktop, tablet, mobile floating. Electric blue accent glow. ${BRAND}. Clean developer art.` },
  { cat:'website', v:3, model:'xai/grok-imagine-image', file:'website_grok_3.png',
    prompt:`Square thumbnail for jasa website company profile Indonesia. Dark charcoal background with green to teal gradient. Split view: left shows wireframe/blueprint, right shows polished final website. Design process visualization. Clean illustrator style. ${BRAND}.` },
  { cat:'website', v:4, model:'xai/grok-imagine-image', file:'website_grok_4.png',
    prompt:`Square thumbnail for e-commerce website development service Indonesia. Dark background with orange and purple gradient. Glowing laptop showing online store UI with product grid, cart, and checkout. Shopping cart icon floating with sparkles. ${BRAND}. Digital commerce art.` },
  { cat:'website', v:5, model:'xai/grok-imagine-image', file:'website_grok_5.png',
    prompt:`Square thumbnail for Indonesian website development landing page. Dark navy gradient. Abstract web of interconnected nodes forming a globe. In center: clean modern website mockup with hero section. Design and development theme. ${BRAND}. Premium vector illustration.` },

  // ── Percetakan / Printing (5 variations) ──
  { cat:'percetakan', v:1, model:'xai/grok-imagine-image', file:'percetakan_grok_1.png',
    prompt:`Square hero thumbnail for Indonesian printing company percetakan Kotacom Surabaya. Dark charcoal and warm golden-orange gradient. Professional large format printing machine with clean sheets coming out. Finished print products floating: business cards, brochures, roll banner, book. Premium illustrator style. ${BRAND}.` },
  { cat:'percetakan', v:2, model:'xai/grok-imagine-image', file:'percetakan_grok_2.png',
    prompt:`Square thumbnail for print shop jasa cetak Indonesia. Warm dark background with amber and brown gradient. Flat-lay composition of printed materials: colorful business cards, folded brochures, stickers, packaging box. Artisan craft photography style. Bold and professional. ${BRAND}.` },
  { cat:'percetakan', v:3, model:'xai/grok-imagine-image', file:'percetakan_grok_3.png',
    prompt:`Square thumbnail for digital printing service Indonesia. Dark navy background with gold accent gradient. Isometric printing factory with machines, paper rolls, finished products conveyor. Modern flat design illustration. ${BRAND}. Clean professional look.` },
  { cat:'percetakan', v:4, model:'xai/grok-imagine-image', file:'percetakan_grok_4.png',
    prompt:`Square thumbnail for Indonesian printing house service. Dark background with burnt orange gradient. Large magnifying glass focusing on high-quality printed brochure showing crisp CMYK color dots. Photography/macro style. Quality printing theme. ${BRAND}.` },
  { cat:'percetakan', v:5, model:'xai/grok-imagine-image', file:'percetakan_grok_5.png',
    prompt:`Square thumbnail for all printing products percetakan. Dark neutral background. Explosion of floating printed products from center: business cards, banners, books, stickers, packaging, certificates. Colorful, vibrant, energetic composition. ${BRAND}. Modern marketing illustration.` },

  // ── Software Development (5 variations) ──
  { cat:'software', v:1, model:'xai/grok-imagine-image', file:'software_grok_1.png',
    prompt:`Square hero thumbnail for Indonesian software development company. Dark deep green and black gradient. Large sleek software dashboard UI: analytics charts, data tables, navigation sidebars, glowing KPI cards. Clean SaaS product screenshot aesthetic. ${BRAND}. Premium tech illustration.` },
  { cat:'software', v:2, model:'xai/grok-imagine-image', file:'software_grok_2.png',
    prompt:`Square thumbnail for custom software development jasa pembuatan software Indonesia. Dark background with matrix code rain effect subtle in back. Foreground: clean code editor window with colorful code syntax. Hexagonal icons for: database, API, mobile, cloud. ${BRAND}. Developer aesthetic.` },
  { cat:'software', v:3, model:'xai/grok-imagine-image', file:'software_grok_3.png',
    prompt:`Square thumbnail for business software solution company Indonesia. Dark slate background. Isometric 3D illustration of connected software modules: CRM box, ERP box, POS box, mobile app, database server, cloud. All interconnected with glowing pipes. ${BRAND}. Enterprise tech art.` },
  { cat:'software', v:4, model:'xai/grok-imagine-image', file:'software_grok_4.png',
    prompt:`Square thumbnail for point of sale and ERP software company Indonesia. Dark blue background. POS system terminal glowing on left, business dashboard tablet on right. Indonesian rupiah symbols and transaction graphs floating. ${BRAND}. Business tech illustration.` },
  { cat:'software', v:5, model:'xai/grok-imagine-image', file:'software_grok_5.png',
    prompt:`Square thumbnail for mobile app and web app development Indonesia. Dark background with violet and blue gradient. Central smartphone showing clean mobile app UI. Desktop screen behind it. Lines connecting cloud, database, API. ${BRAND}. Modern app development art.` },

  // ── Rakit PC / Custom PC Build (5 variations) ──
  { cat:'rakit_pc', v:1, model:'xai/grok-imagine-image', file:'rakit_pc_grok_1.png',
    prompt:`Square thumbnail for Indonesian custom PC building service rakit komputer. Dark background with electric blue and silver gradient. Exploded view of PC components: motherboard, GPU, CPU, RAM, SSD, power supply, case fans - all glowing with RGB lighting. Technical blueprint overlay. ${BRAND}. Premium gaming PC art.` },
  { cat:'rakit_pc', v:2, model:'xai/grok-imagine-image', file:'rakit_pc_grok_2.png',
    prompt:`Square thumbnail for custom gaming PC build service Indonesia. Dark navy background. Completed high-end gaming PC case with tempered glass side panel showing RGB-lit components inside. Glowing blue and purple RGB ambient lighting. Premium product photography style. ${BRAND}.` },
  { cat:'rakit_pc', v:3, model:'xai/grok-imagine-image', file:'rakit_pc_grok_3.png',
    prompt:`Square thumbnail for PC rakitan terbaik Indonesia. Dark metallic charcoal background. Close-up of premium gaming motherboard with GPU installed, RGB LEDs illuminated. Tech macro photography style. Dramatic lighting. ${BRAND}.` },
  { cat:'rakit_pc', v:4, model:'xai/grok-imagine-image', file:'rakit_pc_grok_4.png',
    prompt:`Square thumbnail for affordable custom PC service Indonesia. Dark background. Side by side: budget PC setup (clean minimalist) vs gaming setup (RGB full glow). Price range illustration. Indonesian market tech art. ${BRAND}.` },
  { cat:'rakit_pc', v:5, model:'xai/grok-imagine-image', file:'rakit_pc_grok_5.png',
    prompt:`Square thumbnail for PC components store Indonesia. Dark background with orange-red gradient glow. Floating PC parts: GPU, CPU chip, RAM sticks, NVMe SSD, cooler - all in clean illustrator style with product label aesthetics. ${BRAND}.` },

  // ── Jual Game PC (4 variations) ──
  { cat:'game_pc', v:1, model:'xai/grok-imagine-image', file:'game_pc_grok_1.png',
    prompt:`Square thumbnail for Indonesian gaming PC sales store jual game PC. Dark gaming setup background with red and black gradient. Epic gaming battle station: dual monitors showing games, RGB keyboard, gaming mouse, headset, gaming chair. Gamer aesthetic. ${BRAND}.` },
  { cat:'game_pc', v:2, model:'xai/grok-imagine-image', file:'game_pc_grok_2.png',
    prompt:`Square thumbnail for game PC store Indonesia. Dark background. Game controller floating above glowing gaming PC setup. Explosion of popular game icons around it. Vibrant neon purple and red gaming aesthetic. ${BRAND}. Digital gaming art.` },
  { cat:'game_pc', v:3, model:'xai/grok-imagine-image', file:'game_pc_grok_3.png',
    prompt:`Square thumbnail for jual komputer gaming Indonesia. Dark background with gaming green and black gradient. First-person shooter game scene perspective with gaming peripherals in foreground as the player's setup. Immersive gaming art style. ${BRAND}.` },
  { cat:'game_pc', v:4, model:'xai/grok-imagine-image', file:'game_pc_grok_4.png',
    prompt:`Square thumbnail for high-performance gaming PC store. Dark background. Isometric gaming room: RGB gaming PC setup, neon-lit shelves, gaming posters. Clean flat-design illustration. Indonesian gaming culture. ${BRAND}.` },

  // ── IT Support / Helpdesk (4 variations) ──
  { cat:'it_support', v:1, model:'xai/grok-imagine-image', file:'it_support_grok_1.png',
    prompt:`Square hero thumbnail for Indonesian IT support helpdesk company. Dark slate blue background with soft cyan glow. Friendly smiling Indonesian tech support specialist at workstation, multiple monitors with monitoring dashboards. Professional corporate digital art. ${BRAND}.` },
  { cat:'it_support', v:2, model:'xai/grok-imagine-image', file:'it_support_grok_2.png',
    prompt:`Square thumbnail for IT maintenance and support service Indonesia. Dark background with blue gradient. Technician with toolkit working on server rack in data center. Blue LED server lights glow. Network cables. Professional IT environment. ${BRAND}.` },
  { cat:'it_support', v:3, model:'xai/grok-imagine-image', file:'it_support_grok_3.png',
    prompt:`Square thumbnail for computer repair and IT helpdesk service. Dark background. Isometric illustration: IT support person at desk with headset, connected to multiple computer screen issues with chat bubbles and check marks. Help ticket flow illustration. ${BRAND}.` },
  { cat:'it_support', v:4, model:'xai/grok-imagine-image', file:'it_support_grok_4.png',
    prompt:`Square thumbnail for network installation and IT infrastructure service Indonesia. Dark background with teal gradient. Network topology diagram glowing: routers, switches, computers, server, wifi access points all interconnected with light beams. Clean tech diagram art. ${BRAND}.` },

  // ── Cetak Buku / Book Printing (4 variations) ──
  { cat:'cetak_buku', v:1, model:'xai/grok-imagine-image', file:'cetak_buku_grok_1.png',
    prompt:`Square thumbnail for Indonesian book printing service jasa cetak buku. Warm dark background with deep burgundy gradient. Stack of beautifully printed open books with crisp colorful pages. Publisher and printing theme. Elegant editorial art style. ${BRAND}.` },
  { cat:'cetak_buku', v:2, model:'xai/grok-imagine-image', file:'cetak_buku_grok_2.png',
    prompt:`Square thumbnail for novel and literature book printing Surabaya. Dark library background with warm amber lighting. Row of different genre books on shelf: novel, textbook, children's book, comic. Premium bookstore aesthetic. ${BRAND}.` },
  { cat:'cetak_buku', v:3, model:'xai/grok-imagine-image', file:'cetak_buku_grok_3.png',
    prompt:`Square thumbnail for custom book printing service Indonesia. Dark background. Open book in center with pages fanning out beautifully. Manuscript papers and pen. Writer to published book journey illustration. Warm elegant art. ${BRAND}.` },
  { cat:'cetak_buku', v:4, model:'xai/grok-imagine-image', file:'cetak_buku_grok_4.png',
    prompt:`Square thumbnail for yearbook and company profile book printing Indonesia. Dark background. Hardcover glossy book with embossed gold title. Corporate executive holding finished printed book proudly. Professional business photography art. ${BRAND}.` },

  // ── Cetak Brosur / Brochure (3 variations) ──
  { cat:'cetak_brosur', v:1, model:'xai/grok-imagine-image', file:'cetak_brosur_grok_1.png',
    prompt:`Square thumbnail for Indonesian brochure printing service jasa cetak brosur. Dark background with vibrant gradient. Various folded brochure formats arranged elegantly: trifold, bifold, Z-fold - showing colorful professional designs. CMYK print quality art. ${BRAND}.` },
  { cat:'cetak_brosur', v:2, model:'xai/grok-imagine-image', file:'cetak_brosur_grok_2.png',
    prompt:`Square thumbnail for brochure and flyer printing Indonesia. Dark warm background. Colorful marketing brochures spread out in a flat-lay arrangement. Business and promotional materials. Lifestyle marketing photography style. ${BRAND}.` },
  { cat:'cetak_brosur', v:3, model:'xai/grok-imagine-image', file:'cetak_brosur_grok_3.png',
    prompt:`Square thumbnail for cetak brosur murah berkualitas Indonesia. Dark background. Isometric printer machine producing stack of colorful brochures. Printing process visualization. Modern flat illustration style. ${BRAND}.` },

  // ── Cetak Kartu Nama / Business Card (3 variations) ──
  { cat:'kartu_nama', v:1, model:'xai/grok-imagine-image', file:'kartu_nama_grok_1.png',
    prompt:`Square thumbnail for Indonesian business card printing service cetak kartu nama. Dark elegant black background with gold foil gradient. Premium embossed business cards arranged in a fan spread. Luxury print finish. Professional corporate art. ${BRAND}.` },
  { cat:'kartu_nama', v:2, model:'xai/grok-imagine-image', file:'kartu_nama_grok_2.png',
    prompt:`Square thumbnail for business card design and printing Indonesia. Dark background. Multiple business card designs floating at angles showing different industries: tech, restaurant, salon, corporate. Colorful variety. ${BRAND}. Creative print art.` },
  { cat:'kartu_nama', v:3, model:'xai/grok-imagine-image', file:'kartu_nama_grok_3.png',
    prompt:`Square thumbnail for kartu nama digital dan print Indonesia. Dark background. Hand holding elegantly minimalist white business card. Network connection icon in background. Modern minimal style. ${BRAND}.` },

  // ── Karaoke / Lagu (3 variations) ──
  { cat:'karaoke', v:1, model:'xai/grok-imagine-image', file:'karaoke_grok_1.png',
    prompt:`Square thumbnail for Indonesian karaoke song collection service jual lagu karaoke. Dark stage background with colorful spotlights. Microphone with musical notes floating, karaoke lyrics screen in background. Entertainment nightlife art. ${BRAND}.` },
  { cat:'karaoke', v:2, model:'xai/grok-imagine-image', file:'karaoke_grok_2.png',
    prompt:`Square thumbnail for HDD lagu karaoke Indonesia. Dark background with neon pink and purple gradient. Retro VCD/DVD discs and modern hard drive with musical note and microphone icons. Digital music archive theme. ${BRAND}.` },
  { cat:'karaoke', v:3, model:'xai/grok-imagine-image', file:'karaoke_grok_3.png',
    prompt:`Square thumbnail for karaoke entertainment setup Indonesia. Dark background. Modern karaoke room setup: large screen, sound system, microphone stands, disco ball. Fun entertainment venue art. ${BRAND}.` },

  // ── Company Profile Website (3 variations) ──
  { cat:'website_company', v:1, model:'xai/grok-imagine-image', file:'website_company_grok_1.png',
    prompt:`Square thumbnail for company profile website creation Indonesia. Dark professional background with blue gradient. Elegant corporate website mockup on laptop: about us pages, team photos, office building. Formal business web design. ${BRAND}.` },
  { cat:'website_company', v:2, model:'xai/grok-imagine-image', file:'website_company_grok_2.png',
    prompt:`Square thumbnail for jasa website company profile Indonesia. Dark charcoal background. Premium corporate identity package: business card, letterhead, and website on screen. Brand consistency visualization. ${BRAND}. Professional design art.` },
  { cat:'website_company', v:3, model:'xai/grok-imagine-image', file:'website_company_grok_3.png',
    prompt:`Square thumbnail for Indonesian company profile website design. Dark midnight background. Large office building exterior reflected on glossy laptop screen showing the company's website. Corporate property tech fusion. ${BRAND}.` },

  // ── Toko Online / E-Commerce (3 variations) ──
  { cat:'toko_online', v:1, model:'xai/grok-imagine-image', file:'toko_online_grok_1.png',
    prompt:`Square thumbnail for Indonesian online store development jasa toko online. Dark background with warm orange and purple gradient. Phone showing e-commerce app with product listings. Shopping cart, payment icons, delivery truck floating around. ${BRAND}. Digital commerce illustration.` },
  { cat:'toko_online', v:2, model:'xai/grok-imagine-image', file:'toko_online_grok_2.png',
    prompt:`Square thumbnail for website toko online Indonesia marketplace integration. Dark background. Split view: products catalog website on desktop, mobile shopping app on phone. Tokopedia/Shopee-inspired Indonesian shopping theme. ${BRAND}.` },
  { cat:'toko_online', v:3, model:'xai/grok-imagine-image', file:'toko_online_grok_3.png',
    prompt:`Square thumbnail for e-commerce solution for UMKM Indonesia. Dark background with green gradient. Small business owner proudly showing their online store on laptop. Products neatly arranged behind. Local entrepreneur digital success story. ${BRAND}.` },

  // ── Instalasi Software (3 variations) ──
  { cat:'instalasi_sw', v:1, model:'xai/grok-imagine-image', file:'instalasi_sw_grok_1.png',
    prompt:`Square thumbnail for software installation and setup service Indonesia. Dark background with blue gradient. Progress bar and installation UI on screen. Technician hands on keyboard. Gear icons spinning. Setup wizard interface. ${BRAND}. Clean tech art.` },
  { cat:'instalasi_sw', v:2, model:'xai/grok-imagine-image', file:'instalasi_sw_grok_2.png',
    prompt:`Square thumbnail for software implementation service Indonesia. Dark background. Checklist with green checkmarks appearing on screen. System configuration dashboard. IT professional with tablet verifying setup. ${BRAND}.` },
  { cat:'instalasi_sw', v:3, model:'xai/grok-imagine-image', file:'instalasi_sw_grok_3.png',
    prompt:`Square thumbnail for software training and implementation service. Dark background. Presenter at whiteboard or screen showing software to team. Office training session. Business software adoption. ${BRAND}.` },

  // ── Cloud & Networking (3 variations) ──
  { cat:'cloud_network', v:1, model:'xai/grok-imagine-image', file:'cloud_network_grok_1.png',
    prompt:`Square thumbnail for cloud computing and networking service Indonesia. Dark midnight blue background. Stylized cloud shape made of glowing data nodes connected by light beams. Server icons and device icons connecting to cloud. ${BRAND}. Premium cloud tech art.` },
  { cat:'cloud_network', v:2, model:'xai/grok-imagine-image', file:'cloud_network_grok_2.png',
    prompt:`Square thumbnail for network infrastructure Indonesia. Dark background. Isometric server room: server racks with blue LED lights, cable bundles, cooling units, network switches. Clean data center illustration. ${BRAND}.` },
  { cat:'cloud_network', v:3, model:'xai/grok-imagine-image', file:'cloud_network_grok_3.png',
    prompt:`Square thumbnail for WiFi and network installation service Indonesia. Dark background with cyan gradient. Building floor plan with WiFi signal coverage visualization. Router, access points, connected devices. Network coverage art. ${BRAND}.` },

  // ── Cybersecurity (3 variations) ──
  { cat:'cybersecurity', v:1, model:'xai/grok-imagine-image', file:'security_grok_1.png',
    prompt:`Square thumbnail for cybersecurity and data protection service Indonesia. Dark background with red warning and deep blue gradient. Digital shield glowing protecting a server/database from pixelated attack vectors. Security concept art. ${BRAND}. Premium cyber art.` },
  { cat:'cybersecurity', v:2, model:'xai/grok-imagine-image', file:'security_grok_2.png',
    prompt:`Square thumbnail for IT security and antivirus service Indonesia. Dark background. Lock icon made of light circuits in center. Binary code streams around. Safe digital environment concept. ${BRAND}. Clean minimal security art.` },
  { cat:'cybersecurity', v:3, model:'xai/grok-imagine-image', file:'security_grok_3.png',
    prompt:`Square thumbnail for data backup and recovery service Indonesia. Dark background. Server with glowing backup progress animation. Cloud sync icons. Data safety and recovery concept. Professional tech illustration. ${BRAND}.` },

  // ── Blog / Artikel (3 variations) ──
  { cat:'blog', v:1, model:'xai/grok-imagine-image', file:'blog_grok_1.png',
    prompt:`Square thumbnail for Indonesian tech blog article general technology. Dark background with warm gradient. Open laptop showing article/blog post with tech infographics. Book and writing pen floating. Knowledge sharing theme. ${BRAND}. Clean editorial style.` },
  { cat:'blog', v:2, model:'xai/grok-imagine-image', file:'blog_grok_2.png',
    prompt:`Square generic tech tutorial article thumbnail. Dark gradient background. Screen showing tutorial/how-to content with step by step numbered list. Tech icons. Educational content theme. ${BRAND}.` },
  { cat:'blog', v:3, model:'xai/grok-imagine-image', file:'blog_grok_3.png',
    prompt:`Square thumbnail for IT news and digital marketing article. Dark background. Newspaper headline style with digital overlay. Social media icons, analytics graph. Modern news and insights art. ${BRAND}.` },

  // ── Portfolio / Project (3 variations) ──
  { cat:'portfolio', v:1, model:'xai/grok-imagine-image', file:'portfolio_grok_1.png',
    prompt:`Square thumbnail for Indonesian IT company project portfolio page. Dark elegant background with deep blue gradient. Showcasing multiple project mockups: business dashboard on laptop, mobile app on phone, e-commerce website. Professional portfolio layout. ${BRAND}.` },
  { cat:'portfolio', v:2, model:'xai/grok-imagine-image', file:'portfolio_grok_2.png',
    prompt:`Square thumbnail for successful IT project showcase. Dark background. Trophy and achievement badge floating above completed software project screens. Success and delivery theme. ${BRAND}.` },
  { cat:'portfolio', v:3, model:'xai/grok-imagine-image', file:'portfolio_grok_3.png',
    prompt:`Square thumbnail for case study and client success story IT company Indonesia. Dark background. Before and after split of business growth. Charts going up. Client satisfaction theme. ${BRAND}.` },

]; // End GROK_BATCHES — 125 images @ $0.02 = ~$2.50

// ─── BATCH 2: Key2 — Imagen ($0.04 × 70 = ~$2.80) ────────────────────────────
const IMAGEN_BATCHES = [

  // ── Homepage premium (5 variations) ──
  { cat:'homepage', v:1, model:'google/imagen-4.0-generate-001', file:'home_imagen_1.png',
    prompt:`Ultra-premium square hero thumbnail for Kotacom IT company homepage Surabaya Indonesia. Photorealistic dark navy gradient. Stunning holographic cityscape of Surabaya at night with luminous digital data streams. Central MacBook Pro showing business intelligence dashboard. Cinematic quality. ${BRAND}.` },
  { cat:'homepage', v:2, model:'google/imagen-4.0-generate-001', file:'home_imagen_2.png',
    prompt:`Premium square thumbnail for Indonesian IT solutions company homepage. Deep space dark background. Earth from space with Indonesia highlighted, digital network connections spreading globally from Surabaya. Aspirational global tech brand visual. Photorealistic. ${BRAND}.` },
  { cat:'homepage', v:3, model:'google/imagen-4.0-generate-001', file:'home_imagen_3.png',
    prompt:`Premium square hero for Indonesian IT hompage. Dark gradient with deep blue. Diverse Indonesian team of professionals collaborating around modern office table with laptops and shared screen. Warm lighting, professional photography style. Corporate authenticity. ${BRAND}.` },
  { cat:'homepage', v:4, model:'google/imagen-4.0-generate-001', file:'home_imagen_4.png',
    prompt:`Premium dark hero image for tech company homepage Indonesia. Black background with gold and electric blue particles. Abstract tech architecture: floating geometric shapes forming a digital ecosystem. Abstract premium brand art. ${BRAND}.` },
  { cat:'homepage', v:5, model:'google/imagen-4.0-generate-001', file:'home_imagen_5.png',
    prompt:`Premium square thumbnail for IT company Surabaya. Dark background. Hand reaching toward holographic digital interface with icons for web, software, print, support. Human-tech interaction concept. Premium CGI render style. ${BRAND}.` },

  // ── Website Development premium (5 variations) ──
  { cat:'website', v:1, model:'google/imagen-4.0-generate-001', file:'website_imagen_1.png',
    prompt:`Premium square thumbnail for website development company Indonesia. Dark teal gradient background. Photorealistic laptop showing beautifully designed Indonesian business website with hero section, navigation, product cards. Reflective surface. Professional product photography. ${BRAND}.` },
  { cat:'website', v:2, model:'google/imagen-4.0-generate-001', file:'website_imagen_2.png',
    prompt:`Premium square thumbnail for web design and development service. Dark background with electric blue bokeh. Indonesian web designer sketching website wireframes digitally on iPad Pro beside completed website on monitor. Creative process. ${BRAND}. Lifestyle photography style.` },
  { cat:'website', v:3, model:'google/imagen-4.0-generate-001', file:'website_imagen_3.png',
    prompt:`Premium square thumbnail for SEO-optimized website service Indonesia. Dark background with green gradient. Website speed test showing 100/100 scores. Google search result showing website ranked #1. Performance and SEO visual. ${BRAND}.` },
  { cat:'website', v:4, model:'google/imagen-4.0-generate-001', file:'website_imagen_4.png',
    prompt:`Premium thumbnail for responsive website development Indonesia. Dark background. Single website design displayed beautifully across: large desktop monitor, laptop, iPad, iPhone - all showing same responsive layout. Responsive design showcase. ${BRAND}.` },
  { cat:'website', v:5, model:'google/imagen-4.0-generate-001', file:'website_imagen_5.png',
    prompt:`Premium square thumbnail for website redesign service Indonesia. Dark background. Website analytics dashboard showing traffic spike after redesign. Before after concept. Data-driven web development. ${BRAND}.` },

  // ── Software premium (5 variations) ──
  { cat:'software', v:1, model:'google/imagen-4.0-generate-001', file:'software_imagen_1.png',
    prompt:`Premium square thumbnail for custom software development Indonesia. Dark green gradient. Software engineer typing code on multiple monitors. Clean code on screen. Modern tech office environment. Professional lifestyle photography. ${BRAND}.` },
  { cat:'software', v:2, model:'google/imagen-4.0-generate-001', file:'software_imagen_2.png',
    prompt:`Premium square thumbnail for SaaS and business software Indonesia. Dark background. Sleek MacBook Pro showing enterprise SaaS dashboard with beautiful data visualization: charts, tables, KPIs. Premium product UI screenshot art. ${BRAND}.` },
  { cat:'software', v:3, model:'google/imagen-4.0-generate-001', file:'software_imagen_3.png',
    prompt:`Premium square thumbnail for ERP and business automation software Indonesia. Dark background. Modern ERP system interface with connected business modules. Integration visualization. Enterprise software aesthetic. ${BRAND}.` },
  { cat:'software', v:4, model:'google/imagen-4.0-generate-001', file:'software_imagen_4.png',
    prompt:`Premium thumbnail for mobile app development Indonesia. Dark background with purple gradient. Beautiful mobile app UI on latest iPhone: clean onboarding screen with illustration and CTA. App store bestseller aesthetic. ${BRAND}.` },
  { cat:'software', v:5, model:'google/imagen-4.0-generate-001', file:'software_imagen_5.png',
    prompt:`Premium square thumbnail for software testing and quality assurance service Indonesia. Dark background. Software architect reviewing system architecture diagram on screen. Agile sprint board in background. Professional tech team environment. ${BRAND}.` },

  // ── Percetakan premium (5 variations) ──
  { cat:'percetakan', v:1, model:'google/imagen-4.0-generate-001', file:'percetakan_imagen_1.png',
    prompt:`Ultra-premium square thumbnail for professional printing company Indonesia percetakan. Dark charcoal background with gold gradient. Arsenal of premium printed materials in perfect flat-lay: debossed business cards, spot UV brochures, hardcover book, large format banner, packaging box. Studio photography quality. ${BRAND}.` },
  { cat:'percetakan', v:2, model:'google/imagen-4.0-generate-001', file:'percetakan_imagen_2.png',
    prompt:`Premium square thumbnail for offset and digital printing service. Dark background. Large offset printing press machine in action, colorful CMYK inks applying to paper. Industrial printing art. Photorealistic factory photography. ${BRAND}.` },
  { cat:'percetakan', v:3, model:'google/imagen-4.0-generate-001', file:'percetakan_imagen_3.png',
    prompt:`Premium thumbnail for branded printing merchandise Indonesia. Dark background with warm amber. Corporate branded merchandise: polo shirts, tote bags, mugs, notebooks, all with matching company branding. Promotional products photography. ${BRAND}.` },
  { cat:'percetakan', v:4, model:'google/imagen-4.0-generate-001', file:'percetakan_imagen_4.png',
    prompt:`Premium square thumbnail for food and FMCG packaging printing Indonesia. Dark background. Beautiful food product packagings: cereal box, snack bag, sauce bottle label, coffee bag - all with premium print quality designs. Product photography. ${BRAND}.` },
  { cat:'percetakan', v:5, model:'google/imagen-4.0-generate-001', file:'percetakan_imagen_5.png',
    prompt:`Premium thumbnail for wedding invitation and event printing Indonesia. Dark romantic background with gold foil effect. Elegant wedding invitation suite: outer envelope, inner card, RSVP card - premium letterpress printing style. Luxury print art. ${BRAND}.` },

  // ── Rakit PC premium (5 variations) ──
  { cat:'rakit_pc', v:1, model:'google/imagen-4.0-generate-001', file:'rakit_pc_imagen_1.png',
    prompt:`Ultra-premium square thumbnail for custom PC build service Indonesia. Dark background. Photorealistic high-end gaming PC in tempered glass case: NVIDIA RTX GPU, RGB RAM sticks, custom CPU cooler, all illuminated by dramatic RGB lighting. Product photography quality. ${BRAND}.` },
  { cat:'rakit_pc', v:2, model:'google/imagen-4.0-generate-001', file:'rakit_pc_imagen_2.png',
    prompt:`Premium thumbnail for PC building service Indonesia rakit komputer. Dark background. Expert technician hands carefully installing GPU into motherboard. PCB green with gold contacts. Technical close-up photography. ${BRAND}.` },
  { cat:'rakit_pc', v:3, model:'google/imagen-4.0-generate-001', file:'rakit_pc_imagen_3.png',
    prompt:`Premium square thumbnail for affordable gaming PC packages Indonesia. Dark background. Gaming setup: PC tower + 144Hz gaming monitor showing game, mechanical keyboard, gaming mouse. Complete gaming station. Consumer electronics photography. ${BRAND}.` },
  { cat:'rakit_pc', v:4, model:'google/imagen-4.0-generate-001', file:'rakit_pc_imagen_4.png',
    prompt:`Premium thumbnail for PC workstation build service Indonesia. Dark background. Clean professional workstation: dual 4K monitors, sleek tower PC, mechanical keyboard, ergonomic mouse. Creative professional / developer setup. ${BRAND}.` },
  { cat:'rakit_pc', v:5, model:'google/imagen-4.0-generate-001', file:'rakit_pc_imagen_5.png',
    prompt:`Premium square thumbnail for PC upgrade service Indonesia. Dark background. CPU and GPU product photography: flagship processor on motherboard, premium graphics card with three fans. Component showcase photography. ${BRAND}.` },

  // ── IT Support premium (5 variations) ──
  { cat:'it_support', v:1, model:'google/imagen-4.0-generate-001', file:'it_support_imagen_1.png',
    prompt:`Premium square thumbnail for IT support company Indonesia. Dark background. Friendly and professional Indonesian IT support specialist at her workstation, wearing headset, multiple monitors showing ticketing system and monitoring dashboards. Smile and confidence. Corporate lifestyle photography. ${BRAND}.` },
  { cat:'it_support', v:2, model:'google/imagen-4.0-generate-001', file:'it_support_imagen_2.png',
    prompt:`Premium thumbnail for server infrastructure management Indonesia. Dark background. Professional data center corridor: servers with blue LED lights, cable management, cooling units. Clean and modern enterprise IT space. ${BRAND}.` },
  { cat:'it_support', v:3, model:'google/imagen-4.0-generate-001', file:'it_support_imagen_3.png',
    prompt:`Premium square thumbnail for remote IT support service Indonesia. Dark background. Technician providing remote support via screen share on computer. Client happily resolved issue shown on other screen. Two-way remote assistance visualization. ${BRAND}.` },
  { cat:'it_support', v:4, model:'google/imagen-4.0-generate-001', file:'it_support_imagen_4.png',
    prompt:`Premium thumbnail for IT infrastructure and maintenance Indonesia. Dark background with blue gradient. Network switch and patch panel close-up with organized colorful ethernet cables. Clean professional network rack photography. ${BRAND}.` },
  { cat:'it_support', v:5, model:'google/imagen-4.0-generate-001', file:'it_support_imagen_5.png',
    prompt:`Premium square thumbnail for preventive IT maintenance service Indonesia. Dark background. Checklist on tablet, technician in background checking server. System health monitoring concept. Proactive IT management art. ${BRAND}.` },

  // ── Game PC premium (4 variations) ──
  { cat:'game_pc', v:1, model:'google/imagen-4.0-generate-001', file:'game_pc_imagen_1.png',
    prompt:`Premium square thumbnail for high performance gaming PC sales Indonesia. Dark background. Top-angle view of premium gaming setup: RGB gaming PC, curved gaming monitor showing battlefield game, mechanical keyboard, gaming headset on stand. Immersive product photography. ${BRAND}.` },
  { cat:'game_pc', v:2, model:'google/imagen-4.0-generate-001', file:'game_pc_imagen_2.png',
    prompt:`Premium thumbnail for gaming PC and peripherals store Indonesia. Dark red gaming aesthetic background. Young Indonesian gamer intensely playing game with professional setup. Action gaming lifestyle photography. ${BRAND}.` },
  { cat:'game_pc', v:3, model:'google/imagen-4.0-generate-001', file:'game_pc_imagen_3.png',
    prompt:`Premium square thumbnail for pre-built gaming PC packages Indonesia. Dark background. Multiple gaming PC tiers displayed: budget entry level, mid-range, high-end, ultra premium. Product line showcase. ${BRAND}.` },
  { cat:'game_pc', v:4, model:'google/imagen-4.0-generate-001', file:'game_pc_imagen_4.png',
    prompt:`Premium thumbnail for gaming PC streaming setup Indonesia. Dark background. Streaming gaming setup: PC, ring light, microphone, webcam, gaming controller. Content creator / streamer lifestyle. ${BRAND}.` },

  // ── Layanan Overview premium (5 variations) ──
  { cat:'layanan', v:1, model:'google/imagen-4.0-generate-001', file:'layanan_imagen_1.png',
    prompt:`Premium square thumbnail for comprehensive IT services company overview Indonesia Kotacom. Dark navy background with subtle gradient. Professional infographic-style visual: 4 service pillars represented as glowing columns: Website, Software, Printing, IT Support. Corporate premium art. ${BRAND}.` },
  { cat:'layanan', v:2, model:'google/imagen-4.0-generate-001', file:'layanan_imagen_2.png',
    prompt:`Premium square thumbnail for all-in-one IT solutions company Indonesia. Dark background. Circle of professionals each representing a service: web developer, software engineer, print designer, IT technician - in a teamwork formation. Diverse team diversity. ${BRAND}.` },
  { cat:'layanan', v:3, model:'google/imagen-4.0-generate-001', file:'layanan_imagen_3.png',
    prompt:`Premium thumbnail for technology partner company Indonesia. Dark background. Handshake between client and IT company professional, with digital interface and service icons transparent overlay. Partnership and trust concept. ${BRAND}.` },
  { cat:'layanan', v:4, model:'google/imagen-4.0-generate-001', file:'layanan_imagen_4.png',
    prompt:`Premium square thumbnail services page for tech company Indonesia. Dark gradient. Business roadmap with icons for each service milestone. Timeline and journey concept for IT company services. ${BRAND}.` },
  { cat:'layanan', v:5, model:'google/imagen-4.0-generate-001', file:'layanan_imagen_5.png',
    prompt:`Premium square thumbnail for Indonesian IT solutions partner services. Dark background. Modern office hub with visible different departments: web monitor, printing station, server room, support desk — all in one open-plan layout. Company overview art. ${BRAND}.` },

]; // End IMAGEN_BATCHES — ~70 images @ $0.04 = ~$2.80

// ─── RUNNER ──────────────────────────────────────────────────────────────────

async function generate({ model, prompt, file, cat, v, key }) {
  const outPath = path.join(outputDir, file);
  if (fs.existsSync(outPath)) {
    console.log(`⏩  Skip (exists): ${file}`);
    return;
  }

  const res = await fetch(GATEWAY, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, n: 1, size: '1024x1024' }),
  });

  const txt = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${txt.substring(0, 200)}`);

  const data = JSON.parse(txt);
  const item = data?.data?.[0];
  if (!item) throw new Error(`No data in response`);

  if (item.b64_json) {
    const buf = Buffer.from(item.b64_json, 'base64');
    fs.writeFileSync(outPath, buf);
    return Math.round(buf.length / 1024);
  } else if (item.url) {
    const r = await fetch(item.url);
    const buf = Buffer.from(await r.arrayBuffer());
    fs.writeFileSync(outPath, buf);
    return Math.round(buf.length / 1024);
  }
  throw new Error('Unknown response shape');
}

async function runBatch(items, key, keyName) {
  let success = 0, fail = 0, totalKB = 0;
  const total = items.length;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const pct = `[${i+1}/${total}]`;
    process.stdout.write(`${pct} ${keyName} ${item.model} → ${item.file} ... `);
    try {
      const kb = await generate({ ...item, key });
      console.log(`✅ ${kb}KB`);
      success++;
      totalKB += kb;
    } catch (e) {
      console.log(`❌ ${e.message.substring(0, 120)}`);
      fail++;
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 500));
  }

  return { success, fail, totalKB };
}

async function main() {
  if (!KEY1) { console.error('Missing AI_GATEWAY_API_KEY (Key1)'); process.exit(1); }

  const totalGrok = GROK_BATCHES.length;
  const totalImagen = IMAGEN_BATCHES.length;
  const estimatedCost = (totalGrok * 0.02) + (totalImagen * 0.04);

  console.log(`\n🎨  Page Thumbnail Mass Generation`);
  console.log(`📦  Grok  (Key1): ${totalGrok} images @ $0.02 = $${(totalGrok * 0.02).toFixed(2)}`);
  console.log(`📦  Imagen(Key2): ${totalImagen} images @ $0.04 = $${(totalImagen * 0.04).toFixed(2)}`);
  console.log(`💰  Est. total cost: $${estimatedCost.toFixed(2)}`);
  console.log(`📁  Output: ${outputDir}\n`);

  // ── Batch 1: Grok ──
  console.log('━━━ BATCH 1: xai/grok-imagine-image (Key1) ━━━\n');
  const r1 = await runBatch(GROK_BATCHES, KEY1, 'K1');

  // ── Batch 2: Imagen ──
  console.log('\n━━━ BATCH 2: google/imagen-4.0-generate-001 (Key2) ━━━\n');
  const r2 = await runBatch(IMAGEN_BATCHES, KEY2, 'K2');

  // ── Summary ──
  console.log('\n' + '═'.repeat(50));
  console.log('✨  DONE');
  console.log(`   Grok   → ${r1.success} ok, ${r1.fail} fail`);
  console.log(`   Imagen → ${r2.success} ok, ${r2.fail} fail`);
  console.log(`   Total saved: ${Math.round((r1.totalKB + r2.totalKB) / 1024)} MB`);

  // List all files
  const files = fs.readdirSync(outputDir);
  console.log(`\n📂  ${files.length} files in output folder.`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
