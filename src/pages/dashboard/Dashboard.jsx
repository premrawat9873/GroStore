// src/pages/dashboard/Dashboard.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { ShoppingCart, Clock, Loader, CheckCircle, Eye, MoreVertical, Plus } from "lucide-react";
import { productStore } from "../../data/productStore";
import {
  ProductIcon, ViewProductModal, ProductFormModal, ConfirmDialog,
} from "../../components/common/ProductUI";

/* ─── Static chart data ──────────────────────────────── */
const earningData    = [{ name:"Mon",value:200},{name:"Tue",value:400},{name:"Wed",value:300},{name:"Thu",value:600},{name:"Fri",value:200},{name:"Sat",value:350},{name:"Sun",value:250}];
const categoryData   = [{name:"Fresh Chicken",value:40},{name:"Duck Meat",value:25},{name:"Chair",value:20},{name:"Others",value:15}];
const orderBarData   = [{name:"W1",orders:5},{name:"W2",orders:12},{name:"W3",orders:8},{name:"W4",orders:18}];
const salesMonthData = [{day:1,sales:0},{day:5,sales:200},{day:10,sales:80},{day:15,sales:600},{day:20,sales:120},{day:25,sales:900},{day:30,sales:100}];
const COLORS = ["#22c55e","#3b82f6","#f97316","#a855f7"];

const INITIAL_ORDERS = [
  { id: 227, hasCustomer: true,  custId: "123456789", placedOn: "24 Feb, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: 226, hasCustomer: false, custId: "",          placedOn: "23 Feb, 2026", items: 1, payment: "Paid",   delivery: "Delivered",    type: "Regular" },
  { id: 225, hasCustomer: true,  custId: "123456789", placedOn: "23 Feb, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: 224, hasCustomer: true,  custId: "123456789", placedOn: "23 Feb, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: 223, hasCustomer: false, custId: "",          placedOn: "22 Feb, 2026", items: 1, payment: "Paid",   delivery: "Delivered",    type: "Regular" },
  { id: 222, hasCustomer: false, custId: "",          placedOn: "21 Feb, 2026", items: 1, payment: "Paid",   delivery: "Delivered",    type: "Regular" },
];

/* ─── Shared card/label styles ───────────────────────── */
const card   = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 };
const lbl    = { fontSize: 12, color: "#94a3b8", display: "block" };
const bigNum = { fontSize: 22, fontWeight: 700, color: "#1e293b", margin: "2px 0 6px" };
const td     = { fontSize: 13, color: "#374151", padding: "10px", whiteSpace: "nowrap" };

