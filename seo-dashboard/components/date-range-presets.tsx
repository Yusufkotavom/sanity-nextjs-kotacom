"use client";

import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { subDays, startOfDay, endOfDay } from "date-fns";

interface DateRangePresetsProps {
  onSelect: (range: DateRange) => void;
}

export function DateRangePresets({ onSelect }: DateRangePresetsProps) {
  const presets = [
    {
      label: "Today",
      getValue: () => ({
        from: startOfDay(new Date()),
        to: endOfDay(new Date()),
      }),
    },
    {
      label: "Last 7 days",
      getValue: () => ({
        from: startOfDay(subDays(new Date(), 6)),
        to: endOfDay(new Date()),
      }),
    },
    {
      label: "Last 14 days",
      getValue: () => ({
        from: startOfDay(subDays(new Date(), 13)),
        to: endOfDay(new Date()),
      }),
    },
    {
      label: "Last 30 days",
      getValue: () => ({
        from: startOfDay(subDays(new Date(), 29)),
        to: endOfDay(new Date()),
      }),
    },
    {
      label: "Last 90 days",
      getValue: () => ({
        from: startOfDay(subDays(new Date(), 89)),
        to: endOfDay(new Date()),
      }),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((preset) => (
        <Button
          key={preset.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(preset.getValue())}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}
