
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTooltip
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
import { usePathname, useRouter } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar-menu-button";
import { useAuth } from "@/hooks/use-auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut, knownAccounts } = useAuth();
  const router = useRouter();

  const handleAddAccount = () => {
    signOut(true); // pass true to signify we want to add an account
  }
  
  const handleSwitchAccount = (email: string) => {
     router.push(`/user/login?email=${encodeURIComponent(email)}&switch=true`);
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard">
                <SidebarMenuButton
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
                <SidebarTooltip text="Home">
                    <Link href="/dashboard">
                        <SidebarMenuButton
                        isActive={pathname.startsWith("/dashboard")}
                        >
                        <Home />
                        </SidebarMenuButton>
                    </Link>
                </SidebarTooltip>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarTooltip text="Analytics">
                    <Link href="/analytics">
                        <SidebarMenuButton
                        isActive={pathname.startsWith("/analytics")}
                        >
                        <BarChart />
                        </SidebarMenuButton>
                    </Link>
                </SidebarTooltip>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarTooltip text="Finance">
                    <Link href="#">
                        <SidebarMenuButton
                        isActive={pathname.startsWith("/finance")}
                        >
                        <CircleDollarSign />
                        </SidebarMenuButton>
                    </Link>
                </SidebarTooltip>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarTooltip text="Integration Hub">
                    <Link href="#">
                        <SidebarMenuButton
                        isActive={pathname.startsWith("/integration-hub")}
                        className="text-primary animate-pulse ring-2 ring-primary/50 rounded-lg"
                        >
                        <CreditCard />
                        </SidebarMenuButton>
                    </Link>
                </SidebarTooltip>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarTooltip text="Database Backup">
                    <Link href="#">
                        <SidebarMenuButton
                        isActive={pathname.startsWith("/database-backup")}
                        >
                        <Database />
                        </SidebarMenuButton>
                    </Link>
                </SidebarTooltip>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <SidebarTooltip text="Manage Accounts">
                    <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                        <UserCog />
                    </SidebarMenuButton>
                    </DropdownMenuTrigger>
                </SidebarTooltip>
                <DropdownMenuContent
                  className="w-80"
                  side="right"
                  align="end"
                  sideOffset={8}
                >
                   <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3 p-2">
                       <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                          {user?.username ? user.username.charAt(0).toUpperCase() : <User />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-base font-medium leading-none text-foreground">
                          {user?.username || "Current User"}
                        </p>
                        <p className="text-sm leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground tracking-wider px-2">
                        Other accounts
                    </DropdownMenuLabel>
                     {knownAccounts.filter(acc => acc.id !== user?.id).map(account => (
                        <DropdownMenuItem key={account.id} onSelect={() => handleSwitchAccount(account.email)}>
                             <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                                {account.username ? account.username.charAt(0).toUpperCase() : ''}
                                </AvatarFallback>
                            </Avatar>
                           <div className="flex flex-col">
                                <span className="text-sm font-medium">{account.username}</span>
                                <span className="text-xs text-muted-foreground">{account.email}</span>
                           </div>
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                     <DropdownMenuItem onSelect={handleAddAccount}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Add another account</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem onSelect={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
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
