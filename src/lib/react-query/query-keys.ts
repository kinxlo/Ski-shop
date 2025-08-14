export const queryKeys = {
  product: {
    list: (filters?: Filters) => [
      "products",
      "list",
      filters?.page || 1,
      filters?.search || "",
      filters?.status || "",
      filters?.categories || "",
      filters?.storeId || "",
      filters?.sort || "",
      filters?.limit || 10,
      filters?.flag || "", // Add flag parameter to query key
    ],
    details: (id: string) => ["products", "details", id] as const,
    categories: () => ["products", "categories"] as const,
    saved: () => ["products", "saved"] as const,
  },
  review: {
    list: () => ["review", "list"] as const,
    details: (productId: string) => ["review", "details", productId] as const,
  },
  cart: {
    list: () => ["cart"] as const,
    item: (id: string) => ["cart", "item", id] as const,
  },
  vendor: {
    top: () => ["vendor", "top"] as const,
  },
  user: {
    list: (filters?: Filters) => ["user", "list", ...(filters ? Object.entries(filters) : [])],
    profile: () => ["user", "profile"] as const,
    details: (id: string) => ["user", "details", id] as const,
  },
  order: {
    list: () => ["order", "list"] as const,
    details: (id: string) => ["order", "details", id] as const,
  },
  dashboard: {
    overview: () => ["dashboard", "overview"] as const,
    products: {
      list: (filters?: Filters) => [
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
    orders: {
      list: (filters?: Filters) => [
        "dashboard",
        "orders",
        "list",
        filters?.page || 1,
        filters?.search || "",
        filters?.status || "",
        filters?.limit || 10,
        filters?.deliveryStatus || "",
      ],
      details: (id: string) => ["dashboard", "orders", "details", id] as const,
    },
    profile: {
      details: () => ["dashboard", "profile", "details"] as const,
    },
    payouts: {
      store: () => ["dashboard", "payouts", "store"] as const,
      list: (filters?: Filters) => ["dashboard", "payouts", "list", filters?.page || 1, filters?.limit || 10],
      stats: () => ["dashboard", "payouts", "stats"] as const,
      withdrawalHistory: (filters?: Filters) => [
        "dashboard",
        "payouts",
        "withdrawal-history",
        filters?.page || 1,
        filters?.limit || 10,
      ],
      withdrawals: (payoutId: string) => ["dashboard", "payouts", "withdrawals", payoutId] as const,
      banks: () => ["dashboard", "payouts", "banks"] as const,
    },
  },
};
