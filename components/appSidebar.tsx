'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const MenuItems = [
  { label: "Dashboard", link: "/dashboard" },
  { 
    label: "My Products", 
    link: "/dashboard/products",
  },
  { label: "Settings", link: "/dashboard/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar 
      side="left" 
      className="bg-sidebar text-white border-r border-border w-64 transition-all duration-300"
    >
      <SidebarHeader className="px-6 py-4 text-white">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold">
            PricePulse
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-sidebar text-white">
        <SidebarMenu>
          {MenuItems.map((menuItem) => (
            <SidebarMenuItem key={menuItem.label}>
              <SidebarMenuButton asChild>
                <Link
                  href={menuItem.link}
                  className={cn(
                    "flex items-center justify-between rounded-lg p-3 text-sm",
                    "opacity-70 transition-all duration-200",
                    "hover:opacity-100",
                    "group relative",
                    pathname === menuItem.link && 
                    "bg-primary font-medium"
                  )}
                >
                    <span>{menuItem.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}