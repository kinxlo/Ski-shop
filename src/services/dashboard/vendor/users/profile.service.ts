import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";
import { VendorProfileFormData } from "@/schemas";

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

  // get store info with /store/current
  async getVendorStore() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: Store }>(`/stores/current`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch vendor store");
    });
  }

  //get vendor profile
  async getVendorProfile() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<VendorProfileApiResponse>(`/vendors/profile`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch vendor profile");
    });
  }

  async updateVendorProfile(data: Partial<VendorProfileFormData>) {
    const formData = new FormData();

    // Add store information
    if (data.store?.name) formData.append("store[name]", data.store.name);
    if (data.store?.description) formData.append("store[description]", data.store.description);
    if (data.store?.category) formData.append("store[category]", data.store.category);

    // Add user information
    if (data.user?.firstName) formData.append("user[firstName]", data.user.firstName);
    if (data.user?.lastName) formData.append("user[lastName]", data.user.lastName);
    // API expects phoneNumber
    if (data.user?.phone) formData.append("user[phoneNumber]", data.user.phone);

    // Add business information
    if (data.business?.type) formData.append("business[type]", data.business.type);
    if (data.business?.businessRegNumber)
      formData.append("business[businessRegNumber]", data.business.businessRegNumber);
    // API expects business[name]
    if (data.business?.name) formData.append("business[name]", data.business.name);
    if (data.business?.country) formData.append("business[country]", data.business.country);
    if (data.business?.state) formData.append("business[state]", data.business.state);
    if (data.business?.address) formData.append("business[address]", data.business.address);

    return tryCatchWrapper(async () => {
      const response = await this.http.patch<VendorProfileApiResponse>(`/vendors/profile`, formData);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update vendor profile");
    });
  }

  async updateVendorLogo(logo: File) {
    const formData = new FormData();
    formData.append("logo", logo, logo.name);

    return tryCatchWrapper(async () => {
      const response = await this.http.patch<VendorProfileApiResponse>(`/vendors/profile`, formData);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update vendor logo");
    });
  }
}
