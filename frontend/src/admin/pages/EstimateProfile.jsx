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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.clear();
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);

      const [estimateResponse, contractorResponse] = await Promise.all([
        fetch(`${API_URL}/api/estimates/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch(`${API_URL}/api/contractors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const estimateData = await estimateResponse.json();
      const contractorData = await contractorResponse.json();

      if (estimateResponse.ok && estimateData.success) {
        setEstimate(estimateData.estimate);
      } else {
        setError(estimateData.message || "Estimate not found.");
      }

      if (contractorResponse.ok && contractorData.success) {
        setContractors(contractorData.contractors);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load estimate information.");
    } finally {
      setLoading(false);
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            contractorId: selectedContractor,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setEstimate((prev) => ({
          ...prev,
          contractor_id: Number(selectedContractor),
          status: "Assigned",
        }));

        setSelectedContractor("");

        alert("Contractor assigned successfully.");
      } else {
        alert(data.message || "Unable to assign contractor.");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to assign contractor.");
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-content">
          <h2>Loading Estimate...</h2>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="admin-content">
          <button
            className="primary-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <h2>{error}</h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-content">

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
            <h2>Project Information</h2>

            <p>
              <strong>Project Type:</strong>{" "}
              {estimate.project_type || "Not provided"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status-badge ${
                  estimate.status?.toLowerCase() || "pending"
                }`}
              >
                {estimate.status || "Pending"}
              </span>
            </p>

            <p>
              <strong>Budget:</strong>{" "}
              $
              {Number(estimate.budget || 0).toLocaleString()}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {estimate.address || "Not provided"}
            </p>

            <p>
              <strong>Description:</strong>
            </p>

            <p>
              {estimate.description || "No description provided."}
            </p>
          </div>

          <div className="profile-card">
            <h2>Contractor Assignment</h2>

            <p>
              <strong>Current Contractor:</strong>{" "}
              {contractors.find(
                (c) => c.id === estimate.contractor_id
              )?.company || "Not Assigned"}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {estimate.created_at
                ? new Date(
                    estimate.created_at
                  ).toLocaleString()
                : "Unknown"}
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

              {contractors
                .filter(
                  (contractor) =>
                    contractor.status !== "Suspended"
                )
                .map((contractor) => (
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
              disabled={!selectedContractor}
            >
              Assign Contractor
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}