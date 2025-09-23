"use client";

import MainButton from "@/components/shared/button";
import { SwitchField } from "@/components/shared/inputs/FormFields";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SecurityPrivacySettingsData, securityPrivacySettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Database, Eye, Lock, Monitor, Shield, ShieldCheck, Smartphone, UserCheck, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { PasswordForm } from "../_components/forms/reset-password";

const SecurityPrivacyPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<SecurityPrivacySettingsData>({
    resolver: zodResolver(securityPrivacySettingsSchema),
    defaultValues: {
      twoFactorEnabled: false,
      loginAlerts: true,
      suspiciousActivityAlerts: true,
      logoutInactiveDevices: false,
      profileVisibility: "business_only",
      showEmailToCustomers: false,
      allowDataCollection: true,
      enableDataExport: true,
      autoDeleteOldData: false,
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
  } = methods;

  const onSubmit = async (data: SecurityPrivacySettingsData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Here you would typically make an API call to save the settings
      // await updateSecurityPrivacySettings(data);

      toast.success("Settings saved", {
        description: "Your security and privacy preferences have been updated successfully.",
      });

      // Reset form dirty state
      reset(data);
    } catch {
      toast.error("Error", {
        description: "Failed to save security and privacy settings. Please try again.",
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
        <h4 className="">Security & Privacy</h4>
        <p className="text-mid-grey-II">
          Manage your account security, privacy settings, and data preferences to keep your information safe.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Password Security */}
        <div className="lg:col-span-2">
          <PasswordForm />
        </div>

        {/* Two-Factor Authentication */}
        <Card className="shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl">Two-Factor Authentication</CardTitle>
            </div>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-card hover:bg-accent/50 flex items-center justify-between rounded-lg border p-4 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Smartphone className="text-muted-foreground h-4 w-4" />
                  <p className="font-medium">SMS Authentication</p>
                  <Badge variant={`outline`} className="text-xs">
                    Recommended
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Receive verification codes via SMS to your registered phone number.
                </p>
              </div>
              <FormProvider {...methods}>
                <SwitchField
                  name="twoFactorEnabled"
                  className="flex items-center"
                  onChange={(checked) => {
                    if (checked) {
                      toast.success("2FA Setup", {
                        description: "Two-factor authentication has been enabled for your account.",
                      });
                    }
                  }}
                />
              </FormProvider>
            </div>
            <div className="flex items-center justify-center rounded-lg border border-dashed p-4">
              <div className="text-center">
                <Shield className="text-muted-foreground mx-auto h-8 w-8" />
                <p className="mt-2 text-sm font-medium">Authenticator App</p>
                <p className="text-muted-foreground text-xs">Coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Login & Security Alerts */}
        <Card className="shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-xl">Login & Security Alerts</CardTitle>
            </div>
            <CardDescription>Get notified about security events on your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <div className="space-y-4">
                <SwitchField
                  name="loginAlerts"
                  label="Login Notifications"
                  description="Get alerted when someone signs into your account"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
                <SwitchField
                  name="suspiciousActivityAlerts"
                  label="Suspicious Activity Alerts"
                  description="Get notified of unusual account activity or security threats"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
              </div>
            </FormProvider>
          </CardContent>
        </Card>

        {/* Session Management */}
        <Card className="shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-xl">Session Management</CardTitle>
            </div>
            <CardDescription>Control how your account sessions are managed across devices.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <div className="space-y-4">
                <SwitchField
                  name="logoutInactiveDevices"
                  label="Auto-logout Inactive Devices"
                  description="Automatically sign out devices that haven't been used for 30 days"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
                <div className="bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-muted-foreground text-sm">2 devices currently signed in</p>
                    </div>
                    <MainButton variant="outline" size="sm">
                      Manage Sessions
                    </MainButton>
                  </div>
                </div>
              </div>
            </FormProvider>
          </CardContent>
        </Card>

        {/* Privacy Controls */}
        <Card className="shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Privacy Controls</CardTitle>
            </div>
            <CardDescription>Control who can see your information and how it&apos;s used.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="font-medium">Profile Visibility</label>
                  <Controller
                    name="profileVisibility"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>Public - Anyone can see</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="business_only">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="h-4 w-4" />
                              <span>Business Only - Customers only</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="flex items-center space-x-2">
                              <Lock className="h-4 w-4" />
                              <span>Private - Hidden from public</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <SwitchField
                  name="showEmailToCustomers"
                  label="Show Email to Customers"
                  description="Allow customers to see your email address for direct contact"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
                <SwitchField
                  name="allowDataCollection"
                  label="Analytics & Data Collection"
                  description="Help improve our services by sharing usage analytics"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
              </div>
            </FormProvider>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="shadow-none">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-indigo-600" />
              <CardTitle className="text-xl">Data Management</CardTitle>
            </div>
            <CardDescription>Control your data storage, export, and deletion preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <div className="space-y-4">
                <SwitchField
                  name="enableDataExport"
                  label="Enable Data Export"
                  description="Allow downloading your account data and business information"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
                <SwitchField
                  name="autoDeleteOldData"
                  label="Auto-delete Old Data"
                  description="Automatically remove data older than 2 years (legal compliance)"
                  className="bg-card hover:bg-accent/50 flex h-16 w-full items-center justify-between rounded-lg border p-4 transition-colors"
                />
                <div className="bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Export Your Data</p>
                      <p className="text-muted-foreground text-sm">Download all your account and business data</p>
                    </div>
                    <MainButton variant="outline" size="sm">
                      Request Export
                    </MainButton>
                  </div>
                </div>
              </div>
            </FormProvider>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isDirty && (
            <Card className="shadow-none">
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
                    {isLoading ? "Saving..." : "Save Changes"}
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

export default SecurityPrivacyPage;
