import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import WhatsAppIcon from "@/components/whatsapp-icon";
import WhatsAppLink from "@/components/whatsapp-link";
import { getGlobalWhatsAppSettings } from "@/lib/whatsapp-settings";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

type GlobalWhatsAppButtonProps = {
  fallbackHref?: string;
  fallbackLabel?: string;
  fallbackTarget?: boolean;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
};

export default async function GlobalWhatsAppButton({
  fallbackHref = "/contact",
  fallbackLabel = "Hubungi Kami",
  fallbackTarget = false,
  label,
  variant = "default",
  size = "default",
  className,
  showIcon = true,
  ariaLabel,
}: GlobalWhatsAppButtonProps) {
  const whatsApp = await getGlobalWhatsAppSettings();
  const baseClassName = cn(buttonVariants({ variant, size }), className);

  if (whatsApp?.enabled && whatsApp.phoneNumber) {
    const resolvedLabel = label || whatsApp.ctaText?.trim() || fallbackLabel;

    return (
      <WhatsAppLink
        phoneNumber={whatsApp.phoneNumber}
        predefinedText={whatsApp.predefinedText}
        sourceUrl={whatsApp.sourceUrl}
        ariaLabel={ariaLabel || resolvedLabel}
        className={baseClassName}
      >
        {showIcon ? <WhatsAppIcon className="size-4" /> : null}
        {resolvedLabel}
      </WhatsAppLink>
    );
  }

  return (
    <Link
      href={fallbackHref}
      target={fallbackTarget ? "_blank" : undefined}
      rel={fallbackTarget ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel || label || fallbackLabel}
      className={baseClassName}
    >
      {showIcon ? <WhatsAppIcon className="size-4" /> : null}
      {label || fallbackLabel}
    </Link>
  );
}
