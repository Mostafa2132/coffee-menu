import { cn } from "@/lib/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-coffee-200/40 dark:bg-white/10",
        className,
      )}
    />
  );
}