/* ─── Order action menu ──────────────────────────────── */
function OrderMenu({ orderId, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
      <button onClick={() => setOpen((o) => !o)} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 4px", display: "flex" }}>
        <MoreVertical size={16} color="#94a3b8" />
      </button>
      {open && (
        <div style={{ position: "absolute", right: 0, top: 24, zIndex: 100, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,.10)", minWidth: 120, overflow: "hidden" }}>
          {["View","Edit","Delete"].map((a) => (
            <div key={a} onClick={() => { if (a === "Delete") onDelete(orderId); setOpen(false); }}
              style={{ padding: "8px 16px", fontSize: 13, color: a === "Delete" ? "#ef4444" : "#374151", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>{a}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Stat card ──────────────────────────────────────── */
function StatCard({ icon, label, value, bg }) {
  return (
    <div style={{ ...card, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>{value}</div>
        <div style={{ fontSize: 12, color: "#94a3b8" }}>{label}</div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(productStore.getAll());
  const [orders, setOrders]     = useState(INITIAL_ORDERS);

  // Modal states
  const [viewProduct, setViewProduct]     = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [showAdd, setShowAdd]             = useState(false);

  useEffect(() => productStore.subscribe(setProducts), []);

  const topSelling  = [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, 20);
  const deleteOrder = (id) => setOrders((prev) => prev.filter((o) => o.id !== id));

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", margin: 0 }}>Admin Dashboard</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ padding: "7px 14px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <ShoppingCart size={13} /> Manage Sales
          </button>
          <button onClick={() => setShowAdd(true)} style={{ padding: "7px 14px", borderRadius: 8, background: "#22c55e", border: "none", fontSize: 12, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
            <Plus size={13} /> Add Product
          </button>
        </div>
      </div>

      {/* Unified grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 250px", gridTemplateRows: "185px 330px auto auto", gap: 18 }}>

        {/* Total Earning */}
        <div style={{ ...card, gridColumn: 1, gridRow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px 4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={lbl}>Total Earning</span>
              <span style={{ fontSize: 10, color: "#94a3b8", border: "1px solid #e5e7eb", borderRadius: 4, padding: "2px 6px" }}>Last 7 days ▾</span>
            </div>
            <div style={bigNum}>$575,960.01</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <Tooltip /><Area type="monotone" dataKey="value" stroke="#f97316" fill="#fed7aa" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Category Sales */}
        <div style={{ ...card, gridColumn: 2, gridRow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px 4px", flexShrink: 0 }}>
            <span style={lbl}>Top 5 Category Sales</span>
            <div style={bigNum}>1624</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie data={categoryData} dataKey="value" cx="32%" cy="50%" innerRadius="32%" outerRadius="46%">
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={7}
                  formatter={(v) => <span style={{ fontSize: 10, color: "#6b7280" }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Last 30 Days Orders */}
        <div style={{ ...card, gridColumn: 3, gridRow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px 4px" }}>
            <span style={lbl}>Last 30 Days Orders</span>
            <div style={bigNum}>18</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderBarData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <Tooltip /><Bar dataKey="orders" fill="#3b82f6" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products [R1-2 C4] */}
        <div style={{ ...card, gridColumn: 4, gridRow: "1 / 3", display: "flex", flexDirection: "column", padding: "16px 14px 10px" }}>
          <div style={{ marginBottom: 10, flexShrink: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Top Selling Products</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>We have listed {products.length} total products.</div>
          </div>
          <ul style={{ flex: 1, minHeight: 0, overflowY: "auto", listStyle: "none", margin: 0, padding: 0 }}>
            {topSelling.map((p) => (
              <li key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f8fafc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "#f1f5f9", border: "1px solid #e5e7eb", flexShrink: 0, overflow: "hidden" }}>
                    {p.img
                      ? <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <ProductIcon name={p.name} id={p.id} size={32} />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 110 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Brand: {p.brand}</div>
                  </div>
                </div>
                {/* Eye icon to view product */}
                <button onClick={() => setViewProduct(p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, flexShrink: 0, marginLeft: 4, display: "flex" }}>
                  <Eye size={14} color="#94a3b8" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sales This Month */}
        <div style={{ ...card, gridColumn: "1 / 4", gridRow: 2, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 20px 4px", flexShrink: 0 }}>
            <span style={lbl}>Sales This Months</span>
            <div style={bigNum}>$780,980.03</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesMonthData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={72} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#22c55e" fill="#bbf7d0" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order stat cards */}
        <div style={{ gridColumn: "1 / 5", gridRow: 3, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 18 }}>
          <StatCard icon={<ShoppingCart size={18} color="#2563eb"/>} bg="#eff6ff" label="Total Orders"     value="227" />
          <StatCard icon={<Clock        size={18} color="#d97706"/>} bg="#fffbeb" label="Order Pending"    value="97"  />
          <StatCard icon={<Loader       size={18} color="#7c3aed"/>} bg="#f5f3ff" label="Order Processing" value="0"   />
          <StatCard icon={<CheckCircle  size={18} color="#16a34a"/>} bg="#f0fdf4" label="Total Delivered"  value="130" />
        </div>

        {/* Recent Orders */}
        <div style={{ ...card, gridColumn: "1 / 5", gridRow: 4, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>Recent Orders</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Your 10 Most Recent Orders</div>
            </div>
            {/* View All → navigate to orders page */}
            <button
              onClick={() => navigate("/orders")}
              style={{ padding: "6px 14px", borderRadius: 8, background: "#22c55e", border: "none", fontSize: 12, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
              <Eye size={13} /> View All
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                  {["Order Code","Customer","Placed On","Items","Payment Status","Delivery Status","Delivery Type","Action"].map((h) => (
                    <th key={h} style={{ textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748b", padding: "8px 10px", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length === 0
                  ? <tr><td colSpan={8} style={{ padding: 30, textAlign: "center", fontSize: 13, color: "#94a3b8" }}>No recent orders.</td></tr>
                  : orders.map((row) => (
                    <tr key={row.id} style={{ borderBottom: "1px solid #f8fafc" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#fafafa"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                      <td style={td}><span style={{ fontWeight: 500 }}>#G-Store:{row.id}</span></td>
                      <td style={td}>
                        {row.hasCustomer
                          ? <div><div style={{ fontSize: 11, color: "#94a3b8" }}>Customer</div><div style={{ fontSize: 12, color: "#1e293b" }}>{row.custId}</div></div>
                          : <span style={{ color: "#94a3b8" }}>—</span>}
                      </td>
                      <td style={td}>{row.placedOn}</td>
                      <td style={td}>{row.items}</td>
                      <td style={td}>
                        <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, fontWeight: 500, background: row.payment === "Paid" ? "#f0fdf4" : "#fff7ed", color: row.payment === "Paid" ? "#16a34a" : "#ea580c", border: `1px solid ${row.payment === "Paid" ? "#bbf7d0" : "#fed7aa"}` }}>
                          {row.payment}
                        </span>
                      </td>
                      <td style={td}>
                        <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 5, fontWeight: 500, background: row.delivery === "Delivered" ? "#f0fdf4" : "#eff6ff", color: row.delivery === "Delivered" ? "#16a34a" : "#2563eb", border: `1px solid ${row.delivery === "Delivered" ? "#bbf7d0" : "#bfdbfe"}` }}>
                          {row.delivery}
                        </span>
                      </td>
                      <td style={td}>{row.type}</td>
                      <td style={td}>
                        <OrderMenu orderId={row.id} onDelete={deleteOrder} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewProductModal open={!!viewProduct} onClose={() => setViewProduct(null)} product={viewProduct} />
      <ProductFormModal open={showAdd} onClose={() => setShowAdd(false)} initial={null}
        onSave={(data) => productStore.add(data)} />
      <ConfirmDialog open={!!deleteProduct} onClose={() => setDeleteProduct(null)} name={deleteProduct?.name}
        onConfirm={() => productStore.delete(deleteProduct.id)} />
    </div>
  );
}