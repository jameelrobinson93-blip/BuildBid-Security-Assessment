import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/admin/login", { replace: true });
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load users.");
      }

      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Delete this user?")) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete user.");
      }

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to delete user.");
    }
  }

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase();

    return users.filter((user) => {
      const name = `${user.first_name ?? ""} ${user.last_name ?? ""}`.toLowerCase();

      return (
        name.includes(term) ||
        (user.email ?? "").toLowerCase().includes(term) ||
        (user.role ?? "").toLowerCase().includes(term)
      );
    });
  }, [users, search]);

  return (
    <AdminLayout>
      <h1>User Management</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading users...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>{user.locked_until ? "🔒 Locked" : "✅ Active"}</td>

                  <td>
                    <button>View</button>

                    <button>Edit</button>

                    <button onClick={() => deleteUser(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}