import React from 'react';
import Navbar from "./Navbar";
// import Footer from "./components/Footer";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Start from "../App";


  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function Header() {
  return (
    <header>
    <Navbar />
      <Router>
        <Routes>
          <Route path="/home" exact element={<Home />} />
          <Route path="/" exact element={<Start />} />
          <Route path="/contact_us" exact element={<Contact />} />
        </Routes>
      </Router>
    </header>
  );
}

export default Header;
