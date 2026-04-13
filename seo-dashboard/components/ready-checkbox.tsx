"use client";

import { useState } from "react";
import { toast } from "sonner";

interface ReadyCheckboxProps {
  generationId: string;
  initialChecked: boolean;
}

export function ReadyCheckbox({ generationId, initialChecked }: ReadyCheckboxProps) {
  const [checked, setChecked] = useState(initialChecked);
  const [updating, setUpdating] = useState(false);

  const handleChange = async (newChecked: boolean) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/ai/generations/${generationId}/ready`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readyToPublish: newChecked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      setChecked(newChecked);
      toast.success(newChecked ? "Marked as ready" : "Unmarked as ready");
    } catch (error) {
      console.error("Failed to update ready status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={updating}
      onChange={(e) => handleChange(e.target.checked)}
      className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}
