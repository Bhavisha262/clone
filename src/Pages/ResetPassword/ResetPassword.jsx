// ResetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      return setError("Please fill in both fields.");
    }
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    try {
      setLoading(true);
      // Replace with your actual reset password endpoint
      await axios.post("https://backl-main.vercel.app/changepassword", { token, password: newPassword });
      setMessage("Password has been reset successfully.");
      setTimeout(() => navigate("/"), 2000); // Redirect to Sign In after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password__box">
        <h2>Reset Password</h2>
        {message ? (
          <p className="reset-password__message">{message}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError("");
              }}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />
            {error && <p className="reset-password__error">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
        <p className="reset-password__back" onClick={() => navigate("/")}>
          Back to Sign In
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
