import { Bell } from "lucide-react";
import un_logo from "@/assets/un_logo.png";
import { Button } from "../ui/button";

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-3 bg-white shadow z-50">
      <div className="flex items-center gap-10">
        <img className="w-8 h-auto" src={un_logo}/>
        <span className="text-xl font-semibold tracking tight">Asset Management</span>
      </div>
      <nav>
        <Button variant="ghost" size="icon">
            <Bell />
        </Button>
      </nav>
    </header>
  );
}

export default Header;
