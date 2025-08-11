"use client";

import {
  getThemeMode,
  getThemeVariant,
  setThemeMode,
  setThemeVariant,
  type ThemeMode,
  type ThemeVariant,
} from "@/lib/theme/variant";
import { useEffect, useState } from "react";

export function ThemeVariantSwitcher({ className }: { className?: string }) {
  const [value, setValue] = useState<ThemeVariant>("default");
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    setValue(getThemeVariant());
    setMode(getThemeMode());
  }, []);

  function handleChange(next: ThemeVariant) {
    setValue(next);
    setThemeVariant(next);
  }

  function handleModeChange(next: ThemeMode) {
    setMode(next);
    setThemeMode(next);
  }

  return (
    <div className={className}>
      <label className="mr-2 text-sm">Theme:</label>
      <select
        value={value}
        onChange={(event) => handleChange(event.target.value as ThemeVariant)}
        className="border-input rounded-md border bg-transparent px-2 py-1 text-sm"
      >
        <option value="default">Default</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>
      <label className="mr-2 ml-4 text-sm">Mode:</label>
      <select
        value={mode}
        onChange={(event) => handleModeChange(event.target.value as ThemeMode)}
        className="border-input rounded-md border bg-transparent px-2 py-1 text-sm"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
