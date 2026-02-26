// src/pages/dashboard/Dashboard.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import {
  ShoppingCart, Clock, Loader, CheckCircle, Eye, MoreVertical, Plus,
} from "lucide-react";
import { productStore } from "../../data/productStore";
import { ViewProductModal, ProductFormModal, ConfirmDialog } from "../../components/common/ProductUI";

/* ─── Chart data ─────────────────────────────────────── */
const earningData = [
  { name:"Mon",value:200 },{ name:"Tue",value:400 },{ name:"Wed",value:300 },
  { name:"Thu",value:600 },{ name:"Fri",value:200 },{ name:"Sat",value:350 },
  { name:"Sun",value:250 },
];

const categoryData = [
  { name:"Fresh Chicken", value:38 },
  { name:"Duck Meat",     value:22 },
  { name:"Chair",         value:18 },
  { name:"Vegetables",    value:13 },
  { name:"Others",        value:9  },
];
const PIE_COLORS = ["#22c55e","#3b82f6","#f97316","#a855f7","#ec4899"];

const ORDER_VALS   = [7,14,5,18,9,12,6,21,11,15];
const orderBarData = ORDER_VALS.map((orders, i) => ({ period:`D${i*3+1}`, orders }));
const TOTAL_30D    = ORDER_VALS.reduce((a,b) => a+b, 0);

const salesMonthData = [
  {day:1,sales:0},{day:5,sales:200},{day:10,sales:80},
  {day:15,sales:600},{day:20,sales:120},{day:25,sales:900},{day:30,sales:100},
];

const SALE_COUNTS = {
  14:59,1:34,28:32,10:31,12:30,11:22,9:19,13:17,
  8:15,44:14,17:12,22:11,34:10,40:9,36:8,7:7,2:6,3:6,4:5,5:5,
};

/* Photos keyed by product name fragment — survives any sort order */
const PRODUCT_PHOTOS = {
  "Chicken Meat Buffalo Wing":           "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=80&h=80&fit=crop&auto=format",
  "Audi Sheesham Wood Dining Chair":     "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&auto=format",
  "Black Grapes":                        "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=80&h=80&fit=crop&auto=format",
  "Steak Cattle Meat":                   "https://images.unsplash.com/photo-1558030006-450675393462?w=80&h=80&fit=crop&auto=format",
  "Aged Beef Steak Beef":                "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop&auto=format",
  "Lamb & Mutton Back Bacon":            "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=80&h=80&fit=crop&auto=format",
  "Ribs Lamb & Mutton Meat":             "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop&auto=format",
  "Organic Honey Premium":               "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop&auto=format",
  "Duck Meat Premium Pack":              "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=80&h=80&fit=crop&auto=format",
  "Cheddar Cheese Block":                "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=80&h=80&fit=crop&auto=format",
  "Coffee Arabica Blend 250g":           "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop&auto=format",
  "Grilled Sea Bass Fillet":             "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=80&h=80&fit=crop&auto=format",
  "Fresh Organic Vegetables Box":        "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&h=80&fit=crop&auto=format",
  "Fresh Mutton Leg":                    "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=80&h=80&fit=crop&auto=format",
  "Wooden Showpiece Chair":              "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=80&h=80&fit=crop&auto=format",
  "Fresh Red Apples":                    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&h=80&fit=crop&auto=format",
  "Basmati Rice Premium":                "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=80&h=80&fit=crop&auto=format",
  "Whole Wheat Bread":                   "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop&auto=format",
  "Mango Juice 1L":                      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=80&h=80&fit=crop&auto=format",
  "Organic Cow Milk 1L":                 "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=80&h=80&fit=crop&auto=format",
};

/* Fallback pool for products not in the map above */
const THUMB_FALLBACKS = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=80&h=80&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=80&h=80&fit=crop&auto=format",
];

function getProductThumb(product, idx) {
  if (product.img) return product.img;
  // Try exact name match first
  if (PRODUCT_PHOTOS[product.name]) return PRODUCT_PHOTOS[product.name];
  // Try partial name match
  const key = Object.keys(PRODUCT_PHOTOS).find(k => product.name.includes(k) || k.includes(product.name.split(" ")[0]));
  return key ? PRODUCT_PHOTOS[key] : THUMB_FALLBACKS[idx % THUMB_FALLBACKS.length];
}

