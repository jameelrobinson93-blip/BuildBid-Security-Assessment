import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
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
import Dashboard from "./pages/Dashboard";
import CreateEstimate from "./pages/CreateEstimate";
import ContractorDashboard from "./pages/ContractorDashboard";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ProtectedAdmin from "./admin/ProtectedAdmin";

import "./App.css";

function AppContent() {

  const location = useLocation();

  const isAdminPage =
    location.pathname.startsWith("/admin");

  return (

    <>

      {/* Hide public navbar on admin pages */}

      {!isAdminPage && <Navbar />}

      <Routes>

        {/* ===========================
            PUBLIC PAGES
        =========================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />

        <Route
          path="/estimate"
          element={<RequestEstimate />}
        />

        <Route
          path="/create-estimate"
          element={<CreateEstimate />}
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

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* ===========================
            CONTRACTOR
        =========================== */}

        <Route
          path="/contractor-dashboard"
          element={<ContractorDashboard />}
        />

        {/* ===========================
            ADMIN
        =========================== */}

        <Route
          path="/admin"
          element={
            <Navigate
              to="/admin/login"
              replace
            />
          }
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

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