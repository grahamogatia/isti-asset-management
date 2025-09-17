import { Bell } from "lucide-react";
import un_logo from "@/assets/un_logo.png";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  return (
    <div className="flex">
      <SidebarTrigger />
      <p></p>
    </div>
  );
}

export default Header;
