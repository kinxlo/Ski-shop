import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CurrencyDropdown = () => {
  return (
    <Select>
      <SelectTrigger className="w-[123px] border-none bg-white shadow-none">
        <SelectValue placeholder="NGN" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="NGN">NGN</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
      </SelectContent>
    </Select>
  );
};
