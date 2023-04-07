import React, { useState } from 'react';
import "../styles/App.css";
import VideoStream from "../VideoStream";
import Header from "../Header/Header.jsx"
import "../styles/Videostream.css";
import Recognisedword from "../Recognisedword"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from 'react-bootstrap';
import "../styles/imagecontainer.css"
import Help from "./start_element/Help";


function Start() {

  return (

    <div  styles ={{marginTop: "100px"}}>

      <div className ="recognized_word">
      <Recognisedword />
      </div>
      <Help />
    </div>


  );
}

export default Start;
