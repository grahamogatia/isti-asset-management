import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../ui/app-sidebar"

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  )
}

export default Sidebar;