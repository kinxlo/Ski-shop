"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCategory } from "@/lib/utils";

// import { useTranslations } from "next-intl";

type SelectorProperties = {
  categories: (string | { value: string; label: string })[];
  value?: string;
  onChange?: (value: string) => void;
  title: string;
};

export const OptionsSelector = ({ categories, value, onChange, title }: SelectorProperties) => {
  // const t = useTranslations("shopPage.filters");

  return (
    <div className="space-y-4 lg:space-y-6">
      <h6 className="text-sm !font-bold uppercase lg:text-base">{title}</h6>
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-3 lg:gap-4">
        {categories.map((cat) => {
          const isObject = typeof cat === "object";
          const catValue = isObject ? cat.value : cat;
          const catLabel = isObject ? cat.label : formatCategory(cat);

          return (
            <div key={catValue} className="flex items-center space-x-2 lg:space-x-3">
              <RadioGroupItem value={catValue} id={catValue} />
              <Label htmlFor={catValue} className="text-mid-grey-II text-xs lg:text-sm">
                {catLabel}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
