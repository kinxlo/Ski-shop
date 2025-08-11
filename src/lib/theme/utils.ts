/**
 * Theme utility functions for Skishop
 * Provides helpers for theme management, validation, and application
 */

import {
  ANIMATION_CONFIGS,
  BORDER_RADIUS_CONFIGS,
  COLOR_THEMES,
  DEFAULT_THEME_CONFIG,
  LAYOUT_THEMES,
  THEME_CONFIGS,
} from "./config";
import {
  AnimationSpeed,
  ColorTheme,
  CSSCustomProperties,
  LayoutTheme,
  ThemeApplicationResult,
  ThemeConfig,
  ThemeMode,
  ThemeState,
  ThemeStorage,
  ThemeValidationResult,
} from "./types";

// Storage keys
const STORAGE_KEYS = {
  THEME: "skishop_theme",
  MODE: "skishop_theme_mode",
  COLOR_THEME: "skishop_color_theme",
  LAYOUT_THEME: "skishop_layout_theme",
  ANIMATION_SPEED: "skishop_animation_speed",
  REDUCED_MOTION: "skishop_reduced_motion",
  HIGH_CONTRAST: "skishop_high_contrast",
  CUSTOM_THEMES: "skishop_custom_themes",
} as const;

// Default storage implementation
export const defaultThemeStorage: ThemeStorage = {
  get: (key: string) => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  remove: (key: string) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  clear: () => {
    if (typeof window === "undefined") return;
    try {
      for (const key of Object.values(STORAGE_KEYS)) {
        localStorage.removeItem(key);
      }
    } catch {
      // Silently fail if localStorage is not available
    }
  },
};

/**
 * Get theme configuration by ID
 */
export function getThemeConfig(themeId: string): ThemeConfig | undefined {
  return THEME_CONFIGS.find((theme) => theme.id === themeId);
}

/**
 * Get color theme by ID
 */
export function getColorTheme(colorThemeId: string): ColorTheme | undefined {
  return COLOR_THEMES.find((theme) => theme.id === colorThemeId);
}

/**
 * Get layout theme by ID
 */
export function getLayoutTheme(layoutThemeId: string): LayoutTheme | undefined {
  return LAYOUT_THEMES.find((theme) => theme.id === layoutThemeId);
}

/**
 * Validate theme configuration
 */
