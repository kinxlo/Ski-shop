"use client";

import type { CSSProperties } from "react";
import { PiCheckCircleBold, PiInfoBold, PiWarningBold, PiXCircleBold } from "react-icons/pi";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Skishop Toaster
 * - Uses design tokens via CSS variables (light/dark ready)
 * - UX best practices:
 *   • Non-blocking placement (top-right), visibleToasts capped to 3
 *   • Sensible default duration (3500ms), close button, expand stacking
 *   • Pause when page hidden (avoid missed info)
 *   • Responsive width (min(90vw, 400px))
 *   • Accessible typography and clear visual hierarchy
 */
const Toaster = ({ ...properties }: ToasterProps) => {
  return (
    <Sonner
      theme={"system"}
      richColors
      position="top-right"
      expand
      closeButton
      visibleToasts={3}
      duration={3500}
      offset={16}
      pauseWhenPageIsHidden
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "skishop-toast",
          title: "skishop-toast-title",
          description: "skishop-toast-description",
          closeButton: "skishop-toast-close",
          actionButton: "skishop-toast-action",
          cancelButton: "skishop-toast-cancel",
        },
        duration: 3500,
      }}
      icons={{
        success: <PiCheckCircleBold style={{ color: "var(--success-text)" }} />,
        info: <PiInfoBold style={{ color: "var(--info-text)" }} />,
        warning: <PiWarningBold style={{ color: "var(--warning-text)" }} />,
        error: <PiXCircleBold style={{ color: "var(--error-text)" }} />,
      }}
      style={
        {
          // Base tokens mapped to design system
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",

          // Semantic tokens per type
          "--success-bg": "var(--low-success)",
          "--success-text": "var(--high-success)",
          "--success-border": "var(--mid-success)",

          "--error-bg": "var(--low-danger)",
          "--error-text": "var(--high-danger)",
          "--error-border": "var(--mid-danger)",

          "--warning-bg": "var(--low-warning)",
          "--warning-text": "var(--high-warning)",
          "--warning-border": "var(--mid-warning)",

          "--info-bg": "var(--low-blue)",
          "--info-text": "var(--high-blue)",
          "--info-border": "var(--mid-blue)",

          // Layout tokens
          "--width": "400px",
          "--border-radius": "var(--radius-lg)",
          "--font-size": "var(--font-size-sm)",
          "--z-index": "9999",
        } as CSSProperties
      }
      {...properties}
    />
  );
};

export { Toaster };
