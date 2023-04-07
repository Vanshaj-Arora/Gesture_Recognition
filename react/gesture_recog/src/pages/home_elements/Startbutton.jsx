import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Startbutton() {
  const navigate = useNavigate();
  function handleClick() {
    navigate('/start');
  }
  return (

    <Container style={{ paddingTop: '100px' }}>
      <Row className="product-row justify-content-center align-items-center pt-4" >
        <Col md={6}>
          <Image src="./home_pics/home_4.png" fluid />
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <h1>Gesture Recognition</h1>
          <Button style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}  variant="primary" onMouseOver={e => e.target.style.backgroundColor = "#00ADB5"} onMouseOut={e => e.target.style.backgroundColor = "#393E46"} onClick={handleClick}>Start</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Startbutton;
