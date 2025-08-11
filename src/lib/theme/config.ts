/**
 * Skishop theme configuration and presets
 * Utilizes the existing design system colors from global.css
 */

import { ColorTheme, LayoutTheme, ThemeConfig } from "./types";

// Color themes based on existing skishop design system
export const COLOR_THEMES: ColorTheme[] = [
  {
    id: "skishop-default",
    name: "Skishop Default",
    description: "Classic Skishop blue theme with professional styling",
    primary: {
      light: "hsla(202, 100%, 38%, 1)", // Existing primary from global.css
      dark: "oklch(0.38 0.15 238.7)", // Existing mid-blue from design system
    },
    primaryForeground: {
      light: "oklch(1 0 0)", // White
      dark: "oklch(1 0 0)", // White
    },
    accent: {
      light: "oklch(0.8 0.17 70)", // Existing accent
      dark: "oklch(0.27 0 0)", // Existing dark accent
    },
    accentForeground: {
      light: "oklch(1 0 0)",
      dark: "oklch(1 0 0)",
    },
  },
  {
    id: "skishop-winter",
    name: "Winter Blue",
    description: "Cool winter theme with high contrast blue tones",
    primary: {
      light: "oklch(0.2 0.15 238.7)", // high-blue
      dark: "oklch(0.38 0.15 238.7)", // mid-blue
    },
    primaryForeground: {
      light: "oklch(0.96 0.02 238.7)", // low-blue
      dark: "oklch(0.96 0.02 238.7)", // low-blue
    },
    accent: {
      light: "oklch(0.38 0.15 238.7)", // mid-blue
      dark: "oklch(0.96 0.02 238.7)", // low-blue
    },
    accentForeground: {
      light: "oklch(0.96 0.02 238.7)",
      dark: "oklch(0.2 0.15 238.7)",
    },
  },
  {
    id: "skishop-forest",
    name: "Alpine Forest",
    description: "Nature-inspired green theme for outdoor enthusiasts",
    primary: {
      light: "oklch(0.2 0.15 160.4)", // high-success
      dark: "oklch(0.4 0.18 160.4)", // mid-success
    },
    primaryForeground: {
      light: "oklch(0.96 0.05 160.4)", // low-success
      dark: "oklch(0.96 0.05 160.4)", // low-success
    },
    accent: {
      light: "oklch(0.4 0.18 160.4)", // mid-success
      dark: "oklch(0.96 0.05 160.4)", // low-success
    },
    accentForeground: {
      light: "oklch(0.96 0.05 160.4)",
      dark: "oklch(0.2 0.15 160.4)",
    },
  },
  {
    id: "skishop-sunset",
    name: "Mountain Sunset",
    description: "Warm sunset theme with orange and amber tones",
    primary: {
      light: "oklch(0.24 0.1 47.1)", // high-warning
      dark: "oklch(0.68 0.19 47.1)", // mid-warning
    },
    primaryForeground: {
      light: "oklch(0.87 0.15 47.1)", // low-warning
      dark: "oklch(0.87 0.15 47.1)", // low-warning
    },
    accent: {
      light: "oklch(0.68 0.19 47.1)", // mid-warning
      dark: "oklch(0.87 0.15 47.1)", // low-warning
    },
    accentForeground: {
      light: "oklch(0.87 0.15 47.1)",
      dark: "oklch(0.24 0.1 47.1)",
    },
  },
  {
    id: "skishop-midnight",
    name: "Midnight Slopes",
    description: "Sophisticated dark theme with subtle contrasts",
    primary: {
      light: "oklch(0.21 0 0)", // mid-grey-III
      dark: "oklch(0.71 0 0)", // mid-grey-II
    },
    primaryForeground: {
      light: "oklch(0.98 0 0)", // mid-grey-I
      dark: "oklch(0.12 0 0)", // high-grey-III
    },
    accent: {
      light: "oklch(0.56 0 0)", // high-grey-II
      dark: "oklch(0.85 0 0)", // low-grey-II
    },
    accentForeground: {
      light: "oklch(0.98 0 0)",
      dark: "oklch(0.21 0 0)",
    },
  },
  {
    id: "skishop-danger",
    name: "Avalanche Alert",
    description: "High-visibility red theme for important alerts and actions",
    primary: {
      light: "oklch(0.35 0.15 27.3)", // high-danger
      dark: "oklch(0.5 0.25 27.3)", // mid-danger
    },
    primaryForeground: {
      light: "oklch(0.94 0.1 27.3)", // low-danger
      dark: "oklch(0.94 0.1 27.3)", // low-danger
    },
    accent: {
      light: "oklch(0.5 0.25 27.3)", // mid-danger
      dark: "oklch(0.94 0.1 27.3)", // low-danger
    },
    accentForeground: {
      light: "oklch(0.94 0.1 27.3)",
      dark: "oklch(0.35 0.15 27.3)",
    },
  },
];

