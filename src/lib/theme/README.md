# Skishop Enhanced Theme System

A comprehensive, elegant, and robust theme system built specifically for Skishop, utilizing the existing design system colors while providing advanced customization capabilities.

## Features

- 🎨 **Rich Color Themes**: Six carefully crafted themes using Skishop's design system
- 🏗️ **Flexible Layouts**: Multiple layout options with different spacing and typography
- 🌙 **Smart Mode Detection**: Automatic light/dark mode with system preference detection
- ♿ **Accessibility First**: Built-in support for reduced motion and high contrast
- 💾 **Persistent Themes**: Automatic theme persistence with validation
- 🔧 **Developer Friendly**: Comprehensive TypeScript types and utilities
- 📱 **Responsive Design**: Works seamlessly across all device sizes
- 🎭 **Visual Previews**: Rich theme selector with live previews

## Quick Start

### 1. Setup the Theme Provider

Replace your existing theme setup with the new Skishop theme system:

```tsx
// app/layout.tsx
import { SkishopThemeProvider } from "@/lib/theme";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkishopThemeProvider>{children}</SkishopThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Use the Enhanced Theme Selector

```tsx
// components/navbar.tsx
import { EnhancedThemeSelector } from "@/components/theme";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div>Your Logo</div>
      <EnhancedThemeSelector />
    </nav>
  );
}
```

### 3. Access Theme State in Components

```tsx
import { useSkishopTheme } from "@/lib/theme";

export function MyComponent() {
  const { state, setTheme, setMode } = useSkishopTheme();

  return (
    <div className={`theme-transition ${state.isLoading ? "theme-loading" : ""}`}>
      <h1 className="theme-primary">Current theme: {state.currentTheme}</h1>
      <button className="theme-button" onClick={() => setTheme("winter-pro")}>
        Switch to Winter Pro
      </button>
    </div>
  );
}
```

## Available Themes

### Color Themes

- **Skishop Default**: Classic blue professional theme
- **Winter Blue**: Cool winter theme with high contrast blues
- **Alpine Forest**: Nature-inspired green theme
- **Mountain Sunset**: Warm sunset theme with orange/amber tones
- **Midnight Slopes**: Sophisticated dark theme with subtle contrasts
- **Avalanche Alert**: High-visibility red theme for important actions

### Layout Themes

- **Default**: Standard balanced layout
- **Compact**: Dense layout for power users
- **Comfortable**: Spacious layout for accessibility
- **Developer**: Monospace font with minimal styling

### Complete Theme Presets

- **Skishop Light/Dark**: Classic experience
- **Winter Pro**: Professional winter theme with compact layout
- **Alpine Comfort**: Forest theme with comfortable spacing
- **Sunset Vibes**: Warm theme for casual browsing
- **High Contrast**: Accessibility-focused theme
- **Developer Mode**: Technical theme with monospace fonts

## Using Theme Classes

The system provides utility classes that automatically adapt to the current theme:

### Color Classes

```css
.theme-primary           /* Primary theme color */
.theme-bg-primary        /* Primary background */
.theme-border-primary    /* Primary border */
.theme-accent           /* Accent color */
.theme-bg-accent        /* Accent background */
```

### Layout Classes

```css
.theme-spacing          /* Responsive padding */
.theme-margin           /* Responsive margins */
.theme-gap              /* Responsive grid/flex gaps */
.theme-font             /* Theme-aware font family */
```

### Interactive Classes

```css
.theme-transition       /* Theme-aware transitions */
.theme-interactive      /* Hover/focus effects */
.theme-focus            /* Enhanced focus states */
.theme-button           /* Complete button styling */
.theme-card             /* Card component styling */
```

### Border Radius Classes

```css
.theme-rounded-none     /* No border radius */
.theme-rounded-sm       /* Small border radius */
.theme-rounded          /* Default border radius */
.theme-rounded-lg       /* Large border radius */
.theme-rounded-full     /* Fully rounded */
```

## Advanced Usage

### Custom Theme Creation

```tsx
import { ThemeConfig, validateTheme } from "@/lib/theme";

