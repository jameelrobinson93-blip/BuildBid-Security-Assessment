import { useState } from "react";

function RequestEstimate() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
    budget: "",
    address: ""
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    alert("Estimate request submitted!");

    console.log(formData);
  }

  return (
    <div className="estimate-page">

      <h1>Request a Free Estimate</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <select
          name="projectType"
          onChange={handleChange}
        >
          <option value="">Select Project Type</option>
          <option>Kitchen Remodel</option>
          <option>Bathroom Remodel</option>
          <option>Roof Repair</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Landscaping</option>
          <option>Handyman</option>
        </select>

        <textarea
          name="description"
          rows="6"
          placeholder="Describe your project..."
          onChange={handleChange}
        />

        <input
          name="budget"
          placeholder="Estimated Budget"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Project Address"
          onChange={handleChange}
        />

        <button type="submit">
          Submit Request
        </button>

      </form>

    </div>
  );
}

export default RequestEstimate;