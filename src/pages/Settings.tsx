import { SettingsSidebar } from "@/components/ui/settings-sidebar";
import type { AppRoutes } from "@/data/types";
import { Layers, Settings2, Recycle, Factory } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const settingsMenu: AppRoutes[] = [
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

function Settings() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If at /settings (not a sub-route), redirect to first item
    if (location.pathname === "/settings") {
      navigate(`/settings/${settingsMenu[0]}`, { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <div className="flex h-screen">
      <div className="w-auto-full" id="sidebar">
        <SettingsSidebar settingsMenu={settingsMenu}/>
      </div>
      <div className="flex-1 pl-2" id="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
