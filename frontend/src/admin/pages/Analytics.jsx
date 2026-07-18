import { useEffect, useState } from "react";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis
} from "recharts";

import {
  Users,
  Hammer,
  FileText,
  CheckCircle2,
  RefreshCw,
  TrendingUp,
  DollarSign,
  Activity
} from "lucide-react";

export default function Analytics() {

  const [users,setUsers]=useState([]);
  const [contractors,setContractors]=useState([]);
  const [estimates,setEstimates]=useState([]);

  useEffect(()=>{

    loadAnalytics();

  },[]);

  async function loadAnalytics(){

    const token=localStorage.getItem("token");

    try{

      const userResponse=await fetch(

        `${API_URL}/api/admin/users`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      const userData=await userResponse.json();

      if(userData.success){

        setUsers(userData.users);

      }

      const contractorResponse=await fetch(

        `${API_URL}/api/contractors`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      const contractorData=await contractorResponse.json();

      if(contractorData.success){

        setContractors(contractorData.contractors);

      }

      const estimateResponse=await fetch(

        `${API_URL}/api/estimates`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      const estimateData=await estimateResponse.json();

      if(estimateData.success){

        setEstimates(estimateData.estimates);

      }

    }catch(err){

      console.error(err);

    }

  }

  const pending=estimates.filter(
    e=>e.status==="Pending"
  ).length;

  const approved=estimates.filter(
    e=>e.status==="Approved"
  ).length;

  const assigned=estimates.filter(
    e=>e.status==="Assigned"
  ).length;

  const completed=estimates.filter(
    e=>e.status==="Completed"
  ).length;

  const totalRevenue=
    completed*2500;

  const completionRate=

    estimates.length===0

      ?0

      :Math.round(

          (completed/estimates.length)*100

        );

  const estimateStatus=[

    {
      name:"Pending",
      value:pending
    },

    {
      name:"Approved",
      value:approved
    },

    {
      name:"Assigned",
      value:assigned
    },

    {
      name:"Completed",
      value:completed
    }

  ];

  const monthlyTrend=[

    {month:"Jan",jobs:12},

    {month:"Feb",jobs:18},

    {month:"Mar",jobs:21},

    {month:"Apr",jobs:27},

    {month:"May",jobs:34},

    {month:"Jun",jobs:41}

  ];

  const COLORS=[

    "#2563EB",
    "#10B981",
    "#F59E0B",
    "#EF4444"

  ];

  return (

    <AdminLayout>

        <div className="page-header">

          <div>

           <h1
  style={{
    color: "red",
    fontSize: "60px",
    background: "yellow",
    padding: "20px"
  }}
>
  THIS IS THE NEW ANALYTICS PAGE
</h1>

            <p>
              Real-time business intelligence and platform performance.
            </p>

          </div>

          <button
            className="primary-btn"
            onClick={loadAnalytics}
          >

            <RefreshCw size={18} />

            Refresh

          </button>

        </div>

        {/* ===========================
            KPI CARDS
        ============================ */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon users">

              <Users size={28} />

            </div>

            <h2>Total Users</h2>

            <h1>{users.length}</h1>

            <p>Registered customers</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon contractors">

              <Hammer size={28} />

            </div>

            <h2>Contractors</h2>

            <h1>{contractors.length}</h1>

            <p>Verified professionals</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon estimates">

              <FileText size={28} />

            </div>

            <h2>Estimates</h2>

            <h1>{estimates.length}</h1>

            <p>Total requests submitted</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon reviews">

              <CheckCircle2 size={28} />

            </div>

            <h2>Completion Rate</h2>

            <h1>{completionRate}%</h1>

            <p>Projects completed</p>

          </div>

        </div>

        {/* ===========================
            BUSINESS METRICS
        ============================ */}

        <div className="dashboard-cards">

          <div className="dashboard-card">

            <div className="card-icon users">

              <DollarSign size={28} />

            </div>

            <h2>Estimated Revenue</h2>

            <h1>

              $

              {totalRevenue.toLocaleString()}

            </h1>

            <p>Completed projects</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon contractors">

              <TrendingUp size={28} />

            </div>

            <h2>Growth Trend</h2>

            <h1>+18%</h1>

            <p>Compared to last month</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon estimates">

              <Activity size={28} />

            </div>

            <h2>Active Projects</h2>

            <h1>{assigned}</h1>

            <p>Currently assigned</p>

          </div>

          <div className="dashboard-card">

            <div className="card-icon reviews">

              <CheckCircle2 size={28} />

            </div>

            <h2>Completed Jobs</h2>

            <h1>{completed}</h1>

            <p>Successfully finished</p>

          </div>

        </div>

        {/* ===========================
            CHARTS
        ============================ */}

        <div className="analytics-grid">

          <div className="analytics-card">

            <div className="panel-header">

              <h2>Monthly Growth</h2>

              <span>Last 6 months</span>

            </div>

            <div style={{width:"100%",height:320}}>

              <ResponsiveContainer>

                <AreaChart data={monthlyTrend}>

                  <XAxis dataKey="month"/>

                  <YAxis/>

                  <Tooltip/>

                  <Area

                    type="monotone"

                    dataKey="jobs"

                    stroke="#2563EB"

                    fill="#3B82F6"

                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="analytics-card">

            <div className="panel-header">

              <h2>Estimate Status</h2>

              <span>Current Distribution</span>

            </div>

            <div style={{width:"100%",height:320}}>

              <ResponsiveContainer>

                <BarChart data={estimateStatus}>

                  <XAxis dataKey="name"/>

                  <YAxis/>

                  <Tooltip/>

                  <Bar

                    dataKey="value"

                    fill="#2563EB"

                    radius={[8,8,0,0]}

                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>
              {/* ===========================
            PROJECT DISTRIBUTION
        ============================ */}

        <div className="analytics-grid">

          <div className="analytics-card">

            <div className="panel-header">

              <h2>Project Distribution</h2>

              <span>Current Project Types</span>

            </div>

            <div
              style={{
                width: "100%",
                height: 350
              }}
            >

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={estimateStatus}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >

                    {

                      estimateStatus.map((entry,index)=>(

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

          <div className="analytics-card">

            <div className="panel-header">

              <h2>Executive Summary</h2>

              <span>Platform Overview</span>

            </div>

            <div className="system-health-grid">

              <div className="health-card">

                <h3>Total Customers</h3>

                <h1>{users.length}</h1>

              </div>

              <div className="health-card">

                <h3>Contractor Network</h3>

                <h1>{contractors.length}</h1>

              </div>

              <div className="health-card">

                <h3>Project Requests</h3>

                <h1>{estimates.length}</h1>

              </div>

              <div className="health-card">

                <h3>Completion Rate</h3>

                <h1>{completionRate}%</h1>

              </div>

            </div>

          </div>

        </div>

        {/* ===========================
            RECENT ESTIMATES
        ============================ */}

        <div className="activity-panel">

          <div className="panel-header">

            <h2>Recent Estimate Requests</h2>

            <span>

              {estimates.length} Total Requests

            </span>

          </div>

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

                estimates
                  .slice(0,8)
                  .map((estimate)=>(

                    <tr key={estimate.id}>

                      <td>

                        {estimate.project_type}

                      </td>

                      <td>

                        <span
                          className={`status-badge ${estimate.status.toLowerCase()}`}
                        >

                          {estimate.status}

                        </span>

                      </td>

                      <td>

                        ${estimate.budget}

                      </td>

                      <td>

                        {estimate.address}

                      </td>

                    </tr>

                  ))

              }

                        </tbody>

          </table>

        </div>

    </AdminLayout>

  );

}