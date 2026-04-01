import type { ComponentType, ReactNode } from "react";

type IconProps = {
  className?: string;
};

function BaseIcon({
  className,
  children,
  viewBox = "0 0 24 24",
}: {
  className?: string;
  children: ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.22.2 2.22.2v2.45h-1.25c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </BaseIcon>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.8h-8.5A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95ZM12 7.2A4.8 4.8 0 1 1 7.2 12 4.8 4.8 0 0 1 12 7.2Zm0 1.8A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm4.95-2.1a1.2 1.2 0 1 1-1.2 1.2 1.2 1.2 0 0 1 1.2-1.2Z" />
    </BaseIcon>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M18.9 3h2.9l-6.33 7.23L23 21h-5.87l-4.6-6.02L7.26 21H4.35l6.77-7.74L1 3h6.02l4.16 5.5L18.9 3Zm-1.02 16.3h1.62L6.13 4.62H4.39L17.88 19.3Z" />
    </BaseIcon>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M21.5 7.2a2.94 2.94 0 0 0-2.06-2.08C17.6 4.6 12 4.6 12 4.6s-5.6 0-7.44.52A2.94 2.94 0 0 0 2.5 7.2 30.4 30.4 0 0 0 2 12a30.4 30.4 0 0 0 .5 4.8 2.94 2.94 0 0 0 2.06 2.08C6.4 19.4 12 19.4 12 19.4s5.6 0 7.44-.52a2.94 2.94 0 0 0 2.06-2.08A30.4 30.4 0 0 0 22 12a30.4 30.4 0 0 0-.5-4.8ZM10.2 15.06V8.94L15.6 12l-5.4 3.06Z" />
    </BaseIcon>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM2.8 9.4h4.36V21H2.8V9.4Zm7.16 0h4.18v1.58h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.22 2.9 5.22 6.66V21h-4.36v-5.1c0-1.22-.02-2.8-1.7-2.8-1.7 0-1.96 1.33-1.96 2.7V21H9.96V9.4Z" />
    </BaseIcon>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M14.5 3c.2 1.8 1.2 3.3 2.8 4.1 1 .5 2 .7 3.2.7v3.1c-1.5 0-2.8-.3-4-.9v5.1c0 3.4-2.7 6.1-6.1 6.1S4.3 18.5 4.3 15.1 7 9 10.4 9c.3 0 .7 0 1 .1v3.2a2.9 2.9 0 1 0 2 2.8V3h3.1Z" />
    </BaseIcon>
  );
}

export function GitHubIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.38-3.87-1.38-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.33.95.1-.74.4-1.24.73-1.52-2.56-.3-5.24-1.28-5.24-5.69 0-1.26.45-2.3 1.18-3.11-.12-.3-.51-1.53.11-3.19 0 0 .96-.3 3.15 1.19a10.9 10.9 0 0 1 5.74 0c2.2-1.49 3.16-1.19 3.16-1.19.62 1.66.23 2.89.11 3.19.73.8 1.18 1.85 1.18 3.11 0 4.42-2.69 5.38-5.25 5.68.41.36.77 1.05.77 2.11v3.13c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </BaseIcon>
  );
}

export function WebsiteIcon({ className }: IconProps) {
  return (
    <BaseIcon className={className}>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm7.93 9h-3.02a15.7 15.7 0 0 0-1.1-5.2A8.04 8.04 0 0 1 19.93 11ZM12 4.07c.9 1.2 1.68 3.18 2.02 5.93H9.98C10.32 7.25 11.1 5.27 12 4.07ZM4.07 13h3.02a15.7 15.7 0 0 0 1.1 5.2A8.04 8.04 0 0 1 4.07 13Zm3.02-2H4.07a8.04 8.04 0 0 1 4.12-5.2A15.7 15.7 0 0 0 7.09 11Zm4.91 8.93c-.9-1.2-1.68-3.18-2.02-5.93h4.04c-.34 2.75-1.12 4.73-2.02 5.93ZM14.3 13H9.7a13.65 13.65 0 0 1 0-2h4.6a13.65 13.65 0 0 1 0 2Zm1.51 5.2a15.7 15.7 0 0 0 1.1-5.2h3.02a8.04 8.04 0 0 1-4.12 5.2Z" />
    </BaseIcon>
  );
}

export const SOCIAL_ICON_MAP: Record<string, ComponentType<IconProps>> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  tiktok: TikTokIcon,
  github: GitHubIcon,
  website: WebsiteIcon,
};
