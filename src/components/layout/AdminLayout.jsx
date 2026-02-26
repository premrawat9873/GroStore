// src/components/layout/AdminLayout.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar  from "./Topbar";

export default function AdminLayout() {
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "system-ui, sans-serif",
    }}>
      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Right column: topbar + page content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        overflow: "hidden",
      }}>
        <Topbar />

        {/* Each child route renders here */}
        <main style={{ flex: 1, overflowY: "auto", padding: 20 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}