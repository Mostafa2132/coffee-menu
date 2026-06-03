"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FiCoffee, FiHeart, FiMenu } from "react-icons/fi";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { LocaleToggle } from "./LocaleToggle";

export function SiteHeader({ className }: { className?: string }) {
  const t = useTranslations();

  return (
    <header className={cn("sticky top-0 z-50", className)}>
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="rounded-3xl border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-b from-coffee-600 to-coffee-900 text-coffee-50 shadow-[0_12px_30px_rgba(124,45,18,0.25)]">
                <FiCoffee />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{t("brand.name")}</div>
                <div className="text-xs text-[color:var(--color-muted)]">
                  {t("brand.tagline")}
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              <NavLink href="/">{t("nav.home")}</NavLink>
              <NavLink href="/menu">{t("nav.menu")}</NavLink>
              <NavLink href="/favorites">
                <FiHeart className="opacity-80" />
                {t("nav.favorites")}
              </NavLink>
              <NavLink href="/about">{t("nav.about")}</NavLink>
              <NavLink href="/contact">{t("nav.contact")}</NavLink>
            </nav>

            <div className="flex items-center gap-1">
              <LocaleToggle />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="md:hidden"
                aria-label="Menu"
              >
                <FiMenu />
              </Button>
              <Link href="/dashboard">
                <Button type="button" variant="soft" size="sm">
                  {t("nav.dashboard")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm text-[color:var(--color-foreground)]/85 transition hover:bg-coffee-100/70 hover:text-[color:var(--color-foreground)] dark:hover:bg-coffee-900/30"
    >
      {children}
    </Link>
  );
}

