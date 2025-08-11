/**
 * Comprehensive theme system types for Skishop
 * Built on top of existing design system colors
 */

// Base color intensity variants from the existing design system
export type ColorIntensity = "high" | "mid" | "low";

// Color families from the existing skishop design system
export type ColorFamily = "blue" | "danger" | "warning" | "success" | "grey-I" | "grey-II" | "grey-III";

// Theme modes
export type ThemeMode = "light" | "dark" | "system";

// Layout scaling options
export type LayoutScale = "default" | "compact" | "comfortable";

// Font variations
export type FontFamily = "sans" | "mono";

// Border radius variations
export type BorderRadius = "none" | "small" | "medium" | "large";

// Animation preferences
export type AnimationSpeed = "none" | "slow" | "normal" | "fast";

// Color theme configuration
export interface ColorTheme {
  id: string;
  name: string;
  description?: string;
  primary: {
    light: string;
    dark: string;
  };
  primaryForeground: {
    light: string;
    dark: string;
  };
  accent?: {
    light: string;
    dark: string;
  };
  accentForeground?: {
    light: string;
    dark: string;
  };
}

// Layout theme configuration
export interface LayoutTheme {
  id: string;
  name: string;
  description?: string;
  scale: LayoutScale;
  spacing: number;
  borderRadius: BorderRadius;
  fontFamily: FontFamily;
}

// Complete theme configuration
export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  colorTheme: string; // Reference to ColorTheme.id
  layoutTheme: string; // Reference to LayoutTheme.id
  mode: ThemeMode;
  animationSpeed: AnimationSpeed;
  reducedMotion: boolean;
  highContrast: boolean;
}

// Theme state
export interface ThemeState {
  currentTheme: string; // ThemeConfig.id
  mode: ThemeMode;
  isSystemMode: boolean;
  colorTheme: string;
  layoutTheme: string;
  animationSpeed: AnimationSpeed;
  reducedMotion: boolean;
  highContrast: boolean;
  isLoading: boolean;
}

// Theme context type
export interface ThemeContextType {
  // State
  state: ThemeState;

  // Theme management
  setTheme: (themeId: string) => void;
  setMode: (mode: ThemeMode) => void;
  setColorTheme: (colorThemeId: string) => void;
  setLayoutTheme: (layoutThemeId: string) => void;

  // Accessibility
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  setReducedMotion: (enabled: boolean) => void;
  setHighContrast: (enabled: boolean) => void;

  // Utilities
  getThemeConfig: (themeId?: string) => ThemeConfig | undefined;
  getColorTheme: (colorThemeId?: string) => ColorTheme | undefined;
  getLayoutTheme: (layoutThemeId?: string) => LayoutTheme | undefined;
  exportTheme: () => string;
  importTheme: (themeData: string) => boolean;
  resetToDefault: () => void;
}

// Theme event types
export interface ThemeChangeEvent {
  type: "theme-change";
  previous: Partial<ThemeState>;
  current: ThemeState;
  timestamp: number;
}

export interface ThemeModeChangeEvent {
  type: "mode-change";
  previous: ThemeMode;
  current: ThemeMode;
  timestamp: number;
}

export type ThemeEvent = ThemeChangeEvent | ThemeModeChangeEvent;

// Theme validation result
export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Theme storage interface
export interface ThemeStorage {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  clear: () => void;
}

// CSS custom properties mapping
export interface CSSCustomProperties {
  [key: string]: string;
}

// Theme application result
export interface ThemeApplicationResult {
  success: boolean;
  appliedProperties: CSSCustomProperties;
  errors: string[];
}
