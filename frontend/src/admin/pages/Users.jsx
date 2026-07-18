import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API_URL from "../../config";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const results = users.filter((user) => {
      const fullName = `${user.first_name || ""} ${user.last_name || ""}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (user.role || "").toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredUsers(results);
  }, [search, users]);

  async function loadUsers() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Admin session expired. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("Users API:", data);

      if (response.ok && data.success) {
        setUsers(data.users || []);
        setFilteredUsers(data.users || []);
      } else {
        alert(data.message || "Unable to load users.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error loading users.");
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
      alert("Server error deleting user.");
    }
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>User Management</h1>
            <p>Manage BuildBid users.</p>
          </div>
        </div>

        <input
          className="search-input"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <h2>Loading Users...</h2>
        ) : (
          <div className="activity-panel">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Failed Attempts</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>

                      <td>
                        {user.first_name} {user.last_name}
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span className={`role-badge role-${user.role}`}>
                          {user.role}
                        </span>
                      </td>

                      <td>{user.failed_attempts}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}