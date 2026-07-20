/* ==========================================================
   BUILDBID ADMIN DASHBOARD
   USERS PAGE
   SECTION 1 - IMPORTS • STATE • API • LOGIC
========================================================== */

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

import {
  Users as UsersIcon,
  Search,
  Eye,
  Trash2,
  UserCog,
  Hammer,
  User,
  Pencil,
} from "lucide-react";

export default function Users() {
  const navigate = useNavigate();

  /* ==========================================
      STATE
  ========================================== */

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loggedInUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  /* ==========================================
      LOAD USERS
  ========================================== */

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Your session has expired.");
      }

      const response = await fetch(
        `${API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load users."
        );
      }

      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================
      DELETE USER
  ========================================== */

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    if (id === loggedInUser.id) {
      alert("You cannot delete your own account.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete user."
        );
      }

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => user.id !== id
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  /* ==========================================
      DASHBOARD STATISTICS
  ========================================== */

  const stats = useMemo(() => {
    return {
      total: users.length,

      admins: users.filter(
        (user) => user.role === "admin"
      ).length,

      contractors: users.filter(
        (user) => user.role === "contractor"
      ).length,

      customers: users.filter(
        (user) => user.role === "user"
      ).length,
    };
  }, [users]);

  /* ==========================================
      FILTER USERS
  ========================================== */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();

      const term = search.toLowerCase();

      const matchesSearch =
        fullName.includes(term) ||
        (user.email || "").toLowerCase().includes(term) ||
        (user.role || "").toLowerCase().includes(term);

      const matchesFilter =
        filter === "All"
          ? true
          : (user.role || "").toLowerCase() ===
            filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [users, search, filter]);

  /* ==========================================================
     END SECTION 1
  ========================================================== */

   /* ==========================================================
     SECTION 2
     PAGE HEADER • STATS • SEARCH • FILTERS
  ========================================================== */

  return (
    <AdminLayout>

      <div className="admin-content">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="page-header">

          <div>

            <h1>User Management</h1>

            <p>
              Manage all registered BuildBid users,
              administrators, and contractors.
            </p>

          </div>

        </div>

        {/* ==========================================
            ERROR MESSAGE
        ========================================== */}

        {error && (

          <div className="error-banner">

            {error}

          </div>

        )}

        {/* ==========================================
            DASHBOARD CARDS
        ========================================== */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon users">

              <UsersIcon size={30} />

            </div>

            <span>Total Users</span>

            <h1>{stats.total}</h1>

            <p>Registered Accounts</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon contractors">

              <UserCog size={30} />

            </div>

            <span>Administrators</span>

            <h1>{stats.admins}</h1>

            <p>Platform Administrators</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon reviews">

              <Hammer size={30} />

            </div>

            <span>Contractors</span>

            <h1>{stats.contractors}</h1>

            <p>Verified Businesses</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon estimates">

              <User size={30} />

            </div>

            <span>Customers</span>

            <h1>{stats.customers}</h1>

            <p>Homeowners</p>

          </div>

        </div>

        {/* ==========================================
            SEARCH BAR
        ========================================== */}

        <div className="search-wrapper">

          <Search
            size={20}
            className="search-icon"
          />

          <input
            className="search-input"
            type="text"
            placeholder="Search by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* ==========================================
            FILTER BUTTONS
        ========================================== */}

        <div className="filter-row">

          <button
            className={filter === "All" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("All")}
          >
            All Users
          </button>

          <button
            className={filter === "admin" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("admin")}
          >
            Admins
          </button>

          <button
            className={filter === "contractor" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("contractor")}
          >
            Contractors
          </button>

          <button
            className={filter === "user" ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter("user")}
          >
            Customers
          </button>

        </div>

        {/* ==========================================
            USERS TABLE
        ========================================== */}

        <div className="activity-panel">

          {loading ? (

            <h2 style={{ padding: "50px", textAlign: "center" }}>
              Loading Users...
            </h2>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>User</th>

                  <th>Email</th>

                  <th>Role</th>

                  <th>Failed Logins</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>
                            {filteredUsers.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "60px",
                      }}
                    >
                      No users found.
                    </td>

                  </tr>

                ) : (

                  filteredUsers.map((user) => (

                    <tr key={user.id}>

                      {/* ==========================
                          USER INFORMATION
                      ========================== */}

                      <td>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "14px",
                          }}
                        >

                          <div className="table-avatar">

                            {`${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`}

                          </div>

                          <div>

                            <strong>

                              {user.first_name} {user.last_name}

                            </strong>

                            <br />

                            <small>

                              ID #{user.id}

                            </small>

                          </div>

                        </div>

                      </td>

                      {/* ==========================
                          EMAIL
                      ========================== */}

                      <td>{user.email}</td>

                      {/* ==========================
                          ROLE
                      ========================== */}

                      <td>

                        <span
                          className={`role-badge role-${(
                            user.role || ""
                          ).toLowerCase()}`}
                        >

                          {user.role}

                        </span>

                      </td>

                      {/* ==========================
                          FAILED LOGIN ATTEMPTS
                      ========================== */}

                      <td>

                        {user.failed_attempts ?? 0}

                      </td>

                      {/* ==========================
                          ACTION BUTTONS
                      ========================== */}

                      <td>

                        <div className="table-actions">

                          <button
                            className="icon-btn view-btn"
                            title="View User"
                            onClick={() =>
                              navigate(`/admin/users/${user.id}`)
                            }
                          >

                            <Eye size={18} />

                          </button>

                          <button
                            className="icon-btn suspend-btn"
                            title="Edit User"
                            onClick={() =>
                              navigate(`/admin/users/edit/${user.id}`)
                            }
                          >

                            <Pencil size={18} />

                          </button>

                          <button
                            className="icon-btn delete-btn"
                            title="Delete User"
                            disabled={user.id === loggedInUser.id}
                            onClick={() => deleteUser(user.id)}
                          >

                            <Trash2 size={18} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </AdminLayout>

  );

}

/* ==========================================================
   END USERS PAGE
========================================================== */