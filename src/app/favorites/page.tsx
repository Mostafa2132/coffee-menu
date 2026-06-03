import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FavoritesClient } from "./favoritesClient";

export const metadata = {
  title: "Favorites",
};

export default function FavoritesPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8">
        <div className="text-2xl font-semibold">Favorites</div>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Saved drinks for quick access.
        </p>
        <FavoritesClient />
      </main>
      <SiteFooter />
    </div>
  );
}

