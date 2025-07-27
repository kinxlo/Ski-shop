import { Users } from "@/components/shared/dashboard-table/type";
import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class ProductService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllProducts(filters: IFilters) {
    return tryCatchWrapper(async () => {
      const queryParameters = this.buildQueryParameters(filters);
      const response = await this.http.get<ProductApiResponse>(`/products?${queryParameters}`);

      if (response?.status === 200) {
        return response.data.data;
      }
      throw new Error("Failed to fetch products");
    });
  }

  async getAllUsers(filters: IFilters) {
    return tryCatchWrapper(async () => {
      const queryParameters = this.buildQueryParameters(filters);
      const response = await this.http.get<Users>(`/users?${queryParameters}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch users");
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
