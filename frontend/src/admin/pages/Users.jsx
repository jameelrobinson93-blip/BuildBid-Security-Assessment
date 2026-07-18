import { useEffect, useState } from "react";
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
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) => {
      const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.role || "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : (user.role || "").toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });

    setFilteredUsers(results);
  }, [users, search, filter]);

  async function loadUsers() {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Session expired.");
      setLoading(false);
      return;
    }

    const response = await fetch(`${API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setUsers(data.users);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
  async function deleteUser(id) {
  if (!window.confirm("Delete this user?")) return;

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } else {
      alert(data.message || "Unable to delete user.");
    }
  } catch (err) {
    console.error(err);
  }
}

 return (
  <AdminLayout>

    <div className="admin-content">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>

          <h1>User Management</h1>

          <p>
            Manage all registered BuildBid users,
            administrators, and contractors.
          </p>

        </div>

      </div>

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon users">

            <Users size={30}/>

          </div>

          <span>Total Users</span>

          <h1>{users.length}</h1>

          <p>Registered Accounts</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon contractors">

            <UserCog size={30}/>

          </div>

          <span>Admins</span>

          <h1>

            {

              users.filter(

                u=>u.role==="admin"

              ).length

            }

          </h1>

          <p>Platform Administrators</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon reviews">

            <Hammer size={30}/>

          </div>

          <span>Contractors</span>

          <h1>

            {

              users.filter(

                u=>u.role==="contractor"

              ).length

            }

          </h1>

          <p>Verified Businesses</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon estimates">

            <User size={30}/>

          </div>

          <span>Customers</span>

          <h1>

            {

              users.filter(

                u=>u.role==="user"

              ).length

            }

          </h1>

          <p>Homeowners</p>

        </div>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-wrapper">

        <Search
          size={20}
          className="search-icon"
        />

        <input

          className="search-input"

          placeholder="Search users..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="filter-row">

        <button

          className={
            filter==="All"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("All")}

        >

          All

        </button>

        <button

          className={
            filter==="admin"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("admin")}

        >

          Admin

        </button>

        <button

          className={
            filter==="contractor"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("contractor")}

        >

          Contractor

        </button>

        <button

          className={
            filter==="user"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("user")}

        >

          Customer

        </button>

      </div>

      {/* =========================
          USERS TABLE
      ========================= */}

      <div className="activity-panel">

        {loading ? (

          <h2>Loading Users...</h2>

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

              {

                filteredUsers.length===0

                ?

                (

                  <tr>

                    <td

                      colSpan="5"

                      style={{

                        textAlign:"center",

                        padding:"60px"

                      }}

                    >

                      No users found.

                    </td>

                  </tr>

                )

                :

                filteredUsers.map(user=>(

                  <tr key={user.id}>

                    <td>

                      <div
                        style={{
                          display:"flex",
                          alignItems:"center",
                          gap:"14px"
                        }}
                      >

                        <div className="table-avatar">

                          {

                            `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`

                          }

                        </div>

                        <div>

                          <strong>

                            {user.first_name} {user.last_name}

                          </strong>

                          <br/>

                          <small>

                            ID #{user.id}

                          </small>

                        </div>

                      </div>

                    </td>

                    <td>

                      {user.email}

                    </td>

                    <td>

                      <span

                        className={`role-badge role-${user.role}`}

                      >

                        {user.role}

                      </span>

                    </td>

                    <td>

                      {

                        user.failed_attempts

                      }

                    </td>

                    <td>

                      <div className="table-actions">

                        <button

                          className="icon-btn view-btn"

                        >

                          <Eye size={18}/>

                        </button>

                        <button

                          className="icon-btn suspend-btn"

                        >

                          <Pencil size={18}/>

                        </button>

                        <button

                          className="icon-btn delete-btn"

                          onClick={()=>

                            deleteUser(user.id)

                          }

                        >

                          <Trash2 size={18}/>

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        )}

      </div>

    </div>

  </AdminLayout>

);

}