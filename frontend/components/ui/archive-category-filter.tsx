"use client";

import { useRouter } from "next/navigation";

export default function ArchiveCategoryFilter({
  label = "Filter by category",
  currentValue,
  allValue,
  options,
}: {
  label?: string;
  currentValue: string;
  allValue: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}) {
  const router = useRouter();

  return (
    <div className="inline-flex items-center gap-2">
      <label className="text-sm text-foreground/70">{label}</label>
      <select
        value={currentValue}
        onChange={(event) => router.push(event.target.value)}
        className="border-input bg-background h-9 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
      >
        <option value={allValue}>All categories</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
