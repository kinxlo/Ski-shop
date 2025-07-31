"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface AsyncSelectProperties {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Option[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSearch?: (searchTerm: string) => void;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

export const AsyncSelect = ({
  value,
  onValueChange,
  placeholder = "Select an option",
  options,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  onSearch,
  searchPlaceholder = "Search...",
  className,
  disabled = false,
}: AsyncSelectProperties) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const observerReference = useRef<HTMLDivElement>(null);

  // Update selected label when value changes
  useEffect(() => {
    if (value) {
      const selectedOption = options.find((option) => option.value === value);
      setSelectedLabel(selectedOption?.label || "");
    } else {
      setSelectedLabel("");
    }
  }, [value, options]);

  // Handle search with debouncing
  useEffect(() => {
    if (!onSearch) return;

    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!observerReference.current || !onLoadMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerReference.current);

    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoading]);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <Select open={isOpen} onOpenChange={setIsOpen} value={value} onValueChange={handleSelect}>
      <SelectTrigger className={cn("h-14 w-full bg-white shadow-none", className)} disabled={disabled}>
        <SelectValue placeholder={placeholder}>{selectedLabel || placeholder}</SelectValue>
        {/* <ChevronDown className="h-4 w-4 opacity-50" /> */}
      </SelectTrigger>

      <SelectContent className="max-h-80">
        {onSearch && (
          <div className="border-b p-2">
            <div className="relative">
              <Search className="absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-9 pl-8"
                onClick={(event) => event.stopPropagation()}
              />
            </div>
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          {options.length === 0 && !isLoading && <div className="p-4 text-center text-gray-500">No options found</div>}

          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className="cursor-pointer">
              {option.label}
            </SelectItem>
          ))}

          {isLoading && (
            <div className="p-4 text-center">
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          )}

          {hasMore && !isLoading && (
            <div ref={observerReference} className="p-2 text-center">
              <Button variant="ghost" size="sm" onClick={onLoadMore} className="text-xs">
                Load more
              </Button>
            </div>
          )}
        </div>
      </SelectContent>
    </Select>
  );
};
