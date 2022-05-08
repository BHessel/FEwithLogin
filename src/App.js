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
// import VidPlayer from './Presentational/VidPlayer'
import Video from './Presentational/Video'
import Matches from './Components/Matches';

// //Component imports
// import LoginForm from './Containers/LoginForm';
// import NotFound from './Presentational/NotFound';
// import { fetchFavorites } from './Containers/import';

const App = () => {

  const [user, setUser] = useState({})
  const [loggedInStatus, setLoggedInStatus] = useState('not_logged_in')
  const [allVideos, setAllVideos] = useState([])
  const [allUsers, setAllUsers ] = useState([])
  const [allFavs, setAllFavs ] = useState([])

  const videoURL = 'http://localhost:3000/videos'
  const allUsersURL = 'http://localhost:3000/users'
  const allFavsURL = 'http://localhost:3000/favorites'
  
  const navigate = useNavigate()
  
  
  useEffect(() => {
    const checkLoginStatus = () => {
      axios.get('http://localhost:3000/logged_in',
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
    const getAllVideos = () => {
      axios.get(videoURL)
      .then((response) => {
      const allVids = response.data
      setAllVideos(allVids)
    })
      .catch(error => console.log('Error:', error))
    }
    const getAllUsers = () => {
      axios.get(allUsersURL)
      .then((response) => {
        const allUserData = response.data
        setAllUsers(allUserData)
      })
        .catch(error => console.log('userError', error))
    }
    const getAllFavorites = () => {
      axios.get(allFavsURL)
      .then((response) => {
        const allFavsData = response.data
        setAllFavs(allFavsData)
      })
        .catch(error => console.log('userError', error))
    }
    return () => {
        checkLoginStatus()
        getAllVideos()
        getAllUsers()
        getAllFavorites()
        }
      }, [])
    
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
          //Home is for login/registration
          //apply boolean, error right now is that if I log in it routes me to /videocontainer, but if I hit back I can be on home and still be logged in.
          //if I'm on Home.js AND logged_in === true, navigate(/VideoContainer)
            path={"/"}
            element={ !user.id ?
              <Home
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              /> :
              <Navigate to='/VideoContainer' />
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
              />
            }>
          </Route>

          <Route
            path={'/Favorites'}
            element={
              <Favorites
                user={user}
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

          {/* <Route
            component={NotFound}
          /> */}


        </Routes>
      </div>
    </div>
  );
}

export default App;
