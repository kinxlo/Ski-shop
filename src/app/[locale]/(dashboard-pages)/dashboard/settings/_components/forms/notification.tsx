"use client";

import MainButton from "@/components/shared/button";
import { SwitchField } from "@/components/shared/inputs/FormFields";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NotificationSettingsData, notificationSettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, ShoppingBag, TrendingUp, Users, Volume2, Zap } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export const NotificationSettingsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<NotificationSettingsData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      appNotifications: true,
      soundNotifications: true,
      newOrders: true,
      orderUpdates: true,
      orderCancellations: true,
      lowStock: true,
      payoutUpdates: true,
      salesMilestones: false,
      newReviews: true,
      customerMessages: true,
      securityAlerts: true,
      systemUpdates: false,
      maintenanceNotifications: true,
      promotionalOffers: false,
      newsUpdates: false,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  const onSubmit = async (data: NotificationSettingsData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Here you would typically make an API call to save the settings
      // await updateNotificationSettings(data);
      toast.success("Settings saved", {
        description: "Your notification preferences have been updated successfully.",
      });
      // Reset form dirty state
      reset(data);
    } catch {
      toast.error("Error", {
        description: "Failed to save notification settings. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="">
        <h4 className="">Notification Settings</h4>
        <p className="text-mid-grey-II">
          Manage how and when you receive notifications about your business and account activity.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General Notifications */}
          <Card className={`shadow-none`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Bell className="text-primary h-5 w-5" />
                <CardTitle className="text-xl">General Notifications</CardTitle>
              </div>
              <CardDescription>Control your overall notification preferences and sound settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="appNotifications"
                label="App Notifications"
                description="Receive push notifications in your browser and mobile app"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="soundNotifications"
                label="Sound Notifications"
                description="Play sound alerts for important notifications"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
            </CardContent>
          </Card>

          {/* Order Management */}
          <Card className={`shadow-none`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-xl">Order Management</CardTitle>
              </div>
              <CardDescription>Stay updated on your order status and customer activity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="newOrders"
                label="New Orders"
                description="Get notified immediately when you receive a new order"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="orderUpdates"
                label="Order Updates"
                description="Receive notifications about order status changes and shipping updates"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="orderCancellations"
                label="Order Cancellations"
                description="Be alerted when customers cancel or request refunds"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
            </CardContent>
          </Card>

          {/* Business Insights */}
          <Card className={`shadow-none`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <CardTitle className="text-xl">Business Insights</CardTitle>
              </div>
              <CardDescription>Important updates about your business performance and operations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="lowStock"
                label="Low Stock Alerts"
                description="Get warned when your products are running low on inventory"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="payoutUpdates"
                label="Payout Updates"
                description="Receive notifications about payment processing and transfers"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="salesMilestones"
                label="Sales Milestones"
                description="Celebrate when you reach sales goals and achievements"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
            </CardContent>
          </Card>

          {/* Customer Engagement */}
          <Card className={`shadow-none`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-xl">Customer Engagement</CardTitle>
              </div>
              <CardDescription>Stay connected with your customers and their feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="newReviews"
                label="New Reviews"
                description="Be notified when customers leave reviews for your products"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="customerMessages"
                label="Customer Messages"
                description="Receive alerts for customer inquiries and support requests"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
            </CardContent>
          </Card>

          {/* System & Security */}
          <Card className={`shadow-none`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-xl">System & Security</CardTitle>
              </div>
              <CardDescription>Important system updates and security notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="securityAlerts"
                label="Security Alerts"
                description="Critical security notifications about your account (always recommended)"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="systemUpdates"
                label="System Updates"
                description="Information about new features and platform improvements"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="maintenanceNotifications"
                label="Maintenance Notifications"
                description="Advance notice of scheduled maintenance and downtime"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
            </CardContent>
          </Card>

          {/* Marketing & Promotions */}
          <Card className={`shadow-none`}>
            <CardHeader className="space-y-1">
              <div className="flex items-center space-x-2">
                <Volume2 className="h-5 w-5 text-pink-600" />
                <CardTitle className="text-xl">Marketing & Promotions</CardTitle>
              </div>
              <CardDescription>Optional marketing communications and promotional content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SwitchField
                name="promotionalOffers"
                label="Promotional Offers"
                description="Receive special offers, discounts, and partnership opportunities"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
              <SwitchField
                name="newsUpdates"
                label="News & Updates"
                description="Industry news, tips, and educational content from Skicom"
                className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {isDirty && (
            <Card className={`shadow-none`}>
              <CardContent className="pt-6">
                <Separator className="mb-6" />
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <MainButton
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                    isDisabled={isLoading}
                    className="sm:w-auto"
                  >
                    Cancel Changes
                  </MainButton>
                  <MainButton variant="primary" type="submit" isDisabled={isLoading} className="sm:w-auto">
                    {isLoading ? "Saving..." : "Save Preferences"}
                  </MainButton>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </FormProvider>
    </div>
  );
};
