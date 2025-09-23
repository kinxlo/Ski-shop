import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class AdminService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getSalesOverview() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<AdminSalesOverview>("/revenues/sales");

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get sales overview");
    });
  }

  async getRevenueTrend() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<AdminRevenueTrend>("/revenues/trend");

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get sales overview");
    });
  }

  async getRevenueOverview() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<AdminRevenueOverview>("/revenues");

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get sales overview");
    });
  }

  async getRevenueHistory() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<AdminRevenueHistoryApiResponse>("/revenues/history");

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get sales overview");
    });
  }

  async getPayoutsStats(filters?: Filters) {
    return tryCatchWrapper(async () => {
      const queryString = filters ? this.buildQueryParameters(filters) : "";
      const url = `/payouts/stats${queryString ? `?${queryString}` : ""}`;

      const response = await this.http.get<AdminPayoutStatsResponse>(url);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get payouts");
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
