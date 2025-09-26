import React from "react";
import { assets } from "../assets/assets";
import "../Styles/Hero.css";
function Hero() {
  return (
    <div className="hero-container">
      <div className="heading">
        <h2>FoodView — Connect with Your Favorite Foods</h2>
        <p>
          FoodView is your ultimate destination to explore the world of food
          through engaging short reels. Here, talented food partners showcase
          their culinary creations, from mouth-watering dishes to innovative
          recipes,
          <span className="span">
            giving users a front-row seat to the flavors and stories behind
            every meal.
          </span>
        </p>
      </div>
      <div className="heroImg">
        <img src={assets.heroImg} alt="" />
      </div>
    </div>
  );
}

export default Hero;
