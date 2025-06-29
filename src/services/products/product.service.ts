import { Users } from "@/components/shared/dashboard-table/type";
import { HttpAdapter } from "@/lib/http/http-adapter";

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export class ProductService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllProducts(filters: IFilters) {
    const queryParameters = this.buildQueryParameters(filters);
    const response = await this.http.get<ProductResponse>(`/products${queryParameters}`);
    if (response?.status === 200) {
      return response.data;
    }
  }

  async getAllUsers(filters: IFilters) {
    const queryParameters = this.buildQueryParameters(filters);
    const response = await this.http.get<Users>(`/users${queryParameters}`);
    if (response?.status === 200) {
      return response.data;
    }
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
