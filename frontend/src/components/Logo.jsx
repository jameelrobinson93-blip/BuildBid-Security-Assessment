import { FaHardHat } from "react-icons/fa";

function Logo() {
  return (
    <div className="logo">
      <FaHardHat className="logo-icon" />
      <div>
        <h2>BuildBid</h2>
        <span>Secure Contractor Marketplace</span>
      </div>
    </div>
  );
}

export default Logo;