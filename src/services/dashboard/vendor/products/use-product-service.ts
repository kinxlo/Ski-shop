/* eslint-disable @typescript-eslint/no-explicit-any */
// use-product-service.ts
import { ProductFormData } from "@/app/[locale]/(dashboard-pages)/_components/forms/add-product-form";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";
import { useQueryClient } from "@tanstack/react-query";

import { DashboardProductService } from "./product.service";

export const useDashboardProductService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<DashboardProductService>(
    dependencies.DASHBOARD_PRODUCT_SERVICE,
  );

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

  const useGetStoreInfo = (options?: any) => {
    return useServiceQuery(["store", "info"], (service) => service.getStoreInfo(), {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      ...options,
    });
  };

  // Mutations
  const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useServiceMutation(
      (service, { productData, storeID }: { productData: ProductFormData; storeID: string }) =>
        service.createProduct(productData, storeID),
      {
        onSuccess: () => {
          // Invalidate and refetch products list
          queryClient.invalidateQueries({ queryKey: ["products", "list"] });
        },
      },
    );
  };

  return {
    // Queries
    useGetAllProducts,
    useGetStoreInfo,
    // Mutations
    useCreateProduct,
  };
};
