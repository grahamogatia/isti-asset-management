import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
  Settings,
  Wrench,
} from "lucide-react";
import un_logo from "@/assets/un_logo.png";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./separator";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Assets",
    url: "masterlist",
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

const settings = {
  title: "Settings",
  url: "settings",
  icon: Settings,
};

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();

  // Function to check if the current item is active
  const isActiveItem = (itemUrl: string) => {
    if (itemUrl === "/") {
      return location.pathname === "/";
    }
    return location.pathname.includes(itemUrl);
  };

  return (
    <Sidebar collapsible="icon" className="!bg-zinc-200">
      <SidebarContent className={cn(state === "collapsed" ? "" : "p-2", "!bg-zinc-100")}>
        <SidebarHeader>
          <div
            className={cn(
              state === "collapsed" ? "pt-4.5" : "px-2.5",
              "flex items-center gap-3 transition-all"
            )}
          >
            <img
              src={un_logo}
              className={cn(
                state === "collapsed" ? "w-8" : "w-14",
                "h-auto transition-all"
              )}
            />
            <h1
              className={cn(
                state === "collapsed" ? "hidden" : "text-left font-semibold",
                "leading-tight pt-0.5"
              )}
            >
              ISTI Asset
              <br />
              Management
            </h1>
          </div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActiveItem(item.url)}
                      className={cn(
                        "hover:bg-zinc-200 hover:text-zinc-950 transition-all active:bg-zinc-200",
                        isActiveItem(item.url)
                          ? "!text-zinc-50 !bg-zinc-950"
                          : "text-zinc-950"
                      )}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
              <Separator className="my-2" />
              <SidebarMenuItem key={settings.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActiveItem(settings.url)}
                  className={cn(
                    "hover:bg-zinc-200 hover:text-zinc-950 transition-all active:bg-zinc-200",
                    isActiveItem(settings.url)
                      ? "!text-zinc-50 !bg-zinc-950"
                      : "text-zinc-950"
                  )}
                >
                  <Link to={settings.url}>
                    <settings.icon />
                    <span>{settings.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
