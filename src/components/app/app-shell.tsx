
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  BarChart,
  CircleDollarSign,
  CreditCard,
  Database,
  UserCog,
  LogOut,
  PlusCircle,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar-menu-button";
import { useAuth } from "@/hooks/use-auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <div className="flex">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">
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
                <SidebarMenuButton
                  tooltip="Home"
                  isActive={pathname.startsWith("/dashboard")}
                >
                  <Home />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/analytics">
                <SidebarMenuButton
                  tooltip="Analytics"
                  isActive={pathname.startsWith("/analytics")}
                >
                  <BarChart />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="#">
                <SidebarMenuButton
                  tooltip="Finance"
                  isActive={pathname.startsWith("/finance")}
                >
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
                <SidebarMenuButton
                  tooltip="Database Backup"
                  isActive={pathname.startsWith("/database-backup")}
                >
                  <Database />
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton tooltip="Manage Accounts">
                    <UserCog />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64"
                  side="right"
                  align="end"
                  sideOffset={8}
                >
                   <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 p-2">
                       <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                          {user?.email ? user.email.charAt(0).toUpperCase() : <User />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-foreground">
                          {user?.email || "Current User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          Navigator Account
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem disabled>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Add Account</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1">{children}</main>
    </div>
  );
}
