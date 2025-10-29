import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Factory, Layers, Recycle, Settings2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const settingsMenu = [
  {
    title: "Categories",
    url: "categories",
    icon: Layers,
  },
  {
    title: "Asset Configurations",
    url: "asset_config",
    icon: Settings2,
  },
  {
    title: "Recycle Bin",
    url: "recycle_bin",
    icon: Recycle,
  },
  {
    title: "Factory Reset",
    url: "factory_reset",
    icon: Factory,
  },
];

export function SettingsSidebar() {
  const location = useLocation();

  const isActiveItem = (url: string) => {
    return location.pathname.startsWith(`/settings/${url}`);
  };

  return (
    <Sidebar collapsible="none" className="bg-white border-r text-zinc-500">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsMenu.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveItem(item.url)}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 transition-all",
                      "hover:bg-zinc-100 hover:text-zinc-900",
                      isActiveItem(item.url)
                        ? "!text-zinc-950 !bg-[#f5f5f5]"
                        : "text-zinc-500"
                    )}
                  >
                    <Link to={`/settings/${item.url}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
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
