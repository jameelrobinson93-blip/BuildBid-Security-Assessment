import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");

  }

  return (

    <aside className="admin-sidebar">

      <div className="admin-logo">

        <h2>BuildBid</h2>

        <span>Admin Portal</span>

      </div>

      <nav>

        <NavLink
          to="/admin/dashboard"
          className="admin-link"
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className="admin-link"
        >
          👥 Users
        </NavLink>

        <NavLink
          to="/admin/contractors"
          className="admin-link"
        >
          👷 Contractors
        </NavLink>

        <NavLink
          to="/admin/estimates"
          className="admin-link"
        >
          📋 Estimates
        </NavLink>

        <NavLink
          to="/admin/reviews"
          className="admin-link"
        >
          ⭐ Reviews
        </NavLink>

        <NavLink
          to="/admin/security"
          className="admin-link"
        >
          🛡 Security Center
        </NavLink>

        <NavLink
          to="/admin/analytics"
          className="admin-link"
        >
          📈 Analytics
        </NavLink>

        <NavLink
          to="/admin/settings"
          className="admin-link"
        >
          ⚙️ Settings
        </NavLink>

      </nav>

      <button
        className="logout-admin"
        onClick={logout}
      >
        🚪 Logout
      </button>

    </aside>

  );

}