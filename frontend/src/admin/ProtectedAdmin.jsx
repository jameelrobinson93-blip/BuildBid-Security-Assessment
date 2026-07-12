import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({children}){

    const loggedIn =
        localStorage.getItem("adminLoggedIn");

    if(loggedIn!=="true"){

        return <Navigate to="/admin/login" replace />;

    }

    return children;

}