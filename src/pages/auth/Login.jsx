// src/pages/auth/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    setErrors({});

    await new Promise((r) => setTimeout(r, 400));

    const result = login(email.trim(), password);
    setLoading(false);

    if (result.ok) {
      navigate("/dashboard", { replace: true });
    } else {
      setErrors({ [result.field]: result.msg });
    }
  };

  const inputBox = (hasErr) => ({
    width: "100%",
    padding: "10px 14px",
    border: `1.5px solid ${hasErr ? "#ef4444" : "#e5e7eb"}`,
    borderRadius: 10,
    fontSize: 14,
    color: "#1e293b",
    outline: "none",
    boxSizing: "border-box",
    background: hasErr ? "#fff5f5" : "#fff",
    transition: "border-color .2s",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
        fontFamily: "system-ui, sans-serif",
        padding: 20,
      }}
    >
      <div
        className="login-card"
        style={{
          width: "min(950px, 96vw)",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Illustration */}
        <div
          className="login-illustration"
          style={{
            width: "50%",
            background: "#FFF4D6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            flexShrink: 0,
          }}
        >
          <img
            src="/login-illustration.jpg"
            alt="Grostore login"
            style={{
              width: "100%",
              maxWidth: 340,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Form */}
        <div className="login-form" style={{ flex: 1, padding: "52px 48px" }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#1e293b",
              margin: "0 0 4px",
            }}
          >
            Hey there! 👋
          </h2>

          <p
            style={{
              fontSize: 14,
              color: "#64748b",
              margin: "0 0 32px",
            }}
          >
            Welcome back to Grostore Admin
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>

              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: undefined }));
                }}
                style={inputBox(!!errors.email)}
              />

              {errors.email && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 5,
                    fontSize: 12,
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={13} /> {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Password
              </label>

              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  style={{ ...inputBox(!!errors.password), paddingRight: 42 }}
                />

                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 5,
                    fontSize: 12,
                    color: "#ef4444",
                  }}
                >
                  <AlertCircle size={13} /> {errors.password}
                </div>
              )}
            </div>

            {/* Remember + Forgot */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "#64748b",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: "#22c55e", width: 15, height: 15 }}
                />
                Remember me
              </label>

              <span
                style={{
                  fontSize: 13,
                  color: "#22c55e",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Forgot Password?
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 10,
                background: loading ? "#86efac" : "#22c55e",
                border: "none",
                color: "#fff",
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Demo credentials */}
          <div
            style={{
              marginTop: 32,
              padding: "14px 18px",
              background: "#f8fafc",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              fontSize: 13,
            }}
          >
            <div
              style={{
                fontWeight: 600,
                color: "#374151",
                marginBottom: 6,
              }}
            >
              Demo Credentials
            </div>

            <div style={{ color: "#64748b" }}>
              📧 admin@gmail.com <br />
              🔑 123456
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`

@media (max-width: 900px){

.login-card{
flex-direction:column;
}

.login-illustration{
width:100% !important;
padding:30px;
}

.login-illustration img{
max-width:260px;
}

.login-form{
padding:40px 32px !important;
}

}

@media (max-width:500px){

.login-form{
padding:30px 22px !important;
}

.login-illustration img{
max-width:200px;
}

}

@media (max-width:420px){

.login-illustration{
display:none;
}

}

`}</style>
    </div>
  );
}