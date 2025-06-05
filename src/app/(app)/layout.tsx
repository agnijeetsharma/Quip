import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="dark  min-h-screen">
        <AppSidebar />
      </div>
      <SidebarTrigger className="mt-5 bg-white text-black hover:bg-gray-800 hover:text-white" />
      <main className="w-full">{children}</main>
    </SidebarProvider>
  );
}
