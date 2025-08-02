import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";
import { dashboardOverview } from "@/mocks/handlers/dashboard/analytics";

export class HomeService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getOverview() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<dashboardOverview>("/overviews");
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get overview");
    });
  }
}
