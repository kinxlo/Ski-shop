import { useAppService } from "@/services/externals/app/use-app-service";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useSaveProduct = (productId: string) => {
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
      toast.error("Failed to remove product from favorites");
    },
  });

  // Toggle save/unsave
  const toggleSave = useCallback(() => {
    if (!productId) {
      toast.error("Product ID is missing");
      return;
    }

    // Optimistic update
    setLocalIsSaved(!localIsSaved);

    if (localIsSaved) {
      // Remove from favorites
      removeFromFavorites(productId);
    } else {
      // Save product
      saveProduct({ productId });
    }
  }, [productId, localIsSaved, saveProduct, removeFromFavorites]);

  return {
    isSaved: localIsSaved,
    isPending: isSaving || isRemoving,
    toggleSave,
  };
};
