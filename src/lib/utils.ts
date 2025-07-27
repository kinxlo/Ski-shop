import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const formatCategory = (string_: string) => {
  // Insert space before capital letters and capitalize first letter
  return string_
    .replaceAll(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (firstChar: string) => firstChar.toUpperCase()) // Capitalize first letter
    .replaceAll(/\bTv\b/g, "TV"); // Special case for TV abbreviation
};

/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param options - Optional formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  options: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {},
): string {
  const { currency = "NGN", locale = "en-NG", minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}
