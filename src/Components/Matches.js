import React from 'react';
import { useLocation } from 'react-router-dom';

const Matches = (props) => {

    const { allFavs, user } =props

    const location = useLocation()
    const foundUser = location.state.foundUser[0]
    console.log(foundUser)
    console.log(allFavs)
    console.log(user)

     //sort allFavs down to just the current User's
     const sortUserFavs = allFavs.filter(favorite => favorite.user_id === user.id)
     console.log('sort', sortUserFavs)
     
     //sort allFavs down to just the foundUser's
     const sortFoundUserFavs = allFavs.filter(favorite => favorite.user_id === foundUser.id)
     console.log('sortMatch', sortFoundUserFavs)

    return (
        <div>
            <h1>You're at Matches!</h1>
        </div>
    );
}

export default Matches;
