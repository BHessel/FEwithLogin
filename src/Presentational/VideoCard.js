import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const VideoCard = (props) => {

    const { video, addToFavorites } = props
    // console.log(video)

    let navigate = useNavigate()
    
    return (

        <div className='card-container' key={video.id}>
            <div className='vid-card-img'>
                <img src={video.thumbnail} />
                    {/* <VideoPlayer
                        videoURL={video.url}
                        videoThumb={video.thumbnail}
                    /> */}
            </div>

            <div className='card-content'>
                <div className='vid-card-title-container'>
                    {video.title}
                </div>

                <div className='vid-card-buttons'>
                    <button className='vid-card-btn' onClick={() => {
                        navigate('/video',
                            {state:{video: video}
                        })
                    }}>
                            Play Trailer
                    </button>

                    <button className='vid-card-btn' onClick={() => addToFavorites(video)}>
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoCard;
