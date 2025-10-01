import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class Play2WinService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  // Helpers
  private buildQueryParameters(filters: Filters = {}): string {
    const queryParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== "") {
        queryParameters.append(key, String(value));
      }
    }
    return queryParameters.toString();
  }

  // Coupons
  // Implement pagination with optional filter parameters
  async getCoupons(filters?: Filters) {
    return tryCatchWrapper(async () => {
      const qs = filters ? this.buildQueryParameters(filters) : "";
      const url = `/coupons${qs ? `?${qs}` : ""}`;
      const response = await this.http.get<CouponsApiResponse>(url);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch coupons");
    });
  }

  async getCoupon(id: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<ApiResponse<Coupon>>(`/coupons/${id}`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get coupon");
    });
  }

  async createCoupon(data: Pick<Coupon, "title" | "quantity" | "couponType" | "value" | "startDate" | "endDate">) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<ApiResponse<Coupon>>(`/coupons`, data);
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create coupon");
    });
  }

  async updateCoupon(
    id: string,
    data: Partial<Pick<Coupon, "title" | "quantity" | "couponType" | "value" | "startDate" | "endDate">>,
  ) {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<ApiResponse<Coupon>>(`/coupons/${id}`, data);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update coupon");
    });
  }

  async deleteCoupon(id: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.delete<{ success: boolean }>(`/coupons/${id}`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to delete coupon");
    });
  }

  // Winners & Draw
  async draw() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<ApiResponse<Coupon>>(`/coupons/draw`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to draw coupon");
    });
  }

  async getWinners(filters?: Filters) {
    return tryCatchWrapper(async () => {
      const qs = filters ? this.buildQueryParameters(filters) : "";
      const url = `/vouchers${qs ? `?${qs}` : ""}`;
      const response = await this.http.get<WinnersApiResponse>(url);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch winners");
    });
  }
}
