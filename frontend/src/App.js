import React from "react";
import "./App.css";

import AppRoutes from "./Routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;
