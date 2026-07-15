import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config.js";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

const [estimates, setEstimates] = useState([]);

const [editingEstimate, setEditingEstimate] = useState(null);

const [editForm, setEditForm] = useState({
  projectType: "",
  description: "",
  budget: "",
  address: ""
});

  useEffect(() => {

    async function loadEstimates() {

      if (!user) return;

      try {

        const response = await fetch(
          `${API_URL}/api/estimates/${user.id}`
        );

        const data = await response.json();

        if (data.success) {

          setEstimates(data.estimates);

        }

      } catch (err) {

        console.error(err);

      }

    }

    loadEstimates();

}, [user]);

 function startEditing(estimate) {

  console.log("Editing estimate:", estimate);

  setEditingEstimate(estimate.id);

  setEditForm({
    projectType: estimate.project_type || "",
    description: estimate.description || "",
    budget: estimate.budget || "",
    address: estimate.address || ""
  });

}

async function saveEstimate(id) {
  try {
    const response = await fetch(
      `${API_URL}/api/estimates/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      }
    );

    const data = await response.json();

   if (data.success) {

  alert("Estimate updated successfully!");

  setEditingEstimate(null);

  setEstimates(
    estimates.map((estimate) =>
      estimate.id === id
        ? {
            ...estimate,
            project_type: editForm.projectType,
            description: editForm.description,
            budget: editForm.budget,
            address: editForm.address,
          }
        : estimate
    )
  );

} else {

  alert(data.message);

}

  } catch (err) {
    console.error(err);
    alert("Unable to update estimate.");
  }
}
async function deleteEstimate(id) {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this estimate?"
  );

  if (!confirmDelete) return;

  try {

    const response = await fetch(
      `${API_URL}/api/estimates/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Estimate deleted successfully!");

      setEstimates(
        estimates.filter(
          (estimate) => estimate.id !== id
        )
      );

    } else {

      alert(data.message);

    }

  } catch (err) {

    console.error(err);

    alert("Unable to delete estimate.");

  }

}
  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  }

  return (

    <div className="dashboard">

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome back,
            <span> {user?.firstName}</span>
          </h1>

          <p>
            Manage your projects, estimates and contractors.
          </p>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <div className="dashboard-grid">

        <div className="card">

          <h2>My Profile</h2>

          <p>
            <strong>Name:</strong>{" "}
            {user?.firstName} {user?.lastName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Role:</strong>{" "}
            {user?.role}
          </p>

        </div>

        <div className="card">

          <h2>Quick Actions</h2>

          <button
            onClick={() => navigate("/create-estimate")}
          >
            Request New Estimate
          </button>

          <button>
            View My Estimates
          </button>

          <button>
            Favorite Contractors
          </button>

        </div>

      </div>

      <div className="card">

        <h2>My Estimates</h2>

        {estimates.length === 0 ? (

          <p>
            You have not submitted any estimates yet.
          </p>

        ) : (

          estimates.map((estimate) => (

  <div
    key={estimate.id}
    className="estimate-card"
  >

    {editingEstimate === estimate.id ? (

      <>

        <input
          value={editForm.projectType}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              projectType: e.target.value
            })
          }
          placeholder="Project Type"
        />

        <textarea
          value={editForm.description}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              description: e.target.value
            })
          }
          placeholder="Description"
        />

        <input
          value={editForm.budget}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              budget: e.target.value
            })
          }
          placeholder="Budget"
        />

        <input
          value={editForm.address}
          onChange={(e) =>
            setEditForm({
              ...editForm,
              address: e.target.value
            })
          }
          placeholder="Address"
        />

        <div className="estimate-actions">

          <button
            className="save-btn"
            onClick={() => saveEstimate(estimate.id)}
          >
            Save Changes
          </button>

          <button
            className="cancel-btn"
            onClick={() => setEditingEstimate(null)}
          >
            Cancel
          </button>

        </div>

      </>

    ) : (

      <>

        <h3>{estimate.project_type}</h3>

        <p>
          <strong>Status:</strong> {estimate.status}
        </p>

        <p>
          <strong>Budget:</strong> $
          {Number(estimate.budget).toLocaleString()}
        </p>

        <p>
          <strong>Address:</strong> {estimate.address}
        </p>

        <p>
          <strong>Description:</strong> {estimate.description}
        </p>

        <p>
          <strong>Submitted:</strong>{" "}
          {new Date(estimate.created_at).toLocaleDateString()}
        </p>

      </>

    )}

    {editingEstimate !== estimate.id && (

      <div className="estimate-actions">

        <button
          className="edit-btn"
          onClick={() => startEditing(estimate)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteEstimate(estimate.id)}
        >
          Delete
        </button>

      </div>

    )}

       <hr />

  </div>

))

        )}

      </div>

    </div>

  );

}

export default Dashboard;