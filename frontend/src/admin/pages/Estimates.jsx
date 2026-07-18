import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

import {
  FileText,
  Clock3,
  CheckCircle2,
  ClipboardCheck,
  Search,
  RefreshCw,
  Eye,
  UserPlus,
  Trash2,
  BadgeCheck,
  Home
} from "lucide-react";

export default function Estimates() {

  const navigate = useNavigate();

  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {

    loadEstimates();

  }, []);

  async function loadEstimates() {

    const token = localStorage.getItem("token");

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

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

      alert("Unable to load estimates.");

    } finally {

      setLoading(false);

    }

  }

  async function deleteEstimate(id) {

    if (!window.confirm("Delete this estimate?")) return;

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/estimates/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {

        loadEstimates();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function updateStatus(id, status) {

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/estimates/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if(data.success){

        loadEstimates();

      }else{

        alert(data.message);

      }

    }catch(err){

      console.error(err);

    }

  }

  function assignContractor(id){

    navigate(`/admin/estimates/${id}`);

  }

  const filteredEstimates = estimates.filter((estimate)=>{

    const matchesSearch=

      (estimate.project_type || "")
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      (estimate.address || "")
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      (estimate.contractor_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter=

      filter==="All"

      ? true

      : estimate.status===filter;

    return matchesSearch && matchesFilter;

  });
     return (
  <AdminLayout>

    <div className="admin-content">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div className="page-header">

        <div>

          <h1>Estimate Management</h1>

          <p>
            Review, approve, assign, and complete customer estimate requests.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={loadEstimates}
        >
          <RefreshCw size={18}/>
          Refresh
        </button>

      </div>

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon users">

            <FileText size={30}/>

          </div>

          <span>Total Estimates</span>

          <h1>{estimates.length}</h1>

          <p>Customer Requests</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon estimates">

            <Clock3 size={30}/>

          </div>

          <span>Pending</span>

          <h1>

            {estimates.filter(e=>e.status==="Pending").length}

          </h1>

          <p>Waiting Approval</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon contractors">

            <BadgeCheck size={30}/>

          </div>

          <span>Approved</span>

          <h1>

            {estimates.filter(e=>e.status==="Approved").length}

          </h1>

          <p>Ready for Assignment</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon reviews">

            <ClipboardCheck size={30}/>

          </div>

          <span>Completed</span>

          <h1>

            {estimates.filter(e=>e.status==="Completed").length}

          </h1>

          <p>Finished Projects</p>

        </div>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-wrapper">

        <Search
          size={20}
          className="search-icon"
        />

        <input
          className="search-input"
          placeholder="Search estimates..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="filter-row">

        {["All","Pending","Approved","Assigned","Completed"].map(status => (

          <button
            key={status}
            className={
              filter===status
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={()=>setFilter(status)}
          >
            {status}
          </button>

        ))}

      </div>

      {/* =========================
          ESTIMATES TABLE
      ========================= */}

      <div className="activity-panel">

        {loading ? (

          <h2>Loading Estimates...</h2>

        ) : (

          <table>

            <thead>

              <tr>

                <th>Project</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Address</th>
                <th>Contractor</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredEstimates.length===0 ? (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign:"center",
                      padding:"60px"
                    }}
                  >

                    No estimates found.

                  </td>

                </tr>

              ) : (

                filteredEstimates.map((estimate)=>(

                  <tr key={estimate.id}>

                    <td>

                      <div
                        style={{
                          display:"flex",
                          alignItems:"center",
                          gap:"15px"
                        }}
                      >

                        <div className="table-avatar">

                          <Home size={18}/>

                        </div>

                        <div>

                          <strong>

                            {estimate.project_type}

                          </strong>

                          <br/>

                          <small>

                            Estimate #{estimate.id}

                          </small>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span
                        className={`status-badge ${estimate.status?.toLowerCase()}`}
                      >

                        {estimate.status}

                      </span>

                    </td>

                    <td>

                      ${Number(estimate.budget || 0).toLocaleString()}

                    </td>

                    <td>

                      {estimate.address}

                    </td>

                    <td>

                      {estimate.contractor_name || "Unassigned"}

                    </td>

                    <td>

                      <div className="table-actions">

                        <button
                          className="icon-btn view-btn"
                          onClick={()=>
                            navigate(`/admin/estimates/${estimate.id}`)
                          }
                          title="View"
                        >
                          <Eye size={18}/>
                        </button>

                        <button
                          className="icon-btn approve-btn"
                          onClick={()=>
                            updateStatus(estimate.id,"Approved")
                          }
                          title="Approve"
                        >
                          <CheckCircle2 size={18}/>
                        </button>

                        <button
                          className="icon-btn assign-btn"
                          onClick={()=>
                            assignContractor(estimate.id)
                          }
                          title="Assign"
                        >
                          <UserPlus size={18}/>
                        </button>

                        <button
                          className="icon-btn complete-btn"
                          onClick={()=>
                            updateStatus(estimate.id,"Completed")
                          }
                          title="Complete"
                        >
                          <ClipboardCheck size={18}/>
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          onClick={()=>
                            deleteEstimate(estimate.id)
                          }
                          title="Delete"
                        >
                          <Trash2 size={18}/>
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  </AdminLayout>
);

}