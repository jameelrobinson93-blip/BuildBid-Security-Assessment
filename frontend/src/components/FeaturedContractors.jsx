import { useEffect, useState } from "react";
import ContractorCard from "./ContractorCard";

function FeaturedContractors() {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/contractors")
      .then((response) => response.json())
      .then((data) => {
  console.log(data);
  setContractors(data);
  setLoading(false);
})
      .catch((error) => {
        console.error("Error fetching contractors:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="featured">
      <h2>Featured Contractors</h2>

      {loading ? (
        <p>Loading contractors...</p>
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