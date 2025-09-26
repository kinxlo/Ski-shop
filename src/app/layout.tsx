import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import "../styles/global.css";

import { AppThemeProvider } from "@/components/core/miscellaneous/theme-provider";
import { Toast } from "@/components/shared/Toast";
import { ReactQueryProvider } from "@/lib/react-query/query-provider";
// import { MockServiceWorkerProvider } from "@/mocks/mock-provider";
import { fontVariables } from "@/styles/font";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Ski Shop",
  description: "Shop Smart and Save More with Ski-Shop",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const themeInit = `;(function(){try{var de=document.documentElement;var d=de.classList;var v=localStorage.getItem('theme_variant')||'default';d.remove('theme-red','theme-green');if(v==='red'){d.add('theme-red');}else if(v==='green'){d.add('theme-green');}var m=localStorage.getItem('theme_mode')||'system';var prefersDark=(function(){try{return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}catch(_){return false}})();var eff=m==='system'?(prefersDark?'dark':'light'):m;d.toggle('dark',eff==='dark');try{de.dataset.themeMode=eff}catch(_){}}catch(e){}})();`;
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={cn("", fontVariables)}>
          <Script id="theme-variant-init" strategy="beforeInteractive">
            {themeInit}
          </Script>
          <ReactQueryProvider>
            <AppThemeProvider>
              <NuqsAdapter>
                <NextTopLoader showSpinner={false} />
                <Toast />
                {/* <MockServiceWorkerProvider isEnabled={true}> */}
                {children}
                {/* </MockServiceWorkerProvider> */}
              </NuqsAdapter>
            </AppThemeProvider>
          </ReactQueryProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
