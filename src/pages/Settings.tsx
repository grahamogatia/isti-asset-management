import { SettingsSidebar } from "@/components/ui/settings-sidebar";
import { Outlet } from "react-router-dom";



function Settings() {
  return (
    <div className="flex h-screen">
      <div className="w-auto-full" id="sidebar">
        <SettingsSidebar />
      </div>
      <div className="flex-1 pl-2" id="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;
