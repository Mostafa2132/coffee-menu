"use client";

import { useMemo } from "react";
import { useProducts } from "@/hooks/queries";
import { useAppSelector } from "@/hooks/store";
import { ProductCard } from "@/components/menu/ProductCard";

export function FavoritesClient() {
  const ids = useAppSelector((s) => s.favorites.productIds);
  const products = useProducts({ sort: "featured", onlyAvailable: false });

  const favoriteProducts = useMemo(() => {
    const list = products.data ?? [];
    const set = new Set(ids);
    return list.filter((p) => set.has(p.id));
  }, [products.data, ids]);

  if (!ids.length) {
    return (
      <div className="mt-6 rounded-3xl border border-[color:var(--color-card-border)] bg-white/50 p-6 text-sm text-[color:var(--color-muted)] dark:bg-black/20">
        No favorites yet. Tap the heart icon on any drink to save it here.
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {favoriteProducts.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

