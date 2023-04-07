  const axios = require('axios');
  const express = require('express');
  const app = express();

  const port = 3000;

  // Serve the index.html file when a request is made to the root URL
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  // Set up a route to continuously get the recognized word from the Flask server and send it to the client
  app.get('/recognized_word', (req, res) => {
    let recognizedWord = ''; // Initialize the recognized word as an empty string

    // Continuously get the recognized word from the Flask server and send it to the client
    setInterval(() => {
      axios.get('http://localhost:5000/recognized_word')
        .then(response => {
          recognizedWord = response.data; // Update the recognized word with the new value
        })
        .catch(error => {
          console.error(error);
        });

      // Send the current recognized word to the client
      res.send(recognizedWord);
    }, 1000); // Send a new request every 1 second

  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
