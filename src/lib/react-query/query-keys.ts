export const queryKeys = {
  product: {
    list: (filters?: IFilters) => [
      "products",
      "list",
      filters?.page || 1,
      filters?.search || "",
      filters?.status || "",
      filters?.categories || "",
      filters?.vendor || "",
      filters?.sort || "",
      filters?.limit || 10,
      filters?.flag || "", // Add flag parameter to query key
    ],
    details: (id: string) => ["products", "details", id] as const,
    categories: () => ["products", "categories"] as const,
    saved: () => ["products", "saved"] as const,
  },
  cart: {
    list: () => ["cart"] as const,
    item: (id: string) => ["cart", "item", id] as const,
  },
  user: {
    list: (filters?: IFilters) => ["user", "list", ...(filters ? Object.entries(filters) : [])],
    profile: () => ["user", "profile"] as const,
    details: (id: string) => ["user", "details", id] as const,
  },
  dashboard: {
    overview: () => ["dashboard", "overview"] as const,
    products: {
      list: (filters?: IFilters) => [
        "dashboard",
        "products",
        "list",
        filters?.page || 1,
        filters?.search || "",
        filters?.status || "",
        filters?.sort || "",
        filters?.limit || 10,
      ],
      details: (id: string) => ["dashboard", "products", "details", id] as const,
    },
  },

  order: {
    list: () => ["order", "list"] as const,
    details: (id: string) => ["order", "details", id] as const,
  },
};
