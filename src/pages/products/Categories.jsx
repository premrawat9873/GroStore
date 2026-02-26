// src/pages/products/Categories.jsx

import { useState } from "react";
import { Search, Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── MOCK DATA ─────────────────────────────────────── */
const allCategories = [
  { id: 1,  name: "Fresh Chicken",  baseCategory: "N/A", brands: "N/A", priority: 1, theme: ["Halal Food", "Organic"], color: "#22c55e" },
  { id: 2,  name: "Chair",          baseCategory: "N/A", brands: "N/A", priority: 1, theme: ["Furniture"],             color: "#f97316" },
  { id: 3,  name: "Cleaning",       baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#22c55e" },
  { id: 4,  name: "Breakfast",      baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#f97316" },
  { id: 5,  name: "Baby Care",      baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#3b82f6" },
  { id: 6,  name: "Pet Care",       baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#a855f7" },
  { id: 7,  name: "Jam & Jelly",    baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#f97316" },
  { id: 8,  name: "Honey",          baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#eab308" },
  { id: 9,  name: "Cold Drinks",    baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#22c55e" },
  { id: 10, name: "Fress Organic",  baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],    color: "#22c55e" },
  { id: 11, name: "Fress Fruits",   baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#ec4899" },
  { id: 12, name: "Coffee Drinks",  baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#f97316" },
  { id: 13, name: "Vegetables",     baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#22c55e" },
  { id: 14, name: "Butter",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#f97316" },
  { id: 15, name: "Parent key",     baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#eab308" },
  { id: 16, name: "Dairy Products", baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#3b82f6" },
  { id: 17, name: "Snacks",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#a855f7" },
  { id: 18, name: "Bakery",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#f97316" },
  { id: 19, name: "Frozen Foods",   baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#3b82f6" },
  { id: 20, name: "Sea Food",       baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery", "Organic"],   color: "#22c55e" },
  { id: 21, name: "Spices",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#ef4444" },
  { id: 22, name: "Beverages",      baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],              color: "#3b82f6" },
];

const PAGE_SIZE = 15;

/* ─── HELPER: colored icon circle ───────────────────── */
function CategoryIcon({ name, color }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%",
      background: color + "22",
      border: `1px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      fontSize: 12, fontWeight: 700, color,
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* ─── ACTION MENU ────────────────────────────────────── */
function ActionMenu({ id, openId, setOpenId }) {
  const isOpen = openId === id;
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpenId(isOpen ? null : id)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", borderRadius: 4, display: "flex", alignItems: "center" }}
      >
        <MoreVertical size={16} color="#94a3b8" />
      </button>
      {isOpen && (
        <div style={{
          position: "absolute", right: 0, top: 24, zIndex: 50,
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          minWidth: 130, overflow: "hidden",
        }}>
          {["View", "Edit", "Delete"].map((action) => (
            <div
              key={action}
              onClick={() => setOpenId(null)}
              style={{
                padding: "8px 16px", fontSize: 13,
                color: action === "Delete" ? "#ef4444" : "#374151",
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function Categories() {
  const [search, setSearch]     = useState("");
  const [page, setPage]         = useState(1);
  const [openMenu, setOpenMenu] = useState(null);

  /* filter */
  const filtered = allCategories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = () => { setPage(1); };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ── Page header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", margin: 0 }}>Categories</h1>
        <button style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 16px", borderRadius: 8,
          background: "#22c55e", border: "none",
          fontSize: 13, color: "#fff", fontWeight: 500, cursor: "pointer",
        }}>
          <Plus size={15} /> Add Category
        </button>
      </div>

      {/* ── Card ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>

        {/* Search bar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 10 }}>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 8,
            border: "1px solid #e5e7eb", borderRadius: 8,
            padding: "7px 12px", background: "#fff",
          }}>
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", flex: 1, background: "transparent" }}
            />
          </div>
          <button
            onClick={handleSearch}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 16px", borderRadius: 8,
              border: "1px solid #e5e7eb", background: "#fff",
              fontSize: 13, color: "#374151", cursor: "pointer",
            }}
          >
            <Search size={13} color="#64748b" /> Search
          </button>
        </div>

        {/* ── Table ── */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#fafafa" }}>
                {["S/L", "Category Name", "Base Category", "Brands", "Priority", "Theme", "Action"].map((h) => (
                  <th key={h} style={{
                    textAlign: "left", fontSize: 12, fontWeight: 600,
                    color: "#64748b", padding: "10px 16px", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "40px 16px", textAlign: "center", fontSize: 13, color: "#94a3b8" }}>
                    No categories found.
                  </td>
                </tr>
              ) : paginated.map((cat, i) => (
                <tr
                  key={cat.id}
                  style={{ borderBottom: "1px solid #f8fafc", transition: "background 0.1s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* S/L */}
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#64748b", width: 48 }}>
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>

                  {/* Category Name */}
                  <td style={{ padding: "10px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <CategoryIcon name={cat.name} color={cat.color} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{cat.name}</span>
                    </div>
                  </td>

                  {/* Base Category */}
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#94a3b8" }}>{cat.baseCategory}</td>

                  {/* Brands */}
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#94a3b8" }}>{cat.brands}</td>

                  {/* Priority */}
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#374151" }}>{cat.priority}</td>

                  {/* Theme */}
                  <td style={{ padding: "10px 16px", fontSize: 13, color: "#374151" }}>
                    {`[${cat.theme.map((t) => `"${t}"`).join(";")}]`}
                  </td>

                  {/* Action */}
                  <td style={{ padding: "10px 16px" }}>
                    <ActionMenu id={cat.id} openId={openMenu} setOpenId={setOpenMenu} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Footer: results count + pagination ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px", borderTop: "1px solid #f1f5f9",
        }}>
          {/* Results text */}
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
          </span>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  width: 30, height: 30, borderRadius: 6,
                  border: "1px solid #e5e7eb", background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  opacity: page === 1 ? 0.4 : 1,
                }}
              >
                <ChevronLeft size={14} color="#374151" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: p === page ? "none" : "1px solid #e5e7eb",
                    background: p === page ? "#22c55e" : "#fff",
                    color: p === page ? "#fff" : "#374151",
                    fontSize: 13, fontWeight: p === page ? 600 : 400,
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  width: 30, height: 30, borderRadius: 6,
                  border: "1px solid #e5e7eb", background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  opacity: page === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronRight size={14} color="#374151" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}