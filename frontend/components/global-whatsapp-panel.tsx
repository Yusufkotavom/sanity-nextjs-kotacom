import Link from "next/link";
import { Button } from "@/components/ui/button";
import GlobalWhatsAppButton from "@/components/global-whatsapp-button";
import { cn } from "@/lib/utils";

type GlobalWhatsAppPanelProps = {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default async function GlobalWhatsAppPanel({
  eyebrow = "WhatsApp CTA",
  title,
  description,
  className,
  secondaryHref,
  secondaryLabel,
}: GlobalWhatsAppPanelProps) {
  return (
    <div
      className={cn(
        "mt-10 rounded-[1.75rem] border border-green-500/18 bg-[linear-gradient(135deg,rgba(34,197,94,0.12),rgba(255,255,255,0.92))] p-6 shadow-[0_18px_44px_-28px_rgba(34,197,94,0.55)] dark:border-green-400/20 dark:bg-[linear-gradient(135deg,rgba(34,197,94,0.16),rgba(10,10,10,0.78))] md:p-7",
        className,
      )}
    >
      <p className="text-ui-label text-green-700/90 dark:text-green-300/88">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-foreground/74 md:text-base">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <GlobalWhatsAppButton
          size="lg"
          className="rounded-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:text-black dark:hover:bg-green-400"
          fallbackLabel="Chat via WhatsApp"
        />
        {secondaryHref && secondaryLabel ? (
          <Button asChild size="lg" variant="outline">
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
