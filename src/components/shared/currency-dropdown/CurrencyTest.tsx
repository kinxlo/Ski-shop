"use client";

import { useCurrencyFormat } from "@/hooks/use-currency-format";
import { useLocale } from "next-intl";
import { memo } from "react";

export const CurrencyTest = memo(function CurrencyTest() {
  const { formatCurrency, selectedCurrency } = useCurrencyFormat();
  const locale = useLocale();

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-2 text-lg font-semibold">Currency Test</h3>
      <p>Current Locale: {locale}</p>
      <p>Auto-selected Currency: {selectedCurrency}</p>
      <p>Sample Amount: {formatCurrency(1234.56)}</p>
      <p>Large Amount: {formatCurrency(999_999.99)}</p>
      <p className="mt-2 text-sm text-gray-600">
        Currency is automatically determined by the current locale/language setting
      </p>
    </div>
  );
});
