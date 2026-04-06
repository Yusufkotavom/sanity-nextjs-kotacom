"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/date-range-picker";
import { DateRangePresets } from "@/components/date-range-presets";
import { format } from "date-fns";

export function AnalyticsDateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");
  
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (fromParam && toParam) {
      return {
        from: new Date(fromParam),
        to: new Date(toParam),
      };
    }
    return undefined;
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    
    if (newDate?.from && newDate?.to) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("from", format(newDate.from, "yyyy-MM-dd"));
      params.set("to", format(newDate.to, "yyyy-MM-dd"));
      router.push(`/dashboard/analytics?${params.toString()}`);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("from");
      params.delete("to");
      router.push(`/dashboard/analytics?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DateRangePresets onSelect={handleDateChange} />
      <DateRangePicker date={date} onDateChange={handleDateChange} />
    </div>
  );
}
