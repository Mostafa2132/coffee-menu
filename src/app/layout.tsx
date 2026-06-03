import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getLocale } from "@/i18n/getLocale";
import { getMessages } from "@/i18n/getMessages";
import type { AppLocale } from "@/i18n/config";
import { CoffeeScene } from "@/components/3d/CoffeeScene";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "كافيه أوريليا — القائمة الرقمية",
    template: "%s — كافيه أوريليا",
  },
  description:
    "قائمة القهوة الرقمية الفاخرة مع إمكانية الوصول عبر QR، والطلب السريع والتفاعلي.",
  openGraph: {
    title: "كافيه أوريليا — القائمة الرقمية",
    description:
      "تصفح قائمة مشروباتنا المميزة واستمتع بتجربة طلب استثنائية.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localePromise = getLocale();
  const messagesPromise = localePromise.then((l) => getMessages(l));

  return (
    <HtmlShell
      className={`${alexandria.variable} h-full antialiased dark`}
      localePromise={localePromise}
      messagesPromise={messagesPromise}
    >
      <CoffeeScene />
      {children}
    </HtmlShell>
  );
}

async function HtmlShell({
  children,
  className,
  localePromise,
  messagesPromise,
}: {
  children: React.ReactNode;
  className: string;
  localePromise: Promise<AppLocale>;
  messagesPromise: Promise<Record<string, unknown>>;
}) {
  const locale = "ar";
  const messages = await messagesPromise;
  const dir = "rtl";

  return (
    <html lang={locale} dir={dir} className={className} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
