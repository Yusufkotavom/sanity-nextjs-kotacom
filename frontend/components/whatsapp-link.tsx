"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { buildWhatsAppHref, normalizeWhatsAppPhone } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/analytics";

type WhatsAppLinkProps = {
  phoneNumber: string;
  predefinedText?: string | null;
  sourceUrl?: string | null;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  rel?: string;
  target?: string;
  onClick?: () => void;
  trackingContext?: string;
};

export default function WhatsAppLink({
  phoneNumber,
  predefinedText,
  sourceUrl,
  className,
  children,
  ariaLabel,
  rel = "noopener noreferrer",
  target = "_blank",
  onClick,
  trackingContext = "whatsapp_link",
}: WhatsAppLinkProps) {
  const pathname = usePathname();
  const previousUrlRef = useRef<string>("");
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const current = window.location.href;
    const previous = previousUrlRef.current || document.referrer || "";
    const computed = buildWhatsAppHref({
      phoneNumber,
      predefinedText: predefinedText || undefined,
      currentPage: current,
      fromPage: previous,
      sourceUrl: sourceUrl || undefined,
    });

    setHref(computed);
    previousUrlRef.current = current;
  }, [pathname, phoneNumber, predefinedText, sourceUrl]);

  if (!href) return null;

  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? rel : undefined}
      aria-label={ariaLabel}
      className={className}
      onClick={() => {
        const normalizedPhone = normalizeWhatsAppPhone(phoneNumber);
        trackWhatsAppClick({
          location: trackingContext,
          label: ariaLabel,
          phoneLast4: normalizedPhone.slice(-4),
          pagePath: typeof window !== "undefined" ? window.location.pathname : "",
        });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}
