// Recommended to manage env vars in a config file
import axios from "axios";
import { getSession } from "next-auth/react";

const TIMEOUTMSG = "Waiting for too long...Aborted!";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeoutErrorMessage: TIMEOUTMSG,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth token
http.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
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
      originalRequest?.url?.includes("/api/v1/orders") ||
      originalRequest?.url?.includes("/api/v1/saves")
    ) {
      return; // Just return without throwing error
    }
    throw error;
  },
);

export default http;
