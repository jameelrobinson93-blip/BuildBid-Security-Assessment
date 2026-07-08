import { useState } from "react";

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

  async function handleSubmit() {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(form)
      }
    );

    const data = await response.json();

    alert(data.message);

  }

  return (

    <div className="page">

      <h1>Create Account</h1>

      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Create Account
      </button>

    </div>

  );

}

export default Register;