import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center font-bold text-xl text-green-600">
        Grostore
      </div>

      {/* Menu */}
      <nav className="px-4 py-4 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}