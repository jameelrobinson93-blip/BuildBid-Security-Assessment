import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaClipboardList,
  FaStar,
  FaShieldAlt,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";

import Logo from "./Logo";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <Logo />

      <ul className="nav-links">

        <li>
          <NavLink to="/">
            <FaHome /> Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/search">
            <FaSearch /> Contractors
          </NavLink>
        </li>

        <li>
          <NavLink to="/estimate">
            <FaClipboardList /> Estimates
          </NavLink>
        </li>

        <li>
          <NavLink to="/reviews">
            <FaStar /> Reviews
          </NavLink>
        </li>

        <li>
          <NavLink to="/security">
            <FaShieldAlt /> Security
          </NavLink>
        </li>

        <li>
          <NavLink to="/about">
            <FaInfoCircle /> About
          </NavLink>
        </li>

      </ul>

      <div className="nav-auth">

        <NavLink to="/login" className="login-btn">
          <FaSignInAlt /> Login
        </NavLink>

        <NavLink to="/register" className="register-btn">
          <FaUserPlus /> Register
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;