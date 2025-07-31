import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterDropdownProperties {
  value: string;
  onValueChange: (value: string) => void;
}

export const FilterDropdown = ({ value, onValueChange }: FilterDropdownProperties) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[123px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="failed">Failed</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>
  );
};
