// src/components/layout/Sidebar.jsx

import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Package, Monitor, ClipboardList,
  Layers, RotateCcw, Wallet, Users, UserCog,
  Truck, Tag, FileText, BookOpen, Image,
  Megaphone, Scissors, Zap, Globe, BarChart2,
  HelpCircle, ChevronRight, ChevronDown,
} from "lucide-react";

/* ─── PRODUCTS SUB-ITEMS ────────────────────────────── */
const productSubItems = [
  { label: "All Products",   path: "/products"            },
  { label: "All Categories", path: "/categories"          },
  { label: "All Variations", path: null                   },
  { label: "All Brands",     path: null                   },
  { label: "All Units",      path: null                   },
  { label: "All Taxes",      path: null                   },
];

/* ─── NAV SECTIONS ──────────────────────────────────── */
const navSections = [
  {
    items: [
      { icon: LayoutDashboard, label: "Dashboard",        path: "/dashboard"           },
      { icon: Package,         label: "Products",         path: null, accordion: true  },
      { icon: Monitor,         label: "Pos System",       path: null                   },
      { icon: ClipboardList,   label: "Orders",           path: null, badge: "New"     },
      { icon: Layers,          label: "Stocks",           path: null, arrow: true      },
      { icon: RotateCcw,       label: "Refunds",          path: null, arrow: true      },
      { icon: Wallet,          label: "Rewards & Wallet", path: null, arrow: true      },
    ],
  },
  {
    title: "USERS",
    items: [
      { icon: Users,   label: "Customers",       path: null                   },
      { icon: UserCog, label: "Employee Staffs", path: null                   },
      { icon: Truck,   label: "Delivery Men",    path: null, arrow: true      },
    ],
  },
  {
    title: "CONTENTS",
    items: [
      { icon: Tag,      label: "Tags",          path: null                 },
      { icon: FileText, label: "Pages",         path: null                 },
      { icon: BookOpen, label: "Blogs",         path: null, arrow: true    },
      { icon: Image,    label: "Media Manager", path: null                 },
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
    items: [{ icon: BarChart2,  label: "Reports", path: null, arrow: true }],
  },
  {
    title: "SUPPORT",
    items: [{ icon: HelpCircle, label: "Queries", path: null }],
  },
];

/* ─── COMPONENT ─────────────────────────────────────── */

export default function Sidebar() {
  const location = useLocation();

  // Auto-open Products accordion if current path is a product sub-route
  const productPaths = productSubItems.map((s) => s.path).filter(Boolean);
  const isProductRoute = productPaths.some((p) => location.pathname.startsWith(p));
  const [productsOpen, setProductsOpen] = useState(isProductRoute);

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

            {/* Section title */}
            {section.title && (
              <div style={{
                padding: "10px 18px 3px",
                fontSize: 10, fontWeight: 600,
                color: "#94a3b8", letterSpacing: "0.08em",
              }}>
                {section.title}
              </div>
            )}

            {section.items.map((item, ii) => {

              /* ── Products accordion ── */
              if (item.accordion) {
                const parentActive = isProductRoute;
                return (
                  <div key={ii}>
                    {/* Accordion trigger */}
                    <div
                      onClick={() => setProductsOpen((o) => !o)}
                      style={{
                        display: "flex", alignItems: "center", gap: 9,
                        padding: "7px 18px", cursor: "pointer",
                        background: parentActive ? "#f0fdf4" : "transparent",
                        borderRight: parentActive ? "3px solid #22c55e" : "3px solid transparent",
                        transition: "background 0.15s",
                        userSelect: "none",
                      }}
                    >
                      <item.icon size={15} color={parentActive ? "#22c55e" : "#64748b"} />
                      <span style={{ fontSize: 13, color: parentActive ? "#22c55e" : "#374151", flex: 1 }}>
                        {item.label}
                      </span>
                      {/* Rotate chevron when open */}
                      <div style={{
                        transition: "transform 0.2s",
                        transform: productsOpen ? "rotate(90deg)" : "rotate(0deg)",
                        display: "flex", alignItems: "center",
                      }}>
                        <ChevronRight size={13} color="#94a3b8" />
                      </div>
                    </div>

                    {/* Sub-items — slide open/closed */}
                    <div style={{
                      overflow: "hidden",
                      maxHeight: productsOpen ? `${productSubItems.length * 36}px` : "0px",
                      transition: "max-height 0.25s ease",
                      background: "#f8fafc",
                    }}>
                      {productSubItems.map((sub, si2) =>
                        sub.path ? (
                          <NavLink
                            key={si2}
                            to={sub.path}
                            style={({ isActive }) => ({
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "7px 18px 7px 38px",
                              textDecoration: "none",
                              borderRight: isActive ? "3px solid #22c55e" : "3px solid transparent",
                              background: isActive ? "#f0fdf4" : "transparent",
                              transition: "background 0.15s",
                            })}
                          >
                            {({ isActive }) => (
                              <>
                                {/* Dash bullet */}
                                <span style={{
                                  fontSize: 14, lineHeight: 1,
                                  color: isActive ? "#22c55e" : "#94a3b8",
                                  flexShrink: 0,
                                }}>–</span>
                                <span style={{
                                  fontSize: 12,
                                  color: isActive ? "#22c55e" : "#374151",
                                  fontWeight: isActive ? 600 : 400,
                                }}>
                                  {sub.label}
                                </span>
                              </>
                            )}
                          </NavLink>
                        ) : (
                          /* Sub-item with no route yet */
                          <div
                            key={si2}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "7px 18px 7px 38px",
                              borderRight: "3px solid transparent",
                              cursor: "default", opacity: 0.7,
                            }}
                          >
                            <span style={{ fontSize: 14, lineHeight: 1, color: "#94a3b8", flexShrink: 0 }}>–</span>
                            <span style={{ fontSize: 12, color: "#374151" }}>{sub.label}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );
              }

              /* ── Regular routed item ── */
              if (item.path) {
                return (
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
                );
              }

              /* ── Plain item (no route yet) ── */
              return (
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
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}