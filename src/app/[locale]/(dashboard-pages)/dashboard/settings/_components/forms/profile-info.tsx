"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import { FormField } from "@/components/shared/inputs/FormFields";
import { Camera, User } from "lucide-react";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ProfileFormData = {
  fullName: string;
  email: string;
  photo?: File;
};

export const ProfileForm = () => {
  const fileInputReference = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const methods = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const { handleSubmit, setValue } = methods;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("photo", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputReference.current?.click();
  };

  const onSubmit = (data: ProfileFormData) => {
    // Handle form submission
    data;
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="!text-2xl font-semibold">Profile Information</h2>
            <p className="text-gray-600">Edit your profile information</p>
          </div>

          <div className="mt-8 space-y-4">
            <FormField label="Full Name" name="fullName" placeholder="Enter your full name" className="h-12 w-full" />
            <FormField
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full"
            />
          </div>
          {/* Profile Photo Upload */}
          <div className="mt-8 flex w-fit flex-col items-center gap-4">
            <div
              onClick={triggerFileInput}
              className="relative h-32 w-32 cursor-pointer rounded-full border-2 border-dashed border-gray-300 bg-gray-100 hover:border-blue-500"
            >
              {previewImage ? (
                <BlurImage
                  src={previewImage}
                  alt="Profile preview"
                  width={100}
                  height={100}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <User size={32} className="text-gray-400" />
                  <span className="text-sm text-gray-500">Add Photo</span>
                </div>
              )}
              <div className="absolute right-0 bottom-0 rounded-full bg-white p-2 shadow-md">
                <Camera size={16} className="text-blue-500" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputReference}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileInput}
              className="text-center text-sm text-blue-600 hover:text-blue-800"
            >
              Change Photo
            </button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
