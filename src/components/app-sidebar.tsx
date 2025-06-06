"use client";
import {
  Home,
  LogOut,
  Search,
 
  LayoutDashboard,
  FileQuestionIcon,

} from "lucide-react";


import { useSession } from "next-auth/react";



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

export function AppSidebar() {
  const { data: session} = useSession();
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
   
      ...(session ? [{
        title: "Logout",
        icon: LogOut,
        onClick: () => signOut( {callbackUrl: "/" }),
      }] : [])
    ];
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
                    <a href={item.url} className="hover:text-yellow-500 ">
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
