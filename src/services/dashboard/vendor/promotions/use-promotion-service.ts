/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { PromotionService } from "./promotion.service";

export const usePromotionService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<PromotionService>(dependencies.PROMOTION_SERVICE);

  const useGetAllAvailablePromotions = () => {
    return useServiceQuery([...queryKeys.dashboard.promotions.list()], (service) =>
      service.getAllAvailablePromotions(),
    );
  };

  const useGetPromotion = (id: string, options?: any) =>
    useServiceQuery([...queryKeys.dashboard.promotions.details(id)], (service) => service.getPromotion(id), {
      enabled: !!id,
      ...options,
    });

  const useCreatePromotion = () =>
    useServiceMutation((service, data: Omit<Promotion, "id" | "createdAt">) => service.createPromotion(data));

  const useUpdatePromotion = () =>
    useServiceMutation((service, { id, data }: { id: string; data: Partial<Omit<Promotion, "id" | "createdAt">> }) =>
      service.updatePromotion(id, data),
    );

  const useDeletePromotion = () => useServiceMutation((service, id: string) => service.deletePromotion(id));

  const useCreateAds = () => {
    return useServiceMutation(
      (service, { data }: { data: { promotionId: string; productId: string; paymentMethod: "paystack" } }) =>
        service.createAds(data),
    );
  };

  const useGetActiveCampaigns = (filters?: Filters, options?: any) =>
    useServiceQuery(
      [...queryKeys.dashboard.payouts.campaigns(filters)],
      (service) => service.getActiveCampaigns(filters),
      options,
    );

  // Admin: Ads history (GET /ads)
  const useGetAdsHistory = (filters?: Filters, options?: any) =>
    useServiceQuery(
      [...queryKeys.dashboard.promotions.history(filters)],
      (service) => service.getAdsHistory(filters),
      options,
    );

  return {
    useGetAllAvailablePromotions,
    useGetPromotion,
    useCreatePromotion,
    useCreateAds,
    useUpdatePromotion,
    useDeletePromotion,
    useGetActiveCampaigns,
    useGetAdsHistory,
  };
};
