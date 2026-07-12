import "./FeaturedContractors.css";

const contractors = [
  {
    name: "Elite Home Remodeling",
    city: "Paterson, NJ",
    rating: "4.9",
    reviews: 126,
    image: "/contractors/contractor1.jpg",
    services: "Kitchen • Bathroom • Basement"
  },
  {
    name: "Garden State Builders",
    city: "Wayne, NJ",
    rating: "4.8",
    reviews: 98,
    image: "/contractors/contractor2.jpg",
    services: "Roofing • Siding • Windows"
  },
  {
    name: "Modern Living Renovations",
    city: "Clifton, NJ",
    rating: "5.0",
    reviews: 74,
    image: "/contractors/contractor3.jpg",
    services: "Kitchen • Flooring • Painting"
  }
];

export default function FeaturedContractors() {
  return (
    <section className="featured">

      <div className="section-title">

        <span>FEATURED CONTRACTORS</span>

        <h2>Trusted Local Professionals</h2>

        <p>
          Browse licensed and highly rated contractors serving your area.
        </p>

      </div>

      <div className="contractor-grid">

        {contractors.map((contractor) => (

          <div className="contractor-card" key={contractor.name}>

            <img
              src={contractor.image}
              alt={contractor.name}
            />

            <div className="contractor-content">

              <div className="rating">

                ⭐ {contractor.rating}

                <span>({contractor.reviews} Reviews)</span>

              </div>

              <h3>{contractor.name}</h3>

              <p className="location">
                📍 {contractor.city}
              </p>

              <p className="services">
                {contractor.services}
              </p>

              <div className="badges">

                <span>✔ Verified</span>

                <span>Licensed</span>

                <span>Insured</span>

              </div>

              <button>
                View Profile
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}