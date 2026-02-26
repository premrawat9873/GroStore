export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">
        Admin Panel
      </h1>

      <div className="flex items-center gap-3">
        <div className="text-sm text-gray-600">Admin</div>
        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}