// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const VALID_EMAIL    = "admin@gmail.com";
const VALID_PASSWORD = "123456";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(sessionStorage.getItem("grostore_user") || "null")
  );

  const login = (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const u = { email, name: "Admin" };
      sessionStorage.setItem("grostore_user", JSON.stringify(u));
      setUser(u);
      return { ok: true };
    }
    if (email !== VALID_EMAIL) return { ok: false, field: "email",    msg: "No account found with this email." };
    return                       { ok: false, field: "password", msg: "Incorrect password. Please try again." };
  };

  const logout = () => {
    sessionStorage.removeItem("grostore_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }