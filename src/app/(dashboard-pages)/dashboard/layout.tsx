"use client";

import { DashboardSidebar } from "@/components/shared/sidebar/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { sideItems } from "@/lib/constants";

import TopBar from "./_components/top-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="bg-background flex min-h-screen w-full">
        <DashboardSidebar navItems={sideItems} />
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            <header className="flex h-20 shrink-0 items-center gap-2 border-b px-4 py-5">
              <SidebarTrigger className="text-primary -ml-1 size-9" />
              <div className="flex-1">
                <TopBar notificationsCount={12} className="px-6" />
              </div>
            </header>
            <main className="max-w-full flex-1 overflow-auto bg-[#F7F9FC] p-6 dark:bg-black">
              <div className="mx-auto max-w-[1400px] space-y-6">{children}</div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
