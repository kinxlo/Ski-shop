/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { AdminService } from "./admin.service";

export const useAdminService = () => {
  const { useServiceQuery } = createServiceHooks<AdminService>(dependencies.ADMIN_SERVICE);

  const useGetSalesOverview = (options?: any) =>
    useServiceQuery([...queryKeys.dashboard.salesOverview()], (service) => service.getSalesOverview(), options);

  const useGetPayoutsStats = (options?: any) =>
    useServiceQuery([...queryKeys.dashboard.payoutsStats()], (service) => service.getPayoutsStats(), options);

  const useGetRevenueOverview = (options?: any) =>
    useServiceQuery([...queryKeys.dashboard.revenueOverview()], (service) => service.getRevenueOverview(), options);

  const useGetRevenueTrend = (options?: any) =>
    useServiceQuery([...queryKeys.dashboard.revenueTrend()], (service) => service.getRevenueTrend(), options);

  const useGetRevenueHistory = (options?: any) =>
    useServiceQuery([...queryKeys.dashboard.revenueHistory()], (service) => service.getRevenueHistory(), options);

  return {
    useGetSalesOverview,
    useGetPayoutsStats,
    useGetRevenueOverview,
    useGetRevenueTrend,
    useGetRevenueHistory,
  };
};
