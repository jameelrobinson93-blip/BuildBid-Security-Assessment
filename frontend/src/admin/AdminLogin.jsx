import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "./Admin.css";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!data.success) {

        alert(data.message);

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

      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin/dashboard");

    } catch (err) {

      console.log(err);

      alert("Unable to connect to server.");

    }

  }

  return (

    <div className="admin-login">

      <form
        className="admin-card"
        onSubmit={handleSubmit}
      >

        <h1>BuildBid SOC</h1>

        <p>Administrator Access Only</p>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">

          Sign In

        </button>

      </form>

    </div>

  );

}