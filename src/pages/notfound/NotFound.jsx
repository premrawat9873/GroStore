// src/pages/notfound/NotFound.jsx

import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8fafc",
      fontFamily: "system-ui, sans-serif",
      gap: 16,
    }}>
      <div style={{ fontSize: 80, fontWeight: 800, color: "#e5e7eb", lineHeight: 1 }}>404</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: "#1e293b" }}>Page Not Found</div>
      <div style={{ fontSize: 14, color: "#94a3b8" }}>The page you're looking for doesn't exist.</div>
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: 8,
          padding: "10px 24px",
          borderRadius: 10,
          background: "#22c55e",
          border: "none",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}