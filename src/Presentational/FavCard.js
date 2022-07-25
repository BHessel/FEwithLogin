import React from 'react';
import { useNavigate } from 'react-router-dom';

const Favcard = (props) => {

    const { favorite, removeFromFavorites } = props
    
    let navigate = useNavigate()

    const navToTrailer = (favorite) => {
        navigate('/favsvideo',
            {state:{favorite: favorite}}
    )
    }

    return (
        <div>
            <div className="card-container-favs" key={favorite.id}>
                <div className="fav-card-img">
                    <img src={favorite.video.thumbnail} alt="video thumbnail"/>
                </div>

            <div className='fav-card-content'>
                <div className="fav-card-title-container">
                    <h2>{favorite.video.title}</h2>
                </div>
            
            <div className="fav-card-buttons">
                <button className='fav-card-btn' onClick={() => navToTrailer(favorite)
                }>
                    Play Trailer
                </button>
                
                <button className='fav-card-btn' onClick={() => removeFromFavorites(favorite)}>
                    Remove from Favorites
                </button>
                
            </div> 
            </div>
            </div>
        </div>
    );
}

export default Favcard;
