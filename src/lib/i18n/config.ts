export const locales = ["en", "fr", "es", "ar", "ng"] as const;
export const defaultLocale = "ng" as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  ar: "العربية",
  ng: "English (Nigeria)",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  fr: "🇫🇷",
  es: "🇪🇸",
  ar: "🇸🇦",
  ng: "🇳🇬",
};

export const currencies: Record<Locale, string> = {
  en: "USD",
  fr: "EUR",
  es: "EUR",
  ar: "SAR",
  ng: "NGN",
};

export const dateFormats: Record<Locale, Intl.DateTimeFormatOptions> = {
  en: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  fr: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  es: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  ar: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  ng: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
};

export const numberFormats: Record<Locale, Intl.NumberFormatOptions> = {
  en: {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  fr: {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  es: {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  ar: {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  ng: {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
};
