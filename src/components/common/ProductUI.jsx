// src/components/common/ProductUI.jsx
// Shared: Toggle, FeaturedDot, ProductIcon, PageBtn, Modal, ConfirmDialog, ProductForm

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Upload } from "lucide-react";

/* ─── colour palette for icons ─ */
const ICON_COLORS = ["#22c55e","#3b82f6","#f97316","#a855f7","#ef4444","#eab308","#ec4899","#06b6d4"];

export function productColor(id) { return ICON_COLORS[id % ICON_COLORS.length]; }

/* ─── Toggle ────────────────────────────────────────── */
export function Toggle({ value, onChange }) {
  return (
    <div
      onClick={() => onChange && onChange(!value)}
      style={{
        width: 36, height: 20, borderRadius: 10,
        background: value ? "#22c55e" : "#e5e7eb",
        position: "relative", cursor: onChange ? "pointer" : "default",
        flexShrink: 0, transition: "background 0.2s",
      }}
    >
      <div style={{
        position: "absolute", top: 2, left: value ? 18 : 2,
        width: 16, height: 16, borderRadius: "50%",
        background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,.2)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

/* ─── Featured dot ───────────────────────────────────── */
export function FeaturedDot({ value, onChange }) {
  return (
    <div
      onClick={() => onChange && onChange(!value)}
      style={{
        width: 22, height: 22, borderRadius: "50%",
        background: value ? "#22c55e" : "#e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: onChange ? "pointer" : "default",
        transition: "background 0.2s",
      }}
    >
      {value && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

/* ─── Product icon ───────────────────────────────────── */
export function ProductIcon({ name, id, size = 32 }) {
  const color = productColor(id);
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      background: color + "20", border: `1px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontSize: size * 0.38, fontWeight: 700, color,
    }}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* ─── Page button ────────────────────────────────────── */
export function PageBtn({ children, onClick, disabled, active }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 30, height: 30, borderRadius: 6,
      border: active ? "none" : "1px solid #e5e7eb",
      background: active ? "#22c55e" : "#fff",
      color: active ? "#fff" : "#374151",
      fontSize: 13, fontWeight: active ? 600 : 400,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.4 : 1,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {children}
    </button>
  );
}

export function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
        <ChevronLeft size={14} />
      </PageBtn>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <PageBtn key={p} onClick={() => setPage(p)} active={p === page}>{p}</PageBtn>
      ))}
      <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
        <ChevronRight size={14} />
      </PageBtn>
    </div>
  );
}

/* ─── Modal backdrop ─────────────────────────────────── */
export function Modal({ open, onClose, title, children, width = 540 }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 14, width: "100%", maxWidth: width,
        maxHeight: "90vh", overflow: "auto",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", borderBottom: "1px solid #f1f5f9",
        }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1e293b" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}>
            <X size={18} color="#94a3b8" />
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Confirm delete dialog ──────────────────────────── */
export function ConfirmDialog({ open, onClose, onConfirm, name }) {
  return (
    <Modal open={open} onClose={onClose} title="Delete Product" width={420}>
      <p style={{ margin: "0 0 20px", fontSize: 14, color: "#374151", lineHeight: 1.6 }}>
        Are you sure you want to delete <strong>{name}</strong>? This action cannot be undone.
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={{
          padding: "8px 18px", borderRadius: 8, border: "1px solid #e5e7eb",
          background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer",
        }}>Cancel</button>
        <button onClick={() => { onConfirm(); onClose(); }} style={{
          padding: "8px 18px", borderRadius: 8, border: "none",
          background: "#ef4444", fontSize: 13, color: "#fff", cursor: "pointer",
        }}>Delete</button>
      </div>
    </Modal>
  );
}

/* ─── View product modal ─────────────────────────────── */
export function ViewProductModal({ open, onClose, product }) {
  if (!product) return null;
  const color = productColor(product.id);
  return (
    <Modal open={open} onClose={onClose} title="Product Details" width={500}>
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        {product.img ? (
          <img src={product.img} alt={product.name} style={{ width: 80, height: 80, borderRadius: 10, objectFit: "cover", border: "1px solid #e5e7eb" }} />
        ) : (
          <div style={{ width: 80, height: 80, borderRadius: 10, background: color + "20", border: `2px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color, flexShrink: 0 }}>
            {product.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600, color: "#1e293b" }}>{product.name}</h3>
          <p style={{ margin: "0 0 6px", fontSize: 13, color: "#64748b" }}>Brand: {product.brand}</p>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#22c55e" }}>
            ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
      {[
        ["Categories", product.categories.join(", ")],
        ["Themes",     product.themes.join(", ")],
        ["Published",  product.published ? "Yes" : "No"],
        ["Featured",   product.featured  ? "Yes" : "No"],
      ].map(([k, v]) => (
        <div key={k} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #f8fafc" }}>
          <span style={{ fontSize: 13, color: "#94a3b8", minWidth: 100 }}>{k}</span>
          <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>{v}</span>
        </div>
      ))}
    </Modal>
  );
}

/* ─── Add / Edit product form modal ──────────────────── */
const EMPTY = { name: "", brand: "", categories: "", price: "", themes: "", published: true, featured: false, img: null };

export function ProductFormModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (open) {
      if (initial) {
        setForm({
          ...initial,
          categories: initial.categories.join(", "),
          themes:     initial.themes.join(", "),
        });
        setPreview(initial.img || null);
      } else {
        setForm(EMPTY);
        setPreview(null);
      }
    }
  }, [open, initial]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPreview(ev.target.result); set("img", ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim()) return alert("Product name is required.");
    onSave({
      ...form,
      price:      parseFloat(form.price) || 0,
      categories: form.categories.split(",").map((s) => s.trim()).filter(Boolean),
      themes:     form.themes.split(",").map((s) => s.trim()).filter(Boolean),
    });
    onClose();
  };

  const inputStyle = {
    width: "100%", padding: "8px 12px", border: "1px solid #e5e7eb",
    borderRadius: 8, fontSize: 13, color: "#1e293b", outline: "none",
    boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 };
  const rowStyle   = { marginBottom: 14 };

  return (
    <Modal open={open} onClose={onClose} title={initial ? "Edit Product" : "Add Product"} width={520}>
      {/* Image upload */}
      <div style={{ ...rowStyle, display: "flex", alignItems: "center", gap: 14 }}>
        <div
          onClick={() => fileRef.current.click()}
          style={{
            width: 72, height: 72, borderRadius: 10, cursor: "pointer",
            background: "#f8fafc", border: "2px dashed #e5e7eb",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            overflow: "hidden", flexShrink: 0,
          }}
        >
          {preview
            ? <img src={preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <><Upload size={20} color="#94a3b8" /><span style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>Upload</span></>
          }
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>Product Image</div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>Click to upload (JPG, PNG)</div>
        </div>
      </div>

      <div style={rowStyle}>
        <label style={labelStyle}>Product Name *</label>
        <input style={inputStyle} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Fresh Chicken Wings" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Brand</label>
          <input style={inputStyle} value={form.brand} onChange={(e) => set("brand", e.target.value)} placeholder="e.g. Bird Wings" />
        </div>
        <div>
          <label style={labelStyle}>Price ($)</label>
          <input style={inputStyle} type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="0.00" />
        </div>
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Categories <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
        <input style={inputStyle} value={form.categories} onChange={(e) => set("categories", e.target.value)} placeholder="e.g. Fresh Chicken, Duck Meat" />
      </div>
      <div style={rowStyle}>
        <label style={labelStyle}>Themes <span style={{ fontWeight: 400, color: "#94a3b8" }}>(comma separated)</span></label>
        <input style={inputStyle} value={form.themes} onChange={(e) => set("themes", e.target.value)} placeholder="e.g. Grocery, Organic" />
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#374151" }}>
          <Toggle value={form.published} onChange={(v) => set("published", v)} /> Published
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: "#374151" }}>
          <FeaturedDot value={form.featured} onChange={(v) => set("featured", v)} /> Featured
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <button onClick={onClose} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #e5e7eb", background: "#fff", fontSize: 13, color: "#374151", cursor: "pointer" }}>
          Cancel
        </button>
        <button onClick={handleSave} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#22c55e", fontSize: 13, color: "#fff", cursor: "pointer", fontWeight: 600 }}>
          {initial ? "Save Changes" : "Add Product"}
        </button>
      </div>
    </Modal>
  );
}