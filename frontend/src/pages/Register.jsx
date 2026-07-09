import { useState } from "react";
import API_URL from "../config.js";

function Register() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  async function handleRegister() {

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

        window.location.href = "/login";

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

      <h1>Create Account</h1>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Create Account
      </button>

    </div>

  );

}

export default Register;