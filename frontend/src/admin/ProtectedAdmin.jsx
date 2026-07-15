import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token || !user) {

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