/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getLocaleDirection, isRTL } from "@/lib/i18n/utils";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

interface LocaleProviderProperties {
  children: ReactNode;
  locale: string;
  messages: any;
}

export function LocaleProvider({ children, locale, messages }: LocaleProviderProperties) {
  const direction = getLocaleDirection(locale as any);
  const isRTLDirection = isRTL(locale as any);

  return (
    <html lang={locale} dir={direction}>
      <body className={isRTLDirection ? "rtl" : "ltr"}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
