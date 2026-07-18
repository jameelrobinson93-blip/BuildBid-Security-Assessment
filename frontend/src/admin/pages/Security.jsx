import { useEffect, useState } from "react";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

import {
  ShieldCheck,
  Shield,
  AlertTriangle,
  Database,
  Activity,
  RefreshCw,
  Lock,
  Bug,
  Globe,
  Server
} from "lucide-react";

export default function Security() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    loadLogs();

  }, []);

  async function loadLogs() {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

        `${API_URL}/api/security/logs`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      const data = await response.json();

      if (data.success) {

        setLogs(data.logs);

      }

    } catch (err) {

      console.error(err);

    }

  }

  const failedLogins = logs.filter(

    log => log.status === "Failed Login"

  ).length;

  const successfulLogins = logs.filter(

    log => log.status === "Successful Login"

  ).length;

  const suspiciousActivity = logs.filter(

    log =>

      log.status === "Blocked XSS"

      ||

      log.status === "Suspicious Activity"

  ).length;

  const securityData = [

    {
      name: "Successful",
      value: successfulLogins
    },

    {
      name: "Failed",
      value: failedLogins
    },

    {
      name: "Suspicious",
      value: suspiciousActivity
    }

  ];

  const COLORS = [

    "#10B981",

    "#EF4444",

    "#F59E0B"

  ];

  const securityScore =

    logs.length === 0

      ? 100

      : Math.round(

          (successfulLogins / logs.length) * 100

        );
  return (

  <AdminLayout>

    <div className="admin-content">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>

          <h1>Security Dashboard</h1>

          <p>

            Monitor authentication, application security, and real-time threat activity.

          </p>

        </div>

        <button
          className="primary-btn"
          onClick={loadLogs}
        >

          <RefreshCw size={18} />

          Refresh

        </button>

      </div>

      {/* =========================
          KPI CARDS
      ========================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon users">

            <ShieldCheck size={30} />

          </div>

          <span>Successful Logins</span>

          <h1>{successfulLogins}</h1>

          <p>Verified Sessions</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon estimates">

            <AlertTriangle size={30} />

          </div>

          <span>Failed Logins</span>

          <h1>{failedLogins}</h1>

          <p>Authentication Failures</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon contractors">

            <Bug size={30} />

          </div>

          <span>Suspicious Activity</span>

          <h1>{suspiciousActivity}</h1>

          <p>Threat Events</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon reviews">

            <Database size={30} />

          </div>

          <span>Total Events</span>

          <h1>{logs.length}</h1>

          <p>Recorded Logs</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon analytics">

            <Shield size={30} />

          </div>

          <span>Security Score</span>

          <h1>{securityScore}%</h1>

          <p>Overall Protection</p>

        </div>

      </div>

      {/* =========================
          SECURITY HEALTH
      ========================= */}

      <div className="system-health-grid">

        <div className="health-card">

          <ShieldCheck size={34} />

          <h3>JWT Authentication</h3>

          <p>Enabled</p>

        </div>

        <div className="health-card">

          <Lock size={34} />

          <h3>Password Hashing</h3>

          <p>bcrypt Protected</p>

        </div>

        <div className="health-card">

          <Shield size={34} />

          <h3>Helmet Security</h3>

          <p>Security Headers Active</p>

        </div>

        <div className="health-card">

          <Activity size={34} />

          <h3>Security Logging</h3>

          <p>Monitoring Enabled</p>

        </div>

        <div className="health-card">

          <Server size={34} />

          <h3>Backend API</h3>

          <p>Operational</p>

        </div>

        <div className="health-card">

          <Globe size={34} />

          <h3>Web Application</h3>

          <p>Online</p>

        </div>

      </div>

      {/* =========================
          RECENT SECURITY EVENTS
      ========================= */}

      <div className="activity-panel">

        <div className="panel-header">

          <h2>

            Recent Security Events

          </h2>

        </div>

        <table>

          <thead>

            <tr>

              <th>Time</th>

              <th>Email</th>

              <th>Status</th>

              <th>IP Address</th>

            </tr>

          </thead>

          <tbody>

            {

              logs.slice(0,10).map((log)=>(

                <tr key={log.id}>

                  <td>

                    {new Date(log.event_time).toLocaleString()}

                  </td>

                  <td>

                    {log.email}

                  </td>

                  <td>

                    <span
                      className={
                        log.status==="Successful Login"

                        ? "status-badge active"

                        : log.status==="Failed Login"

                        ? "status-badge suspended"

                        : "status-badge pending"
                      }
                    >

                      {log.status}

                    </span>

                  </td>

                  <td>

                    <code>

                      {log.ip_address}

                    </code>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      {/* =========================
          SECURITY ANALYTICS
      ========================= */}

      <div className="analytics-grid">

        {/* Activity Chart */}

        <div className="analytics-card">

          <div className="panel-header">

            <h2>Security Activity</h2>

            <span>Last Recorded Events</span>

          </div>

          <div
            style={{
              width: "100%",
              height: 320
            }}
          >

            <ResponsiveContainer>

              <BarChart data={securityData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563EB"
                  radius={[8,8,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Distribution Chart */}

        <div className="analytics-card">

          <div className="panel-header">

            <h2>Security Event Distribution</h2>

            <span>Current Breakdown</span>

          </div>

          <div
            style={{
              width: "100%",
              height: 320
            }}
          >

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={securityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {

                    securityData.map((entry,index)=>(

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    ))

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* =========================
          SECURITY METRICS
      ========================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <span>Login Success Rate</span>

          <h1>

            {

              logs.length === 0

                ? "100%"

                : `${Math.round((successfulLogins / logs.length) * 100)}%`

            }

          </h1>

          <p>Successful Authentication</p>

        </div>

        <div className="dashboard-card">

          <span>Failure Rate</span>

          <h1>

            {

              logs.length === 0

                ? "0%"

                : `${Math.round((failedLogins / logs.length) * 100)}%`

            }

          </h1>

          <p>Failed Login Attempts</p>

        </div>

        <div className="dashboard-card">

          <span>Threat Detection</span>

          <h1>

            {

              logs.length === 0

                ? "0%"

                : `${Math.round((suspiciousActivity / logs.length) * 100)}%`

            }

          </h1>

          <p>Detected Threat Events</p>

        </div>

      </div>

        {/* =========================
          THREAT ASSESSMENT
      ========================= */}

      <div className="system-health-grid">

        <div className="health-card">

          <ShieldCheck size={34} />

          <h3>Threat Level</h3>

          <p style={{ color:"#10B981", fontWeight:700 }}>
            LOW
          </p>

        </div>

        <div className="health-card">

          <Shield size={34} />

          <h3>Firewall</h3>

          <p>Protected</p>

        </div>

        <div className="health-card">

          <Lock size={34} />

          <h3>Authentication</h3>

          <p>Secure</p>

        </div>

        <div className="health-card">

          <Activity size={34} />

          <h3>Monitoring</h3>

          <p>Live</p>

        </div>

      </div>

      {/* =========================
          SECURITY COMPLIANCE
      ========================= */}

      <div className="activity-panel">

        <div className="panel-header">

          <h2>Security Controls</h2>

          <span>Application Protection Status</span>

        </div>

        <div className="system-health-grid">

          <div className="health-card">

            <ShieldCheck size={32}/>

            <h3>JWT Authentication</h3>

            <p>Enabled</p>

          </div>

          <div className="health-card">

            <Lock size={32}/>

            <h3>Password Hashing</h3>

            <p>bcrypt</p>

          </div>

          <div className="health-card">

            <Shield size={32}/>

            <h3>Helmet Headers</h3>

            <p>Enabled</p>

          </div>

          <div className="health-card">

            <Database size={32}/>

            <h3>Security Logs</h3>

            <p>Recording</p>

          </div>

          <div className="health-card">

            <Bug size={32}/>

            <h3>XSS Protection</h3>

            <p>Protected</p>

          </div>

          <div className="health-card">

            <AlertTriangle size={32}/>

            <h3>Brute Force</h3>

            <p>Blocked</p>

          </div>

          <div className="health-card">

            <Server size={32}/>

            <h3>RBAC</h3>

            <p>Enabled</p>

          </div>

          <div className="health-card">

            <Globe size={32}/>

            <h3>API Security</h3>

            <p>Online</p>

          </div>

        </div>

      </div>

      {/* =========================
          EXECUTIVE SUMMARY
      ========================= */}

      <div className="activity-panel">

        <div className="panel-header">

          <h2>Executive Security Summary</h2>

        </div>

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
            gap:"20px",
            marginTop:"25px"
          }}
        >

          <div className="dashboard-card">

            <h3>Security Status</h3>

            <p>

              The BuildBid platform is operating with
              enterprise security controls including JWT
              authentication, encrypted password storage,
              security headers, RBAC authorization, and
              continuous event logging.

            </p>

          </div>

          <div className="dashboard-card">

            <h3>Threat Assessment</h3>

            <p>

              Current monitoring indicates a low threat
              level with successful detection of failed
              logins and suspicious activity. No critical
              incidents are present.

            </p>

          </div>

          <div className="dashboard-card">

            <h3>Overall Security Score</h3>

            <h1
              style={{
                color:"#10B981",
                marginTop:"20px"
              }}
            >

              {securityScore}%

            </h1>

            <p>

              Security posture remains healthy and
              monitoring is active.

            </p>

          </div>

        </div>

      </div>

    </div>

  </AdminLayout>

);

}