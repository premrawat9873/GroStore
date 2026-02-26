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

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Top 5 Category Sales */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm text-gray-500">Top 5 Category Sales</p>
          <h3 className="text-xl font-semibold">1624</h3>

          <div className="h-32">
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
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
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
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
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white rounded-xl p-4 border">
          <p className="text-sm text-gray-500 mb-3">
            Top Selling Products
          </p>

          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/products/chicken.jpg"
                  className="w-10 h-10 rounded-lg object-cover border"
                />
                <span className="text-sm">
                  Chicken Meat Buffalo Wing
                </span>
              </div>
              <span className="font-medium">(59)</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/products/chair.jpg"
                  className="w-10 h-10 rounded-lg object-cover border"
                />
                <span className="text-sm">
                  Audi Sheesham Wood
                </span>
              </div>
              <span className="font-medium">(34)</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/products/grapes.jpg"
                  className="w-10 h-10 rounded-lg object-cover border"
                />
                <span className="text-sm">
                  Black Grapes
                </span>
              </div>
              <span className="font-medium">(32)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SALES + TOP SELLING LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Sales This Month */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border">
          <p className="text-sm text-gray-500">Sales This Months</p>
          <h3 className="text-xl font-semibold mb-4">$780,980.03</h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesMonthData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
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

        {/* Tall Top Selling Products */}
        <div className="bg-white rounded-xl p-6 border">
          <p className="text-sm text-gray-500 mb-4">
            Top Selling Products
          </p>

          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/products/chicken.jpg"
                  className="w-12 h-12 rounded-lg object-cover border"
                />
                <span className="text-sm">
                  Chicken Meat Buffalo Wing
                </span>
              </div>
              <span className="font-medium">(59)</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/products/chair.jpg"
                  className="w-12 h-12 rounded-lg object-cover border"
                />
                <span className="text-sm">
                  Audi Sheesham Wood
                </span>
              </div>
              <span className="font-medium">(34)</span>
            </li>

            <li className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/images/products/grapes.jpg"
                  className="w-12 h-12 rounded-lg object-cover border"
                />
                <span className="text-sm">
                  Black Grapes
                </span>
              </div>
              <span className="font-medium">(32)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ORDER STATS WITH ICONS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-4 border flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <ShoppingCart className="text-blue-600" size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold">227</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Clock className="text-yellow-600" size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold">97</p>
            <p className="text-sm text-gray-500">Order Pending</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Loader className="text-purple-600" size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold">0</p>
            <p className="text-sm text-gray-500">Order Processing</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle className="text-green-600" size={20} />
          </div>
          <div>
            <p className="text-xl font-semibold">130</p>
            <p className="text-sm text-gray-500">Total Delivered</p>
          </div>
        </div>
      </div>

    </div>
  );
}