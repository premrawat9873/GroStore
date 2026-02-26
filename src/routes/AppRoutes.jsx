// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import AdminLayout    from "../components/layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login          from "../pages/auth/Login";
import Dashboard      from "../pages/dashboard/Dashboard";
import Products       from "../pages/products/Products";
import Categories     from "../pages/products/Categories";
import NotFound       from "../pages/notfound/NotFound";

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* Root: send to dashboard if logged in, else login */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />

      {/* Public login — bounce to dashboard if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* Protected layout — ProtectedRoute guards the whole block */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard"  element={<Dashboard />}  />
        <Route path="/products"   element={<Products />}   />
        <Route path="/categories" element={<Categories />} />
        {/*
          Add more protected pages here:
          <Route path="/orders"    element={<Orders />}    />
          <Route path="/customers" element={<Customers />} />
        */}
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}