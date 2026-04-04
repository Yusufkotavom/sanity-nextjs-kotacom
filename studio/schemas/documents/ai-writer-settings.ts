import { defineArrayMember, defineField, defineType } from "sanity";
import { Sparkles } from "lucide-react";

export default defineType({
  name: "aiWriterSettings",
  title: "AI Writer Settings",
  type: "document",
  icon: Sparkles,
  groups: [
    { name: "general", title: "🔌 Aktifkan & Mode" },
    { name: "model", title: "🤖 Model AI" },
    { name: "prompts", title: "✍️ Template Prompt" },
    { name: "keys", title: "🔑 API Keys (Terenkripsi)" },
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
        "Pilih dari mana AI akan dijalankan. Rekomendasi: gunakan 'Direct Gemini' jika Anda punya Google API Key gratis. Gunakan 'Vercel AI Gateway' jika sudah dikonfigurasi di dashboard Vercel.",
      type: "string",
      initialValue: "gateway",
      options: {
        list: [
          {
            title: "🌐 Vercel AI Gateway (gunakan AI_GATEWAY_API_KEY di Vercel)",
            value: "gateway",
          },
          {
            title: "✨ Direct Gemini — Google AI (gunakan AI_WRITER_GEMINI_KEYS di Vercel)",
            value: "direct-gemini",
          },
          {
            title: "⚡ Direct Groq — Model Cepat (gunakan AI_WRITER_GROQ_KEYS di Vercel)",
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
      title: "Model AI Default",
      description:
        "Nama model yang digunakan. Untuk Gemini: 'gemini-2.5-flash'. Untuk Gateway Vercel: 'google/gemini-2.5-flash' atau 'openai/gpt-4o'. Biarkan kosong untuk menggunakan default sistem.",
      type: "string",
      initialValue: "google/gemini-2.5-flash",
      group: "model",
    }),
    defineField({
      name: "temperature",
      title: "Kreativitas AI (Temperature)",
      description:
        "Angka 0 = sangat konsisten & faktual. Angka 1–2 = lebih kreatif & bereksperimen. Rekomendasi: 0.4 untuk konten bisnis.",
      type: "number",
      initialValue: 0.4,
      validation: (Rule) => Rule.min(0).max(2),
      group: "model",
    }),
    defineField({
      name: "maxOutputTokens",
      title: "Batas Panjang Hasil AI (Token)",
      description:
        "1 token ≈ sekitar ¾ kata. Nilai 1400 menghasilkan sekitar 3–4 paragraf. Naikkan ke 3000–5000 untuk artikel panjang.",
      type: "number",
      initialValue: 1400,
      validation: (Rule) => Rule.min(128).max(8192),
      group: "model",
    }),
    defineField({
      name: "fallbackModels",
      title: "Model Cadangan (opsional)",
      description:
        "Jika model utama tidak tersedia, AI akan mencoba model berikutnya secara berurutan. Contoh: 'google/gemini-2.0-flash', 'openai/gpt-4o-mini'.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { sortable: true },
      group: "model",
    }),
    defineField({
      name: "gatewayProviderOrder",
      title: "Urutan Prioritas Penyedia AI (opsional)",
      description:
        "Hanya berlaku untuk mode Vercel Gateway. Isi nama penyedia yang diprioritaskan, contoh: 'google', 'openai', 'anthropic'.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { sortable: true },
      group: "model",
    }),

    // ── PROMPTS ───────────────────────────────────────────────────────────────
    defineField({
      name: "prompts",
      title: "Template Prompt AI",
      description:
        "Atur instruksi dasar yang diberikan ke AI sebelum menulis ulang konten. Jika dikosongkan, sistem akan menggunakan prompt bawaan.",
      type: "object",
      group: "prompts",
      fields: [
        defineField({
          name: "globalSystem",
          title: "🌐 Instruksi Dasar (Berlaku untuk Semua)",
          description:
            "Karakter dan aturan umum AI. Ini dibaca AI sebelum semua jenis penulisan.",
          type: "text",
          rows: 6,
          initialValue: `Kamu adalah penulis konten profesional untuk website bisnis di Indonesia bernama Kotacom. Kamu ahli dalam SEO, copywriting, dan komunikasi pemasaran digital.

Selalu tulis dalam Bahasa Indonesia yang baik, jelas, dan meyakinkan. Gunakan gaya bahasa yang hangat namun profesional — seperti konsultan bisnis yang berbicara langsung kepada calon klien.

Hindari istilah teknis yang membingungkan. Fokuslah pada manfaat nyata bagi pembaca.`,
        }),
        defineField({
          name: "postRewrite",
          title: "📰 Prompt Penulisan Ulang Artikel Blog (Post)",
          description:
            "Instruksi khusus saat AI menulis ulang dokumen bertipe 'Post' (artikel blog).",
          type: "text",
          rows: 7,
          initialValue: `Tulis ulang artikel blog ini dalam Bahasa Indonesia yang menarik dan informatif.

Panduan:
- Pertahankan topik dan informasi utamanya, namun buat lebih mudah dibaca.
- Buat judul yang menarik perhatian (maks. 70 karakter).
- Buat ringkasan (excerpt) singkat yang mengundang rasa ingin tahu pembaca (maks. 180 karakter).
- Susun isi artikel dalam beberapa paragraf yang mengalir dengan baik.
- Sisipkan kata kunci secara alami — jangan dipaksakan.
- Akhiri dengan kalimat ajakan bertindak (call to action) yang relevan.`,
        }),
        defineField({
          name: "serviceRewrite",
          title: "🛠️ Prompt Penulisan Ulang Halaman Layanan (Service)",
          description:
            "Instruksi khusus saat AI menulis ulang dokumen bertipe 'Service' (halaman jasa/layanan).",
          type: "text",
          rows: 7,
          initialValue: `Tulis ulang halaman layanan ini agar lebih meyakinkan dan berorientasi pada pelanggan.

Panduan:
- Fokus pada manfaat yang dirasakan klien, bukan sekadar daftar fitur teknis.
- Gunakan bahasa yang membangun kepercayaan: "kami membantu Anda...", "bersama kami...".
- Judul harus mencerminkan solusi konkret (maks. 70 karakter).
- Ringkasan (excerpt) harus langsung menyentuh kebutuhan calon klien (maks. 180 karakter).
- Isi konten terdiri dari paragraf yang jelas manfaatnya untuk bisnis klien.
- Sertakan ajakan bertindak seperti konsultasi gratis atau hubungi kami.`,
        }),
        defineField({
          name: "projectRewrite",
          title: "🏆 Prompt Penulisan Ulang Halaman Proyek (Project)",
          description:
            "Instruksi khusus saat AI menulis ulang dokumen bertipe 'Project' (studi kasus / portofolio).",
          type: "text",
          rows: 7,
          initialValue: `Tulis ulang halaman studi kasus / portofolio proyek ini agar terlihat profesional dan meyakinkan.

Panduan:
- Ceritakan proyek ini seperti sebuah kisah sukses: tantangan → solusi → hasil.
- Judul harus singkat dan menggambarkan hasil yang dicapai (maks. 70 karakter).
- Ringkasan (excerpt) menggambarkan ikhtisar proyek secara menarik (maks. 180 karakter).
- Isi konten harus mencerminkan keahlian tim dan dampak positif bagi klien.
- Gunakan angka atau fakta konkret jika tersedia (contoh: "meningkatkan penjualan 30%").
- Tutup dengan kalimat yang mengundang calon klien baru untuk menghubungi kami.`,
        }),
      ],
    }),

    // ── API KEYS (ENCRYPTED) ──────────────────────────────────────────────────
    defineField({
      name: "gatewayApiKeyEncrypted",
      title: "🔑 API Key Vercel Gateway (Terenkripsi)",
      description:
        "Diisi otomatis oleh sistem. Jangan edit manual. Gunakan variabel lingkungan AI_GATEWAY_API_KEY di Vercel untuk mode Gateway.",
      type: "string",
      readOnly: true,
      group: "keys",
    }),
    defineField({
      name: "geminiApiKeysEncrypted",
      title: "🔑 API Keys Google Gemini (Terenkripsi)",
      description:
        "Diisi otomatis oleh sistem. Masukkan kunci asli Anda via variabel lingkungan AI_WRITER_GEMINI_KEYS di Vercel (bukan di sini).",
      type: "text",
      rows: 3,
      readOnly: true,
      group: "keys",
    }),
    defineField({
      name: "groqApiKeysEncrypted",
      title: "🔑 API Keys Groq (Terenkripsi)",
      description:
        "Diisi otomatis oleh sistem. Masukkan kunci asli Anda via variabel lingkungan AI_WRITER_GROQ_KEYS di Vercel (bukan di sini).",
      type: "text",
      rows: 3,
      readOnly: true,
      group: "keys",
    }),

    // ── NOTES ─────────────────────────────────────────────────────────────────
    defineField({
      name: "notes",
      title: "Catatan Internal",
      description: "Catatan operasional tim. Jangan simpan API Key mentah di sini.",
      type: "text",
      rows: 4,
      group: "notes",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "AI Writer Settings",
        subtitle: "Konfigurasi provider AI, model, dan template prompt penulisan ulang konten",
      };
    },
  },
});
