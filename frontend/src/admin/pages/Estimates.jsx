import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function Estimates() {

  const navigate = useNavigate();

  const [estimates, setEstimates] = useState([]);
  const [search, setSearch] = useState("");

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

      }

    } catch (err) {

      console.error(err);

    }

  }

  async function deleteEstimate(id) {

    const confirmDelete = window.confirm(

      "Delete this estimate?"

    );

    if (!confirmDelete) return;

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

        alert("Estimate deleted.");

        loadEstimates();

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

    }

  }

  function assignContractor(id) {

    navigate(`/admin/estimates/${id}`);

  }

  const filteredEstimates = estimates.filter(

    (estimate) => {

      const project =

        estimate.project_type?.toLowerCase() || "";

      const address =

        estimate.address?.toLowerCase() || "";

      return (

        project.includes(search.toLowerCase()) ||

        address.includes(search.toLowerCase())

      );

    }

  );

  return (

    <AdminLayout>

      <h1>Estimate Management</h1>

      <input

        className="search-box"

        type="text"

        placeholder="Search estimates..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />

      <table className="admin-table">

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

          {

            filteredEstimates.map((estimate)=>(

              <tr key={estimate.id}>

                <td>

                  {estimate.project_type}

                </td>

                <td>

                  {estimate.status}

                </td>

                <td>

                  ${estimate.budget}

                </td>

                <td>

                  {estimate.address}

                </td>

                <td>

                  {

                    estimate.contractor_id

                    ? estimate.contractor_id

                    : "Unassigned"

                  }

                </td>

                <td>

                  <button

                    onClick={()=>

                      navigate(

                        `/admin/estimates/${estimate.id}`

                      )

                    }

                  >

                    View

                  </button>

                  <button

                    onClick={()=>

                      assignContractor(

                        estimate.id

                      )

                    }

                  >

                    Assign

                  </button>

                  <button

                    onClick={()=>

                      deleteEstimate(

                        estimate.id

                      )

                    }

                  >

                    Delete

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </AdminLayout>

  );

}