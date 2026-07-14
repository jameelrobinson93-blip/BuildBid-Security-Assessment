import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

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

          <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>

          <p><strong>Email:</strong> {user?.email}</p>

          <p><strong>Role:</strong> {user?.role}</p>

        </div>

        <div className="card">

          <h2>Quick Actions</h2>

          <button>Request New Estimate</button>

          <button>View My Estimates</button>

          <button>Favorite Contractors</button>

        </div>

      </div>

      <div className="card">

        <h2>Recent Activity</h2>

        <p>
          You have not submitted any estimates yet.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;