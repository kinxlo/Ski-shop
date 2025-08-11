/* eslint-disable no-console */
/**
 * Enhanced Theme Context Provider for Skishop
 * Provides comprehensive theme management with persistence, validation, and utilities
 */

"use client";

import { useTheme } from "next-themes";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

import {
  AnimationSpeed,
  ThemeConfig,
  ThemeContextType,
  ThemeEvent,
  ThemeMode,
  ThemeState,
  ThemeStorage,
} from "./types";
import {
  applyTheme,
  createDefaultThemeState,
  defaultThemeStorage,
  exportThemeConfig,
  getColorTheme,
  getLayoutTheme,
  getThemeConfig,
  importThemeConfig,
  loadThemeState,
  mergeThemeState,
  saveThemeState,
} from "./utils";

// Theme state actions
type ThemeAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_THEME"; payload: string }
  | { type: "SET_MODE"; payload: ThemeMode }
  | { type: "SET_COLOR_THEME"; payload: string }
  | { type: "SET_LAYOUT_THEME"; payload: string }
  | { type: "SET_ANIMATION_SPEED"; payload: AnimationSpeed }
  | { type: "SET_REDUCED_MOTION"; payload: boolean }
  | { type: "SET_HIGH_CONTRAST"; payload: boolean }
  | { type: "LOAD_STATE"; payload: Partial<ThemeState> }
  | { type: "RESET_TO_DEFAULT" };

// Theme reducer
function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET_LOADING": {
      return { ...state, isLoading: action.payload };
    }

    case "SET_THEME": {
      const themeConfig = getThemeConfig(action.payload);
      if (!themeConfig) return state;

      return mergeThemeState(state, {
        currentTheme: action.payload,
        colorTheme: themeConfig.colorTheme,
        layoutTheme: themeConfig.layoutTheme,
        mode: themeConfig.mode,
        animationSpeed: themeConfig.animationSpeed,
        reducedMotion: themeConfig.reducedMotion,
        highContrast: themeConfig.highContrast,
      });
    }

    case "SET_MODE": {
      return mergeThemeState(state, { mode: action.payload });
    }

    case "SET_COLOR_THEME": {
      return { ...state, colorTheme: action.payload };
    }

    case "SET_LAYOUT_THEME": {
      return { ...state, layoutTheme: action.payload };
    }

    case "SET_ANIMATION_SPEED": {
      return { ...state, animationSpeed: action.payload };
    }

    case "SET_REDUCED_MOTION": {
      return { ...state, reducedMotion: action.payload };
    }

    case "SET_HIGH_CONTRAST": {
      return { ...state, highContrast: action.payload };
    }

    case "LOAD_STATE": {
      return mergeThemeState(state, action.payload);
    }

    case "RESET_TO_DEFAULT": {
      return createDefaultThemeState();
    }

    default: {
      return state;
    }
  }
}

// Context
const SkishopThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider props
interface SkishopThemeProviderProperties {
  children: ReactNode;
  storage?: ThemeStorage;
  enablePersistence?: boolean;
  onThemeChange?: (event: ThemeEvent) => void;
  initialTheme?: string;
}

/**
 * Enhanced Theme Provider for Skishop
 */
