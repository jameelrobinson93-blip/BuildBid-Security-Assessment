import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config";
import AdminLayout from "../AdminLayout";

export default function AddContractor() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    company: "",
    specialty: "",
    city: "",
    phone: ""

  });

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    const token = localStorage.getItem("token");

    try {

      const response = await fetch(

        `${API_URL}/api/contractors`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`

          },

          body: JSON.stringify(formData)

        }

      );

      const data = await response.json();

      if (data.success) {

        alert("Contractor added successfully.");

        navigate("/admin/contractors");

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.error(err);

      alert("Unable to add contractor.");

    }

  }

  return (

    <AdminLayout>

      <div className="page-header">

        <div>

          <h1>Add Contractor</h1>

          <p>Add a new contractor to BuildBid.</p>

        </div>

      </div>

      <form
        className="admin-form"
        onSubmit={handleSubmit}
      >

        <input

          type="text"

          name="company"

          placeholder="Company Name"

          value={formData.company}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="specialty"

          placeholder="Specialty (Roofing, Plumbing...)"

          value={formData.specialty}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="city"

          placeholder="City"

          value={formData.city}

          onChange={handleChange}

          required

        />

        <input

          type="text"

          name="phone"

          placeholder="Phone Number"

          value={formData.phone}

          onChange={handleChange}

          required

        />

        <button

          type="submit"

          className="primary-btn"

        >

          Add Contractor

        </button>

      </form>

    </AdminLayout>

  );

}