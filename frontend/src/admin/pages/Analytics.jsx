import { useEffect, useState } from "react";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function Analytics() {

  const [users, setUsers] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {

    loadAnalytics();

  }, []);

async function loadAnalytics() {

  const token = localStorage.getItem("token");

  // ===========================
  // USERS
  // ===========================

  try {

    const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (data.success) {
      setUsers(data.users);
    }

  } catch (err) {

    console.error("Users API Error:", err);

  }

  // ===========================
  // CONTRACTORS
  // ===========================

  try {

    const response = await fetch(
      `${API_URL}/api/contractors`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (data.success) {
      setContractors(data.contractors);
    }

  } catch (err) {

    console.error("Contractors API Error:", err);

  }

  // ===========================
  // ESTIMATES
  // ===========================

  try {

    const response = await fetch(
      `${API_URL}/api/estimates`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (data.success) {
      setEstimates(data.estimates);
    }

  } catch (err) {

    console.error("Estimates API Error:", err);

  }

}
  const pending = estimates.filter(
    estimate => estimate.status === "Pending"
  ).length;

  const approved = estimates.filter(
    estimate => estimate.status === "Approved"
  ).length;

  const assigned = estimates.filter(
    estimate => estimate.status === "Assigned"
  ).length;

  const completed = estimates.filter(
    estimate => estimate.status === "Completed"
  ).length;

  const statusData = [

  { name: "Pending", value: pending },

  { name: "Approved", value: approved },

  { name: "Assigned", value: assigned },

  { name: "Completed", value: completed }

];

const projectData = [

  {
    name: "Roofing",
    value: estimates.filter(
      e => e.project_type === "Roof Replacement"
    ).length
  },

  {
    name: "Kitchen",
    value: estimates.filter(
      e => e.project_type === "Kitchen Remodel"
    ).length
  },

  {
    name: "Bathroom",
    value: estimates.filter(
      e => e.project_type === "Bathroom Renovation"
    ).length
  },

  {
    name: "Electrical",
    value: estimates.filter(
      e => e.project_type === "Electrical Upgrade"
    ).length
  }

];

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444"
];

  return (

    <AdminLayout>

      <div className="page-header">

        <div>

          <h1>Analytics Dashboard</h1>

          <p>
            Business performance and activity overview.
          </p>

        </div>

      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h2>Total Users</h2>

          <h1>{users.length}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Contractors</h2>

          <h1>{contractors.length}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Total Estimates</h2>

          <h1>{estimates.length}</h1>

        </div>

        <div className="dashboard-card">

          <h2>Completed Jobs</h2>

          <h1>{completed}</h1>

        </div>

      </div>

      <div className="security-panel">

        <h2>Estimate Status</h2>

        <div className="security-grid">

          <div className="security-box">

            <span>Pending</span>

            <h2>{pending}</h2>

          </div>

          <div className="security-box">

            <span>Approved</span>

            <h2>{approved}</h2>

          </div>

          <div className="security-box">

            <span>Assigned</span>

            <h2>{assigned}</h2>

          </div>

          <div className="security-box">

            <span>Completed</span>

            <h2>{completed}</h2>

          </div>

        </div>

      </div>

      <div className="security-panel">

        <h2>Project Types</h2>

        <div className="security-grid">

          <div className="security-box">

            <span>Roof Replacement</span>

            <h2>

              {

                estimates.filter(

                  estimate =>

                    estimate.project_type === "Roof Replacement"

                ).length

              }

            </h2>

          </div>

          <div className="security-box">

            <span>Kitchen Remodel</span>

            <h2>

              {

                estimates.filter(

                  estimate =>

                    estimate.project_type === "Kitchen Remodel"

                ).length

              }

            </h2>

          </div>

          <div className="security-box">

            <span>Bathroom Renovation</span>

            <h2>

              {

                estimates.filter(

                  estimate =>

                    estimate.project_type === "Bathroom Renovation"

                ).length

              }

            </h2>

          </div>

          <div className="security-box">

            <span>Electrical Upgrade</span>

            <h2>

              {

                estimates.filter(

                  estimate =>

                    estimate.project_type === "Electrical Upgrade"

                ).length

              }

            </h2>

          </div>

        </div>

      </div>
<div className="security-panel">

  <h2>Estimate Status Overview</h2>

  <div style={{ width: "100%", height: 320 }}>

    <ResponsiveContainer>

      <BarChart data={statusData}>

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#2563EB"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

<div
  className="security-panel"
  style={{ marginTop: "30px" }}
>

  <h2>Project Types</h2>

  <div style={{ width: "100%", height: 350 }}>

    <ResponsiveContainer>

      <PieChart>

        <Pie

          data={projectData}

          dataKey="value"

          nameKey="name"

          outerRadius={120}

          label

        >

          {

            projectData.map((entry, index) => (

              <Cell

                key={index}

                fill={COLORS[index % COLORS.length]}

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
      <div className="activity-panel">

        <h2>Recent Estimate Requests</h2>

        <table>

          <thead>

            <tr>

              <th>Project</th>

              <th>Status</th>

              <th>Budget</th>

              <th>Address</th>

            </tr>

          </thead>

          <tbody>

            {

              estimates.slice(0, 5).map((estimate) => (

                <tr key={estimate.id}>

                  <td>{estimate.project_type}</td>

                  <td>{estimate.status}</td>

                  <td>${estimate.budget}</td>

                  <td>{estimate.address}</td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

}