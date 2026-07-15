import { useNavigate } from "react-router-dom";

export default function AdminHeader() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  function logout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");

  }

  return (

    <header className="admin-header">

      <div>

        <h1>BuildBid Administration</h1>

        <p>
          Manage your platform, users and security.
        </p>

      </div>

      <div className="admin-user">

        <div>

          <strong>
            {user?.firstName} {user?.lastName}
          </strong>

          <p>Administrator</p>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </header>

  );

}