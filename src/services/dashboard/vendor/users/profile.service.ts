import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

export interface VendorProfileApiResponse {
  success: boolean;
  data: VendorProfile;
  message?: string;
}

export class DashboardProfileService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async getVendorProfile() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<VendorProfileApiResponse>(`/vendor/profile`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch vendor profile");
    });
  }

  async updateVendorProfile(data: VendorProfileFormData) {
    // Create FormData with bracket notation as expected by the API
    const formData = new FormData();

    // Add store information
    if (data.store?.name) formData.append("store[name]", data.store.name);
    if (data.store?.description) formData.append("store[description]", data.store.description);
    if (data.store?.category) formData.append("store[category]", data.store.category);

    // Add user information
    if (data.user?.firstName) formData.append("user[firstName]", data.user.firstName);
    if (data.user?.lastName) formData.append("user[lastName]", data.user.lastName);
    if (data.user?.phone) formData.append("user[phone]", data.user.phone);

    // Add logo file
    if (data.logo) formData.append("logo", data.logo);

    // Add business information
    if (data.business?.type) formData.append("business[type]", data.business.type);
    if (data.business?.businessRegNumber)
      formData.append("business[businessRegNumber]", data.business.businessRegNumber);
    if (data.business?.businessName) formData.append("business[businessName]", data.business.businessName);
    if (data.business?.country) formData.append("business[country]", data.business.country);
    if (data.business?.state) formData.append("business[state]", data.business.state);
    if (data.business?.address) formData.append("business[address]", data.business.address);

    return tryCatchWrapper(async () => {
      const response = await this.http.post<VendorProfileApiResponse>(`/vendor/profile`, formData);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update vendor profile");
    });
  }
}
