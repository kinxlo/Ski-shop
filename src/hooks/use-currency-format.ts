import type { Locale } from "@/lib/i18n/config";
import { formatCurrency } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useCallback, useMemo } from "react";

/**
 * Custom hook for formatting currency with the current locale
 */
export function useCurrencyFormat() {
  const locale = useLocale() as Locale;

  const formatCurrencyWithLocale = useCallback(
    (
      amount: number,
      options: {
        currency?: string;
        locale?: string;
        minimumFractionDigits?: number;
        maximumFractionDigits?: number;
      } = {},
    ) => {
      return formatCurrency(amount, options, locale);
    },
    [locale],
  );

  const contextValue = useMemo(
    () => ({
      formatCurrency: formatCurrencyWithLocale,
      currentLocale: locale,
    }),
    [formatCurrencyWithLocale, locale],
  );

  return contextValue;
}
