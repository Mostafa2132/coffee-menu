"use client";

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "soft" | "danger";
  size?: "sm" | "md" | "lg";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-gradient-to-b from-coffee-700 to-coffee-900 text-coffee-50 shadow-[0_12px_30px_rgba(124,45,18,0.25)] hover:from-coffee-600 hover:to-coffee-900",
  soft:
    "bg-coffee-100/70 text-coffee-900 hover:bg-coffee-100 border border-coffee-200/70",
  ghost:
    "bg-transparent hover:bg-coffee-100/60 dark:hover:bg-coffee-900/30 border border-transparent",
  danger:
    "bg-red-600 text-white hover:bg-red-700 shadow-[0_12px_30px_rgba(185,28,28,0.25)]",
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-9 px-3 text-sm rounded-xl",
  md: "h-11 px-4 text-sm rounded-2xl",
  lg: "h-12 px-5 text-base rounded-2xl",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] hover:-translate-y-px",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
