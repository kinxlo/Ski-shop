import { ProductFormData } from "@/app/[locale]/(dashboard-pages)/_components/forms/add-product-form";
import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class DashboardProductService {
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

  // impl get store id
  // {{base_url}}/stores/current
  async getStoreInfo() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<StoreApiResponse>(`/stores/current`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch store id");
    });
  }

  // Create product
  async createProduct(data: ProductFormData, storeID: string) {
    const headers = { "Content-Type": "multipart/form-data" };
    // Create regular object with all form data
    const productData = {
      name: data.name,
      price: data.price,
      category: data.category,
      stockCount: data.stockCount,
      description: data.description,
      storeId: storeID,
      status: "draft",
      discountPrice: data.discountPrice || null,
      images: data.images.map((image) => image.file), // Array of File objects
    };

    return tryCatchWrapper(async () => {
      const response = await this.http.post<ProductApiResponse>(`/products`, productData, headers);
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create product");
    });
  }

  // async getAllUsers(filters: IFilters) {
  //   return tryCatchWrapper(async () => {
  //     const queryParameters = this.buildQueryParameters(filters);
  //     const response = await this.http.get<Users>(`/users?${queryParameters}`);

  //     if (response?.status === 200) {
  //       return response.data;
  //     }
  //     throw new Error("Failed to fetch users");
  //   });
  // }

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
