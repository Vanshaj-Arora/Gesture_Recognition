import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function Help() {
  const [showModal, setShowModal] = useState(true);
  const [cameraAccess, setCameraAccess] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  useEffect(() => {
    if (cameraAccess) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          setVideoStream(stream);
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    }
  }, [cameraAccess]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRequestCameraAccess = () => {
    if (cameraAccess) {
      handleCloseModal();
    } else {
      setCameraAccess(true);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header style={{ backgroundColor: "#00ADB5" }} closeButton>
        <Modal.Title>Basic Overview</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#EEEEEE" }}>
        {cameraAccess && videoStream ? (
          <video ref={(ref) => (ref ? (ref.srcObject = videoStream) : null)} autoPlay></video>
        ) : (
          <img src="./start_pics/alphabets.png" alt="Alphabets" width="300" height="170" />
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#00ADB5" }}>
        <Button
          style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}
          variant="primary"
          onMouseOver={(e) => (e.target.style.backgroundColor = "#EEEEEE")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#393E46")}
          onClick={handleRequestCameraAccess}
        >
          {cameraAccess ? 'Ok' : 'Request Camera Access'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Help;
