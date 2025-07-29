export const queryKeys = {
  product: {
    list: (filters?: IFilters) => ["products", "list", ...(filters ? Object.entries(filters) : [])],
    details: (id: string) => ["products", "details", id] as const,
    categories: () => ["products", "categories"] as const,
  },
  cart: {
    list: () => ["cart"] as const,
    item: (id: string) => ["cart", "item", id] as const,
  },
  user: {
    list: () => ["user", "list"] as const,
  },
  dashboard: {
    overview: () => ["dashboard", "overview"] as const,
  },

  order: {
    list: () => ["order", "list"] as const,
    details: (id: string) => ["order", "details", id] as const,
  },
};
