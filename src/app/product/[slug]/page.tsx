import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductDetailsClient } from "./productDetailsClient";

export default function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8">
        <ProductDetailsClient slug={params.slug} />
      </main>
      <SiteFooter />
    </div>
  );
}

