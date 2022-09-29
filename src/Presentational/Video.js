import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const location = useLocation();
  const videoInfo = location.state.video;
  const videoUrlArray = [videoInfo.url];

  const navigate = useNavigate();

  const [play, setPlay] = useState(false);

  const handleMouseEnter = () => {
    setPlay(true);
  };
  const handleMouseLeave = () => {
    setPlay(false);
  };

  const addToFavsFromTheatre = async (video) => {
    console.log("check video for key", video)
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
      })
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
        <button className="theatre-btn" onClick={(video) => addToFavsFromTheatre(video)}>Add to Favorites</button>

        <button className="theatre-btn" onClick={() => navigate("/VideoContainer")}>
          Return Home
        </button>
      </div>
    </div>
  );
};

export default Video;
