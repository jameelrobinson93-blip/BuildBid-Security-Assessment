import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function Contractors() {

  const navigate = useNavigate();

  const [contractors, setContractors] = useState([]);
  const [search, setSearch] = useState("");

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

    const confirmDelete = window.confirm(

      "Delete this contractor?"

    );

    if (!confirmDelete) return;

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

        alert("Contractor deleted.");

        loadContractors();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  const filteredContractors = contractors.filter(

    (contractor) => {

      return (

        contractor.company

          .toLowerCase()

          .includes(search.toLowerCase())

      );

    }

  );

  return (

    <AdminLayout>

      <h1>Contractor Management</h1>

      <input

        className="search-box"

        type="text"

        placeholder="Search Contractors..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />

      <table className="admin-table">

        <thead>

          <tr>

            <th>Company</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            filteredContractors.map(

              (contractor)=>(

                <tr key={contractor.id}>

                  <td>

                    {contractor.company}

                  </td>

                  <td>

                    {contractor.status || "Active"}

                  </td>

                  <td>

                    <button

                      onClick={()=>

                        navigate(

                          `/admin/contractors/${contractor.id}`

                        )

                      }

                    >

                      View

                    </button>

                    <button

                      onClick={()=>

                        updateStatus(contractor)

                      }

                    >

                      {

                        contractor.status==="Suspended"

                        ? "Activate"

                        : "Suspend"

                      }

                    </button>

                    <button

                      onClick={()=>

                        deleteContractor(

                          contractor.id

                        )

                      }

                    >

                      Delete

                    </button>

                  </td>

                </tr>

              )

            )

          }

        </tbody>

      </table>

    </AdminLayout>

  );

}