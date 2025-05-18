"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

type SelectorProperties = {
  categories: string[];
  selected?: string;
  onChange?: (value: string) => void;
  title: string;
};

export const OptionsSelector = ({ categories, selected, onChange, title }: SelectorProperties) => {
  const [value, setValue] = useState(selected ?? categories[0]);

  const handleChange = (value_: string) => {
    setValue(value_);
    onChange?.(value_);
  };

  return (
    <div className="space-y-4">
      <h6 className="font-semibold uppercase">{title}</h6>
      <RadioGroup value={value} onValueChange={handleChange} className="flex flex-col gap-3">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center space-x-2">
            <RadioGroupItem value={cat} id={cat} />
            <Label htmlFor={cat} className="text-mid-grey-II">
              {cat}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
