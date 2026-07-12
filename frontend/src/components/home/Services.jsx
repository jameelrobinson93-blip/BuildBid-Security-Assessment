import "./Services.css";

const services = [
  {
    title: "Kitchen Remodeling",
    image: "/services/kitchen.jpg",
  },
  {
    title: "Bathroom Remodeling",
    image: "/services/bathroom.jpg",
  },
  {
    title: "Roofing",
    image: "/services/roof.jpg",
  },
  {
    title: "Flooring",
    image: "/services/flooring.jpg",
  },
  {
    title: "Painting",
    image: "/services/painting.jpg",
  },
  {
    title: "Decks & Patios",
    image: "/services/deck.jpg",
  },
];

export default function Services() {
  return (
    <section id="services" className="services">

      <h2>Popular Home Services</h2>

      <p>
        Find trusted local professionals for every home improvement project.
      </p>

      <div className="services-grid">

        {services.map((service) => (

          <div className="service-card" key={service.title}>

            <img
              src={service.image}
              alt={service.title}
            />

            <div className="service-overlay">

              <h3>{service.title}</h3>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}