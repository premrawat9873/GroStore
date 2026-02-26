// src/pages/products/Products.jsx

import { useState } from "react";
import { Search, Plus, MoreVertical, ChevronLeft, ChevronRight, Upload, Download } from "lucide-react";

/* ─── MOCK DATA ─────────────────────────────────────── */
const allProducts = [
  { id: 1,  name: "Audi Sheesham Wood Dining Chair",       brand: "Bird Wings", categories: ["Chair", "Sofa", "Bed"],                  price: 19975.00, published: true,  featured: false, themes: ["Furniture", "Organic"] },
  { id: 2,  name: "Melina Teakwood Dining Chair",          brand: "Bird Wings", categories: ["Chair", "Sofa", "Bed"],                  price: 3740.00,  published: true,  featured: false, themes: ["Furniture"] },
  { id: 3,  name: "Rigo Wooden Dining Chair",              brand: "Bird Wings", categories: ["Chair", "Table", "Dining Chair"],        price: 7225.00,  published: true,  featured: false, themes: ["Furniture"] },
  { id: 4,  name: "Lexus Marble Dining Chair",             brand: "Bird Wings", categories: ["Chair", "Sofa", "Bed"],                  price: 8415.00,  published: true,  featured: false, themes: ["Furniture"] },
  { id: 5,  name: "New York American Wooden Dining Chair", brand: "Bird Wings", categories: ["Chair", "Table", "Dining Chair"],        price: 5950.00,  published: true,  featured: false, themes: ["Furniture"] },
  { id: 6,  name: "Royaloak Terence Wooden Dining Chair",  brand: "Bird Wings", categories: ["Chair", "Sofa", "Bed"],                  price: 4675.00,  published: true,  featured: false, themes: ["Furniture"] },
  { id: 7,  name: "Wooden Showpiece Chair",                brand: "Bird Wings", categories: ["Chair", "Table", "Dining Chair"],        price: 12750.00, published: true,  featured: false, themes: ["Furniture"] },
  { id: 8,  name: "Lamb & Mutton Back Bacon",              brand: "Bird Wings", categories: ["Fresh Chicken", "Duck Meat"],            price: 0.00,     published: true,  featured: true,  themes: ["Grocery", "Halal Food", "Furniture", "Organic"] },
  { id: 9,  name: "Aged Beef Steak Beef",                  brand: "Bird Wings", categories: ["Fresh Chicken", "Duck Meat", "Fresh Beef"], price: 17000.00, published: true, featured: false, themes: ["Halal Food"] },
  { id: 10, name: "Steak Cattle Meat",                     brand: "Bird Wings", categories: ["Fresh Chicken", "Duck Meat", "Fresh Beef"], price: 8415.00,  published: true, featured: true,  themes: ["Halal Food", "Organic"] },
  { id: 11, name: "Aged Beef Steak Beef",                  brand: "Biofuel",    categories: ["Fresh Chicken", "Fresh Beef"],           price: 7480.00,  published: true,  featured: true,  themes: ["Halal Food", "Organic"] },
  { id: 12, name: "Aged Beef Steak Beef",                  brand: "Nexover",    categories: ["Fresh Chicken", "Fresh Mutton", "Duck Meat"], price: 8500.00, published: true, featured: true,  themes: ["Halal Food", "Organic"] },
  { id: 13, name: "Ribs Lamb & Mutton Meat",               brand: "Bird Wings", categories: ["Fresh Chicken"],                         price: 5100.00,  published: true,  featured: true,  themes: ["Halal Food", "Organic"] },
  { id: 14, name: "Chicken Meat Buffalo Wing",             brand: "Bird Wings", categories: ["Fresh Beef", "Duck Meat", "Fresh Chicken"], price: 1445.00, published: true,  featured: true,  themes: ["Halal Food", "Organic"] },
  { id: 15, name: "Aged Beef Steak Beef",                  brand: "Nexover",    categories: ["Fresh Chicken"],                         price: 3740.00,  published: true,  featured: false, themes: ["Halal Food"] },
  { id: 16, name: "Fresh Mutton Leg",                      brand: "Bird Wings", categories: ["Fresh Mutton", "Fresh Chicken"],         price: 4200.00,  published: false, featured: false, themes: ["Halal Food"] },
  { id: 17, name: "Organic Honey Premium",                 brand: "NatureFarm", categories: ["Honey", "Organic"],                      price: 1200.00,  published: true,  featured: true,  themes: ["Grocery", "Organic"] },
  { id: 18, name: "Cold Pressed Olive Oil",                brand: "OliveGold",  categories: ["Cooking Oil"],                           price: 980.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 19, name: "Basmati Rice Premium",                  brand: "RicePlus",   categories: ["Rice", "Grocery"],                       price: 560.00,   published: false, featured: false, themes: ["Grocery"] },
  { id: 20, name: "Whole Wheat Bread",                     brand: "BreadCo",    categories: ["Bakery"],                                price: 120.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 21, name: "Farm Fresh Eggs (12 pcs)",              brand: "FarmDirect", categories: ["Dairy", "Fresh"],                        price: 180.00,   published: true,  featured: false, themes: ["Grocery", "Organic"] },
  { id: 22, name: "Cheddar Cheese Block",                  brand: "DairyBest",  categories: ["Dairy", "Cheese"],                       price: 450.00,   published: true,  featured: true,  themes: ["Grocery"] },
  { id: 23, name: "Organic Cow Milk 1L",                   brand: "FarmDirect", categories: ["Dairy"],                                 price: 95.00,    published: true,  featured: false, themes: ["Grocery", "Organic"] },
  { id: 24, name: "Fresh Red Apples (1kg)",                brand: "FruitFarm",  categories: ["Fruits", "Fresh"],                       price: 220.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 25, name: "Organic Bananas (6 pcs)",               brand: "FruitFarm",  categories: ["Fruits", "Fresh"],                       price: 80.00,    published: false, featured: false, themes: ["Grocery", "Organic"] },
  { id: 26, name: "Fresh Tomatoes (500g)",                 brand: "VeggieFresh",categories: ["Vegetables"],                            price: 60.00,    published: true,  featured: false, themes: ["Grocery"] },
  { id: 27, name: "Organic Potatoes (1kg)",                brand: "VeggieFresh",categories: ["Vegetables"],                            price: 75.00,    published: true,  featured: false, themes: ["Grocery", "Organic"] },
  { id: 28, name: "Black Grapes (500g)",                   brand: "FruitFarm",  categories: ["Fruits"],                                price: 310.00,   published: true,  featured: true,  themes: ["Grocery"] },
  { id: 29, name: "Fresh Dairy Butter 200g",               brand: "DairyBest",  categories: ["Dairy", "Butter"],                       price: 260.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 30, name: "Jam & Jelly Mixed Pack",                brand: "SweetSpread",categories: ["Jam", "Breakfast"],                      price: 350.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 31, name: "Cleaning Multi-Surface Spray",          brand: "CleanPro",   categories: ["Cleaning"],                              price: 199.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 32, name: "Baby Care Lotion 200ml",                brand: "BabySoft",   categories: ["Baby Care"],                             price: 420.00,   published: true,  featured: false, themes: ["Grocery", "Organic"] },
  { id: 33, name: "Pet Care Shampoo",                      brand: "PetPlus",    categories: ["Pet Care"],                              price: 380.00,   published: false, featured: false, themes: ["Grocery"] },
  { id: 34, name: "Coffee Arabica Blend 250g",             brand: "BrewMaster", categories: ["Coffee Drinks"],                         price: 640.00,   published: true,  featured: true,  themes: ["Grocery"] },
  { id: 35, name: "Assorted Cold Drinks Pack",             brand: "RefreshCo",  categories: ["Cold Drinks"],                           price: 480.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 36, name: "Fresh Organic Vegetables Box",          brand: "VeggieFresh",categories: ["Vegetables", "Organic"],                 price: 599.00,   published: true,  featured: true,  themes: ["Grocery", "Organic"] },
  { id: 37, name: "Breakfast Cereal Mix",                  brand: "MorningFresh",categories: ["Breakfast"],                            price: 290.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 38, name: "Snack Variety Pack",                    brand: "SnackWorld", categories: ["Snacks"],                                price: 340.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 39, name: "Frozen Pizza Margherita",               brand: "FrozenFoods",categories: ["Frozen Foods"],                          price: 520.00,   published: false, featured: false, themes: ["Grocery"] },
  { id: 40, name: "Grilled Sea Bass Fillet",               brand: "SeaCatch",   categories: ["Sea Food"],                              price: 1100.00,  published: true,  featured: true,  themes: ["Grocery", "Organic"] },
  { id: 41, name: "Mixed Spice Combo",                     brand: "SpiceLane",  categories: ["Spices"],                                price: 175.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 42, name: "Mango Juice 1L",                        brand: "RefreshCo",  categories: ["Beverages"],                             price: 145.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 43, name: "Sourdough Bread Loaf",                  brand: "BreadCo",    categories: ["Bakery"],                                price: 160.00,   published: true,  featured: false, themes: ["Grocery"] },
  { id: 44, name: "Duck Meat Premium Pack",                brand: "Bird Wings", categories: ["Duck Meat"],                             price: 2800.00,  published: true,  featured: true,  themes: ["Halal Food", "Organic"] },
];

