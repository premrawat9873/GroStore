import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  ShoppingCart,
  Clock,
  Loader,
  CheckCircle,
} from "lucide-react";

/* ------------------ DATA ------------------ */

const earningData = [
  { name: "Mon", value: 200 },
  { name: "Tue", value: 400 },
  { name: "Wed", value: 300 },
  { name: "Thu", value: 600 },
  { name: "Fri", value: 200 },
  { name: "Sat", value: 350 },
  { name: "Sun", value: 250 },
];

const categoryData = [
  { name: "Fresh Chicken", value: 40 },
  { name: "Duck Meat", value: 25 },
  { name: "Chair", value: 20 },
  { name: "Others", value: 15 },
];

const orderBarData = [
  { name: "W1", orders: 5 },
  { name: "W2", orders: 12 },
  { name: "W3", orders: 8 },
  { name: "W4", orders: 18 },
];

const salesMonthData = [
  { day: 1, sales: 0 },
  { day: 5, sales: 200 },
  { day: 10, sales: 80 },
  { day: 15, sales: 600 },
  { day: 20, sales: 120 },
  { day: 25, sales: 900 },
  { day: 30, sales: 100 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#a855f7"];

const topSellingProducts = [
  { img: "chicken.jpg", name: "Chicken Meat Buffalo Wing", count: 59 },
  { img: "chair.jpg", name: "Audi Sheesham Wood", count: 34 },
  { img: "grapes.jpg", name: "Black Grapes", count: 32 },
  { img: "steak.jpg", name: "Steak Cattle Meat", count: 31 },
  { img: "beef.jpg", name: "Aged Beef Steak Beef", count: 30 },
  { img: "beef2.jpg", name: "Aged Beef Steak Beef", count: 22 },
  { img: "duck.jpg", name: "Duck Meat Premium", count: 19 },
  { img: "mutton.jpg", name: "Fresh Mutton Meat", count: 17 },
  { img: "honey.jpg", name: "Organic Honey Jar", count: 15 },
  { img: "butter.jpg", name: "Fresh Dairy Butter", count: 12 },
  
];

/* ------------------ COMPONENT ------------------ */

export default function Dashboard() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border bg-white text-sm text-gray-600">
            Manage Sales
          </button>
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm">
            + Add Product
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Top 5 Category Sales */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm text-gray-500">Top 5 Category Sales</p>
          <h3 className="text-xl font-semibold">1624</h3>

          <div className="h-32">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip />
                <Pie
                  data={categoryData}
                  innerRadius={40}
                  outerRadius={55}
                  dataKey="value"
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Last 30 Days Orders */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm text-gray-500">Last 30 Days Orders</p>
          <h3 className="text-xl font-semibold">18</h3>

          <div className="h-24 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderBarData}>
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Earning */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm text-gray-500">Total Earning</p>
          <h3 className="text-xl font-semibold">$575,960.01</h3>

          <div className="h-24 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningData}>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP SELLING PRODUCTS */}
        <div className="row-span-2 bg-white rounded-xl p-6 border flex flex-col">
          <div className="mb-3">
            <h3 className="text-base font-semibold text-gray-800">
              Top Selling Products
            </h3>
            <p className="text-xs text-gray-500">
              We have listed 44 total products.
            </p>
          </div>

          {/* SCROLL AREA */}
          <ul className="space-y-3 overflow-y-auto pr-2 flex-1">
            {topSellingProducts.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`/src/assets/images/products/${item.img}`}
                    className="w-10 h-10 rounded-md object-cover border"
                    alt={item.name}
                  />
                  <div>
                    <p className="text-sm text-gray-800 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Brand: Bird Wings
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  ({item.count})
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sales This Month */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 border">
          <p className="text-sm text-gray-500">Sales This Months</p>
          <h3 className="text-xl font-semibold mb-4">$780,980.03</h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesMonthData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#22c55e"
                  fill="#bbf7d0"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ORDER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat icon={<ShoppingCart className="text-blue-600" />} label="Total Orders" value="227" />
        <Stat icon={<Clock className="text-yellow-600" />} label="Order Pending" value="97" />
        <Stat icon={<Loader className="text-purple-600" />} label="Order Processing" value="0" />
        <Stat icon={<CheckCircle className="text-green-600" />} label="Total Delivered" value="130" />
      </div>

    </div>
  );
}

/* ------------------ STAT CARD ------------------ */

function Stat({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 border flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}