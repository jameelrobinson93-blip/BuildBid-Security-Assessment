import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API_URL from "../config";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleRegister() {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!firstName || !lastName || !email || !password) {
      alert("Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Registration failed.");
        return;
      }

      alert("Account created successfully!");

      navigate("/login");

    } catch (err) {

      console.error("Registration Error:", err);

      alert(
        "Unable to connect to the server. Please try again."
      );

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
            autoComplete="given-name"
            value={form.firstName}
            onChange={handleChange}
            disabled={loading}
            autoFocus
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
            value={form.lastName}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
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