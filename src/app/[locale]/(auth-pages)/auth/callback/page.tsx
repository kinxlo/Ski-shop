/* eslint-disable no-console */
"use client";

import Loading from "@/app/Loading";
import { useSearchParameters } from "@/hooks/use-search-parameters";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { handleGoogleCallback } from "../../actions/auth-action";

const BasePreLoader = () => {
  const router = useRouter();
  const parameters = useParams();
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const code = useSearchParameters("code");
  const [isProcessing, setIsProcessing] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(tCommon("processing") || "Getting credentials from Google...");

  const redirectToLogin = (errorMessage: string) => {
    const locale = parameters.locale as string;
    router.push(`/${locale}/login?error=${encodeURIComponent(errorMessage)}`);
  };

  const redirectToDashboard = () => {
    const locale = parameters.locale as string;
    router.push(`/${locale}/dashboard/home`);
  };

  const verifySession = async (): Promise<boolean> => {
    try {
      setLoadingMessage(tCommon("processing") || "Verifying your session...");
      const response = await fetch("/api/auth/session", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        console.error("Session verification failed:", response.status);
        return false;
      }

      const session = await response.json();
      return !!(session && session.user);
    } catch (error) {
      console.error("Error verifying session:", error);
      return false;
    }
  };

  useEffect(() => {
    const processCallback = async () => {
      try {
        if (!code) {
          redirectToLogin("No authentication code received from Google");
          return;
        }

        setLoadingMessage(tCommon("processing") || "Authenticating with Google...");
        const result = await handleGoogleCallback(code);

        if (!result.success) {
          console.error("Google callback failed:", result.error);
          redirectToLogin(result.error);
          return;
        }

        // Success - verify session is established
        const sessionEstablished = await verifySession();

        if (sessionEstablished) {
          setLoadingMessage(tAuth("loginSuccess") || "Authentication successful! Redirecting...");
          // Small delay for better UX
          setTimeout(() => {
            redirectToDashboard();
          }, 500);
        } else {
          console.error("Session not established after successful authentication");
          redirectToLogin(
            "Authentication succeeded but session could not be established. Please try logging in again.",
          );
        }
      } catch (error) {
        console.error("Callback processing error:", error);
        const errorMessage =
          error instanceof Error ? error.message : "An unexpected error occurred during authentication";
        redirectToLogin(errorMessage);
      } finally {
        setIsProcessing(false);
      }
    };

    if (isProcessing) {
      processCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, router, parameters.locale, isProcessing]);

  return <Loading text={loadingMessage} />;
};

export default BasePreLoader;
