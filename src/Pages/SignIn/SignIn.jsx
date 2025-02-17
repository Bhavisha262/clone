// SignIn.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo.png";
import "./SignIn.scss";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setError("Please fill in both fields.");
    }

    try {
      setLoading(true);
      const { data } = await axios.post("https://backl-main.vercel.app/user", formData);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-in__box">
        <img src={logo} alt="LinkedIn Logo" className="sign-in__logo" />
        <h2>Sign in to LinkedIn</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <p className="sign-in__error">{error}</p>}
          <button type="submit" className="sign-in__button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        {/* Navigate to forgot password page */}
        <p className="sign-in__forgot" onClick={() => navigate("/forgot-password")}>
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default SignIn;
