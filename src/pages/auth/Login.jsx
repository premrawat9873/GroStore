// src/pages/auth/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,       setEmail]       = useState("");
  const [password,    setPassword]    = useState("");
  const [showPass,    setShowPass]    = useState(false);
  const [remember,    setRemember]    = useState(false);
  const [errors,      setErrors]      = useState({});   // { email?, password?, general? }
  const [loading,     setLoading]     = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim())    e.email    = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address.";
    if (!password)        e.password = "Password is required.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setLoading(true);
    setErrors({});

    // small artificial delay so the button feels responsive
    await new Promise((r) => setTimeout(r, 400));

    const result = login(email.trim(), password);
    setLoading(false);

    if (result.ok) {
      navigate("/dashboard", { replace: true });
    } else {
      setErrors({ [result.field]: result.msg });
    }
  };

  /* ── shared input style ── */
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
    <div style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#f8fafc",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{
        width: "min(950px, 96vw)",
        background: "#fff",
        borderRadius: 20,
        boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        display: "flex",
        overflow: "hidden",
      }}>

        {/* ── LEFT: illustration ── */}
        <div style={{
          width: "50%",
          background: "#FFF4D6",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 40, flexShrink: 0,
        }}>
          {/* Try the project image; fall back to a friendly SVG placeholder */}
          <img
            src="/src/assets/images/login-illustration.png"
            alt="Grostore login"
            style={{ width: "100%", maxWidth: 340, objectFit: "contain" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback illustration */}
          <div style={{
            display: "none", flexDirection: "column", alignItems: "center", gap: 16,
          }}>
            <div style={{
              width: 140, height: 140, borderRadius: "50%",
              background: "#22c55e22",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 64,
            }}>🛒</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#1e293b" }}>Grostore</div>
            <div style={{ fontSize: 14, color: "#64748b", textAlign: "center", maxWidth: 220 }}>
              Your all-in-one grocery store admin panel
            </div>
          </div>
        </div>

        {/* ── RIGHT: form ── */}
        <div style={{ flex: 1, padding: "52px 48px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#1e293b", margin: "0 0 4px" }}>
            Hey there! 👋
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 32px" }}>
            Welcome back to Grostore Admin
          </p>

          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                style={inputBox(!!errors.email)}
                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "#22c55e"; }}
                onBlur={(e)  => { if (!errors.email) e.target.style.borderColor = "#e5e7eb"; }}
              />
              {errors.email && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, fontSize: 12, color: "#ef4444" }}>
                  <AlertCircle size={13} /> {errors.email}
                </div>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                  style={{ ...inputBox(!!errors.password), paddingRight: 42 }}
                  onFocus={(e) => { if (!errors.password) e.target.style.borderColor = "#22c55e"; }}
                  onBlur={(e)  => { if (!errors.password) e.target.style.borderColor = "#e5e7eb"; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", color: "#94a3b8" }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, fontSize: 12, color: "#ef4444" }}>
                  <AlertCircle size={13} /> {errors.password}
                </div>
              )}
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: "#22c55e", width: 15, height: 15 }}
                />
                Remember me
              </label>
              <span style={{ fontSize: 13, color: "#22c55e", cursor: "pointer", fontWeight: 500 }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}>
                Forgot Password?
              </span>
            </div>

            {/* Submit button */}
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
                transition: "background .2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "#16a34a"; }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "#22c55e"; }}
            >
              {loading ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Signing in…
                </>
              ) : "Sign In"}
            </button>

          </form>

          {/* Demo credentials hint */}
          <div style={{
            marginTop: 32, padding: "14px 18px",
            background: "#f8fafc", borderRadius: 10,
            border: "1px solid #e5e7eb", fontSize: 13,
          }}>
            <div style={{ fontWeight: 600, color: "#374151", marginBottom: 6 }}>Demo Credentials</div>
            <div style={{ color: "#64748b", display: "flex", flexDirection: "column", gap: 3 }}>
              <span>📧 admin@gmail.com</span>
              <span>🔑 123456</span>
            </div>
          </div>
        </div>
      </div>

      {/* Spinner keyframe injected inline */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}