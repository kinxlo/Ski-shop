/* eslint-disable @typescript-eslint/no-explicit-any */
// use-order-service.ts
import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";
import { useQueryClient } from "@tanstack/react-query";

import { DashboardOrderService } from "./order.service";

export const useDashboardOrderService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<DashboardOrderService>(
    dependencies.DASHBOARD_ORDER_SERVICE,
  );

  // Queries
  const useGetAllOrders = (filters: Filters, options?: any) => {
    return useServiceQuery([...queryKeys.dashboard.orders.list(filters)], (service) => service.getAllOrders(filters), {
      staleTime: 0,
      ...options,
    });
  };

  const useGetOrderById = (id: string, options?: any) => {
    return useServiceQuery([...queryKeys.dashboard.orders.details(id)], (service) => service.getOrderById(id), options);
  };

  // Mutations
  const useUpdateOrderStatus = (options?: any) => {
    const queryClient = useQueryClient();

    return useServiceMutation(
      (service, { id, status }: { id: string; status: "pending" | "delivered" | "cancelled" }) =>
        service.updateOrderStatus(id, status),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.orders.list() });
        },
        ...options,
      },
    );
  };

  return {
    // Queries
    useGetAllOrders,
    useGetOrderById,

    // Mutations
    useUpdateOrderStatus,
  };
};
