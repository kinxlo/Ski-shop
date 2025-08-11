/* eslint-disable no-console */
/**
 * Enhanced Theme Selector for Skishop
 * Provides comprehensive theme customization with visual previews
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { COLOR_THEMES, LAYOUT_THEMES, THEME_CATEGORIES, THEME_CONFIGS } from "@/lib/theme/config";
import { useSkishopTheme } from "@/lib/theme/context";
import { AnimationSpeed, ThemeMode } from "@/lib/theme/types";
import { cn } from "@/lib/utils";
// Removed framer-motion dependency
import {
  Check,
  Download,
  Eye,
  EyeOff,
  Layout,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Settings,
  Sparkles,
  Sun,
  Upload,
  Zap,
  ZapOff,
} from "lucide-react";
import React, { useState } from "react";

import SkiButton from "../shared/button";

// Theme preview component
export function ThemePreview({
  themeId,
  isSelected,
  onClick,
}: {
  themeId: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const themeConfig = THEME_CONFIGS.find((t) => t.id === themeId);
  const colorTheme = COLOR_THEMES.find((c) => c.id === themeConfig?.colorTheme);

  if (!themeConfig || !colorTheme) return null;

  return (
    <div
      className={`relative cursor-pointer rounded-lg border-2 p-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${
        isSelected ? "border-primary ring-primary/20 ring-2" : "border-border hover:border-primary/50"
      } `}
      onClick={onClick}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full">
            <Check className="h-3 w-3" />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: colorTheme.primary.light }} />
          <h4 className="text-sm font-medium">{themeConfig.name}</h4>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <div className="h-3 rounded" style={{ backgroundColor: colorTheme.primary.light }} />
          <div
            className="h-3 rounded"
            style={{ backgroundColor: colorTheme.accent?.light || colorTheme.primary.light }}
          />
          <div className="bg-muted h-3 rounded" />
        </div>

        <p className="text-muted-foreground line-clamp-2 text-xs">{themeConfig.description}</p>

        <div className="flex flex-wrap gap-1">
          {themeConfig.mode === "system" && (
            <Badge variant="secondary" className="text-xs">
              Auto
            </Badge>
          )}
          {themeConfig.reducedMotion && (
            <Badge variant="outline" className="text-xs">
              A11y
            </Badge>
          )}
          {themeConfig.highContrast && (
            <Badge variant="outline" className="text-xs">
              HC
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// Quick toggle component
function QuickToggle({
  icon: Icon,
  label,
  value,
  onChange,
  tooltip,
}: {
  icon: React.ElementType;
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  tooltip: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip content={tooltip}>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Switch id={`toggle-${label.toLowerCase().replace(" ", "-")}`} checked={value} onCheckedChange={onChange} />
            <Label
              htmlFor={`toggle-${label.toLowerCase().replace(" ", "-")}`}
              className="flex cursor-pointer items-center gap-2 text-sm font-medium"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Mode selector component
function ModeSelector({ value, onChange }: { value: ThemeMode; onChange: (mode: ThemeMode) => void }) {
  const modes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {modes.map(({ value: modeValue, icon: Icon, label }) => (
        <Button
          key={modeValue}
          variant={value === modeValue ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(modeValue)}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
}

// Quick theme selector dropdown component
export function QuickThemeSelector() {
  const { state, setTheme } = useSkishopTheme();
  // Group themes by category
  const categorizedThemes = {
    popular: THEME_CATEGORIES.popular.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
    seasonal: THEME_CATEGORIES.seasonal.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
    accessibility: THEME_CATEGORIES.accessibility.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
    professional: THEME_CATEGORIES.professional.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
  };

  return (
    <Select value={state.currentTheme} onValueChange={setTheme}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <SelectValue placeholder="Select theme..." />
        </div>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(categorizedThemes).map(([category, themes]) => (
          <div key={category}>
            <div className="text-muted-foreground px-2 py-1.5 text-sm font-semibold capitalize">{category}</div>
            {themes.map((theme) => (
              <SelectItem key={theme?.id} value={theme?.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: COLOR_THEMES?.find((c) => c.id === theme?.colorTheme)?.primary.light,
                    }}
                  />
                  {theme?.name}
                </div>
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  );
}

// Mode toggle buttons component
export function ModeToggleButtons() {
  const { state, setMode } = useSkishopTheme();

  return (
    <div className="flex w-full rounded-md border">
      {[
        { mode: "light" as const, icon: Sun },
        { mode: "dark" as const, icon: Moon },
        { mode: "system" as const, icon: Monitor },
      ].map(({ mode, icon: Icon }) => (
        <SkiButton
          key={mode}
          variant={"ghost"}
          size="icon"
          onClick={() => setMode(mode)}
          className="w-full rounded-none first:rounded-l-md last:rounded-r-md"
        >
          <Icon className={cn("h-4 w-4", state.mode === mode && "text-accent")} />
        </SkiButton>
      ))}
    </div>
  );
}

// Themes tab content component
export function ThemesTab() {
  const { state, setTheme } = useSkishopTheme();
  const categorizedThemes = {
    popular: THEME_CATEGORIES.popular.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
    seasonal: THEME_CATEGORIES.seasonal.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
    accessibility: THEME_CATEGORIES.accessibility.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
    professional: THEME_CATEGORIES.professional.map((id) => THEME_CONFIGS.find((t) => t.id === id)!),
  };

  return (
    <TabsContent value="themes" className="space-y-4">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Popular Themes</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {categorizedThemes.popular.map((theme) => (
              <ThemePreview
                key={theme?.id}
                themeId={theme?.id}
                isSelected={state.currentTheme === theme?.id}
                onClick={() => setTheme(theme?.id)}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-lg font-semibold">Seasonal Themes</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {categorizedThemes.seasonal.map((theme) => (
              <ThemePreview
                key={theme?.id}
                themeId={theme?.id}
                isSelected={state.currentTheme === theme?.id}
                onClick={() => setTheme(theme?.id)}
              />
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-lg font-semibold">Professional & Accessibility</h3>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[...categorizedThemes.professional, ...categorizedThemes.accessibility]
              .filter((theme, index, array) => array.findIndex((t) => t.id === theme.id) === index)
              .map((theme) => (
                <ThemePreview
                  key={theme?.id}
                  themeId={theme?.id}
                  isSelected={state.currentTheme === theme?.id}
                  onClick={() => setTheme(theme?.id)}
                />
              ))}
          </div>
        </div>
      </div>
    </TabsContent>
  );
}

// Colors tab content component
export function ColorsTab() {
  const { state, setColorTheme } = useSkishopTheme();

  return (
    <TabsContent value="colors" className="space-y-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Color Themes</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {COLOR_THEMES.map((colorTheme) => (
            <Card
              key={colorTheme?.id}
              className={`cursor-pointer transition-all ${
                state.colorTheme === colorTheme.id ? "ring-primary ring-2" : "hover:shadow-md"
              }`}
              onClick={() => setColorTheme(colorTheme?.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <div className="h-4 w-4 rounded-full" style={{ backgroundColor: colorTheme.primary.light }} />
                  {colorTheme?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">{colorTheme?.description}</p>
                <div className="flex gap-2">
                  <div className="h-8 w-full rounded" style={{ backgroundColor: colorTheme.primary.light }} />
                  <div className="h-8 w-full rounded" style={{ backgroundColor: colorTheme.primary.dark }} />
                  {colorTheme?.accent && (
                    <>
                      <div className="h-8 w-full rounded" style={{ backgroundColor: colorTheme?.accent?.light }} />
                      <div className="h-8 w-full rounded" style={{ backgroundColor: colorTheme?.accent?.dark }} />
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TabsContent>
  );
}

// Layout tab content component
export function LayoutTab() {
  const { state, setLayoutTheme, setAnimationSpeed } = useSkishopTheme();

  return (
    <TabsContent value="layout" className="space-y-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Layout Options</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {LAYOUT_THEMES.map((layoutTheme) => (
            <Card
              key={layoutTheme?.id}
              className={`cursor-pointer transition-all ${
                state.layoutTheme === layoutTheme?.id ? "ring-primary ring-2" : "hover:shadow-md"
              }`}
              onClick={() => setLayoutTheme(layoutTheme?.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layout className="h-4 w-4" />
                  {layoutTheme?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 text-sm">{layoutTheme?.description}</p>
                <div className="space-y-2 text-xs">
                  <div>Scale: {layoutTheme?.spacing}x</div>
                  <div>Font: {layoutTheme?.fontFamily}</div>
                  <div>Radius: {layoutTheme?.borderRadius}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-semibold">Animation Speed</h3>
        <Select value={state.animationSpeed} onValueChange={(value: AnimationSpeed) => setAnimationSpeed(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="slow">Slow</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="fast">Fast</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TabsContent>
  );
}

// Accessibility tab content component
export function AccessibilityTab() {
  const { state, setMode, setReducedMotion, setHighContrast } = useSkishopTheme();

  return (
    <TabsContent value="accessibility" className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Accessibility Options</h3>

        <QuickToggle
          icon={state.reducedMotion ? ZapOff : Zap}
          label="Reduced Motion"
          value={state.reducedMotion}
          onChange={setReducedMotion}
          tooltip="Reduces animations and transitions for better accessibility"
        />

        <QuickToggle
          icon={state.highContrast ? Eye : EyeOff}
          label="High Contrast"
          value={state.highContrast}
          onChange={setHighContrast}
          tooltip="Increases color contrast for better visibility"
        />
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-semibold">Display Mode</h3>
        <ModeSelector value={state.mode} onChange={setMode} />
      </div>
    </TabsContent>
  );
}

// Theme actions component
function ThemeActions({ onClose }: { onClose: () => void }) {
  const { exportTheme, importTheme, resetToDefault } = useSkishopTheme();

  const handleExportTheme = async () => {
    try {
      const themeData = exportTheme();
      await navigator.clipboard.writeText(themeData);
      // Could add toast notification here
    } catch (error) {
      console.error("Failed to export theme:", error);
    }
  };

  const handleImportTheme = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const success = importTheme(text);
      if (!success) {
        // Could add error toast here
      }
    } catch (error) {
      console.error("Failed to import theme:", error);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleExportTheme}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" size="sm" onClick={handleImportTheme}>
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={resetToDefault}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button size="sm" onClick={onClose}>
          Done
        </Button>
      </div>
    </div>
  );
}

// Advanced theme dialog component
function AdvancedThemeDialog({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [activeTab, setActiveTab] = useState("themes");

  return (
    <>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] !min-w-7xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Skishop Theme Customization
          </DialogTitle>
          <DialogDescription>
            Customize your Skishop experience with themes, layouts, and accessibility options.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <ThemesTab />
            <ColorsTab />
            <LayoutTab />
            <AccessibilityTab />
          </div>

          <Separator className="my-4" />

          <ThemeActions onClose={() => onOpenChange(false)} />
        </Tabs>
      </DialogContent>
    </>
  );
}

// Main enhanced theme selector component
export function EnhancedThemeSelector() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  return (
    <Dialog open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
      <div className="flex w-full flex-col gap-2">
        <QuickThemeSelector />
        <ModeToggleButtons />
        <AdvancedThemeDialog onOpenChange={setIsAdvancedOpen} />
      </div>
    </Dialog>
  );
}
