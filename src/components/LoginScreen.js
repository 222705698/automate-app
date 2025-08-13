import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/automate-logo.png";

export default function LoginScreen({ onLogin }) {
  const [isApplicant, setIsApplicant] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    onLogin({ isApplicant, email });
    if (isApplicant) navigate("/applicant");
    else navigate("/admin");
  }

  return (
    <div style={{ maxWidth: 380, margin: "auto", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img src={logo} alt="AutoMate" style={{ width: 80, height: 80, marginBottom: 10 }} />
        <h1 style={{ fontSize: 36, margin: 0 }}>Welcome</h1>
        <p style={{ color: "#666", margin: "4px 0 20px" }}>To our Automate App</p>
      </div>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", padding: "12px 14px", border: "1px solid #ddd", borderRadius: 8, marginBottom: 12 }}
      />

      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px 14px", border: "1px solid #ddd", borderRadius: 8 }}
        />
        <span
          onClick={() => setShowPass(!showPass)}
          style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
        >
          {showPass ? "🙈" : "👁️"}
        </span>
      </div>

      <button
        onClick={handleLogin}
        style={{ width: "100%", padding: 12, backgroundColor: "#3B82F6", color: "white", borderRadius: 8, fontWeight: "bold", marginBottom: 10 }}
      >
        Login
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <button
          onClick={() => setIsApplicant(true)}
          style={{ flex: 1, padding: 8, marginRight: 6, borderRadius: 8, border: "1px solid #000", backgroundColor: isApplicant ? "#eee" : "#fff" }}
        >
          APPLICANT
        </button>
        <button
          onClick={() => setIsApplicant(false)}
          style={{ flex: 1, padding: 8, marginLeft: 6, borderRadius: 8, border: "1px solid #000", backgroundColor: !isApplicant ? "#eee" : "#fff" }}
        >
          ADMIN
        </button>
      </div>

      <div style={{ textAlign: "center", marginBottom: 12, fontSize: 14 }}>
        Do not have an account?{" "}
        <Link to="/register" style={{ color: "#7c3aed", fontWeight: "bold" }}>
          Sign up
        </Link>
      </div>
    </div>
  );
}
