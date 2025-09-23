import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCategory = (string_: string) => {
  // Insert space before capital letters and capitalize first letter
  return string_
    .replaceAll(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (firstChar: string) => firstChar.toUpperCase()) // Capitalize first letter
    .replaceAll(/\bTv\b/g, "TV"); // Special case for TV abbreviation
};

// Convert category to API format (camelCase for multi-word, lowercase for single word)
export const toCamelCase = (string_: string) => {
  const words = string_.toLowerCase().split(/\W+/).filter(Boolean);
  if (words.length <= 1) return words[0] || "";
  return (
    words[0] +
    words
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
  );
};
