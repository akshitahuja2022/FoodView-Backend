import React from "react";

import { Route, Routes } from "react-router-dom";
import Home from "../Component/Home";
import UserRegister from "../Component/Auth/UserRegister";
import UserLogin from "../Component/Auth/UserLogin";
import FoodPartnerRegister from "../Component/Auth/FoodPartnerRegister";
import FoodPartnerLogin from "../Component/Auth/FoodPartnerLogin";
import PartnerProfile from "../Component/FoodPartner/PartnerProfile";
import CreateFood from "../Component/FoodPartner/CreateFood";
import Reel from "../Component/Reel";
import Navbar from "../Component/Navbar";

function AppRoutes() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/:id" element={<PartnerProfile />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/reel" element={<Reel />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
