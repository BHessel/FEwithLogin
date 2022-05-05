import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../Presentational/VideoCard'

const VideoContainer = ({ loggedInStatus }) => {

    const [allVideos, setAllVideos] = useState([]);
    
    const videoURL = 'http://localhost:3000/videos'
    
    useEffect(() => {
        const getAllVideos = () => {
        axios.get(videoURL)
        .then((response) => {
            const allVids = response.data
            setAllVideos(allVids)
        })
        .catch(error => console.log('Error:', error))
    }
        return () => {
            getAllVideos()
        };
    }, []);

    
    return (
        <div>
            <h1>VideoContainer</h1>
            <h1>Status: {loggedInStatus} </h1>
            <div className='video-container'>
                {allVideos.map((vid) =>
                    <VideoCard
                        key={vid.id}
                        video={vid}
                    />
                )}
            </div>
        </div>
    );
}

export default VideoContainer;