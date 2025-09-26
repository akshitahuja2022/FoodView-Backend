import React, { useContext, useState } from "react";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import { handleError, handleSuccess } from "./Notification";
import axios from "axios";
import { MdAccountBalanceWallet } from "react-icons/md";

import { FaHome, FaVideo, FaUser } from "react-icons/fa";
function Navbar() {
  const navigate = useNavigate();
  const { isUser, isPartner, partner, setIsUser, user, isNavbar, setIsNavbar } =
    useContext(AuthContext);

  const [profile, setProfile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/user/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          handleSuccess(response.data.message);
          setTimeout(() => navigate("/"), 1000);
          setIsUser(false);
          setProfile(false);
        } else {
          handleError(response.data.message);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <>
      <div
        className={`navbar-container ${
          isNavbar ? "active" : "navbar-container"
        }`}
      >
        <div className="logo">
          <Link to="/" className="heading">
            Food<span>View</span>
          </Link>
        </div>

        <div className="buttons">
          {isUser || isPartner ? (
            <>
              {isPartner ? (
                <>
                  <Link to="/create-food" className="btn">
                    CreateFood
                  </Link>
                  <Link to={`/food-partner/${partner.id}`} className="btn">
                    Profile
                  </Link>
                </>
              ) : (
                <Link onClick={() => setProfile(!profile)} className="btn">
                  Profile
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/food-partner/register" className="btn">
                FoodPartner
              </Link>
              <Link to="/user/register" className="btn">
                Login
              </Link>
            </>
          )}
        </div>

        {profile && (
          <div className="profile-dropdown">
            <div className="heading">
              <h2>{user.fullName}</h2>
              <p>{user.email}</p>
            </div>
            <div onClick={handleLogout} className="profile-buttons">
              <button className="btn">Logout</button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile navigation */}
      <div className="mobile-nav">
        <Link
          onClick={() => setIsNavbar(false)}
          to="/"
          className="mobile-nav-icon"
          aria-label="Home"
        >
          <FaHome />
        </Link>
        <Link
          onClick={() => setIsNavbar(true)}
          to="/reel"
          className="mobile-nav-icon"
          aria-label="Reel"
        >
          <FaVideo />
        </Link>

        {isUser || isPartner ? (
          isPartner ? (
            <Link
              onClick={() => setIsNavbar(false)}
              to={`/food-partner/${partner.id}`}
              className="mobile-nav-icon"
              aria-label="Account"
            >
              <FaUser />
            </Link>
          ) : (
            <Link
              onClick={() => {
                setProfile(!profile);
                setIsNavbar(false);
              }}
              className="mobile-nav-icon"
              aria-label="Account"
            >
              <FaUser />
            </Link>
          )
        ) : (
          <Link
            onClick={() => setMobileNav(!mobileNav)}
            className="mobile-nav-icon"
            aria-label="Account"
          >
            <MdAccountBalanceWallet />
          </Link>
        )}
      </div>
      {mobileNav && (
        <div className="mobile-dropdown">
          <Link
            onClick={() => setMobileNav(!mobileNav)}
            to="/food-partner/login"
            className="btn"
          >
            FoodPartner
          </Link>
          <Link
            onClick={() => setMobileNav(!mobileNav)}
            to="/user/login"
            className="btn"
          >
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
