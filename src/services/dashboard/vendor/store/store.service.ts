import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class DashboardStoreService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  // Get current store for the authenticated vendor
  async getCurrentStore() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: Store }>(`/stores/current`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch current store");
    });
  }
}
