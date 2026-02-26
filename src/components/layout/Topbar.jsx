// src/components/layout/Topbar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Globe, Moon, Search, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [avatarOpen, setAvatarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

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
          style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", background: "transparent", width: 160 }}
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

        {/* Avatar dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setAvatarOpen((o) => !o)}
            style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
          >
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "#22c55e",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 13,
            }}>
              {user?.name?.charAt(0) || "A"}
            </div>
            <ChevronDown size={13} color="#64748b" style={{ transition: "transform .2s", transform: avatarOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
          </div>

          {avatarOpen && (
            <div style={{
              position: "absolute", right: 0, top: 38, zIndex: 50,
              background: "#fff", border: "1px solid #e5e7eb",
              borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,.12)",
              minWidth: 180, overflow: "hidden",
            }}>
              {/* User info */}
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{user?.name || "Admin"}</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{user?.email}</div>
              </div>

              {/* Menu items */}
              {[
                { label: "Profile", icon: "👤" },
                { label: "Settings", icon: "⚙️" },
              ].map(({ label, icon }) => (
                <div key={label}
                  onClick={() => setAvatarOpen(false)}
                  style={{ padding: "9px 16px", fontSize: 13, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span>{icon}</span> {label}
                </div>
              ))}

              <div style={{ borderTop: "1px solid #f1f5f9" }}>
                <div
                  onClick={handleLogout}
                  style={{ padding: "9px 16px", fontSize: 13, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontWeight: 500 }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fff5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <LogOut size={14} /> Sign Out
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}