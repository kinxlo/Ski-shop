"use client";

import SkiButton from "@/components/shared/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { ThemeMode, ThemeVariant } from "@/lib/theme/variant";
import { cn } from "@/lib/utils";
import { Check, Monitor, Moon, Palette, Sun } from "lucide-react";
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

// Modern theme switcher with popover interface
export function ModernThemeSwitcher({ className }: { className?: string }) {
  const context = useContext(AppThemeContext);
  const [open, setOpen] = useState(false);

  const getModeIcon = (mode: ThemeMode) => {
    switch (mode) {
      case "light": {
        return <Sun className="h-4 w-4" />;
      }
      case "dark": {
        return <Moon className="h-4 w-4" />;
      }
      case "system": {
        return <Monitor className="h-4 w-4" />;
      }
    }
  };

  const currentIcon = getModeIcon(context?.mode ?? "system");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SkiButton
          variant="ghost"
          size="icon"
          className={cn("hover:bg-accent h-8 w-8 transition-colors", className)}
          aria-label="Theme settings"
        >
          {currentIcon}
        </SkiButton>
      </PopoverTrigger>
      <PopoverContent sideOffset={26} className="w-64" align="end">
        <div className="space-y-4">
          <div>
            <h4 className="!text-primary mb-3 !text-sm !font-semibold">Appearance</h4>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  context?.setMode("system");
                  setOpen(false);
                }}
                className={cn(
                  "hover:bg-accent flex w-full items-center rounded-md px-2 py-2 text-left !text-xs",
                  context?.mode === "system" && "bg-accent",
                )}
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
                {context?.mode === "system" && <Check className="ml-auto h-3 w-3" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  context?.setMode("light");
                  setOpen(false);
                }}
                className={cn(
                  "hover:bg-accent flex w-full items-center rounded-md px-2 py-2 text-left !text-xs",
                  context?.mode === "light" && "bg-accent",
                )}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
                {context?.mode === "light" && <Check className="ml-auto h-3 w-3" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  context?.setMode("dark");
                  setOpen(false);
                }}
                className={cn(
                  "hover:bg-accent flex w-full items-center rounded-md px-2 py-2 text-left !text-xs",
                  context?.mode === "dark" && "bg-accent",
                )}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
                {context?.mode === "dark" && <Check className="ml-auto h-3 w-3" />}
              </button>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="!text-primary mb-3 !text-sm !font-semibold">Accent Color</h4>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => {
                  context?.setVariant("default");
                  setOpen(false);
                }}
                className={cn(
                  "hover:bg-accent flex w-full items-center rounded-md px-2 py-2 text-left !text-xs",
                  context?.variant === "default" && "bg-accent",
                )}
              >
                <Palette className="mr-2 h-4 w-4" />
                Default
                {context?.variant === "default" && <Check className="ml-auto h-3 w-3" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  context?.setVariant("red");
                  setOpen(false);
                }}
                className={cn(
                  "hover:bg-accent flex w-full items-center rounded-md px-2 py-2 text-left !text-xs",
                  context?.variant === "red" && "bg-accent",
                )}
              >
                <div className="mr-2 h-3 w-3 rounded-full bg-[oklch(0.6_0.23_25)]" />
                Red
                {context?.variant === "red" && <Check className="ml-auto h-3 w-3" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  context?.setVariant("green");
                  setOpen(false);
                }}
                className={cn(
                  "hover:bg-accent flex w-full items-center rounded-md px-2 py-2 text-left !text-xs",
                  context?.variant === "green" && "bg-accent",
                )}
              >
                <div className="mr-2 h-3 w-3 rounded-full bg-[oklch(0.62_0.18_155)]" />
                Green
                {context?.variant === "green" && <Check className="ml-auto h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
