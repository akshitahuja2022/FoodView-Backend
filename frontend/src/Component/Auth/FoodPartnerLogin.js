import React, { useContext } from "react";
import "../../Styles/AuthForms.css";
import { handleError, handleSuccess } from "../../Component/Notification.js";
import { AuthContext } from "../../Context/authContext.js";
import { useNavigate } from "react-router-dom";
function FoodPartnerLogin() {
  const navigate = useNavigate();

  const {
    email,
    password,
    setEmail,
    setPassword,
    setIsPartner,
    setPartner,
    setPartnerId,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/food-partner/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/create-food"), 2000);
        setIsPartner(true);
        setPartner(result.user);
        setPartnerId(result.user.id);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-title">Food Partner Login</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
        />

        <button type="submit">Login</button>
      </form>
      <div className="auth-form-footer">
        New partner?
        <a href="/food-partner/register">Register</a>
      </div>
    </div>
  );
}

export default FoodPartnerLogin;
