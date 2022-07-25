import React from "react";
import { useNavigate } from "react-router-dom";
import FavCard from "../Presentational/FavCard";
import { API_ROOT } from "../services/apiRoot";
import { useAuth } from "../context/AuthContext";

const Favorites = (props) => {
  const { allFavs } = props;
  const { currentUser } = useAuth();

  let navigate = useNavigate();
  // const favoritesURL = `${API_ROOT}/favorites`

  //filter all Favs by currentUser
  const currentUserFavs = allFavs.filter(
    (favorite) => favorite.user_id === currentUser.id
  );

  const removeFromFavorites = async (favorite) => {
    let favId = favorite.id;
    //DELETE rqst to rails backend
    await fetch(
      `https://netflix-movie-matcher.herokuapp.com/favorites/${favId}`,
      {
        method: "DELETE",
      }
    ).then((response) => {
      console.log("response", response);
      window.location.reload();
    });
  };

  return (
    <>
      <div className="favs-btn bg-color">
        <button
          className="favs-btn-design"
          onClick={() => {
            navigate("/VideoContainer");
          }}
        >
          Return Home
        </button>
      </div>

      <div className="video-container">
        {currentUserFavs.map((fav) => (
          <FavCard
            key={fav.id}
            favorite={fav}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </>
  );
};

export default Favorites;
