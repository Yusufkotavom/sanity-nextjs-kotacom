import { defineArrayMember, defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

const GATEWAY_MODELS = [
  { title: "── Google ──────────────────", value: "" },
  { title: "Google Gemini 2.5 Flash", value: "google/gemini-2.5-flash" },
  { title: "Google Gemini 2.5 Pro", value: "google/gemini-2.5-pro" },
  { title: "Google Gemini 2.0 Flash", value: "google/gemini-2.0-flash" },
  { title: "── OpenAI ──────────────────", value: "" },
  { title: "OpenAI GPT-4o", value: "openai/gpt-4o" },
  { title: "OpenAI GPT-4o Mini", value: "openai/gpt-4o-mini" },
  { title: "OpenAI o4-mini", value: "openai/o4-mini" },
  { title: "── Anthropic ───────────────", value: "" },
  { title: "Claude 3.7 Sonnet", value: "anthropic/claude-3-7-sonnet-20250219" },
  { title: "Claude 3.5 Haiku", value: "anthropic/claude-3-5-haiku-20241022" },
  { title: "── Meta (via Gateway) ──────", value: "" },
  { title: "Llama 4 Scout (17B)", value: "meta/llama-4-scout-17b-16e-instruct" },
];

const GEMINI_MODELS = [
  { title: "Gemini 2.5 Flash (Rekomendasi)", value: "gemini-2.5-flash" },
  { title: "Gemini 2.5 Pro", value: "gemini-2.5-pro" },
  { title: "Gemini 2.0 Flash", value: "gemini-2.0-flash" },
  { title: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
];

const GROQ_MODELS = [
  { title: "Llama 4 Scout (17B) — Sangat Cepat", value: "meta-llama/llama-4-scout-17b-16e-instruct" },
  { title: "Llama 3.3 (70B)", value: "llama-3.3-70b-versatile" },
  { title: "Mixtral 8x7B", value: "mixtral-8x7b-32768" },
  { title: "Gemma 2 (9B)", value: "gemma2-9b-it" },
];

export default defineType({
  name: "aiWriterSettings",
  title: "AI Writer Settings",
  type: "document",
  icon: Sparkles,
  groups: [
    { name: "general", title: "🔌 Aktifkan & Mode", default: true },
    { name: "model", title: "🤖 Model AI" },
    { name: "prompts", title: "✍️ Template Prompt SEO" },
    { name: "notes", title: "📝 Catatan" },
  ],
  fields: [
    // ── GENERAL ──────────────────────────────────────────────────────────────
    defineField({
      name: "enabled",
      title: "Aktifkan Fitur AI Writer",
      description:
        "Nyalakan ini agar tombol 'AI Rewrite' muncul di setiap dokumen Post, Service, dan Project.",
      type: "boolean",
      initialValue: false,
      group: "general",
    }),
    defineField({
      name: "mode",
      title: "Sumber AI yang Digunakan",
      description:
        "Pilih dari mana AI dijalankan. Sesuaikan dengan API Key yang sudah Anda masukkan di environment variables Vercel.",
      type: "string",
      initialValue: "gateway",
      options: {
        list: [
          {
            title: "🌐 Vercel AI Gateway  →  env: AI_GATEWAY_API_KEY",
            value: "gateway",
          },
          {
            title: "✨ Direct Google Gemini  →  env: AI_WRITER_GEMINI_KEYS",
            value: "direct-gemini",
          },
          {
            title: "⚡ Direct Groq (Model Cepat & Gratis)  →  env: AI_WRITER_GROQ_KEYS",
            value: "direct-groq",
          },
        ],
        layout: "radio",
      },
      group: "general",
    }),

    // ── MODEL ─────────────────────────────────────────────────────────────────
    defineField({
      name: "defaultModel",
      title: "Model AI — Mode Gateway (Vercel)",
      description:
        "Hanya aktif jika mode 'Vercel AI Gateway' dipilih. Pilih model utama yang akan digunakan.",
      type: "string",
      initialValue: "google/gemini-2.5-flash",
      hidden: ({ document }) => document?.mode !== "gateway",
      options: {
        list: GATEWAY_MODELS.filter((m) => m.value !== ""),
      },
      group: "model",
    }),
    defineField({
      name: "defaultModelGemini",
      title: "Model AI — Mode Direct Gemini",
      description:
        "Hanya aktif jika mode 'Direct Google Gemini' dipilih. Rekomendasi: Gemini 2.5 Flash.",
      type: "string",
      initialValue: "gemini-2.5-flash",
      hidden: ({ document }) => document?.mode !== "direct-gemini",
      options: {
        list: GEMINI_MODELS,
      },
      group: "model",
    }),
    defineField({
      name: "defaultModelGroq",
      title: "Model AI — Mode Direct Groq",
      description:
        "Hanya aktif jika mode 'Direct Groq' dipilih. Rekomendasi: Llama 4 Scout untuk kecepatan.",
      type: "string",
      initialValue: "meta-llama/llama-4-scout-17b-16e-instruct",
      hidden: ({ document }) => document?.mode !== "direct-groq",
      options: {
        list: GROQ_MODELS,
      },
      group: "model",
    }),
    defineField({
      name: "temperature",
      title: "Kreativitas AI (Temperature)",
      description:
        "0 = konsisten & faktual. 0.4 = seimbang (rekomendasi untuk konten bisnis). 1+ = lebih kreatif.",
      type: "number",
      initialValue: 0.4,
      validation: (Rule) => Rule.min(0).max(2),
      group: "model",
    }),
    defineField({
      name: "maxOutputTokens",
      title: "Batas Panjang Hasil (Token)",
      description:
        "1 token ≈ ¾ kata. 1400 ≈ 3–4 paragraf. Gunakan 2000–4000 untuk artikel panjang.",
      type: "number",
      initialValue: 1400,
      validation: (Rule) => Rule.min(128).max(8192),
      group: "model",
    }),
    defineField({
      name: "fallbackModels",
      title: "Model Cadangan (opsional — hanya mode Gateway)",
      description:
        "Jika model utama tidak tersedia, sistem akan mencoba model berikutnya. Tulis ID model lengkap, contoh: 'openai/gpt-4o-mini'.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { sortable: true },
      hidden: ({ document }) => document?.mode !== "gateway",
      group: "model",
    }),

    // ── PROMPTS ───────────────────────────────────────────────────────────────
    defineField({
      name: "prompts",
      title: "Template Prompt AI",
      description:
        "Instruksi yang dikirim ke AI sebelum menulis ulang. Template sudah diisi dengan standar SEO. Kosongkan field jika ingin menggunakan prompt bawaan sistem.",
      type: "object",
      group: "prompts",
      fields: [
        defineField({
          name: "globalSystem",
          title: "🌐 Instruksi Karakter AI (Berlaku Untuk Semua Jenis Konten)",
          description: "Kepribadian dan aturan dasar AI saat menulis ulang konten.",
          type: "text",
          rows: 7,
          initialValue: `Kamu adalah pakar copywriting dan SEO profesional untuk website bisnis di Indonesia bernama Kotacom, yang bergerak di bidang pembuatan website, software, percetakan, dan sistem digital.

Gaya penulisanmu: hangat namun profesional, seperti konsultan bisnis berpengalaman yang berbicara langsung kepada calon klien.

Selalu tulis dalam Bahasa Indonesia yang baku, jelas, dan meyakinkan. Hindari kata-kata klise, jargon teknis yang membingungkan, dan kalimat pasif yang lemah.

Setiap konten harus memenuhi prinsip E-E-A-T Google: tunjukkan Pengalaman, Keahlian, Otoritas, dan Kepercayaan secara alami dalam tulisan.`,
        }),
        defineField({
          name: "postRewrite",
          title: "📰 Prompt Artikel Blog (Post)",
          description:
            "Template penulisan ulang untuk halaman blog/artikel. Fokus pada informasi dan search intent.",
          type: "text",
          rows: 10,
          initialValue: `Tulis ulang artikel blog berikut sesuai standar SEO modern untuk pasar Indonesia.

ATURAN WAJIB:
- Judul (title): maksimal 60 karakter, mengandung kata kunci utama di awal kalimat, menggunakan angka atau kata daya tarik jika relevan (contoh: "5 Cara...", "Panduan Lengkap...", "Mengapa...")
- Ringkasan (excerpt): 120–155 karakter, rangkuman manfaat artikel yang mengundang klik, mengandung kata kunci utama
- Isi artikel (body): minimal 300 kata, dibagi dalam 3–5 paragraf yang mengalir. Paragraf pertama harus menjawab search intent pembaca secara langsung. Sisipkan kata kunci pendukung secara alami setiap 100–150 kata. Gunakan kalimat aktif dan konkret.
- Akhiri dengan kalimat penutup yang membangun kepercayaan dan mendorong pembaca mengambil langkah berikutnya.
- Jangan gunakan bullet points berlebihan — gunakan paragraf naratif.`,
        }),
        defineField({
          name: "serviceRewrite",
          title: "🛠️ Prompt Halaman Layanan (Service)",
          description:
            "Template penulisan ulang untuk halaman layanan/jasa. Fokus pada manfaat klien dan konversi.",
          type: "text",
          rows: 10,
          initialValue: `Tulis ulang halaman layanan ini agar persuasif, berorientasi pada kebutuhan klien, dan optimal untuk mesin pencari.

ATURAN WAJIB:
- Judul (title): maksimal 60 karakter, mencantumkan nama layanan + lokasi atau manfaat utama jika memungkinkan (contoh: "Jasa Pembuatan Website Profesional Surabaya")
- Ringkasan (excerpt): 120–155 karakter, menyebutkan layanan utama + keunggulan/keuntungan utama bagi klien
- Isi konten (body): 250–400 kata. Mulai dengan kalimat yang langsung menyentuh masalah atau kebutuhan klien. Jelaskan solusi yang ditawarkan dengan bahasa manfaat (bukan fitur). Sisipkan sinyal kepercayaan seperti pengalaman, jaminan, atau angka nyata jika ada. Tutup dengan ajakan bertindak yang mengandung kata kunci utama (contoh: "Konsultasikan kebutuhan website Anda sekarang").
- Gunakan kata kunci berbasis lokasi dan layanan secara alami (contoh: "di Surabaya", "untuk bisnis UMKM").`,
        }),
        defineField({
          name: "projectRewrite",
          title: "🏆 Prompt Halaman Proyek / Portofolio (Project)",
          description:
            "Template penulisan ulang untuk halaman studi kasus atau portofolio. Fokus pada bukti dan hasil nyata.",
          type: "text",
          rows: 10,
          initialValue: `Tulis ulang halaman portofolio/studi kasus ini seperti kisah sukses yang membangun kepercayaan dan mendorong konversi.

ATURAN WAJIB:
- Judul (title): maksimal 60 karakter, menyebutkan jenis proyek + hasil atau nama klien (contoh: "Website Toko Online untuk Brand Fashion Lokal Surabaya")
- Ringkasan (excerpt): 120–155 karakter, gambaran singkat proyek: apa yang dibuat, untuk siapa, dan hasilnya
- Isi konten (body): 200–350 kata. Susun dalam format narasi: (1) Latar belakang & kebutuhan klien, (2) Solusi yang kami rancang, (3) Hasil & dampak nyata yang dicapai. Gunakan angka konkret jika tersedia (contoh: "meningkatkan traffic 40%", "selesai dalam 14 hari"). Tutup dengan kalimat yang mengundang calon klien baru untuk menghubungi Kotacom.
- Sertakan kata kunci kategori layanan dan lokasi secara alami untuk mendukung SEO halaman portofolio.`,
        }),
      ],
    }),

    // ── NOTES ─────────────────────────────────────────────────────────────────
    defineField({
      name: "notes",
      title: "Catatan Internal Tim",
      description:
        "Untuk keperluan internal saja. Jangan tulis API Key atau data sensitif di sini.",
      type: "text",
      rows: 4,
      group: "notes",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "AI Writer Settings",
        subtitle: "Mode provider, model AI, dan template prompt SEO untuk penulisan ulang konten",
      };
    },
  },
});
