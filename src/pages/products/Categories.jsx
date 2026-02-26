// src/pages/products/Categories.jsx

import { useState } from "react";
import { Search, Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Modal, ConfirmDialog } from "../../components/common/ProductUI";

const INITIAL_CATEGORIES = [
  { id: 1,  name: "Fresh Chicken",  baseCategory: "N/A", brands: "N/A", priority: 1, theme: ["Halal Food","Organic"], color: "#22c55e" },
  { id: 2,  name: "Chair",          baseCategory: "N/A", brands: "N/A", priority: 1, theme: ["Furniture"],            color: "#f97316" },
  { id: 3,  name: "Cleaning",       baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#22c55e" },
  { id: 4,  name: "Breakfast",      baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#f97316" },
  { id: 5,  name: "Baby Care",      baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#3b82f6" },
  { id: 6,  name: "Pet Care",       baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#a855f7" },
  { id: 7,  name: "Jam & Jelly",    baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#f97316" },
  { id: 8,  name: "Honey",          baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#eab308" },
  { id: 9,  name: "Cold Drinks",    baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#22c55e" },
  { id: 10, name: "Fress Organic",  baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],   color: "#22c55e" },
  { id: 11, name: "Fress Fruits",   baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#ec4899" },
  { id: 12, name: "Coffee Drinks",  baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#f97316" },
  { id: 13, name: "Vegetables",     baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#22c55e" },
  { id: 14, name: "Butter",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#f97316" },
  { id: 15, name: "Parent key",     baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#eab308" },
  { id: 16, name: "Dairy Products", baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#3b82f6" },
  { id: 17, name: "Snacks",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#a855f7" },
  { id: 18, name: "Bakery",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#f97316" },
  { id: 19, name: "Frozen Foods",   baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#3b82f6" },
  { id: 20, name: "Sea Food",       baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery","Organic"],  color: "#22c55e" },
  { id: 21, name: "Spices",         baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#ef4444" },
  { id: 22, name: "Beverages",      baseCategory: "N/A", brands: "N/A", priority: 0, theme: ["Grocery"],             color: "#3b82f6" },
];

const PAGE_SIZE = 15;
const COLORS = ["#22c55e","#3b82f6","#f97316","#a855f7","#ef4444","#eab308","#ec4899","#06b6d4"];

/* ─── Colorful theme chips ───────────────────────────── */
const THEME_COLORS = {
  "Grocery":    { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Organic":    { bg: "#ecfdf5", color: "#059669", border: "#6ee7b7" },
  "Halal Food": { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Furniture":  { bg: "#faf5ff", color: "#7c3aed", border: "#ddd6fe" },
};
const CHIP_FALLBACKS = [
  { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
  { bg: "#fdf4ff", color: "#a21caf", border: "#f0abfc" },
  { bg: "#fff1f2", color: "#be123c", border: "#fecdd3" },
  { bg: "#f0f9ff", color: "#0369a1", border: "#bae6fd" },
  { bg: "#fefce8", color: "#a16207", border: "#fef08a" },
  { bg: "#f0fdfa", color: "#0d9488", border: "#99f6e4" },
];
function themeStyle(name, idx) {
  return THEME_COLORS[name] || CHIP_FALLBACKS[idx % CHIP_FALLBACKS.length];
}
function ThemeChips({ themes }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
      {themes.map((t, i) => {
        const s = themeStyle(t, i);
        return (
          <span key={i} style={{
            fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 500,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
            whiteSpace: "nowrap",
          }}>{t}</span>
        );
      })}
    </div>
  );
}

/* ─── Category icon ──────────────────────────────────── */
function CatIcon({ name, color }) {
  return (
    <div style={{ width: 30, height: 30, borderRadius: "50%", background: color + "22", border: `1px solid ${color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* ─── Category form modal ────────────────────────────── */
const EMPTY_CAT = { name: "", baseCategory: "N/A", brands: "N/A", priority: 0, theme: [] };

function CategoryFormModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY_CAT);

  useState(() => { if (open) setForm(initial ? { ...initial, theme: initial.theme.join(", ") } : { ...EMPTY_CAT, theme: "" }); }, [open]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const inp = { width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, outline: "none", boxSizing: "border-box", color: "#1e293b" };
  const lbl = { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 };

  const handleSave = () => {
    if (!form.name.trim()) return alert("Category name required.");
    onSave({ ...form, theme: typeof form.theme === "string" ? form.theme.split(",").map((s) => s.trim()).filter(Boolean) : form.theme });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Category" : "Add Category"} width={460}>
      <div style={{ marginBottom: 14 }}><label style={lbl}>Category Name *</label><input style={inp} value={form.name || ""} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Fresh Fruits" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div><label style={lbl}>Base Category</label><input style={inp} value={form.baseCategory || ""} onChange={(e) => set("baseCategory", e.target.value)} /></div>
        <div><label style={lbl}>Priority</label><input style={inp} type="number" value={form.priority ?? 0} onChange={(e) => set("priority", parseInt(e.target.value) || 0)} /></div>
      </div>
      <div style={{ marginBottom: 14 }}><label style={lbl}>Brands</label><input style={inp} value={form.brands || ""} onChange={(e) => set("brands", e.target.value)} /></div>
      <div style={{ marginBottom: 20 }}><label style={lbl}>Themes <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label><input style={inp} value={typeof form.theme === "string" ? form.theme : (form.theme || []).join(", ")} onChange={(e) => set("theme", e.target.value)} placeholder="e.g. Grocery, Organic" /></div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 13, cursor: "pointer" }}>Cancel</button>
        <button onClick={handleSave} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#22c55e", fontSize: 13, color: "#fff", fontWeight: 600, cursor: "pointer" }}>{initial ? "Save" : "Add"}</button>
      </div>
    </Modal>
  );
}

/* ─── View modal ─────────────────────────────────────── */
function ViewCategoryModal({ open, onClose, cat }) {
  if (!cat) return null;
  return (
    <Modal open={open} onClose={onClose} title="Category Details" width={420}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
        <CatIcon name={cat.name} color={cat.color} />
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1e293b" }}>{cat.name}</h3>
      </div>
      {[["Base Category", cat.baseCategory], ["Brands", cat.brands], ["Priority", cat.priority], ["Themes", cat.theme.join(", ") || "—"]].map(([k, v]) => (
        <div key={k} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
          <span style={{ fontSize: 13, color: "#94a3b8", minWidth: 120 }}>{k}</span>
          <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{String(v)}</span>
        </div>
      ))}
    </Modal>
  );
}

/* ─── Action menu ────────────────────────────────────── */
function ActionMenu({ cat, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen((o) => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", borderRadius: 4, display: "flex" }}>
        <MoreVertical size={16} color="#94a3b8" />
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: 26, zIndex: 100, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,.10)", minWidth: 130, overflow: "hidden" }}>
          {[
            { label: "View",   fn: () => { onView(cat);   setOpen(false); } },
            { label: "Edit",   fn: () => { onEdit(cat);   setOpen(false); } },
            { label: "Delete", fn: () => { onDelete(cat); setOpen(false); }, danger: true },
          ].map(({ label, fn, danger }) => (
            <div key={label} onClick={fn} style={{ padding: "8px 16px", fontSize: 13, color: danger ? "#ef4444" : "#374151", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>{label}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────── */
export default function Categories() {
  const [cats, setCats]               = useState(INITIAL_CATEGORIES);
  const [search, setSearch]           = useState("");
  const [page, setPage]               = useState(1);
  const [viewCat, setViewCat]         = useState(null);
  const [editCat, setEditCat]         = useState(null);
  const [deleteCat, setDeleteCat]     = useState(null);
  const [showAdd, setShowAdd]         = useState(false);
  let nextId = Math.max(...cats.map((c) => c.id)) + 1;

  const addCat    = (data) => { setCats((prev) => [{ ...data, id: nextId++, color: COLORS[nextId % COLORS.length] }, ...prev]); };
  const updateCat = (id, data) => { setCats((prev) => prev.map((c) => c.id === id ? { ...c, ...data } : c)); };
  const deleteCatById = (id) => { setCats((prev) => prev.filter((c) => c.id !== id)); };

  const filtered   = cats.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const th = { textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", padding: "10px 16px", whiteSpace: "nowrap", background: "#fafafa" };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", margin: 0 }}>Categories</h1>
        <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "#22c55e", border: "none", fontSize: 13, color: "#fff", fontWeight: 500, cursor: "pointer" }}>
          <Plus size={15} /> Add Category
        </button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        {/* Search */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 10 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid #e5e7eb", borderRadius: 8, padding: "7px 12px" }}>
            <Search size={14} color="#94a3b8" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search"
              style={{ border: "none", outline: "none", fontSize: 13, flex: 1, background: "transparent", color: "#1e293b" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 13, cursor: "pointer" }}>
            <Search size={13} color="#64748b" /> Search
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["S/L","Category Name","Base Category","Brands","Priority","Theme","Action"].map((h) => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0
                ? <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", fontSize: 13, color: "#94a3b8" }}>No categories found.</td></tr>
                : paginated.map((cat, i) => (
                  <tr key={cat.id} style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={{ padding: "10px 16px", fontSize: 13, color: "#64748b", width: 48 }}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <CatIcon name={cat.name} color={cat.color} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{cat.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: 13, color: "#94a3b8" }}>{cat.baseCategory}</td>
                    <td style={{ padding: "10px 16px", fontSize: 13, color: "#94a3b8" }}>{cat.brands}</td>
                    <td style={{ padding: "10px 16px", fontSize: 13, color: "#374151" }}>{cat.priority}</td>
                    <td style={{ padding: "10px 16px" }}><ThemeChips themes={cat.theme} /></td>
                    <td style={{ padding: "10px 16px" }}>
                      <ActionMenu cat={cat} onView={setViewCat} onEdit={setEditCat} onDelete={setDeleteCat} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
          </span>
          {totalPages > 1 && (
            <div style={{ display: "flex", gap: 4 }}>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronLeft size={14} /></button>
              {Array.from({ length: totalPages }, (_, j) => j + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)} style={{ width: 30, height: 30, borderRadius: 6, border: p === page ? "none" : "1px solid #e5e7eb", background: p === page ? "#22c55e" : "#fff", color: p === page ? "#fff" : "#374151", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{p}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #e5e7eb", background: "#fff", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={14} /></button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ViewCategoryModal open={!!viewCat} onClose={() => setViewCat(null)} cat={viewCat} />
      <CategoryFormModal open={!!editCat} onClose={() => setEditCat(null)} initial={editCat} onSave={(d) => updateCat(editCat.id, d)} />
      <CategoryFormModal open={showAdd}   onClose={() => setShowAdd(false)} initial={null} onSave={addCat} />
      <ConfirmDialog open={!!deleteCat} onClose={() => setDeleteCat(null)} name={deleteCat?.name} onConfirm={() => deleteCatById(deleteCat.id)} />
    </div>
  );
}