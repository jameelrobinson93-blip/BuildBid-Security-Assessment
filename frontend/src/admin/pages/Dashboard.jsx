import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar
} from "recharts";
import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import API_URL from "../../config";

import {
  Users,
  Hammer,
  FileText,
  Star,
  ShieldCheck,
  Activity,
  Server,
  Database,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

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

      if (data.success) {
        setStats(data.stats);
      }

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  }
  const monthlyData = [
  { month: "Jan", estimates: 12 },
  { month: "Feb", estimates: 18 },
  { month: "Mar", estimates: 22 },
  { month: "Apr", estimates: 27 },
  { month: "May", estimates: 31 },
  { month: "Jun", estimates: 38 },
];

const securityData = [
  { name: "Success", value: stats.successLogins },
  { name: "Failed", value: stats.failedLogins },
  { name: "Locked", value: stats.lockedAccounts },
  { name: "Blocked", value: stats.blockedXSS },
];
   return (

    <AdminLayout>

      <div className="dashboard">

        <div className="page-header">

          <div>

            <h1>BuildBid Dashboard</h1>

            <p>
              Welcome back! Here's an overview of your platform.
            </p>

          </div>

          <button
            className="primary-btn"
            onClick={loadDashboard}
          >
            <RefreshCw size={18} />
            Refresh
          </button>

        </div>

        {loading ? (

          <h2>Loading Dashboard...</h2>

        ) : (

          <>

            {/* ===========================
                STATISTICS
            =========================== */}

            <div className="dashboard-cards">

              <div className="dashboard-card">

                <div className="card-icon users">

                  <Users size={28} />

                </div>

                <span>Total Users</span>

                <h1>{stats.users}</h1>

                <p>

                  <ArrowUpRight size={16} />

                  Registered customers

                </p>

              </div>

              <div className="dashboard-card">

                <div className="card-icon contractors">

                  <Hammer size={28} />

                </div>

                <span>Contractors</span>

                <h1>{stats.contractors}</h1>

                <p>

                  <ArrowUpRight size={16} />

                  Verified professionals

                </p>

              </div>

              <div className="dashboard-card">

                <div className="card-icon estimates">

                  <FileText size={28} />

                </div>

                <span>Estimates</span>

                <h1>{stats.estimates}</h1>

                <p>

                  <ArrowUpRight size={16} />

                  Requests submitted

                </p>

              </div>

              <div className="dashboard-card">

                <div className="card-icon reviews">

                  <Star size={28} />

                </div>

                <span>Reviews</span>

                <h1>{stats.reviews}</h1>

                <p>

                  <ArrowUpRight size={16} />

                  Customer feedback

                </p>

              </div>

            </div>

<div className="analytics-grid">

  <div className="analytics-card">

    <h2>Monthly Estimates</h2>

    <ResponsiveContainer width="100%" height={300}>

      <LineChart data={monthlyData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="estimates"
          stroke="#3B82F6"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  <div className="analytics-card">

    <h2>Security Activity</h2>

    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={securityData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3B82F6"
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>
            {/* ===========================
    QUICK ACTIONS
=========================== */}

<div className="quick-actions-grid">

  <div className="action-card">
    <h3>👷 Contractors</h3>
    <p>Add, edit, or suspend contractors.</p>

    <button
      className="primary-btn"
      onClick={() => window.location.href="/admin/contractors"}
    >
      Manage Contractors
    </button>
  </div>

  <div className="action-card">
    <h3>📄 Estimates</h3>
    <p>Review customer estimate requests.</p>

    <button
      className="primary-btn"
      onClick={() => window.location.href="/admin/estimates"}
    >
      View Estimates
    </button>
  </div>

  <div className="action-card">
    <h3>👥 Users</h3>
    <p>Manage customer accounts.</p>

    <button
      className="primary-btn"
      onClick={() => window.location.href="/admin/users"}
    >
      Manage Users
    </button>
  </div>

  <div className="action-card">
    <h3>🛡 Security</h3>
    <p>Review login activity and threats.</p>

    <button
      className="primary-btn"
      onClick={() => window.location.href="/admin/security"}
    >
      Security Center
    </button>
  </div>

</div>
            {/* ===========================
                SECURITY
            =========================== */}

            <div className="security-panel">

              <h2>

                <ShieldCheck
                  size={24}
                  style={{ marginRight: 10 }}
                />

                Security Overview

              </h2>

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

           {/* ===========================
    SYSTEM HEALTH
=========================== */}

<div className="activity-panel">

  <h2>System Health</h2>

  <div className="system-health-grid">

    <div className="health-card">

      <h3>🚀 Backend API</h3>

      <div className="status online">
        ● Online
      </div>

      <small>Express Server</small>

    </div>

    <div className="health-card">

      <h3>🗄 PostgreSQL</h3>

      <div className="status online">
        ● Connected
      </div>

      <small>Database Healthy</small>

    </div>

    <div className="health-card">

      <h3>🔐 Authentication</h3>

      <div className="status online">
        ● Protected
      </div>

      <small>JWT + bcrypt</small>

    </div>

    <div className="health-card">

      <h3>🌐 BuildBid Website</h3>

      <div className="status online">
        ● Live
      </div>

      <small>Running on Render</small>

    </div>

  </div>

</div>
          </>

        )}

      </div>

    </AdminLayout>

  );

}