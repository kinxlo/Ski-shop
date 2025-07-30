"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCategory } from "@/lib/utils";

type SelectorProperties = {
  categories: string[];
  value?: string;
  onChange?: (value: string) => void;
  title: string;
};

export const OptionsSelector = ({ categories, value, onChange, title }: SelectorProperties) => {
  return (
    <div className="space-y-4">
      <h6 className="font-semibold uppercase">{title}</h6>
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-col gap-3">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center space-x-2">
            <RadioGroupItem value={cat} id={cat} />
            <Label htmlFor={cat} className="text-mid-grey-II">
              {formatCategory(cat)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
