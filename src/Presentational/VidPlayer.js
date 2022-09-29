import React from 'react';
import { useLocation } from "react-router-dom"
import YouTube from 'react-youtube';

const VidPlayer = () => {

    const location = useLocation()
    
    const videoId = location.state.video.thumbnail.split('/')[4]
    
    const onPlayerReady = (event) => {
        // access to player in all event handlers via event.target
        console.log(event)
        // event.target.pauseVideo();
    }
 
    const opts = {
        height: '480',
        width: '854',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        },
      };

  return (
      <>
        <div className='background-gradient'>
            <div className='full-vid-player'>
                <YouTube videoId={videoId} opts={opts} className='player' onReady={(event) => onPlayerReady(event)} iframeClassName='player'/>
            </div>

            <div className='video-info-card'>
                <h2 className='info-font'>
                    {location.state.video.title}
                </h2>
                <div className='info-font'>
                    <div className='flex-info-font'>
                        <h4>Release Date:</h4>
                        <p>2/15/2055</p>
                    </div>
                    <div className='flex-info-font'>
                        <h4>Description:</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default VidPlayer;
