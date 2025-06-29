import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FilterDropdown = () => {
  return (
    <Select>
      <SelectTrigger className="w-[123px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="filter-1">Filter option</SelectItem>
        <SelectItem value="filter-2">Filter option</SelectItem>
        <SelectItem value="filter-3">Filter option</SelectItem>
        <SelectItem value="filter-4">Filter option</SelectItem>
      </SelectContent>
    </Select>
  );
};
