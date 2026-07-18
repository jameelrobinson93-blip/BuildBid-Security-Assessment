import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Users,
    Hammer,
    FileText,
    Star,
    Shield,
    BarChart3,
    Settings,
    LogOut,
    Building2
} from "lucide-react";

export default function AdminSidebar() {

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("adminLoggedIn");

        window.location.href="/admin/login";

    }

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <div className="logo-icon">

                    <Building2 size={28} />

                </div>

                <div>

                    <h2>BuildBid</h2>

                    <span>Admin Dashboard</span>

                </div>

            </div>

            <nav>

                <NavLink to="/admin/dashboard">

                    <LayoutDashboard size={20} />

                    <span>Dashboard</span>

                </NavLink>

                <NavLink to="/admin/users">

                    <Users size={20} />

                    <span>Users</span>

                </NavLink>

                <NavLink to="/admin/contractors">

                    <Hammer size={20} />

                    <span>Contractors</span>

                </NavLink>

                <NavLink to="/admin/estimates">

                    <FileText size={20} />

                    <span>Estimates</span>

                </NavLink>

                <NavLink to="/admin/reviews">

                    <Star size={20} />

                    <span>Reviews</span>

                </NavLink>

                <NavLink to="/admin/security">

                    <Shield size={20} />

                    <span>Security</span>

                </NavLink>

                <NavLink to="/admin/analytics">

                    <BarChart3 size={20} />

                    <span>Analytics</span>

                </NavLink>

                <NavLink to="/admin/settings">

                    <Settings size={20} />

                    <span>Settings</span>

                </NavLink>

            </nav>

            <button
                className="logout-btn"
                onClick={logout}
            >

                <LogOut size={18} />

                Logout

            </button>

        </aside>

    );

}