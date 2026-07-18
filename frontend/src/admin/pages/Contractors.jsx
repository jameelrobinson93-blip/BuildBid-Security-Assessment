import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

import {
  Building2,
  UserCheck,
  UserX,
  Search,
  Plus,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";

export default function Contractors() {

  const navigate = useNavigate();

  const [contractors, setContractors] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContractors();
  }, []);

  async function loadContractors() {

    const token = localStorage.getItem("token");

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

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  async function updateStatus(contractor) {

    const token = localStorage.getItem("token");

    const newStatus =
      contractor.status === "Suspended"
        ? "Active"
        : "Suspended";

    try {

      const response = await fetch(
        `${API_URL}/api/contractors/${contractor.id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        loadContractors();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function deleteContractor(id) {

    if (!window.confirm("Delete this contractor?")) return;

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(
        `${API_URL}/api/contractors/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {

        loadContractors();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  const filteredContractors = contractors.filter((contractor) => {

    const matchesSearch = contractor.company
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Active"
        ? contractor.status !== "Suspended"
        : contractor.status === "Suspended";

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

          <h1>Contractor Management</h1>

          <p>
            Manage contractor accounts, monitor activity,
            and approve or suspend businesses.
          </p>

        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/admin/add-contractor")}
        >

          <Plus size={18} />

          Add Contractor

        </button>

      </div>

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon users">

            <Building2 size={30} />

          </div>

          <span>Total Contractors</span>

          <h1>{contractors.length}</h1>

          <p>Registered Companies</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon contractors">

            <UserCheck size={30} />

          </div>

          <span>Active</span>

          <h1>

            {
              contractors.filter(
                c => c.status !== "Suspended"
              ).length
            }

          </h1>

          <p>Ready for Projects</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon reviews">

            <UserX size={30} />

          </div>

          <span>Suspended</span>

          <h1>

            {
              contractors.filter(
                c => c.status === "Suspended"
              ).length
            }

          </h1>

          <p>Restricted Accounts</p>

        </div>

        <div className="dashboard-card">

          <div className="card-icon estimates">

            <Search size={30} />

          </div>

          <span>Results</span>

          <h1>

            {filteredContractors.length}

          </h1>

          <p>Matching Search</p>

        </div>

      </div>

      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-wrapper">

        <Search
          className="search-icon"
          size={20}
        />

        <input

          className="search-input"

          type="text"

          placeholder="Search contractors..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>

      {/* =========================
          FILTERS
      ========================= */}

      <div className="filter-row">

        <button

          className={
            filter==="All"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("All")}

        >

          All

        </button>

        <button

          className={
            filter==="Active"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("Active")}

        >

          Active

        </button>

        <button

          className={
            filter==="Suspended"
            ? "filter-btn active"
            : "filter-btn"
          }

          onClick={()=>setFilter("Suspended")}

        >

          Suspended

        </button>

      </div>

      {/* =========================
          TABLE
      ========================= */}

      <div className="activity-panel">

        {loading ? (

          <h2>Loading contractors...</h2>

        ) : (

          <table>

            <thead>

              <tr>

                <th>Company</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredContractors.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    style={{
                      textAlign:"center",
                      padding:"60px"
                    }}
                  >

                    No contractors found.

                  </td>

                </tr>

              ) : (

                filteredContractors.map((contractor)=>(

                  <tr key={contractor.id}>

                    <td>

                      <div
                        style={{
                          display:"flex",
                          alignItems:"center",
                          gap:"15px"
                        }}
                      >

                        <div className="table-avatar">

                          <Building2 size={18}/>

                        </div>

                        <div>

                          <strong>

                            {contractor.company}

                          </strong>

                          <br/>

                          <small>

                            Verified Contractor

                          </small>

                        </div>

                      </div>

                    </td>

                    <td>

                      <span

                        className={
                          contractor.status==="Suspended"

                          ? "status-badge suspended"

                          : "status-badge active"
                        }

                      >

                        {

                          contractor.status || "Active"

                        }

                      </span>

                    </td>

                    <td>

                      <div className="table-actions">

                        <button

                          className="icon-btn view-btn"

                          onClick={()=>navigate(

                          `/admin/contractors/${contractor.id}`

                          )}

                        >

                          <Eye size={18}/>

                        </button>

                        <button

                          className="icon-btn suspend-btn"

                          onClick={()=>updateStatus(contractor)}

                        >

                          {

                            contractor.status==="Suspended"

                            ? <CheckCircle size={18}/>

                            : <Ban size={18}/>

                          }

                        </button>

                        <button

                          className="icon-btn delete-btn"

                          onClick={()=>deleteContractor(

                            contractor.id

                          )}

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