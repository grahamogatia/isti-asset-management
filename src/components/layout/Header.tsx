import { SidebarTrigger } from "../ui/sidebar";

function Header() {
  return (
    <div className="flex h-18 items-center ">
      <SidebarTrigger />
      <p>Test</p>
    </div>
  );
}

export default Header;
