"use client";

import { Minus, Plus } from "lucide-react";

export default function QtyStepper({
  value,
  onChange,
  label,
  size = "md",
}: {
  value: number;
  onChange: (n: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "size-9" : "size-11";
  return (
    <div className="inline-flex items-center rounded-full border-[1.5px] border-line" role="group" aria-label={label}>
      <button type="button" className={`${box} inline-flex items-center justify-center rounded-full hover:bg-paper-2 disabled:opacity-40`} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span className="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" className={`${box} inline-flex items-center justify-center rounded-full hover:bg-paper-2 disabled:opacity-40`} onClick={() => onChange(value + 1)} disabled={value >= 10} aria-label="Increase quantity">
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
