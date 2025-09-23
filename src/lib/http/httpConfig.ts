// Recommended to manage env vars in a config file
import axios from "axios";
import { getSession } from "next-auth/react";

const TIMEOUTMSG = "Waiting for too long...Aborted!";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeoutErrorMessage: TIMEOUTMSG,
  // Do NOT set default Content-Type here.
  // Axios will set 'application/json' for plain objects and proper multipart boundaries for FormData.
});

// Request interceptor for auth token and dynamic Content-Type
http.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    // If sending FormData, ensure Content-Type is not preset so browser can add the correct multipart boundary
    if (config.data instanceof FormData && config.headers) {
      // Remove any preset Content-Type to allow Axios/browser to set it correctly
      delete (config.headers as Record<string, unknown>)["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for 401 handling
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Handle 401 Unauthorized from /api/v1/carts
    if (
      (error.response?.status === 401 && originalRequest?.url?.includes("/api/v1/carts")) ||
      (error.response?.status === 401 && originalRequest?.url?.includes("/api/v1/orders")) ||
      (error.response?.status === 401 && originalRequest?.url?.includes("/api/v1/products/saves"))
    ) {
      return; // Just return without throwing error
    }
    throw error;
  },
);

export default http;
