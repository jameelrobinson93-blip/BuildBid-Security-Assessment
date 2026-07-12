import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            AI POWERED CONSTRUCTION ESTIMATING
          </span>

          <h1>
            Build Better.
            <br />
            Bid Smarter.
          </h1>

          <p>
            BuildBid helps contractors generate accurate, review-ready
            construction estimates in minutes using AI-powered blueprint
            analysis.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="primary-btn">
              Start Free Trial
              <ArrowRight size={18}/>
            </Link>

            <Link to="/how-it-works" className="secondary-btn">
              <Play size={18}/>
              Watch Demo
            </Link>

          </div>

        </div>

        <div className="hero-right">

          <div className="dashboard-card">

            <div className="dashboard-top">

              <span>Total Estimate</span>

              <h2>$1,842,000</h2>

            </div>

            <div className="dashboard-row">

              <span>AI Confidence</span>

              <strong>97%</strong>

            </div>

            <div className="dashboard-row">

              <span>Estimated Profit</span>

              <strong>$268,410</strong>

            </div>

            <div className="dashboard-row">

              <span>Status</span>

              <strong className="green">
                Review Ready
              </strong>

            </div>

            <button className="dashboard-button">

              Open Estimate →

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;