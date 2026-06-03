import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/home/Hero";
import { HomeSections } from "@/components/home/HomeSections";
import { CursorBean } from "@/components/home/CursorBean";

export default function Home() {
  return (
    <div className="min-h-full">
      <CursorBean />
      <SiteHeader />
      <main>
        <Hero />
        <HomeSections />
      </main>
      <SiteFooter />
    </div>
  );
}
