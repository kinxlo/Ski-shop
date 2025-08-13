import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";
import { useQueryClient } from "@tanstack/react-query";

import { DashboardProfileService } from "./profile.service";

export const useDashboardProfileService = () => {
  const { useServiceMutation, useServiceQuery } = createServiceHooks<DashboardProfileService>(
    dependencies.DASHBOARD_PROFILE_SERVICE,
  );

  // Queries
  const useGetVendorStore = () => {
    return useServiceQuery([...queryKeys.dashboard.profile.details()], (service) => service.getVendorStore());
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

  const useGetAllAvailablePromotions = () => {
    return useServiceQuery([...queryKeys.dashboard.profile.details()], (service) =>
      service.getAllAvailablePromotions(),
    );
  };

  const useCreateAds = () => {
    return useServiceMutation(
      (service, { data }: { data: { promotionId: string; productId: string; paymentMethod: "paystack" } }) =>
        service.createAds(data),
    );
  };

  return {
    // Queries
    useGetVendorStore,
    useGetAllAvailablePromotions,
    // Mutations
    useUpdateVendorProfile,
    useCreateAds,
  };
};
