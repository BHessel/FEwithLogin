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
    const removeFromFavorites = (favorite) => {
        let favId = favorite.id
      
        //DELETE rqst to rails backend
        fetch(`${favoritesURL}/${favId}`, {
          method: "DELETE",
          header:{'Accept':'application/json'},
          'Content-Type':'application/json'
         })
        window.location.reload()
    }

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
                    removeFromFavorites={removeFromFavorites}
                />
            )}
        </div>
        </>
    );
}

export default Favorites;
