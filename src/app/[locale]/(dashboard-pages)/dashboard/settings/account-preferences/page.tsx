"use client";

import SkiButton from "@/components/shared/button";
import { ConfirmationDialog } from "@/components/shared/dialog/confirmation-dialog";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUserService } from "@/services/externals/user/use-user-service";
import { AlertCircle, Globe, Trash2 } from "lucide-react";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";

export default function AccountPreferencesPage() {
  const t = useTranslations();
  const locale = useLocale();
  const { data: session } = useSession();
  const userId = (session?.user as User)?.id as string | undefined;

  const { useDeleteUser } = useUserService();
  const { mutate: deleteUser, isPending } = useDeleteUser({
    onSuccess: async () => {
      toast.success(t("profile.accountDeleted", { defaultValue: "Account deleted successfully" }));
      await signOut({ redirect: true, callbackUrl: "/login" });
    },
    onError: () => {
      toast.error(t("profile.deleteAccountFailed", { defaultValue: "Failed to delete account" }));
    },
  });

  const handleDeleteAccount = () => {
    if (!userId) {
      toast.error(t("profile.noUserId", { defaultValue: "Unable to identify user account" }));
      return;
    }
    deleteUser(userId);
  };

  return (
    <section className="space-y-8">
      <div>
        <h4 className="">{t("settings.accountPreferences.title", { defaultValue: "Account & Preferences" })}</h4>
        <p className="text-mid-grey-II">
          {t("settings.accountPreferences.subtitle", {
            defaultValue: "Manage your language and account preferences.",
          })}
        </p>
      </div>
      <Card className="mt-6 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="h-4 w-4" />
              {t("settings.language.title", { defaultValue: "Language" })}
            </CardTitle>
            <CardDescription>
              {t("settings.language.description", { defaultValue: "Choose your preferred language." })}
            </CardDescription>
          </div>
          <LanguageToggle />
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-mid-grey-II">
              {t("settings.language.current", { defaultValue: "Current language" })}:
            </span>
            <Badge variant={`default`} className="rounded-full px-3 py-1 uppercase">
              {locale}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/20 shadow-none">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2 text-base">
            <Trash2 className="h-4 w-4" />
            {t("profile.deleteAccount", { defaultValue: "Delete Account" })}
          </CardTitle>
          <CardDescription>
            {t("profile.deleteAccountWarning", {
              defaultValue: "This action is permanent and cannot be undone.",
            })}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-4">
          <Alert variant="destructive">
            <AlertTitle>{t("profile.irreversibleAction", { defaultValue: "Irreversible action" })}</AlertTitle>
            <AlertDescription>
              {t("profile.deleteAccountAdditional", {
                defaultValue: "Deleting your account will remove your data and sign you out immediately.",
              })}
            </AlertDescription>
          </Alert>

          <ConfirmationDialog
            action={{
              title: t("profile.deleteAccount", { defaultValue: "Delete Account" }),
              description: "",
              buttonName: t("profile.confirmAndContinue", { defaultValue: "Confirm and Continue" }),
              showCancelButton: false,
              buttonVariant: "primary",
              pending: isPending,
              onConfirm: handleDeleteAccount,
              headerClassName: `!text-center !text-xl`,
              icon: (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-white">
                  <AlertCircle className="h-8 w-8" />
                </div>
              ),
              content: (
                <div className="space-y-4">
                  <p className="text-foreground text-center text-sm font-semibold">
                    {t("profile.afterDeleteHeading", { defaultValue: "After Successfully Account Delete:" })}
                  </p>
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm dark:border-blue-900/40 dark:bg-blue-950/30">
                    <ul className="list-disc space-y-2 pl-5">
                      <li>
                        {t("profile.deletePointAccess", { defaultValue: "Permanently Unable to Access Account" })}
                      </li>
                      <li>
                        {t("profile.deletePointTransactions", { defaultValue: "All Transactions will be cleared" })}
                      </li>
                      <li>{t("profile.deletePointAutopay", { defaultValue: "All Auto-pay will be canceled" })}</li>
                    </ul>
                  </div>
                  <p className="text-muted-foreground text-center text-xs">
                    {t("profile.deleteMoreDetails", {
                      defaultValue: "For more details on Account Delete, please contact us on ",
                    })}
                    <a href="mailto:support@skicom.com" className="text-primary underline underline-offset-2">
                      support@skicom.com
                    </a>
                  </p>
                </div>
              ),
            }}
          >
            <SkiButton variant="destructive" size="lg" className="w-full sm:w-auto" isDisabled={!userId || isPending}>
              {t("profile.deleteAccount", { defaultValue: "Delete Account" })}
            </SkiButton>
          </ConfirmationDialog>
        </CardContent>
      </Card>
    </section>
  );
}
