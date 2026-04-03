"use client";

import { cn } from "@/lib/utils";
import WhatsAppLink from "@/components/whatsapp-link";
import WhatsAppIcon from "@/components/whatsapp-icon";

export default function FloatingWhatsAppClient({
  phoneNumber,
  predefinedText,
  ctaText,
  enableAnimation = true,
  sourceUrl,
}: {
  phoneNumber: string;
  predefinedText?: string;
  ctaText?: string;
  enableAnimation?: boolean;
  sourceUrl?: string;
}) {
  return (
    <WhatsAppLink
      phoneNumber={phoneNumber}
      predefinedText={predefinedText}
      sourceUrl={sourceUrl}
      aria-label="Chat on WhatsApp"
      className={cn(
        "fixed right-4 bottom-6 z-50 inline-flex h-12 items-center gap-2 rounded-full bg-green-500 px-4 text-sm font-medium text-white shadow-lg transition hover:bg-green-600 focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:outline-none",
        enableAnimation && "motion-safe:animate-pulse",
      )}
    >
      <span className="relative inline-flex items-center justify-center">
        {enableAnimation && (
          <span className="absolute inline-flex size-6 rounded-full bg-green-300/70 opacity-70 motion-safe:animate-ping" />
        )}
        <WhatsAppIcon className="relative z-10 size-5" />
      </span>
      <span className="hidden sm:inline">{ctaText?.trim() || "Chat via WhatsApp"}</span>
    </WhatsAppLink>
  );
}
