function Register() {
  return (
    <div className="page">
      <h1>Create Account</h1>

      <input placeholder="Full Name" />

      <br /><br />

      <input type="email" placeholder="Email" />

      <br /><br />

      <input type="password" placeholder="Password" />

      <br /><br />

      <button>Create Account</button>
    </div>
  );
}

export default Register;