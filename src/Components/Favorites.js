import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavCard from '../Presentational/FavCard'
import { API_ROOT } from '../services/apiRoot';

const Favorites = (props) => {

    const { user, allFavs, loggedInStatus } = props

    // const [allFavorites, setAllFavorites] = useState([]);

    let navigate = useNavigate()
    // const favoritesURL = `${API_ROOT}/favorites`
    
    // //getAllFavorites
    // useEffect(() => {
    //     const getAllFavorites = () => {
    //     axios.get(favoritesURL)
    //     .then((response) => {
    //         const allFavs = response.data
    //         setAllFavorites(allFavs)
    //     })
    //     .catch(error => console.log('Error:', error))
    // }
    //     return () => {
    //         getAllFavorites()
    //     };
    // }, []);
    
    //create currentUserFavs to filter all Favs
    console.log(allFavs)
    const currentUserFavs = allFavs.filter(favorite => favorite.user_id === user.id)
    
    //create removeFromFavs
    const removeFromFavorites = (favorite) => {
        let favId = favorite.id
      
        //DELETE rqst to rails backend
        fetch(`https://netflix-movie-matcher.herokuapp.com/${favId}`, {
          method: "DELETE",
          header:{'Accept':'application/json'},
          'Content-Type':'application/json'
         })
        window.location.reload()
    }

    return (
        <>
        <div className='favs-btn bg-color'>
            <button className='favs-btn-design' onClick={() => {
                    navigate('/VideoContainer')
                }}>
                Return Home
            </button>
        </div>

        <div className='video-container'>
            {currentUserFavs.map((fav) =>
                <FavCard
                    key={fav.id}
                    favorite={fav}
                    removeFromFavorites={removeFromFavorites}
                />
            )}
        </div>
        </>
    );
}

export default Favorites;
