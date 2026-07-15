import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API_URL from "../config.js";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleLogin() {

    if (!form.email || !form.password) {

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
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful!");

        /* ===========================
           ROLE BASED LOGIN
        =========================== */

        if (data.user.role === "admin") {

          navigate("/admin/dashboard");

        } else if (
          data.user.role === "contractor"
        ) {

          navigate("/contractor-dashboard");

        } else {

          navigate("/dashboard");

        }

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

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create an Account
            </Link>

          </div>

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