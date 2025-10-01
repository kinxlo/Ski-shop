/**
 * Play-2-Win domain types
 */

declare global {
  type CouponType = "discount" | "amount";

  interface Coupon extends DataItem {
    id: string;
    code: string;
    title: string;
    quantity: number;
    remainingQuantity: number;
    couponType: CouponType;
    value: number;
    startDate: string;
    endDate: string;
    createdAt?: string;
  }

  interface Winner extends DataItem {
    id: string;
    userId?: string;
    userName?: string;
    user?: {
      firstName?: string;
      lastName?: string;
      email?: string;
    } | null;
    couponId?: string;
    couponCode?: string;
    couponTitle?: string;
    prizeValue?: number | string;
    status?: "pending" | "redeemed" | "processing" | "failed";
    dateTime?: string;
    createdAt?: string;
  }

  interface CouponApiResponse extends ApiResponse<Coupon> {}
  interface CouponsApiResponse extends PaginatedApiResponse<Coupon> {}
  interface WinnersApiResponse extends PaginatedApiResponse<Winner> {}
}

export {};
