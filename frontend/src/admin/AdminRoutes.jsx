import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedAdmin from "./ProtectedAdmin";

import Dashboard from "./pages/Dashboard";
import ContractorProfile from "./pages/ContractorProfile";
import Users from "./pages/Users";
import Contractors from "./pages/Contractors";
import Estimates from "./pages/Estimates";
import Reviews from "./pages/Reviews";
import Security from "./pages/Security";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function AdminRoutes() {

  return (

    <ProtectedAdmin>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/users"
          element={<Users />}
        />
<Route
  path="/contractors/:id"
  element={<ContractorProfile />}
/>
        <Route
          path="/contractors"
          element={<Contractors />}
        />
<Route

  path="/estimates/:id"

  element={<EstimateProfile />}

/>
        <Route
          path="/estimates"
          element={<Estimates />}
        />

        <Route
          path="/reviews"
          element={<Reviews />}
        />

        <Route
          path="/security"
          element={<Security />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </ProtectedAdmin>

  );

}