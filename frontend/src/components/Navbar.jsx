import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const adminLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);

  useEffect(() => {

    if (adminLoggedIn) {

      loadAlerts();

      const interval = setInterval(() => {

        loadAlerts();

      }, 5000);

      return () => clearInterval(interval);

    }

  }, [adminLoggedIn]);

  async function loadAlerts() {

    const token = localStorage.getItem("token");

    if (!token) return;

    try {

      const response = await fetch(
        `${API_URL}/api/admin/security-events`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {

        setAlerts(data.slice(0, 5));

      }

    } catch (err) {

      console.log(err);

    }

  }

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminLoggedIn");

    navigate("/");

    window.location.reload();

  }

  return (

    <header className="navbar">

      <div className="logo">
        <h2>BuildBid</h2>
      </div>

      <nav className="nav-links">

        <NavLink to="/">Home</NavLink>

        <a href="#services">Services</a>

        <NavLink to="/search">
          Find Contractors
        </NavLink>

        <NavLink to="/reviews">
          Reviews
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

      </nav>

      <div className="nav-buttons">

        <NavLink
          to="/login"
          className="login-btn"
        >
          Login
        </NavLink>

        {adminLoggedIn ? (

          <>

            <div className="notification-area">

              <button
                className="bell-btn"
                onClick={() => setShowAlerts(!showAlerts)}
              >

                🔔

                {alerts.length > 0 && (

                  <span className="alert-count">

                    {alerts.length}

                  </span>

                )}

              </button>

              {showAlerts && (

                <div className="alert-dropdown">

                  <h4>Security Alerts</h4>

                  {alerts.length === 0 ? (

                    <p>No recent alerts.</p>

                  ) : (

                    alerts.map((alert, index) => (

                      <div
                        key={index}
                        className="alert-item"
                      >

                        <strong>

                          {alert.status}

                        </strong>

                        <br />

                        {alert.email}

                        <br />

                        <small>

                          {alert.event_time}

                        </small>

                      </div>

                    ))

                  )}

                </div>

              )}

            </div>

            <NavLink
              to="/admin/dashboard"
              className="admin-btn"
            >
              🛡 SOC Dashboard
            </NavLink>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>

        ) : (

          <NavLink
            to="/admin/login"
            className="admin-btn"
          >
            🛡 Admin
          </NavLink>

        )}

        <NavLink
          to="/estimate"
          className="estimate-btn"
        >
          Get Free Estimates
        </NavLink>

      </div>

    </header>

  );

}