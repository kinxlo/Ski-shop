/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import MainButton from "@/components/shared/button";
import { AlertModal } from "@/components/shared/dialog/alert-modal";
import { FormField } from "@/components/shared/inputs/FormFields";
import { Label } from "@/components/ui/label";
import { Editor } from "@/lib/rich-text-editor";
import { cn } from "@/lib/utils";
import { useDashboardProductService } from "@/services/dashboard/vendor/products/use-product-service";
// import { useAppService } from "@/services/externals/app/use-app-service";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { SerializedEditorState } from "lexical";
import { PaperclipIcon, Trash2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required").optional(),
  price: z.number().min(0, "Price must be positive").optional(),
  discountPrice: z.number().min(0, "Discount price must be positive").optional(),
  description: z.string().optional(),
  // category: z.string().optional(),
  stockCount: z.number().min(0, "Stock count must be positive").optional(),
  images: z.array(z.any()).optional(),
  status: z.enum(["published", "draft"]).default("published").optional(),
});

export type EditProductFormData = z.infer<typeof productSchema>;

interface SortableImageProperties {
  id: string;
  file: File;
  onRemove: (id: string) => void;
  isMain?: boolean;
  onClick?: (id: string) => void;
  isSelected?: boolean;
}

interface EditProductFormProperties {
  product: Product;
  onSuccess?: () => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (submitting: boolean) => void;
}

interface ProductImage {
  id: string;
  file?: File;
  url?: string;
  isExisting?: boolean;
}

const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

const extractTextFromEditorState = (editorState: SerializedEditorState): string => {
  try {
    const root = editorState?.root;
    if (!root?.children) return "";

    let text = "";
    const extractTextFromNode = (node: any) => {
      if (node.text) {
        text += node.text;
      }
      if (node.children) {
        for (const child of node.children) {
          extractTextFromNode(child);
        }
      }
    };

    for (const child of root.children) {
      extractTextFromNode(child);
    }
    return text;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error extracting text from editor state:", error);
    return "";
  }
};

