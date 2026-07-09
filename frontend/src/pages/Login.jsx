import { useState } from "react";
import API_URL from "../config.js";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  async function handleLogin() {

    try {

      const response = await fetch(
        `${API_URL}/api/auth/login`,
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

        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        alert("Login Successful!");

        window.location.href = "/";

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Unable to connect to the server.");

    }

  }

  return (

    <div className="page">

      <h1>Login</h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default Login;