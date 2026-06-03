"use client";

import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] px-4 text-sm shadow-[var(--shadow-card)] backdrop-blur placeholder:text-[color:var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
        className,
      )}
      {...props}
    />
  );
}

