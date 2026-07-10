import {
  FaShieldAlt,
  FaChartBar,
  FaUsers,
  FaCog
} from "react-icons/fa";

function Sidebar() {

  return (

    <div
      style={{
        width: "250px",
        background: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "25px"
      }}
    >

      <h2>BuildBid</h2>

      <hr />

      <p><FaShieldAlt /> Security Center</p>

      <p><FaChartBar /> Analytics</p>

      <p><FaUsers /> Users</p>

      <p><FaCog /> Settings</p>

    </div>

  );

}

export default Sidebar;