/* eslint-disable no-console */
"use client";

import Loading from "@/app/Loading";
import { useSearchParameters } from "@/hooks/use-search-parameters";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { handleGoogleCallback } from "../../actions/auth-action";

const BasePreLoader = () => {
  const router = useRouter();
  const parameters = useParams();
  const code = useSearchParameters("code");

  useEffect(() => {
    if (code) {
      console.log("Google auth code received:", code);
      console.log("Starting Google OAuth callback process...");
      // Use the server action to handle Google OAuth callback
      handleGoogleCallback(code)
        .then((result) => {
          console.log("Google callback result:", result);
          if (result.success) {
            // Add a small delay to ensure session is established
            setTimeout(() => {
              console.log("Redirecting to dashboard...");
              // Try to get the current session to debug
              fetch("/api/auth/session")
                .then((response) => response.json())
                .then((session) => {
                  console.log("Current session:", session);
                  if (session && session.user) {
                    console.log("Session user:", session.user);
                    console.log("Session user role:", session.user.role);
                    const locale = parameters.locale as string;
                    router.push(`/${locale}/dashboard/home`);
                  } else {
                    console.error("No session or user found");
                    const locale = parameters.locale as string;
                    router.push(`/${locale}/login?error=` + encodeURIComponent("Session not established"));
                  }
                })
                .catch((error) => {
                  console.error("Error fetching session:", error);
                  const locale = parameters.locale as string;
                  router.push(`/${locale}/login?error=` + encodeURIComponent("Failed to verify session"));
                });
            }, 1000);
          } else {
            // Redirect to login with error on failure
            const errorMessage = result.error || "Google authentication failed";
            const locale = parameters.locale as string;
            router.push(`/${locale}/login?error=` + encodeURIComponent(errorMessage));
            toast.error("Google authentication failed", {
              description: errorMessage,
            });
          }
        })
        .catch((error) => {
          console.error("Google callback error:", error);
          const locale = parameters.locale as string;
          const errorMessage = error.message || "Google authentication failed";
          router.push(`/${locale}/login?error=` + encodeURIComponent(errorMessage));
          toast.error("Authentication Error", {
            description: errorMessage,
          });
        });
    } else {
      // No code received, redirect to login
      console.error("No Google auth code received");
      const locale = parameters.locale as string;
      router.push(`/${locale}/login?error=` + encodeURIComponent("No authentication code received"));
    }
  }, [code, router, parameters.locale]);

  return <Loading text={`Getting credentials from Google...`} />;
};

export default BasePreLoader;
