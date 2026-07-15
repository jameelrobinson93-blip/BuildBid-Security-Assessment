import { useEffect, useState } from "react";
import API_URL from "../config";

import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({});
const [events, setEvents] = useState([]);
const [lastUpdated, setLastUpdated] = useState("");
const [estimates, setEstimates] = useState([]);
const [contractors, setContractors] = useState([]);
const [selectedContractors, setSelectedContractors] = useState({});

    useEffect(() => {

    loadDashboard();

    const interval = setInterval(() => {

        loadDashboard();

    }, 5000);

    return () => clearInterval(interval);

}, []);
async function assignContractor(estimateId) {

  const contractorId = selectedContractors[estimateId];

  if (!contractorId) {
    alert("Please select a contractor.");
    return;
  }

  try {

    const response = await fetch(
      `${API_URL}/api/estimates/assign`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          estimateId,
          contractorId
        })
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Contractor assigned!");

      loadDashboard();

    } else {

      alert(data.message);

    }

  } catch (err) {

    console.error(err);

    alert("Unable to assign contractor.");

  }

}
    async function loadDashboard() {

        const token = localStorage.getItem("token");

        try {

            const overview = await fetch(
                `${API_URL}/api/admin/overview`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const overviewData = await overview.json();

console.log("Overview:", overviewData);

setStats(overviewData);

            const eventResponse = await fetch(
                `${API_URL}/api/admin/security-events`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const eventData = await eventResponse.json();

console.log("Security Events:", eventData);

setEvents(Array.isArray(eventData) ? eventData : []);

setLastUpdated(
    new Date().toLocaleTimeString()
);

const estimateResponse = await fetch(
    `${API_URL}/api/estimates`
);

const estimateData = await estimateResponse.json();

if (estimateData.success) {
    setEstimates(estimateData.estimates);
}

const contractorResponse = await fetch(
    `${API_URL}/api/contractors`
);

const contractorData = await contractorResponse.json();

if (contractorData.success) {
    setContractors(contractorData.contractors);
}

        } catch (err) {

            console.log(err);

        }

    }

    return (

<div className="admin-page">

<h1>🛡 BuildBid Security Operations Center</h1>

<div className="dashboard-grid">

<div className="card">
<h2>Security Score</h2>
<h1>{stats.securityScore}%</h1>
</div>

<div className="card">
<h2>Users</h2>
<h1>{stats.users}</h1>
</div>

<div className="card">
<h2>Contractors</h2>
<h1>{stats.contractors}</h1>
</div>

<div className="card">
<h2>Estimates</h2>
<h1>{stats.estimates}</h1>
</div>

<div className="card">
<h2>Reviews</h2>
<h1>{stats.reviews}</h1>
</div>

<div className="card success">
<h2>Successful Logins</h2>
<h1>{stats.successfulLogins}</h1>
</div>

<div className="card danger">
<h2>Failed Logins</h2>
<h1>{stats.failedLogins}</h1>
</div>

<div className="card warning">
<h2>Locked Accounts</h2>
<h1>{stats.lockedAccounts}</h1>
</div>

<div className="card xss">
<h2>XSS Attempts</h2>
<h1>{stats.xssAttempts}</h1>
</div>

</div>

<h2 className="logs-title">
Recent Security Events
</h2>

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

events.map((event,index)=>(

<tr key={index}>

<td>{event.event_time}</td>

<td>{event.email}</td>

<td>

<span
className={

event.status === "SUCCESS"

? "status-success"

: event.status === "FAILED"

? "status-failed"

: event.status === "LOCKED"

? "status-locked"

: event.status === "XSS_BLOCKED"

? "status-xss"

: ""

}
>

{event.status}

</span>

</td>

<td>{event.ip_address}</td>

</tr>

))

}

</tbody>

</table>

<h2 className="logs-title">Platform Health</h2>

<div className="dashboard-grid">

<div className="card">
<h2>API Server</h2>
<h1 style={{color:"#22C55E"}}>ONLINE</h1>
</div>

<div className="card">
<h2>Database</h2>
<h1 style={{color:"#22C55E"}}>CONNECTED</h1>
</div>

<div className="card">
<h2>JWT Security</h2>
<h1 style={{color:"#22C55E"}}>ACTIVE</h1>
</div>

<div className="card">
<h2>Helmet</h2>
<h1 style={{color:"#22C55E"}}>ENABLED</h1>
</div>

<div className="card">
<h2>Rate Limiter</h2>
<h1 style={{color:"#22C55E"}}>ACTIVE</h1>
</div>

<div className="card">
<h2>CORS</h2>
<h1 style={{color:"#22C55E"}}>PROTECTED</h1>
</div>

</div>
<h2 className="logs-title">
  Assign Contractors
</h2>

<table>

  <thead>

    <tr>

      <th>Project</th>

      <th>Status</th>

      <th>Assign Contractor</th>

      <th>Action</th>

    </tr>

  </thead>

  <tbody>

    {estimates.map((estimate) => (

      <tr key={estimate.id}>

        <td>{estimate.project_type}</td>

        <td>{estimate.status}</td>

        <td>

          <select
            value={selectedContractors[estimate.id] || ""}
            onChange={(e) =>
              setSelectedContractors({
                ...selectedContractors,
                [estimate.id]: e.target.value
              })
            }
          >

            <option value="">
              Select Contractor
            </option>

            {contractors.map((contractor) => (

              <option
                key={contractor.id}
                value={contractor.id}
              >
            {contractor.company}
              </option>

            ))}

          </select>

        </td>

        <td>

          <button
            onClick={() => assignContractor(estimate.id)}
          >
            Assign
          </button>

        </td>

      </tr>

    ))}

  </tbody>

</table>
</div>

    );

}

export default AdminDashboard;