import { readFile } from "node:fs/promises";
import path from "node:path";
import { type AppLocale, defaultLocale } from "./config";

export async function getMessages(locale: AppLocale) {
  const safeLocale = locale ?? defaultLocale;
  const filePath = path.join(
    process.cwd(),
    "src",
    "i18n",
    "messages",
    `${safeLocale}.json`,
  );
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as Record<string, unknown>;
}

