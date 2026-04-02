"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOCIAL_ICON_MAP } from "@/components/icons/social-icons";

type SocialLinkItem = {
  _key?: string;
  platform?: string | null;
  url?: string | null;
  target?: boolean | null;
};

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  ...SOCIAL_ICON_MAP,
  website: SOCIAL_ICON_MAP.website || Globe,
};

const LABELS: Record<string, string> = {
  x: "X",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  facebook: "Facebook",
  tiktok: "TikTok",
  github: "GitHub",
  website: "Website",
};

export default function SocialLinks({
  links,
  className,
  iconOnly = true,
  align = "end",
  size = "md",
}: {
  links?: SocialLinkItem[] | null;
  className?: string;
  iconOnly?: boolean;
  align?: "start" | "end";
  size?: "sm" | "md";
}) {
  if (!links?.length) return null;

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-1",
        iconOnly &&
          "max-w-[220px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {links
        .filter((item) => item?.url && item?.platform)
        .map((item) => {
          const platform = item.platform as string;
          const Icon = ICONS[platform] || Globe;
          const label = LABELS[platform] || "Social";
          return (
            <Link
              key={item._key || `${platform}-${item.url}`}
              href={item.url || "#"}
              target={item.target ? "_blank" : undefined}
              rel={item.target ? "noopener noreferrer" : undefined}
              aria-label={label}
              className={cn(
                "inline-flex shrink-0 items-center rounded-md text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground",
                size === "sm" ? "h-8" : "h-9",
                iconOnly
                  ? cn("justify-center", size === "sm" ? "px-2" : "px-2.5")
                  : cn(
                      "w-full gap-2",
                      size === "sm" ? "px-2.5" : "px-3",
                      align === "start" ? "justify-start" : "justify-end",
                    ),
              )}
            >
              <Icon className="size-4" />
              {!iconOnly && <span>{label}</span>}
            </Link>
          );
        })}
    </div>
  );
}
