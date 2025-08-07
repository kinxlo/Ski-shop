import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

// Types are now globally available in src/types/

export class DashboardOrderService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllOrders(filters?: IFilters) {
    const defaultFilters: IFilters = { page: 1, limit: 10 };
    const appliedFilters = filters ?? defaultFilters;
    const queryParameters = this.buildQueryParameters(appliedFilters);
    const storeId = await this.getMyStore();

    if (storeId.success) {
      // const response = await this.http.get<IOrderApiResponse>(`/orders?storeId=${storeId.data.id}&${queryParameters}`);
      const response = await this.http.get<IOrderApiResponse>(`/orders?${queryParameters}`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch orders");
    }
    throw new Error("Failed to fetch orders");
  }

  async getOrderById(id: string): Promise<{ success: boolean; data: IOrder }> {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: IOrder }>(`/orders/${id}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch order");
    });
  }

  async updateOrderStatus(
    id: string,
    status: "pending" | "delivered" | "cancelled",
  ): Promise<{ success: boolean; data: IOrder }> {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<{ success: boolean; data: IOrder }>(`/orders/${id}/status`, { status });

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update order status");
    });
  }

  // Get my store /stores/current
  async getMyStore() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<StoreApiResponse>(`/stores/current`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch store id");
    });
  }

  private buildQueryParameters(filters: IFilters): string {
    const queryParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined) {
        queryParameters.append(key, value.toString());
      }
    }
    return queryParameters.toString();
  }
}
