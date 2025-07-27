/* eslint-disable @typescript-eslint/no-explicit-any */
// use-product-service.ts
import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { ProductService } from "./product.service";

export const useProductService = () => {
  const { useServiceQuery } = createServiceHooks<ProductService>(dependencies.PRODUCT_SERVICE);

  // Queries
  const useGetAllProducts = (filters?: IFilters, options?: any) => {
    const appliedFilters = filters ?? { page: 1 };
    return useServiceQuery(
      queryKeys.product.list(appliedFilters),
      (service) => service.getAllProducts(appliedFilters),
      { staleTime: 0, ...options },
    );
  };

  const useGetAllUsers = (filters: IFilters = Object.create({ page: 1 }), options?: any) =>
    useServiceQuery([...queryKeys.user.list()], (service) => service.getAllUsers(filters), options);

  return {
    // Queries
    useGetAllProducts,
    useGetAllUsers,
  };
};
