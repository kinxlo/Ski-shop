/**
 * Business domain types for the Ski Shop application
 */

declare global {
  /** Dashboard overview data */
  interface AdminDashboardOverview {
    commisions: number;
    subscriptions: number;
    promotionAds: number;
    totalRevenue: number;
  }

  interface AdminActiveSubscription {
    id: string;
    vendorName: string;
    startDate: string;
    endDate: string;
    planType: string;
    status: string;
    payment: object;
  }

  interface AdminSalesOverviewData {
    year: number;
    month: string;
    total: number;
  }
  interface AdminRevenueTrend {
    year: number;
    month: number;
    total: number;
  }

  interface AdminRevenueOverviewData {
    commisions: number;
    subscriptions: number;
    promotionAds: number;
    totalRevenue: number;
  }

  interface Users {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    itemsCount: number;
    ordersCount: number;
    email: string;
    isEmailVerified: boolean;
    lastTimeActivity: string;
    createdAt: string;
    phoneNumber: string;
    kycStatus?: string;
    subscriptionStatus?: string;
    status?: string;
    store: Store | null;
    [key: string]: unknown;
  }

  /** Payout stats API response */
  interface AdminPayoutStatsResponse {
    success: boolean;
    data: {
      totalPayoutsPaid: number;
      walletBalance: number;
      pendingPayouts: number;
    };
  }

  interface RevenueHistory extends DataItem {
    id: string;
    revenueSource: string;
    description: string;
    amount: number;
    user: string;
    role: string;
    date: string;
  }

  /** Payout request data */
  interface PayoutRequest extends DataItem {
    id: string;
    userId: string;
    userName: string;
    storeName?: string;
    role: "vendor" | "rider";
    walletBalance: number;
    amount: number;
    dateTime: string;
    status: "pending" | "approved" | "rejected";
  }

  /** Payout history data */
  interface PayoutHistory extends DataItem {
    id: string;
    userId: string;
    userName: string;
    storeName?: string;
    role: "vendor" | "rider";
    amount: number;
    dateTime: string;
    status: "completed" | "failed";
    transactionId?: string;
  }

  interface AdminSubscriptionOverviewData {
    totalSubscriptions: number;
    activeSubscriptions: number;
    expiredSubscriptions: number;
    pendingSubscriptions: number;
  }

  interface SubscriptionHistory extends DataItem {
    id: string;
    vendorName: string;
    planType: string;
    // amount: number;
    startDate: string;
    endDate: string;
    status: string;
  }

  interface AdminSubscriptionPlan {
    id: string;
    name: string;
    planCode: string;
    savingPercentage: number;
    amount: number;
    createdAt: string;
  }

  interface createSubscriptions {
    id: string;
    startDate: string;
    endDate: string;
    planType: string;
    status: string;
    payment: {
      accessCode: string;
      authorizationUrl: string;
      reference: string;
    };
  }

  interface AdminActiveSubscriptionApiResponse extends PaginatedApiResponse<AdminActiveSubscription> {}
  interface AdminSalesOverview extends ApiResponse<AdminSalesOverviewData[]> {}
  interface AdminRevenueOverview extends ApiResponse<AdminRevenueOverviewData> {}
  interface AdminSubscriptionOverview extends ApiResponse<AdminSubscriptionOverviewData> {}
  interface AdminUserApiResponse extends PaginatedApiResponse<Users> {}
  interface AdminRevenueTrend extends ApiResponse<AdminRevenueTrend[]> {}
  interface AdminRevenueHistoryApiResponse extends ApiResponse<RevenueHistory[]> {}
  interface AdminSubscriptionHistoryApiResponse extends PaginatedApiResponse<SubscriptionHistory> {}
  interface AdminPayoutRequestApiResponse extends PaginatedApiResponse<PayoutRequest> {}
  interface AdminPayoutHistoryApiResponse extends PaginatedApiResponse<PayoutHistory> {}
  interface AdminAllAvailablePlansApiResponse extends PaginatedApiResponse<AdminSubscriptionPlan[]> {}
  interface CreateSubscriptionApiResponse extends ApiResponse<CreateSubscription> {}
}

export {};
