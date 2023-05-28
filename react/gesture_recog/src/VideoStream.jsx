import React, { useState } from 'react';
import "./styles/Videostream.css";
function VideoStream() {
  console.log("i happened VideoStream");
  const [streamUrl, setStreamUrl] = useState('https://gesture-recognition-rwfv.onrender.com/video_feed');

  return (
    <img className ="video"
      src={streamUrl}
      alt="Stream"

    />
  );
}

export default VideoStream;
