import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  return (
    <section className="hero">

      <h1>🏗️ BuildBid</h1>

      <h2>Find Trusted Contractors Near You</h2>

      <p>
        Compare multiple estimates from licensed contractors for
        remodeling, repairs, renovations, roofing, landscaping,
        electrical work, plumbing, and more.
      </p>

      <div className="hero-buttons">
        <button onClick={() => navigate("/estimate")}>
  Request Free Estimate
</button>

       <button
  className="secondary"
  onClick={() => navigate("/register")}
>
  Become a Contractor
</button>
      </div>

    </section>
  );
}

export default Hero;
