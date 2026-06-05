import { type AppLocale, defaultLocale } from "./config";

export async function getMessages(locale: AppLocale) {
  const safeLocale = locale ?? defaultLocale;
  try {
    const messages = (await import(`./messages/${safeLocale}.json`)).default;
    return messages as Record<string, unknown>;
  } catch {
    // Fallback to default locale if the locale file is not found
    const messages = (await import(`./messages/${defaultLocale}.json`)).default;
    return messages as Record<string, unknown>;
  }
}
