"use client";

import { parseAsInteger, parseAsString, parseAsStringEnum, useQueryState } from "nuqs";

export const useDashboardSearchParameters = () => {
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [perPage, setPerPage] = useQueryState("perPage", parseAsInteger.withDefault(10));
  const [search, setSearch] = useQueryState("search", parseAsString);
  const [status, setStatus] = useQueryState(
    "status",
    parseAsStringEnum(["all", "published", "draft"]).withDefault("all"),
  );

  return {
    // Current values
    page: page ? Number.parseInt(page) : 1,
    perPage: (perPage as number) ?? 10,
    search: (search as string) ?? "",
    status: (status as string) ?? "all",

    // Setters
    setPage,
    setPerPage,
    setSearch: (value: string | null) => {
      // Remove search parameter if value is empty
      if (!value || value.trim() === "") {
        setSearch(null);
      } else {
        setSearch(value);
      }
    },
    setStatus,

    // Utility functions
    resetFilters: () => {
      setSearch(null);
      setStatus(null);
      setPage(null);
    },

    resetToFirstPage: () => {
      setPage(null);
    },
  };
};
