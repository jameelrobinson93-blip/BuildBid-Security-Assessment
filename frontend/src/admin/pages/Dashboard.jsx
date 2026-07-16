import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API_URL from "../../config";

export default function Dashboard() {

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    contractors: 0,
    estimates: 0,
    reviews: 0,
    successLogins: 0,
    failedLogins: 0,
    lockedAccounts: 0,
    blockedXSS: 0
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const response = await fetch(
        `${API_URL}/api/dashboard/stats`
      );

      const data = await response.json();

      console.log("Dashboard:", data);

      if (data.success) {

        setStats(data.stats);

      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <AdminLayout>

      <div className="dashboard">

        <div className="dashboard-header">

          <div>

            <h1>BuildBid Admin Dashboard</h1>

            <p>

              Welcome back! Here's what's happening
              across your platform.

            </p>

          </div>

        </div>

        {loading ? (

          <h2>Loading Dashboard...</h2>

        ) : (

          <>

            <div className="dashboard-cards">

              <div className="dashboard-card">

                <span>Total Users</span>

                <h1>{stats.users}</h1>

                <p>Registered Customers</p>

              </div>

              <div className="dashboard-card">

                <span>Contractors</span>

                <h1>{stats.contractors}</h1>

                <p>Verified Contractors</p>

              </div>

              <div className="dashboard-card">

                <span>Estimates</span>

                <h1>{stats.estimates}</h1>

                <p>Total Requests</p>

              </div>

              <div className="dashboard-card">

                <span>Reviews</span>

                <h1>{stats.reviews}</h1>

                <p>Customer Reviews</p>

              </div>

            </div>

            <div className="security-panel">

              <h2>Security Overview</h2>

              <div className="security-grid">

                <div className="security-box">

                  <span>Successful Logins</span>

                  <h2>{stats.successLogins}</h2>

                </div>

                <div className="security-box">

                  <span>Failed Logins</span>

                  <h2>{stats.failedLogins}</h2>

                </div>

                <div className="security-box">

                  <span>Locked Accounts</span>

                  <h2>{stats.lockedAccounts}</h2>

                </div>

                <div className="security-box">

                  <span>Blocked XSS</span>

                  <h2>{stats.blockedXSS}</h2>

                </div>

              </div>

            </div>

            <div className="activity-panel">

              <h2>System Status</h2>

              <table>

                <thead>

                  <tr>

                    <th>Service</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  <tr>

                    <td>Backend API</td>

                    <td>🟢 Online</td>

                  </tr>

                  <tr>

                    <td>PostgreSQL</td>

                    <td>🟢 Connected</td>

                  </tr>

                  <tr>

                    <td>Authentication</td>

                    <td>🟢 Secure</td>

                  </tr>

                  <tr>

                    <td>BuildBid Website</td>

                    <td>🟢 Running</td>

                  </tr>

                </tbody>

              </table>

            </div>

          </>

        )}

      </div>

    </AdminLayout>

  );

}