import "./Gallery.css";

const projects = [
  {
    title: "Luxury Kitchen Remodel",
    location: "Wayne, NJ",
    image: "/gallery/kitchen.jpg",
    contractor: "Elite Home Remodeling"
  },
  {
    title: "Modern Bathroom Renovation",
    location: "Clifton, NJ",
    image: "/gallery/bathroom.jpg",
    contractor: "Garden State Builders"
  },
  {
    title: "Finished Basement",
    location: "Paterson, NJ",
    image: "/gallery/basement.jpg",
    contractor: "Modern Living Renovations"
  }
];

export default function Gallery() {
  return (
    <section className="gallery">

      <div className="section-title">

        <span>RECENT PROJECTS</span>

        <h2>Home Transformations</h2>

        <p>
          Discover beautiful remodeling projects completed by trusted
          BuildBid professionals.
        </p>

      </div>

      <div className="gallery-grid">

        {projects.map((project) => (

          <div className="gallery-card" key={project.title}>

            <img
              src={project.image}
              alt={project.title}
            />

            <div className="gallery-overlay">

              <h3>{project.title}</h3>

              <p>{project.location}</p>

              <small>Completed by {project.contractor}</small>

              <button>View Project</button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}