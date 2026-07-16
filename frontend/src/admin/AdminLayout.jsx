import AdminSidebar from "./AdminSidebar";
import "./Admin.css";

export default function AdminLayout({ children }) {

  return (

    <div className="admin">

      <AdminSidebar />

      <main className="admin-content">

        {children}

      </main>

    </div>

  );

}