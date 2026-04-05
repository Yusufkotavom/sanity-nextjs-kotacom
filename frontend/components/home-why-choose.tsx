import { Award, HeartHandshake, Shield, TrendingUp } from "lucide-react";
import { SectionIntro, SectionPanel, SectionShell } from "@/components/ui/section-shell";

const reasons = [
  {
    icon: Award,
    title: "Berpengalaman Sejak 2008",
    description: "Lebih dari 15 tahun melayani bisnis di Surabaya dan sekitarnya dengan track record yang terbukti."
  },
  {
    icon: HeartHandshake,
    title: "One-Stop Solution",
    description: "Tidak perlu koordinasi dengan banyak vendor. Semua kebutuhan IT dan digital dalam satu partner terpercaya."
  },
  {
    icon: TrendingUp,
    title: "Support Berkelanjutan",
    description: "Kami tidak hanya build dan pergi. Tim kami siap support jangka panjang untuk memastikan sistem Anda tetap optimal."
  },
  {
    icon: Shield,
    title: "Harga Transparan",
    description: "Tidak ada biaya tersembunyi. Semua dijelaskan di awal sebelum project dimulai dengan penawaran yang jelas."
  },
];

export default function HomeWhyChoose() {
  return (
    <SectionShell>
      <SectionIntro
        eyebrow="Keunggulan Kami"
        title="Mengapa Memilih Kotacom?"
        description="Lebih dari sekadar vendor IT, kami adalah partner yang membantu bisnis Anda tumbuh dengan solusi teknologi yang tepat."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, index) => {
          const Icon = reason.icon;
          return (
            <SectionPanel
              key={index}
              tone={index % 2 === 0 ? "neutral" : "sky"}
              className="rounded-[1.65rem] p-6"
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-lg font-semibold tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </SectionPanel>
          );
        })}
      </div>
    </SectionShell>
  );
}
