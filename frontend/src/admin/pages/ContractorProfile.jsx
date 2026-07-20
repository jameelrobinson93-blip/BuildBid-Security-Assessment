import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function ContractorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadContractor();
  }, [id]);

  async function loadContractor() {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.clear();
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/contractors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setContractor(data.contractor);
      } else {
        setError(data.message || "Contractor not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load contractor.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="admin-content">
          <h2>Loading contractor...</h2>
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
            <h1>{contractor.company}</h1>
            <p>Contractor Profile</p>
          </div>
        </div>

        <div className="profile-grid">

          <div className="profile-card">
            <h2>Company Information</h2>

            <p>
              <strong>Company:</strong>{" "}
              {contractor.company || "Not provided"}
            </p>

            <p>
              <strong>Specialty:</strong>{" "}
              {contractor.specialty || "Not provided"}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`status-badge ${
                  contractor.status === "Suspended"
                    ? "suspended"
                    : "active"
                }`}
              >
                {contractor.status || "Active"}
              </span>
            </p>
          </div>

          <div className="profile-card">
            <h2>Location</h2>

            <p>
              <strong>City:</strong>{" "}
              {contractor.city || "Not provided"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {contractor.phone || "Not provided"}
            </p>
          </div>

          <div className="profile-card">
            <h2>Performance</h2>

            <p>
              <strong>Rating:</strong>{" "}
              {contractor.rating ?? "Not Rated"}
            </p>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}