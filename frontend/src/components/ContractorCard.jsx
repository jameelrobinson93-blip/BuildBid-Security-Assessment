function ContractorCard({ name, specialty, rating }) {
  return (
    <div className="contractor-card">

      <div className="contractor-image">
        👷
      </div>

      <h3>{name}</h3>

      <p>{specialty}</p>

      <h4>⭐ {rating}</h4>

      <button>View Profile</button>

    </div>
  );
}

export default ContractorCard;