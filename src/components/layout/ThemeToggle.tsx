"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const resolved = theme === "system" ? systemTheme : theme;
  const isDark = resolved === "dark";

  if (!mounted) return null;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </Button>
  );
}

