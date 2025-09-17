import { Bell } from "lucide-react";
import un_logo from "@/assets/un_logo.png";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  return (
    <div className="flex border h-18 items-center ">
      <SidebarTrigger />
      <p>Test</p>
    </div>
  );
}

export default Header;
