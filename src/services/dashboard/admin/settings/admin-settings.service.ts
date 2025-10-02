import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class AdminSettingsService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  // GET /settings - fetch current admin settings
  async getMySettings() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<AdminSettingsApiResponse>(`/settings`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch admin settings");
    });
  }

  // POST /settings - create settings (initial bootstrap)
  async createSettings(payload: AdminSettingsPayload) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<AdminSettingsApiResponse>(`/settings`, payload);
      if (response?.status === 201 || response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to create admin settings");
    });
  }

  // PATCH /settings/:id - update partial settings
  async updateSettings(settingId: string, payload: AdminSettingsPayload) {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<AdminSettingsApiResponse>(`/settings/${settingId}`, payload);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update admin settings");
    });
  }
}
