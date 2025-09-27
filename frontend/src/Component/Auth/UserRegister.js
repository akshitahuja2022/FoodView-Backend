import React, { useContext } from "react";
import "../../Styles/AuthForms.css";
import { handleError, handleSuccess } from "../../Component/Notification.js";
import { AuthContext } from "../../Context/authContext.js";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const navigate = useNavigate();

  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    setIsUser,
    setUser,
  } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: name,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/"), 2000);
        setIsUser(true);

        setUser(result.user);
      } else {
        handleError(result.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-form-container">
      <div className="auth-form-title">User Registration</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter your name"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
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
        Already have an account?
        <a href="/user/login">Login</a>
      </div>
    </div>
  );
}

export default UserRegister;
