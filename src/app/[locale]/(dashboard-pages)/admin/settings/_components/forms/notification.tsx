"use client";

import MainButton from "@/components/shared/button";
import { FormField, SwitchField } from "@/components/shared/inputs/FormFields";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAdminSettingsService } from "@/services/dashboard/admin/settings/use-admin-settings-service";
import { BadgePercent, Bell, Gamepad2, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Form model aligned with AdminSettingsPayload usage
const adminSettingsFormSchema = z.object({
  // General
  purchaseEmailNotification: z.boolean().default(true),
  newsAndUpdateEmailNotification: z.boolean().default(false),
  productCreationEmailNotification: z.boolean().default(true),
  payoutEmailNotification: z.boolean().default(true),
  contactEmail: z.string().email().optional().or(z.literal("")),
  alternativeContactEmail: z.string().email().optional().or(z.literal("")),
  // Promotions
  defaultDurationDays: z.coerce.number().int().min(1).optional(),
  // Play2Win
  redemptionWindowDays: z.coerce.number().int().min(1).optional(),
  // Revenue
  gasFee: z.coerce.number().int().min(0).optional(),
});
type AdminSettingsFormData = z.infer<typeof adminSettingsFormSchema>;

export const NotificationSettingsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { useGetMySettings, useUpdateSettings, useCreateSettings } = useAdminSettingsService();

  const { data } = useGetMySettings({ staleTime: 30_000 });
  const updateMutation = useUpdateSettings({
    onSuccess: () => {
      toast.success("Settings updated successfully");
    },
  });
  const createMutation = useCreateSettings({
    onSuccess: () => {
      toast.success("Settings saved successfully");
    },
  });

  const defaults: AdminSettingsFormData = useMemo(
    () => ({
      // General
      purchaseEmailNotification: data?.data?.generalSettings?.purchaseEmailNotification ?? true,
      newsAndUpdateEmailNotification: data?.data?.generalSettings?.newsAndUpdateEmailNotification ?? false,
      productCreationEmailNotification: data?.data?.generalSettings?.productCreationEmailNotification ?? true,
      payoutEmailNotification: data?.data?.generalSettings?.payoutEmailNotification ?? true,
      contactEmail: data?.data?.generalSettings?.contactEmail ?? "",
      alternativeContactEmail: data?.data?.generalSettings?.alternativeContactEmail ?? "",
      // Promotions
      defaultDurationDays: data?.data?.promotionSettings?.defaultDurationDays ?? 7,
      // Play2Win
      redemptionWindowDays: data?.data?.play2winSettings?.redemptionWindowDays ?? 7,
      // Revenue
      gasFee: data?.data?.revenueSettings?.gasFee ?? 1000,
    }),
    [data],
  );

  const methods = useForm<AdminSettingsFormData>({
    values: defaults,
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (data?.success) {
      reset(defaults);
    }
  }, [data, defaults, reset]);

  const onSubmit = async (values: AdminSettingsFormData) => {
    setIsLoading(true);
    // Build AdminSettingsPayload
    const payload: AdminSettingsPayload = {
      generalSetting: {
        purchaseEmailNotification: values.purchaseEmailNotification,
        newsAndUpdateEmailNotification: values.newsAndUpdateEmailNotification,
        productCreationEmailNotification: values.productCreationEmailNotification,
        payoutEmailNotification: values.payoutEmailNotification,
        contactEmail: values.contactEmail || undefined,
        alternativeContactEmail: values.alternativeContactEmail || undefined,
      },
      promotionSetting: {
        defaultDurationDays: values.defaultDurationDays,
      },
      play2winSetting: {
        redemptionWindowDays: values.redemptionWindowDays,
      },
      revenueSetting: {
        gasFee: values.gasFee,
      },
    };

    try {
      // If settings already exist -> update; otherwise create
      const hasExisting = Boolean(data?.success && data?.data?.id);
      if (hasExisting) {
        const settingId = data!.data!.id as string;
        await updateMutation.mutateAsync({ settingId, payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      reset(values);
    } catch (error: unknown) {
      const message = (error as Error)?.message ?? "Unknown error";
      toast.error("Failed to save settings", { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitting = isLoading || updateMutation.isPending || createMutation.isPending;

  return (
    <div className="space-y-8">
      <div className="">
        <h4 className="">Admin Settings</h4>
        <p className="text-mid-grey-II">
          Manage platform-level notifications and key configuration values. All fields are optional and you can update
          any subset at any time.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General Email Notifications */}
          <Card className="shadow-none">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Bell className="text-primary h-5 w-5" />
                <CardTitle className="text-xl">General Email Notifications</CardTitle>
              </div>
              <CardDescription>Toggle platform emails and manage contact addresses.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="purchaseEmailNotification"
                label="Purchase Email Notification"
                description="Receive emails when purchases occur"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="newsAndUpdateEmailNotification"
                label="News & Update Emails"
                description="Receive platform news and updates"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="productCreationEmailNotification"
                label="Product Creation Notification"
                description="Notify when new products are created"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="payoutEmailNotification"
                label="Payout Email Notification"
                description="Notify when payouts occur"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  label="Primary Contact Email"
                  name="contactEmail"
                  type="email"
                  placeholder="info@skishop.com"
                  className="h-12"
                />
                <FormField
                  label="Alternative Contact Email"
                  name="alternativeContactEmail"
                  type="email"
                  placeholder="support@skishop.com"
                  className="h-12"
                />
              </div>
            </CardContent>
          </Card>

          {/* Promotion Settings */}
          <Card className="shadow-none">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <BadgePercent className="h-5 w-5 text-pink-600" />
                <CardTitle className="text-xl">Promotion Settings</CardTitle>
              </div>
              <CardDescription>Defaults used across promotion workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                label="Default Duration (days)"
                name="defaultDurationDays"
                type="number"
                placeholder="7"
                className="h-12"
              />
            </CardContent>
          </Card>

          {/* Play2Win Settings */}
          <Card className="shadow-none">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5 text-green-600" />
                <CardTitle className="text-xl">Play2Win Settings</CardTitle>
              </div>
              <CardDescription>Configure game redemption windows and cadence.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                label="Redemption Window (days)"
                name="redemptionWindowDays"
                type="number"
                placeholder="7"
                className="h-12"
              />
            </CardContent>
          </Card>

          {/* Revenue Settings */}
          <Card className="shadow-none">
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl">Revenue Settings</CardTitle>
              </div>
              <CardDescription>Platform revenue configuration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label="Gas Fee" name="gasFee" type="number" placeholder="1000" className="h-12" />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="shadow-none">
            <CardContent className="pt-6">
              <Separator className="mb-6" />
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <MainButton
                  variant="outline"
                  type="button"
                  onClick={() => reset()}
                  isDisabled={isSubmitting}
                  className="sm:w-auto"
                >
                  Cancel Changes
                </MainButton>
                <MainButton variant="primary" type="submit" isDisabled={isSubmitting} className="sm:w-auto">
                  {isSubmitting ? "Saving..." : "Save"}
                </MainButton>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  );
};
