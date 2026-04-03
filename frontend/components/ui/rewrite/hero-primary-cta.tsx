"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type RewriteHeroPrimaryCtaProps = {
  fallbackHref: string;
  fallbackLabel: string;
  phoneNumber?: string;
  predefinedText?: string;
  ctaText?: string;
  sourceUrl?: string;
  canonicalPath: string;
};

export default function RewriteHeroPrimaryCta({
  fallbackHref,
  fallbackLabel,
  phoneNumber,
  predefinedText,
  ctaText,
  sourceUrl,
  canonicalPath,
}: RewriteHeroPrimaryCtaProps) {
  const pathname = usePathname();
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    if (!phoneNumber || typeof window === "undefined") {
      setHref(null);
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "";
    const currentPage = window.location.href || `${baseUrl}${canonicalPath}`;
    const previousPage = document.referrer || "";
    const computed = buildWhatsAppHref({
      phoneNumber,
      predefinedText,
      currentPage,
      fromPage: previousPage,
      sourceUrl,
    });

    setHref(computed);
  }, [
    canonicalPath,
    pathname,
    phoneNumber,
    predefinedText,
    sourceUrl,
  ]);

  const isWhatsApp = Boolean(href && phoneNumber);

  return (
    <Link
      href={href || fallbackHref}
      target={isWhatsApp ? "_blank" : undefined}
      rel={isWhatsApp ? "noopener noreferrer" : undefined}
      className={cn(
        buttonVariants({ size: "lg" }),
        "min-w-[13rem] rounded-full px-6 shadow-[0_16px_40px_rgba(17,24,39,0.16)]",
      )}
    >
      {isWhatsApp ? <MessageCircleMore className="size-4" /> : null}
      {isWhatsApp ? ctaText?.trim() || "Chat via WhatsApp" : fallbackLabel}
      <ArrowRight className="size-4" />
    </Link>
  );
}
