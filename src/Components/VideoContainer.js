import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import VideoCard from '../Presentational/VideoCard'
import UserCard from '../Presentational/UserCard'
import axios from 'axios';



const VideoContainer = ({ loggedInStatus, allUsers, user }) => {

    const [videos, setVideos] = useState([])
    const [userSearch, setUserSearch ] = useState('')
    const [foundUser, setFoundUser] = useState({});
    //set found user to array? or can I just do an empty object and give it the user object?
    const userSearchRef = useRef ()

    
    useEffect(() => {
        const getVideos = async () => {
            let allVids = await axios.get('http://localhost:3000/videos')
            setVideos(allVids.data)
        }
        return () => {
            getVideos()
        };
    }, []);
    console.log('videos state is:', videos)
    
    

    //add video to favorites
    //POST request plus update state
    //CHANGE THIS TO USING AXIOS AND NO HARDCODE
    const addToFavorites = (video) => {
        
        console.log('video obj in addtoFavs', video)
        // console.log('currentUser is', currentUser)
        
        let favorites = {
            user_id: 1,
            //hard-coded to make it work w/ fake login
            video_id: video.id     
        }

        console.log(favorites)

        let requestPackage = {
            method: "POST",
            headers: {"Content-Type": "application/json", Accept: "application/json"},
            body: JSON.stringify({ favorites })
        }
        
        fetch('http://localhost:3000/favorites', requestPackage)
    }


    const handleSearch = () => {
        let searchValue = userSearchRef.current.value
        console.log('this is the searchvalue', searchValue)
        setUserSearch(searchValue)
    }

    const findFriend = (e) => {
        e.preventDefault()  //cancels an error in the terminal that said "form submission cancelled because the form is not connected"
        let findUser = allUsers.filter(user => user.email.toLowerCase() === userSearch.toLowerCase())
        setFoundUser(findUser)
    // }
    
    return (
        <div>
            <h1>VideoContainer</h1>
            <h1>Status: {loggedInStatus} </h1>

            <h1 className='video-header bg-color'>Welcome to Netflix MovieMatcher</h1>
                <p className='video-subheader bg-color'>Scroll or search for shows and movies to watch each trailer. If you like it, click "Add to Favorites," and then connect with friends to see where your TV interests match! </p>



            {/* in final form, maybe make this its own userSearch component? */}
                <div className='friend-search bg-color'>
                {/* this is the form to search for friends to follow */}
                    <p>Search For Your Friends</p>
                    <form className='friend-search-form' onSubmit={(e) => findFriend(e)}>
                        <input className='search' type='text' placeholder='Enter email' ref={userSearchRef} onChange={handleSearch} />
                        <button className='submit-btn' type='submit'>
                            Search
                        </button>
                    </form>

                {/* this is where searched friends will appear */}
                {/* should be hidden initially, and reveal when a match is found */}
                </div>
                <div className='subheader bg-color'>
                        <p>Enter your friend's email to make yourselves match</p>
                    </div>

                <div className="show-friend-search bg-color">
                        {
                        foundUser.length > 0 ?
                        <UserCard foundUser={foundUser} user={user} /> :
                        <div className='friend-search-2'></div>
                        }                  
                {/* </div> close vid-grid-top */}
            
            </div>
                
                <div className='favs-btn bg-color'>
                    <button className='favs-btn-design'>
                        <Link to='../Favorites'>
                        {/* made the change to ../Favorites, this is v6 implementation I think */}
                            See My Favorites
                        </Link>
                    </button>
                </div>
                
                <div className="video-container">
                        {videos.map((vid, i) =>
                                <VideoCard 
                                    video={vid}
                                    key={i}
                                    addToFavorites={addToFavorites}
                                />  
                        )}
                </div>
        </div>
    );
}
}

export default VideoContainer;