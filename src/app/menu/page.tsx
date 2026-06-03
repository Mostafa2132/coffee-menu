import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MenuClient } from "./MenuClient";

export const metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8">
        <div className="text-2xl font-semibold">Menu</div>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Search, filter, and discover drinks by category.
        </p>
        <MenuClient />
      </main>
      <SiteFooter />
    </div>
  );
}

