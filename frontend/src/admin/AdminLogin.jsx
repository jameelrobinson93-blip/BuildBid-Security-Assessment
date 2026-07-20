import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "./Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
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
            email: normalizedEmail,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(data.message || "Login failed.");
        return;
      }

      if (data.user.role !== "admin") {
        alert("Administrator access only.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/admin/dashboard");

    } catch (err) {

      console.error("Admin Login Error:", err);

      alert(
        "Unable to connect to the server. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="admin-login">

      <form
        className="admin-card"
        onSubmit={handleSubmit}
      >

        <h1>BuildBid Admin Portal</h1>

        <p>Administrator Access Only</p>

        <input
          type="email"
          placeholder="Admin Email"
          autoComplete="username"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          disabled={loading}
          autoFocus
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

      </form>

    </div>
  );
}