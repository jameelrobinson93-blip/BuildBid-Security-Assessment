import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function Estimates() {

  const navigate = useNavigate();

  const [estimates, setEstimates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    loadEstimates();

  }, []);

  async function loadEstimates() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

        `${API_URL}/api/estimates`,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      const data = await response.json();

      if (data.success) {

        setEstimates(data.estimates);

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function deleteEstimate(id) {

    const confirmDelete = window.confirm(

      "Delete this estimate?"

    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

        `${API_URL}/api/estimates/${id}`,

        {

          method: "DELETE",

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );
async function updateStatus(id, status) {

  const token = localStorage.getItem("token");

  try {

    const response = await fetch(

      `${API_URL}/api/estimates/${id}/status`,

      {

        method: "PUT",

        headers: {

          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`

        },

        body: JSON.stringify({

          status

        })

      }

    );

    const data = await response.json();

    if (data.success) {

      loadEstimates();

    } else {

      alert(data.message);

    }

  } catch (err) {

    console.error(err);

  }

}
      const data = await response.json();

      if (data.success) {

        alert("Estimate deleted.");

        loadEstimates();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  function assignContractor(id) {

    navigate(`/admin/estimates/${id}`);

  }

  const filteredEstimates = estimates.filter(

    (estimate) => {

      const project =

        estimate.project_type?.toLowerCase() || "";

      const address =

        estimate.address?.toLowerCase() || "";

      return (

        project.includes(search.toLowerCase()) ||

        address.includes(search.toLowerCase())

      );

    }

  );

  return (

    <AdminLayout>

      <div className="page-header">

  <div>

    <h1>Estimate Management</h1>

    <p>Manage customer estimate requests.</p>

  </div>

  <button
    className="primary-btn"
    onClick={loadEstimates}
  >
    Refresh
  </button>

</div>

<div className="dashboard-cards">

  <div className="dashboard-card">

    <h2>Total Estimates</h2>

    <h1>{estimates.length}</h1>

  </div>

  <div className="dashboard-card">

    <h2>Pending</h2>

    <h1>

      {
        estimates.filter(
          e => e.status === "Pending"
        ).length
      }

    </h1>

  </div>

  <div className="dashboard-card">

    <h2>Assigned</h2>

    <h1>

      {
        estimates.filter(
          e => e.contractor_id
        ).length
      }

    </h1>

  </div>

  <div className="dashboard-card">

    <h2>Search Results</h2>

    <h1>{filteredEstimates.length}</h1>

  </div>

</div>

<input

  className="search-input"

  type="text"

  placeholder="Search estimates..."

  value={search}

  onChange={(e)=>setSearch(e.target.value)}

/>

      <table className="admin-table">

        <thead>

          <tr>

            <th>Project</th>

            <th>Status</th>

            <th>Budget</th>

            <th>Address</th>

            <th>Contractor</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            filteredEstimates.map((estimate)=>(

              <tr key={estimate.id}>

                <td>

                  {estimate.project_type}

                </td>

                <td>

  <span
    className={
      estimate.status === "Completed"
        ? "status-badge completed"
        : estimate.status === "Approved"
        ? "status-badge approved"
        : "status-badge pending"
    }
  >
    {estimate.status || "Pending"}
  </span>

</td>

                <td>

                  ${estimate.budget}

                </td>

                <td>

                  {estimate.address}

                </td>

               <td>

  {estimate.contractor_name || "Unassigned"}

</td>

                <td>

  <div className="action-buttons">

  <button
    className="view-btn"
    onClick={() =>
      navigate(`/admin/estimates/${estimate.id}`)
    }
  >
    View
  </button>

  <button
    className="approve-btn"
    onClick={() =>
      updateStatus(estimate.id, "Approved")
    }
  >
    Approve
  </button>

  <button
    className="assign-btn"
    onClick={() =>
      assignContractor(estimate.id)
    }
  >
    Assign
  </button>

  <button
    className="complete-btn"
    onClick={() =>
      updateStatus(estimate.id, "Completed")
    }
  >
    Complete
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      deleteEstimate(estimate.id)
    }
  >
    Delete
  </button>

</div>

</td>
              </tr>

            ))

          }

        </tbody>

      </table>

    </AdminLayout>

  );

}