import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
    <h2>BuildBid</h2>
</div>

      <nav className="nav-links">

        <NavLink to="/">Home</NavLink>

        <a href="#services">Services</a>

        <NavLink to="/search">Find Contractors</NavLink>

        <NavLink to="/reviews">Reviews</NavLink>

        <NavLink to="/about">About</NavLink>

      </nav>

      <div className="nav-buttons">

        <NavLink
          to="/login"
          className="login-btn"
        >
          Login
        </NavLink>

        <NavLink
          to="/estimate"
          className="estimate-btn"
        >
          Get Free Estimates
        </NavLink>

      </div>

    </header>
  );
}