import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function ContractorProfile() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [contractor, setContractor] = useState(null);

  useEffect(() => {

    loadContractor();

  }, []);

  async function loadContractor() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

        `${API_URL}/api/contractors/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`

          }

        }

      );

      const data = await response.json();

      if (data.success) {

        setContractor(data.contractor);

      }

    } catch (err) {

      console.error(err);

    }

  }

  if (!contractor) {

    return (

      <AdminLayout>

        <h2>Loading Contractor...</h2>

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

          <h1>{contractor.company}</h1>

          <p>Contractor Profile</p>

        </div>

      </div>

      <div className="profile-grid">

        <div className="profile-card">

          <h2>Company Information</h2>

          <p>

            <strong>Company:</strong>

            {` ${contractor.company}`}

          </p>

          <p>

            <strong>Specialty:</strong>

            {` ${contractor.specialty}`}

          </p>

          <p>

            <strong>Status:</strong>

            {` ${contractor.status}`}

          </p>

        </div>

        <div className="profile-card">

          <h2>Location</h2>

          <p>

            <strong>City:</strong>

            {` ${contractor.city}`}

          </p>

          <p>

            <strong>Phone:</strong>

            {` ${contractor.phone}`}

          </p>

        </div>

        <div className="profile-card">

          <h2>Performance</h2>

          <p>

            <strong>Rating:</strong>

            {` ${contractor.rating}`}

          </p>

        </div>

      </div>

    </AdminLayout>

  );

}