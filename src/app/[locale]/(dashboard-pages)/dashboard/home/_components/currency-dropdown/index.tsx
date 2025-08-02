import { Badge } from "@/components/ui/badge";
import { currencies } from "@/lib/i18n/config";
import { useLocale } from "next-intl";

export const CurrencyDropdown = () => {
  const locale = useLocale();
  const currency = currencies[locale as keyof typeof currencies];
  return <Badge className="text-primary border-border border bg-white font-bold">{currency}</Badge>;
};
