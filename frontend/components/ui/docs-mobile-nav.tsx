"use client";

import { useRouter } from "next/navigation";

type Option = {
  label: string;
  value: string;
};

export default function DocsMobileNav({
  options,
  currentValue,
}: {
  options: Option[];
  currentValue: string;
}) {
  const router = useRouter();

  return (
    <div className="mb-4 lg:hidden">
      <label
        htmlFor="docs-mobile-nav"
        className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground"
      >
        Browse docs
      </label>
      <select
        id="docs-mobile-nav"
        value={currentValue}
        onChange={(event) => router.push(event.target.value)}
        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
