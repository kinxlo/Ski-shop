/* eslint-disable @typescript-eslint/no-explicit-any */
// services/app/use-app-service.ts
import { queryClient } from "@/lib/react-query/query-client";
import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { AppService } from "./app.service";

// Stable default filters object to avoid object reference issues
const DEFAULT_FILTERS: Filters = { page: 1, limit: 10 };

export const useAppService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<AppService>(dependencies.APP_SERVICE);

  // Queries
  const useGetAllProducts = (filters?: Filters, options?: any) => {
    const appliedFilters = filters ?? DEFAULT_FILTERS;

    return useServiceQuery(
      [...queryKeys.product.list(appliedFilters)],
      (service) => service.getAllProducts(filters), // Use original filters, let service handle defaults
      { staleTime: 0, ...options },
    );
  };

  const useGetSingleProduct = (id: string, options?: any) =>
    useServiceQuery([...queryKeys.product.details(id)], (service) => service.getSingleProduct(id), options);

  const useGetAllProductCategory = (options?: any) =>
    useServiceQuery([...queryKeys.product.categories()], (service) => service.getAllProductCategory(), options);

  const useGetSavedProducts = (options?: any) =>
    useServiceQuery([...queryKeys.product.saved()], (service) => service.getSavedProducts(), {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      ...options,
    });

  const useGetCart = (options?: any) =>
    useServiceQuery(
      [...queryKeys.cart.list()],
      async (service) => {
        try {
          const response = await service.getCart();
          // Ensure response has proper structure even if empty
          return response || { data: { items: [], metadata: { total: 0 } } };
        } catch {
          // Return empty cart structure on error
          return { data: { items: [], metadata: { total: 0 } } };
        }
      },
      {
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        ...options,
      },
    );

  // const useGetCart = (options?: any) =>
  //   useServiceQuery(
  //     [...queryKeys.cart.list()],
  //     (service) => service.getCart(),
  //     { staleTime: 1000 * 60 * 5, ...options }, // 5 minutes cache
  //   );

  const useGetCartItem = (itemId: string, options?: any) =>
    useServiceQuery([...queryKeys.cart.item(itemId)], (service) => service.getCartById(itemId), options);

  // Mutations
  const useAddToCart = (options?: any) =>
    useServiceMutation((service, data: { productId: string; quantity: number }) => service.addToCart(data), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.list() });
      },
      ...options,
    });

  const useUpdateCartItem = (options?: any) =>
    useServiceMutation((service, data: { itemId: string; quantity: number }) => service.updateCartItem(data), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.list() });
      },
      ...options,
    });

  const useRemoveFromCart = (options?: any) =>
    useServiceMutation((service, itemId: string) => service.removeFromCart(itemId), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.list() });
      },
      ...options,
    });

  const useCheckoutCart = (options?: any) =>
    useServiceMutation((service) => service.checkoutCart(), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.cart.list() });
        queryClient.removeQueries({ queryKey: queryKeys.cart.list() });
      },
      ...options,
    });

  const useGetOrders = (options?: any) =>
    useServiceQuery([...queryKeys.order.list()], (service) => service.order(), {
      ...options,
    });

  const useGetOrderById = (id: string, options?: any) =>
    useServiceQuery([...queryKeys.order.details(id)], (service) => service.getOrderById(id), options);

  const useSaveProduct = (options?: any) =>
    useServiceMutation((service, data: { productId: string }) => service.saveProduct(data), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.product.saved() });
      },
      ...options,
    });

  const useRemoveFromFavorites = (options?: any) =>
    useServiceMutation((service, productId: string) => service.removeFromFavorites(productId), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.product.saved() });
      },
      ...options,
    });

  const useGetTopVendors = (options?: any) =>
    useServiceQuery([...queryKeys.vendor.top()], (service) => service.getTopVendors(), options);

  return {
    // Product Queries
    useGetAllProducts,
    useGetSingleProduct,
    useGetAllProductCategory,
    useGetSavedProducts,

    // Cart Queries
    useGetCart,
    useGetCartItem,

    // Cart Mutations
    useAddToCart,
    useUpdateCartItem,
    useRemoveFromCart,
    useCheckoutCart,

    // Order Queries
    useGetOrders,
    useGetOrderById,

    // Product Mutations
    useSaveProduct,
    useRemoveFromFavorites,

    // Vendor Queries
    useGetTopVendors,
  };
};
