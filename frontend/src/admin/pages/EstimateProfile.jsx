import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function EstimateProfile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [estimate, setEstimate] = useState(null);
  const [contractors, setContractors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState("");

  useEffect(() => {
    loadEstimate();
    loadContractors();
  }, []);

  async function loadEstimate() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/estimates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setEstimate(data.estimate);
      }

    } catch (err) {
      console.error(err);
    }

  }

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

  async function assignContractor() {

    if (!selectedContractor) {
      alert("Please select a contractor.");
      return;
    }

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/estimates/${id}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            contractorId: selectedContractor
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Contractor assigned successfully.");

        loadEstimate();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  if (!estimate) {

    return (
      <AdminLayout>
        <h2>Loading Estimate...</h2>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <button
        className="primary-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="page-header">
        <div>
          <h1>Estimate Details</h1>
          <p>Review and assign this estimate.</p>
        </div>
      </div>

      <div className="profile-grid">

        <div className="profile-card">

          <h2>Project</h2>

          <p><strong>Type:</strong> {estimate.project_type}</p>

          <p><strong>Status:</strong> {estimate.status}</p>

          <p><strong>Budget:</strong> ${estimate.budget}</p>

          <p><strong>Address:</strong> {estimate.address}</p>

          <p><strong>Description:</strong></p>

          <p>{estimate.description}</p>

        </div>

        <div className="profile-card">

          <h2>Assign Contractor</h2>

          <p>

            <strong>Current Contractor:</strong>{" "}
{
  contractors.find(
    c => c.id === estimate.contractor_id
  )?.company || "Not Assigned"
}

          </p>

          <p>

            <strong>Created:</strong>{" "}

            {new Date(estimate.created_at).toLocaleString()}

          </p>

          <select
            className="search-input"
            value={selectedContractor}
            onChange={(e) =>
              setSelectedContractor(e.target.value)
            }
          >

            <option value="">
              Select Contractor
            </option>

            {contractors.map((contractor) => (

              <option
                key={contractor.id}
                value={contractor.id}
              >
                {contractor.company}
              </option>

            ))}

          </select>

          <br />
          <br />

          <button
            className="primary-btn"
            onClick={assignContractor}
          >
            Assign Contractor
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}