/**
 * Skishop Enhanced Theme System
 * Export all theme-related components, utilities, and types
 */

// Core types
export type {
  ColorIntensity,
  ColorFamily,
  ThemeMode,
  LayoutScale,
  FontFamily,
  BorderRadius,
  AnimationSpeed,
  ColorTheme,
  LayoutTheme,
  ThemeConfig,
  ThemeState,
  ThemeContextType,
  ThemeChangeEvent,
  ThemeModeChangeEvent,
  ThemeEvent,
  ThemeValidationResult,
  ThemeStorage,
  CSSCustomProperties,
  ThemeApplicationResult,
} from "./types";

// Configuration and presets
export {
  COLOR_THEMES,
  LAYOUT_THEMES,
  THEME_CONFIGS,
  DEFAULT_THEME_CONFIG,
  THEME_CATEGORIES,
  ANIMATION_CONFIGS,
  BORDER_RADIUS_CONFIGS,
} from "./config";

// Utilities
export {
  getThemeConfig,
  getColorTheme,
  getLayoutTheme,
  validateTheme,
  getSystemThemeMode,
  getSystemAnimationPreference,
  getSystemContrastPreference,
  generateThemeCSS,
  applyTheme,
  loadThemeState,
  saveThemeState,
  exportThemeConfig,
  importThemeConfig,
  createDefaultThemeState,
  mergeThemeState,
  defaultThemeStorage,
} from "./utils";

// Context and provider
export {
  SkishopThemeProvider,
  useSkishopTheme,
  useThemeConfig, // Legacy compatibility
} from "./context";

// Theme constants for easy reference
export const THEME_IDS = {
  SKISHOP_LIGHT: "skishop-light",
  SKISHOP_DARK: "skishop-dark",
  WINTER_PRO: "winter-pro",
  ALPINE_COMFORT: "alpine-comfort",
  SUNSET_VIBES: "sunset-vibes",
  ACCESSIBILITY_HIGH: "accessibility-high",
  DEVELOPER_MODE: "developer-mode",
} as const;

export const COLOR_THEME_IDS = {
  SKISHOP_DEFAULT: "skishop-default",
  SKISHOP_WINTER: "skishop-winter",
  SKISHOP_FOREST: "skishop-forest",
  SKISHOP_SUNSET: "skishop-sunset",
  SKISHOP_MIDNIGHT: "skishop-midnight",
  SKISHOP_DANGER: "skishop-danger",
} as const;

export const LAYOUT_THEME_IDS = {
  DEFAULT: "default",
  COMPACT: "compact",
  COMFORTABLE: "comfortable",
  DEVELOPER: "developer",
} as const;
