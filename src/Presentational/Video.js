import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player/youtube";
import { useLocation } from 'react-router-dom'

const Video = () => {

    const location = useLocation()
    const videoInfo = location.state.video
    const videoKey = location.state.video.thumbnail.split('/')[4]
    // console.log(videoKey)
    const videoUrlArray = [videoInfo.url]
    console.log(videoUrlArray)
    

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
                width="640px"
                height='360px'
                playing={play}
                // config={{ file: { forceHLS: true } }}
                controls={true}
                light={videoInfo.thumbnail}
                url={videoUrlArray}
                className='react-player'
            />
        </div>
    );
}

export default Video;