const customTheme: ThemeConfig = {
  id: "my-custom-theme",
  name: "My Custom Theme",
  description: "A personalized theme",
  colorTheme: "skishop-forest",
  layoutTheme: "comfortable",
  mode: "system",
  animationSpeed: "normal",
  reducedMotion: false,
  highContrast: false,
};

// Validate before using
const validation = validateTheme(customTheme);
if (validation.isValid) {
  // Use the theme
}
```

### Theme Event Handling

```tsx
import { SkishopThemeProvider, ThemeEvent } from "@/lib/theme";

function App() {
  const handleThemeChange = (event: ThemeEvent) => {
    console.log("Theme changed:", event);
    // Analytics, logging, etc.
  };

  return <SkishopThemeProvider onThemeChange={handleThemeChange}>{/* Your app */}</SkishopThemeProvider>;
}
```

### Export/Import Themes

```tsx
import { useSkishopTheme } from "@/lib/theme";

function ThemeManager() {
  const { exportTheme, importTheme } = useSkishopTheme();

  const handleExport = async () => {
    const themeData = exportTheme();
    await navigator.clipboard.writeText(themeData);
  };

  const handleImport = async () => {
    const text = await navigator.clipboard.readText();
    const success = importTheme(text);
    // Handle success/failure
  };

  return (
    <div>
      <button onClick={handleExport}>Export Theme</button>
      <button onClick={handleImport}>Import Theme</button>
    </div>
  );
}
```

## Accessibility Features

### Reduced Motion

Automatically detects user's motion preferences and can be manually toggled:

```tsx
const { state, setReducedMotion } = useSkishopTheme();

// Manually control
setReducedMotion(true);

// Check current state
if (state.reducedMotion) {
  // Handle reduced motion UI
}
```

### High Contrast

Provides enhanced contrast for better visibility:

```tsx
const { state, setHighContrast } = useSkishopTheme();

setHighContrast(true);
```

### System Integration

The theme system automatically respects system preferences:

- `prefers-color-scheme` for light/dark mode
- `prefers-reduced-motion` for animation preferences
- `prefers-contrast` for contrast preferences

## Migration Guide

### From Existing Theme System

1. **Replace the provider:**

   ```tsx
   // Old
   <ActiveThemeProvider>

   // New
   <SkishopThemeProvider>
   ```

2. **Update hook usage:**

   ```tsx
   // Old
   const { activeTheme, setActiveTheme } = useThemeConfig();

   // New
   const { state, setTheme } = useSkishopTheme();
   // or for compatibility:
   const { activeTheme, setActiveTheme } = useThemeConfig();
   ```

3. **Update theme IDs:**

   ```tsx
   // Old theme IDs like 'default', 'blue'
   // New theme IDs like 'skishop-light', 'winter-pro'
   ```

4. **Use new CSS classes:**
   ```css
   /* Replace custom styling with theme classes */
   .my-button {
     @apply theme-button theme-transition;
   }
   ```

## Best Practices

1. **Use theme classes**: Prefer theme utility classes over custom CSS
2. **Test accessibility**: Always test with reduced motion and high contrast
3. **Provide fallbacks**: Ensure your app works without JavaScript
4. **Respect user preferences**: Don't override system accessibility settings
5. **Performance**: Use the `isLoading` state to prevent layout shifts

## Troubleshooting

### Theme not applying

- Ensure `SkishopThemeProvider` wraps your app
- Check that CSS classes are not being overridden
- Verify theme ID exists in `THEME_CONFIGS`

### Colors not showing

- Confirm the color theme exists in `COLOR_THEMES`
- Check CSS custom property fallbacks
- Ensure proper CSS import order

### TypeScript errors

- Update imports to use new theme types
- Check that theme IDs match the type definitions
- Ensure all required theme properties are provided

## Contributing

When adding new themes:

1. Add color theme to `COLOR_THEMES` in `config.ts`
2. Add corresponding CSS classes in `global.css`
3. Create theme preset in `THEME_CONFIGS`
4. Add to appropriate category in `THEME_CATEGORIES`
5. Update TypeScript types if needed
6. Test across all modes and accessibility settings

---

This theme system provides a solid foundation for Skishop's visual identity while remaining flexible enough to accommodate future design needs and user preferences.
