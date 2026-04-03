import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import * as SimpleIcons from "simple-icons";
import { cn } from "@/lib/utils";
import { NAVIGATION_ICON_MAP } from "@/components/icons/navigation-icons";

type LegacyIconName = keyof typeof NAVIGATION_ICON_MAP;
type IconProps = { className?: string };
type LucideIconComponent = ComponentType<{ className?: string }>;

export type SanityIconValue =
  | LegacyIconName
  | {
      provider?: string | null;
      name?: string | null;
      svg?: string | null;
    }
  | null
  | undefined;

function getLucideIcon(name?: string | null): ComponentType<IconProps> | null {
  if (!name) return null;

  const resolvedName = name.startsWith("Lu") ? name.slice(2) : name;
  return (
    (LucideIcons as unknown as Record<string, LucideIconComponent>)[resolvedName] || null
  );
}

function getSimpleIcon(name?: string | null) {
  if (!name) return null;
  const resolvedName = name.startsWith("Si") ? `si${name.slice(2)}` : name;
  return (
    (SimpleIcons as Record<string, { path: string; title: string } | undefined>)[
      resolvedName
    ] || null
  );
}

export default function SanityIcon({
  icon,
  className,
}: {
  icon: SanityIconValue;
  className?: string;
}) {
  if (!icon) return null;

  if (typeof icon === "string") {
    const LegacyIcon = NAVIGATION_ICON_MAP[icon];
    return LegacyIcon ? <LegacyIcon className={className} /> : null;
  }

  if (icon.svg) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex shrink-0 [&_svg]:size-full [&_svg]:fill-current [&_svg]:stroke-current",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
    );
  }

  if (icon.provider === "lu") {
    const LucideIcon = getLucideIcon(icon.name);
    return LucideIcon ? <LucideIcon className={className} /> : null;
  }

  if (icon.provider === "si") {
    const simpleIcon = getSimpleIcon(icon.name);
    if (!simpleIcon) return null;

    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={simpleIcon.path} />
      </svg>
    );
  }

  return null;
}
