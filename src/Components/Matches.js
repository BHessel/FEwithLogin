import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Matches = (props) => {

    const { allFavs, user } = props

    const location = useLocation()
    const foundUser = location.state.foundUser[0]
    let navigate = useNavigate()

     //sort allFavs down to just the current User's
     const sortUserFavs = allFavs.filter(favorite => favorite.user_id === user.id)
     console.log('sort', sortUserFavs)
     
     //sort allFavs down to just the foundUser's
     const sortFoundUserFavs = allFavs.filter(favorite => favorite.user_id === foundUser.id)
     console.log('sortMatch', sortFoundUserFavs)

     //compare both user's favorites to show matches
    const compare = (sortUserFavs, sortFoundUserFavs) => {
        let matchArray = []
        sortUserFavs.forEach((fav) => sortFoundUserFavs.forEach((favorite) => {
            if (fav.video_id === favorite.video_id){
                matchArray.push(fav.video.title)
            }
        }))
        return matchArray
    }

    const showAllMatches = compare(sortUserFavs, sortFoundUserFavs)
    const showUniqueMatches = [...new Set(showAllMatches)]

    console.log(showAllMatches)
    console.log(showUniqueMatches)

    return (
        <>
            <div className='return-home'>
                <button className='button-55' onClick={() => navigate(-1)}>
                    Return to Home
                </button>
            </div>

            <div className='bg-flex-wrapper'>
                <div className='match-favs'>
                    <h2>You're both interested in...</h2>
                    {showAllMatches.map((match) => 
                        <li>{match}</li>
                    )}
                </div>

                <div className='my-favs'>
                    <h2>My Favorites</h2>
                    {sortUserFavs.map((favorite) =>
                        <li>{favorite.video.title}</li>
                    )}
                </div>

                <div className='their-favs'>
                    <h2>My Friend's Favorites</h2>      
                    {sortFoundUserFavs.map((favorite) =>
                        <li>{favorite.video.title}</li>
                    )}
                </div>
            </div>
        </>
    );
}

export default Matches;
