import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    const pathname = location.pathname;

    if (pathname === "/") return "Dashboard";
    if (pathname.includes("assets")) return "Assets";
    if (pathname.includes("repair")) return "Repair";
    if (pathname.includes("borrow")) return "Borrow";
    if (pathname.includes("issuance")) return "Issuance";
    if (pathname.includes("settings")) return "Settings";

    return "Dashboard";
  };

  return (
    <div className="flex h-12 p-4 items-center top-0 sticky bg-white z-50 justify-start">
      <SidebarTrigger />
      <Separator  className="h-10 mx-4" orientation="vertical"/>
      <p className="font-semibold">{getPageTitle()}</p>
    </div>
  );
}

export default Header;
