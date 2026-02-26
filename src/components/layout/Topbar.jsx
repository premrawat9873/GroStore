// src/components/layout/Topbar.jsx

import { Bell, Globe, Moon, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      padding: "0 24px",
      height: 50,
      display: "flex",
      alignItems: "center",
      gap: 14,
      flexShrink: 0,
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Search size={15} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search..."
          style={{
            border: "none", outline: "none",
            fontSize: 13, color: "#374151",
            background: "transparent", width: 160,
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Right side controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Globe size={15} color="#64748b" style={{ cursor: "pointer" }} />
        <span style={{ fontSize: 12, color: "#374151" }}>🇺🇸 English</span>
        <span style={{ fontSize: 12, color: "#374151" }}>$ USD</span>
        <Moon size={15} color="#64748b" style={{ cursor: "pointer" }} />
        <Bell size={15} color="#64748b" style={{ cursor: "pointer" }} />

        {/* Avatar */}
        <div style={{
          width: 30, height: 30,
          borderRadius: "50%",
          background: "#22c55e",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontWeight: 700, fontSize: 13,
          cursor: "pointer",
        }}>
          A
        </div>
      </div>
    </header>
  );
}