import { isAxiosError } from "axios";
import { toast } from "sonner";

// errorHandler.ts
export const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    const isCartsEndpoint = error.config?.url?.includes("/carts");
    const isUnauthorized = error.response?.status === 401;
    if (isCartsEndpoint && isUnauthorized) {
      return;
    }
  }

  const message = isAxiosError(error)
    ? error.response?.data?.message || "Request failed"
    : error instanceof Error
      ? error.message
      : "Unknown error";

  if (typeof window !== "undefined") {
    toast.error("Oops!, there is an error", {
      description: message,
    });
  }
};
