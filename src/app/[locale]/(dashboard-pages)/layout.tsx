"use client";

import { DashboardSidebar } from "@/components/shared/sidebar/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useRoleNavigation } from "@/hooks/use-role-navigation";

import TopBar from "./_components/top-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navItems = useRoleNavigation();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          navItems={navItems}
          autoExpandOnActiveChild={true}
          persistExpandedState={true}
          logoProperties={{
            width: 150,
            height: 80,
            className: "transition-all duration-200",
          }}
          className="transition-all duration-300 ease-in-out"
        />
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            <header className="bg-background sticky top-0 z-50 flex h-20 shrink-0 items-center gap-2 border-b px-4 py-5">
              <SidebarTrigger className="text-primary -ml-1 size-9" />
              <div className="flex-1">
                <TopBar notificationsCount={0} className="px-6" />
              </div>
            </header>
            <main className="overflow-auto bg-[#F8F8F9] p-6 dark:bg-[#111111]">
              <div className="mx-auto max-w-[1400px] space-y-6">{children}</div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
