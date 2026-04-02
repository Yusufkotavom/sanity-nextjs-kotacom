"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.52 3.48A11.84 11.84 0 0 0 12.04 0C5.42 0 .03 5.39.03 12a11.9 11.9 0 0 0 1.62 6.02L0 24l6.2-1.62A12 12 0 0 0 12.04 24C18.66 24 24 18.61 24 12c0-3.2-1.25-6.22-3.48-8.52Zm-8.48 18.5a9.95 9.95 0 0 1-5.07-1.39l-.36-.22-3.68.97.98-3.6-.24-.37a9.98 9.98 0 1 1 8.37 4.61Zm5.48-7.47c-.3-.15-1.75-.86-2.02-.96-.27-.1-.46-.15-.66.15-.2.3-.76.95-.94 1.14-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.43-1.5a9.2 9.2 0 0 1-1.69-2.1c-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.2-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.1 4.49.71.31 1.27.5 1.7.64.71.22 1.36.19 1.87.12.57-.08 1.75-.71 2-1.39.24-.67.24-1.25.17-1.4-.08-.14-.27-.22-.57-.37Z" />
    </svg>
  );
}

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
        <WhatsAppIcon className="relative z-10 size-5" />
      </span>
      <span className="hidden sm:inline">{ctaText?.trim() || "Chat via WhatsApp"}</span>
    </Link>
  );
}
