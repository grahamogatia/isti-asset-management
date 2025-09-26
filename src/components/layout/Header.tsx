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

    return "Dashboard";
  };

  return (
    <div className="flex h-18 items-center top-0 sticky bg-white border ">
      <SidebarTrigger />
      <p className="font-semibold text-lg ml-4">{getPageTitle()}</p>
    </div>
  );
}

export default Header;
