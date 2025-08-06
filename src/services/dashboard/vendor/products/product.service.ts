import { ProductFormData } from "@/app/[locale]/(dashboard-pages)/_components/forms/add-product-form";
import { EditProductFormData } from "@/app/[locale]/(dashboard-pages)/_components/forms/edit-product-form";
import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class DashboardProductService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getAllProducts(filters?: IFilters) {
    const defaultFilters: IFilters = { page: 1, limit: 10 };
    const appliedFilters = filters ?? defaultFilters;
    const queryParameters = this.buildQueryParameters(appliedFilters);
    const storeId = await this.getMyStore();
    if (storeId.success) {
      const response = await this.http.get<ProductApiResponse>(
        `/products?storeId=${storeId.data.id}&${queryParameters}`,
      );
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch products");
    }
    throw new Error("Failed to fetch products");
  }

  async getStoreInfo() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<StoreApiResponse>(`/stores/current`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch store id");
    });
  }

  async getSingleProduct(id: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: Product }>(`/products/${id}`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error(`Failed to fetch product with ID: ${id}`);
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
      status: data.status || "published",
      // discountPrice: data.discountPrice || null,
      images: data.images[0].file, // Array of File objects
      // images: data.images.map((image) => image.file), // Array of File objects
    };

    return tryCatchWrapper(async () => {
      const response = await this.http.post<{ success: boolean; data: Product }>(`/products`, productData, headers);
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create product");
    });
  }

  // handle delete product and edit product

  async deleteProduct(id: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.delete<ProductApiResponse>(`/products/${id}`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to delete product");
    });
  }

  async editProduct(id: string, data: EditProductFormData) {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<ProductApiResponse>(`/products/${id}`, data);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to edit product");
    });
  }

  async updateProductStatus(id: string, status: "published" | "draft") {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<ProductApiResponse>(`/products/${id}`, { status });
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update product status");
    });
  }

  //get my store /stores/current
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
