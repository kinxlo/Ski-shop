"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...properties }: ToasterProps) => {
  return (
    <Sonner
      theme={"light"}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...properties}
    />
  );
};

export { Toaster };
