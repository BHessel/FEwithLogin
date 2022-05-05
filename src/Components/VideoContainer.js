import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoCard from '../Presentational/VideoCard'
import { Link } from 'react-router-dom';

const VideoContainer = ( props ) => {

    const { loggedInStatus, user } = props


    const [allVideos, setAllVideos] = useState([]);
    //remainder of useState's here are for userSearch, do last
    //make state for Favorites here too?

    const videoURL = 'http://localhost:3000/videos'
    
    //getAllVideos
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

    const addToFavorites = (video) => {
        
        let favorites = {
            user_id: user.id,
            video_id: video.id     
        }

        let requestPackage = {
            method: "POST",
            headers: {"Content-Type": "application/json", Accept: "application/json"},
            body: JSON.stringify({ favorites })
        }
        
        fetch('http://localhost:3000/favorites', requestPackage)
    }
    
    return (
        <div>
        {/* make a field for intro */}
            <h1>VideoContainer</h1>
            <h1>Status: {loggedInStatus} </h1>
        {/* make a field for friend-search (maybe even make own component?) */}
        {/* make a field to link to favorites */}
            <div className='video-container'>
                {allVideos.map((vid) =>
                    <VideoCard
                        key={vid.id}
                        video={vid}
                        addToFavorites={addToFavorites}
                    />
                )}
            </div>
        </div>
    );
}

export default VideoContainer;