"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent hydration mismatch

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 ">
      <Sun
        className={`h-4 w-4 transition-all ${
          isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`h-4 w-4 absolute transition-all ${
          isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
        aria-label="Toggle theme"
      />
    </div>
  );
}
