import React from "react";
import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-heading">
          <h2>
            Food<span>View</span>
          </h2>
          <p>
            FoodView connects food lovers with trusted food partners, bringing
            you closer to fresh flavors and authentic experiences.
          </p>
        </div>
        <div className="footer-info">
          <div className="footer-links">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/reel">Reel</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/food-partner/register">FoodPartner</a>
              </li>
              <li>
                <a href="/user/register">Login</a>
              </li>
            </ul>
            <hr />
          </div>
          <div className="footer-copyright">
            <p>&copy; 2025 FoodView. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
