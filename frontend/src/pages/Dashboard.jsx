import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config.js";
import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [estimates, setEstimates] = useState([]);

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

  }, []);

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

              <h3>
                {estimate.project_type}
              </h3>

              <p>

                <strong>Status:</strong>{" "}

                {estimate.status}

              </p>

              <p>

                <strong>Budget:</strong>{" "}

                $

                {Number(
                  estimate.budget
                ).toLocaleString()}

              </p>

              <p>

                <strong>Address:</strong>{" "}

                {estimate.address}

              </p>

              <p>

                <strong>Description:</strong>{" "}

                {estimate.description}

              </p>

              <p>

                <strong>Submitted:</strong>{" "}

                {new Date(
                  estimate.created_at
                ).toLocaleDateString()}

              </p>

              <hr />

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default Dashboard;