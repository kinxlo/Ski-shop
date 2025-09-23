import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

// Types are now globally available in src/types/

export class DashboardOrderService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllOrders(filters: Filters) {
    const queryParameters = this.buildQueryParameters(filters);
    const storeId = await this.getMyStore();

    if (storeId?.success) {
      // const response = await this.http.get<IOrderApiResponse>(`/orders?storeId=${storeId.data.id}&${queryParameters}`);
      const response = await this.http.get<OrderApiResponse>(`/orders?${queryParameters}`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch orders");
    }
    throw new Error("Failed to fetch orders");
  }

  async getOrderById(id: string): Promise<{ success: boolean; data: Order } | undefined> {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: Order }>(`/orders/${id}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch order");
    });
  }

  async updateOrderStatus(
    id: string,
    status: "pending" | "delivered" | "cancelled",
  ): Promise<{ success: boolean; data: Order } | undefined> {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<{ success: boolean; data: Order }>(`/orders/${id}/status`, { status });

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update order status");
    });
  }

  // Get my store /stores/current
  async getMyStore() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: Store }>(`/stores/current`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch store id");
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
