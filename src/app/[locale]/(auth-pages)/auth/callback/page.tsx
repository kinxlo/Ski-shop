/* eslint-disable no-console */
"use client";

import { handleGoogleCallback } from "@/app/(auth-pages)/actions/auth-action";
import Loading from "@/app/Loading";
import { useSearchParameters } from "@/hooks/use-search-parameters";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const BasePreLoader = () => {
  const router = useRouter();
  const code = useSearchParameters("code");

  useEffect(() => {
    if (code) {
      console.log("Google auth code received:", code);
      // Use the server action to handle Google OAuth callback
      handleGoogleCallback(code)
        .then((result) => {
          if (result.success) {
            // Redirect to admin home on success
            router.push("/dashboard/home");
          } else {
            // Redirect to login with error on failure
            router.push("/login?error=" + encodeURIComponent("Google authentication failed"));
            toast.error("Google authentication failed", {
              description: "User not found",
            });
          }
        })
        .catch((error) => {
          console.error("Google callback error:", error);
          router.push("/login?error=" + encodeURIComponent("Google authentication failed"));
        });
    }
  }, [code, router]);

  return <Loading text={`Getting credentials from Google...`} />;
};

export default BasePreLoader;
