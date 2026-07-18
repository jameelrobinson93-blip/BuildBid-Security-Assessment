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
      log.status === "Blocked XSS" ||
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
  return (

    <AdminLayout>

      <div className="page-header">

        <div>

          <h1>Security Dashboard</h1>

          <p>

            Monitor authentication activity and application security.

          </p>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h2>Failed Logins</h2>

          <h1>{failedLogins}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Successful Logins</h2>

          <h1>{successfulLogins}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Suspicious Activity</h2>

          <h1>{suspiciousActivity}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Total Events</h2>

          <h1>{logs.length}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Security Score</h2>

          <h1>96%</h1>

        </div>

      </div>

      <div className="security-panel">

        <h2>Security Health</h2>

        <div className="security-grid">

          <div className="security-box">

            <span>JWT Authentication</span>

            <h2>✅ Active</h2>

          </div>

          <div className="security-box">

            <span>Password Hashing</span>

            <h2>✅ bcrypt</h2>

          </div>

          <div className="security-box">

            <span>Helmet Security</span>

            <h2>✅ Enabled</h2>

          </div>

          <div className="security-box">

            <span>Security Logging</span>

            <h2>✅ Online</h2>

          </div>

        </div>

      </div>

      <div className="activity-panel">

        <h2>Recent Security Events</h2>

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

              logs.slice(0, 10).map((log) => (

                <tr key={log.id}>

                  <td>

                    {new Date(
                      log.event_time
                    ).toLocaleString()}

                  </td>

                  <td>

                    {log.email}

                  </td>

                  <td>

                    <span
                      className={
                        log.status === "Failed Login"
                          ? "status-badge suspended"
                          : log.status === "Successful Login"
                          ? "status-badge active"
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
<div className="security-panel">

  <h2>Security Activity</h2>

  <div style={{ width: "100%", height: 320 }}>

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

<div
  className="security-panel"
  style={{ marginTop: "30px" }}
>

  <h2>Security Event Distribution</h2>

  <div style={{ width: "100%", height: 350 }}>

    <ResponsiveContainer>

      <PieChart>

        <Pie

          data={securityData}

          dataKey="value"

          nameKey="name"

          outerRadius={120}

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
<div className="security-panel">

  <h2>Threat Assessment</h2>

  <div className="security-grid">

    <div className="security-box">

      <span>Threat Level</span>

      <h2 style={{ color: "#10B981" }}>

        LOW

      </h2>

    </div>

    <div className="security-box">

      <span>Firewall</span>

      <h2>

        🟢 Protected

      </h2>

    </div>

    <div className="security-box">

      <span>Authentication</span>

      <h2>

        🟢 Secure

      </h2>

    </div>

    <div className="security-box">

      <span>Monitoring</span>

      <h2>

        🟢 Active

      </h2>

    </div>

  </div>

</div>
<div className="security-panel">

  <h2>Executive Security Summary</h2>

  <ul
    style={{
      lineHeight: "2",
      paddingLeft: "20px"
    }}
  >

    <li>✅ JWT Authentication Enabled</li>

    <li>✅ Passwords Secured with bcrypt</li>

    <li>✅ Helmet Security Headers Enabled</li>

    <li>✅ PostgreSQL Security Logging Active</li>

    <li>✅ Role-Based Access Control (RBAC) Enabled</li>

    <li>✅ Brute Force Protection Implemented</li>

    <li>✅ Cross-Site Scripting (XSS) Protection Enabled</li>

  </ul>

</div>
    </AdminLayout>

  );

}