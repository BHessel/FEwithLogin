import React, { useState } from 'react'
import ReactPlayer from "react-player/youtube";

const VideoPlay = ({ videoURL }) => {
  const [play, setPlay] = useState(false);
  
  const handleMouseEnter = () => {
    setPlay(true);
  };
  const handleMouseLeave = () => {
    setPlay(false);
  };
  
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ReactPlayer
        width="100%"
        height='100%'
        playing={play}
        // config={{ file: { forceHLS: true } }}
        controls={true}
        url={videoURL}
      />
    </div>
  );
};

export default VideoPlay;