import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavCard from '../Presentational/FavCard'

const Favorites = (props) => {

    const { user } = props

    const [allFavorites, setAllFavorites] = useState([]);
    //remainder of useState's here are for userSearch, do last
    //make state for Favorites here too?

    const favoritesURL = 'http://localhost:3000/favorites'
    
    //getAllFavorites
    useEffect(() => {
        const getAllFavorites = () => {
        axios.get(favoritesURL)
        .then((response) => {
            const allFavs = response.data
            setAllFavorites(allFavs)
        })
        .catch(error => console.log('Error:', error))
    }
        return () => {
            getAllFavorites()
        };
    }, []);
    
    //create currentUserFavs to filter all Favs
    console.log(allFavorites)
    const currentUserFavs = allFavorites.filter(favorite => favorite.user_id === user.id)
    
    //create removeFromFavs

    return (
        <>
        <div>
            <button>
                Return Home
            </button>
        </div>

        <div className='video-container'>
            {/* map each currentUserFav into a FavCard, set that */}
            {currentUserFavs.map((fav) =>
                <FavCard
                    key={fav.id}
                    favorite={fav}
                />
            )}
        </div>
        </>
    );
}

export default Favorites;