export function SkishopThemeProvider({
  children,
  storage = defaultThemeStorage,
  enablePersistence = true,
  onThemeChange,
  initialTheme,
}: SkishopThemeProviderProperties) {
  // Initialize state
  const [state, dispatch] = useReducer(themeReducer, createDefaultThemeState());

  // Next.js theme integration
  const { theme, setTheme: setNextTheme } = useTheme();

  // Load persisted state on mount
  useEffect(() => {
    if (!enablePersistence) return;

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const persistedState = loadThemeState(storage);
      const stateToLoad = initialTheme ? { ...persistedState, currentTheme: initialTheme } : persistedState;

      if (Object.keys(stateToLoad).length > 0) {
        dispatch({ type: "LOAD_STATE", payload: stateToLoad });
      }
    } catch (error) {
      console.warn("Failed to load theme state:", error);
    }

    dispatch({ type: "SET_LOADING", payload: false });
  }, [enablePersistence, storage, initialTheme]);

  // Save state to storage when it changes
  useEffect(() => {
    if (!enablePersistence || state.isLoading) return;

    try {
      saveThemeState(state, storage);
    } catch (error) {
      console.warn("Failed to save theme state:", error);
    }
  }, [state, enablePersistence, storage]);

  // Apply theme when state changes
  useEffect(() => {
    if (state.isLoading) return;

    const themeConfig = getThemeConfig(state.currentTheme);
    if (!themeConfig) return;

    // Update theme configuration with current state overrides
    const updatedConfig: ThemeConfig = {
      ...themeConfig,
      mode: state.mode,
      animationSpeed: state.animationSpeed,
      reducedMotion: state.reducedMotion,
      highContrast: state.highContrast,
      colorTheme: state.colorTheme,
      layoutTheme: state.layoutTheme,
    };

    // Apply theme to document
    const result = applyTheme(updatedConfig, state.mode);

    if (!result.success) {
      console.error("Failed to apply theme:", result.errors);
    }

    // Update next-themes
    const actualMode = state.mode === "system" ? "system" : state.mode;
    if (theme !== actualMode) {
      setNextTheme(actualMode);
    }
  }, [state, theme, setNextTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!state.isSystemMode) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      // Re-apply theme when system preference changes
      const themeConfig = getThemeConfig(state.currentTheme);
      if (themeConfig) {
        applyTheme(themeConfig, "system");
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [state.isSystemMode, state.currentTheme]);

  // Listen for system accessibility preferences
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrastQuery = window.matchMedia("(prefers-contrast: high)");

    const handleMotionChange = () => {
      if (state.reducedMotion !== motionQuery.matches) {
        dispatch({ type: "SET_REDUCED_MOTION", payload: motionQuery.matches });
      }
    };

    const handleContrastChange = () => {
      if (state.highContrast !== contrastQuery.matches) {
        dispatch({ type: "SET_HIGH_CONTRAST", payload: contrastQuery.matches });
      }
    };

    motionQuery.addListener(handleMotionChange);
    contrastQuery.addListener(handleContrastChange);

    return () => {
      motionQuery.removeListener(handleMotionChange);
      contrastQuery.removeListener(handleContrastChange);
    };
  }, [state.reducedMotion, state.highContrast]);

  // Theme management functions
  const setTheme = useCallback(
    (themeId: string) => {
      const previousState = { ...state };
      dispatch({ type: "SET_THEME", payload: themeId });

      if (onThemeChange) {
        onThemeChange({
          type: "theme-change",
          previous: previousState,
          current: { ...state, currentTheme: themeId },
          timestamp: Date.now(),
        });
      }
    },
    [state, onThemeChange],
  );

  const setMode = useCallback(
    (mode: ThemeMode) => {
      const previousMode = state.mode;
      dispatch({ type: "SET_MODE", payload: mode });

      if (onThemeChange) {
        onThemeChange({
          type: "mode-change",
          previous: previousMode,
          current: mode,
          timestamp: Date.now(),
        });
      }
    },
    [state.mode, onThemeChange],
  );

  const setColorTheme = useCallback((colorThemeId: string) => {
    dispatch({ type: "SET_COLOR_THEME", payload: colorThemeId });
  }, []);

  const setLayoutTheme = useCallback((layoutThemeId: string) => {
    dispatch({ type: "SET_LAYOUT_THEME", payload: layoutThemeId });
  }, []);

  const setAnimationSpeed = useCallback((speed: AnimationSpeed) => {
    dispatch({ type: "SET_ANIMATION_SPEED", payload: speed });
  }, []);

  const setReducedMotion = useCallback((enabled: boolean) => {
    dispatch({ type: "SET_REDUCED_MOTION", payload: enabled });
  }, []);

  const setHighContrast = useCallback((enabled: boolean) => {
    dispatch({ type: "SET_HIGH_CONTRAST", payload: enabled });
  }, []);

  // Utility functions
  const getCurrentThemeConfig = useCallback(
    (themeId?: string) => {
      return getThemeConfig(themeId || state.currentTheme);
    },
    [state.currentTheme],
  );

  const getCurrentColorTheme = useCallback(
    (colorThemeId?: string) => {
      return getColorTheme(colorThemeId || state.colorTheme);
    },
    [state.colorTheme],
  );

  const getCurrentLayoutTheme = useCallback(
    (layoutThemeId?: string) => {
      return getLayoutTheme(layoutThemeId || state.layoutTheme);
    },
    [state.layoutTheme],
  );

  const exportTheme = useCallback(() => {
    const themeConfig = getCurrentThemeConfig();
    if (!themeConfig) {
      throw new Error("No theme configuration found");
    }
    return exportThemeConfig(themeConfig);
  }, [getCurrentThemeConfig]);

  const importTheme = useCallback(
    (themeData: string) => {
      try {
        const themeConfig = importThemeConfig(themeData);
        setTheme(themeConfig.id);
        return true;
      } catch (error) {
        console.error("Failed to import theme:", error);
        return false;
      }
    },
    [setTheme],
  );

  const resetToDefault = useCallback(() => {
    dispatch({ type: "RESET_TO_DEFAULT" });
  }, []);

  // Context value
  const contextValue = useMemo<ThemeContextType>(
    () => ({
      state,
      setTheme,
      setMode,
      setColorTheme,
      setLayoutTheme,
      setAnimationSpeed,
      setReducedMotion,
      setHighContrast,
      getThemeConfig: getCurrentThemeConfig,
      getColorTheme: getCurrentColorTheme,
      getLayoutTheme: getCurrentLayoutTheme,
      exportTheme,
      importTheme,
      resetToDefault,
    }),
    [
      state,
      setTheme,
      setMode,
      setColorTheme,
      setLayoutTheme,
      setAnimationSpeed,
      setReducedMotion,
      setHighContrast,
      getCurrentThemeConfig,
      getCurrentColorTheme,
      getCurrentLayoutTheme,
      exportTheme,
      importTheme,
      resetToDefault,
    ],
  );

  return <SkishopThemeContext.Provider value={contextValue}>{children}</SkishopThemeContext.Provider>;
}

/**
 * Hook to use the Skishop theme context
 */
export function useSkishopTheme(): ThemeContextType {
  const context = useContext(SkishopThemeContext);

  if (context === undefined) {
    throw new Error("useSkishopTheme must be used within a SkishopThemeProvider");
  }

  return context;
}

/**
 * Legacy hook for backward compatibility
 * @deprecated Use useSkishopTheme instead
 */
export function useThemeConfig(): Pick<ThemeContextType, "state" | "setTheme"> & {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
} {
  const { state, setTheme } = useSkishopTheme();

  return {
    state,
    setTheme,
    activeTheme: state.currentTheme,
    setActiveTheme: setTheme,
  };
}
