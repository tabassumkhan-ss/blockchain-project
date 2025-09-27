import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormCard from "../components/FormCard";
import FormInput from "../components/FormInput";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      setError("");
      navigate("/admin-dashboard"); // ✅ Go to Admin Dashboard
    } else {
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <FormCard title="Admin Login">
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
      />

      {error && (
        <p style={{ color: "red", fontSize: "0.9em", marginTop: 8 }}>{error}</p>
      )}

      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </FormCard>
  );
}