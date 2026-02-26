import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Products from "../pages/products/Products";
import Categories from "../pages/products/Categories";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login Page */}
      <Route path="/" element={<Login />} />

      {/* Admin Pages (wrapped inside layout) */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
    </Routes>
  );
}