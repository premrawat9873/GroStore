import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="w-[950px] bg-white rounded-2xl shadow-lg flex overflow-hidden">
        
        {/* LEFT: Illustration */}
        <div className="w-1/2 bg-[#FFF4D6] flex items-center justify-center">
          <img
            src="/src/assets/images/login-illustration.jpg"
            alt="Login Illustration"
            className="w-[360px]"
          />
        </div>

        {/* RIGHT: Login Form */}
        <div className="w-1/2 px-10 py-12">
          <h2 className="text-2xl font-semibold text-[#3A4250] mb-1">
            Hey there! 👋
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Welcome back to Grostore Admin
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@themetags.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm mb-6">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="accent-green-600" />
              Remember me
            </label>

            <span className="text-green-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Login Button */}
          <Link to="/dashboard">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition">
              Sign In
            </button>
          </Link>

          {/* Demo Credentials */}
          <div className="mt-8 text-sm text-gray-600">
            <p className="font-medium mb-1">Demo Admin</p>
            <p>Email: admin@themetags.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    </div>
  );
}   