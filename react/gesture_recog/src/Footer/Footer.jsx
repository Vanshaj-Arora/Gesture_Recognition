import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
function Footer(){

  return (
    <div>
    <footer className="footer d-flex justify-content-center align-items-center">
            <Container>
              <Row>
                <Col>
                <div className="d-flex justify-content-center align-items-center">
            <span className="text-muted mr-3">Connect with us:</span>
            <a href="https://www.linkedin.com/in/vanshaj-arora-232b14219/">
            <FaLinkedin className="mx-2" size={24} style={{color: '#222831'}}onMouseOver={e => e.target.style.color = "#00ADB5"} onMouseOut={e => e.target.style.color = "#222831"}/>
            </a>
            <a href="https://github.com/Vanshaj-Arora">
            <FaGithub className="mx-2" size={24} style={{color: '#222831'}} onMouseOver={e => e.target.style.color = "#00ADB5"} onMouseOut={e => e.target.style.color = "#222831"}/>
            </a>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-2">
            <span className="text-muted" styles={{color: '#393E46'}}>&copy; 2023 Vanshaj_Arora</span>
          </div>
                </Col>
              </Row>
            </Container>
          </footer>
    </div>
  );

}
export default Footer
