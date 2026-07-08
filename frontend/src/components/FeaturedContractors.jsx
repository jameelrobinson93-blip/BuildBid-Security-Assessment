import { useEffect, useState } from "react";
import ContractorCard from "./ContractorCard";

function FeaturedContractors() {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contractors`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load contractors.");
        }
        return response.json();
      })
      .then((data) => {
        setContractors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading contractors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="featured">
      <h2>Featured Contractors</h2>

      <p className="featured-description">
        Connect with trusted local professionals for your next home improvement project.
      </p>

      {loading ? (
        <p>Loading contractors...</p>
      ) : contractors.length === 0 ? (
        <p>No contractors available at this time.</p>
      ) : (
        <div className="contractor-grid">
          {contractors.map((contractor) => (
            <ContractorCard
              key={contractor.id}
              name={contractor.company}
              specialty={contractor.specialty}
              rating={contractor.rating}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedContractors;