import React from 'react';
import { Carousel } from 'react-bootstrap';

function MyCarousel() {
  return (
    <Carousel style={{  maxHeight: "600px" }}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./home_pics/home_1.png"
          alt="First slide"
        />
        <Carousel.Caption style={{ color: "#EEEEEE" }}>
        <h3>Rosemary Crossley</h3>
        <p>“Not being able to speak is not the same as not having anything to say.”</p>
      </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./home_pics/home_2.png"
          alt="Second slide"
        />
        <Carousel.Caption style={{ color: "#EEEEEE" }}>
          <h3>Marlee Matlin</h3>
          <p>Don't let anyone tell you that you can't do something because of your speech. You are capable of achieving anything you set your mind to.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./home_pics/home_3.png"
          alt="Third slide"
        />
        <Carousel.Caption style={{ color: "#EEEEEE" }}>
        <h3>Unknown</h3>
        <p>The greatest weapon against speechlessness is perseverance. Keep pushing forward and never give up on your dreams.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
