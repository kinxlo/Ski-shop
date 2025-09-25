/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import SkiButton from "../button";

interface BackButtonProperties {
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "lg" | "icon" | "default" | "link" | "xl" | "circle" | string;
  variant?: "ghost" | "outline" | "primary" | "secondary";
  iconClassName?: string;
  ariaLabel?: string;
}

export const BackButton: React.FC<BackButtonProperties> = ({
  href,
  onClick,
  className = "",
  size = "icon",
  variant = "ghost",
  iconClassName = "h-6 w-6 text-gray-600",
  ariaLabel = "Go back",
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <SkiButton
      isIconOnly
      size={size as any}
      variant={variant}
      icon={<ChevronLeft className={iconClassName} />}
      onClick={handleBack}
      className={className}
      aria-label={ariaLabel}
    />
  );
};
