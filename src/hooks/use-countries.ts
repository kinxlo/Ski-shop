import { countries } from "@/lib/constants";
import { useEffect, useMemo, useState } from "react";

interface Country {
  value: string;
  label: string;
}

interface UseCountriesOptions {
  searchTerm?: string;
  limit?: number;
  delay?: number;
}

export const useCountries = ({ searchTerm = "", limit = 20, delay = 300 }: UseCountriesOptions = {}) => {
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Memoize the filtered countries based on search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return countries.slice(0, limit);
    }

    return countries
      .filter((country) => country.label.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, limit);
  }, [searchTerm, limit]);

  // Simulate async loading with debouncing
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setFilteredCountries(searchResults);
      setHasMore(searchResults.length === limit && searchResults.length < countries.length);
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchResults, delay, limit]);

  // Load more countries (for pagination)
  const loadMore = () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    setTimeout(() => {
      const currentLength = filteredCountries.length;
      const newCountries = countries.slice(currentLength, currentLength + limit);

      setFilteredCountries((previous) => [...previous, ...newCountries]);
      setHasMore(currentLength + limit < countries.length);
      setIsLoading(false);
    }, delay);
  };

  return {
    countries: filteredCountries,
    isLoading,
    hasMore,
    loadMore,
    totalCount: countries.length,
  };
};
