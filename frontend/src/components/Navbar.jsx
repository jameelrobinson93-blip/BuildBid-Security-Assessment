import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🏗️ BuildBid</div>

      <ul className="nav-links">
    <li><Link to="/">Home</Link></li>

    <li><Link to="/search">Find Contractors</Link></li>

    <li><Link to="/about">About</Link></li>

    <li><Link to="/how-it-works">How It Works</Link></li>

    <li><Link to="/estimate">Request Estimate</Link></li>
</ul>

      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/register" className="register-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;