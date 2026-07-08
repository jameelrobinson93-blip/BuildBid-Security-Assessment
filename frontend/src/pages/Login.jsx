import { useState } from "react";

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

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
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

      alert("Login Successful!");

      console.log(data);

    } else {

      alert(data.message);

    }

  }

  return (

    <div className="page">

      <h1>Login</h1>

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

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default Login;