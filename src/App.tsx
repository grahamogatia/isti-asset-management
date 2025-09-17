import { Route, Routes } from "react-router-dom";
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard';
import Assets from "./pages/Assets";
import Borrow from "./pages/Borrow";
import Issuance from "./pages/Issuance";
import Repair from "./pages/Repair";

function App() {

  return (
    <>
      <Sidebar>
        <Header />
        <div className="p-2">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="assets" element={<Assets />} />
            <Route path="borrow" element={<Borrow />} />
            <Route path="issuance" element={<Issuance />} />
            <Route path="repair" element={<Repair />} />
          </Routes>
        </div>
      </Sidebar>
    </>
  )
}

export default App
