import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <h2>BuildBid</h2>

          <p>
            Helping homeowners connect with trusted local contractors for
            remodeling, repairs, and home improvement projects.
          </p>

        </div>

        <div className="footer-links">

          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/search">Find Contractors</Link>
          <Link to="/estimate">Get Estimates</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/about">About</Link>

        </div>

        <div className="footer-links">

          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 BuildBid. All rights reserved.

      </div>

    </footer>
  );
}