const INITIAL_ORDERS = [
  {id:227,hasCustomer:true, custId:"123456789",placedOn:"24 Feb, 2026",items:1,payment:"Unpaid",delivery:"Order Placed",type:"Regular"},
  {id:226,hasCustomer:false,custId:"",         placedOn:"23 Feb, 2026",items:1,payment:"Paid",  delivery:"Delivered",   type:"Regular"},
  {id:225,hasCustomer:true, custId:"123456789",placedOn:"23 Feb, 2026",items:1,payment:"Unpaid",delivery:"Order Placed",type:"Regular"},
  {id:224,hasCustomer:true, custId:"123456789",placedOn:"23 Feb, 2026",items:1,payment:"Unpaid",delivery:"Order Placed",type:"Regular"},
  {id:223,hasCustomer:false,custId:"",         placedOn:"22 Feb, 2026",items:1,payment:"Paid",  delivery:"Delivered",   type:"Regular"},
  {id:222,hasCustomer:false,custId:"",         placedOn:"21 Feb, 2026",items:1,payment:"Paid",  delivery:"Delivered",   type:"Regular"},
];

/* ─── Row-1 card height breakdown ────────────────────────
   Card total height = 190px (set by grid row)
   Header block ≈ 60px  →  chart gets 190 - 60 = 130px explicit
   Row-2 card   = 330px
   Header block ≈ 52px  →  chart gets 330 - 52 = 278px
──────────────────────────────────────────────────────── */
const ROW1_CHART_H = 118;   // px — fixed height given to ResponsiveContainer in row-1
const ROW2_CHART_H = 268;   // px — fixed height in row-2 (Sales This Month)
const PIE_CHART_H  = 138;   // slightly taller for the bigger donut

/* ─── Shared styles ──────────────────────────────────── */
const card   = {background:"#fff",border:"1px solid #e5e7eb",borderRadius:12};
const lbl    = {fontSize:12,color:"#94a3b8",display:"block"};
const bigNum = {fontSize:22,fontWeight:700,color:"#1e293b",margin:"2px 0 4px"};
const tdS    = {fontSize:13,color:"#374151",padding:"10px",whiteSpace:"nowrap"};

/* ─── Sub-components ─────────────────────────────────── */
function BarTip({active,payload,label}) {
  if (!active||!payload?.length) return null;
  return <div style={{background:"#1e293b",padding:"5px 10px",borderRadius:6,fontSize:11,color:"#fff"}}>
    {label}: <strong>{payload[0].value}</strong>
  </div>;
}

