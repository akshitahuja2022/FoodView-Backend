import React, { useContext } from "react";
import "../../Styles/AuthForms.css";
import { handleError, handleSuccess } from "../../Component/Notification.js";
import { AuthContext } from "../../Context/authContext.js";
import { useNavigate } from "react-router-dom";

function FoodPartnerRegister() {
  const navigate = useNavigate();

  const {
    name,
    setName,
    email,
    password,
    setEmail,
    setPassword,
    address,
    setAddress,
    phone,
    setPhone,
    setIsPartner,
    setPartner,
    setPartnerId,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      address,
      phone,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/food-partner/register`,
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
        setPartner(result);
        setPartnerId(result.foodPartner.id);
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
      <div className="auth-form-title title">Food Partner Registration</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="businessName">Business Name</label>
        <input
          id="businessName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter business name"
        />

        <label htmlFor="contactNo">Contact No.</label>
        <input
          id="contactNo"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          placeholder="Enter contact number"
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Enter address"
        />

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

        <button type="submit">Register</button>
      </form>
      <div className="auth-form-footer">
        Already a partner?
        <a href="/food-partner/login">Login</a>
      </div>
    </div>
  );
}

export default FoodPartnerRegister;
