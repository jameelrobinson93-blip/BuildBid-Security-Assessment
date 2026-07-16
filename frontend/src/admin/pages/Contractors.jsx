import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function Contractors() {

  const navigate = useNavigate();

  const [contractors, setContractors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    loadContractors();

  }, []);

  async function loadContractors() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

  `${API_URL}/api/contractors`,

  {

    headers: {

      Authorization: `Bearer ${token}`

    }

  }

);

      const data = await response.json();

      if (data.success) {

        setContractors(data.contractors);

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function updateStatus(contractor) {

    const token = localStorage.getItem("token");

    const newStatus =

      contractor.status === "Suspended"

        ? "Active"

        : "Suspended";

    try {

      const response = await fetch(

        `${API_URL}/api/contractors/${contractor.id}/status`,

        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

          },

          body: JSON.stringify({

            status: newStatus

          })

        }

      );

      const data = await response.json();

      if (data.success) {

        loadContractors();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function deleteContractor(id) {

    const confirmDelete = window.confirm(

      "Delete this contractor?"

    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

        `${API_URL}/api/contractors/${id}`,

        {

          method: "DELETE",

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      const data = await response.json();

      if (data.success) {

        alert("Contractor deleted.");

        loadContractors();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  const filteredContractors = contractors.filter((contractor) => {
  return contractor.company
    .toLowerCase()
    .includes(search.toLowerCase());
});

return (
  <AdminLayout>
    <div className="admin-content">

      <div className="page-header">
        <div>
          <h1>Contractor Management</h1>
          <p>Manage all contractors registered on BuildBid.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/admin/add-contractor")}
        >
          + Add Contractor
        </button>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>Total Contractors</h2>
          <h1>{contractors.length}</h1>
        </div>

        <div className="dashboard-card">
          <h2>Active</h2>
          <h1>
            {contractors.filter(c => c.status !== "Suspended").length}
          </h1>
        </div>

        <div className="dashboard-card">
          <h2>Suspended</h2>
          <h1>
            {contractors.filter(c => c.status === "Suspended").length}
          </h1>
        </div>

        <div className="dashboard-card">
          <h2>Search Results</h2>
          <h1>{filteredContractors.length}</h1>
        </div>

      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search Contractors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="activity-panel">
        <table>

          <thead>
            <tr>
              <th>Company</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

  {filteredContractors.length === 0 ? (

    <tr>
      <td colSpan="3" style={{ textAlign: "center", padding: "40px" }}>
        No contractors found.
      </td>
    </tr>

  ) : (

    filteredContractors.map((contractor) => (

      <tr key={contractor.id}>

        <td>{contractor.company}</td>

        <td>
          <span
            className={
              contractor.status === "Suspended"
                ? "status-badge suspended"
                : "status-badge active"
            }
          >
            {contractor.status || "Active"}
          </span>
        </td>

        <td>

          <div className="action-buttons">

            <button
              className="view-btn"
              onClick={() =>
                navigate(`/admin/contractors/${contractor.id}`)
              }
            >
              View
            </button>

            <button
              className="status-btn"
              onClick={() => updateStatus(contractor)}
            >
              {contractor.status === "Suspended"
                ? "Activate"
                : "Suspend"}
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteContractor(contractor.id)
              }
            >
              Delete
            </button>

          </div>

        </td>

      </tr>

    ))

  )}

</tbody>

        </table>
      </div>

    </div>
  </AdminLayout>
);
}