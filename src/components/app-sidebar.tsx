"use client";
import {
  Home,
  LogOut,
  Search,
  Settings,
  LayoutDashboard,
  FileQuestionIcon,
  LogOutIcon,
} from "lucide-react";
// import { useSidebar } from "@/components/ui/sidebar"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Give-Feedback",
    url: "/all-questions",
    icon: FileQuestionIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Log Out",
    icon: LogOut,
    onClick: () => signOut({ callbackUrl: "/" }),
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} onClick={item.onClick} className="cursor-pointer">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
