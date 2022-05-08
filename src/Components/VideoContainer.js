import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import VideoCard from '../Presentational/VideoCard'
// import { Link } from 'react-router-dom';
import UserCard from '../Presentational/UserCard'

const VideoContainer = ( props ) => {

    const { loggedInStatus, user, allUsers, allVideos } = props

    // const [allVideos, setAllVideos] = useState([]);
    // const [allUsers, setAllUsers ] = useState([])
    const [userSearch, setUserSearch] = useState('');
    const [foundUser, setFoundUser] = useState([]);
    const userSearchRef = useRef()
    //remainder of useState's here are for userSearch, do last
    //make state for Favorites here too?

    // const videoURL = 'http://localhost:3000/videos'
    // const allUsersURL = 'http://localhost:3000/users'
    
    
    //getAllVideos, getAllUsers on page load
    // useEffect(() => {
    //     const getAllVideos = () => {
    //         axios.get(videoURL)
    //     .then((response) => {
    //         const allVids = response.data
    //         setAllVideos(allVids)
    //     })
    //     .catch(error => console.log('Error:', error))
    //     }
    //     const getAllUsers = () => {
    //         axios.get(allUsersURL)
    //         .then((response) => {
    //             const allUserData = response.data
    //             setAllUsers(allUserData)
    //     })
    //         .catch(error => console.log('userError', error))
    //     }
    //     return () => {
    //         getAllVideos()
    //         getAllUsers()
    //     };
    // }, []);

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

    const handleSearch = () => {
        let searchValue = userSearchRef.current.value
        // console.log('this is the searchvalue', searchValue)
        setUserSearch(searchValue)
    }

    const findFriend = (e) => {
        e.preventDefault()  //cancels an error in the terminal that said "form submission cancelled because the form is not connected"
        let findUser = allUsers.filter(user => user.email.toLowerCase() === userSearch.toLowerCase())
        setFoundUser(findUser)
    }


    return (
        <>
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
                    <UserCard
                        allVideos={allVideos}
                        foundUser={foundUser}
                        user={user}
                    /> :
                    <div className='friend-search-2'>
                        Try again! User not found ¯\_(ツ)_/¯
                    </div>
                }
            </div>

            <div className='favs-btn bg-color'>
                <button className='favs-btn-design'>
                    See My Favorites
                </button>
            </div>

            <div className='video-container'>
                {allVideos.map((vid) =>
                    <VideoCard
                        key={vid.id}
                        video={vid}
                        addToFavorites={addToFavorites}
                    />
                )}
            </div>
        </>
    );
}

export default VideoContainer;