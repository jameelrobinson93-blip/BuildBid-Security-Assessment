import { NavLink } from "react-router-dom";

export default function AdminSidebar() {

  return (

    <aside className="admin-sidebar">

      <h2>BuildBid Admin</h2>

      <nav>

        <NavLink to="/admin/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/admin/users">
          Users
        </NavLink>

        <NavLink to="/admin/contractors">
          Contractors
        </NavLink>

        <NavLink to="/admin/estimates">
          Estimates
        </NavLink>

        <NavLink to="/admin/reviews">
          Reviews
        </NavLink>

        <NavLink to="/admin/security">
          Security
        </NavLink>

        <NavLink to="/admin/analytics">
          Analytics
        </NavLink>

        <NavLink to="/admin/settings">
          Settings
        </NavLink>

      </nav>

    </aside>

  );

}