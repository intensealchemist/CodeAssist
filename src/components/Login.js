import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import "./CodeAssist.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/login/",
        formData,
        { withCredentials: true }
      );
      console.log("Login Response:", res.data);

      if (
        (typeof res.data === "string" && res.data.toLowerCase().includes("successful")) ||
        (res.data.message && res.data.message.toLowerCase().includes("successful"))
      ) {
        login(formData.username);
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setMessage("Login failed. Check your credentials and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <div class="login-message">Please login to continue</div>
        <h2 className="neon-text">CodeAssist Login</h2>
        {message && <p className="error-message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="neon-input"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="neon-input"
            required
          />
          <button type="submit" className="neon-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
