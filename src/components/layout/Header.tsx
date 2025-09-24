import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  return (
    <div className="flex h-18 items-center top-0 sticky bg-white border ">
      <SidebarTrigger />
      <p>Test</p>
    </div>
  );
}

export default Header;
