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

        onClick={() => navigate(-1)}

      >

        ← Back

      </button>

      <h1>

        {contractor.company}

      </h1>

      <hr />

      <div className="profile-grid">

        <div className="profile-card">

          <h2>Company Information</h2>

          <p>

            <strong>Company:</strong>

            {" "}

            {contractor.company}

          </p>

          <p>

            <strong>Status:</strong>

            {" "}

            {contractor.status || "Active"}

          </p>

          <p>

            <strong>Rating:</strong>

            {" "}

            {contractor.rating || "N/A"}

          </p>

        </div>

        <div className="profile-card">

          <h2>Contact</h2>

          <p>

            <strong>Email:</strong>

            {" "}

            {contractor.email}

          </p>

          <p>

            <strong>Phone:</strong>

            {" "}

            {contractor.phone}

          </p>

          <p>

            <strong>Address:</strong>

            {" "}

            {contractor.address}

          </p>

        </div>

        <div className="profile-card">

          <h2>Business Details</h2>

          <p>

            <strong>License:</strong>

            {" "}

            {contractor.license_number || "Not Provided"}

          </p>

          <p>

            <strong>Insurance:</strong>

            {" "}

            {contractor.insurance || "Not Provided"}

          </p>

          <p>

            <strong>Years in Business:</strong>

            {" "}

            {contractor.years_experience || "N/A"}

          </p>

        </div>

        <div className="profile-card">

          <h2>Performance</h2>

          <p>

            <strong>Completed Jobs:</strong>

            {" "}

            {contractor.jobs_completed || 0}

          </p>

          <p>

            <strong>Pending Jobs:</strong>

            {" "}

            {contractor.jobs_pending || 0}

          </p>

          <p>

            <strong>Average Rating:</strong>

            {" "}

            {contractor.rating || "N/A"}

          </p>

        </div>

      </div>

    </AdminLayout>

  );

}