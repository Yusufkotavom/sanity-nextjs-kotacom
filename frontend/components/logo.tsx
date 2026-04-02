"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const KOTACOM_DEFAULT_LOGO = "/images/branding/kotacom-logo.svg";
const KOTACOM_DEFAULT_LOGO_WIDTH = 1280;
const KOTACOM_DEFAULT_LOGO_HEIGHT = 1248;

export default function Logo({
  settings,
  className,
  imageClassName,
  priority = true,
}: {
  settings: SETTINGS_QUERY_RESULT;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent content after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before hydration, use light theme as default
  const themeToUse = mounted ? resolvedTheme : "light";

  // Select the appropriate logo based on resolved theme (handles "system" correctly)
  const selectedLogo =
    settings?.logo?.[themeToUse === "dark" ? "dark" : "light"];

  // If no logo for the current theme, try the opposite theme as fallback
  const fallbackLogo =
    settings?.logo?.[themeToUse === "dark" ? "light" : "dark"];
  const logoToUse = selectedLogo || fallbackLogo;

  if (logoToUse) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src={urlFor(logoToUse).url()}
          alt={settings.siteName || "kotacom.id"}
          width={
            (settings.logo?.width as number) ??
            logoToUse?.asset?.metadata?.dimensions?.width ??
            KOTACOM_DEFAULT_LOGO_WIDTH
          }
          height={
            (settings.logo?.height as number) ??
            logoToUse?.asset?.metadata?.dimensions?.height ??
            KOTACOM_DEFAULT_LOGO_HEIGHT
          }
          title={settings.siteName || "kotacom.id"}
          className={cn("h-10 w-auto", imageClassName)}
          placeholder={
            logoToUse?.asset?.metadata?.lqip &&
            logoToUse?.asset?.mimeType !== "image/svg+xml"
              ? "blur"
              : undefined
          }
          blurDataURL={logoToUse?.asset?.metadata?.lqip || undefined}
          quality={100}
          priority={priority}
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={KOTACOM_DEFAULT_LOGO}
        alt={settings?.siteName || "kotacom.id"}
        title={settings?.siteName || "kotacom.id"}
        width={KOTACOM_DEFAULT_LOGO_WIDTH}
        height={KOTACOM_DEFAULT_LOGO_HEIGHT}
        className={cn("h-10 w-auto", imageClassName)}
        priority={priority}
      />
    </span>
  );
}
