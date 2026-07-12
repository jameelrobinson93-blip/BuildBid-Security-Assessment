import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../config.js";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  async function handleRegister() {

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password
    ) {
      alert("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (data.success) {

        alert("Account created successfully!");

        navigate("/login");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Unable to connect to the server.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="login-page">

      <div className="login-card">

        <h1>Create Account</h1>

        <p>
          Join BuildBid and start connecting with trusted
          local contractors for your next home project.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="login-footer">

          <p>Already have an account?</p>

          <Link to="/login">
            Sign In
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Register;