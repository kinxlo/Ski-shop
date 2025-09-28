import { currencies, dateFormats, Locale, numberFormats } from "./config";

/**
 * Format currency based on locale
 */
export function formatCurrency(amount: number, locale: Locale = "ng", currency?: string): string {
  const currencyCode = currency || currencies[locale];

  // Map locales to BCP-47 tags for formatting
  const formattingLocale = locale === "ng" ? "en-NG" : locale === "yo" ? "yo-NG" : locale === "ig" ? "ig-NG" : "ha-NG";

  return new Intl.NumberFormat(formattingLocale, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date based on locale
 */
export function formatDate(date: Date | string, locale: Locale = "ng", options?: Intl.DateTimeFormatOptions): string {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  const formatOptions = options || dateFormats[locale];

  // Map locales to BCP-47 tags for formatting
  const formattingLocale = locale === "ng" ? "en-NG" : locale === "yo" ? "yo-NG" : locale === "ig" ? "ig-NG" : "ha-NG";

  return new Intl.DateTimeFormat(formattingLocale, formatOptions).format(dateObject);
}

/**
 * Format number based on locale
 */
export function formatNumber(number: number, locale: Locale = "ng", options?: Intl.NumberFormatOptions): string {
  const formatOptions = options || numberFormats[locale];

  // Map locales to BCP-47 tags for formatting
  const formattingLocale = locale === "ng" ? "en-NG" : locale === "yo" ? "yo-NG" : locale === "ig" ? "ig-NG" : "ha-NG";

  return new Intl.NumberFormat(formattingLocale, formatOptions).format(number);
}

/**
 * Check if locale is RTL
 */
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
export function isRTL(locale: Locale): boolean {
  return false;
}

/**
 * Get locale direction
 */
export function getLocaleDirection(locale: Locale): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}

/**
 * Validate if a string is a valid locale
 */
export function isValidLocale(locale: string): locale is Locale {
  return ["ng", "yo", "ig", "ha"].includes(locale);
}

export const formatTime = (date: Date | string, locale: Locale = "ng", options?: Intl.DateTimeFormatOptions) => {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  const formatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    ...options,
  };

  // Map locales to BCP-47 tags for formatting
  const formattingLocale = locale === "ng" ? "en-NG" : locale === "yo" ? "yo-NG" : locale === "ig" ? "ig-NG" : "ha-NG";

  return new Intl.DateTimeFormat(formattingLocale, formatOptions).format(dateObject);
};
