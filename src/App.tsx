import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import { Route, Routes } from "react-router-dom";
import { useSidebar } from "./components/ui/sidebar";
import { cn } from "./lib/utils";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Assets = lazy(() => import("@/pages/Assets"));
const Borrow = lazy(() => import("@/pages/Borrow"));
const Issuance = lazy(() => import("@/pages/Issuance"));
const Repair = lazy(() => import("@/pages/Repair"));
const Settings = lazy(() => import("@/pages/Settings"));
const CategoriesPage = lazy(() => import("@/components/pages/settings/categories/CategoriesPage"));
const AssetConfigPage = lazy(() => import("@/components/pages/settings/AssetConfigPage"));
const RecycleBinPage = lazy(() => import("@/components/pages/settings/RecycleBinPage"));
const InsurancePage = lazy(() => import("@/components/pages/settings/InsurancePage"));
const AssetBatchUploadPage = lazy(() => import("@/components/pages/assets/AssetBatchUploadPage"));

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
    <div className="p-4 pl-0 bg-zinc-100 h-screen">
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
            <Route
              path="/"
              element={
                <Suspense fallback={<>Loading...</>}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route path="assets" element={<Assets />} />
            <Route path="assets/batch" element={<AssetBatchUploadPage />} />
            <Route path="borrow" element={<Borrow />} />
            <Route path="issuance" element={<Issuance />} />
            <Route path="repair" element={<Repair />} />
            <Route path="settings" element={<Settings />}>
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="config" element={<AssetConfigPage />} />
              <Route path="insurance" element={<InsurancePage />} />
              <Route path="recycle_bin" element={<RecycleBinPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
