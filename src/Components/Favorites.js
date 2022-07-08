import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FavCard from '../Presentational/FavCard'
import { API_ROOT } from '../services/apiRoot';
import { useAuth } from '../context/AuthContext';

const Favorites = (props) => {

    const { allFavs } = props
    const { currentUser } = useAuth();

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
    console.log('currentUser from FAVORITES', currentUser)
    const currentUserFavs = allFavs.filter(favorite => favorite.user_id === currentUser.id)
    
    //create removeFromFavs
    const removeFromFavorites = async (favorite) => {
        let favId = favorite.id
        // let url = `https://netflix-movie-matcher.herokuapp.com/favorites/${favId}`
        // console.log('url', favId)
        //DELETE rqst to rails backend
        await fetch(`https://netflix-movie-matcher.herokuapp.com/favorites/${favId}`, {
          method: "DELETE",
        //   header:{'Accept':'application/json'},
        //   'Content-Type':'application/json'
         })
        .then(response => {
            console.log('response', response)
            window.location.reload()
        })
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
