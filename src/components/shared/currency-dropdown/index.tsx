/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { currencies } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/i18n/utils";
import { useLocale } from "next-intl";
import { useState } from "react";

interface CurrencyDropdownProperties {
  className?: string;
  onCurrencyChange?: (currency: string) => void;
}

export function CurrencyDropdown({ className, onCurrencyChange }: CurrencyDropdownProperties) {
  const locale = useLocale();
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[locale as keyof typeof currencies]);

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    onCurrencyChange?.(currency);
  };

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

  return (
    <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
      <SelectTrigger className={`w-[123px] border-none bg-white shadow-none ${className}`}>
        <SelectValue placeholder={selectedCurrency} />
      </SelectTrigger>
      <SelectContent>
        {currencyOptions.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{currency.symbol}</span>
              <span className="text-muted-foreground text-xs">{currency.code}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Example usage with price formatting
export function CurrencyDisplay({ amount, currency, locale }: { amount: number; currency?: string; locale?: string }) {
  const currentLocale = useLocale();
  const displayLocale = locale || currentLocale;
  const displayCurrency = currency || currencies[displayLocale as keyof typeof currencies];

  return <span className="font-medium">{formatCurrency(amount, displayLocale as any, displayCurrency)}</span>;
}
