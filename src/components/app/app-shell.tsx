
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Home,
  BarChart,
  CircleDollarSign,
  CreditCard,
  Database,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar-menu-button";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex">
        <Sidebar>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton
                    tooltip="INERA"
                    className="bg-transparent hover:bg-transparent"
                  >
                    <Image
                      src="/logo.png"
                      alt="Company Logo"
                      width={32}
                      height={32}
                      priority
                    />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard">
                  <SidebarMenuButton tooltip="Home" isActive={pathname.startsWith("/dashboard")}>
                    <Home />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <Link href="/analytics">
                  <SidebarMenuButton tooltip="Analytics" isActive={pathname.startsWith("/analytics")}>
                    <BarChart />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Finance" isActive={pathname.startsWith("/finance")}>
                    <CircleDollarSign />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
               <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton 
                    tooltip="Integration Hub" 
                    isActive={pathname.startsWith("/integration-hub")}
                    className="text-primary animate-pulse ring-2 ring-primary/50 rounded-lg"
                  >
                    <CreditCard />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="#">
                  <SidebarMenuButton tooltip="Database Backup" isActive={pathname.startsWith("/database-backup")}>
                    <Database />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/">
                  <SidebarMenuButton tooltip="Manage Acounts">
                    <UserCog />
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
