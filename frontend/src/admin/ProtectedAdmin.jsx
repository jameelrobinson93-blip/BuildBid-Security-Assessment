import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    const storedUser = localStorage.getItem("user");

    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Invalid user data in localStorage.");

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  if (!token || !user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}