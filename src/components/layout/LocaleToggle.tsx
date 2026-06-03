"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { useLocale } from "next-intl";
import { setLocaleAction } from "@/app/actions/setLocale";

export function LocaleToggle() {
  const locale = useLocale();
  const [pending, startTransition] = useTransition();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        const next = locale === "en" ? "ar" : "en";
        startTransition(async () => {
          try {
            await setLocaleAction(next);
            window.location.reload();
          } catch {
            toast.error("Could not change language");
          }
        });
      }}
    >
      {locale === "en" ? "AR" : "EN"}
    </Button>
  );
}

