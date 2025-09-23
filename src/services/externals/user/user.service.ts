import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export class UserService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
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

  async getAllUsers(filters: Filters) {
    return tryCatchWrapper(async () => {
      const appliedFilters = filters;
      const queryParameters = this.buildQueryParameters(appliedFilters);
      const response = await this.http.get<UserApiResponse | AdminUserApiResponse>(`/users?${queryParameters}`);

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

  private buildQueryParameters(filters: Filters): string {
    const queryParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== "") {
        queryParameters.append(key, value.toString());
      }
    }
    return queryParameters.toString();
  }
}
