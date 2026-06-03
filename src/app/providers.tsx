"use client";

import { type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import type { AppLocale } from "@/i18n/config";
import { StoreProvider } from "@/store/StoreProvider";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: AppLocale;
  messages: Record<string, unknown>;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>{children}</StoreProvider>
          <Toaster position="top-center" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}