export function validateTheme(config: Partial<ThemeConfig>): ThemeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!config.id) {
    errors.push("Theme ID is required");
  }

  if (!config.name) {
    errors.push("Theme name is required");
  }

  if (config.colorTheme && !getColorTheme(config.colorTheme)) {
    errors.push(`Color theme '${config.colorTheme}' not found`);
  }

  if (config.layoutTheme && !getLayoutTheme(config.layoutTheme)) {
    errors.push(`Layout theme '${config.layoutTheme}' not found`);
  }

  if (config.mode && !["light", "dark", "system"].includes(config.mode)) {
    errors.push("Invalid theme mode");
  }

  if (config.animationSpeed && !["none", "slow", "normal", "fast"].includes(config.animationSpeed)) {
    errors.push("Invalid animation speed");
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Detect system theme preference
 */
export function getSystemThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "light";

  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

/**
 * Detect system animation preference
 */
export function getSystemAnimationPreference(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Detect system contrast preference
 */
export function getSystemContrastPreference(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return window.matchMedia("(prefers-contrast: high)").matches;
  } catch {
    return false;
  }
}

/**
 * Generate CSS custom properties for a theme
 */
export function generateThemeCSS(
  themeConfig: ThemeConfig,
  mode: "light" | "dark" | "system" = "light",
): CSSCustomProperties {
  const colorTheme = getColorTheme(themeConfig.colorTheme);
  const layoutTheme = getLayoutTheme(themeConfig.layoutTheme);

  if (!colorTheme || !layoutTheme) {
    return {};
  }

  // Resolve the actual mode, ensuring it's never 'system'
  const systemMode = getSystemThemeMode();
  const actualMode: "light" | "dark" = mode === "system" ? (systemMode === "system" ? "light" : systemMode) : mode;
  const properties: CSSCustomProperties = {};

  // Color properties
  properties["--primary"] = colorTheme.primary[actualMode];
  properties["--primary-foreground"] = colorTheme.primaryForeground[actualMode];

  if (colorTheme.accent) {
    properties["--accent"] = colorTheme.accent[actualMode];
    properties["--accent-foreground"] = colorTheme.accentForeground![actualMode];
  }

  // Layout properties
  properties["--theme-spacing-scale"] = layoutTheme.spacing.toString();

  // Font family
  if (layoutTheme.fontFamily === "mono") {
    properties["--font-sans"] = "var(--font-mono)";
  }

  // Border radius
  const radiusConfig = BORDER_RADIUS_CONFIGS[layoutTheme.borderRadius];
  for (const [key, value] of Object.entries(radiusConfig)) {
    properties[`--radius-${key}`] = value;
  }

  // Animation properties
  const animationConfig = ANIMATION_CONFIGS[themeConfig.animationSpeed];
  properties["--theme-transition"] = animationConfig.transition;
  properties["--theme-duration"] = `${animationConfig.duration}ms`;

  // Accessibility properties
  if (themeConfig.reducedMotion) {
    properties["--theme-transition"] = "none";
    properties["--theme-duration"] = "0ms";
  }

  if (themeConfig.highContrast) {
    properties["--theme-contrast"] = "high";
  }

  return properties;
}

/**
 * Apply theme to document
 */
export function applyTheme(themeConfig: ThemeConfig, mode: ThemeMode = "light"): ThemeApplicationResult {
  if (typeof document === "undefined") {
    return {
      success: false,
      appliedProperties: {},
      errors: ["Document not available (SSR environment)"],
    };
  }

  try {
    const properties = generateThemeCSS(themeConfig, mode);
    const root = document.documentElement;
    const errors: string[] = [];

    // Apply CSS custom properties
    for (const [property, value] of Object.entries(properties)) {
      try {
        root.style.setProperty(property, value);
      } catch (error) {
        errors.push(`Failed to set property ${property}: ${error}`);
      }
    }

    // Apply theme classes
    const body = document.body;

    // Remove existing theme classes
    for (const className of body.classList) {
      if (className.startsWith("theme-") || className.startsWith("skishop-")) {
        body.classList.remove(className);
      }
    }

    // Add new theme classes
    body.classList.add(`skishop-theme-${themeConfig.id}`);
    body.classList.add(`skishop-color-${themeConfig.colorTheme}`);
    body.classList.add(`skishop-layout-${themeConfig.layoutTheme}`);
    body.classList.add(`skishop-mode-${mode === "system" ? getSystemThemeMode() : mode}`);

    if (themeConfig.reducedMotion) {
      body.classList.add("skishop-reduced-motion");
    }

    if (themeConfig.highContrast) {
      body.classList.add("skishop-high-contrast");
    }

    return {
      success: true,
      appliedProperties: properties,
      errors,
    };
  } catch (error) {
    return {
      success: false,
      appliedProperties: {},
      errors: [`Failed to apply theme: ${error}`],
    };
  }
}

/**
 * Load theme state from storage
 */
export function loadThemeState(storage: ThemeStorage = defaultThemeStorage): Partial<ThemeState> {
  const state: Partial<ThemeState> = {};

  try {
    const themeId = storage.get(STORAGE_KEYS.THEME);
    if (themeId) {
      state.currentTheme = themeId;
    }

    const mode = storage.get(STORAGE_KEYS.MODE) as ThemeMode;
    if (mode) {
      state.mode = mode;
      state.isSystemMode = mode === "system";
    }

    const colorTheme = storage.get(STORAGE_KEYS.COLOR_THEME);
    if (colorTheme) {
      state.colorTheme = colorTheme;
    }

    const layoutTheme = storage.get(STORAGE_KEYS.LAYOUT_THEME);
    if (layoutTheme) {
      state.layoutTheme = layoutTheme;
    }

    const animationSpeed = storage.get(STORAGE_KEYS.ANIMATION_SPEED) as AnimationSpeed;
    if (animationSpeed) {
      state.animationSpeed = animationSpeed;
    }

    const reducedMotion = storage.get(STORAGE_KEYS.REDUCED_MOTION);
    if (reducedMotion !== null) {
      state.reducedMotion = reducedMotion === "true";
    }

    const highContrast = storage.get(STORAGE_KEYS.HIGH_CONTRAST);
    if (highContrast !== null) {
      state.highContrast = highContrast === "true";
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Failed to load theme state from storage:", error);
  }

  return state;
}

/**
 * Save theme state to storage
 */
export function saveThemeState(state: Partial<ThemeState>, storage: ThemeStorage = defaultThemeStorage): void {
  try {
    if (state.currentTheme) {
      storage.set(STORAGE_KEYS.THEME, state.currentTheme);
    }

    if (state.mode) {
      storage.set(STORAGE_KEYS.MODE, state.mode);
    }

    if (state.colorTheme) {
      storage.set(STORAGE_KEYS.COLOR_THEME, state.colorTheme);
    }

    if (state.layoutTheme) {
      storage.set(STORAGE_KEYS.LAYOUT_THEME, state.layoutTheme);
    }

    if (state.animationSpeed) {
      storage.set(STORAGE_KEYS.ANIMATION_SPEED, state.animationSpeed);
    }

    if (state.reducedMotion !== undefined) {
      storage.set(STORAGE_KEYS.REDUCED_MOTION, state.reducedMotion.toString());
    }

    if (state.highContrast !== undefined) {
      storage.set(STORAGE_KEYS.HIGH_CONTRAST, state.highContrast.toString());
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("Failed to save theme state to storage:", error);
  }
}

/**
 * Export theme configuration as JSON
 */
export function exportThemeConfig(themeConfig: ThemeConfig): string {
  try {
    return JSON.stringify(themeConfig, null, 2);
  } catch (error) {
    throw new Error(`Failed to export theme: ${error}`);
  }
}

/**
 * Import theme configuration from JSON
 */
export function importThemeConfig(themeData: string): ThemeConfig {
  try {
    const config = JSON.parse(themeData) as ThemeConfig;
    const validation = validateTheme(config);

    if (!validation.isValid) {
      throw new Error(`Invalid theme configuration: ${validation.errors.join(", ")}`);
    }

    return config;
  } catch (error) {
    throw new Error(`Failed to import theme: ${error}`);
  }
}

/**
 * Create a theme state with defaults
 */
export function createDefaultThemeState(): ThemeState {
  return {
    currentTheme: DEFAULT_THEME_CONFIG.id,
    mode: "system",
    isSystemMode: true,
    colorTheme: DEFAULT_THEME_CONFIG.colorTheme,
    layoutTheme: DEFAULT_THEME_CONFIG.layoutTheme,
    animationSpeed: DEFAULT_THEME_CONFIG.animationSpeed,
    reducedMotion: getSystemAnimationPreference(),
    highContrast: getSystemContrastPreference(),
    isLoading: false,
  };
}

/**
 * Merge theme state with partial updates
 */
export function mergeThemeState(current: ThemeState, updates: Partial<ThemeState>): ThemeState {
  return {
    ...current,
    ...updates,
    isSystemMode: updates.mode === "system" || (updates.mode === undefined && current.isSystemMode),
  };
}
