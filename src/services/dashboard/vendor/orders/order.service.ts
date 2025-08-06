import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export interface IOrder {
  id: string;
  orderId: string;
  status: "pending" | "delivered" | "cancelled";
  products: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  buyer: {
    name: string;
    email: string;
  };
  delivery: {
    address: string;
    city: string;
    state: string;
  };
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderApiResponse {
  data: {
    items: IOrder[];
    metadata: {
      total: number;
      totalPages: number;
      currentPage: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface IFilters {
  page?: number;
  limit?: number;
  status?: "pending" | "delivered" | "cancelled";
  search?: string;
}

export class DashboardOrderService {
  constructor(private http: HttpAdapter) {}

  async getAllOrders(filters?: IFilters): Promise<IOrderApiResponse> {
    return tryCatchWrapper(async () => {
      const parameters = new URLSearchParams();

      if (filters?.page) parameters.append("page", filters.page.toString());
      if (filters?.limit) parameters.append("limit", filters.limit.toString());
      if (filters?.status) parameters.append("status", filters.status);
      if (filters?.search) parameters.append("search", filters.search);

      const response = await this.http.get<IOrderApiResponse>(`/api/dashboard/orders?${parameters.toString()}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch orders");
    });
  }

  async getOrderById(id: string): Promise<{ data: IOrder }> {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ data: IOrder }>(`/api/dashboard/orders/${id}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch order");
    });
  }

  async updateOrderStatus(id: string, status: "pending" | "delivered" | "cancelled"): Promise<{ data: IOrder }> {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<{ data: IOrder }>(`/api/dashboard/orders/${id}/status`, { status });

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update order status");
    });
  }
}
