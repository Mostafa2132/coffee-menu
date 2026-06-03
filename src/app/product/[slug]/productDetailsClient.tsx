"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useProduct } from "@/hooks/queries";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

export function ProductDetailsClient({ slug }: { slug: string }) {
  const q = useProduct(slug);

  if (q.isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="aspect-[4/3] rounded-3xl" />
        <div>
          <Skeleton className="h-7 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
          <Skeleton className="mt-6 h-10 w-40" />
        </div>
      </div>
    );
  }

  if (q.isError || !q.data) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-200">
        Could not load product.
      </div>
    );
  }

  const p = q.data;

  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-start">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={p.image || "/placeholder.svg"}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={
              p.available ? "bg-white/65" : "bg-red-500/15 text-red-700"
            }
          >
            {p.available ? "Available" : "Unavailable"}
          </Badge>
          {p.featured ? (
            <Badge className="bg-coffee-200/70 text-coffee-900">Featured</Badge>
          ) : null}
        </div>

        <div className="mt-3 text-3xl font-semibold tracking-tight">
          {p.title}
        </div>
        {p.description ? (
          <div className="mt-3 text-sm leading-7 text-[color:var(--color-muted)]">
            {p.description}
          </div>
        ) : null}

        <div className="mt-5 inline-flex items-center rounded-2xl bg-coffee-100/80 px-4 py-2 text-lg font-semibold text-coffee-900 dark:bg-coffee-900/30 dark:text-coffee-100">
          ${p.price.toFixed(2)}
        </div>

        <div className="mt-8 grid gap-4">
          {p.ingredients?.length ? (
            <InfoBlock title="Ingredients" items={p.ingredients} />
          ) : null}
          {p.sizes?.length ? <InfoBlock title="Sizes" items={p.sizes} /> : null}
          {p.extras?.length ? (
            <InfoBlock title="Extra toppings" items={p.extras} />
          ) : null}
          {typeof p.calories === "number" ? (
            <div className="rounded-3xl border border-[color:var(--color-card-border)] bg-white/50 p-4 text-sm dark:bg-black/20">
              <div className="text-xs text-[color:var(--color-muted)]">
                Calories
              </div>
              <div className="mt-1 font-semibold">{p.calories} kcal</div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-[color:var(--color-card-border)] bg-white/50 p-4 text-sm dark:bg-black/20">
      <div className="text-xs text-[color:var(--color-muted)]">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((x) => (
          <Badge key={x}>{x}</Badge>
        ))}
      </div>
    </div>
  );
}

