import { fontVariables } from "@/lib/tools/font";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "../styles/theme.css";
import "../styles/global.css";

import { Toast } from "@/components/shared/Toast";
import { SkishopThemeProvider } from "@/components/theme";
import { ReactQueryProvider } from "@/lib/react-query/query-provider";
import { MockServiceWorkerProvider } from "@/mocks/mock-provider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Ski Shop",
  description: "Shop Smart and Save More with Ski-Shop",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={cn("", fontVariables)}>
          <SkishopThemeProvider>
            <ReactQueryProvider>
              <NuqsAdapter>
                <NextTopLoader showSpinner={false} />
                <Toast />
                <MockServiceWorkerProvider isEnabled={true}>{children}</MockServiceWorkerProvider>
              </NuqsAdapter>
            </ReactQueryProvider>
          </SkishopThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
