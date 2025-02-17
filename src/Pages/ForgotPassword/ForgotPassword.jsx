// ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return setError("Please enter your email address.");
    }
    try {
      setLoading(true);
      // Replace with your actual forgot password endpoint
      await axios.post("https://backl-main.vercel.app/forgotpassword", { email });
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password">
      <div className="forgot-password__box">
        <h2>Forgot Password</h2>
        {message ? (
          <p className="forgot-password__message">{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            {error && <p className="forgot-password__error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
        <p className="forgot-password__back" onClick={() => navigate("/settings")}>
          Back to Sign In
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
