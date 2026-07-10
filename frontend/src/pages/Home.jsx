import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config.js";
import "./Home.css";

import {
  FaShieldAlt,
  FaUsers,
  FaClipboardCheck,
  FaSearch,
  FaLock,
  FaCheckCircle
} from "react-icons/fa";

function Home() {

  const [stats, setStats] = useState({
  users: 0,
  contractors: 0,
  reviews: 0,
  estimates: 0,
  success: 0,
  failed: 0,
  locked: 0,
  xss: 0
});

async function loadStats() {

  try {

    const response = await fetch(
      `${API_URL}/api/dashboard/stats`
    );

    const data = await response.json();

    setStats(data);

  } catch (error) {

    console.log(error);

  }

}

useEffect(() => {

  loadStats();

}, []);

  return (
    <div className="page fade">

      {/* Hero */}

    <section className="hero">

        <h1 className="hero-title">

          BuildBid
        </h1>

        <h2 className="hero-subtitle">
      
          Secure Contractor Marketplace
        </h2>

       <p className="hero-text">

          Connect homeowners with trusted contractors through a
          secure, modern platform built with cybersecurity best
          practices.
        </p>

        <Link to="/search">
          <button className="hero-button">
            <FaSearch /> Find Contractors
          </button>
        </Link>

        <Link to="/estimate">
          <button>
            <FaClipboardCheck /> Request Estimate
          </button>
        </Link>

      </section>

      {/* Features */}

      <section className="feature-grid">

        <div className="card">
          <FaUsers size={42} color="#2563eb" />
          <h3>Verified Contractors</h3>
          <p>
            Browse trusted professionals with ratings and reviews.
          </p>
        </div>

        <div className="card">
          <FaClipboardCheck size={42} color="#22c55e" />
          <h3>Easy Estimates</h3>
          <p>
            Request project estimates quickly and securely.
          </p>
        </div>

        <div className="card">
          <FaShieldAlt size={42} color="#8b5cf6" />
          <h3>Enterprise Security</h3>
          <p>
            JWT authentication, audit logging, XSS protection, and
            brute-force defense.
          </p>
        </div>

      </section>

      {/* Security */}

      <section className="card security-section">

        <h2>Security Features</h2>

        <div className="security-grid">

          <p><FaCheckCircle color="#22c55e" /> JWT Authentication</p>

          <p><FaCheckCircle color="#22c55e" /> Password Hashing (bcrypt)</p>

          <p><FaCheckCircle color="#22c55e" /> Brute Force Protection</p>

          <p><FaCheckCircle color="#22c55e" /> Account Lockout</p>

          <p><FaCheckCircle color="#22c55e" /> XSS Detection</p>

          <p><FaCheckCircle color="#22c55e" /> Security Monitoring Dashboard</p>

        </div>

      </section>

      {/* Stats */}

     <section className="stats-grid">

       <div className="stat-card">
         <h1>{stats.contractors}</h1>
<p>Verified Contractors</p>
        </div>

       <div className="stat-card">
          <h1>{stats.estimates}</h1>
<p>Estimates Requested</p>
        </div>
<div className="stat-card">
          <h1>{stats.reviews}</h1>
<p>Customer Reviews</p>
        </div>
<div className="stat-card">
          <h1>{stats.users}</h1>
<p>Registered Users</p>
        </div>

      </section>

{/* Live Security Overview */}

<section className="security-overview">

  <h2>🛡 Live Security Overview</h2>

  <div className="security-overview-grid">

    <div className="security-card success">

      <h1>{stats.success}</h1>

      <p>Successful Logins</p>

    </div>

    <div className="security-card failed">

      <h1>{stats.failed}</h1>

      <p>Failed Login Attempts</p>

    </div>

    <div className="security-card locked">

      <h1>{stats.locked}</h1>

      <p>Locked Accounts</p>

    </div>

    <div className="security-card xss">

      <h1>{stats.xss}</h1>

      <p>XSS Attacks Blocked</p>

    </div>

  </div>

</section>

    </div>

  );
}

export default Home;