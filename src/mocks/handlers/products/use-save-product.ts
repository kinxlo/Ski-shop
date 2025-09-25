import { queryClient } from "@/lib/react-query/query-client";
import { queryKeys } from "@/lib/react-query/query-keys";
import { useAppService } from "@/services/externals/app/use-app-service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useSaveProduct = (productId: string, product?: Product) => {
  const { useGetSavedProducts, useSaveProduct, useRemoveFromFavorites } = useAppService();

  // Get saved products to check if current product is saved
  const { data: savedProductsData } = useGetSavedProducts();
  const savedProductIds = savedProductsData?.data?.items?.map((product: Product) => product.id) || [];
  const isSaved = productId ? savedProductIds.includes(productId) : false;

  // Local state for optimistic updates
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);

  // Update local state when server state changes
  useEffect(() => {
    setLocalIsSaved(isSaved);
  }, [isSaved]);

  // Save product mutation
  const { mutate: saveProduct, isPending: isSaving } = useSaveProduct({
    onSuccess: () => {
      toast.success("Product saved successfully");
    },
    onError: () => {
      setLocalIsSaved(false); // Revert optimistic update
      // Revert query data
      if (product) {
        queryClient.setQueryData(
          queryKeys.product.saved(),
          (oldData: { data: { items: Product[]; metadata: { total: number } } } | undefined) => {
            if (!oldData) return oldData;
            const newItems = oldData.data.items.filter((p: Product) => p.id !== productId);
            return {
              ...oldData,
              data: {
                ...oldData.data,
                items: newItems,
                metadata: {
                  ...oldData.data.metadata,
                  total: newItems.length,
                },
              },
            };
          },
        );
      }
      toast.error("Failed to save product");
    },
  });

  // Remove from favorites mutation
  const { mutate: removeFromFavorites, isPending: isRemoving } = useRemoveFromFavorites({
    onSuccess: () => {
      toast.success("Product removed from favorites");
    },
    onError: () => {
      setLocalIsSaved(true); // Revert optimistic update
      // Revert query data
      if (product) {
        queryClient.setQueryData(
          queryKeys.product.saved(),
          (oldData: { data: { items: Product[]; metadata: { total: number } } } | undefined) => {
            if (!oldData) return oldData;
            const newItems = oldData.data.items.some((p: Product) => p.id === productId)
              ? oldData.data.items
              : [...oldData.data.items, product];
            return {
              ...oldData,
              data: {
                ...oldData.data,
                items: newItems,
                metadata: {
                  ...oldData.data.metadata,
                  total: newItems.length,
                },
              },
            };
          },
        );
      }
      toast.error("Failed to remove product from favorites");
    },
  });

  // Toggle save/unsave
  const toggleSave = useCallback(() => {
    if (!productId) {
      toast.error("Product ID is missing");
      return;
    }

    const newIsSaved = !localIsSaved;

    // Optimistic update for local state
    setLocalIsSaved(newIsSaved);

    // Optimistic update for query data
    if (newIsSaved) {
      // Adding to saved
      if (product) {
        queryClient.setQueryData(
          queryKeys.product.saved(),
          (oldData: { data: { items: Product[]; metadata: { total: number } } } | undefined) => {
            if (!oldData) return oldData;
            const newItems = oldData.data.items.some((p: Product) => p.id === productId)
              ? oldData.data.items
              : [...oldData.data.items, product];
            return {
              ...oldData,
              data: {
                ...oldData.data,
                items: newItems,
                metadata: {
                  ...oldData.data.metadata,
                  total: newItems.length,
                },
              },
            };
          },
        );
      }
      saveProduct({ productId });
    } else {
      // Removing from saved
      queryClient.setQueryData(
        queryKeys.product.saved(),
        (oldData: { data: { items: Product[]; metadata: { total: number } } } | undefined) => {
          if (!oldData) return oldData;
          const newItems = oldData.data.items.filter((p: Product) => p.id !== productId);
          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: newItems,
              metadata: {
                ...oldData.data.metadata,
                total: newItems.length,
              },
            },
          };
        },
      );
      removeFromFavorites(productId);
    }
  }, [productId, localIsSaved, product, saveProduct, removeFromFavorites]);

  return {
    isSaved: localIsSaved,
    isPending: isSaving || isRemoving,
    toggleSave,
  };
};
