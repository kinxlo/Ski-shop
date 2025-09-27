import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

import { getCurrentStoreCached } from "../store/current-store";

export class PromotionService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  // create promotion
  async getAllAvailablePromotions() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<PromotionApiResponse>(`/promotions`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch available promotions");
    });
  }

  async getPromotion(id: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ data: Promotion }>(`/promotions/${id}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get promotion");
    });
  }

  async createPromotion(data: Omit<Promotion, "id" | "createdAt">) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<{ data: Promotion }>("/promotions", data);

      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create promotion");
    });
  }

  async updatePromotion(id: string, data: Partial<Omit<Promotion, "id" | "createdAt">>) {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<{ data: Promotion }>(`/promotions/${id}`, data);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update promotion");
    });
  }

  async deletePromotion(id: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.delete<{ success: boolean }>(`/promotions/${id}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to delete promotion");
    });
  }

  // create ads
  async createAds(data: { promotionId: string; productId: string; paymentMethod: "paystack" }) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<{
        success: boolean;
        data: {
          reference: string;
          checkoutUrl: string;
          checkoutCode: string;
        };
      }>(`/ads`, data);
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create ads");
    });
  }

  async getActiveCampaigns(filters?: Filters) {
    return tryCatchWrapper(async () => {
      const appliedFilters = filters
        ? ({ ...filters, status: "active" } as Filters)
        : ({ status: "active" } as Filters);
      const queryString = this.buildQueryParameters(appliedFilters);

      const storeResult = await getCurrentStoreCached(this.http);
      const storeQuery = storeResult?.success ? `&storeId=${storeResult.data.id}` : "";

      const url = `/ads?${queryString}${storeQuery}`;

      const response = await this.http.get<PaginatedApiResponse<Campaign>>(url);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get active campaigns");
    });
  }

  private buildQueryParameters(filters: Filters): string {
    const queryParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        queryParameters.append(key, value.toString());
      }
    }
    return queryParameters.toString();
  }
}
