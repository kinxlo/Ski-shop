"use client";

import { generateBlurDataURL } from "@/lib/image-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState, type ComponentProps } from "react";

export function BlurImage(properties: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>(properties.blurDataURL);

  const source = properties.src as string;
  const isSVG = source?.endsWith(".svg");

  useEffect(() => {
    if (!properties.blurDataURL && source && !isSVG) {
      generateBlurDataURL(source).then(setBlurDataURL);
    }
  }, [properties.blurDataURL, source, isSVG]);

  return (
    <Image
      {...properties}
      alt={properties.alt}
      placeholder={blurDataURL ? "blur" : undefined}
      blurDataURL={blurDataURL}
      className={cn(
        "duration-700 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "blur-0 scale-100",
        properties.className,
      )}
      onLoad={() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }}
    />
  );
}
