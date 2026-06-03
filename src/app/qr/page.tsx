import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { QrClient } from "./qrClient";

export const metadata = {
  title: "QR Menu",
};

export default function QrPage() {
  return (
    <div className="min-h-full">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-10 pt-8">
        <div className="text-2xl font-semibold">QR Menu</div>
        <p className="mt-2 text-sm text-[color:var(--color-muted)]">
          Generate a QR code for each table (or direct menu access).
        </p>
        <QrClient />
      </main>
      <SiteFooter />
    </div>
  );
}

