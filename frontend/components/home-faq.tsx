import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionIntro, SectionShell } from "@/components/ui/section-shell";

const faqs = [
  {
    question: "Berapa lama waktu pembuatan website?",
    answer: "Tergantung kompleksitas project, umumnya website company profile membutuhkan waktu 2-4 minggu, website toko online 4-6 minggu, dan aplikasi custom 6-12 minggu. Timeline pasti akan kami diskusikan di awal project setelah memahami kebutuhan detail Anda."
  },
  {
    question: "Apakah ada garansi untuk layanan IT support?",
    answer: "Ya, kami memberikan garansi untuk setiap pekerjaan yang kami lakukan sesuai dengan scope yang disepakati. Untuk hardware, garansi mengikuti garansi distributor. Untuk software dan konfigurasi, kami memberikan garansi 30 hari setelah serah terima."
  },
  {
    question: "Apakah Kotacom melayani klien di luar Surabaya?",
    answer: "Ya, kami melayani klien di seluruh Indonesia. Untuk area Jawa Timur (Surabaya, Sidoarjo, Gresik, Malang), kami bisa melakukan kunjungan on-site. Untuk area lain, kami melayani dengan sistem remote support dan koordinasi online yang efektif."
  },
  {
    question: "Berapa biaya pembuatan website dan software?",
    answer: "Biaya bervariasi tergantung kebutuhan dan kompleksitas. Website company profile mulai dari 5 juta, website toko online mulai dari 10 juta, dan software custom mulai dari 15 juta. Hubungi kami untuk konsultasi gratis dan penawaran yang sesuai dengan budget Anda."
  },
  {
    question: "Apakah website yang dibuat mobile-friendly?",
    answer: "Ya, semua website yang kami buat sudah responsive dan mobile-friendly. Kami menggunakan teknologi modern seperti Next.js dan Tailwind CSS yang memastikan website tampil optimal di semua perangkat (desktop, tablet, dan mobile)."
  },
  {
    question: "Apakah saya bisa update konten website sendiri?",
    answer: "Ya, kami menggunakan Sanity CMS yang user-friendly sehingga Anda bisa update konten website sendiri tanpa perlu coding. Kami juga akan memberikan training singkat cara menggunakan CMS setelah website selesai."
  },
];

export default function HomeFAQ() {
  return (
    <SectionShell id="faq">
      <SectionIntro
        eyebrow="Pertanyaan yang Sering Diajukan"
        title="Ada pertanyaan? Kami punya jawabannya"
        description="Temukan jawaban untuk pertanyaan umum tentang layanan kami. Jika pertanyaan Anda belum terjawab, jangan ragu untuk menghubungi kami."
      />
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          }),
        }}
      />
    </SectionShell>
  );
}
