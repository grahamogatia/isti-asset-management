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
  const { state } = useSidebar();

  return (
    <>
      <Header />
      <div
        className={cn(
          "p-2",
          state === "collapsed"
            ? "max-w-[calc(100vw-3rem)]"
            : "max-w-[calc(100vw-14rem)]"
        )}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="borrow" element={<Borrow />} />
          <Route path="issuance" element={<Issuance />} />
          <Route path="repair" element={<Repair />} />
          <Route path="settings" element={<Settings />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;
