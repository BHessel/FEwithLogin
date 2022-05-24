import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Routes,
  Route,
  useNavigate,
  Navigate
} from 'react-router-dom'
import Home from './Components/Home.js'
import VideoContainer from './Components/VideoContainer.js'
import axios from 'axios';
import Favorites from './Components/Favorites';
import Banner from './Presentational/Banner'
import Video from './Presentational/Video'
import Matches from './Components/Matches';
import FavsVideo from './Presentational/FavsVideo';
// import { API_ROOT } from './services/apiRoot';
import { fetchFavorites, getUsers, fetchVideos } from './Components/import/ImportSheet';


const App = () => {

  const [user, setUser] = useState({})
  const [loggedInStatus, setLoggedInStatus] = useState('not_logged_in')
  const [allVideos, setAllVideos] = useState([])
  const [allUsers, setAllUsers ] = useState([])
  const [allFavs, setAllFavs ] = useState([])

  const navigate = useNavigate()
  
  //fetchFavs
  useEffect(() => {
    const handleFetchFavorites = async () => {
      try {
        let allFavorites = await fetchFavorites()
        setAllFavs(allFavorites)
      }
      catch (e) {
        console.log("error in handleFetchFavorites", e)
      }
    }
    handleFetchFavorites()
  }, []);

  //getUsers
  useEffect(() => {
    const handleGetUsers = async () => {
      try {
        let getAllUsers = await getUsers()
        setAllUsers(getAllUsers)
      }
      catch (e) {
        console.log("error in handleGetUsers", e)
      }
    }
    handleGetUsers()
  }, []);

  //fetchVideos
  useEffect(() => {
    const handleFetchVideos = async () => {
      try {
        let allVids = await fetchVideos()
        setAllVideos(allVids)
      }
      catch (e) {
        console.log("error in handleFetchVideos", e)
      }
    }
    handleFetchVideos()
  }, []);

  //checkLoginStatus
  useEffect(() => {
    const checkLoginStatus = () => {
      axios.get(`https://netflix-movie-matcher.herokuapp.com/logged_in`,
      { withCredentials: true })
      .then(response => {
        console.log('logged in?:', response)
          if (response.data.logged_in && loggedInStatus === 'not_logged_in') {
            setLoggedInStatus('logged_in')
            setUser(response.data.user)
          } else if (!response.data.logged_in && loggedInStatus === 'logged_in') {
            setLoggedInStatus('not_logged_in')
            setUser({})
          }
      })
      .catch(error => {
        console.log('check login error?', error)
      })
    }
    return () => {
        checkLoginStatus()
        }
  }, [loggedInStatus])
  
    
  const handleLogin = (data) => {
      setLoggedInStatus('logged_in')
      setUser(data.user)
      navigate('/VideoContainer')
  }
  
  const handleLogout = () => {
      setLoggedInStatus('not_logged_in')
      setUser({})
      navigate('/')
  }

  return (
    <div className="App">
      <div className='main-grid'>
        <Banner
          user={user}
          setUser={setUser}
          handleLogout={handleLogout}
        />
      </div>

      <div className='body-container'>
        <Routes>
          
          <Route
            path={"/"}
            element={ !user.id ?
              <Home
                user={user}
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              /> :
              <Navigate replace to='/VideoContainer' />
            }
          />

          <Route
          //VideoContainer is Dashboard aka logged-in home
            path={"/VideoContainer"}
            element={
              <VideoContainer
                loggedInStatus={loggedInStatus}
                user={user}
                allUsers={allUsers}
                allVideos={allVideos}
                setAllVideos={setAllVideos}
                allFavs={allFavs}
              />
            }>
          </Route>

          <Route
            path={'/Favorites'}
            element={
              <Favorites
                user={user}
                allFavs={allFavs}
                loggedInStatus={loggedInStatus}
              />} 
          />

          <Route
            path={'/Matches'}
            element={
              <Matches 
                user={user}
                allFavs={allFavs}
              />
            } 
          />
          
          {/* routes to page w/ single video @ full size */}
          <Route
            path={'/video'}
            element={
              <Video />
            } 
          />

          <Route
            path={'/favsvideo'}
            element={
              <FavsVideo />
            } 
          />

          {/* <Route
            component={NotFound}
          /> */}


        </Routes>
      </div>
    </div>
  );
}

export default App;
