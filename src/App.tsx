import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Borrow from "./pages/Borrow";
import Issuance from "./pages/Issuance";
import Repair from "./pages/Repair";
import { useSidebar } from "./components/ui/sidebar";
import { cn } from "./lib/utils";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Sidebar>
        <AppRoutes />
      </Sidebar>
    </>
  );
}

function AppRoutes() {
  const { state, isMobile } = useSidebar();

  return (
    <div className="p-2 pl-0 bg-[oklch(0.97_0_0)] h-screen">
      <div className="bg-white rounded-md h-full flex-col overflow-y-auto">
        <Header />
        <div
          className={cn(
            "p-2 px-0 min-h-0 flex-1",
            !isMobile
              ? state === "collapsed"
                ? "max-w-[calc(100vw-3rem)]"
                : "max-w-[calc(100vw-14rem)]"
              : ""
          )}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="assets" element={<Assets />} />
            <Route path="borrow" element={<Borrow />} />
            <Route path="issuance" element={<Issuance />} />
            <Route path="repair" element={<Repair />} />
            <Route path="settings" element={<Settings />}>
              <Route path="categories" element={<div>Categories</div>} />
              <Route path="asset_config" element={<div>Asset Configurations</div>} />
              <Route path="recycle_bin" element={<div>Recycle Bin</div>} />
              <Route path="factory_reset" element={<div>Factory Reset</div>} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
