"use client";

export type ThemeVariant = "default" | "red" | "green";
export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme_variant";
const STORAGE_KEY_MODE = "theme_mode";
const THEME_CLASSES: Record<Exclude<ThemeVariant, "default">, string> = {
  red: "theme-red",
  green: "theme-green",
};

function applyThemeVariant(variant: ThemeVariant): void {
  if (typeof document === "undefined") return;
  const classList = document.documentElement.classList;
  classList.remove(...Object.values(THEME_CLASSES));
  if (variant !== "default") classList.add(THEME_CLASSES[variant]);
}

function applyThemeMode(mode: ThemeMode): void {
  if (typeof document === "undefined") return;
  const classList = document.documentElement.classList;
  classList.toggle("dark", mode === "dark");
}

export function initThemeVariant(): void {
  try {
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemeVariant | null) || "default";
    applyThemeVariant(stored);
  } catch {
    /* empty */
  }
}

export function setThemeVariant(variant: ThemeVariant): void {
  try {
    localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    /* empty */
  }
  applyThemeVariant(variant);
}

export function getThemeVariant(): ThemeVariant {
  try {
    return ((localStorage.getItem(STORAGE_KEY) as ThemeVariant | null) || "default") as ThemeVariant;
  } catch {
    return "default";
  }
}

export function initThemeMode(): void {
  try {
    const stored = (localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null) || "light";
    applyThemeMode(stored);
  } catch {
    /* empty */
  }
}

export function setThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  } catch {
    /* empty */
  }
  applyThemeMode(mode);
  if (typeof window !== "undefined") {
    try {
      window.dispatchEvent(new CustomEvent("theme:mode", { detail: { mode } }));
    } catch {
      /* empty */
    }
  }
}

export function getThemeMode(): ThemeMode {
  try {
    return ((localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null) || "light") as ThemeMode;
  } catch {
    return "light";
  }
}
