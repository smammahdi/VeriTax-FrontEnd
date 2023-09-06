import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.user
            ? children
            : <Navigate to="/login" state={{ from: location }} replace />

    );
}

export default RequireAuth;