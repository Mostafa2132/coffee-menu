import { cookies } from "next/headers";
import { defaultLocale, isLocale, localeCookieName } from "./config";

export async function getLocale() {
  const value = (await cookies()).get(localeCookieName)?.value;
  if (value && isLocale(value)) return value;
  return defaultLocale;
}

