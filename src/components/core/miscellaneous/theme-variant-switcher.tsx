"use client";

import SkiButton from "@/components/shared/button";
import type { ThemeMode, ThemeVariant } from "@/lib/theme/variant";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Palette, Sun } from "lucide-react";
import { useContext, useEffect, useState } from "react";

import { AppThemeContext } from "./theme-provider";

export function ThemeVariantSwitcher({ className }: { className?: string }) {
  const context = useContext(AppThemeContext);
  const [value, setValue] = useState<ThemeVariant>(context?.variant ?? "default");

  useEffect(() => {
    if (!context) return;
    setValue(context.variant);
  }, [context]);

  function handleChange(next: ThemeVariant) {
    setValue(next);
    context?.setVariant(next);
  }

  return (
    <div
      className={cn(
        "bg-card border-border inline-flex w-full items-center justify-between gap-1 rounded-lg border p-1",
        className,
      )}
    >
      <SkiButton
        variant="default"
        size="icon"
        onClick={() => handleChange("default")}
        aria-label="Default theme"
        className={cn("text-primary h-8 w-8 p-0", value === "default" ? "bg-primary/20" : "bg-transparent")}
        isIconOnly
        icon={<Palette className="h-4 w-4" />}
      />

      <SkiButton
        variant="default"
        size="icon"
        onClick={() => handleChange("red")}
        aria-label="Red theme"
        className={cn("h-8 w-8 p-0", value === "red" ? "bg-primary/20" : "bg-transparent")}
      >
        <div className="h-3 w-3 rounded-full bg-[oklch(0.6_0.23_25)]" />
      </SkiButton>

      <SkiButton
        variant="default"
        size="icon"
        onClick={() => handleChange("green")}
        aria-label="Green theme"
        className={cn("h-8 w-8 p-0", value === "green" ? "bg-primary/20" : "bg-transparent")}
      >
        <div className="h-3 w-3 rounded-full bg-[oklch(0.62_0.18_155)]" />
      </SkiButton>
    </div>
  );
}

export function ThemeModeSwitcher({ className }: { className?: string }) {
  const context = useContext(AppThemeContext);
  const [mode, setMode] = useState<ThemeMode>(context?.mode ?? "system");

  useEffect(() => {
    if (!context) return;
    setMode(context.mode);
  }, [context]);

  function handleModeChange(next: ThemeMode) {
    setMode(next);
    context?.setMode(next);
  }

  return (
    <div
      className={cn("bg-card inline-flex w-full items-center justify-between gap-1 rounded-lg border p-1", className)}
    >
      <SkiButton
        variant="default"
        size="icon"
        onClick={() => handleModeChange("system")}
        aria-label="System mode"
        className={cn("h-8 w-8 p-0", mode === "system" ? "bg-primary/20" : "bg-transparent")}
        isIconOnly
        icon={<Monitor className="h-4 w-4" />}
      />
      <SkiButton
        variant="default"
        size="icon"
        onClick={() => handleModeChange("light")}
        aria-label="Light mode"
        className={cn("h-8 w-8 p-0", mode === "light" ? "bg-primary/20" : "bg-transparent")}
        isIconOnly
        icon={<Sun className="h-4 w-4" />}
      />
      <SkiButton
        variant="default"
        size="icon"
        onClick={() => handleModeChange("dark")}
        aria-label="Dark mode"
        className={cn("h-8 w-8 p-0", mode === "dark" ? "bg-primary/20" : "bg-transparent")}
        isIconOnly
        icon={<Moon className="h-4 w-4" />}
      />
    </div>
  );
}

// Convenience component for using both together
export function ThemeSwitchers({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-full items-center gap-2", className)}>
      <ThemeVariantSwitcher />
      <ThemeModeSwitcher />
    </div>
  );
}