function OrderMenu({orderId,onDelete}) {
  const [open,setOpen] = useState(false);
  return (
    <div style={{position:"relative"}} onClick={(e)=>e.stopPropagation()}>
      <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",padding:"2px 4px",display:"flex"}}>
        <MoreVertical size={16} color="#94a3b8"/>
      </button>
      {open&&(
        <div style={{position:"absolute",right:0,top:24,zIndex:100,background:"#fff",border:"1px solid #e5e7eb",borderRadius:8,boxShadow:"0 4px 16px rgba(0,0,0,.10)",minWidth:120,overflow:"hidden"}}>
          {["View","Edit","Delete"].map(a=>(
            <div key={a} onClick={()=>{if(a==="Delete")onDelete(orderId);setOpen(false);}}
              style={{padding:"8px 16px",fontSize:13,color:a==="Delete"?"#ef4444":"#374151",cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{a}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({icon,label,value,bg}) {
  return (
    <div style={{...card,padding:16,display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:44,height:44,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{icon}</div>
      <div>
        <div style={{fontSize:22,fontWeight:700,color:"#1e293b"}}>{value}</div>
        <div style={{fontSize:12,color:"#94a3b8"}}>{label}</div>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [products,setProducts]           = useState(productStore.getAll());
  const [orders,setOrders]               = useState(INITIAL_ORDERS);
  const [viewProduct,setViewProduct]     = useState(null);
  const [deleteProduct,setDeleteProduct] = useState(null);
  const [showAdd,setShowAdd]             = useState(false);

  useEffect(()=>productStore.subscribe(setProducts),[]);

  const topSelling = [...products]
    .sort((a,b)=>(SALE_COUNTS[b.id]??0)-(SALE_COUNTS[a.id]??0))
    .slice(0,20);

  const deleteOrder = id => setOrders(prev=>prev.filter(o=>o.id!==id));

  return (
    <div style={{fontFamily:"system-ui, sans-serif"}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
        <h1 style={{fontSize:18,fontWeight:600,color:"#1e293b",margin:0}}>Admin Dashboard</h1>
        <div style={{display:"flex",gap:10}}>
          <button style={{padding:"7px 14px",border:"1px solid #e5e7eb",borderRadius:8,background:"#fff",fontSize:12,color:"#374151",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <ShoppingCart size={13}/> Manage Sales
          </button>
          <button onClick={()=>setShowAdd(true)}
            style={{padding:"7px 14px",borderRadius:8,background:"#22c55e",border:"none",fontSize:12,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
            <Plus size={13}/> Add Product
          </button>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"1fr 1fr 1fr 255px",
        gridTemplateRows:"190px 330px auto auto",
        gap:18,
      }}>

        {/* ── Total Earning [R1 C1] ── */}
        <div style={{...card,gridColumn:1,gridRow:1,overflow:"hidden",padding:"14px 16px 10px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={lbl}>Total Earning</span>
            <span style={{fontSize:10,color:"#94a3b8",border:"1px solid #e5e7eb",borderRadius:4,padding:"2px 6px"}}>Last 7 days ▾</span>
          </div>
          <div style={bigNum}>$575,960.01</div>
          {/* KEY FIX: explicit px height, NOT flex:1/height:"100%" */}
          <div style={{height:ROW1_CHART_H}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningData} margin={{top:4,right:0,left:0,bottom:0}}>
                <Tooltip/>
                <Area type="monotone" dataKey="value" stroke="#f97316" fill="#fed7aa" strokeWidth={2} dot={false}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Top 5 Category Sales — BIG donut [R1 C2] ── */}
        <div style={{...card,gridColumn:2,gridRow:1,overflow:"hidden",padding:"14px 16px 6px"}}>
          <span style={lbl}>Top 5 Category Sales</span>
          <div style={bigNum}>1624</div>
          {/* Taller than row-1 siblings so donut has room */}
          <div style={{height:PIE_CHART_H}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip formatter={(v,n)=>[`${v}%`,n]}/>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  cx="34%"
                  cy="50%"
                  innerRadius="34%"
                  outerRadius="60%"
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {categoryData.map((_,i)=><Cell key={i} fill={PIE_COLORS[i]}/>)}
                </Pie>
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={7}
                  wrapperStyle={{fontSize:10,lineHeight:"20px",paddingLeft:8}}
                  formatter={v=><span style={{fontSize:10,color:"#374151"}}>{v}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Last 30 Days Orders [R1 C3] ── */}
        <div style={{...card,gridColumn:3,gridRow:1,overflow:"hidden",padding:"14px 16px 10px"}}>
          <span style={lbl}>Last 30 Days Orders</span>
          <div style={bigNum}>{TOTAL_30D}</div>
          <div style={{height:ROW1_CHART_H}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderBarData} margin={{top:4,right:4,left:0,bottom:0}} barCategoryGap="18%">
                <XAxis dataKey="period" tick={{fontSize:9,fill:"#94a3b8"}} axisLine={false} tickLine={false} interval={0}/>
                <Tooltip content={<BarTip/>} cursor={{fill:"#f1f5f9"}}/>
                <Bar dataKey="orders" fill="#3b82f6" radius={[3,3,0,0]} maxBarSize={18}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Top Selling Products [R1–2 C4] ── */}
        <div style={{...card,gridColumn:4,gridRow:"1 / 3",display:"flex",flexDirection:"column",padding:"16px 14px 10px"}}>
          <div style={{marginBottom:10,flexShrink:0}}>
            <div style={{fontSize:14,fontWeight:600,color:"#1e293b"}}>Top Selling Products</div>
            <div style={{fontSize:11,color:"#94a3b8"}}>We have listed {products.length} total products.</div>
          </div>
          <ul style={{flex:1,minHeight:0,overflowY:"auto",listStyle:"none",margin:0,padding:0}}>
            {topSelling.map((p,idx)=>{
              const count    = SALE_COUNTS[p.id]??Math.max(1,20-idx);
              const thumbSrc = getProductThumb(p, idx);
              return (
                <li key={p.id} onClick={()=>setViewProduct(p)}
                  style={{display:"flex",alignItems:"center",gap:10,padding:"7px 2px",borderBottom:"1px solid #f1f5f9",cursor:"pointer",borderRadius:6,transition:"background .1s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#f8fafc"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <div style={{width:40,height:40,borderRadius:8,flexShrink:0,overflow:"hidden",border:"1px solid #f1f5f9",background:"#f0f4f8"}}>
                    <img src={thumbSrc} alt={p.name}
                      style={{width:"100%",height:"100%",objectFit:"cover"}}
                      onError={e=>{e.target.style.display="none";e.target.parentElement.style.background="#e2e8f0";}}/>
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:12,fontWeight:600,color:"#1e293b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:118}}>{p.name}</div>
                    <div style={{fontSize:10,color:"#94a3b8",marginTop:1}}>Brand: {p.brand}</div>
                  </div>
                  <span style={{fontSize:12,fontWeight:700,color:"#64748b",flexShrink:0,minWidth:28,textAlign:"right"}}>({count})</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Sales This Month [R2 C1–3] ── */}
        <div style={{...card,gridColumn:"1 / 4",gridRow:2,overflow:"hidden",padding:"14px 20px 10px"}}>
          <span style={lbl}>Sales This Month</span>
          <div style={bigNum}>$780,980.03</div>
          <div style={{height:ROW2_CHART_H}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesMonthData} margin={{top:8,right:0,left:0,bottom:0}}>
                <XAxis dataKey="day" tick={{fontSize:11}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize:10}} axisLine={false} tickLine={false} width={50}/>
                <Tooltip/>
                <Area type="monotone" dataKey="sales" stroke="#22c55e" fill="#bbf7d0" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Stat cards [R3] ── */}
        <div style={{gridColumn:"1 / 5",gridRow:3,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:18}}>
          <StatCard icon={<ShoppingCart size={18} color="#2563eb"/>} bg="#eff6ff" label="Total Orders"     value="227"/>
          <StatCard icon={<Clock        size={18} color="#d97706"/>} bg="#fffbeb" label="Order Pending"    value="97"/>
          <StatCard icon={<Loader       size={18} color="#7c3aed"/>} bg="#f5f3ff" label="Order Processing" value="0"/>
          <StatCard icon={<CheckCircle  size={18} color="#16a34a"/>} bg="#f0fdf4" label="Total Delivered"  value="130"/>
        </div>

        {/* ── Recent Orders [R4] ── */}
        <div style={{...card,gridColumn:"1 / 5",gridRow:4,padding:20}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:14}}>
            <div>
              <div style={{fontSize:15,fontWeight:600,color:"#1e293b"}}>Recent Orders</div>
              <div style={{fontSize:12,color:"#94a3b8",marginTop:2}}>Your 10 Most Recent Orders</div>
            </div>
            <button onClick={()=>navigate("/orders")}
              style={{padding:"6px 14px",borderRadius:8,background:"#22c55e",border:"none",fontSize:12,color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:5}}>
              <Eye size={13}/> View All
            </button>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead>
                <tr style={{borderBottom:"2px solid #f1f5f9"}}>
                  {["Order Code","Customer","Placed On","Items","Payment Status","Delivery Status","Delivery Type","Action"].map(h=>(
                    <th key={h} style={{textAlign:"left",fontSize:12,fontWeight:600,color:"#64748b",padding:"8px 10px",whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length===0
                  ?<tr><td colSpan={8} style={{padding:30,textAlign:"center",fontSize:13,color:"#94a3b8"}}>No recent orders.</td></tr>
                  :orders.map(row=>(
                    <tr key={row.id} style={{borderBottom:"1px solid #f8fafc"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#fafafa"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={tdS}><span style={{fontWeight:500}}>#G-Store:{row.id}</span></td>
                      <td style={tdS}>
                        {row.hasCustomer
                          ?<div><div style={{fontSize:11,color:"#94a3b8"}}>Customer</div><div style={{fontSize:12,color:"#1e293b"}}>{row.custId}</div></div>
                          :<span style={{color:"#94a3b8"}}>—</span>}
                      </td>
                      <td style={tdS}>{row.placedOn}</td>
                      <td style={tdS}>{row.items}</td>
                      <td style={tdS}>
                        <span style={{fontSize:11,padding:"3px 9px",borderRadius:5,fontWeight:500,background:row.payment==="Paid"?"#f0fdf4":"#fff7ed",color:row.payment==="Paid"?"#16a34a":"#ea580c",border:`1px solid ${row.payment==="Paid"?"#bbf7d0":"#fed7aa"}`}}>
                          {row.payment}
                        </span>
                      </td>
                      <td style={tdS}>
                        <span style={{fontSize:11,padding:"3px 9px",borderRadius:5,fontWeight:500,background:row.delivery==="Delivered"?"#f0fdf4":"#eff6ff",color:row.delivery==="Delivered"?"#16a34a":"#2563eb",border:`1px solid ${row.delivery==="Delivered"?"#bbf7d0":"#bfdbfe"}`}}>
                          {row.delivery}
                        </span>
                      </td>
                      <td style={tdS}>{row.type}</td>
                      <td style={tdS}><OrderMenu orderId={row.id} onDelete={deleteOrder}/></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ViewProductModal open={!!viewProduct}  onClose={()=>setViewProduct(null)}  product={viewProduct}/>
      <ProductFormModal open={showAdd}         onClose={()=>setShowAdd(false)}     initial={null} onSave={d=>productStore.add(d)}/>
      <ConfirmDialog   open={!!deleteProduct} onClose={()=>setDeleteProduct(null)} name={deleteProduct?.name} onConfirm={()=>productStore.delete(deleteProduct.id)}/>
    </div>
  );
}