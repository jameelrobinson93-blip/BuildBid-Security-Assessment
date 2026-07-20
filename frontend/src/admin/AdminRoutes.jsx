import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Contractors from "./pages/Contractors";
import AddContractor from "./pages/AddContractor";
import ContractorProfile from "./pages/ContractorProfile";
import Estimates from "./pages/Estimates";
import EstimateProfile from "./pages/EstimateProfile";
import Reviews from "./pages/Reviews";
import Security from "./pages/Security";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        index
        element={<Navigate to="dashboard" replace />}
      />

      <Route
        path="dashboard"
        element={<Dashboard />}
      />

    <Route
  path="users"
  element={<Users />}
/>

      <Route
        path="contractors"
        element={<Contractors />}
      />

      <Route
        path="add-contractor"
        element={<AddContractor />}
      />

      <Route
        path="contractors/:id"
        element={<ContractorProfile />}
      />

      <Route
        path="estimates"
        element={<Estimates />}
      />

      <Route
        path="estimates/:id"
        element={<EstimateProfile />}
      />

      <Route
        path="reviews"
        element={<Reviews />}
      />

      <Route
        path="security"
        element={<Security />}
      />

      <Route
        path="analytics"
        element={<Analytics />}
      />

      <Route
        path="settings"
        element={<Settings />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="dashboard"
            replace
          />
        }
      />
    </Routes>
  );
}