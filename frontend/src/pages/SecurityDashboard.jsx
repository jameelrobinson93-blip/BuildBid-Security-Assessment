import { useEffect, useState } from "react";
import "./SecurityDashboard.css";
import API_URL from "../config.js";

function SecurityDashboard() {

  const [logs, setLogs] = useState([]);

const successful = logs.filter(
  log => log.status === "SUCCESS"
).length;

const failed = logs.filter(
  log => log.status === "FAILED"
).length;

const locked = logs.filter(
  log => log.status === "LOCKED"
).length;

  async function loadLogs() {

    try {

      const response = await fetch(
  `${API_URL}/api/security/logs`
);

      const data = await response.json();

      setLogs(data);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    loadLogs();

  }, []);

  return (

    <div className="page">

      <h1>Security Dashboard</h1>

      <div className="stats">

  <div className="card success">
    <h2>{successful}</h2>
    <p>Successful Logins</p>
  </div>

  <div className="card failed">
    <h2>{failed}</h2>
    <p>Failed Logins</p>
  </div>

  <div className="card locked">
    <h2>{locked}</h2>
    <p>Locked Accounts</p>
  </div>

</div>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>IP Address</th>
            <th>Time</th>
          </tr>

        </thead>

        <tbody>

          {logs.map((log) => (

            <tr key={log.id}>

              <td>{log.email}</td>
              <td>

  {log.status === "SUCCESS" && (
    <span style={{ color: "#2ecc71", fontWeight: "bold" }}>
      🟢 SUCCESS
    </span>
  )}

  {log.status === "FAILED" && (
    <span style={{ color: "#e74c3c", fontWeight: "bold" }}>
      🔴 FAILED
    </span>
  )}

  {log.status === "LOCKED" && (
    <span style={{ color: "#f39c12", fontWeight: "bold" }}>
      🟠 LOCKED
    </span>
  )}

</td>
              <td>{log.ip_address}</td>
              <td>{log.event_time}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default SecurityDashboard;