"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function buildWhatsAppHref({
  phoneNumber,
  predefinedText,
  currentPage,
  fromPage,
  sourceUrl,
}: {
  phoneNumber: string;
  predefinedText?: string;
  currentPage: string;
  fromPage?: string;
  sourceUrl?: string;
}) {
  const lines: string[] = [];

  if (predefinedText?.trim()) {
    lines.push(predefinedText.trim());
  }

  lines.push(`Page: ${currentPage}`);

  if (fromPage?.trim()) {
    lines.push(`From: ${fromPage.trim()}`);
  }

  if (sourceUrl?.trim()) {
    lines.push(`Source: ${sourceUrl.trim()}`);
  }

  const text = lines.join("\n\n");
  const url = new URL(`https://wa.me/${phoneNumber}`);
  url.searchParams.set("text", text);
  return url.toString();
}

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrlRef = useRef<string>("");
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const current = window.location.href;
    const previous = previousUrlRef.current || document.referrer || "";
    const computed = buildWhatsAppHref({
      phoneNumber,
      predefinedText,
      currentPage: current,
      fromPage: previous,
      sourceUrl,
    });

    setHref(computed);
    previousUrlRef.current = current;
  }, [pathname, searchParams, phoneNumber, predefinedText, sourceUrl]);

  if (!href) return null;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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
        <MessageCircle className="relative z-10 size-5" />
      </span>
      <span className="hidden sm:inline">{ctaText?.trim() || "Chat via WhatsApp"}</span>
    </Link>
  );
}
