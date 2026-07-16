import { NavLink } from "react-router-dom";

export default function AdminSidebar() {

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminLoggedIn");

    window.location.href="/admin/login";

  }

  return (

    <aside className="sidebar">

      <h2>BuildBid</h2>

      <nav>

        <NavLink to="/admin/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/admin/users">
          👤 Users
        </NavLink>

        <NavLink to="/admin/contractors">
          👷 Contractors
        </NavLink>

        <NavLink to="/admin/estimates">
          📄 Estimates
        </NavLink>

        <NavLink to="/admin/reviews">
          ⭐ Reviews
        </NavLink>

        <NavLink to="/admin/security">
          🔒 Security
        </NavLink>

        <NavLink to="/admin/analytics">
          📈 Analytics
        </NavLink>

        <NavLink to="/admin/settings">
          ⚙ Settings
        </NavLink>

      </nav>

      <button
        className="logout-btn"
        onClick={logout}
      >

        Logout

      </button>

    </aside>

  );

}