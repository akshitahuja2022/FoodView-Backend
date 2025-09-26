import React, { useContext } from "react";
import "../../Styles/AuthForms.css";
import { handleError, handleSuccess } from "../../Component/Notification.js";
import { AuthContext } from "../../Context/authContext.js";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate();

  const { email, password, setEmail, setPassword, setIsUser, setUser } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/user/login`,
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
        setTimeout(() => navigate("/"));
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
      <div className="auth-form-title">User Login</div>
      <form className="auth-form" onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>
      <div className="auth-form-footer">
        Don't have an account?
        <a href="/user/register">Register</a>
      </div>
    </div>
  );
}

export default UserLogin;
