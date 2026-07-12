import { useEffect, useState } from "react";
import API_URL from "../config";

import "./AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({});
const [events, setEvents] = useState([]);
const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {

    loadDashboard();

    const interval = setInterval(() => {

        loadDashboard();

    }, 5000);

    return () => clearInterval(interval);

}, []);

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

</div>

    );

}

export default AdminDashboard;