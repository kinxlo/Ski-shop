import { OnboardingHttpAdapter } from "@/lib/http/onboarding-http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";
import { BankPayoutFormData, BusinessInfoFormData, StoreFormData } from "@/schemas";
import { isAxiosError } from "axios";

export class OnboardingUserService {
  private readonly http: OnboardingHttpAdapter;

  constructor() {
    this.http = new OnboardingHttpAdapter();
  }

  async resendOTP(data: { email: string }) {
    return tryCatchWrapper(
      async () => {
        const response = await this.http.patch<ShortTokenResponse>("/auth/resendotp", data);
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error("Failed to resend OTP");
      },
      (error: unknown) => {
        if (isAxiosError(error)) {
          return new Error(error.response?.data?.message || "Failed to resend OTP");
        }
        return new Error("Unknown error during OTP resend");
      },
    );
  }

  async verifyOTP(data: { code: number }) {
    return tryCatchWrapper(
      async () => {
        const response = await this.http.post<ShortTokenResponse>("/auth/verifyemail", data);
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error("OTP verification failed");
      },
      (error: unknown) => {
        if (isAxiosError(error)) {
          return new Error(error.response?.data?.message || "OTP verification failed");
        }
        return new Error("Unknown error during OTP verification");
      },
    );
  }

  async updateBusinessInfo(businessInfo: BusinessInfoFormData) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<ShortTokenResponse>("/auth/business", businessInfo);
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to update business info");
    });
  }

  async setupBankDetails(bankDetails: BankPayoutFormData) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<ShortTokenResponse>("/auth/bank", bankDetails);
      if (response?.status === 201) {
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
      if (Array.isArray(storeData.image) && storeData.image.length > 0) {
        for (const file of storeData.image) {
          formData.append("logo[]", file);
        }
      }

      const response = await this.http.post<ShortTokenResponse>("/auth/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response?.status === 201) {
        return response.data;
      }
      throw new Error("Failed to create store");
    });
  }

  // /banks/available
  async getAvailableBanks() {
    return tryCatchWrapper(async () => {
      const response = await this.http.get<{ success: boolean; data: { name: string; code: string }[] }>(
        "/banks/available",
      );
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Failed to get available banks");
    });
  }
}
