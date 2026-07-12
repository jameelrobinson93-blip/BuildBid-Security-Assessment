import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestEstimate from "./pages/RequestEstimate";
import Search from "./pages/Search";
import Reviews from "./pages/Reviews";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdmin from "./admin/ProtectedAdmin";

import "./App.css";

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Hide public navbar on admin pages */}
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* Public Pages */}

        <Route path="/" element={<Home />} />

        <Route path="/search" element={<Search />} />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/estimate"
          element={<RequestEstimate />}
        />

        <Route
          path="/reviews"
          element={<Reviews />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin Dashboard */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdmin>
              <AdminDashboard />
            </ProtectedAdmin>
          }
        />

      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}