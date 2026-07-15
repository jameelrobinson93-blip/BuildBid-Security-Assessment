import { useEffect, useState } from "react";
import API_URL from "../../config";
import AdminLayout from "../components/AdminLayout";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    loadUsers();

  }, []);

  async function loadUsers() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {

        setUsers(data.users);

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function deleteUser(id) {

    const confirmDelete = window.confirm(
      "Delete this user?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("User deleted.");

        setUsers(
          users.filter((user) => user.id !== id)
        );

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  const filteredUsers = users.filter((user) => {

    const name =
      `${user.first_name} ${user.last_name}`.toLowerCase();

    return (

      name.includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  });

  return (

    <AdminLayout>

      <h1>User Management</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

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

          {filteredUsers.map((user) => (

            <tr key={user.id}>

              <td>

                {user.first_name} {user.last_name}

              </td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>

                {user.locked_until

                  ? "🔒 Locked"

                  : "✅ Active"}

              </td>

              <td>

                <button>

                  View

                </button>

                <button>

                  Edit

                </button>

                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                >

                  Delete

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </AdminLayout>

  );

}