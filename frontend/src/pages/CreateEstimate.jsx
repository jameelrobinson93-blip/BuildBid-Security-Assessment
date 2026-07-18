import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";

function CreateEstimate() {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [form, setForm] = useState({
    projectType: "",
    description: "",
    budget: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function submitEstimate(e) {
    e.preventDefault();

    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/estimates/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            projectType: form.projectType,
            description: form.description,
            budget: form.budget,
            address: form.address
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit estimate.");
      }

      if (data.success) {
        alert("Estimate submitted successfully!");

        setForm({
          projectType: "",
          description: "",
          budget: "",
          address: ""
        });

        navigate("/dashboard");
      } else {
        alert(data.message || "Unable to submit estimate.");
      }

    } catch (err) {

      console.error("Estimate Error:", err);

      alert(err.message || "Unable to submit estimate.");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Request New Estimate</h1>

        <p>
          Tell us about your project and contractors can provide an estimate.
        </p>

        <form onSubmit={submitEstimate}>

          <input
            type="text"
            name="projectType"
            placeholder="Project Type"
            value={form.projectType}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Describe your project"
            value={form.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget"
            value={form.budget}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Project Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Estimate"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateEstimate;