import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";
import { RegisterFormData } from "@/schemas";
import { isAxiosError } from "axios";

// Types are now globally available in src/types/

export class AuthService {
  private readonly http: HttpAdapter;

  constructor(httpAdapter: HttpAdapter) {
    this.http = httpAdapter;
  }

  async loginWithPassword(data: LoginFormData) {
    return tryCatchWrapper(
      async () => {
        const response = await this.http.post<{
          data: {
            user: {
              id: string;
              fullName: string;
              email: string;
              role: { id: string; name: string };
            };
            tokens: {
              accessToken: string;
              refreshToken: string;
            };
          };
          success: boolean;
        }>("/auth/login/password", data);

        if (response?.status === 200) {
          return response.data;
        }
        throw new Error("Unexpected response status");
      },
      (error: unknown) => {
        if (isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 400: {
                return new Error("Invalid login data");
              }
              case 401: {
                return new Error("Invalid email or password");
              }
              case 422: {
                return new Error("Validation failed");
              }
              case 500: {
                return new Error("Server error, please try again later");
              }
              default: {
                return new Error(`Login failed (${error.response.status})`);
              }
            }
          } else if (error.request) {
            return new Error("Network error - please check your connection");
          }
        }
        return new Error("Unknown error occurred during login");
      },
    );
  }

  async signUp(data: RegisterFormData) {
    return tryCatchWrapper(
      async () => {
        const response = await this.http.post<ShortTokenResponse>("/auth/register", data);

        if (response?.status === 201) {
          return response.data;
        }
        throw new Error("Unexpected response status");
      },
      (error: unknown) => {
        if (isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 400: {
                return new Error("Invalid registration data");
              }
              case 409: {
                return new Error("User already exists");
              }
              case 422: {
                return new Error("Validation failed");
              }
              case 500: {
                return new Error("Server error, please try again later");
              }
              default: {
                return new Error(`Registration failed (${error.response.status})`);
              }
            }
          } else if (error.request) {
            return new Error("Network error - please check your connection");
          }
        }
        return new Error("Unknown error occurred during registration");
      },
    );
  }

  async handleGoogleCallback(credentials: { code: string }) {
    return tryCatchWrapper(
      async () => {
        const response = await this.http.get<UserResponse>(`/auth/oauth/google/callback?code=${credentials.code}`);
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error("Failed to handle Google callback");
      },
      (error: unknown) => {
        if (isAxiosError(error)) {
          return new Error(error.response?.data?.error || "Authentication failed");
        }
        return new Error("Unknown error during authentication");
      },
    );
  }

  async forgotPassword(credentials: ForgotPasswordData) {
    return tryCatchWrapper(
      async () => {
        const response = await this.http.post<{ data: string }>("/auth/forgotpassword", credentials);
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error("Password reset request failed");
      },
      (error: unknown) => {
        if (isAxiosError(error)) {
          return new Error(error.response?.data?.message || "Password reset request failed");
        }
        return new Error("Unknown error during password reset");
      },
    );
  }

  async resetPassword(credentials: ResetPasswordData) {
    return tryCatchWrapper(async () => {
      const response = await this.http.post<{ data: string }>("/auth/resetpassword", credentials);
      if (response?.status === 200) {
        return response.data;
      }
      throw new Error("Password reset failed");
    });
  }
}
