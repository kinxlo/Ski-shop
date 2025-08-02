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
