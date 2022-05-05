import React, { useState, useEffect } from 'react';
import VideoCard from '../Presentational/VideoCard'

const VideoContainer = ({ loggedInStatus }) => {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const videoURL = "http://localhost:3000/videos";
    
        const fetchData = () => {
          try {
            fetch(videoURL)
            .then(response => response.json())
            .then(data => setVideos(data))
            
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, []);
        
    
    // const handleSearch = () => {
    //     let searchValue = userSearchRef.current.value
    //     console.log('this is the searchvalue', searchValue)
    //     setUserSearch(searchValue)
    // }

    return (
        <div>
            <h1>Video Container</h1>
            <h1>Status: {loggedInStatus} </h1>

            <h1 className='video-header bg-color'>Welcome to Netflix MovieMatcher</h1>
                <p className='video-subheader bg-color'>Scroll or search for shows and movies to watch each trailer. If you like it, click "Add to Favorites," and then connect with friends to see where your TV interests match! </p>


                <div className="video-container">
                        {videos.map((vid, i) =>
                                <VideoCard 
                                    video={vid}
                                    // key={i}
                                    // addToFavorites={addToFavorites}
                                />  
                        )}
                </div>
        </div>

        
    );
}

export default VideoContainer;