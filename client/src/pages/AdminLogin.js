import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful!");
      navigate("/admin");
    } catch (err) {
      localStorage.removeItem("token");
      if (err.response && err.response.data?.error) {
        alert("❌ " + err.response.data.error);
      } else {
        alert("❌ Login failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "400px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
          color: "white",
        }}
      >
        <div className="text-center mb-3">
          <h2 className="fw-bold">🔐 Admin Login</h2>
          <p className="text-light">Access your dashboard securely</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email Address</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                border: "none",
                padding: "10px 12px",
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                border: "none",
                padding: "10px 12px",
              }}
            />
          </div>

          <button
            className="btn w-100 fw-bold"
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#4f46e5",
              border: "none",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#4338ca")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "#4f46e5")
            }
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
