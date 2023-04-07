import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Videostream from "./VideoStream";

function Recognisedword() {
  const [recognizedWord, setRecognizedWord] = useState('Recognition started');

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios.get('http://localhost:5000/recognized_word')
        .then(response => {
          const newRecognizedWord = response.data.recognized_word;
          setRecognizedWord(newRecognizedWord);
        })
        .catch(error => {
          console.error(error);
        });
    }, 1000); // fetch data every 1000ms (1 second)

    const handleKeyDown = (event) => {
      event.preventDefault();
      if (event.key === 'Backspace') {
        axios.post('http://localhost:5000/backspace')
          .then(response => {
            const newRecognizedWord = response.data.recognized_word;
            setRecognizedWord(newRecognizedWord);
          })
          .catch(error => {
            console.error(error);
          });
      }
    };

    const handleKeyUp = (event) => {
      event.preventDefault();
      if (event.key === 'Backspace') {
        axios.post('http://localhost:5000/backspace')
          .then(response => {
            const newRecognizedWord = response.data.recognized_word;
            setRecognizedWord(newRecognizedWord);
          })
          .catch(error => {
            console.error(error);
          });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ border: '2px solid #222831', padding: '10px', borderRadius: '5px',marginTop: '10px',backgroundColor:"#00ADB5" }}>
    <Videostream />
  <p className="text-center" style={{ color: '#EEEEEE', fontSize: '24px', lineHeight: '1.5', marginTop: '15px',  "font-family": "Arial, Helvetica, sans-serif"}}>
  Words Recognised: {recognizedWord}
  </p>
</div>
  );
}

export default Recognisedword;
//
