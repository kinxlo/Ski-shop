"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, type ComponentProps } from "react";

const DEFAULT_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/vAA=";

export function BlurImage(properties: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);

  const source = properties.src as string | undefined;
  const isSVG = typeof source === "string" && source.endsWith(".svg");

  // Avoid client-side fetching to compute blur placeholders.
  // If a blurDataURL is provided, use it; otherwise use a tiny default placeholder for non-SVGs.
  const computedBlur: string | undefined = properties.blurDataURL ?? (isSVG ? undefined : DEFAULT_PLACEHOLDER);
  return (
    <Image
      {...properties}
      alt={properties.alt}
      placeholder={computedBlur ? "blur" : undefined}
      blurDataURL={computedBlur}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "blur-0 scale-100",
        properties.className,
      )}
      onLoad={() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }}
    />
  );
}
