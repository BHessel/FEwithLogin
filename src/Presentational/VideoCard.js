import React from 'react'
import VideoPlay from './Video'
import { Link } from 'react-router-dom'


const VideoCard = ({ video, key, addToFavorites }) => {
        

    
    return (

    <div className="card-container" key={key}>
        <div className="vid-card-img">
            <VideoPlay
              videoURL={video.url}
            />
        </div>

        <div className='card-content'>
            <div className='vid-card-title-container'>
                <h2>{video.title}</h2>
            </div>
            
            <div className='vid-card-buttons'>
                    <button className='vid-card-btn'>
                        <Link to={{
                            pathname: '../VidPlayer',
                            state: {video: video}    
                        }}>
                            Play in Full Size        
                        </Link>
                    </button>
               
                    {window.location.pathname === '/Favorites' ?
                    <button className='remove-btn ' onClick=''>Remove from Favorites</button> : 
                    <button className='vid-card-btn' onClick={() => addToFavorites(video)}>Add to Favorites</button>
                    }  
                
            </div>
        </div>        
    </div>
    )
}

export default VideoCard