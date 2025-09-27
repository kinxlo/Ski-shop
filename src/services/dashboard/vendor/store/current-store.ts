import { HttpAdapter } from "@/lib/http/http-adapter";
import { tryCatchWrapper } from "@/lib/tools/tryCatchFunction";

type StoreResponse = { success: boolean; data: Store };

// Module-level memoized promise shared across all services.
// Ensures only one network call to `/stores/current` per client runtime session.
let currentStorePromise: Promise<StoreResponse> | null = null;

/**
 * Get current store using a shared memoized Promise.
 * - First call triggers the request.
 * - Concurrent and subsequent calls reuse the same Promise result.
 * - On failure, the cache resets, allowing a future retry.
 */
export const getCurrentStoreCached = (http: HttpAdapter) => {
  if (!currentStorePromise) {
    currentStorePromise = (async () => {
      try {
        const response = await http.get<StoreResponse>("/stores/current");
        if (response?.status === 200) {
          return response.data;
        }
        throw new Error("Failed to fetch store id");
      } catch (error) {
        // Reset to allow retry on next invocation
        currentStorePromise = null;
        throw error;
      }
    })();
  }

  return tryCatchWrapper(async () => {
    return await currentStorePromise!;
  });
};

/**
 * Explicitly clear the cached current store.
 * Call this after actions that may change the user's active store.
 */
export const invalidateCurrentStoreCache = () => {
  currentStorePromise = null;
};
