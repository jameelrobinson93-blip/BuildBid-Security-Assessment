import "./About.css";

export default function About() {
  return (
    <div className="about-page">

      <section className="about-hero">

        <span className="about-badge">
          ABOUT BUILDBID
        </span>

        <h1>
          Making Home Improvement
          Simple, Safe, and Stress-Free.
        </h1>

        <p>
          BuildBid connects homeowners with trusted local contractors for
          remodeling, repairs, renovations, and home improvement projects.
          Compare professionals, receive multiple estimates, and hire with
          confidence.
        </p>

      </section>

      <section className="about-grid">

        <div className="about-card">

          <h2>🏡 Our Mission</h2>

          <p>
            We help homeowners quickly find reliable contractors without
            spending hours searching online or making endless phone calls.
          </p>

        </div>

        <div className="about-card">

          <h2>⭐ Trusted Professionals</h2>

          <p>
            Browse verified contractors, compare reviews, and view completed
            projects before making your decision.
          </p>

        </div>

        <div className="about-card">

          <h2>🛠 Everything In One Place</h2>

          <p>
            Request estimates, compare quotes, communicate with contractors,
            and manage your home improvement journey from one platform.
          </p>

        </div>

        <div className="about-card">

          <h2>🛡 Built With Security</h2>

          <p>
            Your information is protected using secure authentication,
            encrypted passwords, and industry-standard security practices.
          </p>

        </div>

      </section>

    </div>
  );
}