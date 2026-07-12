import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-badge">
            🏡 Trusted Home Remodeling Professionals
          </span>

          <h1>
            Find Trusted Local Contractors
for Your Dream Home.
          </h1>

          <p>
            Find trusted local professionals for kitchen remodeling,
bathroom renovations, roofing, flooring, painting, and more.
Compare verified reviews, browse completed projects, and
receive multiple free estimates—all in one place.
          </p>

          <div className="hero-buttons">

            <Link to="/search" className="primary-btn">
              Find Contractors
            </Link>

            <Link to="/estimate" className="secondary-btn">
              Get Free Estimates
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <h3>500+</h3>
              <span>Verified Contractors</span>
            </div>

            <div>
              <h3>10k+</h3>
              <span>Projects Completed</span>
            </div>

            <div>
              <h3>4.9★</h3>
              <span>Average Rating</span>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <img
            src="/hero.jpg"
            alt="Luxury Kitchen Remodel"
          />

        </div>

      </div>

    </section>
  );
}