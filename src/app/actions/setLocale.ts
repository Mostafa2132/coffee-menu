"use server";

import { cookies } from "next/headers";
import { isLocale, localeCookieName } from "@/i18n/config";

export async function setLocaleAction(locale: string) {
  if (!isLocale(locale)) return;
  (await cookies()).set(localeCookieName, locale, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

