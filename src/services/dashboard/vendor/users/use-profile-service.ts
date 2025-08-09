import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";
import { useQueryClient, UseQueryOptions } from "@tanstack/react-query";

import { DashboardProfileService, VendorProfileApiResponse } from "./profile.service";

export const useDashboardProfileService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<DashboardProfileService>(
    dependencies.DASHBOARD_PROFILE_SERVICE,
  );

  // Queries
  const useGetVendorProfile = (options?: UseQueryOptions<VendorProfileApiResponse>) => {
    return useServiceQuery([...queryKeys.dashboard.profile.details()], (service) => service.getVendorProfile(), {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      ...options,
    });
  };

  // Mutations
  const useUpdateVendorProfile = () => {
    const queryClient = useQueryClient();

    return useServiceMutation(
      (service, { data }: { data: VendorProfileFormData }) => service.updateVendorProfile(data),
      {
        onSuccess: () => {
          // Invalidate and refetch profile data
          queryClient.invalidateQueries({ queryKey: [...queryKeys.dashboard.profile.details()] });
        },
      },
    );
  };

  return {
    // Queries
    useGetVendorProfile,
    // Mutations
    useUpdateVendorProfile,
  };
};
