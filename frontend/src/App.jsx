import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdmin from "./components/ProtectedAdmin";

/* ===========================
   PUBLIC PAGES
=========================== */

import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestEstimate from "./pages/RequestEstimate";
import Search from "./pages/Search";
import Reviews from "./pages/Reviews";

/* ===========================
   PROTECTED USER PAGES
=========================== */

import Dashboard from "./pages/Dashboard";
import CreateEstimate from "./pages/CreateEstimate";
import ContractorDashboard from "./pages/ContractorDashboard";

/* ===========================
   ADMIN
=========================== */

import AddContractor from "./admin/pages/AddContractor";
import AdminLogin from "./admin/AdminLogin";
import AdminRoutes from "./admin/AdminRoutes";

import "./App.css";

function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>

        {/* ===========================
            PUBLIC ROUTES
        =========================== */}

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

        {/* ===========================
            PROTECTED USER ROUTES
        =========================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-estimate"
          element={
            <ProtectedRoute>
              <CreateEstimate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contractor-dashboard"
          element={
            <ProtectedRoute>
              <ContractorDashboard />
            </ProtectedRoute>
          }
        />

        {/* ===========================
            ADMIN ROUTES
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
          path="/admin/*"
          element={
            <ProtectedAdmin>
              <AdminRoutes />
            </ProtectedAdmin>
          }
        />

        {/* ===========================
            404 PAGE
        =========================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
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