import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="dark  ">
        <AppSidebar />
      </div>
      <div className=" bg-gray-900">
      <SidebarTrigger className=" bg-gray-900 mt-5 ml-4  text-white hover:bg-gray-800 hover:text-yellow-500" />
      </div>
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
