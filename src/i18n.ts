import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./i18n/config";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = "ar";
  }

  return {
    locale,
    messages: (await import(`./i18n/messages/${locale}.json`)).default,
  };
});