const SortableImage = ({
  id,
  file,
  url,
  onRemove,
  isMain,
  onClick,
  isSelected,
}: SortableImageProperties & { url?: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const imageSource = file ? URL.createObjectURL(file) : url;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick?.(id)}
      className={`relative ${isMain ? "h-full w-full" : "h-20 w-full"} cursor-pointer rounded-md border ${
        isDragging ? "z-10 shadow-lg" : ""
      } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      <BlurImage
        src={imageSource || ""}
        alt={`Preview ${id}`}
        width={isMain ? 600 : 100}
        height={isMain ? 400 : 100}
        className="h-full w-full object-cover"
      />
      <SkiButton
        type="button"
        isIconOnly
        size={`icon`}
        icon={<Trash2Icon className={`!size-2`} />}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(id);
        }}
        className={cn(
          "bg-mid-danger absolute -top-2 -right-2 text-sm text-white transition-opacity hover:opacity-90",
          isSelected && !isMain && "border-mid-danger border-2",
        )}
      />
    </div>
  );
};

// Convert existing images to the format expected by the form
const convertExistingImages = (imageUrls: string[]): ProductImage[] => {
  return imageUrls.map((url, index) => ({
    id: `existing-${index}`,
    url,
    isExisting: true,
  }));
};

export const EditProductForm = ({ product, onSuccess, onCancel }: EditProductFormProperties) => {
  // const { useGetAllProductCategory } = useAppService();
  const { useEditProduct } = useDashboardProductService();
  // const { data: productCategories } = useGetAllProductCategory();
  const { mutateAsync: editProduct, isPending: isEditingProduct } = useEditProduct();

  const methods = useForm<EditProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      // category: product.category || "",
      stockCount: product.stockCount,
      images: product.images ? convertExistingImages(product.images) : [],
      discountPrice: product.discountPrice || 0,
      description: product.description || "",
      status: product.status || "published",
    },
  });

  const { handleSubmit, setValue, watch, reset } = methods;

  const fileInputReference = useRef<HTMLInputElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [descriptionEditorState, setDescriptionEditorState] = useState<SerializedEditorState>(() => {
    if (product.description) {
      return {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: "normal",
                  style: "",
                  text: product.description,
                  type: "text",
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "paragraph",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      } as unknown as SerializedEditorState;
    }
    return {} as SerializedEditorState;
  });
  const images = watch("images") || [];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor),
  );

  // Initialize form with product data when component mounts
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        // category: product.category || "",
        stockCount: product.stockCount,
        images: product.images ? convertExistingImages(product.images) : [],
        discountPrice: product.discountPrice || 0,
        description: product.description || "",
        status: product.status || "published",
      });
    }
  }, [product, reset]);

  const handleDragStart = (event: any) => {
    setActiveId(event.activevent.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      setValue("images", arrayMove(images, oldIndex, newIndex), {
        shouldValidate: true,
      });
    }
    setActiveId(null);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const newFiles = [...files];

      if (images.length + newFiles.length > 4) {
        toast.error("You can upload a maximum of 4 images");
        return;
      }

      const uploadedFiles = newFiles.map((file) => ({
        id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
      }));

      const newImages = [...images, ...uploadedFiles];
      setValue("images", newImages, { shouldValidate: true });

      // Set the first image as selected if no image is currently selected
      if (!selectedImageId && newImages.length > 0) {
        setSelectedImageId(newImages[0].id);
      }
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleImageUpload(event.target.files);
    if (event.target) event.target.value = "";
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleImageUpload(event.dataTransfer.files);
  };

  const handleRemoveImage = (id: string) => {
    const filteredImages = images.filter((img) => img.id !== id);
    setValue("images", filteredImages, { shouldValidate: true });
    // If the removed image was selected, clear the selection
    if (selectedImageId === id) {
      setSelectedImageId(null);
    }
  };

  const handleImageSelect = (id: string) => {
    setSelectedImageId(id);
  };

  const handleSuccessModalConfirm = () => {
    setShowSuccessModal(false);
    onSuccess?.();
  };

  const handleSubmitForm = async (data: EditProductFormData) => {
    try {
      // Ensure all required fields are provided with defaults
      const submitData = {
        ...data,
        images: data?.images?.map((img) => img.url) || [],
        description: data.description || "",
      };

      editProduct(
        { id: product.id, data: submitData },
        {
          onSuccess: (response) => {
            if (response?.success) {
              setShowSuccessModal(true);
            } else {
              toast.error("Failed to update product");
            }
          },
        },
      );
    } catch {
      toast.error("Failed to process product data");
    }
  };

  const activeItem = activeId ? images.find((img) => img.id === activeId) : null;

  return (
    <section className="">
      <div className="mb-8 space-y-2">
        <h3 className="!text-3xl font-bold text-black">Edit Product</h3>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Image upload section - appears first on mobile, right column on desktop */}
          <section className="order-1 lg:order-2 lg:col-span-6">
            <div className="mb-2 gap-2">
              <Label className="text-[16px] font-medium">
                Product Images
                <span className="text-mid-danger ml-1">*</span>
              </Label>
              <span className="text-xs text-gray-500">(At least one image is required)</span>
            </div>
            <div className="space-y-4">
              {/* Main image preview area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => images.length === 0 && fileInputReference.current?.click()}
                className={`flex min-h-[30rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-gray-300 bg-white p-4 hover:bg-gray-100 ${
                  images.length > 0 ? "border-solid p-0" : ""
                }`}
              >
                {images.length > 0 ? (
                  <SortableImage
                    id={
                      selectedImageId
                        ? images.find((img) => img.id === selectedImageId)?.id || images[0].id
                        : images[0].id
                    }
                    file={
                      selectedImageId
                        ? images.find((img) => img.id === selectedImageId)?.file || images[0].file
                        : images[0].file
                    }
                    url={
                      selectedImageId
                        ? images.find((img) => img.id === selectedImageId)?.url || images[0].url
                        : images[0].url
                    }
                    onRemove={handleRemoveImage}
                    isMain
                  />
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <PaperclipIcon />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                      </p>
                    </div>
                    <p className="text-[10px] text-gray-500">Supports: JPG, PNG, WEBP (Max 4 images)</p>
                  </>
                )}
              </div>

              {/* Thumbnail grid with drag-and-drop */}
              {images.length > 0 && (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={images.map((img) => img.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((image) => (
                        <SortableImage
                          key={image.id}
                          id={image.id}
                          file={image.file}
                          url={image.url}
                          onRemove={handleRemoveImage}
                          onClick={handleImageSelect}
                          isSelected={selectedImageId === image.id}
                        />
                      ))}
                      {images.length < 4 && (
                        <div
                          onClick={() => fileInputReference.current?.click()}
                          className="flex h-20 w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50"
                        >
                          <PaperclipIcon size={16} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                  </SortableContext>
                  <DragOverlay adjustScale={true}>
                    {activeItem ? (
                      <div className="h-20 w-full rounded-md border shadow-lg">
                        <BlurImage
                          src={URL.createObjectURL(activeItem.file)}
                          alt={`Preview ${activeItem.id}`}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              )}

              <input
                ref={fileInputReference}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileInputChange}
                accept="image/*"
              />
            </div>
          </section>

          {/* Form fields section - appears second on mobile, left column on desktop */}
          <section className="order-2 space-y-4 lg:order-1 lg:col-span-6">
            <FormField placeholder="Enter name" className="h-14 w-full" label="Product Name" name="name" />
            <div className="grid grid-cols-3 gap-4">
              <FormField placeholder="0.00" className="h-14 w-full" label="Price" name="price" type="number" />
              <FormField
                placeholder="0.00"
                className="h-14 w-full"
                label="Discount Price"
                name="discountPrice"
                type="number"
              />
              <FormField
                placeholder="0.00"
                className="h-14 w-full"
                label="Stock Quantity"
                name="stockCount"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[16px] font-medium">Product Description</Label>
              <div>
                <Editor
                  key={`editor-${product.id}-${product.description}`}
                  editorSerializedState={descriptionEditorState}
                  onSerializedChange={(value) => {
                    setDescriptionEditorState(value);
                    // Convert rich text content to plain text for form validation
                    const plainText = extractTextFromEditorState(value);
                    setValue("description", plainText, { shouldValidate: true });
                  }}
                />
              </div>
            </div>
            {/* <FormField
              placeholder="Select Category"
              className="!h-14 w-full"
              label="Product Category"
              name="category"
              type={`select`}
              options={productCategories?.data.map((category) => ({
                value: category,
                label: category
                  .replaceAll(/([A-Z])/g, " $1") // Add space before capital letters
                  .replace(/^./, (string_) => string_.toUpperCase()) // Capitalize first letter
                  .trim(), // Remove leading/trailing spaces
              }))}
            /> */}
            <FormField
              placeholder="Select Status"
              className="!h-14 w-full"
              label="Product Status"
              name="status"
              type={`select`}
              options={[
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ]}
            />
            <div className="flex gap-4 pt-4">
              <MainButton type="button" variant="outline" onClick={onCancel} className="flex-1" size="xl">
                Cancel
              </MainButton>
              <MainButton
                type="submit"
                variant="primary"
                isDisabled={isEditingProduct}
                isLoading={isEditingProduct}
                className="flex-1"
                size="xl"
              >
                Update Product
              </MainButton>
            </div>
          </section>
        </form>
      </FormProvider>

      {/* Success Modal */}
      <AlertModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onConfirm={handleSuccessModalConfirm}
        type="success"
        title="Product Updated Successfully!"
        description="Your product has been updated and the changes are now live in your store."
        confirmText="Continue"
        showCancelButton={false}
        autoClose={false}
      />
    </section>
  );
};
