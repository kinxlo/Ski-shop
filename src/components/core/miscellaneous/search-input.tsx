"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface SearchInputProperties {
  placeholder?: string;
  onSearch: (query: string) => void;
  delay?: number; // debounce delay in ms
  className?: string;
  initialValue?: string;
}

export const SearchInput = ({
  placeholder = "Search...",
  onSearch,
  delay = 300,
  className = "",
  initialValue = "",
}: SearchInputProperties) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery] = useDebounce(searchQuery, delay);

  // Update internal state when initialValue changes (for URL sync)
  useEffect(() => {
    setSearchQuery(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className={`relative w-fit`}>
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input
        type="search"
        placeholder={placeholder}
        className={cn("rounded-sm border border-black/10 pr-4 pl-10 shadow-none", className)}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
    </div>
  );
};
