"use client";

import {
  getEffectiveThemeMode,
  getThemeMode,
  getThemeVariant,
  initThemeMode,
  initThemeVariant,
  setThemeMode,
  setThemeVariant,
  type ThemeMode,
  type ThemeVariant,
} from "@/lib/theme/variant";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

type ThemeContextValue = {
  mode: ThemeMode;
  effectiveMode: Exclude<ThemeMode, "system">;
  variant: ThemeVariant;
  setMode: (mode: ThemeMode) => void;
  setVariant: (variant: ThemeVariant) => void;
};

export const AppThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(getThemeMode());
  const [variant, setVariantState] = useState<ThemeVariant>(getThemeVariant());

  const effectiveMode = useMemo(() => getEffectiveThemeMode(), []);

  useEffect(() => {
    // Initialize on mount to ensure DOM reflects current storage
    initThemeMode();
    initThemeVariant();

    // Sync with system preference when in system mode
    let media: MediaQueryList | undefined;
    try {
      media = window.matchMedia("(prefers-color-scheme: dark)");
    } catch {
      /* empty */
    }
    const handleSystem = () => {
      if (getThemeMode() === "system") {
        setModeState("system");
      }
    };
    media?.addEventListener?.("change", handleSystem);

    // Cross-tab sync
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme_mode") setModeState(getThemeMode());
      if (event.key === "theme_variant") setVariantState(getThemeVariant());
    };
    window.addEventListener("storage", onStorage);

    return () => {
      media?.removeEventListener?.("change", handleSystem);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setModeCallback = useCallback((m: ThemeMode) => {
    setModeState(m);
    setThemeMode(m);
  }, []);

  const setVariantCallback = useCallback((v: ThemeVariant) => {
    setVariantState(v);
    setThemeVariant(v);
  }, []);

  const value = useMemo(
    () => ({ mode, effectiveMode, variant, setMode: setModeCallback, setVariant: setVariantCallback }),
    [mode, effectiveMode, variant, setModeCallback, setVariantCallback],
  );

  return <AppThemeContext.Provider value={value}>{children}</AppThemeContext.Provider>;
}
