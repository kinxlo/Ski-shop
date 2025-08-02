/* eslint-disable @typescript-eslint/no-explicit-any */
// use-product-service.ts
import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { DashboardProductService } from "./product.service";

export const useDashboardProductService = () => {
  const { useServiceQuery } = createServiceHooks<DashboardProductService>(dependencies.DASHBOARD_PRODUCT_SERVICE);

  // Queries
  const useGetAllProducts = (filters?: IFilters, options?: any) => {
    const appliedFilters = filters ?? { page: 1 };
    const queryKey = [
      "products",
      "list",
      appliedFilters.page || 1,
      appliedFilters.search || "",
      appliedFilters.status || "",
      appliedFilters.categories || "",
      appliedFilters.limit || "",
    ];

    return useServiceQuery(queryKey, (service) => service.getAllProducts(appliedFilters), {
      staleTime: 0,
      gcTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      ...options,
    });
  };

  const useGetAllUsers = (filters: IFilters = Object.create({ page: 1 }), options?: any) =>
    useServiceQuery([...queryKeys.user.list()], (service) => service.getAllUsers(filters), options);

  return {
    // Queries
    useGetAllProducts,
    useGetAllUsers,
  };
};
