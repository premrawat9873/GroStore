// src/pages/dashboard/Dashboard.jsx

import {
  AreaChart, Area, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import {
  ShoppingCart, Clock, Loader, CheckCircle, Eye,
} from "lucide-react";

/* ─── DATA ─────────────────────────────────────────── */

const earningData = [
  { name: "Mon", value: 200 }, { name: "Tue", value: 400 },
  { name: "Wed", value: 300 }, { name: "Thu", value: 600 },
  { name: "Fri", value: 200 }, { name: "Sat", value: 350 },
  { name: "Sun", value: 250 },
];

const categoryData = [
  { name: "Fresh Chicken", value: 40 },
  { name: "Duck Meat",     value: 25 },
  { name: "Chair",         value: 20 },
  { name: "Others",        value: 15 },
];
const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7"];

const orderBarData = [
  { name: "W1", orders: 5  }, { name: "W2", orders: 12 },
  { name: "W3", orders: 8  }, { name: "W4", orders: 18 },
];

const salesMonthData = [
  { day: 1,  sales: 0   }, { day: 5,  sales: 200 },
  { day: 10, sales: 80  }, { day: 15, sales: 600 },
  { day: 20, sales: 120 }, { day: 25, sales: 900 },
  { day: 30, sales: 100 },
];

const topSellingProducts = [
  { name: "Chicken Meat Buffalo Wing", img: "chicken.jpg",  count: 59 },
  { name: "Audi Sheesham Wood",        img: "chair.jpg",    count: 34 },
  { name: "Black Grapes",              img: "grapes.jpg",   count: 32 },
  { name: "Steak Cattle Meat",         img: "steak.jpg",    count: 31 },
  { name: "Aged Beef Steak Beef",      img: "beef.jpg",     count: 30 },
  { name: "Aged Beef Steak Beef",      img: "beef2.jpg",    count: 22 },
  { name: "Duck Meat Premium",         img: "duck.jpg",     count: 19 },
  { name: "Fresh Mutton Meat",         img: "mutton.jpg",   count: 17 },
  { name: "Organic Honey Jar",         img: "honey.jpg",    count: 15 },
  { name: "Fresh Dairy Butter",        img: "butter.jpg",   count: 12 },
  { name: "Organic Cow Milk",          img: "milk.jpg",     count: 11 },
  { name: "Cheddar Cheese Block",      img: "cheese.jpg",   count: 10 },
  { name: "Whole Wheat Bread",         img: "bread.jpg",    count: 9  },
  { name: "Farm Fresh Eggs",           img: "eggs.jpg",     count: 8  },
  { name: "Basmati Rice Premium",      img: "rice.jpg",     count: 8  },
  { name: "Cold Pressed Olive Oil",    img: "oil.jpg",      count: 7  },
  { name: "Fresh Red Apples",          img: "apple.jpg",    count: 7  },
  { name: "Organic Bananas",           img: "banana.jpg",   count: 6  },
  { name: "Fresh Tomatoes",            img: "tomato.jpg",   count: 6  },
  { name: "Organic Potatoes",          img: "potato.jpg",   count: 5  },
];

const recentOrders = [
  { code: "#G-Store:227", hasCustomer: true,  custId: "123456789", placedOn: "24 Feb, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { code: "#G-Store:226", hasCustomer: false, custId: "",          placedOn: "23 Feb, 2026", items: 1, payment: "Paid",   delivery: "Delivered",    type: "Regular" },
  { code: "#G-Store:225", hasCustomer: true,  custId: "123456789", placedOn: "23 Feb, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { code: "#G-Store:224", hasCustomer: true,  custId: "123456789", placedOn: "23 Feb, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { code: "#G-Store:223", hasCustomer: false, custId: "",          placedOn: "22 Feb, 2026", items: 1, payment: "Paid",   delivery: "Delivered",    type: "Regular" },
  { code: "#G-Store:222", hasCustomer: false, custId: "",          placedOn: "21 Feb, 2026", items: 1, payment: "Paid",   delivery: "Delivered",    type: "Regular" },
];

/* ─── SHARED STYLES ─────────────────────────────────── */

const card      = { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12 };
const lbl       = { fontSize: 12, color: "#94a3b8", display: "block" };
const bigNum    = { fontSize: 22, fontWeight: 700, color: "#1e293b", margin: "2px 0 6px" };
const td        = { fontSize: 13, color: "#374151", padding: "10px", whiteSpace: "nowrap" };

/* ─── COMPONENT ─────────────────────────────────────── */

export default function Dashboard() {
  return (
    <div>

      {/* ── Page header ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#1e293b", margin: 0 }}>Admin Dashboard</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{
            padding: "7px 14px", border: "1px solid #e5e7eb", borderRadius: 8,
            background: "#fff", fontSize: 12, color: "#374151", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}>
            <ShoppingCart size={13} /> Manage Sales
          </button>
          <button style={{
            padding: "7px 14px", borderRadius: 8,
            background: "#22c55e", border: "none",
            fontSize: 12, color: "#fff", cursor: "pointer",
          }}>
            + Add Product
          </button>
        </div>
      </div>

      {/* ── Unified grid ─────────────────────────────────
          Columns : 1fr  1fr  1fr  250px
          Row 1   : Total Earning | Category Sales | 30-Day Orders | ┐ Top Selling
          Row 2   : Sales This Month (col 1-3)                       ┘ Products
          Row 3   : 4 × Order stat cards
          Row 4   : Recent Orders table
      ──────────────────────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 250px",
        gridTemplateRows: "185px 330px auto auto",
        gap: 18,
      }}>

        {/* ── Total Earning [R1 C1] ── */}
        <div style={{ ...card, gridColumn: 1, gridRow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px 4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={lbl}>Total Earning</span>
              <span style={{ fontSize: 10, color: "#94a3b8", border: "1px solid #e5e7eb", borderRadius: 4, padding: "2px 6px" }}>
                Last 7 days ▾
              </span>
            </div>
            <div style={bigNum}>$575,960.01</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#f97316" fill="#fed7aa" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Top 5 Category Sales [R1 C2] ── */}
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
                <Legend
                  layout="vertical" align="right" verticalAlign="middle" iconSize={7}
                  formatter={(v) => <span style={{ fontSize: 10, color: "#6b7280" }}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Last 30 Days Orders [R1 C3] ── */}
        <div style={{ ...card, gridColumn: 3, gridRow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px 4px" }}>
            <span style={lbl}>Last 30 Days Orders</span>
            <div style={bigNum}>18</div>
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderBarData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Top Selling Products [R1–2 C4] ── */}
        <div style={{ ...card, gridColumn: 4, gridRow: "1 / 3", display: "flex", flexDirection: "column", padding: "16px 14px 10px" }}>
          <div style={{ marginBottom: 10, flexShrink: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>Top Selling Products</div>
            <div style={{ fontSize: 11, color: "#94a3b8" }}>We have listed 44 total products.</div>
          </div>
          <ul style={{ flex: 1, minHeight: 0, overflowY: "auto", listStyle: "none", margin: 0, padding: 0 }}>
            {topSellingProducts.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f8fafc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "#f1f5f9", border: "1px solid #e5e7eb", flexShrink: 0, overflow: "hidden" }}>
                    <img
                      src={`/src/assets/images/products/${item.img}`}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 110 }}>{item.name}</div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>Brand: Bird Wings</div>
                  </div>
                </div>
                <span style={{ fontSize: 12, color: "#374151", fontWeight: 500, flexShrink: 0, marginLeft: 6 }}>({item.count})</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Sales This Month [R2 C1–3] ── */}
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

        {/* ── Order Stat Cards [R3 C1–4] ── */}
        <div style={{ gridColumn: "1 / 5", gridRow: 3, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 18 }}>
          <StatCard icon={<ShoppingCart size={18} color="#2563eb" />} bg="#eff6ff" label="Total Orders"     value="227" />
          <StatCard icon={<Clock        size={18} color="#d97706" />} bg="#fffbeb" label="Order Pending"    value="97"  />
          <StatCard icon={<Loader       size={18} color="#7c3aed" />} bg="#f5f3ff" label="Order Processing" value="0"   />
          <StatCard icon={<CheckCircle  size={18} color="#16a34a" />} bg="#f0fdf4" label="Total Delivered"  value="130" />
        </div>

        {/* ── Recent Orders [R4 C1–4] ── */}
        <div style={{ ...card, gridColumn: "1 / 5", gridRow: 4, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>Recent Orders</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Your 10 Most Recent Orders</div>
            </div>
            <button style={{
              padding: "6px 14px", borderRadius: 8, background: "#22c55e",
              border: "none", fontSize: 12, color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5,
            }}>
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
                {recentOrders.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f8fafc" }}>
                    <td style={td}><span style={{ fontWeight: 500 }}>{row.code}</span></td>
                    <td style={td}>
                      {row.hasCustomer
                        ? <div><div style={{ fontSize: 11, color: "#94a3b8" }}>Customer</div><div style={{ fontSize: 12, color: "#1e293b" }}>{row.custId}</div></div>
                        : <span style={{ color: "#94a3b8" }}>—</span>}
                    </td>
                    <td style={td}>{row.placedOn}</td>
                    <td style={td}>{row.items}</td>
                    <td style={td}>
                      <span style={{
                        fontSize: 11, padding: "3px 9px", borderRadius: 5, fontWeight: 500,
                        background: row.payment === "Paid" ? "#f0fdf4" : "#fff7ed",
                        color:      row.payment === "Paid" ? "#16a34a" : "#ea580c",
                        border: `1px solid ${row.payment === "Paid" ? "#bbf7d0" : "#fed7aa"}`,
                      }}>{row.payment}</span>
                    </td>
                    <td style={td}>
                      <span style={{
                        fontSize: 11, padding: "3px 9px", borderRadius: 5, fontWeight: 500,
                        background: row.delivery === "Delivered" ? "#f0fdf4" : "#eff6ff",
                        color:      row.delivery === "Delivered" ? "#16a34a" : "#2563eb",
                        border: `1px solid ${row.delivery === "Delivered" ? "#bbf7d0" : "#bfdbfe"}`,
                      }}>{row.delivery}</span>
                    </td>
                    <td style={td}>{row.type}</td>
                    <td style={td}><Eye size={15} color="#94a3b8" style={{ cursor: "pointer" }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>{/* end grid */}
    </div>
  );
}

/* ─── STAT CARD ─────────────────────────────────────── */

function StatCard({ icon, label, value, bg }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>{value}</div>
        <div style={{ fontSize: 12, color: "#94a3b8" }}>{label}</div>
      </div>
    </div>
  );
} 