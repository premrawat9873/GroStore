// src/components/layout/Sidebar.jsx

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, Monitor, ClipboardList,
  Layers, RotateCcw, Wallet, Users, UserCog,
  Truck, Tag, FileText, BookOpen, Image,
  Megaphone, Scissors, Zap, Globe, BarChart2,
  HelpCircle, ChevronRight,
} from "lucide-react";

/* ─── NAV SECTIONS ──────────────────────────────────────
   Set path: null for items that don't have a page yet —
   they'll render as a plain div instead of a NavLink.
──────────────────────────────────────────────────────── */
const navSections = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard",        path: "/dashboard"  },
      { icon: Package,         label: "Products",         path: "/products",  arrow: true },
      { icon: Monitor,         label: "Pos System",       path: null          },
      { icon: ClipboardList,   label: "Orders",           path: null,         badge: "New" },
      { icon: Layers,          label: "Stocks",           path: null,         arrow: true },
      { icon: RotateCcw,       label: "Refunds",          path: null,         arrow: true },
      { icon: Wallet,          label: "Rewards & Wallet", path: null,         arrow: true },
    ],
  },
  {
    title: "USERS",
    items: [
      { icon: Users,   label: "Customers",       path: null },
      { icon: UserCog, label: "Employee Staffs", path: null },
      { icon: Truck,   label: "Delivery Men",    path: null, arrow: true },
    ],
  },
  {
    title: "CONTENTS",
    items: [
      { icon: Tag,      label: "Tags",          path: null },
      { icon: FileText, label: "Pages",         path: null },
      { icon: BookOpen, label: "Blogs",         path: null, arrow: true },
      { icon: Image,    label: "Media Manager", path: null },
    ],
  },
  {
    title: "PROMOTIONS",
    items: [
      { icon: Megaphone, label: "Newsletters", path: null },
      { icon: Scissors,  label: "Coupons",     path: null },
      { icon: Zap,       label: "Campaigns",   path: null },
    ],
  },
  {
    title: "FULFILMENT",
    items: [
      { icon: Globe, label: "Logistics",      path: null },
      { icon: Truck, label: "Shipping Zones", path: null },
    ],
  },
  {
    title: "REPORTS",
    items: [
      { icon: BarChart2,  label: "Reports", path: null, arrow: true },
    ],
  },
  {
    title: "SUPPORT",
    items: [
      { icon: HelpCircle, label: "Queries", path: null },
    ],
  },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function Sidebar() {
  return (
    <aside style={{
      width: 210,
      flexShrink: 0,
      background: "#fff",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      position: "sticky",
      top: 0,
      height: "100vh",
    }}>

      {/* ── Logo ── */}
      <div style={{
        padding: "14px 18px",
        borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", gap: 8,
        flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, background: "#f97316", borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>G</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: "#1e293b" }}>Grostore</span>
        <div style={{
          marginLeft: "auto", width: 20, height: 20,
          background: "#22c55e", borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ChevronRight size={11} color="#fff" />
        </div>
      </div>

      {/* ── Admin profile ── */}
      <div style={{
        padding: "10px 18px",
        borderBottom: "1px solid #f1f5f9",
        display: "flex", alignItems: "center", gap: 9,
        flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "#e2e8f0",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, color: "#64748b", flexShrink: 0,
        }}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>admin</div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>Super Admin</div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: "6px 0 24px" }}>
        {navSections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <div style={{
                padding: "10px 18px 3px",
                fontSize: 10, fontWeight: 600,
                color: "#94a3b8", letterSpacing: "0.08em",
              }}>
                {section.title}
              </div>
            )}

            {section.items.map((item, ii) =>
              item.path ? (
                /* ── Routed item: NavLink ── */
                <NavLink
                  key={ii}
                  to={item.path}
                  style={({ isActive }) => ({
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "7px 18px",
                    textDecoration: "none",
                    background: isActive ? "#f0fdf4" : "transparent",
                    borderRight: isActive ? "3px solid #22c55e" : "3px solid transparent",
                    transition: "background 0.15s",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={15} color={isActive ? "#22c55e" : "#64748b"} />
                      <span style={{ fontSize: 13, color: isActive ? "#22c55e" : "#374151", flex: 1 }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span style={{
                          fontSize: 10, background: "#ef4444", color: "#fff",
                          borderRadius: 4, padding: "1px 5px",
                        }}>{item.badge}</span>
                      )}
                      {item.arrow && <ChevronRight size={12} color="#94a3b8" />}
                    </>
                  )}
                </NavLink>
              ) : (
                /* ── No route yet: plain div ── */
                <div
                  key={ii}
                  style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "7px 18px", cursor: "default",
                    borderRight: "3px solid transparent",
                    opacity: 0.85,
                  }}
                >
                  <item.icon size={15} color="#64748b" />
                  <span style={{ fontSize: 13, color: "#374151", flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: 10, background: "#ef4444", color: "#fff",
                      borderRadius: 4, padding: "1px 5px",
                    }}>{item.badge}</span>
                  )}
                  {item.arrow && <ChevronRight size={12} color="#94a3b8" />}
                </div>
              )
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}