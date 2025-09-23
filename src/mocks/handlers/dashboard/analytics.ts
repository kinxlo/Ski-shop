import { delay, http, HttpResponse } from "msw";

export interface dashboardOverview {
  success: boolean;
  data: {
    overview: {
      totalRevenue: number;
      totalOrders: number;
      totalUsers: number;
      newOrders: number;
      pendingPayouts: number;
      activeSubscription: number;
    };
  };
}

const overview: dashboardOverview = {
  success: true,
  data: {
    overview: {
      totalRevenue: 100_000,
      totalOrders: 100,
      totalUsers: 100,
      newOrders: 10,
      pendingPayouts: 1000,
      activeSubscription: 10,
    },
  },
};

export const dashboardHandler = [
  // Get all product categories
  http.get(`/overviews`, async () => {
    await delay(150);
    return HttpResponse.json(overview, { status: 200 });
  }),
];