const BRANDS  = [...new Set(allProducts.map((p) => p.brand))];
const PAGE_SIZE = 15;

/* ─── TOGGLE SWITCH ─────────────────────────────────── */
function Toggle({ value }) {
  return (
    <div style={{
      width: 36, height: 20, borderRadius: 10,
      background: value ? "#22c55e" : "#e5e7eb",
      position: "relative", cursor: "default", flexShrink: 0,
      transition: "background 0.2s",
    }}>
      <div style={{
        position: "absolute",
        top: 2, left: value ? 18 : 2,
        width: 16, height: 16, borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

/* ─── FEATURED DOT ───────────────────────────────────── */
function FeaturedDot({ value }) {
  return (
    <div style={{
      width: 20, height: 20, borderRadius: "50%",
      background: value ? "#22c55e" : "#e5e7eb",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {value && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
    </div>
  );
}

/* ─── PRODUCT ICON ───────────────────────────────────── */
const iconColors = ["#22c55e","#3b82f6","#f97316","#a855f7","#ef4444","#eab308","#ec4899","#06b6d4"];
function ProductIcon({ name, id }) {
  const color = iconColors[id % iconColors.length];
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 6,
      background: color + "20", border: `1px solid ${color}40`,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontSize: 12, fontWeight: 700, color,
    }}>
      {name.charAt(0)}
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
        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", borderRadius: 4 }}
      >
        <MoreVertical size={16} color="#94a3b8" />
      </button>
      {isOpen && (
        <div style={{
          position: "absolute", right: 0, top: 26, zIndex: 50,
          background: "#fff", border: "1px solid #e5e7eb",
          borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          minWidth: 130, overflow: "hidden",
        }}>
          {["View", "Edit", "Delete"].map((a) => (
            <div key={a} onClick={() => setOpenId(null)}
              style={{ padding: "8px 16px", fontSize: 13, color: a === "Delete" ? "#ef4444" : "#374151", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >{a}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function Products() {
  const [search, setSearch]       = useState("");
  const [brandFilter, setBrand]   = useState("");
  const [statusFilter, setStatus] = useState("");
  const [page, setPage]           = useState(1);
  const [openMenu, setOpenMenu]   = useState(null);
  const [brandOpen, setBrandOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  /* ── filter ── */
  const filtered = allProducts.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchBrand  = !brandFilter  || p.brand === brandFilter;
    const matchStatus = !statusFilter
      || (statusFilter === "published"   && p.published)
      || (statusFilter === "unpublished" && !p.published);
    return matchSearch && matchBrand && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetPage = () => setPage(1);

  /* close dropdowns on outside click */
  const closeDropdowns = () => { setBrandOpen(false); setStatusOpen(false); setOpenMenu(null); };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }} onClick={closeDropdowns}>

      {/* ── Page header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "#1e293b", margin: 0 }}>Products</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 8,
            background: "#ef4444", border: "none",
            fontSize: 13, color: "#fff", fontWeight: 500, cursor: "pointer",
          }}>
            <Upload size={14} /> Export
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 8,
            background: "#f97316", border: "none",
            fontSize: 13, color: "#fff", fontWeight: 500, cursor: "pointer",
          }}>
            <Download size={14} /> Import
          </button>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 8,
            background: "#22c55e", border: "none",
            fontSize: 13, color: "#fff", fontWeight: 500, cursor: "pointer",
          }}>
            <Plus size={14} /> Add Product
          </button>
        </div>
      </div>

      {/* ── Card ── */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>

        {/* ── Filter bar ── */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {/* Search input */}
          <div style={{
            flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8,
            border: "1px solid #e5e7eb", borderRadius: 8, padding: "7px 12px", background: "#fff",
          }}>
            <Search size={14} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              onClick={(e) => e.stopPropagation()}
              style={{ border: "none", outline: "none", fontSize: 13, color: "#374151", flex: 1, background: "transparent" }}
            />
          </div>

          {/* Brand dropdown */}
          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setBrandOpen((o) => !o); setStatusOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 14px", borderRadius: 8,
                border: "1px solid #e5e7eb", background: "#fff",
                fontSize: 13, color: brandFilter ? "#1e293b" : "#94a3b8",
                cursor: "pointer", whiteSpace: "nowrap", minWidth: 140,
              }}
            >
              {brandFilter || "Select Brand"}
              <ChevronRight size={13} color="#94a3b8" style={{ marginLeft: "auto", transform: brandOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {brandOpen && (
              <div style={{
                position: "absolute", top: 38, left: 0, zIndex: 50,
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                minWidth: "100%", overflow: "hidden",
              }}>
                <div
                  onClick={() => { setBrand(""); setBrandOpen(false); resetPage(); }}
                  style={{ padding: "8px 14px", fontSize: 13, color: "#94a3b8", cursor: "pointer" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >All Brands</div>
                {BRANDS.map((b) => (
                  <div key={b}
                    onClick={() => { setBrand(b); setBrandOpen(false); resetPage(); }}
                    style={{ padding: "8px 14px", fontSize: 13, color: "#374151", cursor: "pointer", background: brandFilter === b ? "#f0fdf4" : "transparent" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={(e) => e.currentTarget.style.background = brandFilter === b ? "#f0fdf4" : "transparent"}
                  >{b}</div>
                ))}
              </div>
            )}
          </div>

          {/* Status dropdown */}
          <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => { setStatusOpen((o) => !o); setBrandOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 14px", borderRadius: 8,
                border: "1px solid #e5e7eb", background: "#fff",
                fontSize: 13, color: statusFilter ? "#1e293b" : "#94a3b8",
                cursor: "pointer", whiteSpace: "nowrap", minWidth: 140,
              }}
            >
              {statusFilter === "published" ? "Published" : statusFilter === "unpublished" ? "Unpublished" : "Select Status"}
              <ChevronRight size={13} color="#94a3b8" style={{ marginLeft: "auto", transform: statusOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
            </button>
            {statusOpen && (
              <div style={{
                position: "absolute", top: 38, left: 0, zIndex: 50,
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                minWidth: "100%", overflow: "hidden",
              }}>
                {[["", "All Status"], ["published", "Published"], ["unpublished", "Unpublished"]].map(([val, label]) => (
                  <div key={val}
                    onClick={() => { setStatus(val); setStatusOpen(false); resetPage(); }}
                    style={{ padding: "8px 14px", fontSize: 13, color: val === "" ? "#94a3b8" : "#374151", cursor: "pointer", background: statusFilter === val && val !== "" ? "#f0fdf4" : "transparent" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
                    onMouseLeave={(e) => e.currentTarget.style.background = statusFilter === val && val !== "" ? "#f0fdf4" : "transparent"}
                  >{label}</div>
                ))}
              </div>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={(e) => { e.stopPropagation(); resetPage(); }}
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
                {["S/L","Product Name","Brand","Categories","Price","Published","Themes","Is Featured","Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", padding: "10px 14px", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={9} style={{ padding: "40px", textAlign: "center", fontSize: 13, color: "#94a3b8" }}>No products found.</td></tr>
              ) : paginated.map((product, i) => (
                <tr key={product.id}
                  style={{ borderBottom: "1px solid #f8fafc" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* S/L */}
                  <td style={{ padding: "10px 14px", fontSize: 13, color: "#64748b", width: 40 }}>
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>

                  {/* Product Name */}
                  <td style={{ padding: "10px 14px", minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <ProductIcon name={product.name} id={product.id} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#1e293b", lineHeight: 1.4 }}>{product.name}</span>
                    </div>
                  </td>

                  {/* Brand */}
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#374151", whiteSpace: "nowrap" }}>{product.brand}</td>

                  {/* Categories */}
                  <td style={{ padding: "10px 14px", minWidth: 140 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {product.categories.map((cat, ci) => (
                        <span key={ci} style={{
                          fontSize: 11, padding: "2px 7px", borderRadius: 4,
                          background: "#f1f5f9", color: "#64748b",
                          border: "1px solid #e5e7eb", whiteSpace: "nowrap",
                        }}>{cat}</span>
                      ))}
                    </div>
                  </td>

                  {/* Price */}
                  <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "#22c55e", whiteSpace: "nowrap" }}>
                    ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Published toggle */}
                  <td style={{ padding: "10px 14px" }}>
                    <Toggle value={product.published} />
                  </td>

                  {/* Themes */}
                  <td style={{ padding: "10px 14px", fontSize: 12, color: "#374151", whiteSpace: "nowrap" }}>
                    {`[${product.themes.map((t) => `"${t}"`).join(",")}]`}
                  </td>

                  {/* Is Featured */}
                  <td style={{ padding: "10px 14px" }}>
                    <FeaturedDot value={product.featured} />
                  </td>

                  {/* Action */}
                  <td style={{ padding: "10px 14px" }} onClick={(e) => e.stopPropagation()}>
                    <ActionMenu id={product.id} openId={openMenu} setOpenId={setOpenMenu} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Footer ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px", borderTop: "1px solid #f1f5f9",
        }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} results
          </span>

          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <PageBtn onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft size={14} color="#374151" />
              </PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PageBtn key={p} onClick={() => setPage(p)} active={p === page}>{p}</PageBtn>
              ))}
              <PageBtn onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <ChevronRight size={14} color="#374151" />
              </PageBtn>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer credit ── */}
      <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
        <span>© All Designed, Developed and 💕 by <span style={{ color: "#22c55e", fontWeight: 500 }}>ThemeTags</span></span>
        <span>Grostore Online Store  v4.6.0</span>
      </div>
    </div>
  );
}

/* ─── PAGE BUTTON ────────────────────────────────────── */
function PageBtn({ children, onClick, disabled, active }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30, borderRadius: 6,
        border: active ? "none" : "1px solid #e5e7eb",
        background: active ? "#22c55e" : "#fff",
        color: active ? "#fff" : "#374151",
        fontSize: 13, fontWeight: active ? 600 : 400,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}