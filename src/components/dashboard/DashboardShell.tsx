"use client";

import { FiBarChart2, FiCoffee, FiGrid, FiImage, FiLogOut, FiSettings, FiTag, FiSearch, FiBell, FiChevronDown, FiMenu } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const items = [
  { href: "/dashboard", label: "نظرة عامة", icon: FiGrid },
  { href: "/dashboard/orders", label: "الطلبات الحية", icon: FiBell },
  { href: "/dashboard/products", label: "المنتجات", icon: FiCoffee },
  { href: "/dashboard/categories", label: "التصنيفات", icon: FiTag },
  { href: "/dashboard/banners", label: "البنرات", icon: FiImage },
  { href: "/dashboard/analytics", label: "التحليلات", icon: FiBarChart2 },
  { href: "/dashboard/settings", label: "الإعدادات", icon: FiSettings },
];

export function DashboardShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const activeItem = items.find((item) => pathname === item.href) || items[0];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 right-0 z-50 w-[280px] bg-card/80 backdrop-blur-xl border-l border-card-border shadow-2xl lg:shadow-none flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3 w-max">
            <span className="place-items-center grid bg-gradient-to-b from-coffee-600 to-coffee-900 shadow-[0_8px_20px_rgba(124,45,18,0.3)] rounded-2xl w-10 h-10 text-coffee-50">
              <FiCoffee size={20} />
            </span>
            <div>
              <div className="font-bold text-lg leading-tight tracking-tight">نظام الإدارة</div>
              <div className="text-xs text-muted font-medium">Coffee Menu v2</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-muted/60 mb-2">القائمة الرئيسية</div>
          {items.map((it) => {
            const active = pathname === it.href;
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative group overflow-hidden",
                  active
                    ? "bg-coffee-600/10 text-coffee-700 dark:text-coffee-300"
                    : "text-muted hover:bg-card-border hover:text-foreground"
                )}
              >
                {active && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-coffee-600 rounded-l-full" />
                )}
                <Icon className={cn("text-lg transition-transform duration-300", active ? "scale-110" : "group-hover:scale-110")} />
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Block */}
        <div className="p-4 mt-auto border-t border-card-border/50">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-background/50 border border-card-border/50">
            <div className="w-10 h-10 rounded-xl bg-coffee-200 dark:bg-coffee-800 border-2 border-background flex items-center justify-center shrink-0">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=admin&backgroundColor=transparent" alt="Admin" className="w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">المدير العام</p>
              <p className="text-xs text-muted truncate">admin@coffee.app</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 rounded-xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 shrink-0 text-muted"
              onClick={async () => {
                const supabase = createSupabaseBrowserClient();
                await supabase.auth.signOut();
                toast.success("تم تسجيل الخروج");
                window.location.href = "/";
              }}
              aria-label="Sign out"
            >
              <FiLogOut />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-background/50">
        {/* Top Header */}
        <header className="h-20 bg-card/60 backdrop-blur-xl border-b border-card-border flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-xl bg-card border border-card-border text-foreground"
              onClick={() => setIsMobileOpen(true)}
            >
              <FiMenu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted mb-0.5">
                <span>لوحة التحكم</span>
                <span>/</span>
                <span className="text-coffee-600 dark:text-coffee-400">{activeItem.label}</span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-coffee-500 transition-colors">
                <FiSearch />
              </div>
              <input 
                type="text" 
                placeholder="بحث في لوحة التحكم..." 
                className="h-11 pl-10 pr-4 w-64 rounded-2xl bg-background/50 border border-card-border focus:border-coffee-400 focus:ring-4 focus:ring-coffee-400/10 transition-all text-sm outline-none"
              />
            </div>
            
            <ThemeToggle />
            
            <button className="relative w-11 h-11 rounded-2xl bg-background/50 border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-coffee-300 transition-all">
              <FiBell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-background" />
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {subtitle && (
              <div className="mb-6 flex items-center gap-2 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 text-blue-800 dark:text-blue-300 text-sm">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                {subtitle}
              </div>
            )}
            
            {/* Standardizing the wrapper for children to make them look uniform */}
            <div className="bg-card shadow-sm border border-card-border rounded-3xl p-6 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


