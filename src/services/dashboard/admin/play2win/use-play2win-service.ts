/* eslint-disable @typescript-eslint/no-explicit-any */

import { queryKeys } from "@/lib/react-query/query-keys";
import { createServiceHooks } from "@/lib/react-query/use-service-query";
import { dependencies } from "@/lib/tools/dependencies";

import { Play2WinService } from "./play2win.service";

export const usePlay2WinService = () => {
  const { useServiceQuery, useServiceMutation } = createServiceHooks<Play2WinService>(dependencies.PLAY2WIN_SERVICE);

  // Coupons
  const useGetCoupons = (filters?: Filters, options?: any) =>
    useServiceQuery(
      [...queryKeys.dashboard.play2win.coupons.list(filters)],
      (service) => service.getCoupons(filters),
      options,
    );

  const useGetCoupon = (id: string, options?: any) =>
    useServiceQuery([...queryKeys.dashboard.play2win.coupons.details(id)], (service) => service.getCoupon(id), {
      enabled: !!id,
      ...options,
    });

  const useCreateCoupon = () =>
    useServiceMutation(
      (service, data: Pick<Coupon, "title" | "quantity" | "couponType" | "value" | "startDate" | "endDate">) =>
        service.createCoupon(data),
    );

  const useUpdateCoupon = () =>
    useServiceMutation(
      (
        service,
        payload: {
          id: string;
          data: Partial<Pick<Coupon, "title" | "quantity" | "couponType" | "value" | "startDate" | "endDate">>;
        },
      ) => service.updateCoupon(payload.id, payload.data),
    );

  const useDeleteCoupon = () => useServiceMutation((service, id: string) => service.deleteCoupon(id));

  // Winners & Draw
  const useDraw = () => useServiceMutation((service) => service.draw());

  const useGetWinners = (filters?: Filters, options?: any) =>
    useServiceQuery(
      [...queryKeys.dashboard.play2win.winners.list(filters)],
      (service) => service.getWinners(filters),
      options,
    );

  return {
    useGetCoupons,
    useGetCoupon,
    useCreateCoupon,
    useUpdateCoupon,
    useDeleteCoupon,

    useDraw,
    useGetWinners,
  };
};
