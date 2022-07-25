import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { API_ROOT } from "../services/apiRoot";
import { useAuth } from "../context/AuthContext";

const Usercard = (props) => {
  const { foundUser } = props;

  const [allFollows, setAllFollows] = useState([]);

  const { currentUser } = useAuth();

  //   const allFollowsURL = `${API_ROOT}/follows`;
  let navigate = useNavigate();

  const followUser = (e) => {
    e.preventDefault();
    console.log("send the post to follow user");

    let follow = {
      follower_id: currentUser.id,
      followed_user_id: foundUser[0].id,
    };

    let requestPackage = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ follow }),
    };

    fetch("https://netflix-movie-matcher.herokuapp.com/follows", requestPackage)
      .then((response) =>
        console.log("response from following a user", response)
      )
      .then(alert("friend followed!"));
  };

  //getAllFollows
  useEffect(() => {
    const getAllFollows = () => {
      axios
        .get("https://netflix-movie-matcher.herokuapp.com/follows")
        .then((response) => {
          const listAllFollows = response.data;
          setAllFollows(listAllFollows);
        })
        .catch((error) => console.log("Error:", error));
    };
    return () => {
      getAllFollows();
    };
  }, []);

  const currentFollowId = (e) => {
    e.preventDefault();
    allFollows.map((follow) => {
      if (
        currentUser.id === follow.follower_id &&
        foundUser[0].id === follow.followed_user_id
      ) {
        destroyRelationship(follow.id);
      } else {
        return console.log("Not deleted");
      }
    });
  };

  // deletes Follow instance
  const destroyRelationship = (followID) => {
    axios
      .delete(`https://netflix-movie-matcher.herokuapp.com/follows/${followID}`)
      .then(alert(`You've unfollowed ${foundUser[0].email}`))
      .catch((error) => console.log(error));
  };

  return (
    <div className="user-card-main">
      <h4>Found! {foundUser[0].email} </h4>

      <div className="user-card-buttons">
        <button className="button-36" onClick={(e) => followUser(e)}>
          Follow User
        </button>
        <button className="button-36" onClick={(e) => currentFollowId(e)}>
          Unfollow
        </button>
        <button
          className="button-36"
          onClick={() => {
            navigate("/Matches", { state: { foundUser } });
          }}
        >
          See Matches
        </button>
      </div>
    </div>
  );
};

export default Usercard;
