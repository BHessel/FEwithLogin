import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home.js";
import VideoContainer from "./Components/VideoContainer.js";
import Favorites from "./Components/Favorites";
import Banner from "./Presentational/Banner";
import Video from "./Presentational/Video";
import Matches from "./Components/Matches";
import FavsVideo from "./Presentational/FavsVideo";
import PrivateRoute from "./Components/PrivateRoute";

// import { API_ROOT } from './services/apiRoot';
import {
  fetchFavorites,
  getUsers,
  fetchVideos,
} from "./Components/import/ImportSheet";

const App = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allFavs, setAllFavs] = useState([]);

  //fetchFavs
  useEffect(() => {
    const handleFetchFavorites = async () => {
      try {
        let allFavorites = await fetchFavorites();
        setAllFavs(allFavorites);
      } catch (e) {
        console.log("error in handleFetchFavorites", e);
      }
    };
    handleFetchFavorites();
  }, []);

  //getUsers
  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        let getAllUsers = await getUsers();
        setAllUsers(getAllUsers);
      } catch (e) {
        console.log("error in handleGetUsers", e);
      }
    };
    handleGetUsers();
  }, []);

  //fetchVideos
  useEffect(() => {
    const handleFetchVideos = async () => {
      try {
        let allVids = await fetchVideos();
        setAllVideos(allVids);
      } catch (e) {
        console.log("error in handleFetchVideos", e);
      }
    };
    handleFetchVideos();
  }, []);

  return (
    <div className="App">
      <div className="main-grid">
        <Banner />
        <div className="body-container">
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route
              path={"/VideoContainer"}
              element={
                <PrivateRoute>
                  <VideoContainer
                    allUsers={allUsers}
                    allVideos={allVideos}
                    setAllVideos={setAllVideos}
                    allFavs={allFavs}
                  />
                </PrivateRoute>
              }
            />

            <Route
              path={"/Favorites"}
              element={
                <PrivateRoute>
                  <Favorites allFavs={allFavs} />
                </PrivateRoute>
              }
            />

            <Route
              path={"/Matches"}
              element={
                <PrivateRoute>
                  <Matches allFavs={allFavs} />
                </PrivateRoute>
              }
            />

            <Route
              path={"/video"}
              element={
                <PrivateRoute>
                  <Video />
                </PrivateRoute>
              }
            />

            <Route
              path={"/favsvideo"}
              element={
                <PrivateRoute>
                  <FavsVideo />
                </PrivateRoute>
              }
            />

          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
