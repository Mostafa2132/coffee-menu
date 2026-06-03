import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}

