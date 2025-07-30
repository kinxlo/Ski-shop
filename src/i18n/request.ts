import { getRequestConfig } from "next-intl/server";

import { locales } from "../lib/i18n/config";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) locale = "en";

  const messagesModule = await import(`../messages/${locale}.json`);
  const messages = messagesModule.default;

  return {
    locale: locale as string,
    messages,
  };
});