// Layout themes for different user preferences
export const LAYOUT_THEMES: LayoutTheme[] = [
  {
    id: "default",
    name: "Default",
    description: "Standard layout with balanced spacing and elements",
    scale: "default",
    spacing: 1,
    borderRadius: "medium",
    fontFamily: "sans",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Dense layout for power users who prefer more information",
    scale: "compact",
    spacing: 0.8,
    borderRadius: "small",
    fontFamily: "sans",
  },
  {
    id: "comfortable",
    name: "Comfortable",
    description: "Spacious layout for better readability and accessibility",
    scale: "comfortable",
    spacing: 1.2,
    borderRadius: "large",
    fontFamily: "sans",
  },
  {
    id: "developer",
    name: "Developer",
    description: "Monospace font with minimal styling for technical users",
    scale: "default",
    spacing: 1,
    borderRadius: "none",
    fontFamily: "mono",
  },
];

// Predefined theme configurations
export const THEME_CONFIGS: ThemeConfig[] = [
  {
    id: "skishop-light",
    name: "Skishop Light",
    description: "Classic Skishop experience optimized for daylight use",
    colorTheme: "skishop-default",
    layoutTheme: "default",
    mode: "light",
    animationSpeed: "normal",
    reducedMotion: false,
    highContrast: false,
  },
  {
    id: "skishop-dark",
    name: "Skishop Dark",
    description: "Dark mode for low-light environments and night skiing",
    colorTheme: "skishop-default",
    layoutTheme: "default",
    mode: "dark",
    animationSpeed: "normal",
    reducedMotion: false,
    highContrast: false,
  },
  {
    id: "winter-pro",
    name: "Winter Pro",
    description: "Professional winter theme with compact layout",
    colorTheme: "skishop-winter",
    layoutTheme: "compact",
    mode: "system",
    animationSpeed: "fast",
    reducedMotion: false,
    highContrast: false,
  },
  {
    id: "alpine-comfort",
    name: "Alpine Comfort",
    description: "Comfortable forest theme for extended use",
    colorTheme: "skishop-forest",
    layoutTheme: "comfortable",
    mode: "system",
    animationSpeed: "normal",
    reducedMotion: false,
    highContrast: false,
  },
  {
    id: "sunset-vibes",
    name: "Sunset Vibes",
    description: "Warm sunset theme perfect for après-ski browsing",
    colorTheme: "skishop-sunset",
    layoutTheme: "default",
    mode: "system",
    animationSpeed: "normal",
    reducedMotion: false,
    highContrast: false,
  },
  {
    id: "accessibility-high",
    name: "High Contrast",
    description: "High contrast theme for enhanced accessibility",
    colorTheme: "skishop-midnight",
    layoutTheme: "comfortable",
    mode: "system",
    animationSpeed: "slow",
    reducedMotion: true,
    highContrast: true,
  },
  {
    id: "developer-mode",
    name: "Developer Mode",
    description: "Technical theme with monospace fonts and minimal animations",
    colorTheme: "skishop-midnight",
    layoutTheme: "developer",
    mode: "dark",
    animationSpeed: "none",
    reducedMotion: true,
    highContrast: false,
  },
];

// Default theme configuration
export const DEFAULT_THEME_CONFIG: ThemeConfig =
  THEME_CONFIGS.find((theme) => theme.id === "skishop-light") || THEME_CONFIGS[0];

// Theme categories for organization
export const THEME_CATEGORIES = {
  popular: ["skishop-light", "skishop-dark", "winter-pro"],
  seasonal: ["skishop-winter", "skishop-forest", "skishop-sunset"],
  accessibility: ["accessibility-high", "developer-mode"],
  professional: ["winter-pro", "alpine-comfort", "developer-mode"],
} as const;

// Animation speed configurations
export const ANIMATION_CONFIGS = {
  none: {
    transition: "none",
    duration: 0,
    easing: "linear",
  },
  slow: {
    transition: "all 0.3s ease-in-out",
    duration: 300,
    easing: "ease-in-out",
  },
  normal: {
    transition: "all 0.2s ease-in-out",
    duration: 200,
    easing: "ease-in-out",
  },
  fast: {
    transition: "all 0.1s ease-in-out",
    duration: 100,
    easing: "ease-in-out",
  },
} as const;

// Border radius configurations
export const BORDER_RADIUS_CONFIGS = {
  none: {
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
  },
  small: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
  medium: {
    sm: "calc(var(--radius) - 4px)",
    md: "calc(var(--radius) - 2px)",
    lg: "var(--radius)",
    xl: "calc(var(--radius) + 4px)",
  },
  large: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
  },
} as const;
