import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";
import { BankPayoutFormData, BusinessInfoFormData, StoreFormData } from "@/schemas";

export class UserService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async updateBusinessInfo(businessInfo: BusinessInfoFormData) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<{ success: boolean; data: object }>("/auth/business", businessInfo);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update business info");
    });
  }
  async setupBankDetails(bankDetails: BankPayoutFormData) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<{ success: boolean; data: object }>("/auth/bank", bankDetails);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update bank details");
    });
  }

  async createStore(storeData: StoreFormData) {
    return tryCatchWrapper(async () => {
      const formData = new FormData();
      formData.append("name", storeData.name);
      formData.append("description", storeData.description);

      if (storeData.logo && storeData.logo.length > 0) {
        formData.append("logo", storeData.logo[0]);
      }

      const response = await this.http.post<{ success: boolean; data: object }>("/auth/store", formData);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to create store");
    });
  }

  async getUserProfile() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ data: UserProfile }>("/user/profile");

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch user profile");
    });
  }

  async updateUserProfile(profileData: UpdateUserProfile) {
    return tryCatchWrapper(async () => {
      const response = await this.http.patch<{ data: UserProfile }>("/user/profile", profileData);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update user profile");
    });
  }

  async getAllUsers(filters: IFilters = Object.create({ page: 1 })) {
    return tryCatchWrapper(async () => {
      const queryParameters = this.buildQueryParameters(filters);
      const response = await this.http.get<{ data: UserProfile[]; total: number; skip: number; limit: number }>(
        `/users?${queryParameters}`,
      );

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch users");
    });
  }

  async getUserById(userId: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ data: UserProfile }>(`/users/${userId}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch user");
    });
  }

  async deleteUser(userId: string) {
    return tryCatchWrapper(async () => {
      const response = await this.http.delete(`/users/${userId}`);

      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to delete user");
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
