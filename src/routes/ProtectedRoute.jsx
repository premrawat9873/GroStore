// src/routes/ProtectedRoute.jsx

import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Send them to /login, remembering where they came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If children passed (wrapping AdminLayout), render those
  // Otherwise render nested <Outlet /> (for when used as a layout route)
  return children ?? <Outlet />;
}