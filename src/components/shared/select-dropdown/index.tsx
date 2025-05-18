"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface CustomSelectProperties {
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
}

export function CustomSelect({
  options,
  placeholder = "Select an option",
  onChange,
  defaultValue,
}: CustomSelectProperties) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <Select
      value={value}
      onValueChange={(value_) => {
        setValue(value_);
        onChange?.(value_);
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
