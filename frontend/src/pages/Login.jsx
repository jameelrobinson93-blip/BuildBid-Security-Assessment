import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API_URL from "../config";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  async function handleLogin() {
    const email = form.email.trim().toLowerCase();

    if (!email || !form.password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: form.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Login failed.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "contractor") {
        navigate("/contractor-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {

      console.error("Login Error:", err);

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

        <h1>Welcome Back</h1>

        <p>
          Sign in to manage your projects,
          estimates and favorite contractors.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >

          <div className="login-footer">
            <p>Don't have an account?</p>

            <Link to="/register">
              Create an Account
            </Link>
          </div>

          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            autoFocus
          />

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;