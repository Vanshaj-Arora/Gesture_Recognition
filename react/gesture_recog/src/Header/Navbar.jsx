import React, { useState } from "react";
import Logo from "./elements/gesture_recog_logo.jpg";
import { Link } from "react-router-dom";
import ReorderIcon from "@material-ui/icons/Reorder";
import "../styles/navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar" >
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} style={{ width: "100px", height: "50px", paddingLeft: "0px"  }}/>
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/start"> Start </Link>
          <Link to="/contact_us"> Contact Us </Link>
        </div>
      </div>
      <div className="rightSide">
      <Link to="/"> Home </Link>
      <Link to="/start"> Start </Link>
      <Link to="/contact_us"> Contact Us </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
