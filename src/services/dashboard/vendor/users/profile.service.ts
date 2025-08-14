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
      const response = await this.http.patch<VendorProfileApiResponse>(`/vendor/profile`, formData);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to update vendor profile");
    });
  }

  // create promotion
  async getAllAvailablePromotions() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<PromotionApiResponse>(`/promotions`);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to fetch available promotions");
    });
  }

  // create ads
  async createAds(data: { promotionId: string; productId: string; paymentMethod: "paystack" }) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<{
        success: boolean;
        data: {
          reference: string;
          checkoutUrl: string;
          checkoutCode: string;
        };
      }>(`/ads`, data);
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create ads");
    });
  }
}
