"use client";

import { currencies, Locale } from "@/lib/i18n/config";
import { createContext, useContext, useMemo } from "react";

// Types are now globally available in src/types/

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const currencyOptions = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
  { code: "SAR", symbol: "ر.س", name: "Saudi Riyal" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

export function CurrencyProvider({ children, locale = "en" }: { children: React.ReactNode; locale?: Locale }) {
  // Automatically determine currency based on locale
  const selectedCurrency = currencies[locale as Locale] || "USD";

  const contextValue = useMemo<CurrencyContextType>(
    () => ({
      selectedCurrency,
      availableCurrencies: currencyOptions,
    }),
    [selectedCurrency],
  );

  return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
