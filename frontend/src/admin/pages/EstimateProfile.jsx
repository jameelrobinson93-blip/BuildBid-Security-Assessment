import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../components/AdminLayout";

export default function EstimateProfile() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [estimate, setEstimate] = useState(null);

  useEffect(() => {

    loadEstimate();

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

  if (!estimate) {

    return (

      <AdminLayout>

        <h2>Loading Estimate...</h2>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <button onClick={() => navigate(-1)}>

        ← Back

      </button>

      <h1>Estimate Details</h1>

      <hr />

      <div className="profile-grid">

        <div className="profile-card">

          <h2>Project</h2>

          <p>

            <strong>Type:</strong>

            {" "}

            {estimate.project_type}

          </p>

          <p>

            <strong>Status:</strong>

            {" "}

            {estimate.status}

          </p>

          <p>

            <strong>Budget:</strong>

            {" "}

            ${estimate.budget}

          </p>

        </div>

        <div className="profile-card">

          <h2>Customer Request</h2>

          <p>

            <strong>Address:</strong>

            {" "}

            {estimate.address}

          </p>

          <p>

            <strong>Description:</strong>

          </p>

          <p>

            {estimate.description}

          </p>

        </div>

        <div className="profile-card">

          <h2>Assignment</h2>

          <p>

            <strong>Contractor ID:</strong>

            {" "}

            {estimate.contractor_id || "Not Assigned"}

          </p>

          <p>

            <strong>Created:</strong>

            {" "}

            {new Date(

              estimate.created_at

            ).toLocaleString()}

          </p>

        </div>

      </div>

    </AdminLayout>

  );

}