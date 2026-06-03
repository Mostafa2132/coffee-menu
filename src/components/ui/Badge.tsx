import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--color-card-border)] bg-white/60 px-2.5 py-1 text-xs font-medium text-[color:var(--color-foreground)] dark:bg-black/30",
        className,
      )}
      {...props}
    />
  );
}

