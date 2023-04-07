import React, { useState } from 'react';
import "./styles/Videostream.css";
function VideoStream() {
  const [streamUrl, setStreamUrl] = useState('http://localhost:5000/video_feed');

  return (
    <img className ="video"
      src={streamUrl}
      alt="Stream"

    />
  );
}

export default VideoStream;
