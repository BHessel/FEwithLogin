import React from 'react';
import { useLocation } from 'react-router-dom';

const Matches = (props) => {

    const location = useLocation()
    const foundUser = location.state.foundUser[0]
    console.log(foundUser)

    //  //sort allFavs down to just the current User's
    //  const sortCurrentUserFavs = allFavs.filter(favorite => favorite.user_id === currentUser.id)
    //  console.log('sort', sortCurrentUserFavs)
     
    //  //sort allFavs down to just the matchUser's
    //  const sortMatchUserFavs = allFavs.filter(favorite => favorite.user_id === matchUser[0].id)
    //  console.log('sortMatch', sortMatchUserFavs)

    return (
        <div>
            <h1>You're at Matches!</h1>
            {/* <p>{location}</p>         */}
        </div>
    );
}

export default Matches;
