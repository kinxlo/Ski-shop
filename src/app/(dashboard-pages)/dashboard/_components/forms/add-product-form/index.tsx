/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import MainButton from "@/components/shared/button";
import { FormField } from "@/components/shared/FormFields";
import { Label } from "@/components/ui/label";
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
import { PaperclipIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  pricevent: z.number().min(0, "Price must be positive"),
  discountPrice: z.number().min(0, "Discount price must be positive").optional(),
  specifications: z.string().min(1, "Specifications are required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.any()).min(1, "At least one image is required").max(4, "Maximum 4 images allowed"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface SortableImageProperties {
  id: string;
  file: File;
  onRemove: (id: string) => void;
  isMain?: boolean;
}

const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

const SortableImage = ({ id, file, onRemove, isMain }: SortableImageProperties) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative ${isMain ? "h-full w-full" : "h-20 w-full"} rounded-md border ${
        isDragging ? "z-10 shadow-lg" : ""
      }`}
    >
      <BlurImage
        src={URL.createObjectURL(file)}
        alt={`Preview ${id}`}
        width={isMain ? 600 : 100}
        height={isMain ? 400 : 100}
        className="h-full w-full object-cover"
      />
      <SkiButton
        type="button"
        isIconOnly
        size={`icon`}
        icon={<X />}
        onClick={(event) => {
          event.stopPropagation();
          onRemove(id);
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-sm text-white transition-opacity hover:opacity-90"
      />
      {/* {isMain && (
        <SkiButton size={`sm`} variant={`outline`} className="absolute">
          Main Image
        </SkiButton>
      )} */}
    </div>
  );
};

export const AddProductForm = () => {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      pricevent: 0,
      discountPrice: 0,
      specifications: "",
      description: "",
      category: "",
      images: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setValue,
    watch,
  } = methods;

  const fileInputReference = useRef<HTMLInputElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const images = watch("images");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor),
  );

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

      setValue("images", [...images, ...uploadedFiles], { shouldValidate: true });
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
  };

  const handleSubmitForm = async (data: ProductFormData) => {
    try {
      // eslint-disable-next-line no-console
      console.log("Product data:", data);
      toast.success("Product added successfully");
    } catch {
      toast.error("Failed to add product");
    }
  };

  const activeItem = activeId ? images.find((img) => img.id === activeId) : null;

  return (
    <section className="">
      <div className="mb-8 space-y-2">
        <h3 className="text-2xl font-semibold text-black">Add Product</h3>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left column (form fields) - unchanged from your original */}
          <section className="space-y-4 lg:col-span-6">
            <FormField
              placeholder="Enter name"
              className="h-14 w-full"
              label="Product Name"
              name="productName"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField placeholder="0.00" className="h-14 w-full" label="Price" name="price" type="number" required />
              <FormField
                placeholder="0.00"
                className="h-14 w-full"
                label="Discount Price"
                name="discountPrice"
                type="number"
              />
            </div>
            <FormField
              placeholder="Enter specifications"
              className="h-40 w-full bg-white"
              label="Product Specifications"
              name="specifications"
              required
              type={`textarea`}
            />
            <FormField
              placeholder="Enter description"
              className="h-14 w-full"
              label="Product Description"
              name="description"
              required
            />
            <FormField
              placeholder="Select Category"
              className="!h-14 w-full"
              label="Product Category"
              name="category"
              required
              type={`select`}
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "clothing", label: "Clothing" },
                { value: "food", label: "Food" },
              ]}
            />
            <div className="pt-4">
              <MainButton
                type="submit"
                variant="primary"
                isDisabled={isSubmitting || !isValid}
                isLoading={isSubmitting}
                className="w-full"
                size="xl"
              >
                Add Product
              </MainButton>
            </div>
          </section>

          {/* Right column (image upload) - maintaining your preferred layout */}
          <section className="lg:col-span-6">
            <Label className="mb-2 text-[16px] font-medium">Product Images</Label>
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
                  <SortableImage id={images[0].id} file={images[0].file} onRemove={handleRemoveImage} isMain />
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
                  <SortableContext items={images.slice(1).map((img) => img.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-4 gap-2">
                      {images.slice(1).map((image) => (
                        <SortableImage key={image.id} id={image.id} file={image.file} onRemove={handleRemoveImage} />
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
        </form>
      </FormProvider>
    </section>
  );
};
