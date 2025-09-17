import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Boxes,
  CalendarSync,
  LayoutDashboard,
  MonitorUp,
  Wrench,
} from "lucide-react";
import un_logo from "@/assets/un_logo.png";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Assets",
    url: "assets",
    icon: Boxes,
  },
  {
    title: "Repair",
    url: "repair",
    icon: Wrench,
  },
  {
    title: "Borrow",
    url: "borrow",
    icon: CalendarSync,
  },
  {
    title: "Issuance",
    url: "issuance",
    icon: MonitorUp,
  },
];

export function AppSidebar() { 

    const {state} = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className={cn(state==="collapsed"? "": "p-2")}>
        <SidebarHeader>
          <div className={cn(state === "collapsed" ? "pt-4.5": "px-2.5", "flex items-center gap-3 transition-all")}>
            <img src={un_logo} className={cn(state === "collapsed" ? "w-8" : "w-14", "h-auto transition-all")}/>
            <h1 className={cn(state==="collapsed" ? "hidden" : "text-left font-semibold", "leading-tight")}>
              Asset
              <br />
              Management
            </h1>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
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
