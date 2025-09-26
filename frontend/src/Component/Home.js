import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import CreateFood from "./FoodPartner/CreateFood";
import Recommand from "./Recommand";

function Home() {
  return (
    <div>
      <Hero />
      <Recommand />
      <CreateFood />
      <Footer />
    </div>
  );
}

export default Home;
