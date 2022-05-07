import React, { useState } from 'react';
import ReactPlayer from "react-player/youtube";
import { useLocation } from 'react-router-dom'

const Video = () => {

    const location = useLocation()
    const videoInfo = location.state.video
    const videoKey = location.state.video.thumbnail.split('/')[4]
    console.log(videoKey)

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
                // light={videoThumb}
                url={[videoInfo.url]}
            />
        </div>
    );
}

export default Video;
