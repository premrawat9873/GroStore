// src/pages/products/Products.jsx

import { useState, useEffect } from "react";
import { Search, MoreVertical, ChevronRight, Upload, Download, Plus } from "lucide-react";
import { productStore } from "../../data/productStore";
import {
  Toggle, FeaturedDot, ProductIcon, Pagination,
  ViewProductModal, ProductFormModal, ConfirmDialog,
} from "../../components/common/ProductUI";

const PAGE_SIZE = 15;

/* ─── Colorful theme chips ───────────────────────────── */
const THEME_COLORS = {
  "Grocery":     { bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
  "Organic":     { bg: "#ecfdf5", color: "#059669", border: "#6ee7b7" },
  "Halal Food":  { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Furniture":   { bg: "#faf5ff", color: "#7c3aed", border: "#ddd6fe" },
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
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, minWidth: 140 }}>
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

/* ─── Action menu ────────────────────────────────────── */
function ActionMenu({ product, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen((o) => !o)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", borderRadius: 4, display: "flex" }}>
        <MoreVertical size={16} color="#94a3b8" />
      </button>
      {open && (
        <div style={{
          position: "absolute", right: 0, top: 26, zIndex: 100,
          background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,.10)", minWidth: 130, overflow: "hidden",
        }}>
          {[
            { label: "View",   action: () => { onView(product);   setOpen(false); } },
            { label: "Edit",   action: () => { onEdit(product);   setOpen(false); } },
            { label: "Delete", action: () => { onDelete(product); setOpen(false); }, danger: true },
          ].map(({ label, action, danger }) => (
            <div key={label} onClick={action}
              style={{ padding: "8px 16px", fontSize: 13, color: danger ? "#ef4444" : "#374151", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >{label}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Dropdown ───────────────────────────────────────── */
function Dropdown({ value, placeholder, options, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen((o) => !o)} style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 14px", borderRadius: 8,
        border: "1px solid #e5e7eb", background: "#fff",
        fontSize: 13, color: value ? "#1e293b" : "#94a3b8",
        cursor: "pointer", whiteSpace: "nowrap", minWidth: 140,
      }}>
        {value || placeholder}
        <ChevronRight size={13} color="#94a3b8" style={{ marginLeft: "auto", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform .2s" }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: 38, left: 0, zIndex: 100,
          background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,.10)", minWidth: "100%", overflow: "hidden",
        }}>
          {[["", placeholder], ...options].map(([v, l]) => (
            <div key={v} onClick={() => { onChange(v); setOpen(false); }}
              style={{ padding: "8px 14px", fontSize: 13, color: v ? "#374151" : "#94a3b8", cursor: "pointer", background: value === v && v ? "#f0fdf4" : "transparent" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = value === v && v ? "#f0fdf4" : "transparent"}
            >{l}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────── */
export default function Products() {
  const [products, setProducts] = useState(productStore.getAll());
  const [search, setSearch]     = useState("");
  const [brand, setBrand]       = useState("");
  const [status, setStatus]     = useState("");
  const [page, setPage]         = useState(1);

  const [viewProduct, setViewProduct]   = useState(null);
  const [editProduct, setEditProduct]   = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [showAdd, setShowAdd]           = useState(false);

  // Subscribe to store changes
  useEffect(() => productStore.subscribe(setProducts), []);

  const brands  = [...new Set(products.map((p) => p.brand))];
  const filtered = products.filter((p) => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase());
    const mb = !brand  || p.brand === brand;
    const mv = !status || (status === "published" ? p.published : !p.published);
    return ms && mb && mv;
  });
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const th = { textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", padding: "10px 14px", whiteSpace: "nowrap", background: "#fafafa" };
  const td = { padding: "10px 14px", whiteSpace: "nowrap", fontSize: 13, color: "#374151" };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }} onClick={() => {}}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", margin: 0 }}>Products</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn color="#ef4444" icon={<Upload size={14}/>}>Export</Btn>
          <Btn color="#f97316" icon={<Download size={14}/>}>Import</Btn>
          <Btn color="#22c55e" icon={<Plus size={14}/>} onClick={() => setShowAdd(true)}>Add Product</Btn>
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
        {/* Filters */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8, border: "1px solid #e5e7eb", borderRadius: 8, padding: "7px 12px" }}>
            <Search size={14} color="#94a3b8" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search" style={{ border: "none", outline: "none", fontSize: 13, flex: 1, background: "transparent", color: "#1e293b" }} />
          </div>
          <Dropdown value={brand} placeholder="Select Brand"
            options={brands.map((b) => [b, b])}
            onChange={(v) => { setBrand(v); setPage(1); }} />
          <Dropdown value={status} placeholder="Select Status"
            options={[["published","Published"],["unpublished","Unpublished"]]}
            onChange={(v) => { setStatus(v); setPage(1); }} />
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 13, cursor: "pointer" }}>
            <Search size={13} color="#64748b" /> Search
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                {["S/L","Product Name","Brand","Categories","Price","Published","Themes","Is Featured","Action"].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0
                ? <tr><td colSpan={9} style={{ padding: 40, textAlign: "center", fontSize: 13, color: "#94a3b8" }}>No products found.</td></tr>
                : paginated.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid #f8fafc" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                    <td style={td}>{(page - 1) * PAGE_SIZE + i + 1}</td>
                    <td style={{ ...td, minWidth: 200 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {p.img
                          ? <img src={p.img} alt={p.name} style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover", border: "1px solid #e5e7eb", flexShrink: 0 }} />
                          : <ProductIcon name={p.name} id={p.id} />}
                        <span style={{ fontWeight: 500, color: "#1e293b", lineHeight: 1.4 }}>{p.name}</span>
                      </div>
                    </td>
                    <td style={td}>{p.brand}</td>
                    <td style={{ ...td, minWidth: 140 }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {p.categories.map((c, ci) => (
                          <span key={ci} style={{ fontSize: 11, padding: "2px 7px", borderRadius: 4, background: "#f1f5f9", color: "#64748b", border: "1px solid #e5e7eb" }}>{c}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ ...td, fontWeight: 600, color: "#22c55e" }}>
                      ${p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={td}>
                      <Toggle value={p.published} onChange={(v) => productStore.update(p.id, { published: v })} />
                    </td>
                    <td style={{ ...td, fontSize: 12 }}>
                      <ThemeChips themes={p.themes} />
                    </td>
                    <td style={td}>
                      <FeaturedDot value={p.featured} onChange={(v) => productStore.update(p.id, { featured: v })} />
                    </td>
                    <td style={td}>
                      <ActionMenu product={p}
                        onView={setViewProduct}
                        onEdit={setEditProduct}
                        onDelete={setDeleteProduct} />
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
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
      {/* Modals */}
      <ViewProductModal open={!!viewProduct} onClose={() => setViewProduct(null)} product={viewProduct} />
      <ProductFormModal open={!!editProduct} onClose={() => setEditProduct(null)} initial={editProduct}
        onSave={(data) => productStore.update(editProduct.id, data)} />
      <ProductFormModal open={showAdd} onClose={() => setShowAdd(false)} initial={null}
        onSave={(data) => productStore.add(data)} />
      <ConfirmDialog open={!!deleteProduct} onClose={() => setDeleteProduct(null)} name={deleteProduct?.name}
        onConfirm={() => productStore.delete(deleteProduct.id)} />
    </div>
  );
}

function Btn({ children, color, icon, onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, background: color, border: "none", fontSize: 13, color: "#fff", fontWeight: 500, cursor: "pointer" }}>
      {icon}{children}
    </button>
  );
}