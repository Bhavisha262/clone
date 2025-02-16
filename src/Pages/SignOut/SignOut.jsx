import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignOut.scss";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the stored JWT token
    navigate("/"); // Redirect to Sign In page
  };

  return (
    <button className="sign-out__button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
