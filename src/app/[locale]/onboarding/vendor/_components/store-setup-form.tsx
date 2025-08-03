"use client";

import SkiButton from "@/components/shared/button";
import { FormField } from "@/components/shared/inputs/FormFields";
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField as UIFormField } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaperclipIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const storeSetupSchema = z.object({
  storeName: z.string().min(1, "Store name is required"),
  storeDescription: z.string().min(10, "Store description must be at least 10 characters"),
  storeLogo: z.any().optional(),
  storeCategories: z.array(z.string()).min(1, "At least one category is required"),
});

type StoreSetupFormData = z.infer<typeof storeSetupSchema>;

interface StoreSetupFormProperties {
  data: StoreSetupFormData;
  onComplete: (data: StoreSetupFormData) => void;
}

export const StoreSetupForm = ({ data, onComplete }: StoreSetupFormProperties) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(data.storeCategories || []);
  const [logoFile, setLogoFile] = useState<File | null>(data.storeLogo || null);

  const form = useForm<StoreSetupFormData>({
    resolver: zodResolver(storeSetupSchema),
    defaultValues: {
      ...data,
      storeCategories: selectedCategories,
    },
  });

  const onSubmit = (formData: StoreSetupFormData) => {
    onComplete({
      ...formData,
      storeLogo: logoFile,
      storeCategories: selectedCategories,
    });
  };

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategories((previous) => {
      return previous.includes(category) ? previous.filter((c) => c !== category) : [...previous, category];
    });
  }, []);

  const categories = [
    "Ski Equipment",
    "Snowboarding",
    "Winter Clothing",
    "Accessories",
    "Safety Gear",
    "Training Equipment",
    "Outdoor Sports",
    "Fitness",
  ];

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">Store Setup</h2>
        <p className="text-sm text-gray-600">
          Please provide your business details to continue. Let&apos;s set up your store so buyers can find and trust
          your brand.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField placeholder="Store Name" className="h-14 w-full" name="storeName" />

          <UIFormField
            control={form.control}
            name="storeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your store and what makes it unique..."
                    className="min-h-[100px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload Store Logo</label>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="logo-upload" />
              <label htmlFor="logo-upload" className="cursor-pointer">
                <PaperclipIcon className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">Browse files or drag and drop here</p>
                {logoFile && <p className="mt-1 text-xs text-green-600">{logoFile.name} selected</p>}
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Store Category(s)</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`rounded border p-2 text-xs transition-colors ${
                    selectedCategories.includes(category)
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {selectedCategories.length === 0 && (
              <p className="text-xs text-red-500">Please select at least one category</p>
            )}
          </div>

          <div className="pt-4">
            <SkiButton
              type="submit"
              className="h-12 w-full rounded-lg font-medium"
              variant="primary"
              isDisabled={!form.formState.isValid || selectedCategories.length === 0}
            >
              Next
            </SkiButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
