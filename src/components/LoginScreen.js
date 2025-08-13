import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaLock } from "react-icons/fa";

export default function LoginScreen({ onLogin }) {
  const [isApplicant, setIsApplicant] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    onLogin({ isApplicant, email });
    if (isApplicant) navigate("/applicant");
    else navigate("/admin");
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.welcomeText}>Welcome</h1>
        <p style={styles.subtitle}>To our Automate App</p>
      </div>

      <div style={styles.toggleContainer}>
        <button
          onClick={() => setIsApplicant(true)}
          style={{
            ...styles.toggleButton,
            backgroundColor: isApplicant ? "#4f46e5" : "#e5e7eb",
            color: isApplicant ? "white" : "#6b7280",
          }}
        >
          APPLICANT
        </button>
        <button
          onClick={() => setIsApplicant(false)}
          style={{
            ...styles.toggleButton,
            backgroundColor: !isApplicant ? "#4f46e5" : "#e5e7eb",
            color: !isApplicant ? "white" : "#6b7280",
          }}
        >
          ADMIN
        </button>
      </div>

      <div style={styles.inputContainer}>
        <FaUser style={styles.inputIcon} />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputField}
        />
      </div>

      <div style={styles.inputContainer}>
        <FaLock style={styles.inputIcon} />
        <input
          type={showPass ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputField}
        />
        <span onClick={() => setShowPass(!showPass)} style={styles.eyeIcon}>
          {showPass ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div style={styles.rememberForgotContainer}>
        <label style={styles.rememberMe}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            style={styles.checkbox}
          />
          Remember me
        </label>
        <Link to="/forgot-password" style={styles.forgotPassword}>
          Forgot Password?
        </Link>
      </div>

      <button onClick={handleLogin} style={styles.loginButton}>
        Login
      </button>

      <div style={styles.divider}>
        <span style={styles.dividerLine}></span>
        <span style={styles.dividerText}>OR</span>
        <span style={styles.dividerLine}></span>
      </div>

      <button style={styles.googleButton}>
        <FaGoogle style={styles.googleIcon} />
        Continue with Google
      </button>

      <p style={styles.signupText}>
        Do not have an account?{" "}
        <Link to="/register" style={styles.signupLink}>
          Sign in
        </Link>
      </p>

      <div style={styles.footer}>
        <p style={styles.footerText}>AutoMate</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "auto",
    padding: "40px 30px",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    position: "relative",
    top: "50%",
    transform: "translateY(5%)",
  },
  header: {
    textAlign: "center",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 32,
    margin: 0,
    color: "#1f2937",
    fontWeight: "600",
  },
  subtitle: {
    color: "#6b7280",
    margin: "4px 0 0",
    fontSize: 16,
  },
  toggleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    fontWeight: "600",
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 15,
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 15,
    color: "#9ca3af",
    fontSize: 16,
  },
  inputField: {
    width: "100%",
    padding: "14px 14px 14px 40px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: "#f9fafb",
    transition: "border-color 0.3s",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    color: "#9ca3af",
    cursor: "pointer",
    fontSize: 16,
  },
  rememberForgotContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    fontSize: 13,
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    color: "#6b7280",
    cursor: "pointer",
  },
  checkbox: {
    marginRight: 8,
    accentColor: "#4f46e5",
  },
  forgotPassword: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    padding: 14,
    backgroundColor: "#4f46e5",
    color: "white",
    borderRadius: 10,
    fontWeight: "600",
    marginBottom: 20,
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  dividerText: {
    padding: "0 10px",
    color: "#9ca3af",
    fontSize: 12,
  },
  googleButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "white",
    color: "#4b5563",
    borderRadius: 10,
    fontWeight: "500",
    marginBottom: 20,
    border: "1px solid #e5e7eb",
    fontSize: 14,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "background-color 0.3s",
  },
  googleIcon: {
    color: "#db4437",
    fontSize: 16,
  },
  signupText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 0,
  },
  signupLink: {
    color: "#4f46e5",
    fontWeight: "600",
    textDecoration: "none",
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "500",
  },
};