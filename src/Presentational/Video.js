import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Video = (props) => {
  const { allFavs, setAllFavs } = props;

  const location = useLocation();
  const videoInfo = location.state.video;
  const videoUrlArray = [videoInfo.url];
  const [play, setPlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useAuth();


  const handleMouseEnter = () => {
    setPlay(true);
  };
  const handleMouseLeave = () => {
    setPlay(false);
  };

  const addToFavsFromTheatre = async (video) => {
    setLoading(true);
    console.log("check video for key", video);
    let favorites = {
      user_id: currentUser.id,
      video_id: video.id,
    };

    let requestPackage = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ favorites }),
    };

    await fetch(
      "https://netflix-movie-matcher.herokuapp.com/favorites",
      requestPackage
    )
      .then((resp) => resp.json())
      .then((data) => {
        setAllFavs(...allFavs, data);
      });

      setLoading(false);
      const checked = document.getElementById("favs-btn");
      checked.classList.add("shake")
      setTimeout(() => {
        checked.classList.remove("shake");
      }, 400);
  };

  return (
    <div className="background-gradient">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="full-vid-player"
      >
        <ReactPlayer
          width="640px"
          height="360px"
          playing={play}
          // config={{ file: { forceHLS: true } }}
          controls={true}
          // light={videoInfo.thumbnail}
          url={videoUrlArray}
          className="react-player"
        />
      </div>

      <div className="video-info-card">
        <h2 className="info-font">{videoInfo.title}</h2>
        <div className="info-font">
          <div className="flex-info-font">
            <h4>Release Date:</h4>
            <p>2/15/2055</p>
          </div>
          <div className="flex-info-font">
            <h4>Description:</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
      <div className="theatre-box">
        <button
          className="theatre-btn"
          id="favs-btn"
          onClick={() => addToFavsFromTheatre(videoInfo)}
          disabled={loading}
        >
          Add to Favorites
        </button>

        <button
          className="theatre-btn"
          onClick={() => navigate("/VideoContainer")}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Video;
