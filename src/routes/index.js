import React, { useEffect } from "react";
import { BrowserRouter, Routes as Router, Route } from "react-router-dom";
import { About, Register, Login, Home } from "../pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
