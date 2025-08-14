/* eslint-disable no-console */
import { HttpAdapter } from "./http-adapter";

export class OnboardingHttpAdapter extends HttpAdapter {
  private getTokenFromUrl(): string | null {
    if (typeof window === "undefined") return null;

    const urlParameters = new URLSearchParams(window.location.search);
    return urlParameters.get("token");
  }

  private getOnboardingHeaders(): Record<string, string> {
    const token = this.getTokenFromUrl();
    if (!token) {
      console.warn("Onboarding token not found in URL parameters. Make sure the URL contains ?token=your_token");
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
      "X-Onboarding-Token": token,
    };
  }

  async get<T>(
    endpoint: string,
    query: Record<string, string | number | boolean> = {},
  ): Promise<{ data: T; status: number } | undefined> {
    return super.get<T>(endpoint, query, this.getOnboardingHeaders());
  }

  async post<T>(
    url: string,
    data: unknown,
    headers?: Record<string, string>,
  ): Promise<{ data: T; status: number } | undefined> {
    return super.post<T>(url, data, { ...this.getOnboardingHeaders(), ...headers });
  }

  async patch<T>(url: string, data?: unknown): Promise<{ data: T; status: number } | undefined> {
    return super.patch<T>(url, data, this.getOnboardingHeaders());
  }

  async delete<T>(url: string, data?: unknown): Promise<{ data: T; status: number } | undefined> {
    return super.delete<T>(url, data, this.getOnboardingHeaders());
  }
}
